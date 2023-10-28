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


function addTaskSlider(bucket) {
    newSubTasks = [];
    document.getElementById('slider-container').innerHTML = '';
    document.getElementById('slider-container').innerHTML = addTaskHtml(bucket); // wird zu spät ausgeführt. Morgen drum Kümmern (Jad).
    openSlider();
    loadUserDataFromRemote();// Diese funktion muss für den AddTask Slider ausgeführt werden, sonst laden die Kontakte nicht. (noch nicht Final)
}


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


function switchToBucket(id, event) {
    event.stopPropagation();
    document.getElementById(`task-${id}`).innerHTML = renderMoveTo(id);
}


function closeMoveTo(id, event) {
    event.stopPropagation();
    reloadBucket(id);
}


function reloadBucket(taskId) {
    let i = idToIndex(taskId);
    let id = addedTasks[i]['id'];
    let bucket = addedTasks[i]['bucket'];
    let title = addedTasks[i]['title'];
    let description = addedTasks[i]['description'];
    let category = addedTasks[i]['category'];
    let categoryCssClass = categoryClassPicker(category);
    let prio = addedTasks[i]['prio'];

    document.getElementById(bucket).innerHTML = renderBuckets(id, title, description, category, categoryCssClass);

    countSubtasks(id);
    loadAssignedUsers(id);
    loadPrio(id, prio);
    findTasks();
}


function moveToBucket(id, bucket, event) {
    event.stopPropagation();
    let i = idToIndex(id);
    addedTasks[i]['bucket'] = bucket;

    getTaskFromArray();
    countBucketsWithoutTasks();
    addTaskToStorage();
}