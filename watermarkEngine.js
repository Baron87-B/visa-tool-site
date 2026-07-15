(function (root) {
  function buildWatermarkText({ destinationName, visaType, applicantName, date }) {
    const name = applicantName?.trim() || "本人";
    const generatedDate = date || new Date().toISOString().slice(0, 10);
    return `仅用于${destinationName}${visaType}申请 / ${name} / ${generatedDate}`;
  }

  function safeWatermarkFilename(filename, purpose) {
    const dot = filename.lastIndexOf(".");
    const base = dot > 0 ? filename.slice(0, dot) : filename;
    const ext = dot > 0 ? filename.slice(dot) : "";
    return `${base}_仅用于${purpose}${ext}`;
  }

  function drawRepeatedWatermark(ctx, width, height, text) {
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = "#344054";
    ctx.font = `${Math.max(18, Math.round(width / 28))}px sans-serif`;
    ctx.rotate((-24 * Math.PI) / 180);
    const gapX = Math.max(260, width / 2.3);
    const gapY = Math.max(160, height / 4.2);
    for (let x = -width; x < width * 1.5; x += gapX) {
      for (let y = 0; y < height * 1.8; y += gapY) {
        ctx.fillText(text, x, y);
      }
    }
    ctx.restore();
  }

  root.VISA_WATERMARK_ENGINE = { buildWatermarkText, safeWatermarkFilename, drawRepeatedWatermark };
})(typeof window !== "undefined" ? window : globalThis);
