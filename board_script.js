

function openBoard(){
    document.getElementById('board').innerHTML = /*html*/ `
    <div id="board-head">
        <h2>Board</h2>
        <div id="board-interaction">
            <div id="input-area">
                <input type="text" placeholder="Find Task">
                <img src="./assets/img/search.png" alt="lupe">
            </div>
            <div id="add-task">
                <p>Add task</p>
                <img src="./assets/img/add.png" alt="add">
            </div>
        </div>
    </div>
    <div id="board-content">
        <div>
            <div id="board-todo-section">
                <div id="todos"></div>
            </div>
        </div>
        <div id="board-in-progress-section">
            <div id="progresses"></div>
        </div>
        <div>
            <div id="board-await-feedback-section">
                <div id="feedbacks"></div>
            </div>
        </div>
        <div id="board-done-section">
            <div id="dones"></div>
        </div>
    </div>
    `;
}