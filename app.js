const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const taskCounterText = document.querySelector("#counter");
// const messagesText = document.querySelector("#supporterMessages");
let taskCounter = 0;

// supporters
function createSupporter(name, baseState, wellDoneState, concernedState, calloutState) {
    return {
        name: name,
        baseState: baseState,
        wellDoneState: wellDoneState,
        concernedState: concernedState,
        calloutState: calloutState,
        greet() {
            return `Hello! My name is ${name}. Happy to meet you!`;
        },
        wellDoneMessage() {
            return `Well done! Keep going!`;
        },
        concernedMessage () {
            return `Is everything ok? You still have a lot to do. Maybe review your targets for today?`
        },
        callOutMessage () {
            return `Careful! Creating too many tasks can be stressful and set you up for failure!`
        }
    }
}

const kana = createSupporter('Kana',
                            'assets/kana/kana_base.png',
                            'assets/kana/kana_wellDone.png',
                            'assets/kana/kana_base.png',
                            'assets/kana/kana_base.png')

                            
// add a task
function addTask() {
    if (inputBox.value === '') {
        // let's replace this by a message from the supporter later
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

// press the enter key to add the task
inputBox.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        addTask();
    }
})

// check or uncheck a task
listContainer.addEventListener("click", e => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        setTimeout(() => {
            e.target.parentElement.remove();
            // taskCounter -= 1;
            // taskCounterText.innerText = taskCounter;
            // showPopUp();
            // showMessage();
            saveData();
        }, 0); //add delay later after adding the supporter popup
    }
}, false);

// clear all the tasks in the list
function clearAllTasks() {
    let allTasks = document.querySelectorAll('li');
    allTasks.forEach(li => li.remove());
    saveData();
}

// save date on the local storage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// retrieve the tasks from the local storage and display them
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

// function showPopUp() {
//     // Display the pop-up container
//     let popUpContainer = document.getElementById("popUpContainer");
//     popUpContainer.style.display = "block";
//     // Optional: Add animation or transitions for a smoother effect
//     popUpImage.classList.add("popUpAnimation");
//     // Hide the pop-up after a certain duration (e.g., 3 seconds)
//     setTimeout(() => {
//         popUpContainer.style.display = "none";
//     }, 3000);
// }

// function showMessage() {
//     messagesText.innerText = "Well Done!";
//     messagesText.style.display = "block";
//     setTimeout(() => {
//         messagesText.style.display = "none";
//     }, 3000);
// }