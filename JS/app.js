//Propagación -events

//document.body.addEventListener("click", () => {
//  alert("this is the body");
//});
//document.querySelector("section").addEventListener("click", () => {
//  alert("this is the section");
//});
//document.querySelector("div").addEventListener("click", () => {
//  alert("this is the div");
//});
//
//document.body.addEventListener("keydown", (event) => {
//  console.log(event.key);
//});
//
document.body.addEventListener("keydown", (event) => {
  event.preventDefault();
  console.log(event.key);
  console.log(event.code);
  if (event.key == "Enter") {
    alert("Hello World");
  }
});
