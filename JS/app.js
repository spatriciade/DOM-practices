window.addEventListener("load",() =>{
let id = 0;
let text= "";
let alert = document.querySelector(".alert");
let close = alert.firstElementChild;
let input = document.querySelector("#task");
let arrow = document.querySelector(".arrow");
//console.log(input);
close.addEventListener("click", () =>{
    alert.classList.add("dismissible");
    });
input.addEventListener("focus",()=>{
   //console.log("Working!");
    document.addEventListener("keydown",(event)=>{
              console.log(event.code);
        if(event.code == "Enter"  || event.code == "NumpadEnter"){
            event.preventDefault();
        }
    });
})
});
