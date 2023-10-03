// Zum Testen hier eingefügt, das Script ist aus der addTask.js
async function getTaskStorage() {
    addedTasks = [];
    let currentTasks = await getItem('tasks');
    currentTasks = JSON.parse(currentTasks['data']['value']);

    for (let i = 0; i < currentTasks.length; i++) {
        let tasks = currentTasks[i];
        addedTasks.push(tasks);
        loadTasksForBoard(i);
    }
}


function getTaskFromArray() {
    clearBuckets();

    for (let i = 0; i < addedTasks.length; i++) {
        loadTasksForBoard(i);
    }
}


function loadTasksForBoard(i) {
    let bucket = addedTasks[i]['bucket'];
    let title = addedTasks[i]['title'];
    let description = addedTasks[i]['description'];
    let assigned = addedTasks[i]['assigned'];
    let category = addedTasks[i]['category'];
    let prio = addedTasks[i]['prio'];
    let subtaskCounter = countSubtasks(i);

    // Kann nicht mehr vorkommen wenn der Code final ist
    // gesamte Funktion dann ausbauen
    if (bucket === undefined) {
        bucket = 'todo';
    }

    categoryClassPicker(category);
    renderByBucket(i, bucket, title, description, assigned, category, prio, subtaskCounter);
}


function countSubtasks(i) {
    let subtaskCounter = addedTasks[i]['subtask'].length;
    let subtaskDoneCounter = addedTasks[i]['subtask'].filter(subtask => subtask.subdone).length;

    if (addedTasks[i]['subtask'].length > 0) {
        return subtaskDoneCounter + '/' + subtaskCounter + ' Subtasks';
    } else {
        return '';
    }
}


function categoryClassPicker(category) {
    if (category === 'Technical Task') {
        categoryCssClass = 'category-technical-task';
    } else {
        categoryCssClass = 'category-user-story';
    }
}


function renderByBucket(i, bucket, title, description, assigned, category, prio, subtaskCounter) {
    document.getElementById(bucket).innerHTML += renderBuckets(i, bucket, title, description, assigned, category, prio, subtaskCounter);
    findTasks();
}


function loadTask(i) {
    let category = addedTasks[i]['category'];
    let title = addedTasks[i]['title'];
    let description = addedTasks[i]['description'];
    let duedate = addedTasks[i]['duedate'];
    let prio = addedTasks[i]['prio'];
    let assigned = addedTasks[i]['assigned'];
    let subtasks = loadSubtasks(i);

    categoryClassPicker(category);
    openTask(i, category, categoryCssClass, title, description, duedate, prio, assigned, subtasks);
}


function loadSubtasks(i) {
    let subtaskCounter = addedTasks[i]['subtask'].length;
    let subtaskDoneCounter = addedTasks[i]['subtask'].filter(subtask => subtask.subdone).length;

    if (addedTasks[i]['subtask'].length > 0) {
        return subtaskDoneCounter + '/' + subtaskCounter + ' Subtasks';
    } else {
        return '';
    }
}


function openTask(i, category, categoryCssClass, title, description, duedate, prio, assigned, subtasks) {
    document.getElementById('slider-container').innerHtml = '';
    document.getElementById('slider-container').innerHTML = renderOpenTask(i, category, categoryCssClass, title, description, duedate, prio, assigned, subtasks);
    openSlider();
}


function startDragging(i) {
    currentDraggedElement = i;
}


function allowDrop(event) {
    event.preventDefault();
}


function moveTo(bucket) {
    addedTasks[currentDraggedElement]['bucket'] = bucket;
    getTaskFromArray();
    addTaskToStorage();
}


function clearBuckets() {
    let todoTasks = document.getElementById('todo');
    todoTasks.innerHTML = '';
    let inProgressTasks = document.getElementById('in-progress');
    inProgressTasks.innerHTML = '';
    let awaitFeedbackTasks = document.getElementById('await-feedback');
    awaitFeedbackTasks.innerHTML = '';
    let doneTasks = document.getElementById('done');
    doneTasks.innerHTML = '';
}


function addTaskSlider() {
    document.getElementById('slider-container').innerHTML = addTaskHtml();
    openSlider();
}

// 26.09.2023 - Heike Lüdemann: Suchfunktion für Tasks

function findTasks() {
    const searchInput = document.getElementById('find-task');
    const taskCards = document.querySelectorAll('.task-container');
    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value.toLowerCase();
        taskCards.forEach((card) => {
            const cardText = card.innerText.toLowerCase();
            if (cardText.includes(searchText)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}


function deleteTask(i) {
    addedTasks.splice(i);
    // setItem Funktion muss noch integriert werden
    getTaskFromArray();
    closeSlider();
}


function editTask(i) {
    let title = addedTasks[i]['title'];
    let description = addedTasks[i]['description'];
    let duedate = addedTasks[i]['duedate'];
    let prio = addedTasks[i]['prio'];
    let assigned = addedTasks[i]['assigned'];
    let subtasks = addedTasks[i]['subtasks'];

    document.getElementById('slider-container').innerHTML = renderEditTask(title, description, duedate, prio, assigned, subtasks);
}


function renderBuckets(i, bucket, title, description, assigned, category, prio, subtaskCounter) {
    return `
        <div class="task-container" onclick="loadTask(${i})" ondragstart="startDragging(${i})" draggable="true">
            <div class="${categoryCssClass}">${category}</div>
            <h4 class="task-title-container">${title}</h4>
            <div class="task-description-container">${description}</div>
            <div id="subtasks-container" class="task-subtasks-container">${subtaskCounter}</div>
            <div class="task-assignment-container">${assigned} ${prio}</div>
        </div>
    `
}


function renderOpenTask(i, category, categoryCssClass, title, description, duedate, prio, assigned, subtask) {
    return `
        <div id="slider" class="open-task-container">
            <div class="${categoryCssClass}">${category}</div>
            <div class="open-task-title">${title}</div>
            <div class="open-task-description">${description}</div>
            <div class="open-task-duedate">Due date: ${duedate}</div>
            <div class="open-task-prio">Priority: ${prio}</div>
            <div class="open-task-assigned">Assigned To:<br />${assigned}</div>
            <div class="open-task-subtask">
                <span>Subtasks</span>
                <div class="open-task-subtask-list">${subtask}</div>
            </div>
            <div class="open-task-buttons">
                <button onclick="deleteTask(${i})">
                    <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.68213 18.3967C3.13213 18.3967 2.6613 18.2009 2.26963 17.8092C1.87796 17.4176 1.68213 16.9467 1.68213 16.3967V3.39673C1.3988 3.39673 1.1613 3.3009 0.969629 3.10923C0.777962 2.91756 0.682129 2.68006 0.682129 2.39673C0.682129 2.1134 0.777962 1.8759 0.969629 1.68423C1.1613 1.49256 1.3988 1.39673 1.68213 1.39673H5.68213C5.68213 1.1134 5.77796 0.875895 5.96963 0.684229C6.1613 0.492562 6.3988 0.396729 6.68213 0.396729H10.6821C10.9655 0.396729 11.203 0.492562 11.3946 0.684229C11.5863 0.875895 11.6821 1.1134 11.6821 1.39673H15.6821C15.9655 1.39673 16.203 1.49256 16.3946 1.68423C16.5863 1.8759 16.6821 2.1134 16.6821 2.39673C16.6821 2.68006 16.5863 2.91756 16.3946 3.10923C16.203 3.3009 15.9655 3.39673 15.6821 3.39673V16.3967C15.6821 16.9467 15.4863 17.4176 15.0946 17.8092C14.703 18.2009 14.2321 18.3967 13.6821 18.3967H3.68213ZM3.68213 3.39673V16.3967H13.6821V3.39673H3.68213ZM5.68213 13.3967C5.68213 13.6801 5.77796 13.9176 5.96963 14.1092C6.1613 14.3009 6.3988 14.3967 6.68213 14.3967C6.96546 14.3967 7.20296 14.3009 7.39463 14.1092C7.5863 13.9176 7.68213 13.6801 7.68213 13.3967V6.39673C7.68213 6.1134 7.5863 5.8759 7.39463 5.68423C7.20296 5.49256 6.96546 5.39673 6.68213 5.39673C6.3988 5.39673 6.1613 5.49256 5.96963 5.68423C5.77796 5.8759 5.68213 6.1134 5.68213 6.39673V13.3967ZM9.68213 13.3967C9.68213 13.6801 9.77796 13.9176 9.96963 14.1092C10.1613 14.3009 10.3988 14.3967 10.6821 14.3967C10.9655 14.3967 11.203 14.3009 11.3946 14.1092C11.5863 13.9176 11.6821 13.6801 11.6821 13.3967V6.39673C11.6821 6.1134 11.5863 5.8759 11.3946 5.68423C11.203 5.49256 10.9655 5.39673 10.6821 5.39673C10.3988 5.39673 10.1613 5.49256 9.96963 5.68423C9.77796 5.8759 9.68213 6.1134 9.68213 6.39673V13.3967Z" fill="#2A3647"/>
                    </svg>
                    <span>Delete</span>
                </button>
                <div class="button-seperator"></div>
                <button onclick="editTask(${i})">
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.68213 16.3967H4.08213L12.7071 7.77173L11.3071 6.37173L2.68213 14.9967V16.3967ZM16.9821 6.32173L12.7321 2.12173L14.1321 0.721729C14.5155 0.338395 14.9863 0.146729 15.5446 0.146729C16.103 0.146729 16.5738 0.338395 16.9571 0.721729L18.3571 2.12173C18.7405 2.50506 18.9405 2.96756 18.9571 3.50923C18.9738 4.0509 18.7905 4.5134 18.4071 4.89673L16.9821 6.32173ZM15.5321 7.79673L4.93213 18.3967H0.682129V14.1467L11.2821 3.54673L15.5321 7.79673Z" fill="#2A3647"/>
                    </svg>
                    <span>Edit</span>
                </button>
            </div>
        </div>
    `;
}


function renderEditTask(i, title, description, duedate, prio, assigned, subtasks) {
    return `
        <div id="slider" class="edit-task-container">
            <div class="disp-flex-column-start">
                <span>Title</span>
                <input required id="edit-title" type="text" value="${title}">
            </div>
            <div class="disp-flex-column-start">
                <span>Description</span>
                <input required id="edit-description" type="text" value="${description}">
            </div>
            <div class="disp-flex-column-start">
                <span>Due Date</span>
                <input required id="edit-duedate" type="text" value="${duedate}">
            </div>
            <div class="disp-flex-column-start">
                <span>Priority</span>
                <input required id="edit-prio" type="text" value="${prio}">
            </div>
            <div class="disp-flex-column-start">
                <span>Assigned to</span>
                <input required id="edit-assigned" type="text" value="${assigned}">
            </div>
            <div class="disp-flex-column-start">
                <span>Subtasks</span>
                <input required id="edit-assigned" type="text" value="${subtasks}">
            </div>
        </div>
    `
}


function addTaskHtml() {
    return `
        <div id="slider">
            <div>
                <h1>Add Task</h1>
            </div>
            <form onsubmit="getValues(); ">
                <div style="display: flex;">
                    <div class="left-side">

                        <div class="title-content">

                            <span class="span-style">Title</span>
                            <input required placeholder="Enter a title" id="title-input" type="text">
                        </div>
                        <div class="description">
                            <span class="span-style">Description</span>
                            <textarea placeholder="Enter a Description" name="" id="description-textarea" cols="20"
                                rows="10"></textarea>
                        </div>
                        <div class="assigned">
                            <span class="span-style">Assigned to</span>
                            <select name="Select contacts to assign" id="assignedTo">
                                <option value="1">Hello World</option>
                                <option value="2">Test</option>
                            </select>
                        </div>
                    </div>

                    <div class="right-side">
                        <div class="date-container">
                            <span class="span-style">Due date</span>
                            <input onfocus="(this. type='date')" id="date-input"  required placeholder="dd/mm/yyyy">
                        </div>
                        <div class="prio">
                            <span class="span-style">Prio</span>
                            <div class="prio-buttons">
                                <button value="urgent" onclick=" ChangeButtonColor('urgent-btn', 'urgent-img')"
                                    type="button" id="urgent-btn">Urgent
                                    <img id="urgent-img" src="./assets/img/urgentimg.svg" alt="">
                                </button>
                                <button value="medium" onclick=" ChangeButtonColor('medium-btn', 'medium-img')"
                                    type="button" id="medium-btn">Medium
                                    <img id="medium-img" src="./assets/img/mediumimg.svg" alt="">
                                </button>
                                <button value="low" onclick=" ChangeButtonColor('low-btn', 'low-img')" type="button"
                                    id="low-btn">Low
                                    <img id="low-img" src="./assets/img/Prio baja.svg" alt="">
                                </button>
                            </div>
                        </div>
                        <div class="category-container">
                            <span class="span-style">Category</span>
                            <select name="Select contacts to assign" id="select-category">
                                <option value="" disabled selected hidden>Select task category</option>
                                <option value="1">Technical Task</option>
                                <option value="2">User Story</option>
                            </select>
                        </div>
                        <div id="subtask-container" class="subtask-container">
                            <span class="span-style">Subtasks</span>
                            <div class="subtask-input-btn">
                                <input onkeydown="handleEnterKeyPress(event , 'subtask-input')"  id="subtask-input" placeholder="Add new subtask" type="text">
                                <button onclick="addSubTask()" type="button" class="subtask-button"><img
                                        src="./assets/img/addSub.svg" alt=""></button>
                            </div>
                            <div id="subtask-lists"></div>
                            <div class="create-buttons">
                                <button onclick="clearTasks()" type="button" id="clear-btn"> Clear <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.2496 11.9998L17.4926 17.2428M7.00659 17.2428L12.2496 11.9998L7.00659 17.2428ZM17.4926 6.75684L12.2486 11.9998L17.4926 6.75684ZM12.2486 11.9998L7.00659 6.75684L12.2486 11.9998Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    
                                </button>
                                <button onsubmit="getValues()" type="submit" id="create-btn">Create Task <img
                                        src="./assets/img/check.svg" alt=""></button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    `
}


////////////////////////// TESTDATA ///////////////////////////////
/******************************************************************


addedTasks = [{
    "bucket": "in-progress",
    "title": "Kochwelt Page & Recipe Recommender",
    "description": "Build start page with recipe recommendation.",
    "assigned": ["Emanuel Mauer", "Marcel Bauer", "Anton Mayer"],
    "duedate": "20230510",
    "prio": "medium",
    "category": "User Story",
    "subtask": [
        {
            "subtitle": "Implement Recipe Recommendation",
            "subdone": true
        },
        {
            "subtitle": "Start Page Layout",
            "subdone": false
        }
    ]
},
{
    "bucket": "done",
    "title": "CSS Architecture Planning",
    "description": "Define CSS naming conventions and structure.",
    "assigned": ["Sofia Müller (You)", "Benedikt Ziegler"],
    "duedate": "20230902",
    "prio": "urgent",
    "category": "Technical Task",
    "subtask": [
        {
            "title": "Establish CSS Methodology",
            "subdone": true
        },
        {
            "title": "Setup Base Styles",
            "subdone": true
        },
        {
            "subtitle": "Subtaks 3",
            "subdone": false
        }
    ]
},
{
    "bucket": "done",
    "title": "Add hover function to tasks at board",
    "description": "add cursor: pointer to board.css",
    "assigned": ["Alexander Riedel (You)"],
    "duedate": "20231003",
    "prio": "mnedium",
    "category": "Technical Task",
    "subtask": []
}];


******************************************************************/
