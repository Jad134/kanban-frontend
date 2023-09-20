let addedTasks = [];
let lastClickedPrio = null;
let newSubTasks = [];

function ChangeButtonColor(buttonId, imgId) {
    let button = document.getElementById(buttonId);
    let img = document.getElementById(imgId)
    lastClickedPrio = button;

    let buttons = document.querySelectorAll('.prio-buttons button');
    buttons.forEach(function (btn,) {
        btn.classList.remove('active');
    });

    let images = document.querySelectorAll('.prio-buttons button img');
    images.forEach(function (imag,) {
        imag.classList.remove('active');
    });

    button.classList.add('active');
    img.classList.add('active')
}


function submitForm(event) {  // Nur für den Test. Später rausnehmen, und auch das onclick entfernen. Verhindert das neu laden der Seite.
    event.preventDefault();
    console.log(addedTasks)
}

function getValues() {
    let title = document.getElementById('title-input');
    let description = document.getElementById('description-textarea');
    let assignTo = document.getElementById('assignedTo');
    let assignedText = assignTo.options[assignTo.selectedIndex].text;
    let date = document.getElementById('date-input');
    let category = document.getElementById('select-category');
    let categoryText = category.options[category.selectedIndex].text;
    let subtask = document.getElementById('subtask-input');
    let prioValue = lastClickedPrio ? lastClickedPrio.value : '';

    let tasks = {
        "title": title.value,
        "description": description.value,
        "assigned": assignedText,
        "date": date.value,
        "prio": prioValue,
        "category": categoryText,
        "subtask": newSubTasks,
    };
    addedTasks.push(tasks);
    newSubTasks = [];
}

function addSubTask() {
    let subtaskContent = document.getElementById('subtask-container');
    let newTasks = document.getElementById('subtask-input').value;
    if (newTasks !== '') {
        subtaskContent.innerHTML += /*html*/`
        <div class="sublist-container">
            <ul class="subtask-list">
                <li>${newTasks}</li>
            </ul>
            </div>
        `;
        newTasks.value = '';
    }
    newSubTasks.push(newTasks);
}

function clearTasks() {
    let title = document.getElementById('title-input');
    let description = document.getElementById('description-textarea'); 
    let date = document.getElementById('date-input');
    let sublist = document.querySelectorAll('.sublist-container');
    let newTasks = document.getElementById('subtask-input');

    newTasks.value = "";
    date.value = "";
    description.value = "";
    title.value = "";
    sublist.forEach(function (element) {
        element.innerHTML = '';
    })
    newSubTasks = [];
    removeButtonColor();
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