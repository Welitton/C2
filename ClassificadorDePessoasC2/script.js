let model;

document.addEventListener("DOMContentLoaded", async () => {
  model = await cocoSsd.load();
  setStatus("Modelo carregado!");

  const fileInput = document.getElementById("upload");
  fileInput.addEventListener("change", handleFileChange);
});

function setStatus(msg) {
  document.getElementById("status").innerText = msg;
}

async function handleFileChange(event) {
  setStatus("Processando imagem...");
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = async () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const predictions = await model.detect(img);

    predictions
      .filter(p => p.class === "person")
      .forEach(p => drawPrediction(ctx, p));

    setStatus(`${predictions.length} objeto(s) detectado(s), ${predictions.filter(p => p.class === "person").length} pessoa(s).`);
  };
}

function drawPrediction(ctx, prediction) {
  ctx.lineWidth = 3;
  ctx.strokeStyle = "red";
  ctx.fillStyle = "red";
  ctx.font = "16px Arial";
  ctx.strokeRect(...prediction.bbox);
  ctx.fillText(
    "Pessoa",
    prediction.bbox[0],
    prediction.bbox[1] - 5
  );
}
