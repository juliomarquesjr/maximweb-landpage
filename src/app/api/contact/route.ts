import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const MAIL_FROM = process.env.MAIL_FROM;
const MAIL_TO = process.env.MAIL_TO;

export async function POST(req: NextRequest) {
  if (!RESEND_API_KEY || !MAIL_FROM || !MAIL_TO) {
    return NextResponse.json({ error: "Serviço indisponível." }, { status: 503 });
  }

  let body: { nome?: string; email?: string; telefone?: string; mensagem?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const { nome, email, telefone, mensagem } = body;

  if (!nome || !email || !mensagem) {
    return NextResponse.json({ error: "Campos obrigatórios ausentes." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  const html = `
    <h2>Novo contato — MaximWeb</h2>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>E-mail:</strong> ${email}</p>
    ${telefone ? `<p><strong>Telefone:</strong> ${telefone}</p>` : ""}
    <p><strong>Mensagem:</strong><br>${mensagem.replace(/\n/g, "<br>")}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: MAIL_FROM,
      to: MAIL_TO,
      reply_to: email,
      subject: `Contato de ${nome} via MaximWeb`,
      html,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Falha ao enviar." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
