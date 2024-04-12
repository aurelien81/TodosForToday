const inputBox = document.getElementById('input-box');
const inputCheck = document.getElementById('add-task-check');
const listContainer = document.getElementById('list-container');
const taskCounterText = document.querySelector('#counter');
const tooltipSwitch = document.getElementById('s1-14')

const lightThemeSelector = document.getElementById('light-theme-selector')
const darkThemeSelector = document.getElementById('dark-theme-selector')
const dragonThemeSelector = document.getElementById('dragon-theme-selector')

let taskList = [];
let statusList = [];
let taskCounter = 0;

// list of supporters
const kana = createSupporter('Kana',
                            'assets/kana/kana_base.png',
                            'assets/kana/kana_wellDone.png',
                            'assets/kana/kana_base.png',
                            'assets/kana/kana_base.png')


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

// change theme
lightThemeSelector.addEventListener('click', e => {
    document.documentElement.setAttribute('data-theme', 'light');
    saveTheme('light');
    closeNav();
})

darkThemeSelector.addEventListener('click', e => {
    document.documentElement.setAttribute('data-theme', 'dark');
    saveTheme('dark');
    closeNav();
})

dragonThemeSelector.addEventListener('click', e => {
    document.documentElement.setAttribute('data-theme', 'dragon');
    saveTheme('dragon');
    closeNav();
})

function saveTheme(chosenTheme) {
    localStorage.setItem("theme", chosenTheme);
}

function loadTheme() {
    chosenTheme = localStorage.getItem("theme");
    document.documentElement.setAttribute('data-theme', chosenTheme);
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
        taskList.push(inputBox.value);
        statusList.push(false);
        console.log(taskList);
        console.log(statusList);
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

// click on the check to add the task
inputCheck.addEventListener('click', e => {addTask();})

// press the enter key to add the task
inputBox.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        addTask();
    }
})

// check, uncheck or delete a task
listContainer.addEventListener("click", e => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        let taskText = e.target.innerText.slice(0, -2);
        let taskIndex = taskList.indexOf(taskText);
        statusList[taskIndex] = true;
        console.log(taskList);
        console.log(statusList);
        saveData();
    } else if (e.target.tagName === "SPAN") {
        setTimeout(() => {
            let taskText = e.target.parentElement.innerText.slice(0, -2);
            let taskIndex = taskList.indexOf(taskText);
            taskList.splice(taskIndex, 1);
            statusList.splice(taskIndex, 1);
            console.log(taskList);
            console.log(statusList);
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


// Copy the tasks in markdown to clipboard

function exportMarkdown() {
    // Get the text field
    for 
    let copyText = [];
    let copyText = taskList.map(i => '--[x] ' + i);
    copyText = copyText.join('\n');
    console.log(copyText)

    // Copy the text inside the text field
    // navigator.clipboard.writeText(copyText.value);
    
    // Alert the copied text
    // alert("Copied the text: " + copyText.value);
}