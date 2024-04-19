const todoAppContainer = document.getElementById('todo-app-container');
const inputBox = document.getElementById('input-box');
const inputCheck = document.getElementById('add-task-check');
const listContainer = document.getElementById('list-container');
const taskCounterText = document.querySelector('#counter');
const tooltipSwitch = document.getElementById('s1-14');
const logseqSwitch = document.getElementById('s1-15');
const supporterAvatar = document.getElementById('supporter-avatar');
const dialogBox = document.getElementById('dialog-box');
const response = document.getElementById('response');

const modal = document.getElementById("myModal");
const modalContent = document.getElementById('myModalContent');
const btn = document.getElementById("myBtn");
const btnTwo = document.getElementById("myBtn2");
const closeModalBtn = document.getElementsByClassName("close")[0];

const gradientToFadeOut = document.getElementById('gradient-to-fade');
const lightThemeSelector = document.getElementById('light-theme-selector')
const darkThemeSelector = document.getElementById('dark-theme-selector')
const sunsetThemeSelector = document.getElementById('sunset-theme-selector')

const supportersArray = [];

let taskList = [];
let statusList = [];
let taskCounter = 0;
let currentTheme = 'light';
let currentSupporter = '';
let supporterChosen = '';
let noSupporter = false;
let pos = 0;
let opa = 0;
let incrementer = 1;
const topLimit = 0;
const bottomLimit = 300;
// let tooltipSwitchStatus = tooltipSwitch.addEventListener('click', e => {console.log(tooltipSwitch.checked);});
// let logseqSwitchStatus = logseqSwitch.addEventListener('click', e => {console.log(logseqSwitch.checked);});

// || Debugging buttons ||

// Modal
btn.onclick = function() {
    if (noSupporter === true) {
        alert("supporter none selected");
    } else {
        supporterPopUp(currentSupporter.baseState, currentSupporter.greet(), '');
    }
}

// Clear local storage
btnTwo.onclick = function() {
    localStorage.clear();
}

// || supporters management ||

// supporters factory function
function createSupporter(name, baseState, wellDoneState, concernedState, calloutState) {
    const supporter = {
        name: name,
        baseState: baseState,
        wellDoneState: wellDoneState,
        concernedState: concernedState,
        calloutState: calloutState,
        greet() {
            return `Hello! My name is ${name}. Happy to meet you!`;
        },
        writeSomethingMessage() {
            return `Hey! You have to enter a task first!`;
        },
        wellDoneMessage() {
            return `Well done! Keep going!`;
        },
        concernedMessage () {
            return `Is everything ok? You still have a lot to do. Maybe review your targets for today?`
        },
        callOutMessage () {
            return `Careful! Creating too many tasks can be stressful and set you up for failure!`
        },
        nothingToCopyMessage () {
            return `There are no tasks to copy.`
        }
    };
    supportersArray.push(supporter);
    return supporter;
}

// list of supporters
const kana = createSupporter('Kana',
                            'assets/kana/kana_base.png',
                            'assets/kana/kana_wellDone.png',
                            'assets/kana/kana_concerned.png',
                            'assets/kana/kana_callOut.png')

// supporter selection
function selectSupporter(supporterChosen) {
    if (supporterChosen === 'noSupporter') {
        noSupporter = true;
        currentSupporter = '';
        saveSupporterStatus();
        removeSupporter();
        alert("You turned off the supporter option.");
        closeModal();
    } else {
        supporterPopUp(supporterChosen.baseState, supporterChosen.greet(), 'Accept ' + supporterChosen.name);
        response.onclick = function() {
            currentSupporter = supporterChosen;
            noSupporter = false;
            console.log(currentSupporter.name);
            saveSupporter();
            saveSupporterStatus();
            closeModal();
        }
    }
}

function supporterPopUp(state, modalMessage, responseMessage) {
    supporterAvatar.src = state;
    dialogBox.innerHTML = modalMessage;
    response.innerHTML = responseMessage;
    openModal();
}

// || local storage management ||

function saveSupporterStatus() {
    localStorage.setItem("supporterStatus", noSupporter);
}

function loadSupporterStatus() {
    const savedSupporterStatus = localStorage.getItem("supporterStatus");
    if (savedSupporterStatus) {
        noSupporter = savedSupporterStatus;
    }
}

function saveSupporter() {
    localStorage.setItem("supporterName", currentSupporter.name);
}

function removeSupporter() {
    const savedSupporterName = localStorage.getItem("supporterName");
    if (savedSupporterName) {
        localStorage.removeItem("supporterName");
    }
}

function loadSupporter() {
    const savedSupporterName = localStorage.getItem("supporterName");
    if (savedSupporterName) {
        currentSupporter = findSupporterByName(savedSupporterName);
    }
}

function findSupporterByName(name) {
    for (const supporter of supportersArray) {
        if (supporter.name === name) {
            return supporter;
        }
    }
    return null;
}

function saveTasks() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function loadTasks() {
    listContainer.innerHTML = localStorage.getItem("data");
}

loadSupporterStatus();
console.log(noSupporter);

loadSupporter()
console.log(currentSupporter.name);

loadTasks();
console.log(listContainer.innerHTML);

// || modal management ||

function openModal() {
    pos = -300;
    opa = 0;
    incrementer = 24;

    function slideInFadeIn() {
        pos = pos + (1 * incrementer);
        incrementer--;
        opa = opa + 0.05;
        modalContent.style.bottom = pos + 'px';
        modal.style.opacity = opa;
        if (pos >= topLimit && opa >= 1) {
            clearInterval(slideInFadeInAnimation);
        }
    }

    modal.style.display = "block";
    const slideInFadeInAnimation = setInterval(slideInFadeIn, 15);

    setTimeout(() => {
        modalContent.style.bottom = '0';
        modal.style.opacity = '1';
    }, 400);
}

function closeModal() {  
    pos = 0;
    opa = 1;
    incrementer = 1;
    
    function slideOutFadeOut() {
        pos = pos - (1 * incrementer);
        incrementer++;
        opa = opa - 0.05;
        modalContent.style.bottom = pos + 'px';
        modal.style.opacity = opa;
        if (pos < bottomLimit && opa <= 0) {
            clearInterval(slideOutFadeOutAnimation);
        }
    }

    const slideOutFadeOutAnimation = setInterval(slideOutFadeOut, 15);
    setTimeout(() => {
        modal.style.display = "none";
        modalContent.style.bottom = '-300px';
        modal.style.opacity = '0';
    }, 350);
}

// Button to close the modal
closeModalBtn.onclick = function() {
    closeModal();
}

// || themes management ||

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

// || tasks management ||

function addTask() {
    if (inputBox.value === '') {
        if (noSupporter === false) {
            supporterPopUp(currentSupporter.calloutState, currentSupporter.writeSomethingMessage(), '');
            setTimeout(() => {
                closeModal();
            }, 2000);
        } else {
            alert ('You must enter somthing first.');
        }
    } else {
        let li = document.createElement("LI");
        li.innerHTML = inputBox.value;
        taskList.push(inputBox.value);
        statusList.push(false);
        listContainer.appendChild(li);
        let span = document.createElement("SPAN");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        taskCounter++;
        taskCounterText.innerText = taskCounter;
    }
    inputBox.value = '';
    saveTasks();
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
    if (e.target.tagName === "LI" && !e.target.classList.contains('checked')) {
        e.target.classList.add("checked");
        let taskText = e.target.innerText.slice(0, -2);
        let taskIndex = taskList.indexOf(taskText);
        statusList[taskIndex] = !statusList[taskIndex];
        saveTasks();
        if (noSupporter === false) {
            supporterPopUp(currentSupporter.wellDoneState, currentSupporter.wellDoneMessage(), '')
            setTimeout(() => {
                closeModal();
            }, 2000);
        }
    } else if (e.target.tagName === "LI" && e.target.classList.contains('checked')) {
        e.target.classList.remove("checked");
        let taskText = e.target.innerText.slice(0, -2);
        let taskIndex = taskList.indexOf(taskText);
        statusList[taskIndex] = !statusList[taskIndex];
        saveTasks();
    } else if (e.target.tagName === "SPAN") {
        let taskText = e.target.parentElement.innerText.slice(0, -2);
        let taskIndex = taskList.indexOf(taskText);
        taskList.splice(taskIndex, 1);
        statusList.splice(taskIndex, 1);
        e.target.parentElement.remove();
        taskCounter--;
        taskCounterText.innerText = taskCounter;
        saveTasks();
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
    saveTasks();
}

// || settings menu & bottom nav management ||

let escapeSettingsMenu = '';

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    escapeSettingsMenu = document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            if (document.getElementById("mySidenav").style.width === "100%") {
                closeNav();
            } 
        }
    });
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.removeEventListener('keydown', escapeSettingsMenu);
}

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
        if (noSupporter === false) {
            supporterPopUp(currentSupporter.calloutState, currentSupporter.nothingToCopyMessage(), '');
            setTimeout(() => {
                closeModal();
            }, 2000);
        } else {
            alert("There are no tasks to copy!");
        }
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

