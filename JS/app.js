document.addEventListener("DOMContentLoaded", () => {
  //carga todo antes que JS
  let icon = document.querySelector(".fa-solid ");
  //console.log(icon);
  let header = document.querySelector("h1");
  //console.log("h1");
  icon.addEventListener("click", () => {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
    document.body.classList.toggle("tour");
    icon.classList.toggle("fa-sun");
    icon.classList.toggle("fa-moon");
    icon.classList.toggle("spin");
    header.classList.toggle("smack");
    if (header.textContent == "Good Morning!") {
      // if (header.textContent.includes ("Good Morning!")) {
      header.textContent = "Good Night!";
      //console.log(header.textContent);
    } else {
      header.textContent = "Good Morning!";
    }
  });
});
