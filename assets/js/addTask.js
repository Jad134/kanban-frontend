let addedTasks = [{}];
let lastClickedPrio = null;
let newSubTasks = [];
let assignedContact = [];
let userData = [];
let taskId;


function init() {
    loadUserDataFromRemote(); 
    getTaskStorage();
    handleInputFocus();
    setCalenderToToday()
    prioButtonAtStart();
    clickOutsideEventListener();
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
 * This function sets the prio button to medium at the beginning. 
 */
function prioButtonAtStart() {
    let button = document.getElementById('medium-btn');
    let img = document.getElementById('medium-img');
    lastClickedPrio = button;
    button.classList.add('active');
    img.classList.add('active');
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
        "id": taskId = Date.now() + Math.random(),
        "title": title.value,
        "description": description.value,
        "assigned_to": assignedContact,
        "due_date": date.value,
        "priority": prioValue,
        "category": categoryText,
        "subtasks": newSubTasks,
        //"bucket": getBucketFromSession()
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


/**
 * push the new task to the addedTasks Array and clear current Arrays.
 * 
 * @param {Array} tasks 
 */
async function sendFormular(tasks) {
    addedTasks.push(tasks);
    //await addTaskToStorage();
    console.log(tasks);
    await createTask(tasks)
    await addTaskIdToStorage();
    sliderTaskAdded();
    setTimeout(() => {
        if (window.location.pathname == "/add-task.html") {
            clearTasks();
            window.location.href = "/board.html";
        } else {
            clearBuckets();
            addedTasks = [];
            lastClickedPrio = null;
            newSubTasks = [];
            assignedContact = [];
            initBoard();
        }
    }, 1700);
}


/**
 * Slider for the information, that the task was successfully added to the Board
 */
function sliderTaskAdded() {
    document.getElementById('slider-container').innerHTML = renderTaskAdded();

    openSlider();
    setTimeout(() => {
        closeSlider();
        document.getElementById('slider-container').innerHTML = '';
    }, 1500);
}


/**
 * Returns the "todo" bucket for the Board.
 */
function getBucketFromSession() {
    bucket = sessionStorage.getItem('bucket');
    if (bucket === null || bucket === undefined) {
        return 'todo';
    } else {
        return bucket;
    }
}


async function addTaskIdToStorage() {
    //await setItem('taskid', taskId); API ???
}


async function addTaskToStorage(id, tasks) {
    //await setItem('tasks', JSON.stringify(addedTasks));
    console.log(tasks);
    await updateTask(id, tasks)

}


/**
 * Load the user Datas from the Remote storage
 */
async function loadUserDataFromRemote() {
    let newUserDataString = await fetchUserData();
    //newUserDataString = JSON.parse(newUserDataString['data']['value']);
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
    let currentTasks = await getApiItem();

    for (let i = 0; i < currentTasks.length; i++) {
        let tasks = currentTasks[i];
        addedTasks.push(tasks);
    }
}


/**
 * Add Subtask to the list.
 */
function addSubTask() {
    let subtaskContent = document.getElementById('subtask-lists');
    let newTasksText = document.getElementById('subtask-input').value;


    let newSubtask = {
        "title": newTasksText,
        "done": false
    }
    if (newTasksText !== '') {
        newSubTasks.push(newSubtask);
    }
    subtaskContent.innerHTML = '';

    for (let i = 0; i < newSubTasks.length; i++) {
        const newTasks = newSubTasks[i]['title'];
        subtaskContent.innerHTML += renderSubTask(newTasks, i);
    }
    document.getElementById('subtask-input').value = '';
    //createSubtask(newSubtask)
    console.log(newSubTasks);
}


/**
 * Load the contacts from the userData Array
 */
function loadContacts() {
    let overlayContainer = document.getElementById('contact-overlay');
    let loginUser = localStorage.getItem('login-name');

    for (let i = 0; i < userData.length; i++) {
        let currentContact = userData[i];
        let name = currentContact['username'];
        let userInitial = userData[i].profile['initials']
        let nameColor = userData[i].profile['color'];
        let userId = currentContact['id']
        let youLabel = loginUser === name ? '(You)' : '';

        overlayContainer.innerHTML += renderContacts(name, i, userInitial, youLabel, userId)

        let initialDiv = document.getElementById(`list-circle${i}`);
        initialDiv.style.backgroundColor = nameColor;
    }
}


/**
 *Changes the status of a checkbox and updates the appearance of its contact elements.
 * 
 * @param {HTMLInputElement} checkbox 
 * @param {string} name 
 * @param {number} i 
 */
function setCheckbox(checkbox, name, i, id) {
    let container = checkbox.closest('.contact-label');
    if (checkbox.checked) {
        container.style.backgroundColor = 'rgb(9, 25, 49)';
        container.style.color = 'white';
        pushContact(name, id);
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


/**
 * removes the Contact initials, if checkbox is not checked for the contact
 * 
 * @param {number} i 
 */
function removeInitialsimg(i) {
    let content = document.getElementById('selected-contacts');
    let divToRemove = document.getElementById(`initials${i}`);

    if (divToRemove) {
        content.removeChild(divToRemove);
    }
}


function pushContact(name, id) {
    console.log(id);
    assignedContact.push(id);
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
    }
}


/**
 * This function is for the edit the Subtasks
 * 
 * @param {number} i 
 */
function renameSubTask(i) {
    let editSubTask = document.getElementById(`edit-task-input${i}`).value;
    let newSubtask = {
        "subtitle": editSubTask,
        "done": false
    }

    if (editSubTask !== '') {
        newSubTasks.push(newSubtask);
    }
    deleteSubTask(i);
    addSubTask();
}


/**
 * only for open the for edit  subtask function.
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


/**
 * delete the Subtasks from the current Subtasks array.
 * 
 * @param {number} i 
 */
function deleteSubTask(i) {
    newSubTasks.splice(i, 1);
    addSubTask();
}


function clearSubtaskInput() {
    let newTasks = document.getElementById('subtask-input');
    newTasks.value = "";
}

