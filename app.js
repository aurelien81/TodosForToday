const inputBox = document.getElementById('input-box');
const inputCheck = document.getElementById('add-task-check');
const listContainer = document.getElementById('list-container');
const taskCounterText = document.querySelector("#counter");
const themeToggle = document.getElementById('theme-toggle')
const themesList = ['light', 'dark', 'dragon']
let taskCounter = 0;
let themeSelector = 0;


// supporters factory function
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

// list of supporters
const kana = createSupporter('Kana',
                            'assets/kana/kana_base.png',
                            'assets/kana/kana_wellDone.png',
                            'assets/kana/kana_base.png',
                            'assets/kana/kana_base.png')

// change theme
themeToggle.addEventListener("click", toggleTheme);

function toggleTheme() {
    let currentTheme = document.documentElement.getAttribute("data-theme");
    if (themeSelector == themesList.length - 1) {
        themeSelector = 0;
        document.documentElement.setAttribute('data-theme', themesList[0]);
    } else {
        themeSelector++;
        document.documentElement.setAttribute('data-theme', themesList[themeSelector]);
    }
    themeToggle.innerHTML = themeSelector + 1;
    saveTheme();
}

// save theme on the local storage
function saveTheme() {
    localStorage.setItem("theme", themeSelector);
}

// retrieve the tasks from the local storage and display them
function loadTheme() {
    themeSelector = localStorage.getItem("theme");
    document.documentElement.setAttribute('data-theme', themesList[themeSelector]);
}

loadTheme();

// add a task
function addTask() {
    if (inputBox.value === '') {
        // let's replace this by a message from the supporter later
        alert("You must write something!");
    } else {
        let li = document.createElement("LI");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("SPAN");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        taskCounter++;
        taskCounterText.innerText = taskCounter;
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

// click on the check to add the task
inputCheck.addEventListener('click', e => {addTask();})

// check or uncheck a task
listContainer.addEventListener("click", e => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        setTimeout(() => {
            e.target.parentElement.remove();
            taskCounter--;
            taskCounterText.innerText = taskCounter;
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
    taskCounter = 0;
    taskCounterText.innerText = taskCounter;
    saveData();
}

// save data on the local storage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// retrieve the tasks from the local storage and display them
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

// Bottom nav and settings management

window.onload = () => {
    const buttons = document.querySelectorAll(".multi-button button");
    buttons.forEach((button, index) => {
        button.addEventListener("mouseover", () => {
            if (index > 0) {
                const prevTooltip = buttons[index-1].querySelector("div");
                prevTooltip.classList.remove("animate-right");
                prevTooltip.classList.add("animate-left");
            }
            if (index < buttons.length - 1) {
                const nextTooltip = buttons[index+1].querySelector("div");
                nextTooltip.classList.remove("animate-left");
                nextTooltip.classList.add("animate-right");
            }
        });
    });
}

// Open the sidenav
function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}
// Close/hide the sidenav
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}