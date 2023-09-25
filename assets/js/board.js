/*function openBoard() {
    document.getElementById('board').innerHTML = '';
}*/


let testTasks = [{
    "id": 0,
    "bucket": "in-progress",
    "title": "Kochwelt Page & Recipe Recommender",
    "description": "Build start page with recipe recommendation.",
    "assigned": ["Emanuel Mauer", "Marcel Bauer", "Anton Mayer"],
    "date": "20230510",
    "prio": "medium",
    "category": "User Story",
    "subtask": [
        {
            "id": 0,
            "title": "Implement Recipe Recommendation",
            "done": true
        },
        {
            "id": 1,
            "title": "Start Page Layout",
            "done": false
        }
    ]
},
{
    "id": 1,
    "bucket": "done",
    "title": "CSS Architecture Planning",
    "description": "Define CSS naming conventions and structure.",
    "assigned": ["Sofia Müller (You)", "Benedikt Ziegler"],
    "date": "20230902",
    "prio": "urgent",
    "category": "Technical Task",
    "subtask": [
        {
            "id": 0,
            "title": "Establish CSS Methodology",
            "done": true
        },
        {
            "id": 1,
            "title": "Setup Base Styles",
            "done": true
        },
        {
            "id": 2,
            "title": "Subtaks 3",
            "done": true
        }
    ]
}];


function loadTestTasks() {
    //document.getElementById('todo').innerHTML = '';
    if ( testTasks[1] ) {
        console.log('true');
    } else {
        console.log('false');
    }

    //loadTestData();
}


async function saveTestTasks() {
    await setItem('account', JSON.stringify(accounts));
}


/*
async function loadTestData() {
    testArray = [];
    try {
        testArray = JSON.parse(await getItem('tasks'));
    } catch (error) {
        console.error('Loading error:', error);
    }
}
*/