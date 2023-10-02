function initSummary() {
    renderGreeting();
    renderGreetingName();
/*     toDos(); */
    totalTasks();
    tasksInProgress();
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

let taskContainer= 0;

function totalTasks() {                                                         // funktioniert
    let total = addedTasks.length;
    let totalInBoard = document.getElementById('total-tasks');
    totalInBoard.textContent = total;
}
getTaskStorage().then(() => {
    totalTasks();
});


/* function tasksInProgress() {
    let progress = document.getElementById('in-progress');                  // Allgemeiner progress-Container im board.html
    let taskContainer = progress.querySelectorAll('.task-container');       // Zugriff auf dessen Task-Container (Anzahl)
    let taskContainerCount = taskContainer.length;                          // Anzahl
    let tasksInProgress = document.getElementById('tasks-in-progress');     // Zu ändernder Summary-Container
    tasksInProgress.textContent = taskContainerCount;                       // Einfüllen der Anzahl
      // bucket/Array-Verbindung fehlt noch
}    */

// Versuch, geht aber noch nicht. 
function tasksInProgress() {                                        
    for (let i = 0; i < addedTasks.length; i++) {
        if (addedTasks[i].bucket === 'in-progress') {
            taskContainer++;
        }
    }
    let tasksInProgress = document.getElementById('tasks-in-progress');
    tasksInProgress.textContent = taskContainer;
}