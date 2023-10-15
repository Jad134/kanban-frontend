function initSummary() {
    renderGreeting();
    totalTasks();
}

/* 
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
        document.getElementById('greeting-daytime').innerHTML = greeting + '!';
        document.getElementById('greeting-name').innerHTML = '';
    }
    else {
        document.getElementById('greeting-daytime').innerHTML = greeting + ',';
        document.getElementById('greeting-name').innerHTML = greetingName;
    }
} */

function renderGreeting() {
    let greetingName = localStorage.getItem('login-name');
    let greetingDaytime = document.getElementById('greeting-daytime');
    let greetingNameElement = document.getElementById('greeting-name');
    let responsiveGreetingDaytime = document.getElementById('responsive-greeting-daytime');
    let responsiveGreetingName = document.getElementById('responsive-greeting-name');
    let greeting = getGreeting();

    if (greetingName === 'Guest') {
        greetingDaytime.textContent = greeting + '!';
        greetingNameElement.textContent = '';
        responsiveGreetingDaytime.textContent = greeting + '!';
        responsiveGreetingName.textContent = '';
    } else {
        greetingDaytime.textContent = greeting + ',';
        greetingNameElement.textContent = greetingName;
        responsiveGreetingDaytime.textContent = greeting + ',';
        responsiveGreetingName.textContent = greetingName;
    }
}


function getGreeting() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let greeting;

    if (hours < 12) {
        greeting = 'Good Morning';
    } else if (hours < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }
    return greeting;
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
    nextDueDate();
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


/* function formatDate(date) {
    let day = date.getDate();
    let month = date.toLocaleString('default', { month: 'long' });
    let year = date.getFullYear();
    return `${month} ${day}, ${year}`;
} */


function calculateClosestDueDate(closestDueDate) {
    let nextDate = document.getElementById('next-urgent-date');
    if (closestDueDate !== null) {
        let information = { year: 'numeric', month: 'long', day: 'numeric' };
        let formattedDate = closestDueDate.toLocaleDateString('en-US', information); // sonst "undefined" für die Standardeinstl. nötig
        nextDate.innerHTML = formattedDate;
    }
}


function nextDueDate() {
    let closestDueDate = null;
    let today = new Date();

    if (!addedTasks) {                                      // Fehler abfangen
        return;
    } else if (addedTasks.length === 0) {                   
        let message = document.getElementById('next-urgent-tasks');
        message.innerHTML = 'No urgent tasks scheduled';
    }
    for (let i = 0; i < addedTasks.length; i++) {
        let taskDueDate = new Date(addedTasks[i]['duedate']);
        if (taskDueDate > today) {
            if (closestDueDate === null || taskDueDate < closestDueDate) {
                closestDueDate = taskDueDate;
            }}
            calculateClosestDueDate(closestDueDate);
        }
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
        }
    }
    document.getElementById('tasks-in-progress').textContent = taskCounts['in-progress'];
    document.getElementById('todos').textContent = taskCounts['todo'];
    document.getElementById('completed-tasks').textContent = taskCounts['done'];
    document.getElementById('await-feedback').textContent = taskCounts['await-feedback'];
}


function responsiveGreeting() {
    let responsiveGreeting = document.querySelector('.responsive-greeting');
    let greetingTime = document.getElementById('responsive-greeting-daytime');
    let greetingName = document.getElementById('responsive-greeting-name');
    
    if (window.innerWidth < 1150) {
        responsiveGreeting.style.opacity = 1;
        greetingTime.style.opacity = 1;
        greetingName.style.opacity = 1;
        setTimeout(() => {
            greetingTime.style.opacity = 0;
            greetingName.style.opacity = 0;
        }, 1000); 
        setTimeout(() => {
            responsiveGreeting.style.opacity = 0;
        }, 1000); 
    }
}

window.addEventListener('load', responsiveGreeting);

/* function responsiveGreeting() {
    let responsiveGreeting = document.querySelector('.responsive-greeting');
    let greetingTime= document.getElementById('responsive-greeting-daytime');
    let greetingName = document.getElementById('responsive-greeting-name');
  
    responsiveGreeting.style.opacity = 1;
    greetingTime.style.opacity = 1;
    greetingName.style.opacity = 1;
    setTimeout(() => {
        greetingTime.style.opacity = 0;
        greetingName.style.opacity = 0;
    }, 1500); 
    setTimeout(() => {
        responsiveGreeting.style.opacity = 0;
    }, 1500); 
} */

