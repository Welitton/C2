document.addEventListener("DOMContentLoaded", () => {
  // Você pode adicionar animações, melhorias de UI ou outras interações aqui
  const status = document.getElementById("status");
  status.style.opacity = 0;
  setTimeout(() => (status.style.opacity = 1), 500); // animação simples
});
