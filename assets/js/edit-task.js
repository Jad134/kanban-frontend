/**
 * Retrieves remote user data for editing tasks.
 * Populates the 'userData' array with fetched data.
 * @returns {Promise<void>} - Promise that indicates the completion of data retrieval.
 */
async function loadRemoteUserDataForEdit() {
    let newUserDataString = await getItem('contacts');
    newUserDataString = JSON.parse(newUserDataString['data']['value']);

    for (let i = 0; i < newUserDataString.length; i++) {
        let users = newUserDataString[i];
        userData.push(users);
    }
}


/**
 * Opens the editing interface for a specific task with provided details.
 * @param {number} id - The ID of the task to be edited.
 */
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


/**
 * Fetches and sets the priority of a specific task.
 * @param {number} i - Index of the task.
 */
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


/**
 * Loads user circles for edit based on task data.
 * @param {number} i - Index of the task.
 * @param {string} id - The task ID.
 */
function loadUserCirclesForEdit(i, id) {
    assignedContact = [];

    for (let u = 0; u < addedTasks[i]['assigned'].length; u++) {
        let assignedUser = addedTasks[i]['assigned'][u];
        let x = compareUser(assignedUser);
        if (x !== -1 && addedUsers[x].initials && addedUsers[x].color) {
            let initials = addedUsers[x]['initials'];
            let color = addedUsers[x]['color'];

            pushContact(assignedUser);
            document.getElementById('selected-contacts').innerHTML += renderUserCirclesForEdit(x, initials, color);
        }
    }
}


/**
 * Loads edit contacts to the overlay for a specific task.
 * @param {number} i - Index of the task.
 */
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


/**
 * Opens the overlay to edit task contacts.
 */
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


/**
 * Closes the overlay for editing task contacts.
 */
function closeEditContactOverlay() {
    let contactOverlay = document.getElementById('edit-contact-overlay');
    contactOverlay.classList.remove('d-flex');
    contactOverlay.classList.add('d-none');

    let assignedTo = document.getElementById('edit-assigned-to');
    assignedTo.style.backgroundImage = `url('./assets/img/arrow-assign-down.svg')`;
    assignedTo.onclick = openEditContactOverlay;

    document.removeEventListener('click', closeEditOnClickOutside);
}


/**
 * Listens for click events outside the edit contact overlay and closes the overlay.
 * @param {MouseEvent} event - The mouse click event.
 */
function closeEditOnClickOutside(event) {
    let contactOverlay = document.getElementById('edit-contact-overlay');
    let assignedTo = document.getElementById('edit-assigned-to');

    if (!contactOverlay.contains(event.target) && event.target !== assignedTo) {
        closeEditContactOverlay();
    }
}


/**
 * Filters and displays contacts when searching in the edit assigned-to input field.
 */
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


/**
 * Handles checkbox status change for editing contacts.
 * @param {string} status - The status of the checkbox.
 * @param {string} name - The contact's name.
 * @param {number} userIndex - Index of the user.
 * @param {number} i - Index of the task.
 */
function setEditCheckbox(status, name, userIndex, i) {
    assignedContact = addedTasks[i]['assigned'];
    let checked = document.getElementById(`check-contact${userIndex}`);
    let checkedContact = document.getElementById(`contact-${userIndex}`);

    if (status === 'checked') {
        // check to uncheck:
        checkToUncheck(checked, checkedContact, userIndex, name, i)
        spliceContact(name);
        removeEditInitialsImg(userIndex);
    } else {
        // uncheck to check:
        uncheckToCheck(checked, checkedContact, userIndex, name, i)
        pushContact(name);
        renderEditInitialsImg(userIndex);
    }
}


/**
 * This function unchecked the contacts
 */
function checkToUncheck(checked, checkedContact, userIndex, name, i) {
    checked.removeAttribute('checked');
    checked.setAttribute('onchange', `setEditCheckbox('unchecked', '${name}', ${userIndex}, ${i})`);
    checkedContact.classList.remove('checked-contact-label');
    checkedContact.classList.add('unchecked-contact-label');
}


/**
 * This function checked the uncheked contacts
 */
function uncheckToCheck(checked, checkedContact, userIndex, name, i) {
    checked.setAttribute('checked', 'checked');
    checked.setAttribute('onchange', `setEditCheckbox('checked', '${name}', ${userIndex}, ${i})`);
    checkedContact.classList.remove('unchecked-contact-label');
    checkedContact.classList.add('checked-contact-label');
}


/**
 * Removes the user's initials image from the contact list for editing.
 * @param {number} i - Index of the user.
 */
function removeEditInitialsImg(i) {
    let content = document.getElementById('selected-contacts');
    let divToRemove = document.getElementById(`assigned-initials-${i}`);

    if (divToRemove) {
        content.removeChild(divToRemove);
    }
}


/**
 * Renders the user's initials image in the contact list for editing.
 * @param {number} i - Index of the user.
 */
function renderEditInitialsImg(i) {
    let content = document.getElementById('selected-contacts');
    let userInitial = userData[i]['initials'];
    let nameColor = userData[i]['color'];

    content.innerHTML += `
             <div id="assigned-initials-${i}" class="assignment-circle-big"><span>${userInitial}</span></div>`;
    let initialDiv = document.getElementById(`assigned-initials-${i}`)
    initialDiv.style.backgroundColor = nameColor;
}


/**
 * Loads subtasks for editing based on a specific task.
 * @param {number} i - Index of the task.
 */
function loadEditSubtasks(i) {
    newSubTasks = addedTasks[i]['subtask'];
    let subtaskContainer = document.getElementById('subtask-lists');

    for (let s = 0; s < newSubTasks.length; s++) {
        let subtask = addedTasks[i]['subtask'][s]['subtitle'];
        subtaskContainer.innerHTML += renderSubtaskContainer(s, subtask);
    }
}


/**
 * Submits the edited task details after making changes.
 * @param {number} id - The ID of the task being edited.
 */
async function submitEditForm(id) {
    let i = idToIndex(id);
    let bucket = addedTasks[i]['bucket'];
    let title = document.getElementById('edit-title');
    let description = document.getElementById('edit-description');
    let duedate = document.getElementById('date-input');
    let category = addedTasks[i]['category'];
    let prio = lastClickedPrio ? lastClickedPrio.value : '';

    let tasks = createTaskObject(id, title.value, description.value, assignedContact, duedate.value, prio, category, newSubTasks, bucket);

    sliderTaskEdited();
    deleteEditTask(i);
    addEditTask(i, tasks);
    await addTaskToStorage();

    resetArrays();
    clearBuckets();
    await initBoard();
}


/**
 * 
 * @returns the array for the edited task
 */
function createTaskObject(id, title, description, assignedContact, duedate, prio, category, newSubTasks, bucket) {
    return {
        "id": id,
        "title": title,
        "description": description,
        "assigned": assignedContact,
        "duedate": duedate,
        "prio": prio,
        "category": category,
        "subtask": newSubTasks,
        "bucket": bucket,
    };
}


/**
 * This function reset the arrays after editing tasks
 */
function resetArrays() {
    addedTasks = [];
    lastClickedPrio = null;
    newSubTasks = [];
    assignedContact = [];
    addedUsers = [];
}


/**
 * Deletes the task to be edited.
 * @param {number} i - Index of the task.
 */
function deleteEditTask(i) {
    addedTasks.splice(i, 1);
}


/**
 * Adds the edited task to the list at a specific index.
 * @param {number} i - Index of the task.
 * @param {Object} tasks - The edited task details.
 */
function addEditTask(i, tasks) {
    addedTasks.splice(i, 0, tasks);
}


/**
 * Triggers the display of a success message when the task is edited.
 */
function sliderTaskEdited() {
    document.getElementById('slider-container').innerHTML = renderTaskEdited();

    openSlider();
    setTimeout(function () {
        closeSlider();
        document.getElementById('slider-container').innerHTML = '';
    }, 1500);
}