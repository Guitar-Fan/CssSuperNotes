document.getElementById("addTaskBtn").addEventListener("click", function() {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");
  
  if (taskInput.value !== "") {
    var newTask = document.createElement("li");
    newTask.innerText = taskInput.value;

    // Add event listener to toggle 'completed' class
    newTask.addEventListener("click", function() {
      this.classList.toggle("completed");
    });

    // Create a remove button
    var removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.addEventListener("click", function() {
      taskList.removeChild(newTask);
    });

    newTask.appendChild(removeBtn);
    taskList.appendChild(newTask);
    taskInput.value = "";
  }
});

// Add event listener for Enter key
document.getElementById("taskInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    document.getElementById("addTaskBtn").click();
  }
});

// Add event listener for Clear All button
document.getElementById("clearTaskBtn").addEventListener("click", function() {
  var taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
});