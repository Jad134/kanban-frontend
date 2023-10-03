function initSummary() {
    renderGreeting();
    renderGreetingName();
    totalTasks();
}


function renderGreeting() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let greeting;

    if (hours < 12) {
        greeting = 'Guten Morgen,';
    } else if (hours < 18) {
        greeting = 'Guten Tag,';
    } else {
        greeting = 'Guten Abend,';
    }

    document.getElementById('greeting-daytime').innerHTML = greeting;
}


function renderGreetingName() {
    let greetingName = localStorage.getItem('login-name');
    document.getElementById('greeting-name').innerHTML = greetingName;
}

// ----------------- Summary Calculation ---------------


function totalTasks() {                                                       
    let total = addedTasks.length;
    let totalInBoard = document.getElementById('total-tasks');
    totalInBoard.textContent = total;
}
    getTaskStorage().then(() => {                                   // Bei Auslagerung in eigene Funktion -> Fehlermeldung
    totalTasks();
    tasksInProgress();
});


function tasksInProgress() {         
    let taskContainer= 0;                               
    for (let i = 0; i < addedTasks.length; i++) {
        if (addedTasks[i].bucket === 'in-progress') {
            taskContainer++;
        }
    }
    let tasksInProgress = document.getElementById('tasks-in-progress');
    tasksInProgress.textContent = taskContainer;
}