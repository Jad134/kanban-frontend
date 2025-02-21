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


function renderSubTask(newTasks, i) {
    return /*html*/`
    <div id="sublist-container${i}" class="sublist-container">
      <ul id="subtask-list${i}" class="subtask-list">
            <li> <span  id="show-current-subtask${i}">${newTasks}</span></li>
      </ul>
        <div id="subtask-input-container${i}" class="d-none subtask-input-container" style="width: 100%;"> 
           <input onkeydown="handleEnterKeyPress(event, 'edit-Input', ${i})"  id="edit-task-input${i}" class=" edit-subtask-input" type="text" > 
           <img onclick="renameSubTask(${i})" class="edit-done"  src="assets/img/done.svg" alt="">
           <img onclick="deleteSubTask(${i})"  src="assets/img/addtasktrash.svg" alt="">
        </div>
        <div id="task-edit-buttons${i}" class="d-flex subtask-edit-buttons">
          <img onclick="editSubTask(${i}, '${newTasks}')" class="d-none edit-subtask" src="assets/img/addtaskedit.svg" alt="">
          <img onclick="deleteSubTask(${i})" class="d-none" style="height: 24px; width: 24px;" src="assets/img/addtasktrash.svg" alt="">
        </div>
    </div> `;
}


function renderContacts(name, i, userInitial, youLabel, id) {
    return /*html*/`
    <label class="contact-label" for="check-contact${i}">
        <div class="current-contacts">
            <div class="add-task-contacts"> 
               <div id="list-circle${i}" class="contact-circle"> <span>${userInitial}</span></div>
               <span class="current-name">${name} ${youLabel}</span>
               <input value="${name}" class="check-contact" id="check-contact${i}" type="checkbox" onchange="setCheckbox(this, '${name}', ${i}, '${id}')">
            </div>
        </div>
    </label>        
    `;
}


function renderNewCategoryField(){
return /*html*/`
<div id="new-category-input-container">
    <input placeholder="add new Category" onkeydown="handleEnterKeyPress(event , 'new-category-input')" id="new-category-input" type="text">
     <div class="new-category-input-img">
        <img onclick="closeNewCategoryInput()" src="assets/img/close.svg" alt="">
        <img onclick=" addCategory()" src="assets/img/checkblack.svg" alt="">
     </div>
</div>
`
}