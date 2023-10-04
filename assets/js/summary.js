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

/* let taskContainer = 0; */        // kann nicht global definiert werden, weil die Zahlen in d. Funktionen sonst nicht mehr stimmen


function totalTasks() {                                                       
    let total = addedTasks.length;
    let totalInBoard = document.getElementById('total-tasks');
    totalInBoard.textContent = total;
}
    getTaskStorage().then(() => {                                   // Bei Auslagerung in eigene Funktion -> Fehlermeldung
    totalTasks();
    urgentTasks();
    tasksInProgress();
    toDos();
    completedTasks();
    awaitFeedback();
});


function urgentTasks() {    
    let taskContainer = 0;                                                    
    for (let i = 0; i < addedTasks.length; i++) {
        if (addedTasks[i].prio === 'urgent') {                      // prio
            taskContainer++;
        }
    }
    let feedback = document.getElementById('urgent-tasks');                   
    feedback.textContent = taskContainer;
}


function tasksInProgress() {  
    let taskContainer = 0;                
    for (let i = 0; i < addedTasks.length; i++) {
        if (addedTasks[i].bucket === 'in-progress') {
            taskContainer++;
        }
    }
    let tasksInProgress = document.getElementById('tasks-in-progress');
    tasksInProgress.textContent = taskContainer;
}


function toDos() {     
    let taskContainer = 0;                                                      
    for (let i = 0; i < addedTasks.length; i++) {
        if (addedTasks[i].bucket === 'todo') {
            taskContainer++;
        }
    }
    let todos = document.getElementById('todos');                   
    todos.textContent = taskContainer;
}


function completedTasks() {   
    let taskContainer = 0;                                                       
    for (let i = 0; i < addedTasks.length; i++) {
        if (addedTasks[i].bucket === 'done') {
            taskContainer++;
        }
    }
    let done = document.getElementById('completed-tasks');                   
    done.textContent = taskContainer;
}


function awaitFeedback() {    
    let taskContainer = 0;                                                     
    for (let i = 0; i < addedTasks.length; i++) {
        if (addedTasks[i].bucket === 'await-feedback') {
            taskContainer++;
        }
    }
    let feedback = document.getElementById('await-feedback');                   
    feedback.textContent = taskContainer;
}
  

  
// -------------     ChatGPT würde für eine Zusammenfassung der 4 Funktionen Folgendes vorschlagen,        -----------------------                               
// -------------     es funktioniert aber wg verschiedener IDs bei "let element" nicht, Fehlermeldung -----------

/* function bucketTaskCounts() {
    const buckets = ['todo', 'done', 'await-feedback', 'tasks-in-progress']; 
    buckets.forEach(category => {
        let taskContainer = 0;
        for (let i = 0; i < addedTasks.length; i++) {
            if (addedTasks[i].bucket === category) {
                taskContainer++;
            }
        }
        let element = document.getElementById(category);
        element.textContent = taskContainer;
    });}

    bucketTaskCounts('todo', 'todos');
    bucketTaskCounts('done', 'completed-tasks');
    bucketTaskCounts('in-progress', 'tasks-in-progress');
    bucketTaskCounts('await-feedback', 'await-feedback');
 */



