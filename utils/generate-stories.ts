export async function generateStoryImage({
  photoUrl,
  qrCodeUrl,
  title,
  subtitle,
  message,
  themeColor = "#6366f1",
}: {
  photoUrl: string;
  qrCodeUrl: string;
  title: string;
  subtitle: string;
  message?: string;
  themeColor?: string;
}) {
  const width = 1080;
  const height = 1920;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  // ---------- BACKGROUND ----------
  const bg = await loadImage(photoUrl);

  const ratioBg = bg.width / bg.height;
  const ratioCanvas = width / height;

  let drawW, drawH, offsetX, offsetY;

  if (ratioBg > ratioCanvas) {
    drawH = height;
    drawW = drawH * ratioBg;
    offsetX = (width - drawW) / 2;
    offsetY = 0;
  } else {
    drawW = width;
    drawH = drawW / ratioBg;
    offsetX = 0;
    offsetY = (height - drawH) / 2;
  }

  ctx.drawImage(bg, offsetX, offsetY, drawW, drawH);

  // ---------- GRADIENT ----------
  const gradient = ctx.createLinearGradient(0, height, 0, height - 900);
  gradient.addColorStop(0, "rgba(0,0,0,0.96)");
  gradient.addColorStop(0.4, "rgba(0,0,0,0.6)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, height - 900, width, 900);

  const LEFT = 60;

  // ---------- CLEAN TITLE ----------
  let cleanTitle = title.trim();
  cleanTitle = cleanTitle.replace(/^0 anos?,\s*/i, "");
  if (!cleanTitle) cleanTitle = title;

  // ---------- TEXT ----------
  ctx.fillStyle = "white";
  ctx.textAlign = "left";

  // Title
  ctx.font = "bold 90px 'Arial'";
  ctx.shadowColor = "rgba(0,0,0,0.6)";
  ctx.shadowBlur = 25;
  ctx.fillText(cleanTitle, LEFT, height - 500);

  // Subtitle
  ctx.font = "50px 'Arial'";
  ctx.shadowBlur = 20;
  ctx.fillText(subtitle, LEFT, height - 410);

  // Linha de cor
  ctx.shadowBlur = 0;
  ctx.fillStyle = themeColor;
  ctx.fillRect(LEFT, height - 395, 220, 6);

  // ---------- MESSAGE (limitada a 30 chars) ----------
  if (message) {
    let msg = message;
    if (msg.length > 30) msg = msg.slice(0, 30) + "...";

    ctx.fillStyle = "white";
    ctx.font = "36px 'Arial'";
    ctx.shadowBlur = 15;

    wrapText(ctx, msg, LEFT, height - 330, 700, 42);
  }

  ctx.shadowBlur = 0;

  // ---------- QR CODE ----------
  const qrImg = await loadImage(qrCodeUrl);
  const qrSize = 260;

  ctx.drawImage(
    qrImg,
    width - qrSize - 80,
    height - qrSize - 80,
    qrSize,
    qrSize
  );

  // ---------- ESTELARS BRANDING ----------
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "28px 'Arial'";
  ctx.textAlign = "right";
  ctx.fillText("Feito por Estelars", width - 100, height - 40);

  // ---------- DOWNLOAD ----------
  const link = document.createElement("a");
  link.download = "story.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// Helper: quebra de linha
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
    const width = ctx.measureText(test).width;
    if (width > maxWidth) {
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
