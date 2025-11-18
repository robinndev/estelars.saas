export async function generateDesktopMemory({
  photoUrl,
  coupleName,
  message,
  profileLink,
  themeColor,
}: {
  photoUrl: string;
  coupleName: string;
  message: string;
  profileLink: string;
  themeColor: string;
}) {
  const width = 1920;
  const height = 1080;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  // --- FUNDO PRETO ---
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  // --- CARREGAR FOTO ---
  const img = await loadImage(photoUrl);

  const ratio = img.width / img.height;
  const drawH = height;
  const drawW = drawH * ratio;

  const offsetX = width - drawW;
  const offsetY = 0;

  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

  // --- OVERLAY INTERNO NA FOTO ---
  const gradientWidth = drawW * 0.55;

  const g = ctx.createLinearGradient(offsetX, 0, offsetX + gradientWidth, 0);
  g.addColorStop(0, "rgba(0,0,0,0.92)");
  g.addColorStop(0.35, "rgba(0,0,0,0.65)");
  g.addColorStop(0.7, "rgba(0,0,0,0.25)");
  g.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = g;
  ctx.fillRect(offsetX, 0, gradientWidth, height);

  // ============================
  //      TEXTOS – ESQUERDA
  // ============================

  const LEFT = 120;

  ctx.textAlign = "left";
  ctx.shadowColor = "rgba(0,0,0,0.6)";
  ctx.shadowBlur = 24;

  // “Nossa”
  ctx.fillStyle = "white";
  ctx.font = "bold 85px 'Arial'";
  ctx.fillText("Nossa", LEFT, 240);

  // “Memória” — mais perto agora
  ctx.fillStyle = themeColor;
  ctx.font = "bold 100px 'Arial'";
  ctx.fillText("Memória", LEFT, 340);

  // Nome do casal — aproxima mais
  ctx.fillStyle = "white";
  ctx.font = "58px 'Arial'";
  ctx.shadowBlur = 18;
  ctx.fillText(coupleName, LEFT, 455);

  // Mensagem — estilo legenda
  ctx.shadowBlur = 10;
  ctx.font = "20px 'Arial'";
  wrapText(ctx, message, LEFT, 500, 780, 42);

  ctx.shadowBlur = 0;

  // --- QR CODE ---
  const qr = await loadImage(
    `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
      profileLink
    )}`
  );

  ctx.drawImage(qr, LEFT, height - 350, 230, 230);

  // Branding
  ctx.font = "30px 'Arial'";
  ctx.fillStyle = "rgba(255,255,255,0.65)";
  ctx.fillText("Feito por Estelars ⭐", LEFT, height - 60);

  // --- DOWNLOAD ---
  const link = document.createElement("a");
  link.download = "memory-desktop.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// --- HELPERS ---
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";

  for (let w of words) {
    const test = line + w + " ";
    if (ctx.measureText(test).width > maxWidth) {
      ctx.fillText(line, x, y);
      line = w + " ";
      y += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, y);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
