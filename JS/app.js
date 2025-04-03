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
//document.body.addEventListener("keydown", (event) => {
//  event.preventDefault();
//  console.log(event.key);
//  console.log(event.code);
//  if (event.key == "Enter") {
//    alert("Hello World");
//  }
//});
//Sesion 30
//document.body.addEventListener("click", () => {
//  document.body.style.backgroundColor = "black";
//});
//document.body.addEventListener("click", () => {
//  alert("Hello World");
//});

//Ejecutar eventos y medir el tiempo
//let time1 = 0.0,
//  time2 = 0.0;
//document.body.addEventListener("click", (event) => {
//  console.log(event);
//  document.body.style.backgroundColor = "black";
//  time1 = event.timeStamp;
//  console.log(time1);
//  console.log(event.currentTarget);
//});
//
//document.body.addEventListener("click", (event) => {
//  setTimeout(() => {
//    alert("Hello World");
//    time2 = event.timeStamp;
//    console.log(time2);
//    console.log(time1 - time2);
//  }, 3000);
//});

//Cancelling events

//some items like button/form/input have default actions (reload website and clear form, etc)
//can be cancelled with stop propagation - prevented for - bu default will be cancelled

console.log(document.forms);
document.forms[0].onsubmit = (event) => {
  event.preventDefault(); //with this you avoid the action to happen - but the event still there
  console.log("Hello World!");
};
