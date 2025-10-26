const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("task-list");
const clearBtn = document.getElementById("clear-btn");

// Add task when button is clicked
addTaskButton.addEventListener("click", addTask);

// Add task when Enter key is pressed
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    showAlert("Please do something");
    return;
  }

  // ✅ Everything below is now inside the function
  const li = document.createElement("li");

  const taskContent = document.createElement("div");
  taskContent.classList.add("task-content");

  const taskSpan = document.createElement("span");
  taskSpan.classList.add("task-text");
  taskSpan.textContent = taskText;

  const status = document.createElement('span');
  status.textContent = "⏳";
  status.classList.add('status');
  
  taskContent.appendChild(status);
  taskContent.appendChild(taskSpan);
  li.appendChild(taskContent);

  // Mark as completed when clicked
  li.addEventListener("click", function () {
    li.classList.toggle("completed");
    status.textContent = li.classList.contains("completed") ? "✅" : "⏳";
    updateLocalStorage();
  });

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.classList.add("delete-btn");

  // Delete button removes the task
  deleteBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent click from marking as completed
    li.remove();
    updateLocalStorage();
  });

  // Attach delete button to the task
  li.appendChild(deleteBtn);

  // Add the task to the list
  taskList.appendChild(li);

  updateLocalStorage();

  // Clear the input field
  taskInput.value = "";
}

// Clear all tasks
clearBtn.addEventListener("click", function () {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
});

function showAlert(message) {
    const alertBox = document.getElementById("alertBox");
    alertBox.textContent = message;
    alertBox.classList.add("show");

    setTimeout(() => {
        alertBox.classList.remove("show");
    }, 2000);
}
//Save
function updateLocalStorage() {
 const tasks = [];
 document.querySelectorAll("#task-list li").forEach((li) => {
    const taskText = li.querySelector(".task-text").textContent.trim;
    const completed = li.classList.contains("completed");
    tasks.push({ text: taskText, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));

}
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => {
    const li = document.createElement("li");

    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    const status = document.createElement("span");
    status.classList.add("status");
    status.innerHTML = task.completed ? "✅" : "⏳";

    const taskSpan = document.createElement("span");
    taskSpan.classList.add("task-text");
    taskSpan.textContent = task.text; // ✅ only plain text, no duplicate icon

    taskContent.appendChild(status);
    taskContent.appendChild(taskSpan);
    li.appendChild(taskContent);

    if (task.completed) li.classList.add("completed");

    li.addEventListener("click", function () {
      li.classList.toggle("completed");
      status.textContent = li.classList.contains("completed")
        ? "✅"
        : "⏳";
      updateLocalStorage();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      li.remove();
      updateLocalStorage();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}
// Dark mode toggle

function toggleDarkMode() {
  const body = document.body;
  const btn = document.getElementById("darkModeToggle");
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    btn.textContent = "☀️ Light Mode";
    localStorage.setItem("darkMode", "enabled");
  } else {
    btn.textContent = "🌙 Dark Mode";
    localStorage.setItem("darkMode", "disabled");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const dark = localStorage.getItem("darkMode");
  const btn = document.getElementById("darkModeToggle");
  if (dark === "enabled") {
    document.body.classList.add("dark-mode");
    if (btn) btn.textContent = "☀️ Light Mode";
  } else {
    if (btn) btn.textContent = "🌙 Dark Mode";
  }

  // now load saved tasks
  loadTasks();
});