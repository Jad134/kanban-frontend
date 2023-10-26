async function loadRemoteUserDataForEdit() {
    let newUserDataString = await getItem('users');
    newUserDataString = JSON.parse(newUserDataString['data']['value']);

    for (let i = 0; i < newUserDataString.length; i++) {
        let users = newUserDataString[i];
        userData.push(users);
    }
}


async function openEditTask(id) {
    await loadRemoteUserDataForEdit();

    let i = idToIndex(id);
    let title = addedTasks[i]['title'];
    let description = addedTasks[i]['description'];
    let duedate = addedTasks[i]['duedate'];

    document.getElementById('slider-container').innerHTML = renderEditTask(id, title, description, duedate);

    getPrio(i);
    loadUserCirclesForEdit(i, id);
    loadEditContacts(i);
    findContactForEdit();
    loadEditSubtasks(i);
}


function getPrio(i) {
    let prio = addedTasks[i]['prio'];

    if (prio === 'Low') {
        ChangeButtonColor('low-btn', 'low-img');
    } else if (prio === 'Medium') {
        ChangeButtonColor('medium-btn', 'medium-img');
    } else if (prio === 'Urgent') {
        ChangeButtonColor('urgent-btn', 'urgent-img');
    } else {
        console.log('Prio ist unbekannt.');
    }
}


function loadUserCirclesForEdit(i, id) {
    assignedContact = [];

    for (let u = 0; u < addedTasks[i]['assigned'].length; u++) {
        let assignedUser = addedTasks[i]['assigned'][u];
        let x = compareUser(assignedUser);
        let initials = addedUsers[x]['initials'];
        let color = addedUsers[x]['color'];

        pushContact(assignedUser);
        document.getElementById('selected-contacts').innerHTML += renderUserCirclesForEdit(x, initials, color);
    }
}


function loadEditContacts(i) {
    let overlayContainer = document.getElementById('edit-contact-overlay');

    userData.forEach((user, index) => {
        if (addedTasks[i].assigned.includes(user.name)) {
            overlayContainer.innerHTML += renderCheckedUsers(i, user.name, user.initials, user.color, index);
        } else {
            overlayContainer.innerHTML += renderUncheckedUsers(i, user.name, user.initials, user.color, index);
        }
    });
}


function openEditContactOverlay() {
    let assignedTo = document.getElementById('edit-assigned-to');
    assignedTo.style.backgroundImage = `url('./assets/img/arrow-up.svg')`;
    assignedTo.removeAttribute('onClick');
    assignedTo.onclick = closeEditContactOverlay;

    let contactOverlay = document.getElementById('edit-contact-overlay');
    contactOverlay.classList.add('d-flex');
    contactOverlay.classList.remove('d-none');

    document.addEventListener('click', closeEditOnClickOutside);
}


function closeEditContactOverlay() {
    let contactOverlay = document.getElementById('edit-contact-overlay');
    contactOverlay.classList.remove('d-flex');
    contactOverlay.classList.add('d-none');

    let assignedTo = document.getElementById('edit-assigned-to');
    assignedTo.style.backgroundImage = `url('./assets/img/arrow-assign-down.svg')`;
    assignedTo.onclick = openEditContactOverlay;

    document.removeEventListener('click', closeEditOnClickOutside);
}


function closeEditOnClickOutside(event) {
    let contactOverlay = document.getElementById('edit-contact-overlay');
    let assignedTo = document.getElementById('edit-assigned-to');

    if (!contactOverlay.contains(event.target) && event.target !== assignedTo) {
        closeEditContactOverlay();
    }
}


function findContactForEdit() {
    const searchInput = document.getElementById('edit-assigned-to');
    const contactCards = document.querySelectorAll('.add-task-contacts');
    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value.toLowerCase();
        contactCards.forEach((card) => {
            const cardText = card.innerText.toLowerCase();
            if (cardText.includes(searchText)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}


function setEditCheckbox(status, name, userIndex, i) {
    assignedContact = addedTasks[i]['assigned'];
    let checked = document.getElementById(`check-contact${userIndex}`);
    let checkedContact = document.getElementById(`contact-${userIndex}`);

    if (status === 'checked') {
        // check to uncheck:
        checked.removeAttribute('checked');
        checked.setAttribute('onchange', `setEditCheckbox('unchecked', '${name}', ${userIndex}, ${i})`);
        checkedContact.classList.remove('checked-contact-label');
        checkedContact.classList.add('unchecked-contact-label');
        spliceContact(name);
        removeEditInitialsImg(userIndex);
    } else {
        // uncheck to check:
        checked.setAttribute('checked', 'checked');
        checked.setAttribute('onchange', `setEditCheckbox('checked', '${name}', ${userIndex}, ${i})`);
        checkedContact.classList.remove('unchecked-contact-label');
        checkedContact.classList.add('checked-contact-label');
        pushContact(name);
        renderEditInitialsImg(userIndex);
    }
}


function removeEditInitialsImg(i) {
    let content = document.getElementById('selected-contacts');
    let divToRemove = document.getElementById(`assigned-initials-${i}`);

    if (divToRemove) {
        content.removeChild(divToRemove);
    }
}


function renderEditInitialsImg(i) {
    let content = document.getElementById('selected-contacts');
    let userInitial = userData[i]['initials'];
    let nameColor = userData[i]['color'];

    content.innerHTML += `
             <div id="assigned-initials-${i}" class="assignment-circle-big"><span>${userInitial}</span></div>`;
    let initialDiv = document.getElementById(`assigned-initials-${i}`)
    initialDiv.style.backgroundColor = nameColor;
}


function loadEditSubtasks(i) {
    newSubTasks = addedTasks[i]['subtask'];
    let subtaskContainer = document.getElementById('subtask-lists');

    for (let s = 0; s < newSubTasks.length; s++) {
        let subtask = addedTasks[i]['subtask'][s]['subtitle'];
        subtaskContainer.innerHTML += renderSubtaskContainer(s, subtask);
    }
}


async function submitEditForm(id) {
    let i = idToIndex(id);
    let bucket = addedTasks[i]['bucket'];
    let title = document.getElementById('edit-title');
    let description = document.getElementById('edit-description');
    let duedate = document.getElementById('date-input');
    let category = addedTasks[i]['category'];
    let prio = lastClickedPrio ? lastClickedPrio.value : '';

    let tasks = {
        "id": id,
        "title": title.value,
        "description": description.value,
        "assigned": assignedContact,
        "duedate": duedate.value,
        "prio": prio,
        "category": category,
        "subtask": newSubTasks,
        "bucket": bucket,
    };

    closeSlider();
    deleteEditTask(i);
    addEditTask(i, tasks);
    await addTaskToStorage();

    addedTasks = [];
    lastClickedPrio = null;
    newSubTasks = [];
    assignedContact = [];
    addedUsers = [];

    clearBuckets();
    await initBoard();
}


function deleteEditTask(i) {
    addedTasks.splice(i, 1);
}


function addEditTask(i, tasks) {
    addedTasks.splice(i, 0, tasks);
}


function renderEditTask(id, title, description, duedate) {
    return `
        <div id="slider" class="edit-task-container">
            <form>
                <div class="gap16">

                    <div class="edit-task disp-flex-column">
                        <span class="edit-task-headline">Title</span>
                        <input required id="edit-title" type="text" value="${title}">
                    </div>

                    <div class="edit-task disp-flex-column">
                        <span class="edit-task-headline">Description</span>
                        <textarea required id="edit-description" row="3">${description}</textarea>
                    </div>

                    <div class="edit-task disp-flex-column">
                        <span class="edit-task-headline">Due Date</span>
                        <input type="date" id="date-input" value="${duedate}">
                        <!-- <div class="error-message" id="date-error"></div> -->
                    </div>

                    <div class="edit-task disp-flex-column">
                        <span class="edit-task-headline">Priority</span>
                        <div class="prio-buttons">
                            <button value="Urgent" onclick="ChangeButtonColor('urgent-btn', 'urgent-img')" type="button" id="urgent-btn">
                                Urgent <img id="urgent-img" src="./assets/img/urgentimg.svg" alt="">
                            </button>
                            <button value="Medium" onclick="ChangeButtonColor('medium-btn', 'medium-img')" type="button" id="medium-btn">
                                Medium <img id="medium-img" src="./assets/img/mediumimg.svg" alt="">
                            </button>
                            <button value="Low" onclick="ChangeButtonColor('low-btn', 'low-img')" type="button" id="low-btn">
                                Low <img id="low-img" src="./assets/img/Prio baja.svg" alt="">
                            </button>
                        </div>
                    </div>

                    <div class="edit-assigned-user disp-flex-column">
                        <span class="edit-task-headline">Assigned to</span>
                        <input onclick="openEditContactOverlay(${id})" id="edit-assigned-to" type="text" placeholder="Select contacts to assign" autocomplete="off">
                        <div class="p-relative">
                            <div class="d-none" id="edit-contact-overlay"></div>
                            <div id="selected-contacts"></div>
                        </div>
                    </div>

                    <div class="edit-task disp-flex-column">
                        <span class="edit-task-headline">Subtasks</span>
                        <div class="subtask-input-btn">
                            <input onkeydown="handleEnterKeyPress(event, 'subtask-input')" id="subtask-input" placeholder="Add new subtask" type="text" autocomplete="off">
                            <button onclick="addSubTask()" type="button" class="subtask-button"><img src="./assets/img/addSub.svg" alt=""></button>
                        </div>
                        <div id="subtask-lists"></div>
                    </div>

                    <div id="ok-button-container">
                        <button onclick="submitEditForm(${id})" type="button" id="ok-button">
                            <span>Ok</span><img src="./assets/img/check.svg" alt="">
                        </button>
                    </div>

                </div>
            </form>
        </div>
    `;
}


function renderUserCirclesForEdit(x, initials, color) {
    return `
        <div style="background-color: ${color};" id="assigned-initials-${x}" class="assignment-circle-big">${initials}</div>
    `;
}


function renderUncheckedUsers(i, name, initials, color, userIndex) {
    return `
        <label class="unchecked-contact-label" for="check-contact${userIndex}" id="contact-${userIndex}">
            <div class="edit-task-contacts"> 
                <div class="left-edit-task-contacts">
                    <div id="list-circle${userIndex}" class="assignment-circle-big" style="background-color: ${color};">
                        <span>${initials}</span>
                    </div>
                    <span class="current-name">${name}</span>
                </div>
                <input value="${name}" class="check-contact" id="check-contact${userIndex}" type="checkbox" onchange="setEditCheckbox('unchecked', '${name}', ${userIndex}, ${i})">
            </div>
        </label>        
    `;
}


function renderCheckedUsers(i, name, initials, color, userIndex) {
    return `
        <label class="checked-contact-label" for="check-contact${userIndex}" id="contact-${userIndex}">
            <div class="edit-task-contacts"> 
                <div class="left-edit-task-contacts">
                    <div id="list-circle${userIndex}" class="assignment-circle-big" style="background-color: ${color};">
                        <span>${initials}</span>
                    </div>
                    <span class="current-name">${name}</span>
                </div>
                <input value="${name}" class="check-contact" id="check-contact${userIndex}" type="checkbox" checked="checked" onchange="setEditCheckbox('checked', '${name}', ${userIndex}, ${i})">
            </div>
        </label>        
    `;
}


function renderSubtaskContainer(s, subtask) {
    return `
        <div id="sublist-container${s}" class="sublist-container">
            <ul id="subtask-list${s}" class="subtask-list">
                <li><span id="show-current-subtask${s}">${subtask}</span></li>
            </ul>
            <div id="subtask-input-container${s}" class="d-none subtask-input-container" style="width: 100%;"> 
                <input onkeydown="handleEnterKeyPress(event, 'edit-Input', ${s})" id="edit-task-input${s}" class="edit-subtask-input" type="text"> 
                <img onclick="renameSubTask(${s})" class="edit-done"  src="/assets/img/done.svg" alt="">
                <img onclick="deleteSubTask(${s})"  src="/assets/img/addtasktrash.svg" alt="">
            </div>
            <div id="task-edit-buttons${s}" class="d-flex subtask-edit-buttons">
                <img onclick="editSubTask(${s}, '${subtask}')" class="d-none edit-subtask" src="/assets/img/addtaskedit.svg" alt="">
                <img onclick="deleteSubTask(${s})" class="d-none" style="height: 24px; width: 24px;" src="/assets/img/addtasktrash.svg" alt="">
            </div>
        </div> 
    `;
}