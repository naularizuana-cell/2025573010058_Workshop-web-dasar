const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priority");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const deleteCompletedBtn = document.getElementById("deleteCompleted");

const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

// ==========================
// SIMPAN LOCAL STORAGE
// ==========================
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ==========================
// TAMBAH TUGAS
// ==========================
addBtn.addEventListener("click", addTask);

function addTask() {
  const text = taskInput.value.trim();

  // VALIDASI
  if (text === "") {
    alert("Tugas tidak boleh kosong!");
    return;
  }

  if (text.length < 3) {
    alert("Minimal 3 karakter!");
    return;
  }

  if (text.length > 100) {
    alert("Maksimal 100 karakter!");
    return;
  }

  const task = {
    id: Date.now(),
    text: text,
    completed: false,
    priority: priorityInput.value,
  };

  tasks.push(task);

  saveTasks();

  renderTasks();

  taskInput.value = "";
}

// ==========================
// RENDER TASK
// ==========================
function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  // FILTER
  if (currentFilter === "active") {
    filteredTasks = tasks.filter((task) => !task.completed);
  }

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");

    li.className = `task ${task.completed ? "completed" : ""}`;

    li.draggable = true;

    // PRIORITAS
    let priorityClass = "";

    if (task.priority === "Rendah") {
      priorityClass = "low";
    }

    if (task.priority === "Sedang") {
      priorityClass = "medium";
    }

    if (task.priority === "Tinggi") {
      priorityClass = "high";
    }

    li.innerHTML = `

      <div class="task-left">

        <input
          type="checkbox"
          ${task.completed ? "checked" : ""}
        >

        <span>${task.text}</span>

        <div class="priority ${priorityClass}">
          ${task.priority}
        </div>

      </div>

      <button class="delete-btn">
        Hapus
      </button>

    `;

    // CHECKBOX
    const checkbox = li.querySelector("input");

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;

      saveTasks();

      renderTasks();
    });

    // DELETE
    const deleteBtn = li.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);

      saveTasks();

      renderTasks();
    });

    // EDIT TASK
    const span = li.querySelector("span");

    span.addEventListener("dblclick", () => {
      const input = document.createElement("input");

      input.type = "text";

      input.value = task.text;

      input.className = "edit-input";

      span.replaceWith(input);

      input.focus();

      // SIMPAN EDIT
      function saveEdit() {
        const newText = input.value.trim();

        if (newText.length >= 3 && newText.length <= 100) {
          task.text = newText;

          saveTasks();

          renderTasks();
        } else {
          alert("Teks harus 3-100 karakter");
        }
      }

      input.addEventListener("blur", saveEdit);

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          saveEdit();
        }
      });
    });

    // DRAG START
    li.addEventListener("dragstart", () => {
      li.classList.add("dragging");
    });

    // DRAG END
    li.addEventListener("dragend", () => {
      li.classList.remove("dragging");

      updateTaskOrder();
    });

    taskList.appendChild(li);
  });

  updateCounter();
}

// ==========================
// FILTER BUTTON
// ==========================
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    renderTasks();
  });
});

// ==========================
// COUNTER
// ==========================
function updateCounter() {
  const remaining = tasks.filter((task) => !task.completed).length;

  counter.innerText = `${remaining} tugas tersisa`;
}

// ==========================
// HAPUS SEMUA SELESAI
// ==========================
deleteCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);

  saveTasks();

  renderTasks();
});

// ==========================
// DRAG & DROP
// ==========================
taskList.addEventListener("dragover", (e) => {
  e.preventDefault();

  const dragging = document.querySelector(".dragging");

  const afterElement = getDragAfterElement(taskList, e.clientY);

  if (afterElement == null) {
    taskList.appendChild(dragging);
  } else {
    taskList.insertBefore(dragging, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".task:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();

      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return {
          offset: offset,
          element: child,
        };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    },
  ).element;
}

// ==========================
// UPDATE URUTAN TASK
// ==========================
function updateTaskOrder() {
  const taskElements = document.querySelectorAll(".task");

  const newTasks = [];

  taskElements.forEach((el) => {
    const text = el.querySelector("span").innerText;

    const foundTask = tasks.find((task) => task.text === text);

    if (foundTask) {
      newTasks.push(foundTask);
    }
  });

  tasks = newTasks;

  saveTasks();
}

// ==========================
// LOAD PERTAMA
// ==========================
renderTasks();
