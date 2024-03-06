let taskCounter = 0;
const taskCounterText = document.querySelector("#counter");

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
    taskCounter += 1;
    taskCounterText.innerText = taskCounter
  }
  
  function toggleTask(event) {
    // Check if the clicked element is a list item
    if (event.target.tagName === "LI") {
      // Toggle the "completed" class
      event.target.classList.toggle("completed");
      taskCounter -= 1
      taskCounterText.innerText = taskCounter
    }
  }
  
  function checkEnter(event) {
    // Check if the pressed key is 'Enter'
    if (event.key === "Enter") {
      // Prevent the default form submission
      event.preventDefault();
      // Call the addTask function
      addTask();
    }
  }