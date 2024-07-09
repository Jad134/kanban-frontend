let currentDragTask;

/**
 * Initializes the dragging process for a specific task.
 * @param {number} id - ID of the task.
 */
function startDragging(id) {
    let i = idToIndex(id);
    currentDragTask = id;
    currentDraggedElement = i;
    let dragField = document.querySelectorAll('.specific-content');
    if (window.innerWidth > 768) {
        dragField.forEach(el => el.style.padding = "0 0 0 0");
        dragField.forEach(el => el.style.height = "100%");
    }
}


/**
 * Touch event handler for starting dragging a task.
 * @param {number} id - ID of the task.
 */
function startTouchDragging(id) {
    console.log(id)
}


/**
 * Allows dropping items.
 * @param {Event} event - The event object triggered.
 */
function allowDrop(event) {
    event.preventDefault();
}


/**
 * Handles UI behavior when hovering over a bucket.
 * @param {string} bucket - The target bucket.
 */
function hoverDrag(bucket) {
    let hoverElement = document.getElementById(bucket);
    hoverElement.classList.add('task-hover');
}


/**
 * Stops UI behavior for dragging over a bucket.
 * @param {string} bucket - The target bucket.
 */
function stopDrag(bucket) {
    let hoverElement = document.getElementById(bucket);
    hoverElement.classList.remove('task-hover');
}


/**
 * Moves a task to a specific bucket on the board.
 * @param {number} id - ID of the task.
 * @param {string} bucket - The target bucket.
 * @param {Event} event - The event object triggered during the move.
 */
function moveTo(bucket) {
    addedTasks[currentDraggedElement]['bucket'] = bucket;
    let element = document.getElementById(bucket);
    element.classList.remove('task-hover');
    let dragField = document.querySelectorAll('.specific-content');
    dragField.forEach(el => el.style.padding = "0");

    getTaskFromArray();
    countBucketsWithoutTasks();
    updateBucket(currentDragTask, bucket)
}


/**
 * Handles the UI behavior when moving a task to another bucket.
 * @param {number} id - ID of the task to be moved.
 * @param {Event} event - The event object triggered.
 */
function switchToBucket(id, event) {
    event.stopPropagation();
    document.getElementById(`task-${id}`).innerHTML = renderMoveTo(id);
}


/**
 * Closes the move-to dialog.
 * @param {number} id - ID of the task.
 * @param {Event} event - The event object triggered.
 */
function closeMoveTo(id, event) {
    event.stopPropagation();
    reloadBucket(id);
}


/**
 * Reloads the bucket after closing the move-to dialog.
 * @param {number} taskId - ID of the task.
 */
function reloadBucket(taskId) {
    let i = idToIndex(taskId);
    let id = addedTasks[i]['id'];
    let title = addedTasks[i]['title'];
    let description = addedTasks[i]['description'];
    let category = addedTasks[i]['category'];
    let categoryCssClass = categoryClassPicker(category);
    let prio = addedTasks[i]['prio'];

    document.getElementById(`task-${id}`).innerHTML = renderBucketAfterClose(id, title, description, category, categoryCssClass);

    countSubtasks(id);
    loadAssignedUsers(id);
    loadPrio(id, prio);
    findTasks();
}


/**
 * Moves a task to a specific bucket and updates the task accordingly.
 * @param {number} id - The ID of the task to be moved.
 * @param {string} bucket - The target bucket for the task.
 * @param {Event} event - The event object to prevent further event propagation.
 */
function moveToBucket(id, bucket, event) {
    event.stopPropagation();
    let i = idToIndex(id);
    addedTasks[i]['bucket'] = bucket;

    getTaskFromArray();
    countBucketsWithoutTasks();
    
}