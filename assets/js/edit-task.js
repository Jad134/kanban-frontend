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

    sliderTaskEdited();
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


function sliderTaskEdited() {
    document.getElementById('slider-container').innerHTML = renderTaskEdited();

    openSlider();
    setTimeout(function () {
        closeSlider();
        document.getElementById('slider-container').innerHTML = '';
    }, 1500);
}