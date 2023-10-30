let addedTasks = [{}];
let lastClickedPrio = null;
let newSubTasks = [];
let assignedContact = [];
let userData = [];
let taskId = Date.now() + Math.random();


function init() {
    loadUserDataFromRemote();
    getTaskStorage();
}

/**
 * Change the Prio Button Color at onClick and activate only one button
 * 
 * @param {string} buttonId 
 * @param {id} imgId 
 */
function ChangeButtonColor(buttonId, imgId) {
    let button = document.getElementById(buttonId);
    let img = document.getElementById(imgId);

    if (button.classList.contains('active')) {
        button.classList.remove('active');
        img.classList.remove('active');
        lastClickedPrio = null;
    } else {
        resetButtons();
        lastClickedPrio = button;
        button.classList.add('active');
        img.classList.add('active');
    }
}

/**
 * Reset the color of the buttons with an extra class names .active */
function resetButtons() {
    let buttons = document.querySelectorAll('.prio-buttons button');
    buttons.forEach(function (btn) {
        btn.classList.remove('active');
    });

    let images = document.querySelectorAll('.prio-buttons button img');
    images.forEach(function (imag) {
        imag.classList.remove('active');
    });
}

/**
 * Use the values from the page and push them to an JSON array. Then starts a funciton which push the array to an remote storage
 */
function getValues() {
    let title = document.getElementById('title-input');
    let description = document.getElementById('description-textarea');
    let date = document.getElementById('date-input');
    let category = document.getElementById('select-category');
    let categoryText = category.options[category.selectedIndex].text;
    let prioValue = lastClickedPrio ? lastClickedPrio.value : '';

    let tasks = {
        "id": taskId,
        "title": title.value,
        "description": description.value,
        "assigned": assignedContact,
        "duedate": date.value,
        "prio": prioValue,
        "category": categoryText,
        "subtask": newSubTasks,
        "bucket": getBucketFromSession()
    };
    sendFormular(tasks);
}

/**
 * Controls the from validation for true or false to upload content
 */
function submitForm() {
    if (validateForm()) {
        getValues(); // Rufe getValues() auf, wenn die Validierung erfolgreich ist
        return true; // Das Formular wird abgesendet
    } else {
        return false; // Das Formular wird nicht abgesendet, wenn die Validierung fehlschlägt
    }
}
/**
 * Validates an input field and displays error messages if the field is empty.
 * 
 * @param {object} field  The field to be validated.
 * @returns True if the field is valid, otherwise False.
 */
function validateField(field) {
    const inputElement = document.getElementById(field.id);
    const errorElement = document.getElementById(field.errorId);
    let category = document.getElementById('select-category');
    let categoryText = category.options[category.selectedIndex].text;

    if (inputElement.value.trim() === '') {
        errorElement.textContent = field.errorMessage;
        inputElement.style.border = '1px solid red';
        return false;
    } else {
        errorElement.textContent = '';
        inputElement.style.border = '';
        return true;
    }
}
/**
 * Validates a form by checking each field in the list of fields to validate.
 * 
 * @returns True if all fields are valid, otherwise False. This is important for submitForm().
 */
function validateForm() {
    let isValid = true;

    const fieldsToValidate = [
        { id: 'title-input', errorId: 'title-error', errorMessage: 'This field is required' },
        { id: 'select-category', errorId: 'category-error', errorMessage: 'This field is required' },
        { id: 'date-input', errorId: 'date-error', errorMessage: 'This field is required' },
    ];

    fieldsToValidate.forEach((field) => {
        isValid = validateField(field) && isValid;
    });
    return isValid;
}


async function sendFormular(tasks) {
    addedTasks.push(tasks);
    await addTaskToStorage();
    await addTaskIdToStorage();
    clearTasks();
    newSubTasks = [];
    sliderTaskAdded();
    setTimeout(function () {
        location.href = "board.html"; // Weiterleitung nach erfolgreichem Speichern
    }, 1500);
}


function sliderTaskAdded() {
    document.getElementById('slider-container').innerHTML = renderTaskAdded();

    openSlider();
    setTimeout(function () {
        closeSlider();
        document.getElementById('slider-container').innerHTML = '';
    }, 1300);
}


function renderTaskAdded() {
    return `
        <div class="task-added-button">
            <span>Task added to board</span>
            <svg width="31" height="26" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.4544 2.77273L23.4545 23.2271C23.4538 23.8296 23.2142 24.4074 22.7881 24.8334C22.362 25.2595 21.7843 25.4992 21.1817 25.4998L16.6363 25.4998C16.0338 25.4992 15.456 25.2595 15.03 24.8334C14.6039 24.4074 14.3642 23.8296 14.3636 23.2271L14.3636 2.77273C14.3642 2.17015 14.6039 1.59243 15.03 1.16635C15.456 0.740262 16.0338 0.500623 16.6363 0.50002L21.1817 0.50002C21.7843 0.500623 22.362 0.740262 22.7881 1.16635C23.2142 1.59243 23.4538 2.17015 23.4544 2.77273ZM16.6363 23.2271L21.1817 23.2271L21.1817 2.77273L16.6363 2.77273L16.6363 23.2271ZM16.6363 2.77273L16.6363 23.2271C16.6357 23.8296 16.3961 24.4073 15.97 24.8334C15.5439 25.2595 14.9662 25.4991 14.3636 25.4997L9.81823 25.4997C9.21566 25.4991 8.63794 25.2595 8.21185 24.8334C7.78577 24.4073 7.54613 23.8296 7.54553 23.227L7.54553 2.7727C7.54613 2.17013 7.78577 1.59241 8.21185 1.16632C8.63793 0.740238 9.21566 0.500602 9.81823 0.5L14.3636 0.499999C14.9662 0.500602 15.5439 0.740238 15.97 1.16632C16.3961 1.59241 16.6357 2.17015 16.6363 2.77273ZM9.81823 23.227L14.3636 23.2271L14.3636 2.77273L9.81823 2.7727L9.81823 23.227ZM9.81823 2.7727L9.81823 23.227C9.81763 23.8296 9.57799 24.4073 9.15191 24.8334C8.72582 25.2595 8.1481 25.4991 7.54553 25.4997L3.00012 25.4997C2.39755 25.4991 1.81983 25.2595 1.39374 24.8334C0.967657 24.4073 0.728019 23.8296 0.727417 23.227L0.727416 2.7727C0.728018 2.17013 0.967656 1.59241 1.39374 1.16632C1.81982 0.740238 2.39755 0.500603 3.00012 0.5L7.54553 0.5C8.1481 0.500602 8.72582 0.740238 9.1519 1.16632C9.57799 1.59241 9.81763 2.17013 9.81823 2.7727ZM3.00012 23.227L7.54553 23.227L7.54553 2.7727L3.00012 2.7727L3.00012 23.227Z" fill="white"/>
                <path d="M30.2726 2.77298L30.2726 23.2273C30.272 23.8299 30.0323 24.4076 29.6062 24.8337C29.1802 25.2598 28.6024 25.4994 27.9999 25.5L23.4545 25.5C22.8519 25.4994 22.2742 25.2598 21.8481 24.8337C21.422 24.4076 21.1824 23.8296 21.1817 23.2271L21.1817 2.77273C21.1823 2.17015 21.422 1.59268 21.8481 1.1666C22.2742 0.740514 22.8519 0.500876 23.4544 0.500274L27.9999 0.500273C28.6024 0.500876 29.1801 0.740514 29.6062 1.1666C30.0323 1.59268 30.272 2.1704 30.2726 2.77298ZM23.4545 23.2271L27.9999 23.2273L27.9999 2.77298L23.4544 2.77273L23.4545 23.2271Z" fill="white"/>
            </svg>
        </div>
    `
}


function getBucketFromSession() {
    bucket = sessionStorage.getItem('bucket');
    if (bucket === null || bucket === undefined) {
        return 'todo';
    } else {
        return bucket;
    }
}


async function addTaskIdToStorage() {
    await setItem('taskid', taskId);
}


async function loadUserDataFromRemote() {
    let newUserDataString = await getItem('users');
    newUserDataString = JSON.parse(newUserDataString['data']['value']);
    for (let i = 0; i < newUserDataString.length; i++) {
        let users = newUserDataString[i];
        userData.push(users);
    }
    loadContacts();
    findContact();
}

/**
 * Get the existing tasks.
 */
async function getTaskStorage() {
    addedTasks = [];
    let currentTasks = await getItem('tasks');
    currentTasks = JSON.parse(currentTasks['data']['value']);

    for (let i = 0; i < currentTasks.length; i++) {
        let tasks = currentTasks[i];
        addedTasks.push(tasks);
    }
}


async function addTaskToStorage() {
    await setItem('tasks', JSON.stringify(addedTasks));
}


function addSubTask() {
    let subtaskContent = document.getElementById('subtask-lists');
    let newTasksText = document.getElementById('subtask-input').value;

    let newSubtask = {
        "subtitle": newTasksText,
        "subdone": false
    }
    if (newTasksText !== '') {
        newSubTasks.push(newSubtask);
    }
    subtaskContent.innerHTML = '';

    for (let i = 0; i < newSubTasks.length; i++) {
        const newTasks = newSubTasks[i]['subtitle'];
        subtaskContent.innerHTML += renderSubTask(newTasks, i);
    }
    document.getElementById('subtask-input').value = '';

}


function renderSubTask(newTasks, i) {
    return /*html*/`
    <div id="sublist-container${i}" class="sublist-container">
      <ul id="subtask-list${i}" class="subtask-list">
            <li> <span  id="show-current-subtask${i}">${newTasks}</span></li>
      </ul>
        <div id="subtask-input-container${i}" class="d-none subtask-input-container" style="width: 100%;"> 
           <input onkeydown="handleEnterKeyPress(event, 'edit-Input', ${i})"  id="edit-task-input${i}" class=" edit-subtask-input" type="text" > 
           <img onclick="renameSubTask(${i})" class="edit-done"  src="/assets/img/done.svg" alt="">
           <img onclick="deleteSubTask(${i})"  src="/assets/img/addtasktrash.svg" alt="">
        </div>
        <div id="task-edit-buttons${i}" class="d-flex subtask-edit-buttons">
          <img onclick="editSubTask(${i}, '${newTasks}')" class="d-none edit-subtask" src="/assets/img/addtaskedit.svg" alt="">
          <img onclick="deleteSubTask(${i})" class="d-none" style="height: 24px; width: 24px;" src="/assets/img/addtasktrash.svg" alt="">
        </div>
    </div> `;

}

/**
 * Open the Contacts to add them to a task. The container is only invisible with display: none;
 */
function openContactOverlay() {
    let onclick = document.getElementById('assignedTo');
    let overlayContainer = document.getElementById('contact-overlay');
    let requiredInfo = document.getElementById('required-info');

    requiredInfo.classList.remove('d-flex');
    requiredInfo.classList.add('d-none');
    overlayContainer.classList.remove('d-none');
    overlayContainer.classList.add('d-flex');
    onclick.style.backgroundImage = "url(./assets/img/arrow-up.svg)";

    onclick.removeAttribute('onClick');

    document.addEventListener('click', closeOnClickOutside);
    onclick.onclick = closeContactOverlay;
}


function closeContactOverlay() {
    let overlayContainer = document.getElementById('contact-overlay');
    let onclick = document.getElementById('assignedTo');
    let requiredInfo = document.getElementById('required-info');

    requiredInfo.classList.remove('d-none');
    requiredInfo.classList.add('d-flex');
    overlayContainer.classList.remove('d-flex');
    overlayContainer.classList.add('d-none');
    onclick.style.backgroundImage = "url(./assets/img/arrow-assign-down.svg)";

    document.removeEventListener('click', closeOnClickOutside);
    onclick.onclick = openContactOverlay;
}


function loadContacts() {
    let overlayContainer = document.getElementById('contact-overlay');
    let loginUser = localStorage.getItem('login-name');

    for (let i = 0; i < userData.length; i++) {
        let currentContact = userData[i];
        let name = currentContact['name'];
        let userInitial = userData[i]['initials'];
        let nameColor = userData[i]['color'];

        let youLabel = loginUser === name ? '(You)' : '';

        overlayContainer.innerHTML += renderContacts(name, i, userInitial, youLabel)

        let initialDiv = document.getElementById(`list-circle${i}`);
        initialDiv.style.backgroundColor = nameColor;
    }
}


function renderContacts(name, i, userInitial, youLabel) {
    return /*html*/`
    <label class="contact-label" for="check-contact${i}">
        <div class="current-contacts">
            <div class="add-task-contacts"> 
               <div id="list-circle${i}" class="contact-circle"> <span>${userInitial}</span></div>
               <span id="current-name" class="current-name">${name} ${youLabel}</span>
               <input value="${name}" class="check-contact" id="check-contact${i}" type="checkbox" onchange="setCheckbox(this, '${name}', ${i})">
            </div>
        </div>
    </label>        
    `;
}

/**
 *Changes the status of a checkbox and updates the appearance of its contact elements.
 * 
 * @param {HTMLInputElement} checkbox 
 * @param {string} name 
 * @param {number} i 
 */
function setCheckbox(checkbox, name, i) {
    let container = checkbox.closest('.contact-label');
    if (checkbox.checked) {
        container.style.backgroundColor = 'rgb(9, 25, 49)';
        container.style.color = 'white';
        pushContact(name);
        renderInitialsimg(i);

    } else {
        container.style.backgroundColor = '';
        container.style.color = '';
        spliceContact(name);
        removeInitialsimg(i);
    }
}

/**
 * shows the circle with the initials from the selected contacts.
 * 
 * @param {number} i 
 */
function renderInitialsimg(i) {
    let content = document.getElementById('selected-contacts');
    let userInitial = userData[i]['initials'];
    let nameColor = userData[i]['color'];

    content.innerHTML += /*html*/`
         <div id="initials${i}" class="contact-circle"> <span>${userInitial}</span></div>`;
    let initialDiv = document.getElementById(`initials${i}`)
    initialDiv.style.backgroundColor = nameColor;
}


function removeInitialsimg(i) {
    let content = document.getElementById('selected-contacts');
    let divToRemove = document.getElementById(`initials${i}`);

    if (divToRemove) {
        content.removeChild(divToRemove);
    }
}


function pushContact(name) {
    assignedContact.push(name);
    console.log(assignedContact);
}

/**
 * delete contact with uncheck checkbox in setCheckbox(). 
 * 
 * @param {string} name 
 */
function spliceContact(name) {
    // Suche den Index des Kontakts im assignedContact-Array
    let indexToRemove = assignedContact.indexOf(name);

    if (indexToRemove !== -1) {
        assignedContact.splice(indexToRemove, 1);
        console.log(assignedContact);
    }
}


function removeCheckboxStyle() {
    let overlayContainer = document.getElementById('contact-overlay');
    overlayContainer.innerHTML = '';
    loadContacts();
}

function closeOnClickOutside(event) {
    let overlayContainer = document.getElementById('contact-overlay');
    let assignedTo = document.getElementById('assignedTo');

    // Überprüfung ob der Klick außerhalb des Popups liegt
    if (!overlayContainer.contains(event.target) && event.target !== assignedTo) {
        closeContactOverlay();
    }
}


function handleEnterKeyPress(event, action, i) {
    if (event.key === 'Enter') {
        event.preventDefault();
        if (action === 'subtask-input') {
            addSubTask();
        } else if (action === 'edit-Input') {
            renameSubTask(i);
        }
    }
}


function renameSubTask(i) {
    let editSubTask = document.getElementById(`edit-task-input${i}`).value;
    let newSubtask = {
        "subtitle": editSubTask,
        "subdone": false
    }

    if (editSubTask !== '') {
        newSubTasks.push(newSubtask);
    }
    deleteSubTask(i);
    addSubTask();
}

/**
 * only for the style for editing the subtask.
 * 
 * @param {number} i 
 */
function editSubTask(i, currenTask) {
    let subtaskList = document.getElementById(`subtask-list${i}`);
    let editSubInput = document.getElementById(`edit-task-input${i}`);
    let taskbtn = document.getElementById(`task-edit-buttons${i}`);
    let inputContainer = document.getElementById(`subtask-input-container${i}`);

    styleEditSubTask(i, currenTask, subtaskList, editSubInput, taskbtn, inputContainer)
}

function styleEditSubTask(i, currenTask, subtaskList, editSubInput, taskbtn, inputContainer) {
    inputContainer.classList.add('d-flex');
    inputContainer.classList.remove('d-none');
    taskbtn.classList.remove('d-flex');
    taskbtn.classList.add('d-none');
    subtaskList.classList.remove('subtask-list');
    subtaskList.classList.add('d-none');
    editSubInput.classList.remove('d-none');
    editSubInput.value = `${currenTask}`;
}


function deleteSubTask(i) {
    newSubTasks.splice(i, 1);
    addSubTask();
}

/**
 * removes everything from the page
 */
function clearTasks() {
    let title = document.getElementById('title-input');
    let description = document.getElementById('description-textarea');
    let date = document.getElementById('date-input');
    let sublist = document.querySelectorAll('.sublist-container');
    let newTasks = document.getElementById('subtask-input');
    let contactImg = document.getElementById('selected-contacts');

    removeValues(title, description, date, sublist, newTasks, contactImg)
    newSubTasks = [];
    assignedContact = [];
    removeCheckboxStyle();
    removeButtonColor();
}

function removeValues(title, description, date, sublist, newTasks, contactImg) {
    contactImg.innerHTML = "";
    newTasks.value = "";
    date.value = "";
    description.value = "";
    title.value = "";
    sublist.forEach(function (element) {
        element.innerHTML = '';
    })
}


function removeButtonColor() {
    let buttons = document.querySelectorAll('.prio-buttons button');
    buttons.forEach(function (btn,) {
        btn.classList.remove('active');
    });
    let images = document.querySelectorAll('.prio-buttons button img');
    images.forEach(function (imag,) {
        imag.classList.remove('active');
    });
}

/**
 * Search function to find Contacts in the List.
 */
function findContact() {
    const searchInput = document.getElementById('assignedTo');
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



