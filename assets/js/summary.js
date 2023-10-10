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
    urgentTasks();
    updateSummary()

});


function urgentTasks() {    
    let taskContainer = 0;                                                    
    for (let i = 0; i < addedTasks.length; i++) {
        if (addedTasks[i].prio === 'Urgent') {                      // prio
            taskContainer++;
        }
    }
    let feedback = document.getElementById('urgent-tasks');                   
    feedback.textContent = taskContainer;
}


//Version 4:
function updateSummary() {
    let taskCounts = {
        'in-progress': 0,
        'todo': 0,
        'done': 0,
        'await-feedback': 0
    };
    for (let i = 0; i < addedTasks.length; i++) {
        let bucket = addedTasks[i].bucket;
        if (taskCounts[bucket] !== undefined) {
            taskCounts[bucket]++;
        }}
    document.getElementById('tasks-in-progress').textContent = taskCounts['in-progress'];
    document.getElementById('todos').textContent = taskCounts['todo'];
    document.getElementById('completed-tasks').textContent = taskCounts['done'];
    document.getElementById('await-feedback').textContent = taskCounts['await-feedback'];
}


