/**
 * Renders a task container with specific details.
 * @param {number} id - The ID of the task.
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} category - The category of the task.
 * @param {string} categoryCssClass - The CSS class for the category.
 * @returns {string} - HTML string representing the task container.
 */
function renderBuckets(id, title, description, category, categoryCssClass) {
    return `
        <div class="task-container" id="task-${id}" onclick="loadTask(${id})" ondragstart="startDragging(${id})" draggable="true">
            <div class="first-line-bucket">
                <div class="${categoryCssClass}">${category}</div>
                <svg fill="#000000" width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="switch-to-bucket" onclick="switchToBucket(${id}, event)">
                    <path d="M4 14v2l-4-3 4-3v2h12v2H4zm8-12V0l4 3-4 3V4H0V2h12z" fill-rule="evenodd"/>
                </svg>
            </div>
            <div class="task-title-and-description">
                <h4 class="task-title-container" title="${title}">${title}</h4>
                <div class="task-description-container">${description}</div>
            </div>
            <div id="subtasks-container-${id}" class="task-subtasks-container"></div>
            <div class="task-bottom-container">
                <div id="task-assignment-container-${id}" class="task-assignments"></div>
                <div id="task-prio-img-${id}"></div>
            </div>
        </div>
    `;
}


/**
 * Renders a progress bar representing the completion of subtasks.
 * @param {number} numberOfSubtasksDone - The number of completed subtasks.
 * @param {number} numberOfSubtasks - The total number of subtasks.
 * @returns {string} - HTML string representing the progress bar and subtask count.
 */
function renderSubtaskCounter(numberOfSubtasksDone, numberOfSubtasks) {
    return `
        <div class="progress-bar" title="${numberOfSubtasksDone}/${numberOfSubtasks} subtasks are done">
            <div class="progress" style="width: ${numberOfSubtasksDone / numberOfSubtasks * 100}%;"></div>
        </div>
        <div class="nowrap">${numberOfSubtasksDone}/${numberOfSubtasks} Subtasks</div>
    `;
}


/**
 * Renders a visual representation of assigned users.
 * @param {string} initials - The initials of the assigned user.
 * @param {string} color - The color associated with the user.
 * @returns {string} - HTML string displaying the assigned user.
 */
function renderAssignedUsers(initials, color) {
    return `
        <div style="background-color: ${color};" class="assignment-circle margin--4px">${initials}</div>
    `;
}


/**
 * Renders assigned users for an open task.
 *
 * @param {string} initials - Initials of the assigned user.
 * @param {string} color - Background color for the circle.
 * @param {string} assignedUser - Name of the assigned user.
 * @returns {string} HTML for displaying assigned users.
 */
function renderAssignedUsersForOpenTask(initials, color, assignedUser) {
    return `
        <div class="assigned-to-contact">
            <div style="background-color: ${color};" class="assignment-circle">${initials}</div>
            <span class="assigned-to-name">${assignedUser}</span>
        </div>
    `;
}


/**
 * Renders priority image for a task based on the priority level.
 *
 * @param {string} prio - Priority level of the task.
 * @returns {string} HTML with an image tag for the priority.
 */
function renderPrio(prio) {
    return `
        <img src="./assets/img/subtask-prio-${prio}.svg" alt="">
    `;
}


/**
 * Renders an open task with details like title, description, due date, priority, and assignment.
 *
 * @param {string} id - Task ID.
 * @param {string} category - Category of the task.
 * @param {string} categoryCssClass - CSS class for the category.
 * @param {string} title - Title of the task.
 * @param {string} description - Description of the task.
 * @param {string} duedate - Due date of the task.
 * @param {string} prio - Priority of the task.
 * @param {string} assigned - Assigned users.
 * @returns {string} HTML for an open task.
 */
function renderOpenTask(id, category, categoryCssClass, title, description, duedate, prio, assigned) {
    return `
        <div id="slider" class="open-task-container">
            <div class="open-task-first-line">
                <div class="open-${categoryCssClass}">${category}</div>
                <svg onclick="closeSlider()" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.68193 8.79678L1.78193 13.6968C1.5986 13.8801 1.36527 13.9718 1.08193 13.9718C0.7986 13.9718 0.565267 13.8801 0.381934 13.6968C0.1986 13.5134 0.106934 13.2801 0.106934 12.9968C0.106934 12.7134 0.1986 12.4801 0.381934 12.2968L5.28193 7.39678L0.381934 2.49678C0.1986 2.31344 0.106934 2.08011 0.106934 1.79678C0.106934 1.51344 0.1986 1.28011 0.381934 1.09678C0.565267 0.913444 0.7986 0.821777 1.08193 0.821777C1.36527 0.821777 1.5986 0.913444 1.78193 1.09678L6.68193 5.99678L11.5819 1.09678C11.7653 0.913444 11.9986 0.821777 12.2819 0.821777C12.5653 0.821777 12.7986 0.913444 12.9819 1.09678C13.1653 1.28011 13.2569 1.51344 13.2569 1.79678C13.2569 2.08011 13.1653 2.31344 12.9819 2.49678L8.08193 7.39678L12.9819 12.2968C13.1653 12.4801 13.2569 12.7134 13.2569 12.9968C13.2569 13.2801 13.1653 13.5134 12.9819 13.6968C12.7986 13.8801 12.5653 13.9718 12.2819 13.9718C11.9986 13.9718 11.7653 13.8801 11.5819 13.6968L6.68193 8.79678Z" fill="#2A3647"/>
                </svg>
            </div>
            <div class="open-task-title">${title}</div>
            <div class="open-task-description">${description}</div>
            <div class="open-task-duedate"><span>Due date:</span>${duedate}</div>
            <div id="open-task-prio-container">
                <div class="open-task-prio"><span>Priority:</span>${prio}</div>
            </div>
            <div class="open-task-assigned">
                <span>Assigned To:</span>
                <div id="open-task-contacts"></div>
            </div>
            <div id="open-task-subtasks" class="open-task-subtask"></div>
            <div class="open-task-buttons">
                <button onclick="deleteTask(${id})">
                    <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.68213 18.3967C3.13213 18.3967 2.6613 18.2009 2.26963 17.8092C1.87796 17.4176 1.68213 16.9467 1.68213 16.3967V3.39673C1.3988 3.39673 1.1613 3.3009 0.969629 3.10923C0.777962 2.91756 0.682129 2.68006 0.682129 2.39673C0.682129 2.1134 0.777962 1.8759 0.969629 1.68423C1.1613 1.49256 1.3988 1.39673 1.68213 1.39673H5.68213C5.68213 1.1134 5.77796 0.875895 5.96963 0.684229C6.1613 0.492562 6.3988 0.396729 6.68213 0.396729H10.6821C10.9655 0.396729 11.203 0.492562 11.3946 0.684229C11.5863 0.875895 11.6821 1.1134 11.6821 1.39673H15.6821C15.9655 1.39673 16.203 1.49256 16.3946 1.68423C16.5863 1.8759 16.6821 2.1134 16.6821 2.39673C16.6821 2.68006 16.5863 2.91756 16.3946 3.10923C16.203 3.3009 15.9655 3.39673 15.6821 3.39673V16.3967C15.6821 16.9467 15.4863 17.4176 15.0946 17.8092C14.703 18.2009 14.2321 18.3967 13.6821 18.3967H3.68213ZM3.68213 3.39673V16.3967H13.6821V3.39673H3.68213ZM5.68213 13.3967C5.68213 13.6801 5.77796 13.9176 5.96963 14.1092C6.1613 14.3009 6.3988 14.3967 6.68213 14.3967C6.96546 14.3967 7.20296 14.3009 7.39463 14.1092C7.5863 13.9176 7.68213 13.6801 7.68213 13.3967V6.39673C7.68213 6.1134 7.5863 5.8759 7.39463 5.68423C7.20296 5.49256 6.96546 5.39673 6.68213 5.39673C6.3988 5.39673 6.1613 5.49256 5.96963 5.68423C5.77796 5.8759 5.68213 6.1134 5.68213 6.39673V13.3967ZM9.68213 13.3967C9.68213 13.6801 9.77796 13.9176 9.96963 14.1092C10.1613 14.3009 10.3988 14.3967 10.6821 14.3967C10.9655 14.3967 11.203 14.3009 11.3946 14.1092C11.5863 13.9176 11.6821 13.6801 11.6821 13.3967V6.39673C11.6821 6.1134 11.5863 5.8759 11.3946 5.68423C11.203 5.49256 10.9655 5.39673 10.6821 5.39673C10.3988 5.39673 10.1613 5.49256 9.96963 5.68423C9.77796 5.8759 9.68213 6.1134 9.68213 6.39673V13.3967Z" fill="#2A3647"/>
                    </svg>
                    <span>Delete</span>
                </button>
                <div class="button-seperator"></div>
                <button onclick="openEditTask(${id})">
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.68213 16.3967H4.08213L12.7071 7.77173L11.3071 6.37173L2.68213 14.9967V16.3967ZM16.9821 6.32173L12.7321 2.12173L14.1321 0.721729C14.5155 0.338395 14.9863 0.146729 15.5446 0.146729C16.103 0.146729 16.5738 0.338395 16.9571 0.721729L18.3571 2.12173C18.7405 2.50506 18.9405 2.96756 18.9571 3.50923C18.9738 4.0509 18.7905 4.5134 18.4071 4.89673L16.9821 6.32173ZM15.5321 7.79673L4.93213 18.3967H0.682129V14.1467L11.2821 3.54673L15.5321 7.79673Z" fill="#2A3647"/>
                    </svg>
                    <span>Edit</span>
                </button>
            </div>
        </div>
    `;
}


/**
 * Renders subtasks for a particular task.
 *
 * @param {number} s - Subtask number.
 * @param {string} id - Task ID.
 * @param {string} subtaskDone - Subtask completion status.
 * @param {string} subtask - Subtask description.
 * @returns {string} HTML for subtasks.
 */
function renderSubtasks(s, id, subtaskDone, subtask) {
    return `
        <div id="subtask-${id}-${s}" class="open-task-subtask-list" onclick="checkboxSubtask(${s}, ${id})">
            <img src="./assets/img/subtask-${subtaskDone}.svg" id="checkbox-${id}-${s}" class="subtask-checkbox" alt=""><div>${subtask}</div>
        </div>
    `;
}


/**
 * Renders a message for buckets without tasks.
 *
 * @param {string} bucket - ID of the bucket.
 * @param {string} text - Text to display.
 */
function renderBucketsWithoutTasks(bucket, text) {
    document.getElementById(bucket).innerHTML = `<div class="no-tasks">No tasks ${text}</div>`
}


/**
 * Generates HTML for adding a new task.
 *
 * @returns {string} HTML for adding a task.
 */
function addTaskHtml() {
    return `
        <div id="slider">
            <div class="add-task-first-line">
                <h1>Add Task</h1>
                <svg onclick="closeSlider()" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.68193 8.79678L1.78193 13.6968C1.5986 13.8801 1.36527 13.9718 1.08193 13.9718C0.7986 13.9718 0.565267 13.8801 0.381934 13.6968C0.1986 13.5134 0.106934 13.2801 0.106934 12.9968C0.106934 12.7134 0.1986 12.4801 0.381934 12.2968L5.28193 7.39678L0.381934 2.49678C0.1986 2.31344 0.106934 2.08011 0.106934 1.79678C0.106934 1.51344 0.1986 1.28011 0.381934 1.09678C0.565267 0.913444 0.7986 0.821777 1.08193 0.821777C1.36527 0.821777 1.5986 0.913444 1.78193 1.09678L6.68193 5.99678L11.5819 1.09678C11.7653 0.913444 11.9986 0.821777 12.2819 0.821777C12.5653 0.821777 12.7986 0.913444 12.9819 1.09678C13.1653 1.28011 13.2569 1.51344 13.2569 1.79678C13.2569 2.08011 13.1653 2.31344 12.9819 2.49678L8.08193 7.39678L12.9819 12.2968C13.1653 12.4801 13.2569 12.7134 13.2569 12.9968C13.2569 13.2801 13.1653 13.5134 12.9819 13.6968C12.7986 13.8801 12.5653 13.9718 12.2819 13.9718C11.9986 13.9718 11.7653 13.8801 11.5819 13.6968L6.68193 8.79678Z" fill="#2A3647"/>
                </svg>
            </div>

            <form novalidate>
                <div class="left-right-container">
                    <div class="left-side">

                        <div class="title-content">
                            <span class="span-style">Title <span class="required-star">*</span></span>
                            <input required placeholder="Enter a title" id="title-input" type="text" autocomplete="off">
                            <div class="error-message" id="title-error"></div>
                        </div>

                        <div class="description">
                            <span class="span-style">Description</span>
                            <textarea required placeholder="Enter a Description" name="" id="description-textarea" cols="20" rows="10"></textarea>
                            <div></div>
                        </div>

                        <div class="assigned">
                            <span class="span-style">Assigned to</span>
                            <input onclick="openContactOverlay()" id="assignedTo" type="text" placeholder="Select contacts to assign" autocomplete="off">
                            <div class="p-relative">
                                <div class="d-none" id="contact-overlay"></div>
                                <div id="selected-contacts"></div>
                            </div>
                            <div></div>
                        </div>

                        <div id="required-info" class="required-info">
                            <span><span class="required-star">*</span>This field is required</span>
                        </div>

                    </div>

                    <div class="right-side">

                        <div class="date-container">
                            <span class="span-style">Due date <span class="required-star">*</span></span>
                            <input  type='date' id="date-input"  >
                            <div class="error-message" id="date-error"></div>
                        </div>

                        <div class="prio">
                            <span class="span-style">Prio</span>
                            <div class="prio-buttons">
                                <button value="urgent" onclick=" ChangeButtonColor('urgent-btn', 'urgent-img')"
                                    type="button" id="urgent-btn">Urgent
                                    <img id="urgent-img" src="./assets/img/urgentimg.svg" alt="">
                                </button>
                                <button value="medium" onclick=" ChangeButtonColor('medium-btn', 'medium-img')"
                                    type="button" id="medium-btn">Medium
                                    <img id="medium-img" src="./assets/img/mediumimg.svg" alt="">
                                </button>
                                <button value="low" onclick=" ChangeButtonColor('low-btn', 'low-img')" type="button"
                                    id="low-btn">Low
                                    <img id="low-img" src="./assets/img/prio-baja.svg" alt="">
                                </button>
                            </div>
                            <div></div>
                        </div>

                        <div class="category-container">
                        <span class="span-style">Category <span class="required-star">*</span></span>
                        <div id="add-category-icon"><img id="add-category-img" onclick="addNewCategory()" style="cursor: pointer;" src="./assets/img/addSub.svg" alt=""></div>
                        <div id="add-category"></div>
                        <select name="Select contacts to assign" id="select-category">
                            <option value="" disabled selected hidden>Select task category</option>
                            <option value="1">Technical Task</option>
                            <option value="2">User Story</option>
                        </select>
                        <div class="error-message" id="category-error"></div>
                    </div>

                        <div id="subtask-container" class="subtask-container">
                            <span class="span-style">Subtasks</span>
                            <div class="subtask-input-btn">
                                <input onkeydown="handleEnterKeyPress(event , 'subtask-input')" id="subtask-input"
                                    placeholder="Add new subtask" type="text" autocomplete="off">
                                <div class="subtask-svg">
                                    <img onmousedown="clearSubtaskInput()" src="./assets/img/close.svg" alt="" >
                                    <div class="subtask-seperator"></div>
                                    <img onmousedown="addSubTask()" src="./assets/img/checkblack.svg" alt="" >  
                                </div>
                                <button onclick="addSubTask()" type="button" class="subtask-button" id="subtask-button">
                                    <img src="./assets/img/addSub.svg" alt="">
                                </button>
                            </div>

                            <div id="subtask-lists"></div>
                        </div>

                        <div class="create-buttons">
                            <div class="required-info-responsive">
                                <span><span class="required-star">*</span>This field is required</span>
                            </div>
                            <button onclick="clearTasks()" type="button" id="clear-btn">
                                Clear 
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.2496 11.9998L17.4926 17.2428M7.00659 17.2428L12.2496 11.9998L7.00659 17.2428ZM17.4926 6.75684L12.2486 11.9998L17.4926 6.75684ZM12.2486 11.9998L7.00659 6.75684L12.2486 11.9998Z"
                                        stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                            <button onclick="submitForm()" type="button" id="create-btn">
                                Create Task <img src="./assets/img/check.svg" alt="">
                            </button>
                        </div>

                    </div>

                    <div class="bottom"></div>

                </div>
            </form>
        </div>
    `;
}


/**
 * Renders move-to options for a task.
 *
 * @param {string} id - Task ID.
 * @returns {string} HTML for move-to options.
 */
function renderMoveTo(id) {
    return `
        <div class="move-to-container">
            <div class="first-line-move-to">
                <span>Move to</span>
                <svg onclick="closeMoveTo(${id}, event)" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.68193 8.79678L1.78193 13.6968C1.5986 13.8801 1.36527 13.9718 1.08193 13.9718C0.7986 13.9718 0.565267 13.8801 0.381934 13.6968C0.1986 13.5134 0.106934 13.2801 0.106934 12.9968C0.106934 12.7134 0.1986 12.4801 0.381934 12.2968L5.28193 7.39678L0.381934 2.49678C0.1986 2.31344 0.106934 2.08011 0.106934 1.79678C0.106934 1.51344 0.1986 1.28011 0.381934 1.09678C0.565267 0.913444 0.7986 0.821777 1.08193 0.821777C1.36527 0.821777 1.5986 0.913444 1.78193 1.09678L6.68193 5.99678L11.5819 1.09678C11.7653 0.913444 11.9986 0.821777 12.2819 0.821777C12.5653 0.821777 12.7986 0.913444 12.9819 1.09678C13.1653 1.28011 13.2569 1.51344 13.2569 1.79678C13.2569 2.08011 13.1653 2.31344 12.9819 2.49678L8.08193 7.39678L12.9819 12.2968C13.1653 12.4801 13.2569 12.7134 13.2569 12.9968C13.2569 13.2801 13.1653 13.5134 12.9819 13.6968C12.7986 13.8801 12.5653 13.9718 12.2819 13.9718C11.9986 13.9718 11.7653 13.8801 11.5819 13.6968L6.68193 8.79678Z" fill="#2A3647"/>
                </svg>
            </div>
            <div class="move-to" onclick="moveToBucket(${id}, 'todo', event)">To Do</div>
            <div class="move-to" onclick="moveToBucket(${id}, 'in-progress', event)">In progress</div>
            <div class="move-to" onclick="moveToBucket(${id}, 'await-feedback', event)">Await feedback</div>
            <div class="move-to" onclick="moveToBucket(${id}, 'done', event)">Done</div>
        </div>
    `
}


/**
 * Renders the view of a bucket after it's closed.
 *
 * @param {string} id - Task ID.
 * @param {string} title - Title of the task.
 * @param {string} description - Description of the task.
 * @param {string} category - Category of the task.
 * @param {string} categoryCssClass - CSS class for the category.
 * @returns {string} HTML for a bucket after closing.
 */
function renderBucketAfterClose(id, title, description, category, categoryCssClass) {
    return `
        <div class="first-line-bucket">
            <div class="${categoryCssClass}">${category}</div>
            <svg fill="#000000" width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="switch-to-bucket" onclick="switchToBucket(${id}, event)">
                <path d="M4 14v2l-4-3 4-3v2h12v2H4zm8-12V0l4 3-4 3V4H0V2h12z" fill-rule="evenodd"/>
            </svg>
        </div>
        <div class="task-title-and-description">
            <h4 class="task-title-container" title="${title}">${title}</h4>
            <div class="task-description-container">${description}</div>
        </div>
        <div id="subtasks-container-${id}" class="task-subtasks-container"></div>
        <div class="task-bottom-container">
            <div id="task-assignment-container-${id}" class="task-assignments"></div>
            <div id="task-prio-img-${id}"></div>
        </div>
    `;
}


/* test data

addedTasks = [{
    "id": 1,
    "bucket": "in-progress",
    "title": "Kochwelt Page & Recipe Recommender",
    "description": "Build start page with recipe recommendation.",
    "assigned": ["Jad El Nader", "Jonas Lambelet", "Heike Lüdemann"],
    "duedate": "2024-05-10",
    "prio": "Medium",
    "category": "User Story",
    "subtask": [
        {
            "subdone": true,
            "subtitle": "Implement Recipe Recommendation"
        },
        {
            "subdone": false,
            "subtitle": "Start Page Layout"
        }
    ]
},
{
    "id": 2,
    "bucket": "done",
    "title": "CSS Architecture Planning",
    "description": "Define CSS naming conventions and structure.",
    "assigned": ["Alexander Riedel"],
    "duedate": "2023-09-02",
    "prio": "Urgent",
    "category": "Technical Task",
    "subtask": [
        {
            "subdone": true,
            "subtitle": "Establish CSS Methodology"
        },
        {
            "subdone": true,
            "subtitle": "Setup Base Styles"

        }
    ]
},
{
    "id": 3,
    "bucket": "await-feedback",
    "title": "HTML Base Template Creation",
    "description": "Create reusable HTML base templates",
    "assigned": ["Alexander Riedel", "Heike Lüdemann"],
    "duedate": "2024-10-03",
    "prio": "Low",
    "category": "Technical Task",
    "subtask": []
},
{
    "id": 4,
    "bucket": "await-feedback",
    "title": "Daily Kochwelt Receipe",
    "description": "Implement daily receipe and portion calculator in JavaScript and HTML",
    "assigned": ["Alexander Riedel", "Jad El Nader", "Jonas Lambelet", "Heike Lüdemann"],
    "duedate": "2023-09-02",
    "prio": "Urgent",
    "category": "Technical Task",
    "subtask": [
        {
            "subdone": true,
            "subtitle": "Establish CSS Methodology"
        },
        {
            "subdone": true,
            "subtitle": "Setup Base Styles"

        }
    ]
},
];

*/
