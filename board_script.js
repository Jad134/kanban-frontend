

function openBoard(){
    document.getElementById('board') = /*html*/ `
    <div id="board-head-bar">
        <h2>Board</h2>
        <div>
            <div>
                <input type="text">
                <img src="" alt="lupe">
            </div>
            <div>
                <p>Add task</p>
                <img src="" alt="add">
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