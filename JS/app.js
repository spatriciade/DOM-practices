document.addEventListener("DOMContentLoaded", () => {
  const icon = document.getElementById("theme-icon"); // Ícono
  const header = document.querySelector("h1"); // Título
  const rootStyles = getComputedStyle(document.documentElement); // Obtener estilos de :root

  // Lista de variables de color en :root
  const colorVars = [
    "--white",
    "--green",
    "--dark",
    "--blue",
    "--indigo",
    "--purple",
    "--pink",
    "--red",
    "--orange",
    "--yellow",
    "--teal",
    "--cyan",
    "--black",
    "--gray",
  ];

  // Lista de variables de fuentes en :root
  const fontVars = [
    "--font-rubik",
    "--font-titillium",
    "--font-bungee",
    "--font-dancing",
  ];

  icon.addEventListener("click", () => {
    // Cambiar color de fondo aleatoriamente
    const randomColorVar =
      colorVars[Math.floor(Math.random() * colorVars.length)];
    const randomColor = rootStyles.getPropertyValue(randomColorVar).trim();
    document.body.style.backgroundColor = randomColor;

    // Cambiar fuente aleatoriamente
    const randomFontVar = fontVars[Math.floor(Math.random() * fontVars.length)];
    const randomFont = rootStyles.getPropertyValue(randomFontVar).trim();
    document.body.style.fontFamily = randomFont;

    // Alternar clases y cambiar texto/ícono
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
    icon.classList.toggle("fa-guitar");
    icon.classList.toggle("fa-hand-back-fist");
    icon.classList.toggle("spin");

    // Cambiar el texto del h1
    header.textContent =
      header.textContent === "Random-Style" ? "Another Style" : "Random-Style";
  });
});
