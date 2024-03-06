let taskCounter = 0;
const taskCounterText = document.querySelector("#counter");

function addTask() {
    // Get the input value
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value;
    // Clear the input field
    taskInput.value = "";
    // Check if the input is not empty
    if (taskText.trim() === "") {
        // Alert the user or handle the empty input case as needed
        alert("Please enter a task.");
        return;
    }
    // Create a new list item
    let listItem = document.createElement("li");
    listItem.textContent = taskText;
    // Append the new item to the main task list
    let taskList = document.getElementById("taskList");
    taskList.appendChild(listItem);
    taskCounter += 1;
    taskCounterText.innerText = taskCounter;
    updateStyling();
}

  function toggleTask(event) {
    // Check if the clicked element is a list item
    if (event.target.tagName === "LI") {
      // Toggle the "completed" class
      event.target.classList.toggle("completed");
      // If the task is marked as completed, remove it with a fade-out effect
      if (event.target.classList.contains("completed")) {
        event.target.style.opacity = 0;
        setTimeout(() => {
        event.target.remove();
        taskCounter -= 1
        taskCounterText.innerText = taskCounter
        updateStyling();
        }, 750); // Duration of the fade-out effect (in milliseconds)
      }
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

  function updateStyling() {
    // Apply red text style to subsequent tasks beyond the first five
    let taskList = document.getElementById("taskList");
    let tasks = taskList.children;
  
    for (let i = 0; i < tasks.length; i++) {
      tasks[i].classList.toggle("dangerZone", i >= 5 && i >= taskCounter);
    }
  }

  function updateStyling() {
    // Apply red text style to subsequent tasks beyond the first five
    let taskList = document.getElementById("taskList");
    let tasks = taskList.children;
    for (let i = 0; i < tasks.length; i++) {
        if (i >= 5 && taskCounter > 5) {
          tasks[i].classList.add("dangerZone");
        } else {
          tasks[i].classList.remove("dangerZone");
        }
      }
    }