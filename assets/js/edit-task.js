async function loadUserDataForEdit() {
    let newUserDataString = await getItem('users');
    newUserDataString = JSON.parse(newUserDataString['data']['value']);

    for (let i = 0; i < newUserDataString.length; i++) {
        let users = newUserDataString[i];
        userData.push(users);
    }

    //findContact();
}


function loadEditContacts(id) {
    let i = idToIndex(id);
    let overlayContainer = document.getElementById('edit-contact-overlay');

    for (let u = 0; u < userData.length; u++) {
        let currentContact = userData[u];
        let name = currentContact['name'];
        let userInitial = userData[u]['initials'];
        //let nameColor = userData[u]['color'];

        if (1 === 'a') {
            overlayContainer.innerHTML += renderUncheckedUsers(name, i, userInitial);
        } else {
            overlayContainer.innerHTML += renderCheckedUsers(name, i, userInitial);
        }

        //let initialDiv = document.getElementById(`list-circle${i}`);
        //initialDiv.style.backgroundColor = nameColor;
    }
}


async function openEditTask(id) {
    await loadUserDataForEdit();

    let i = idToIndex(id);
    let title = addedTasks[i]['title'];
    let description = addedTasks[i]['description'];
    let duedate = addedTasks[i]['duedate'];

    document.getElementById('slider-container').innerHTML = renderEditTask(id, title, description, duedate);

    getPrio(i);
    loadUserCirclesForEdit(i);
    loadEditContacts();
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


function loadUserCirclesForEdit(i) {
    for (let u = 0; u < addedTasks[i]['assigned'].length; u++) {
        let assignedUser = addedTasks[i]['assigned'][u];
        let x = compareUser(assignedUser);
        let initials = addedUsers[x]['initials'];
        let color = addedUsers[x]['color'];

        document.getElementById('selected-contacts').innerHTML += renderUserCirclesForEdit(initials, color);
    }
}


function openContactOverlay() {
    let assignedTo = document.getElementById('assignedTo');
    assignedTo.style.backgroundImage = `url('./assets/img/arrow-up.svg')`;
    assignedTo.removeAttribute('onClick');
    assignedTo.onclick = closeContactOverlay;

    let contactOverlay = document.getElementById('edit-contact-overlay');
    contactOverlay.classList.add('d-flex');
    contactOverlay.classList.remove('d-none');

    document.addEventListener('click', closeOnClickOutside);
}


function closeContactOverlay() {
    let contactOverlay = document.getElementById('edit-contact-overlay');
    contactOverlay.classList.remove('d-flex');
    contactOverlay.classList.add('d-none');

    let assignedTo = document.getElementById('assignedTo');
    assignedTo.style.backgroundImage = `url('./assets/img/arrow-assign-down.svg')`;
    assignedTo.onclick = openContactOverlay;

    document.removeEventListener('click', closeOnClickOutside);
}


function closeOnClickOutside(event) {
    let contactOverlay = document.getElementById('edit-contact-overlay');
    let assignedTo = document.getElementById('assignedTo');

    if (!contactOverlay.contains(event.target) && event.target !== assignedTo) {
        closeContactOverlay();
    }
}


function renderEditTask(id, title, description, duedate) {
    return `
        <div id="slider" class="edit-task-container">
            <form>
                <div>

                    <div class="edit-task disp-flex-column">
                        <span>Title</span>
                        <input required id="edit-title" type="text" value="${title}">
                    </div>

                    <div class="edit-task disp-flex-column">
                        <span>Description</span>
                        <textarea required id="edit-description" row="3">${description}</textarea>
                    </div>

                    <div class="edit-task disp-flex-column">
                        <span>Due Date</span>
                        <input type="date" id="date-input" value="${duedate}">
                        <!-- <div class="error-message" id="date-error"></div> -->
                    </div>

                    <div class="edit-task disp-flex-column">
                        <span>Priority</span>
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

                    <div class="edit-assigned-user edit-task disp-flex-column">
                        <span>Assigned to</span>

                        <input onclick="openContactOverlay(${id})" id="assignedTo" type="text" placeholder="Select contacts to assign">
                        <div class="d-none" id="edit-contact-overlay"></div>
                        <div id="selected-contacts"></div>

                    </div>

                    <div class="edit-task disp-flex-column">
                        <span>Subtasks</span>

                        <div class="subtask-input-btn">
                            <input onkeydown="handleEnterKeyPress(event, 'subtask-input')" id="subtask-input" placeholder="Add new subtask" type="text">
                            <button onclick="addSubTask()" type="button" class="subtask-button"><img src="./assets/img/addSub.svg" alt=""></button>
                        </div>
                        <div id="subtask-lists"></div>

                    </div>

                    <div id="ok-button-container">
                        <button onclick="submitEditForm()" type="button" id="ok-button">
                            <span>Ok</span><img src="./assets/img/check.svg" alt="">
                        </button>
                    </div>

                </div>
            </form>
        </div>
    `;
}


function renderUserCirclesForEdit(initials, color) {
    return `
        <div style="background-color: ${color};" class="assignment-circle-big">${initials}</div>
    `;
}


function renderUncheckedUsers(name, i, userInitial) {
    return `
        <label class="contact-label" for="check-contact${i}">
            <div class="current-contacts">
                <div class="add-task-contacts"> 
                    <div id="list-circle${i}" class="assignment-circle-big">
                        <span>${userInitial}</span>
                    </div>
                    <span class="current-name">${name}</span>
                    <input value="${name}" class="check-contact" id="check-contact${i}" type="checkbox" onchange="setCheckbox(this, '${name}', ${i})">
                </div>
            </div>
        </label>        
    `;
}


function renderCheckedUsers(name, i, userInitial) {
    return `
        <label class="contact-label" for="check-contact${i}">
            <div class="current-contacts">
                <div class="add-task-contacts"> 
                    <div id="list-circle${i}" class="assignment-circle-big">
                        <span>${userInitial}</span>
                    </div>
                    <span class="current-name">${name}</span>
                    <input value="${name}" class="check-contact" id="check-contact${i}" type="checkbox" onchange="setCheckbox(this, '${name}', ${i})">
                </div>
            </div>
        </label>        
    `;
}