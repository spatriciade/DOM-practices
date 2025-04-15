window.addEventListener("load", () => {
  let id = 0;
  let text = "";
  let alert = document.querySelector(".alert");
  let close = alert.firstElementChild;
  let input = document.querySelector("#task");
  let arrow = document.querySelector(".arrow");
  let done = document.querySelectorAll(".fa-circle-check");
  let trash = document.querySelectorAll(".fa-trash");
  let edit = document.querySelectorAll(".fa-pencil");
  let task = document.querySelectorAll(".task");

  //console.log(input);
  close.addEventListener("click", () => {
    alert.classList.add("dismissible");
  });
  input.addEventListener("focus", () => {
    //console.log("Working!");
    document.addEventListener("keydown", (event) => {
      console.log(event.code);
      if (event.code == "Enter" || event.code == "NumpadEnter") {
        event.preventDefault();
      }
    });
  });
  arrow.addEventListener("click", (event) => {
    if (input.value.trim() == "") {
      //Eliminar espacios al ppio y al final del string
      //console.log("Empty");
      event.preventDefault(); // prevent submit
      input.value = ""; //reset value
      alert.classList.remove("dismissible");
    } else {
      let text = input.value;
      input.value = " ";
      id =
        Number(document.querySelector("tbody")?.lastElementChild?.id) + 1 || 0;
      document.querySelector("tbody").appendChild(generateRow(id, text));
      if (!alert.classList.contains("dismissible")) {
        alert.classList.add("dismissible");
      }
    }
  });

  done.forEach((item) => {
    item.addEventListener("click", (e) => {
      deleteTask(e);
    });
  });
  trash.forEach((item) => {
    item.addEventListener("click", (e) => {
      removeRow(e);
    });
  });

  edit.forEach((item) => {
    item.addEventListener("click", (e) => {
      editTask(e, false);
    });
  });

  task.forEach((item) => {
    item.addEventListener("focus", (e) => {
      editTask(e, true);
    });
  });

  let editTask = (e, onFocus) => {

    if (onFocus){
      console.log(e.target);
      e.target.classList.add("editable");      

    } else{
    let editable = e.target.parentNode.parentNode.previousElementSibling;
    console.log(editable);
    editable.classList.add("editable");
    editable.focus();
    }
  };

  //refactorizar 2
  let deleteTask = (e) => {
    let task = e.target.nextElementSibling;
    text = task.innerHTML;

    if (text.includes("<del>")) {
      task.innerHTML = task.firstElementChild.textContent;
      task.setAttribute("data-completed", "false");
    } else {
      task.innerHTML = `<del>${text}</del>`;
      task.setAttribute("data-completed", "true");
    }
  };

  let removeRow = (e) => {
    e.target.parentNode.parentNode.parentNode.remove();
  };

  //refactorizar 1
  let generateRow = (id, text) => {
    //Creando una nueva fila
    let newRow = document.createElement("tr");
    newRow.setAttribute("id", id);
    newRow.innerHTML = `
  <td>
            <i class="fa-solid fa-circle-check fa-2x"></i>
            <span class="task" contenteditable="true"> 
            ${text}                
            </span>
          </td>
          <td>
            <span class="fa-stack fa-2x">
              <i class="fa-solid fa-square fa-stack-2x"></i>
              <i class="fa-solid fa-pencil fa-stack-1x fa-inverse"></i>
            </span>
          </td>
          <td>
            <span class="fa-stack fa-2x">
              <i class="fa-solid fa-square fa-stack-2x"></i>
              <i class="fa-solid fa-trash fa-stack-1x fa-inverse"></i>
            </span>
          </td>
  `;
    return newRow;
  };
});
