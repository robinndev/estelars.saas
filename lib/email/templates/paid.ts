export const emailTemplatePaid = (coupleName: string, url: string) => {
  const safeName = coupleName || "Casal Estelar";
  const cta = `${process.env.NEXT_PUBLIC_APP_URL}/download-qrcode/${
    url || "#"
  }`;

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Seu QR Code Estelars</title>
  <style>
    body {
      margin:0; padding:0;
      -webkit-text-size-adjust:100%;
      -ms-text-size-adjust:100%;
      background:#0b1020;
      color:#e6eef8;
      font-family:system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    }
    a { color:inherit; text-decoration:none; }

    .container {
      max-width:680px; margin:24px auto;
      padding:32px;
      background:linear-gradient(180deg,#101425 0%, #0b1020 100%);
      border-radius:20px;
      border:1px solid rgba(255,255,255,0.05);
      box-shadow:0 12px 34px rgba(0,0,0,0.45);
    }

    .brand { display:flex; align-items:center; gap:12px; }
    .logo {
      width:58px; height:58px; border-radius:16px;
      background:#ED0040;
      display:flex; align-items:center; justify-content:center;
      font-weight:800; color:#fff; font-size:24px;
      box-shadow:0 4px 14px rgba(237,0,64,0.45);
    }

    h1 { margin:20px 0 10px; font-size:24px; font-weight:700; color:#fff; }
    p.lead { margin:0 0 18px; color:#d4e4ff; opacity:0.95; font-size:15px; }

    .card {
      padding:22px; border-radius:14px;
      background:rgba(255,255,255,0.03);
      margin:22px 0;
      border:1px solid rgba(255,255,255,0.04);
    }

    .cta {
      display:inline-block; margin-top:16px;
      background:#ED0040;
      color:#fff;
      padding:14px 22px;
      border-radius:12px;
      font-weight:700;
      box-shadow:0 6px 20px rgba(237,0,64,0.32);
    }

    .muted { color:#9fb3d4; font-size:13px; line-height:1.55; }

    .footer {
      margin-top:28px;
      color:#8fb0d4;
      font-size:13px;
      opacity:0.85;
    }

    .socials a {
      display:inline-flex; align-items:center;
      margin-left:10px;
      opacity:0.75;
    }

    .socials svg {
      width:20px; height:20px;
      fill:#9fb3d4;
      opacity:0.7;
    }

    @media (max-width:520px) {
      .container { padding:22px; margin:12px; border-radius:16px; }
      h1 { font-size:20px; }
    }
  </style>
</head>
<body>

  <span style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${safeName}, seu QR Code exclusivo está pronto — compartilhe com quem quiser!
  </span>

  <div class="container">
    <div class="brand">
      <div class="logo">★</div>
      <div>
        <div style="font-size:14px; color:#fff; font-weight:700;">Estelars</div>
        <div style="font-size:11px; color:#9fb3d4; margin-top:3px;">Nosso universo. Suas memórias.</div>
      </div>
    </div>

    <h1>Olá ${safeName} — seu QR Code está pronto!</h1>
    <p class="lead">Use este QR Code para compartilhar o universo de vocês de forma rápida e linda.</p>

    <div class="card">
      <p style="margin:0;"><strong>O que fazer agora?</strong></p>
      <ul style="margin:12px 0 0 18px; padding:0;">
        <li class="muted">Clique no botão abaixo para acessar o QR Code exclusivo.</li>
        <li class="muted">Compartilhe com sua parceira, amigos ou em redes sociais.</li>
      </ul>

      <div style="margin-top:18px;">
        <a class="cta" href="${cta}" target="_blank" rel="noopener noreferrer">Ver meu QR Code</a>
      </div>

      <p class="muted" style="margin-top:14px;">Se o botão não funcionar, copie o link abaixo:</p>
      <p style="word-break:break-all;font-size:13px;color:#bcd7ff;">${cta}</p>

      <p class="muted" style="margin-top:16px; font-size:12px; opacity:0.85;">
        Caso você já tenha acesso, basta ignorar este e-mail — seu QR Code continuará disponível. ✨
      </p>
    </div>

    <p class="muted">Se tiver dúvidas, é só enviar um e-mail para robson.developer@hotmail.com.</p>

    <div class="footer">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <div>
          <div style="font-weight:700; color:#fff;">Estelars</div>
          <div style="margin-top:4px;">Transformando momentos em pequenas galáxias.</div>
        </div>

        <div class="socials">
          <a href="https://instagram.com/estelarsbr" target="_blank" aria-label="Instagram">
            <svg viewBox="0 0 24 24"><path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm6.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/></svg>
          </a>

          <a href="https://tiktok.com/@estelarsbr" target="_blank" aria-label="TikTok">
            <svg viewBox="0 0 24 24"><path d="M12.5 2h3.1c.2 1.2.8 2.3 1.7 3.1a5 5 0 0 0 3.2 1.2v3.2c-1.8 0-3.5-.6-4.9-1.6v7.1c0 3.4-2.7 6-6 6s-6-2.6-6-6c0-3.3 2.7-6 6-6 .5 0 1 .1 1.5.2v3.3c-.5-.3-1-.4-1.5-.4-1.5 0-2.7 1.2-2.7 2.8s1.2 2.8 2.7 2.8 2.8-1.3 2.8-2.8V2z"/></svg>
          </a>
        </div>
      </div>

      <p style="margin-top:8px;">Recebeu este e-mail por engano? Você pode ignorar ou <a href="#" style="color:#bcd7ff;text-decoration:underline;">cancelar aqui</a>.</p>
      <p style="margin-top:10px;font-size:12px;">© ${new Date().getFullYear()} Estelars. Todos os direitos reservados.</p>
    </div>
  </div>
</body>
</html>`;
};
