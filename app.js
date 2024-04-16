const todoAppContainer = document.getElementById('todo-app-container');
const inputBox = document.getElementById('input-box');
const inputCheck = document.getElementById('add-task-check');
const listContainer = document.getElementById('list-container');
const taskCounterText = document.querySelector('#counter');
const tooltipSwitch = document.getElementById('s1-14');
const logseqSwitch = document.getElementById('s1-15');

const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const closeModal = document.getElementsByClassName("close")[0];

const gradientToFadeOut = document.getElementById('gradient-to-fade');
const lightThemeSelector = document.getElementById('light-theme-selector')
const darkThemeSelector = document.getElementById('dark-theme-selector')
const sunsetThemeSelector = document.getElementById('sunset-theme-selector')

let taskList = [];
let statusList = [];
let taskCounter = 0;
let currentTheme = 'light';
let currentSupporter = '';
// let tooltipSwitchStatus = tooltipSwitch.addEventListener('click', e => {console.log(tooltipSwitch.checked);});
// let logseqSwitchStatus = logseqSwitch.addEventListener('click', e => {console.log(logseqSwitch.checked);});

// list of supporters
const kana = createSupporter('Kana',
                            'assets/kana/kana_base.png',
                            'assets/kana/kana_wellDone.png',
                            'assets/kana/kana_base.png',
                            'assets/kana/kana_base.png')


// ------ supporters factory function
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

// ------ Themes
lightThemeSelector.addEventListener('click', e => {
    gradientToFadeOut.setAttribute('data-theme', currentTheme);
    gradientToFadeOut.classList.add('gradient-background');
    gradientToFadeOut.style.opacity = 1.0;
    document.documentElement.setAttribute('data-theme', 'light');
    gradientFadeOut();
    localStorage.setItem("theme", 'light');
    currentTheme = 'light';
    closeNav();
})

darkThemeSelector.addEventListener('click', e => {
    gradientToFadeOut.setAttribute('data-theme', currentTheme);
    gradientToFadeOut.classList.add('gradient-background');
    gradientToFadeOut.style.opacity = 1.0;
    document.documentElement.setAttribute('data-theme', 'dark');
    gradientFadeOut();
    localStorage.setItem("theme", 'dark');
    currentTheme = 'dark';
    closeNav();
})

sunsetThemeSelector.addEventListener('click', e => {
    gradientToFadeOut.setAttribute('data-theme', currentTheme);
    gradientToFadeOut.classList.add('gradient-background');
    gradientToFadeOut.style.opacity = 1.0;
    document.documentElement.setAttribute('data-theme', 'sunset');
    gradientFadeOut()
    localStorage.setItem("theme", 'sunset');
    currentTheme = 'sunset';
    closeNav();
})

function loadTheme() {
    currentTheme = localStorage.getItem("theme");
    document.documentElement.setAttribute('data-theme', currentTheme);
}

loadTheme();

function gradientFadeOut() {
    gradientToFadeOut.style.opacity -= 0.1;
    if(gradientToFadeOut.style.opacity < 0.0) {
        gradientToFadeOut.style.opacity = 0.0;
    } else {
    setTimeout(gradientFadeOut, 100);
    }
}

// ------ Tasks management
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

// click on the check mark to add the task
inputCheck.addEventListener('click', e => {addTask();})

// press the enter key to add the task
inputBox.addEventListener('keydown', e => {
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
        statusList[taskIndex] = !statusList[taskIndex];
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
            saveData();
        }, 0); //add delay later after adding the supporter popup
    }
}, false);

// clear all the tasks in the list
function clearAllTasks() {
    let allTasks = document.querySelectorAll('li');
    allTasks.forEach(li => li.remove());
    taskList = [];
    statusList = [];
    taskCounter = 0;
    taskCounterText.innerText = taskCounter;
    saveData();
}

// save the tasks on the local storage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// retrieve the tasks from the local storage and display them
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

// ------ Bottom nav, Side Nav and settings management
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

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// press the esc key to close side navigation OR modal
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (document.getElementById("mySidenav").style.width === "100%") {
            closeNav();
        } else if (modal.style.display === "block") {
            modal.style.display = "none";
            // todoAppContainer.classList.remove('blur');
        } 
    }
});

// Copy the tasks in markdown to clipboard
function exportMarkdown() {
    // Get the text field
    let markdownArr = [];
    for (i = 0; i < statusList.length; i += 1) {
        if (statusList[i] === false) {
            markdownArr[i] = '- [ ] ';
        } else {
            markdownArr[i] = '- [x] ';
        }
    };
    if (markdownArr.length === 0) {
        alert("There is nothing to copy!");
    } else {
        let exportArr = [];
        for (i = 0; i < markdownArr.length; i += 1) {
            exportArr.push(markdownArr[i] + taskList[i]);
        }

        let copyText = exportArr.join('\n');
        navigator.clipboard.writeText(copyText).then(() => {
            markdownArr = [];
            exportArr = [];
            alert("Copied to clipboard");
        });
    }
}

// Modal management

// Opening and closing the modal
btn.onclick = function() {
    modal.style.display = "block";
    // todoAppContainer.classList.add('blur');
}

closeModal.onclick = function() {
    modal.style.display = "none";
    // todoAppContainer.classList.remove('blur');
}