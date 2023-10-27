function renderEditTask(id, title, description, duedate) {
    return `
        <div id="slider" class="edit-task-container">
            <div class="edit-task-first-line">
                <svg onclick="closeSlider()" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.68193 8.79678L1.78193 13.6968C1.5986 13.8801 1.36527 13.9718 1.08193 13.9718C0.7986 13.9718 0.565267 13.8801 0.381934 13.6968C0.1986 13.5134 0.106934 13.2801 0.106934 12.9968C0.106934 12.7134 0.1986 12.4801 0.381934 12.2968L5.28193 7.39678L0.381934 2.49678C0.1986 2.31344 0.106934 2.08011 0.106934 1.79678C0.106934 1.51344 0.1986 1.28011 0.381934 1.09678C0.565267 0.913444 0.7986 0.821777 1.08193 0.821777C1.36527 0.821777 1.5986 0.913444 1.78193 1.09678L6.68193 5.99678L11.5819 1.09678C11.7653 0.913444 11.9986 0.821777 12.2819 0.821777C12.5653 0.821777 12.7986 0.913444 12.9819 1.09678C13.1653 1.28011 13.2569 1.51344 13.2569 1.79678C13.2569 2.08011 13.1653 2.31344 12.9819 2.49678L8.08193 7.39678L12.9819 12.2968C13.1653 12.4801 13.2569 12.7134 13.2569 12.9968C13.2569 13.2801 13.1653 13.5134 12.9819 13.6968C12.7986 13.8801 12.5653 13.9718 12.2819 13.9718C11.9986 13.9718 11.7653 13.8801 11.5819 13.6968L6.68193 8.79678Z" fill="#2A3647"/>
                </svg>
            </div>
            <form>
                <div class="gap16">

                    <div class="edit-task disp-flex-column">
                        <span class="edit-task-headline">Title</span>
                        <input required id="edit-title" type="text" value="${title}">
                        <div></div>
                    </div>

                    <div class="edit-task disp-flex-column">
                        <span class="edit-task-headline">Description</span>
                        <textarea required id="edit-description" row="3">${description}</textarea>
                        <div></div>
                    </div>

                    <div class="edit-task disp-flex-column">
                        <span class="edit-task-headline">Due Date</span>
                        <input type="date" id="date-input" value="${duedate}">
                        <div></div>
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
                        <div></div>
                    </div>

                    <div class="edit-assigned-user disp-flex-column">
                        <span class="edit-task-headline">Assigned to</span>
                        <input onclick="openEditContactOverlay(${id})" id="edit-assigned-to" type="text" placeholder="Select contacts to assign" autocomplete="off">
                        <div class="p-relative">
                            <div class="d-none" id="edit-contact-overlay"></div>
                            <div id="selected-contacts"></div>
                        </div>
                        <div></div>
                    </div>

                    <div class="edit-task disp-flex-column">
                        <span class="edit-task-headline">Subtasks</span>
                        <div class="subtask-input-btn">
                            <input onkeydown="handleEnterKeyPress(event, 'subtask-input')" id="subtask-input" placeholder="Add new subtask" type="text" autocomplete="off">
                            <button onclick="addSubTask()" type="button" class="subtask-button"><img src="./assets/img/addSub.svg" alt=""></button>
                        </div>
                        <div id="subtask-lists"></div>
                        <div></div>
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
                    <div id="list-circle${userIndex}" class="assignment-circle-big-menu" style="background-color: ${color};">
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
                    <div id="list-circle${userIndex}" class="assignment-circle-big-menu" style="background-color: ${color};">
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