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


/*  async function totalTasks() {
    await getTaskStorage();
    let total = addedTasks.length;
    let totalInBoard = document.getElementById('total-tasks');
    totalInBoard.textContent = total;
} */


function totalTasks() {
    let total = addedTasks.length;
    let totalInBoard= document.getElementById('total-tasks');
    totalInBoard.textContent = total;
}
 getTaskStorage().then(() => {
   totalTasks();
 });  
