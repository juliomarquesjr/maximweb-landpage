#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "basic-ftp";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const outDir = path.join(rootDir, "out");
const publicDir = path.join(rootDir, "public");

const EXCLUDED_FILES = new Set(["contact.config.local.php"]);
const PHP_FILES_TO_COPY = ["contact.php", "contact.config.example.php"];

async function loadEnvFiles() {
  const envFiles = [".env", ".env.local"];

  for (const fileName of envFiles) {
    const filePath = path.join(rootDir, fileName);

    let content;
    try {
      content = await fs.readFile(filePath, "utf8");
    } catch {
      continue;
    }

    const lines = content.split(/\r?\n/);
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) {
        continue;
      }

      const separatorIndex = line.indexOf("=");
      if (separatorIndex <= 0) {
        continue;
      }

      const key = line.slice(0, separatorIndex).trim();
      let value = line.slice(separatorIndex + 1).trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  }
}

function readConfigFromEnv() {
  const requiredKeys = [
    "CPANEL_FTP_SERVER",
    "CPANEL_FTP_USERNAME",
    "CPANEL_FTP_PASSWORD",
    "CPANEL_FTP_SERVER_DIR",
  ];

  const missingKeys = requiredKeys.filter((key) => !process.env[key]);
  if (missingKeys.length > 0) {
    throw new Error(
      `Variaveis ausentes: ${missingKeys.join(", ")}.\n` +
        "Defina as variaveis de ambiente e tente novamente.",
    );
  }

  return {
    host: process.env.CPANEL_FTP_SERVER,
    user: process.env.CPANEL_FTP_USERNAME,
    password: process.env.CPANEL_FTP_PASSWORD,
    port: Number(process.env.CPANEL_FTP_PORT ?? "21"),
    remoteDir: normalizeRemoteDir(process.env.CPANEL_FTP_SERVER_DIR),
    secure: parseBoolean(process.env.CPANEL_FTP_SECURE, true),
    dryRun: parseBoolean(process.env.CPANEL_FTP_DRY_RUN, false),
    concurrency: normalizeConcurrency(process.env.CPANEL_FTP_CONCURRENCY),
  };
}

function parseBoolean(value, defaultValue) {
  if (value === undefined) {
    return defaultValue;
  }

  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes";
}

function normalizeRemoteDir(rawDir) {
  const value = rawDir.trim();
  if (!value) {
    return "/";
  }

  if (value.startsWith("/")) {
    return value;
  }

  return `/${value}`;
}

function normalizeConcurrency(rawValue) {
  const parsed = Number.parseInt(rawValue ?? "1", 10);
  if (Number.isNaN(parsed) || parsed < 1) {
    return 1;
  }

  // Shared cPanel hosts usually limit concurrent FTP connections.
  return Math.min(parsed, 2);
}

async function ensureBuildArtifacts() {
  try {
    await fs.access(outDir);
  } catch {
    throw new Error(
      "Pasta out/ nao encontrada. Rode `npm run build:static` antes do deploy.",
    );
  }

  for (const fileName of PHP_FILES_TO_COPY) {
    const source = path.join(publicDir, fileName);
    const target = path.join(outDir, fileName);
    await fs.copyFile(source, target);
  }
}

async function collectFiles(baseDir, currentDir = baseDir) {
  const entries = await fs.readdir(currentDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(baseDir, absolutePath)));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const relativePath = path.relative(baseDir, absolutePath);
    const filename = path.basename(relativePath);
    if (EXCLUDED_FILES.has(filename)) {
      continue;
    }

    files.push(relativePath);
  }

  return files;
}

function toRemotePath(remoteDir, relativePath) {
  const posixRelativePath = relativePath.split(path.sep).join("/");
  const trimmedRemoteDir = remoteDir.endsWith("/")
    ? remoteDir.slice(0, -1)
    : remoteDir;
  return `${trimmedRemoteDir}/${posixRelativePath}`;
}

async function uploadFiles(config, files) {
  const queue = [...files];
  const workerCount = Math.min(config.concurrency, queue.length);

  async function runWorker(workerId) {
    const client = new Client();
    client.ftp.verbose = false;
    const ensuredDirs = new Set();

    try {
      await client.access({
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
        secure: config.secure,
      });

      while (queue.length > 0) {
        const relativePath = queue.pop();
        if (!relativePath) {
          break;
        }

        const remotePath = toRemotePath(config.remoteDir, relativePath);
        const localPath = path.join(outDir, relativePath);
        const remoteDir = path.posix.dirname(remotePath);

        if (!ensuredDirs.has(remoteDir)) {
          await client.ensureDir(remoteDir);
          ensuredDirs.add(remoteDir);
        }

        await client.uploadFrom(localPath, remotePath);
        console.log(`[W${workerId}] Upload: ${relativePath}`);
      }
    } finally {
      client.close();
    }
  }

  await Promise.all(
    Array.from({ length: workerCount }, (_, index) => runWorker(index + 1)),
  );
}

async function main() {
  await loadEnvFiles();
  const config = readConfigFromEnv();
  await ensureBuildArtifacts();

  const files = await collectFiles(outDir);
  if (files.length === 0) {
    throw new Error("Nenhum arquivo encontrado em out/ para upload.");
  }

  console.log(`Arquivos para deploy: ${files.length}`);
  console.log(`Conexoes simultaneas: ${config.concurrency}`);
  if (config.dryRun) {
    console.log("Modo dry-run ativo. Nenhum upload sera executado.");
    files.forEach((filePath) => console.log(`- ${filePath}`));
    return;
  }

  await uploadFiles(config, files);
  console.log("Deploy finalizado com sucesso.");
}

main().catch((error) => {
  console.error("Falha no deploy:", error.message);
  process.exitCode = 1;
});
