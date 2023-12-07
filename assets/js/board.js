addedTasks = [];
addedUsers = [];


/**
 * Initializes the board by loading user data and tasks.
 * @returns {Promise<void>} - A promise that resolves when the initialization is complete.
 */
async function initBoard() {
    let userData = await getItem('contacts');
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


/**
 * Loads tasks on the board.
 * @param {number} i - Index of the task to load.
 */
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


/**
 * Picks a CSS class based on the category of the task.
 * @param {string} category - The category of the task.
 * @returns {string} - The CSS class for the category.
 */
function categoryClassPicker(category) {
    if (category === 'Technical Task') {
        return 'category-technical-task';
    } else {
        return 'category-user-story';
    }
}


/**
 * Counts the number of subtasks and subtasks done for a task.
 * @param {number} id - ID of the task.
 */
function countSubtasks(id) {
    let i = idToIndex(id);
    let numberOfSubtasksDone = addedTasks[i]['subtask'].filter(subtask => subtask.subdone).length;
    let numberOfSubtasks = addedTasks[i]['subtask'].length;

    if (addedTasks[i]['subtask'].length > 0) {
        document.getElementById(`subtasks-container-${id}`).innerHTML = renderSubtaskCounter(numberOfSubtasksDone, numberOfSubtasks);
    }
}


/**
 * Loads assigned users for a task.
 * @param {number} id - ID of the task.
 */
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


/**
 * Loads assigned users for an open task.
 * @param {number} id - ID of the open task.
 */
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


/**
 * Compares the user and finds the index in the user array.
 * @param {string} assignedContact - The name of the assigned contact.
 * @returns {number} - The index of the user in the user array.
 */
function compareUser(assignedContact) {
    let x = addedUsers.findIndex(user => user.name === assignedContact);
    
    return x;
}


/**
 * Loads the priority of a task.
 * @param {number} id - ID of the task.
 * @param {string} prio - The priority of the task.
 */
function loadPrio(id, prio) {
    if (prio !== '') {
        document.getElementById(`task-prio-img-${id}`).innerHTML = renderPrio(prio);
    }
}


/**
 * Loads priority for an open task if the priority value is not empty.
 * @param {string} prio - Priority value.
 */
function loadPrioForOpenTask(prio) {
    if (prio !== '') {
        document.getElementById(`open-task-prio-container`).innerHTML += renderPrio(prio);
    }
}


/**
 * Retrieves tasks from the 'addedTasks' array and loads them on the board.
 */
function getTaskFromArray() {
    clearBuckets();

    for (let i = 0; i < addedTasks.length; i++) {
        loadTasksForBoard(i);
    }
}


/**
 * Clears task buckets on the board.
 */
function clearBuckets() {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('in-progress').innerHTML = '';
    document.getElementById('await-feedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}


/**
 * Adds a task slider for a specific bucket based on the device width.
 * @param {string} bucket - The target bucket.
 */
function addTaskSlider(bucket) {
    sessionStorage.setItem('bucket', bucket);

    if (window.innerWidth > 768) {
        newSubTasks = [];
        document.getElementById('slider-container').innerHTML = addTaskHtml(); // wird zu spät ausgeführt. Morgen drum Kümmern (Jad).
        openSlider();
        loadUserDataFromRemote();// Diese funktion muss für den AddTask Slider ausgeführt werden, sonst laden die Kontakte nicht. (noch nicht Final)
        setCalenderToTodayBoard()
    } else {
        location.href = "/add-task.html";
    }
}


/**
 * Searches for tasks based on user input in the search bar and handles visibility.
 */
function findTasks() {
    const searchInput = document.getElementById('find-task');
    const taskCards = document.querySelectorAll('.task-container');
    const noTaskFound = document.getElementById('no-task-found');

    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value.toLowerCase();
        let matchFound = false;

        taskCards.forEach((card) => {
            const cardText = card.innerText.toLowerCase();
            if (cardText.includes(searchText)) {
                card.style.display = 'flex';
                matchFound = true;
            } else {
                card.style.display = 'none';
            }
        });

        if (!matchFound) {
            noTaskFound.style.display = 'block';
        } else {
            noTaskFound.style.display = 'none';
        }
    });

    searchInput.addEventListener('change', () => {
        if (searchInput.value.trim() === '') {
            noTaskFound.style.display = 'none';
        }
    });
}


/**
 * Counts the number of tasks in each bucket and loads buckets without tasks.
 */
function countBucketsWithoutTasks() {
    let todoTasks = addedTasks.filter(task => task.bucket === 'todo').length;
    let inProgressTasks = addedTasks.filter(task => task.bucket === 'in-progress').length;
    let awaitFeedbackTasks = addedTasks.filter(task => task.bucket === 'await-feedback').length;
    let doneTasks = addedTasks.filter(task => task.bucket === 'done').length;

    loadBucketsWithoutTasks(todoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks);
}


/**
 * Loads buckets without tasks if the count of tasks is less than 1 for each bucket.
 * @param {number} todoTasks - Count of tasks in 'todo' bucket.
 * @param {number} inProgressTasks - Count of tasks in 'in-progress' bucket.
 * @param {number} awaitFeedbackTasks - Count of tasks in 'await-feedback' bucket.
 * @param {number} doneTasks - Count of tasks in 'done' bucket.
 */
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


/**
 * Loads a task with detailed information in the slider.
 * @param {number} id - ID of the task.
 */
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


/**
 * Loads the date for a task and converts it to a readable format.
 * @param {number} i - Index of the task.
 * @returns {string} - Formatted date.
 */
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


/**
 * Loads subtasks for a specific task in the slider.
 * @param {number} id - ID of the task.
 */
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


/**
 * Finds the index of a task based on its ID in the 'addedTasks' array.
 * @param {number} id - ID of the task.
 * @returns {number} - Index of the task.
 */
function idToIndex(id) {
    let i = addedTasks.findIndex(task => task.id === id);
    return i;
}


/**
 * Deletes a task.
 * @param {number} id - ID of the task to be deleted.
 */
function deleteTask(id) {
    let i = idToIndex(id);
    addedTasks.splice(i, 1);
    getTaskFromArray();
    countBucketsWithoutTasks();
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


/**
 * Reloads the subtask counter for a task.
 * @param {number} id - ID of the task.
 */
function reloadSubtaskCounter(id) {
    let i = idToIndex(id);
    let numberOfSubtasksDone = addedTasks[i]['subtask'].filter(subtask => subtask.subdone).length;
    let numberOfSubtasks = addedTasks[i]['subtask'].length;

    document.getElementById(`subtasks-container-${id}`).innerHTML = renderSubtaskCounter(numberOfSubtasksDone, numberOfSubtasks);
}


/**
 * This prevents you from clicking on past days in the calendar
 */
function setCalenderToTodayBoard(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); // Januar ist 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById('date-input').min = today;
}