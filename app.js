const todoAppContainer = document.getElementById('todo-app-container');
const alertBox = document.getElementById("alert-box");
const alertMessage = document.getElementById("alert-message-content");
const taskCounterText = document.getElementById("counter");
const inputBox = document.getElementById('input-box');
const inputCheck = document.getElementById('add-task-check');
const listContainer = document.getElementById('list-container');

const modal = document.getElementById("myModal");
const modalContent = document.getElementById('myModalContent');
const supporterAvatar = document.getElementById('supporter-avatar');
const dialogBox = document.getElementById('dialog-box');
const response = document.getElementById('response');
const closeModalBtn = document.getElementsByClassName("close")[0];

const gradientToFadeOut = document.getElementById('gradient-to-fade');
const lightThemeSelector = document.getElementById('light-theme-selector')
const darkThemeSelector = document.getElementById('dark-theme-selector')
const sunsetThemeSelector = document.getElementById('sunset-theme-selector')
const exportSwitch = document.getElementById('export-switch');

const supportersArray = [];

let taskList = [];
let taskCounter = 0;
let currentTheme = 'light';
let currentSupporter = '';
let supporterChosen = '';
let noSupporter = true;
let pos = 0;
let opa = 0;
let incrementer = 1;
const topLimit = 0;
const bottomLimit = 300;

// || Debugging buttons ||

const btn = document.getElementById("myBtn");
const btnTwo = document.getElementById("myBtn2");

// modal
btn.onclick = function() {
    if (noSupporter === true) {
        showAlert("Supporter none selected");
    } else {
        supporterPopUp(currentSupporter.baseState, currentSupporter.greet(), '');
    }
}

// clear local storage
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
                            'assets/kana/kana_callOut.png');

const junho = createSupporter('Junho',
                            'assets/junho/junho_base.png',
                            'assets/junho/junho_base.png',
                            'assets/junho/junho_base.png',
                            'assets/junho/junho_base.png');

const noemie = createSupporter('Noemie',
                            'assets/noemie/noemie_base.png',
                            'assets/noemie/noemie_wellDone.png',
                            'assets/noemie/noemie_base.png',
                            'assets/noemie/noemie_base.png');

const nicolau = createSupporter('Nicolau',
                            'assets/nicolau/nicolau_base.png',
                            'assets/nicolau/nicolau_base.png',
                            'assets/nicolau/nicolau_base.png',
                            'assets/nicolau/nicolau_base.png');

const nova = createSupporter('Nova',
                            'assets/nova/nova_base.png',
                            'assets/nova/nova_base.png',
                            'assets/nova/nova_base.png',
                            'assets/nova/nova_base.png');

// supporter selection
function selectSupporter(supporterChosen) {
    if (supporterChosen === 'noSupporter') {
        noSupporter = true;
        currentSupporter = '';
        saveSupporterStatus();
        removeSupporter();
        showAlert("You turned off the supporter option.");
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

function saveExportStatus() {
    if (exportSwitch.checked == true) {
        localStorage.setItem("exportStatus", "checked");
    } else {
        localStorage.setItem("exportStatus", "not-checked"); 
    }
    console.log(exportSwitch.checked)
}

function loadExportStatus() {
    const savedExportStatus = localStorage.getItem("exportStatus");
    if (savedExportStatus && savedExportStatus == "checked") {
        exportSwitch.checked = true;
    } else if (savedExportStatus && savedExportStatus == "not-checked") {
        exportSwitch.checked = false;
    } else if (!savedExportStatus) {
        exportSwitch.checked = false;
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
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function loadTasks() {
    listContainer.innerHTML = localStorage.getItem("tasks");
}

function saveTaskList() {
    let taskListStringSave = JSON.stringify(taskList);
    localStorage.setItem("task-list", taskListStringSave);
}

function loadTaskList() {
    if (localStorage.getItem("task-list")) {
    let taskListStringLoad = localStorage.getItem("task-list");
    taskList = JSON.parse(taskListStringLoad);
    }
}

loadSupporterStatus();
console.log(noSupporter);

loadSupporter()
console.log(currentSupporter.name);

loadTasks();
console.log("List container:", listContainer.innerHTML);

loadTaskList()
console.log("Task List:", taskList);

loadExportStatus()
console.log(exportSwitch.checked);

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
            showAlert("You must enter somthing first.");
        }
    } else {
        let li = document.createElement("LI");
        li.classList.add("listItem");
        li.innerHTML = inputBox.value;
        taskList.push(inputBox.value);
        listContainer.appendChild(li);
        let span = document.createElement("SPAN");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        taskCounter++;
        taskCounterText.innerText = taskCounter;
    }
    inputBox.value = '';
    saveTasks();
    saveTaskList();
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
        saveTasks();
        saveTaskList();
    } else if (e.target.tagName === "SPAN") {
        let taskText = e.target.parentElement.innerText.slice(0, -2);
        e.target.parentElement.remove();
        taskCounter--;
        taskCounterText.innerText = taskCounter;
        saveTasks();
        saveTaskList()
    }
}, false);

// clear all the tasks in the list
function clearAllTasks() {
    let allTasks = document.querySelectorAll('li');
    allTasks.forEach(li => li.remove());
    taskList = [];
    taskCounter = 0;
    taskCounterText.innerText = taskCounter;
    saveTasks();
    saveTaskList();
}

// || settings menu & bottom nav management ||

let escapeSettingsMenu;

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
    let markdownArr = [];
    const listItems = document.querySelectorAll(".listItem");
    if (exportSwitch.checked === false) {
        for (i = 0; i < taskList.length; i += 1) {
            if (listItems[i].classList.contains("checked")) {
                markdownArr[i] = '- [x] ';
            } else {
                markdownArr[i] = '- [ ] ';
            }
        };
    } else {
        for (i = 0; i < statusList.length; i += 1) {
            if (listItems[i].classList.contains("checked")) {
                markdownArr[i] = '\nDONE ';
            } else {
                markdownArr[i] = '\nTODO ';
            }
        };
    }

    if (markdownArr.length === 0) {
        if (noSupporter === false) {
            supporterPopUp(currentSupporter.calloutState, currentSupporter.nothingToCopyMessage(), '');
            setTimeout(() => {
                closeModal();
            }, 2000);
        } else {
            showAlert("There are no tasks to copy!");
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
            showAlert("Copied to clipboard");
        });
    }
}

// || alerts management ||

function showAlert(message) {
    alertMessage.innerHTML = message;
    alertBox.style.display = "block";
    setTimeout(() => {
        closeAlert();
    }, 2000);
}

function closeAlert() {
    alertBox.style.display = "none";
}