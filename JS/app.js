//Seleccionar elementos desde la etiqueta
let nav = document.querySelector("nav");
//console.log(nav);

//Seleccionar la clase
let active = document.querySelector(".active");
//console.log(active);

//Selecciona multiples elementos con la misma etiqueta
let headersAndParagraphs = document.querySelectorAll("p,h1"); //lista de nodos
//console.log(headersAndParagraphs[0].innerText); // selecciona a los elementos de la coleccion ( es array) y en primer lugar

//accediendo a elementos hijos mediante children[num hijo]

//nav.children[0];
//console.log(nav.children[0].children[0].children[0]);
//console.log(
//  nav.firstElementChild.firstElementChild.firstElementChild.parentNode
//    .nextElementSibling.firstElementChild.firstChild.parentNode
//);
//console.log(headersAndParagraphs[2]);
//console.log(headersAndParagraphs[0].nextElementSibling.nextElementSibling.nextElementSibling);

let main = document.querySelector("#first");
//console.log(main);
console.log(nav.firstElementChild.lastElementChild.firstElementChild.firstChild);


