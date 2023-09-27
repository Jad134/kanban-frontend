let addedTasks = [{}];
let lastClickedPrio = null;
let newSubTasks = [];



function init() {
    getTaskStorage()
    //assignContacts()

}

function ChangeButtonColor(buttonId, imgId) {
    let button = document.getElementById(buttonId);
    let img = document.getElementById(imgId);


    if (button.classList.contains('active')) {
        button.classList.remove('active');
        img.classList.remove('active');
        lastClickedPrio = null;
    } else {

        let buttons = document.querySelectorAll('.prio-buttons button');
        buttons.forEach(function (btn) {
            btn.classList.remove('active');
        });

        let images = document.querySelectorAll('.prio-buttons button img');
        images.forEach(function (imag) {
            imag.classList.remove('active');
        });

        lastClickedPrio = button;

        button.classList.add('active');
        img.classList.add('active');
    }
}


/*  function submitForm(event) {  // Nur für den Test. Später rausnehmen, und auch das onclick entfernen. Verhindert das neu laden der Seite.
    event.preventDefault();
    console.log(addedTasks)
}*/

function getValues() {
    let bucket = "todo"
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
        "bucket": bucket,
    };
    addedTasks.push(tasks);
    addTaskToStorage()
    clearTasks();
    newSubTasks = [];
}

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
    await setItem('tasks', JSON.stringify(addedTasks))
}

function addSubTask() {
    let subtaskContent = document.getElementById('subtask-lists');
    let newTasksText = document.getElementById('subtask-input').value;

    if (newTasksText !== '') {
        newSubTasks.push(newTasksText);
    }

    subtaskContent.innerHTML = '';

    for (let i = 0; i < newSubTasks.length; i++) {
        const newTasks = newSubTasks[i];

        subtaskContent.innerHTML += /*html*/`
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
    document.getElementById('subtask-input').value = '';
}

function assignContacts() { // FÜr Später wieder wichtig stichwort: Contacts!!!!
    let select = document.getElementById('assignedTo');

    for (let i = 0; i < contacts.length; i++) {
        let currentContact = contacts[i];
        let name = currentContact['name'];

        select.innerHTML += /*html*/`
            <option value="${i}"> ${name}</option>
        `
    }
}

function openContactOverlay() {
    let overlayContainer = document.getElementById('contact-overlay');

    for (let i = 0; i < contacts.length; i++) {
        let currentContact = contacts[i];
        let name = currentContact['name'];

        overlayContainer.innerHTML += /*html*/`
        <div class="current-contacts">
            <div class="add-task-contacts"> 
                <span class="current-name">${name}</span>
            </div>
        </div>
        `
    }

}

function handleEnterKeyPress(event, action, i) {
    if (event.key === 'Enter') {
        event.preventDefault();
        if (action === 'subtask-input') {
            addSubTask();
        } else if (action === 'edit-Input') {
            renameSubTask(i)
        }
    }
}

function renameSubTask(i) {
    let editSubTask = document.getElementById(`edit-task-input${i}`).value;
    if (editSubTask !== '') {
        newSubTasks.push(editSubTask);
    }
    deleteSubTask(i)
    addSubTask();
}

function editSubTask(i, currenTask) {
    let subtaskList = document.getElementById(`subtask-list${i}`);
    let editSubInput = document.getElementById(`edit-task-input${i}`);
    let taskbtn = document.getElementById(`task-edit-buttons${i}`);
    let inputContainer = document.getElementById(`subtask-input-container${i}`)

    inputContainer.classList.add('d-flex');
    inputContainer.classList.remove('d-none');
    taskbtn.classList.remove('d-flex');
    taskbtn.classList.add('d-none');
    subtaskList.classList.remove('subtask-list')
    subtaskList.classList.add('d-none')
    editSubInput.classList.remove('d-none');
    editSubInput.value = `${currenTask}`;
}


function deleteSubTask(i) {
    newSubTasks.splice(i, 1)
    addSubTask()
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