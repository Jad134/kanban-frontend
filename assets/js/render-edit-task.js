function renderEditTask(id, title, description, duedate) {
    return `
        <div id="slider" class="edit-task-container">
            <div class="edit-task-first-line">
                <svg onclick="closeSlider()" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.68193 8.79678L1.78193 13.6968C1.5986 13.8801 1.36527 13.9718 1.08193 13.9718C0.7986 13.9718 0.565267 13.8801 0.381934 13.6968C0.1986 13.5134 0.106934 13.2801 0.106934 12.9968C0.106934 12.7134 0.1986 12.4801 0.381934 12.2968L5.28193 7.39678L0.381934 2.49678C0.1986 2.31344 0.106934 2.08011 0.106934 1.79678C0.106934 1.51344 0.1986 1.28011 0.381934 1.09678C0.565267 0.913444 0.7986 0.821777 1.08193 0.821777C1.36527 0.821777 1.5986 0.913444 1.78193 1.09678L6.68193 5.99678L11.5819 1.09678C11.7653 0.913444 11.9986 0.821777 12.2819 0.821777C12.5653 0.821777 12.7986 0.913444 12.9819 1.09678C13.1653 1.28011 13.2569 1.51344 13.2569 1.79678C13.2569 2.08011 13.1653 2.31344 12.9819 2.49678L8.08193 7.39678L12.9819 12.2968C13.1653 12.4801 13.2569 12.7134 13.2569 12.9968C13.2569 13.2801 13.1653 13.5134 12.9819 13.6968C12.7986 13.8801 12.5653 13.9718 12.2819 13.9718C11.9986 13.9718 11.7653 13.8801 11.5819 13.6968L6.68193 8.79678Z" fill="#2A3647"/>
                </svg>
            </div>
            <form onsubmit="submitEditForm(${id})">
                <div class="gap16">

                    <div class="edit-task disp-flex-column">
                        <span for="edit-title" class="edit-task-headline">Title</span>
                        <input id="edit-title" value="${title}" autocomplete="off" required>
                        <div></div>
                    </div>

                    <div class="edit-task disp-flex-column">
                        <span for="edit-description" class="edit-task-headline">Description</span>
                        <textarea id="edit-description">${description}</textarea>
                        <div></div>
                    </div>

                    <div class="edit-task disp-flex-column">
                        <span class="edit-task-headline">Due Date</span>
                        <input type="date" id="date-input" value="${duedate}" required>
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
                        <button type="submit" id="ok-button">
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


function renderTaskEdited() {
    return `
        <div class="task-edited-button">
            <span>Task successfully edited</span>
            <svg width="31" height="26" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.4544 2.77273L23.4545 23.2271C23.4538 23.8296 23.2142 24.4074 22.7881 24.8334C22.362 25.2595 21.7843 25.4992 21.1817 25.4998L16.6363 25.4998C16.0338 25.4992 15.456 25.2595 15.03 24.8334C14.6039 24.4074 14.3642 23.8296 14.3636 23.2271L14.3636 2.77273C14.3642 2.17015 14.6039 1.59243 15.03 1.16635C15.456 0.740262 16.0338 0.500623 16.6363 0.50002L21.1817 0.50002C21.7843 0.500623 22.362 0.740262 22.7881 1.16635C23.2142 1.59243 23.4538 2.17015 23.4544 2.77273ZM16.6363 23.2271L21.1817 23.2271L21.1817 2.77273L16.6363 2.77273L16.6363 23.2271ZM16.6363 2.77273L16.6363 23.2271C16.6357 23.8296 16.3961 24.4073 15.97 24.8334C15.5439 25.2595 14.9662 25.4991 14.3636 25.4997L9.81823 25.4997C9.21566 25.4991 8.63794 25.2595 8.21185 24.8334C7.78577 24.4073 7.54613 23.8296 7.54553 23.227L7.54553 2.7727C7.54613 2.17013 7.78577 1.59241 8.21185 1.16632C8.63793 0.740238 9.21566 0.500602 9.81823 0.5L14.3636 0.499999C14.9662 0.500602 15.5439 0.740238 15.97 1.16632C16.3961 1.59241 16.6357 2.17015 16.6363 2.77273ZM9.81823 23.227L14.3636 23.2271L14.3636 2.77273L9.81823 2.7727L9.81823 23.227ZM9.81823 2.7727L9.81823 23.227C9.81763 23.8296 9.57799 24.4073 9.15191 24.8334C8.72582 25.2595 8.1481 25.4991 7.54553 25.4997L3.00012 25.4997C2.39755 25.4991 1.81983 25.2595 1.39374 24.8334C0.967657 24.4073 0.728019 23.8296 0.727417 23.227L0.727416 2.7727C0.728018 2.17013 0.967656 1.59241 1.39374 1.16632C1.81982 0.740238 2.39755 0.500603 3.00012 0.5L7.54553 0.5C8.1481 0.500602 8.72582 0.740238 9.1519 1.16632C9.57799 1.59241 9.81763 2.17013 9.81823 2.7727ZM3.00012 23.227L7.54553 23.227L7.54553 2.7727L3.00012 2.7727L3.00012 23.227Z" fill="white"/>
                <path d="M30.2726 2.77298L30.2726 23.2273C30.272 23.8299 30.0323 24.4076 29.6062 24.8337C29.1802 25.2598 28.6024 25.4994 27.9999 25.5L23.4545 25.5C22.8519 25.4994 22.2742 25.2598 21.8481 24.8337C21.422 24.4076 21.1824 23.8296 21.1817 23.2271L21.1817 2.77273C21.1823 2.17015 21.422 1.59268 21.8481 1.1666C22.2742 0.740514 22.8519 0.500876 23.4544 0.500274L27.9999 0.500273C28.6024 0.500876 29.1801 0.740514 29.6062 1.1666C30.0323 1.59268 30.272 2.1704 30.2726 2.77298ZM23.4545 23.2271L27.9999 23.2273L27.9999 2.77298L23.4544 2.77273L23.4545 23.2271Z" fill="white"/>
            </svg>
        </div>
    `
}