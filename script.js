function addTask() {
    // Get the input value
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value;
  
    // Clear the input field
    taskInput.value = "";
  
    // Create a new list item
    let listItem = document.createElement("li");
    listItem.textContent = taskText;
  
    // Append the new item to the task list
    let taskList = document.getElementById("taskList");
    taskList.appendChild(listItem);
}
  
function toggleTask(event) {
    // Check if the clicked element is a list item
    if (event.target.tagName === "LI") {
      // Toggle the "completed" class
      event.target.classList.toggle("completed");
    }
}
  