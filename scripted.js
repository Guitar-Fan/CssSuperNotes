document.getElementById("addTaskBtn").addEventListener("click", function() {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");
  
  if (taskInput.value !== "") {
    var newTask = document.createElement("li");
    newTask.innerText = taskInput.value;
    taskList.appendChild(newTask);
    taskInput.value = "";
    newTask.addEventListener("click", function() {
      this.classList.toggle("completed");
    });
  }
});
