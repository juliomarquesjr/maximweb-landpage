#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "basic-ftp";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const outDir = path.join(rootDir, "out");
const publicDir = path.join(rootDir, "public");
const isInteractive = Boolean(process.stdout.isTTY);
const supportsColor = isInteractive && !process.env.NO_COLOR;

const EXCLUDED_FILES = new Set(["contact.config.local.php"]);
const PHP_FILES_TO_COPY = ["contact.php", "contact.config.example.php"];

const colors = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
};

function paint(color, text) {
  if (!supportsColor) {
    return text;
  }
  return `${color}${text}${colors.reset}`;
}

function renderBar(current, total, width = 24) {
  const ratio = total === 0 ? 0 : current / total;
  const filled = Math.round(ratio * width);
  return `${"#".repeat(filled)}${"-".repeat(width - filled)}`;
}

function createReporter(totalFiles, workerCount) {
  let completed = 0;
  let connectedWorkers = 0;
  let lastUploaded = "";
  let phase = "connecting";
  let transientLine = "";

  function clearTransientLine() {
    if (!isInteractive) {
      return;
    }
    process.stdout.write("\r\x1b[2K");
    transientLine = "";
  }

  function drawTransientLine(line) {
    if (!isInteractive) {
      return;
    }
    transientLine = line;
    process.stdout.write(`\r\x1b[2K${line}`);
  }

  function renderStatusLine() {
    if (!isInteractive) {
      return;
    }

    if (phase === "connecting") {
      drawTransientLine(
        `${paint(colors.cyan, "Conectando")} workers ${connectedWorkers}/${workerCount}...`,
      );
      return;
    }

    if (phase === "uploading") {
      const percent = totalFiles === 0
        ? 0
        : Math.round((completed / totalFiles) * 100);
      const bar = renderBar(completed, totalFiles);
      const line =
        `${paint(colors.cyan, "Progresso")} [${bar}] ${String(percent).padStart(3, " ")}% ` +
        `(${completed}/${totalFiles})` +
        (lastUploaded ? ` | ${lastUploaded}` : "");
      drawTransientLine(line);
    }
  }

  function printEvent(level, color, message) {
    const tag = paint(color, `[${level}]`);

    clearTransientLine();
    console.log(`${tag} ${message}`);
    renderStatusLine();
  }

  return {
    start() {
      renderStatusLine();
    },
    connected(workerId) {
      connectedWorkers += 1;
      printEvent("OK", colors.green, `Conexao estabelecida (W${workerId}).`);
    },
    disconnected(workerId) {
      printEvent("INFO", colors.dim, `Conexao finalizada (W${workerId}).`);
    },
    uploadsStarted() {
      phase = "uploading";
      printEvent("OK", colors.green, "Todos os workers conectados. Iniciando upload...");
    },
    uploaded(workerId, relativePath) {
      completed += 1;
      lastUploaded = `W${workerId}: ${relativePath.split(path.sep).join("/")}`;

      if (!isInteractive) {
        printEvent(
          "UPLOAD",
          colors.cyan,
          `${completed}/${totalFiles} ${lastUploaded}`,
        );
        return;
      }

      renderStatusLine();
    },
    fail(message) {
      phase = "done";
      clearTransientLine();
      printEvent("ERRO", colors.red, message);
    },
    complete() {
      phase = "done";
      clearTransientLine();
      printEvent("OK", colors.green, `Upload finalizado (${completed}/${totalFiles}).`);
      if (!isInteractive && transientLine) {
        console.log(transientLine);
      }
    },
  };
}

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
  const reporter = createReporter(files.length, workerCount);
  reporter.start();
  let connectedWorkers = 0;

  let releaseUploads;
  let failUploads;
  let uploadsGateState = "pending";
  const uploadsReady = new Promise((resolve, reject) => {
    releaseUploads = resolve;
    failUploads = reject;
  });

  function startUploadsIfReady() {
    if (connectedWorkers !== workerCount || uploadsGateState !== "pending") {
      return;
    }
    uploadsGateState = "open";
    reporter.uploadsStarted();
    releaseUploads();
  }

  function rejectUploads(error) {
    if (uploadsGateState !== "pending") {
      return;
    }
    uploadsGateState = "failed";
    failUploads(error);
  }

  async function runWorker(workerId) {
    const client = new Client();
    client.ftp.verbose = false;
    const ensuredDirs = new Set();

    try {
      console.log(`${paint(colors.dim, "[INFO]")} Conectando worker ${workerId}...`);
      await client.access({
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
        secure: config.secure,
      });
      reporter.connected(workerId);
      connectedWorkers += 1;
      startUploadsIfReady();
      await uploadsReady;

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
        reporter.uploaded(workerId, relativePath);
      }
    } catch (error) {
      rejectUploads(error);
      throw error;
    } finally {
      client.close();
      reporter.disconnected(workerId);
    }
  }

  try {
    await Promise.all(
      Array.from({ length: workerCount }, (_, index) => runWorker(index + 1)),
    );
    reporter.complete();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido.";
    reporter.fail(message);
    throw error;
  }
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
    console.log(paint(colors.yellow, "Modo dry-run ativo. Nenhum upload sera executado."));
    files.forEach((filePath) => console.log(`- ${filePath}`));
    return;
  }

  await uploadFiles(config, files);
  console.log(paint(colors.green, "Deploy finalizado com sucesso."));
}

main().catch((error) => {
  console.error("Falha no deploy:", error.message);
  process.exitCode = 1;
});
