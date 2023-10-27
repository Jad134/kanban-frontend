addedTasks = [];
addedUsers = [];


async function initBoard() {
    let userData = await getItem('users');
    userData = JSON.parse(userData['data']['value']);
    for (let i = 0; i < userData.length; i++) {
        let users = userData[i];
        addedUsers.push(users);
    }

    let currentTasks = await getItem('tasks');
    currentTasks = JSON.parse(currentTasks['data']['value']);
    for (let i = 0; i < currentTasks.length; i++) {
        let tasks = currentTasks[i];
        addedTasks.push(tasks);
        loadTasksForBoard(i);
    }
    countBucketsWithoutTasks();
}


function loadTasksForBoard(i) {
    let id = addedTasks[i]['id'];
    let bucket = addedTasks[i]['bucket'];
    let title = addedTasks[i]['title'];
    let description = addedTasks[i]['description'];
    let category = addedTasks[i]['category'];
    let categoryCssClass = categoryClassPicker(category);
    let prio = addedTasks[i]['prio'];

    document.getElementById(bucket).innerHTML += renderBuckets(id, title, description, category, categoryCssClass);

    countSubtasks(id);
    loadAssignedUsers(id);
    loadPrio(id, prio);
    findTasks();
}


function categoryClassPicker(category) {
    if (category === 'Technical Task') {
        return 'category-technical-task';
    } else {
        return 'category-user-story';
    }
}


function countSubtasks(id) {
    let i = idToIndex(id);
    let numberOfSubtasksDone = addedTasks[i]['subtask'].filter(subtask => subtask.subdone).length;
    let numberOfSubtasks = addedTasks[i]['subtask'].length;

    if (addedTasks[i]['subtask'].length > 0) {
        document.getElementById(`subtasks-container-${id}`).innerHTML = renderSubtaskCounter(numberOfSubtasksDone, numberOfSubtasks);
    }
}


function loadAssignedUsers(id) {
    let i = idToIndex(id);
    let assignedUsers = addedTasks[i]['assigned'];

    if (assignedUsers.length <= 4) {
        for (let u = 0; u < assignedUsers.length; u++) {
            let assignedUser = assignedUsers[u];
            let x = compareUser(assignedUser);
            let initials = addedUsers[x]['initials'];
            let color = addedUsers[x]['color'];

            document.getElementById(`task-assignment-container-${id}`).innerHTML += renderAssignedUsers(initials, color);
        }
    } else {
        for (let u = 0; u < 3; u++) {
            let assignedUser = assignedUsers[u];
            let x = compareUser(assignedUser);
            let initials = addedUsers[x]['initials'];
            let color = addedUsers[x]['color'];

            document.getElementById(`task-assignment-container-${id}`).innerHTML += renderAssignedUsers(initials, color);
        }
        let remainingUsers = `+${assignedUsers.length - 3}`;
        document.getElementById(`task-assignment-container-${id}`).innerHTML += renderAssignedUsers(remainingUsers, '#A8A8A8');
    }
}


function loadAssignedUsersForOpenTask(id) {
    let i = idToIndex(id);
    for (let u = 0; u < addedTasks[i]['assigned'].length; u++) {
        let assignedUser = addedTasks[i]['assigned'][u];
        let x = compareUser(assignedUser);
        let initials = addedUsers[x]['initials'];
        let color = addedUsers[x]['color'];

        document.getElementById('open-task-contacts').innerHTML += renderAssignedUsersForOpenTask(initials, color, assignedUser);
    }
}


function compareUser(assignedContact) {
    let x = addedUsers.findIndex(user => user.name === assignedContact);
    return x;
}


function loadPrio(id, prio) {
    if (prio !== '') {
        document.getElementById(`task-prio-img-${id}`).innerHTML = renderPrio(prio);
    }
}


function loadPrioForOpenTask(prio) {
    if (prio !== '') {
        document.getElementById(`open-task-prio-container`).innerHTML += renderPrio(prio);
    }
}


function getTaskFromArray() {
    clearBuckets();

    for (let i = 0; i < addedTasks.length; i++) {
        loadTasksForBoard(i);
    }
}


function clearBuckets() {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('in-progress').innerHTML = '';
    document.getElementById('await-feedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}


function addTaskSlider() {
    newSubTasks = [];
    document.getElementById('slider-container').innerHTML = '';
    document.getElementById('slider-container').innerHTML = addTaskHtml(); // wird zu spät ausgeführt. Morgen drum Kümmern (Jad).
    openSlider();
    loadUserDataFromRemote();// Diese funktion muss für den AddTask Slider ausgeführt werden, sonst laden die Kontakte nicht. (noch nicht Final)
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


function countBucketsWithoutTasks() {
    let todoTasks = addedTasks.filter(task => task.bucket === 'todo').length;
    let inProgressTasks = addedTasks.filter(task => task.bucket === 'in-progress').length;
    let awaitFeedbackTasks = addedTasks.filter(task => task.bucket === 'await-feedback').length;
    let doneTasks = addedTasks.filter(task => task.bucket === 'done').length;

    loadBucketsWithoutTasks(todoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks);
}


function loadBucketsWithoutTasks(todoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks) {
    if (todoTasks < 1) {
        renderBucketsWithoutTasks('todo', 'to do');
    }
    if (inProgressTasks < 1) {
        renderBucketsWithoutTasks('in-progress', 'in progress');
    }
    if (awaitFeedbackTasks < 1) {
        renderBucketsWithoutTasks('await-feedback', 'await feedback');
    }
    if (doneTasks < 1) {
        renderBucketsWithoutTasks('done', 'done');
    }
}


function loadTask(id) {
    let i = idToIndex(id);
    let category = addedTasks[i]['category'];
    let categoryCssClass = categoryClassPicker(category);
    let title = addedTasks[i]['title'];
    let description = addedTasks[i]['description'];
    let duedate = convertDate(i);
    let prio = addedTasks[i]['prio'];
    let assigned = addedTasks[i]['assigned'];

    document.getElementById('slider-container').innerHTML = '';
    document.getElementById('slider-container').innerHTML = renderOpenTask(id, category, categoryCssClass, title, description, duedate, prio, assigned);

    loadSubtasks(id);
    loadPrioForOpenTask(prio);
    loadAssignedUsersForOpenTask(id);
    openSlider();
}


function convertDate(i) {
    if (addedTasks[i]['duedate'] > '0001-01-01') {
        let originalDate = addedTasks[i]['duedate'];
        let parts = originalDate.split('-');
        let formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
        return formattedDate;
    } else {
        return addedTasks[i]['duedate'];
    }
}


function loadSubtasks(id) {
    let i = idToIndex(id);

    if (addedTasks[i]['subtask'].length > 0) {
        document.getElementById('open-task-subtasks').innerHTML = `
            <span>Subtasks</span>
            <div id="open-task-subtask"></div>
        `;

        for (let s = 0; s < addedTasks[i]['subtask'].length; s++) {
            let subtaskDone = addedTasks[i]['subtask'][s]['subdone'];
            let subtask = addedTasks[i]['subtask'][s]['subtitle'];

            document.getElementById('open-task-subtask').innerHTML += renderSubtasks(s, id, subtaskDone, subtask);
        }
    }
}


function idToIndex(id) {
    let i = addedTasks.findIndex(task => task.id === id);
    return i;
}


function startDragging(id) {
    let i = idToIndex(id);
    currentDraggedElement = i;
    let dragField = document.querySelectorAll('.specific-content');
    if (window.innerWidth > 768) {
        dragField.forEach(el => el.style.padding = "0 0 200px 0");
        dragField.forEach(el => el.style.height = "100%");
    }
}


function startTouchDragging(id) {
    console.log(id)
}


function allowDrop(event) {
    event.preventDefault();
}


function hoverDrag(bucket) {
    let hoverElement = document.getElementById(bucket);
    hoverElement.classList.add('task-hover');
}


function stopDrag(bucket) {
    let hoverElement = document.getElementById(bucket);
    hoverElement.classList.remove('task-hover');
}


function moveTo(bucket) {
    addedTasks[currentDraggedElement]['bucket'] = bucket;
    let element = document.getElementById(bucket);
    element.classList.remove('task-hover');
    let dragField = document.querySelectorAll('.specific-content');
    dragField.forEach(el => el.style.padding = "0");

    getTaskFromArray();
    countBucketsWithoutTasks();
    addTaskToStorage();
}


function deleteTask(id) {
    let i = idToIndex(id);
    addedTasks.splice(i, 1);
    getTaskFromArray();
    closeSlider();
    addTaskToStorage();
}


function checkboxSubtask(s, id) {
    let i = idToIndex(id);
    let subtaskStatus = addedTasks[i]['subtask'][s]['subdone'];

    if (subtaskStatus === true) {
        subtaskStatus = false;
    } else {
        subtaskStatus = true;
    }

    document.getElementById(`checkbox-${id}-${s}`).src = `./assets/img/subtask-${subtaskStatus}.svg`;
    addedTasks[i].subtask[s].subdone = subtaskStatus;
    setItem('tasks', addedTasks);

    reloadSubtaskCounter(id);
}


function reloadSubtaskCounter(id) {
    let i = idToIndex(id);
    let numberOfSubtasksDone = addedTasks[i]['subtask'].filter(subtask => subtask.subdone).length;
    let numberOfSubtasks = addedTasks[i]['subtask'].length;

    document.getElementById(`subtasks-container-${id}`).innerHTML = renderSubtaskCounter(numberOfSubtasksDone, numberOfSubtasks);
}


function renderBuckets(id, title, description, category, categoryCssClass) {
    return `
        <div class="task-container" id="task-${id}" onclick="loadTask(${id})" ondragstart="startDragging(${id})" ontouchstart="startTouchDragging(${id})" draggable="true">
            <div class="${categoryCssClass}">${category}</div>
            <div class="task-title-and-description">
                <h4 class="task-title-container">${title}</h4>
                <div class="task-description-container">${description}</div>
            </div>
            <div id="subtasks-container-${id}" class="task-subtasks-container"></div>
            <div class="task-bottom-container">
                <div id="task-assignment-container-${id}" class="task-assignments"></div>
                <div id="task-prio-img-${id}"></div>
            </div>
        </div>
    `;
}


function renderSubtaskCounter(numberOfSubtasksDone, numberOfSubtasks) {
    return `
        <div class="progress-bar">
            <div class="progress" style="width: ${numberOfSubtasksDone / numberOfSubtasks * 100}%;"></div>
        </div>
        <div class="nowrap">${numberOfSubtasksDone}/${numberOfSubtasks} Subtasks</div>
    `;
}


function renderAssignedUsers(initials, color) {
    return `
        <div style="background-color: ${color};" class="assignment-circle margin--4px">${initials}</div>
    `;
}


function renderAssignedUsersForOpenTask(initials, color, assignedUser) {
    return `
        <div class="assigned-to-contact">
            <div style="background-color: ${color};" class="assignment-circle">${initials}</div>
            <span class="assigned-to-name">${assignedUser}</span>
        </div>
    `;
}


function renderPrio(prio) {
    return `
        <img src="./assets/img/subtask-prio-${prio}.svg" alt="">
    `;
}


function renderOpenTask(id, category, categoryCssClass, title, description, duedate, prio, assigned) {
    return `
        <div id="slider" class="open-task-container">
            <div class="open-${categoryCssClass}">${category}</div>
            <div class="open-task-title">${title}</div>
            <div class="open-task-description">${description}</div>
            <div class="open-task-duedate"><span>Due date:</span>${duedate}</div>
            <div id="open-task-prio-container">
                <div class="open-task-prio"><span>Priority:</span>${prio}</div>
            </div>
            <div class="open-task-assigned">
                <span>Assigned To:</span>
                <div id="open-task-contacts"></div>
            </div>
            <div id="open-task-subtasks" class="open-task-subtask"></div>
            <div class="open-task-buttons">
                <button onclick="deleteTask(${id})">
                    <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.68213 18.3967C3.13213 18.3967 2.6613 18.2009 2.26963 17.8092C1.87796 17.4176 1.68213 16.9467 1.68213 16.3967V3.39673C1.3988 3.39673 1.1613 3.3009 0.969629 3.10923C0.777962 2.91756 0.682129 2.68006 0.682129 2.39673C0.682129 2.1134 0.777962 1.8759 0.969629 1.68423C1.1613 1.49256 1.3988 1.39673 1.68213 1.39673H5.68213C5.68213 1.1134 5.77796 0.875895 5.96963 0.684229C6.1613 0.492562 6.3988 0.396729 6.68213 0.396729H10.6821C10.9655 0.396729 11.203 0.492562 11.3946 0.684229C11.5863 0.875895 11.6821 1.1134 11.6821 1.39673H15.6821C15.9655 1.39673 16.203 1.49256 16.3946 1.68423C16.5863 1.8759 16.6821 2.1134 16.6821 2.39673C16.6821 2.68006 16.5863 2.91756 16.3946 3.10923C16.203 3.3009 15.9655 3.39673 15.6821 3.39673V16.3967C15.6821 16.9467 15.4863 17.4176 15.0946 17.8092C14.703 18.2009 14.2321 18.3967 13.6821 18.3967H3.68213ZM3.68213 3.39673V16.3967H13.6821V3.39673H3.68213ZM5.68213 13.3967C5.68213 13.6801 5.77796 13.9176 5.96963 14.1092C6.1613 14.3009 6.3988 14.3967 6.68213 14.3967C6.96546 14.3967 7.20296 14.3009 7.39463 14.1092C7.5863 13.9176 7.68213 13.6801 7.68213 13.3967V6.39673C7.68213 6.1134 7.5863 5.8759 7.39463 5.68423C7.20296 5.49256 6.96546 5.39673 6.68213 5.39673C6.3988 5.39673 6.1613 5.49256 5.96963 5.68423C5.77796 5.8759 5.68213 6.1134 5.68213 6.39673V13.3967ZM9.68213 13.3967C9.68213 13.6801 9.77796 13.9176 9.96963 14.1092C10.1613 14.3009 10.3988 14.3967 10.6821 14.3967C10.9655 14.3967 11.203 14.3009 11.3946 14.1092C11.5863 13.9176 11.6821 13.6801 11.6821 13.3967V6.39673C11.6821 6.1134 11.5863 5.8759 11.3946 5.68423C11.203 5.49256 10.9655 5.39673 10.6821 5.39673C10.3988 5.39673 10.1613 5.49256 9.96963 5.68423C9.77796 5.8759 9.68213 6.1134 9.68213 6.39673V13.3967Z" fill="#2A3647"/>
                    </svg>
                    <span>Delete</span>
                </button>
                <div class="button-seperator"></div>
                <button onclick="openEditTask(${id})">
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.68213 16.3967H4.08213L12.7071 7.77173L11.3071 6.37173L2.68213 14.9967V16.3967ZM16.9821 6.32173L12.7321 2.12173L14.1321 0.721729C14.5155 0.338395 14.9863 0.146729 15.5446 0.146729C16.103 0.146729 16.5738 0.338395 16.9571 0.721729L18.3571 2.12173C18.7405 2.50506 18.9405 2.96756 18.9571 3.50923C18.9738 4.0509 18.7905 4.5134 18.4071 4.89673L16.9821 6.32173ZM15.5321 7.79673L4.93213 18.3967H0.682129V14.1467L11.2821 3.54673L15.5321 7.79673Z" fill="#2A3647"/>
                    </svg>
                    <span>Edit</span>
                </button>
            </div>
        </div>
    `;
}


function renderSubtasks(s, id, subtaskDone, subtask) {
    return `
        <div id="subtask-${id}-${s}" class="open-task-subtask-list" onclick="checkboxSubtask(${s}, ${id})">
            <img src="./assets/img/subtask-${subtaskDone}.svg" id="checkbox-${id}-${s}" class="subtask-checkbox" alt=""><div>${subtask}</div>
        </div>
    `;
}


function renderBucketsWithoutTasks(bucket, text) {
    document.getElementById(bucket).innerHTML = `<div class="no-tasks">No tasks ${text}</div>`
}


function addTaskHtml() {
    return `
        <div id="slider">
            <div class="main-content">
                <div class="align-content">
                    <h1>Add Task</h1>

                    <form novalidate>
                        <div class="left-right-container">
                            <div class="left-side">

                                <div class="title-content">
                                    <span class="span-style">Title <span class="required-star">*</span></span>
                                    <input required placeholder="Enter a title" id="title-input" type="text">
                                    <div class="error-message" id="title-error"></div>
                                </div>

                                <div class="description">
                                    <span class="span-style">Description</span>
                                    <textarea required placeholder="Enter a Description" name="" id="description-textarea" cols="20" rows="10"></textarea>
                                    <div></div>
                                </div>

                                <div class="assigned">
                                    <span class="span-style">Assigned to</span>
                                    <input onclick="openContactOverlay()" id="assignedTo" type="text" placeholder="Select contacts to assign">
                                    <div class="p-relative">
                                        <div class="d-none" id="contact-overlay"></div>
                                        <div id="selected-contacts"></div>
                                    </div>
                                    <div></div>
                                </div>

                                <div id="required-info" class="required-info">
                                    <span><span class="required-star">*</span>This field is required</span>
                                </div>

                            </div>

                            <div class="right-side">

                                <div class="date-container">
                                    <span class="span-style">Due date <span class="required-star">*</span></span>
                                    <input  type='date' id="date-input"  placeholder="dd/mm/yyyy">
                                    <div class="error-message" id="date-error"></div>
                                </div>

                                <div class="prio">
                                    <span class="span-style">Prio</span>
                                    <div class="prio-buttons">
                                        <button value="Urgent" onclick=" ChangeButtonColor('urgent-btn', 'urgent-img')"
                                            type="button" id="urgent-btn">Urgent
                                            <img id="urgent-img" src="./assets/img/urgentimg.svg" alt="">
                                        </button>
                                        <button value="Medium" onclick=" ChangeButtonColor('medium-btn', 'medium-img')"
                                            type="button" id="medium-btn">Medium
                                            <img id="medium-img" src="./assets/img/mediumimg.svg" alt="">
                                        </button>
                                        <button value="Low" onclick=" ChangeButtonColor('low-btn', 'low-img')" type="button"
                                            id="low-btn">Low
                                            <img id="low-img" src="./assets/img/Prio baja.svg" alt="">
                                        </button>
                                    </div>
                                    <div></div>
                                </div>

                                <div class="category-container">
                                    <span class="span-style">Category <span class="required-star">*</span></span>
                                    <select name="Select contacts to assign" id="select-category">
                                        <option value="" disabled selected hidden>Select task category</option>
                                        <option value="1">Technical Task</option>
                                        <option value="2">User Story</option>
                                    </select>
                                    <div class="error-message" id="category-error"></div>
                                </div>

                                <div id="subtask-container" class="subtask-container">
                                    <span class="span-style">Subtasks</span>
                                    <div class="subtask-input-btn">
                                        <input onkeydown="handleEnterKeyPress(event , 'subtask-input')" id="subtask-input" placeholder="Add new subtask" type="text">
                                        <button onclick="addSubTask()" type="button" class="subtask-button"><img src="./assets/img/addSub.svg" alt=""></button>
                                    </div>
                                    <div id="subtask-lists"></div>
                                </div>

                                <div class="create-buttons">
                                    <div class="required-info-responsive">
                                        <span><span class="required-star">*</span>This field is required</span>
                                    </div>
                                    <button onclick="clearTasks()" type="button" id="clear-btn">
                                        Clear 
                                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12.2496 11.9998L17.4926 17.2428M7.00659 17.2428L12.2496 11.9998L7.00659 17.2428ZM17.4926 6.75684L12.2486 11.9998L17.4926 6.75684ZM12.2486 11.9998L7.00659 6.75684L12.2486 11.9998Z"
                                                stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                    <button onclick="submitForm()" type="button" id="create-btn">
                                        Create Task<img src="./assets/img/check.svg" alt="">
                                    </button>
                                </div>

                            </div>

                            <div class="bottom"></div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}


////////////////////////// TESTDATA ///////////////////////////////
/******************************************************************


addedTasks = [{
    "id": 1,
    "bucket": "in-progress",
    "title": "Kochwelt Page & Recipe Recommender",
    "description": "Build start page with recipe recommendation.",
    "assigned": ["Alexander Riedel", "Jad", "Steffen Hans"],
    "duedate": "2023-05-10",
    "prio": "Medium",
    "category": "User Story",
    "subtask": [
        {
            "subdone": true,
            "subtitle": "Implement Recipe Recommendation"
        },
        {
            "subdone": false,
            "subtitle": "Start Page Layout"
        }
    ]
},
{
    "id": 2,
    "bucket": "done",
    "title": "CSS Architecture Planning",
    "description": "Define CSS naming conventions and structure.",
    "assigned": ["Steffen Hans", "Jad"],
    "duedate": "2023-09-02",
    "prio": "Urgent",
    "category": "Technical Task",
    "subtask": [
        {
            "subdone": true,
            "subtitle": "Establish CSS Methodology"
        },
        {
            "subdone": true,
            "subtitle": "Setup Base Styles"

        },
        {
            "subdone": false,
            "subtitle": "Subtaks 3"
        }
    ]
},
{
    "id": 3,
    "bucket": "done",
    "title": "Add hover function to tasks at board",
    "description": "add cursor: pointer to board.css",
    "assigned": ["Sinan Malaga"],
    "duedate": "2023-10-03",
    "prio": "Medium",
    "category": "Technical Task",
    "subtask": []
}];


******************************************************************/
