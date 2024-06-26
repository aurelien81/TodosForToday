const todoAppContainer = document.getElementById('todo-app-container');
const alertBox = document.getElementById("alert-box");
const alertMessage = document.getElementById("alert-message-content");
const inputBox = document.getElementById('input-box');
const inputCheck = document.getElementById('add-task-check');
const listContainer = document.getElementById('list-container');

const modal = document.getElementById("myModal");
const modalContent = document.getElementById('myModalContent');
const supporterAvatar = document.getElementById('supporter-avatar');
const dialogBox = document.getElementById('dialog-box');
const welcomeMessage = document.getElementById('welcome-message');
const response = document.getElementById('response');
const closeModalBtn = document.getElementsByClassName("close")[0];

const gradientToFadeOut = document.getElementById('gradient-to-fade');
const exportSwitch = document.getElementById('export-switch');

const supportersArray = [];

let taskList = [];
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

// Remove the 'hide' class in html to see the buttons

const btn = document.getElementById("myBtn");
const btnTwo = document.getElementById("myBtn2");

// modal
btn.onclick = function() {
    if (noSupporter === true) {
        showAlert("Supporter none selected");
        setTimeout(() => {
            closeAlert();
        }, 2000);
    } else {
        supporterPopUp(currentSupporter.baseState, currentSupporter.greet(), '');
    }
}

// clear local storage
btnTwo.onclick = function() {
    localStorage.clear();
}

// || First open management ||

function veryFirstOpen() {
    const alreadyOpened = localStorage.getItem('veryFirstOpenShown');
    const openedMessage = 'welcome message shown'
    if (!alreadyOpened) {
        welcomeMessage.style.display = 'block';
        setTimeout(() => {
            supporterPopUp("", "", "I understand");
        }, 2000);
        response.onclick = function() {
        closeModal();
        welcomeMessage.style.display = 'none';
        openNav();
        setTimeout(() => {
            showAlert("Choose your supporter");
        }, 1000);
        setTimeout(() => {
            closeAlert();
        }, 4000);
        }
        localStorage.setItem('veryFirstOpenShown', openedMessage);
    }
    
}

veryFirstOpen();

// || supporters management ||

// supporters factory function
function createSupporter(name, 
                        baseState,
                        wellDoneState,
                        concernedState,
                        callOutState,
                        personalGreeting,
                        personalCallOut,
                        personalWellDone, 
                        personalConcern, 
                        personalNoTasks) {
    const supporter = {
        name: name,
        baseState: baseState,
        wellDoneState: wellDoneState,
        concernedState: concernedState,
        callOutState: callOutState,
        greet() {
            return `${personalGreeting}! My name is ${name}. Happy to meet you!`;
        },
        writeSomethingMessage() {
            return `${personalCallOut}! You have to enter a task first!`;
        },
        wellDoneMessage() {
            return `${personalWellDone}`;
        },
        concernedMessage () {
            return `${personalConcern} Maybe review your targets for today?`;
        },
        callOutMessage () {
            return `${personalCallOut}! Creating too many tasks can be stressful and set you up for failure!`;
        },
        nothingToCopyMessage() {
            return `${personalNoTasks}`;
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
                            'assets/kana/kana_callOut.png',
                            "Hey there",
                            "Hold on",
                            "Nice one! Keep it up.",
                            "Are you doing ok?", 
                            "There are not tasks to copy in here.");

const junho = createSupporter('Junho',
                            'assets/junho/junho_base.png',
                            'assets/junho/junho_wellDone.png',
                            'assets/junho/junho_base.png',
                            'assets/junho/junho_base.png',
                            "Hello",
                            "Wait a minute",
                            "You're doing great! Keep going.",
                            "Looks like you're falling a bit behind.", 
                            "Oh dear! There are no tasks to copy.");

const noemie = createSupporter('Noemie',
                            'assets/noemie/noemie_base.png',
                            'assets/noemie/noemie_wellDone.png',
                            'assets/noemie/noemie_base.png',
                            'assets/noemie/noemie_base.png',
                            "Howdy",
                            "Hold your horses",
                            "That's some great task shooting! Continue.",
                            "Haven't shot many tasks so far.",
                            "Dang! No bullets to copy in this shooter!");

const nicolau = createSupporter('Nicolau',
                            'assets/nicolau/nicolau_base.png',
                            'assets/nicolau/nicolau_wellDone.png',
                            'assets/nicolau/nicolau_base.png',
                            'assets/nicolau/nicolau_base.png',
                            "Hey Champ",
                            "Come on",
                            "Fist bump! And onto the next one.",
                            "You've got a lot left to do, champ.", 
                            "No tasks to copy today champ!");

const nova = createSupporter('Nova',
                            'assets/nova/nova_base.png',
                            'assets/nova/nova_wellDone.png',
                            'assets/nova/nova_base.png',
                            'assets/nova/nova_base.png',
                            "Hey there",
                            "Oh no, wait",
                            "Wow, impressive! Let's continue.",
                            "Are we sure about all the tasks left for today?",
                            "Oh no! What happened? There are no tasks to copy.");

// supporter selection
function selectSupporter(supporterChosen) {
    if (supporterChosen === 'noSupporter') {
        noSupporter = true;
        currentSupporter = '';
        saveSupporterStatus();
        removeSupporter();
        showAlert("You turned off the supporter option.");
        setTimeout(() => {
            closeAlert();
        }, 2000);
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

function loadTheme() {
    currentTheme = localStorage.getItem("theme");
    document.documentElement.setAttribute('data-theme', currentTheme);
}

loadTheme();

loadSupporterStatus();
// console.log(noSupporter);
loadSupporter()
// console.log(currentSupporter.name);
loadTasks();
// console.log("List container:", listContainer.innerHTML);
loadTaskList()
// console.log("Task List:", taskList);
loadExportStatus()
// console.log(exportSwitch.checked);

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


function setTheme(chosenTheme) {
    gradientToFadeOut.setAttribute('data-theme', currentTheme);
    gradientToFadeOut.classList.add('gradient-background');
    gradientToFadeOut.style.opacity = 1.0;
    document.documentElement.setAttribute('data-theme', chosenTheme);
    gradientFadeOut();
    localStorage.setItem("theme", chosenTheme);
    currentTheme = chosenTheme;
    closeNav();
}

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
            showAlert("You must enter something first.");
            setTimeout(() => {
                closeAlert();
            }, 2000);
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
    }
    inputBox.value = '';
    updateTaskTextColor();
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
        if (noSupporter === false) {
            supporterPopUp(currentSupporter.wellDoneState, currentSupporter.wellDoneMessage(), '')
            setTimeout(() => {
                closeModal();
            }, 2000);
        }
    } else if (e.target.tagName === "LI" && e.target.classList.contains('checked')) {
        e.target.classList.remove("checked");
        let taskText = e.target.innerText.slice(0, -2);
    } else if (e.target.tagName === "SPAN") {
        let taskText = e.target.parentElement.innerText.slice(0, -2);
        e.target.parentElement.remove();
    }
    updateTaskTextColor();
    saveTasks();
    saveTaskList();
}, false);

// update text color when there are more than 5 tasks
function updateTaskTextColor() {
    const allTasks = document.querySelectorAll('li');
    let checkedTaskCount = 0;

    allTasks.forEach(task => {
        if (task.classList.contains('checked')) {
            checkedTaskCount++;
        }
    });

    allTasks.forEach((task, index) => {
        if (index - checkedTaskCount >= 5) {
            task.classList.add('danger-zone');
            const today = new Date().toDateString();
            const modalShownToday = localStorage.getItem('modalShownToday');
            if (!modalShownToday || modalShownToday !== today) {
                if (noSupporter === false) {
                    supporterPopUp(currentSupporter.callOutState, currentSupporter.callOutMessage(), 'I understand');
                    response.onclick = function() {
                    closeModal();
                    }
                } else {
                    showAlert("Remember that those tasks are only for today. Don't set yourself up for failure by adding too many!");                    
                }
                localStorage.setItem('modalShownToday', today);
            }
        } else {
            task.classList.remove('danger-zone');
        }
    });
}


// clear all the tasks in the list
function clearAllTasks() {
    let allTasks = document.querySelectorAll('li');
    allTasks.forEach(li => li.remove());
    taskList = [];
    saveTasks();
    saveTaskList();
}

// || settings menu & bottom nav management ||

// let escapeSettingsMenu;

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    let escapeSettingsMenu = document.addEventListener('keydown', e => {
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
        for (i = 0; i < taskList.length; i += 1) {
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
            setTimeout(() => {
                closeAlert();
            }, 2000);
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
            setTimeout(() => {
                closeAlert();
            }, 2000);
        });
    }
}

// || alerts management ||

function showAlert(message) {
    alertMessage.innerHTML = message;
    alertBox.style.display = "block";
}

function closeAlert() {
    alertBox.style.display = "none";
}