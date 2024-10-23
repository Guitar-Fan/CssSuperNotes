document.getElementById("addTaskBtn").addEventListener("click", function() {
  addTask();
});

// Add event listener for Enter key
document.getElementById("taskInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Add event listener for Clear All button
document.getElementById("clearTaskBtn").addEventListener("click", function() {
  var taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  saveTasks();
});

// Add event listener for Show Completed button
document.getElementById("showCompletedBtn").addEventListener("click", function() {
  var taskList = document.getElementById("taskList");
  for (var i = 0; i < taskList.children.length; i++) {
    var task = taskList.children[i];
    if (!task.classList.contains("completed")) {
      task.style.display = "none";
    } else {
      task.style.display = "list-item";
    }
  }
});

// Add event listener for Show Incomplete button
document.getElementById("showIncompleteBtn").addEventListener("click", function() {
  var taskList = document.getElementById("taskList");
  for (var i = 0; i < taskList.children.length; i++) {
    var task = taskList.children[i];
    if (task.classList.contains("completed")) {
      task.style.display = "none";
    } else {
      task.style.display = "list-item";
    }
  }
});

// Add event listener for Sort Alphabetically button
document.getElementById("sortTasksBtn").addEventListener("click", function() {
  var taskList = document.getElementById("taskList");
  var tasks = Array.from(taskList.children);
  tasks.sort(function(a, b) {
    return a.innerText.localeCompare(b.innerText);
  });
  taskList.innerHTML = "";
  tasks.forEach(function(task) {
    taskList.appendChild(task);
  });
  saveTasks();
});

function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");
  
  if (taskInput.value !== "") {
    var newTask = document.createElement("li");
    newTask.innerText = taskInput.value;

    // Add event listener to toggle 'completed' class
    newTask.addEventListener("click", function() {
      this.classList.toggle("completed");
      saveTasks();
    });

    // Create an edit button
    var editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.addEventListener("click", function() {
      var input = document.createElement("input");
      input.type = "text";
      input.value = newTask.childNodes[0].nodeValue;
      newTask.innerHTML = "";
      newTask.appendChild(input);
      input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          newTask.innerText = input.value;
          newTask.appendChild(editBtn);
          newTask.appendChild(removeBtn);
          saveTasks();
        }
      });
    });

    // Create a remove button
    var removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.addEventListener("click", function() {
      taskList.removeChild(newTask);
      saveTasks();
    });

    newTask.appendChild(editBtn);
    newTask.appendChild(removeBtn);
    taskList.appendChild(newTask);
    taskInput.value = "";
    saveTasks();
  }
}

function saveTasks() {
  var taskList = document.getElementById("taskList");
  var tasks = [];
  for (var i = 0; i < taskList.children.length; i++) {
    var task = taskList.children[i];
    tasks.push({
      text: task.childNodes[0].nodeValue,
      completed: task.classList.contains("completed")
    });
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  var tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    var taskList = document.getElementById("taskList");
    for (var i = 0; i < tasks.length; i++) {
      var task = tasks[i];
      var newTask = document.createElement("li");
      newTask.innerText = task.text;
      if (task.completed) {
        newTask.classList.add("completed");
      }

      // Add event listener to toggle 'completed' class
      newTask.addEventListener("click", function() {
        this.classList.toggle("completed");
        saveTasks();
      });

      // Create an edit button
      var editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.addEventListener("click", function() {
        var input = document.createElement("input");
        input.type = "text";
        input.value = newTask.childNodes[0].nodeValue;
        newTask.innerHTML = "";
        newTask.appendChild(input);
        input.addEventListener("keypress", function(event) {
          if (event.key === "Enter") {
            newTask.innerText = input.value;
            newTask.appendChild(editBtn);
            newTask.appendChild(removeBtn);
            saveTasks();
          }
        });
      });

      // Create a remove button
      var removeBtn = document.createElement("button");
      removeBtn.innerText = "Remove";
      removeBtn.addEventListener("click", function() {
        taskList.removeChild(newTask);
        saveTasks();
      });

      newTask.appendChild(editBtn);
      newTask.appendChild(removeBtn);
      taskList.appendChild(newTask);
    }
  }
}

// Load tasks when the page is loaded
window.onload = loadTasks;