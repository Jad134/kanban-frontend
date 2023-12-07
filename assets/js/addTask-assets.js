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


/**
 * This function styles the edit Subtasks section and the Input fields
 * 
 * @param {number} i 
 * @param {html-Element} currenTask 
 * @param {html-Element} subtaskList 
 * @param {html-Element} editSubInput 
 * @param {html-Element} taskbtn 
 * @param {html-Element} inputContainer 
 */
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

/**
 * This function is responsible for managing the buttons within the 'add subtask' input field and enables the buttons to appear or disappear.
 */
function handleInputFocus() {
    const inputField = document.getElementById('subtask-input');
    const svgContainer = document.querySelector('.subtask-svg');
    const subtaskbtn = document.getElementById('subtask-button');

    inputField.addEventListener('focus', () => {
        svgContainer.style.display = 'flex';
        subtaskbtn.style.display = 'none';
    });

    inputField.addEventListener('blur', () => {
        svgContainer.style.display = 'none';
        subtaskbtn.style.display = 'flex';
    });
}


/**
 * Clears values and content in various HTML elements.
 *
 * @param {HTMLElement} title - The HTML input element for the title.
 * @param {HTMLElement} description - The HTML input element for the description.
 * @param {HTMLElement} date - The HTML input element for the date.
 * @param {Array<HTMLElement>} sublist - An array of HTML elements representing subtasks.
 * @param {HTMLElement} newTasks - The HTML input element for new tasks.
 * @param {HTMLElement} contactImg - The HTML element for the contact image.
 */
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


/**
 * Removes the Checkbox Styling for the contacts, if the page was cleared.
 */
function removeCheckboxStyle() {
    let overlayContainer = document.getElementById('contact-overlay');
    overlayContainer.innerHTML = '';
    loadContacts();
}


/**
 * Handles the Enter key press event and performs specific actions based on the provided action type.
 *
 * @param {Event} event - The key press event object.
 * @param {string} action - The type of action to perform ('subtask-input' or 'edit-Input').
 * @param {number} i - The index parameter used for specific actions (e.g., renaming a subtask).
 */
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


/**
 * Removes the Prio button Color.
 */
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
 * Closes a UI element, specified by `overlayContainer`, when a click event occurs outside the designated area.
 *
 * @param {MouseEvent} event - The click event object.
 * @returns {void}
 */
function closeOnClickOutside(event) {
    let overlayContainer = document.getElementById('contact-overlay');
    let assignedTo = document.getElementById('assignedTo');

    if (!overlayContainer.contains(event.target) && event.target !== assignedTo) {
        closeContactOverlay();
    }
}


/**
 * Styling for the Contact list, which is only opend and closed by CSS Styling
 */
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

    removeValues(title, description, date, sublist, newTasks, contactImg);
    newSubTasks = [];
    assignedContact = [];
    removeCheckboxStyle();
    removeButtonColor();
}


/**
 * This prevents you from clicking on past days in the calendar
 */
function setCalenderToToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // Januar ist 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById('date-input').min = today;
}


function addNewCategory() {
    let addCategoryContainer = document.getElementById('add-category');
    let addCategoryImg = document.getElementById('add-category-img');

    addCategoryImg.style = 'display: none;'
    addCategoryContainer.innerHTML = /*html*/`
        <div id="new-category-input-container">
            <input id="new-category-input" type="text">
             <div class="new-category-input-img">
                <img src="assets/img/close.svg" alt="">
                <img src="assets/img/checkblack.svg" alt="">
             </div>
        </div>
    `
}