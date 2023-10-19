function initSummary() {
    renderGreeting();
    totalTasks();
}

/**
 * This function relates to the current time frame of the user logging in and returns the according greeting
 * 
 * @returns {string} - This welcomes the user with a greeting phrase
 */
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

/**
 * This function renders the greeting for guest users and known users
 */
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


/**
 * This function calculates the total task number on the board and starts all task calculations
 */
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


/**
 * This function calculates and displays the tasks that are marked "urgent"
 */
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

/**
 * This function calculates and displays the task with the closest due date
 * 
 *  @param {Date | null} closestDueDate - This is the date to calculate 
 */
function calculateClosestDueDate(closestDueDate) {
    let nextDate = document.getElementById('next-urgent-date');
    if (closestDueDate !== null) {
        let information = { year: 'numeric', month: 'long', day: 'numeric' };
        let formattedDate = closestDueDate.toLocaleDateString('en-US', information); // sonst "undefined" für die Standardeinstl. nötig
        nextDate.innerHTML = formattedDate;
    }
}

/**
 * This function calculates and displays the next closest due date among the added tasks
 * 
 *@returns {void} This function does not return a value when 'addedTasks' is not true
 */
function nextDueDate() {
    let closestDueDate = null;
    let today = new Date();
    if (!addedTasks) {
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
            }
        }
        calculateClosestDueDate(closestDueDate);
    }
}


/**
 * This function updates each task category that is displayed in summary section
 */
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


/**
 * This function displays the responsive greeting and hides it after a short time
 */
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
            responsiveGreeting.style.opacity = 0;
        }, 1000);
    }
}

window.addEventListener('load', responsiveGreeting);
