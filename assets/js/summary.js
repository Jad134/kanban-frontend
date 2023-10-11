function initSummary() {
    renderGreeting();
    totalTasks();
}


function renderGreeting() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let greeting;
    let greetingName = localStorage.getItem('login-name');

    if (hours < 12) {
        greeting = 'Good Morning';
    } else if (hours < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }
    
    if (greetingName === 'Guest') {
        document.getElementById('greeting-daytime').innerHTML = greeting;
        document.getElementById('greeting-name').innerHTML = '';
    } 
    else {
        document.getElementById('greeting-daytime').innerHTML = greeting + ',';
        document.getElementById('greeting-name').innerHTML = greetingName;
    }
}

// ----------------- Summary Calculation ---------------
function totalTasks() {                                                       
    let total = addedTasks.length;
    let totalInBoard = document.getElementById('total-tasks');
    totalInBoard.textContent = total;
}
    getTaskStorage().then(() => {                                  
    totalTasks();
    urgentTasks();
    updateSummary()

});


function urgentTasks() {    
    let taskContainer = 0;                                                    
    for (let i = 0; i < addedTasks.length; i++) {
        if (addedTasks[i].prio === 'Urgent') {                      
            taskContainer++;
        }
    }
    let feedback = document.getElementById('urgent-tasks');                   
    feedback.textContent = taskContainer;
}


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


