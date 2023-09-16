

function openBoard() {
    document.getElementById('board').innerHTML = /*html*/ `
    <div id="board-head">
        <h2>Board</h2>
        <div id="board-interaction">
            <div id="input-area">
                <input type="text" placeholder="Find Task">
                <div id="seperator"></div>
                <img src="./assets/img/search.png" alt="lupe">
            </div>
            <div id="add-task">
                <p>Add task</p>
                <img src="./assets/img/add.png" alt="add">
            </div>
        </div>
    </div>
    <div id="board-content">
    
            <div id="board-todo-section" class="divers-sections">
                <div id="board-todo-section-head" class="divers-head-sections">
                    <h3>To Do</h3>
                    <img src="./assets/img/plus-button.png" alt="" class="board-head-section-images">
                </div>
                <div id="todos" class="specific-content">
                    <div class="empty-task">No tasks To do</div>
                </div>
            </div>        
            <div id="board-in-progress-section" class="divers-sections">
                <div id="board-in-progress-section-head" class="divers-head-sections">
                    <h3>In progress</h3>
                    <img src="./assets/img/plus-button.png" alt="" class="board-head-section-images">
                </div>
                <div id="progresses" class="specific-content">
                <div class="empty-task">No tasks progress</div>
                </div>
            </div>            
                <div id="board-await-feedback-section" class="divers-sections">
                    <div id="board-await-feedback-section-head" class="divers-head-sections">
                        <h3>Await feedback</h3>
                        <img src="./assets/img/plus-button.png" alt="" class="board-head-section-images">
                    </div>
                    <div id="feedbacks" class="specific-content">
                    <div class="empty-task">No tasks feedback</div>
                    </div>
                </div>            
            <div id="board-done-section" class="divers-sections">
                <div id="board-done-section-head" class="divers-head-sections">
                    <h3>Done</h3>
                </div>
                <div id="dones" class="specific-content">
                <div class="empty-task">No tasks done</div>
                </div>
            </div>
       
    </div>
    `;
}