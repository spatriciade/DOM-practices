window.addEventListener("load", () => {
  //variables
  let id = 0;
  let text = "";
  let alert = document.querySelector(".alert");
  let closeBttn = alert.firstElementChild;
  let input = document.querySelector("#task");
  let arrow = document.querySelector(".arrow");
  let done = document.querySelectorAll(".fa-circle-check");
  let trash = document.querySelectorAll(".fa-trash");
  let edit = document.querySelectorAll(".fa-pencil");
  let task = document.querySelectorAll(".task");
  //Close alert
  closeBttn.addEventListener("click", () => {
    alert.classList.toggle("dismissible");
  });
  //si el usuario hace "enter" el sistema no reacciona
  input.addEventListener("focus", () => {
    document.addEventListener("keydown", (event) => {
      if (event.code == "Enter" || event.code == "NumpadEnter") {
        event.preventDefault();
      }
    });
  });
  arrow.addEventListener("click", (event) => {
    //input no se puede enviar vacío
    if (input.value.trim() == "") {
      //Eliminar espacios al ppio y al final del string
      event.preventDefault(); // prevent submit an empty field
      //forces an empty input
      input.value = ""; //reset value
      alert.classList.remove("dismissible");
    } else {
      let text = input.value; // el valor del input está implícito
      input.value = "";
      let successAlert = document.querySelector(".success-alert");
      successAlert.classList.remove("dismissible");
      setTimeout(() => {
        successAlert.classList.add("dismissible");
      }, 3000);
      id =
        Number(document.querySelector("tbody")?.lastElementChild?.id) + 1 || 0; //acceso opcional a una variable que no sabemos si estará
      document.querySelector("tbody").appendChild(generateRow(id, text));
      if (!alert.classList.contains("dismissible")) {
        alert.classList.add("dismissible");
      }
    }
  });
    // ATAJOS DE TECLADO
    document.addEventListener("keydown", (e) => {
      const input = document.querySelector("#task");
      const tbody = document.querySelector("tbody");
      const rows = tbody.querySelectorAll("tr");
  
      // 1. TAB - Vacía el input
      if (e.key === "Tab") {
        e.preventDefault(); // evita moverse al siguiente foco
        input.value = "";
      }
  
      // 2. Ctrl + Insert - Foco en el input
      if (e.ctrlKey && e.key === "Insert") {
        e.preventDefault();
        input.focus();
      }
  
      // 3. Ctrl + Shift + S - Añadir tarea si input no está vacío, si no alerta
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (input.value.trim() === "") {
          showAlert("No puedes añadir una tarea vacía", "pink");
        } else {
          const text = input.value.trim();
          input.value = "";
          const id =
            Number(document.querySelector("tbody")?.lastElementChild?.id) + 1 || 0;
          document.querySelector("tbody").appendChild(generateRow(id, text));
          showAlert("Tarea añadida satisfactoriamente", "green");
        }
      }
  
      // 4. Ctrl + Shift + F1 - Eliminar la primera tarea
      if (e.ctrlKey && e.shiftKey && e.code === "F1") {
        e.preventDefault();
        if (rows.length > 0) {
          rows[0].remove();
        }
      }
  
      // 5. Ctrl + Shift + F2 - Eliminar la última tarea
      if (e.ctrlKey && e.shiftKey && e.code === "F2") {
        e.preventDefault();
        if (rows.length > 0) {
          rows[rows.length - 1].remove();
        }
      }
  
      // 6. Ctrl + Shift + F5 - Editar primera tarea
      if (e.ctrlKey && e.shiftKey && e.code === "F5") {
        e.preventDefault();
        const taskSpan = rows[0]?.querySelector(".task");
        if (taskSpan) {
          taskSpan.classList.add("editable");
          taskSpan.focus();
        }
      }
  
      // 7. Ctrl + Shift + F6 - Editar última tarea
      if (e.ctrlKey && e.shiftKey && e.code === "F6") {
        e.preventDefault();
        const taskSpan = rows[rows.length - 1]?.querySelector(".task");
        if (taskSpan) {
          taskSpan.classList.add("editable");
          taskSpan.focus();
        }
      }
  
      // 8. Ctrl + Supr - Vacía toda la tabla
      if (e.ctrlKey && e.key === "Delete") {
        e.preventDefault();
        tbody.innerHTML = "";
      }
    });
  
    // FUNCIÓN PARA MOSTRAR ALERTAS TEMPORALES
    function showAlert(message, color) {
      const tempAlert = document.createElement("div");
      tempAlert.classList.add("alert");
      tempAlert.style.backgroundColor = `var(--${color})`;
      tempAlert.innerHTML = `<span>${message}</span>`;
      document.querySelector(".main").prepend(tempAlert);
      setTimeout(() => tempAlert.remove(), 5000);
    }
  //Hasta aqui , eventos al cargar la pág.

  done.forEach((item) => {
    item.addEventListener("click", (e) => {
      deleteTask(e);
    });
  });
  trash.forEach((item) => {
    item.addEventListener("click", (e) => {
      removeRow(e, false);
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
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Marcar botón activo
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");

      const filter = e.target.dataset.filter;
      document.querySelectorAll("tbody tr").forEach((row) => {
        const task = row.querySelector(".task");
        const isDone = task.getAttribute("data-completed") === "true";
        if (filter === "all") {
          row.style.display = "";
        } else if (filter === "todo") {
          row.style.display = isDone ? "none" : "";
        } else if (filter === "done") {
          row.style.display = isDone ? "" : "none";
        }
      });
    });
  });
});

// CAMBIO A TEMA OSCURO CON ICONO GEAR
const gearIcon = document.querySelector(".theme-toggle");

gearIcon.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

//functions
const editTask = (e, onFocus) => {
  let editable = e;
  if (onFocus) {
    // console.log(e.target);
    editable.target.classList.add("editable");
    document.addEventListener("keydown", (e) => {
      // console.log(e.code); Check for improvements
      if (e.code == "Escape") {
        editable.target.classList.remove("editable");
        editable.target.blur();
        if (editable.target.textContent.trim() === "") {
          removeRow(editable, true);
        }
      }
    });
    //e.target.classList.add("editable");
    editable.target.addEventListener("blur", () => {
      editable.target.classList.remove("editable");
      if (editable.target.textContent.trim() === "") {
        removeRow(editable, true);
      }
    });
  } else {
    let editable = e.target.parentNode.parentNode.previousElementSibling;
    //console.log(editable);
    editable.classList.add("editable");
    editable.focus();
  }
};
//refactorizar 2
const deleteTask = (e) => {
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

const removeRow = (e, editing) => {
  if (editing) {
    e.target.parentNode.parentNode.remove();
  } else {
    e.target.parentNode.parentNode.parentNode.remove();
  }
};

//refactorizar 1 - Encapsular código
const generateRow = (id, text) => {
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
  newRow.firstElementChild.firstElementChild.addEventListener("click", (e) => {
    deleteTask(e);
  });
  newRow.firstElementChild.lastElementChild.addEventListener("click", (e) => {
    editTask(e, true);
  });
  newRow.firstElementChild.nextElementSibling.firstElementChild.addEventListener(
    "clik",
    (e) => {
      editTask(e, false);
    }
  );
  newRow.lastElementChild.firstElementChild.addEventListener("click", (e) => {
    removeRow(e, false);
  });

  return newRow;
};
