let testTasks = [{}];


async function loadTestTasks() {
    testTasks = [];
    let testTask = await getItem('test');
    testTask = JSON.parse(testTask['data']['value']);

    for (let i = 0; i < testTask.length; i++) {
        let loadedTask = testTask[i];
        testTasks.push(loadedTask);
    }

    loadTestTaskInformation();
}


function loadTestTaskInformation() {
    for (let i = 0; i < testTasks.length; i++) {

        let id = testTasks[i]['id'];
        let bucket = testTasks[i]['bucket'];
        let title = testTasks[i]['title'];
        let description = testTasks[i]['description'];
        let assigned = testTasks[i]['assigned'];
        let duedate = testTasks[i]['duedate'];
        let prio = testTasks[i]['prio'];
        let category = testTasks[i]['category'];
        let subtask = testTasks[i]['subtask'];

        renderTestTasks(id, bucket, title, description, assigned, duedate, prio, category, subtask);
    }
}


function renderTestTasks(id, bucket, title, description, assigned, duedate, prio, category, subtask) {
    if (bucket = 'todo') {
        console.log(bucket, ':', title);
        //renderTodo(id, bucket, title, description, assigned, duedate, prio, category, subtask);
    }
    if (bucket = 'in-progress') {
        console.log(bucket, ':', title);
        //renderTodo(id, bucket, title, description, assigned, duedate, prio, category, subtask);
    }
    if (bucket = 'await-feedback') {
        console.log(bucket, ':', title);
        //renderTodo(id, bucket, title, description, assigned, duedate, prio, category, subtask);
    }
    if (bucket = 'done') {
        console.log(bucket, ':', title);
        //renderTodo(id, bucket, title, description, assigned, duedate, prio, category, subtask);
    }
}


async function addTestTask() {
    //let taskCounter;
    let addTestTask = {
        "id": 2,            // sollte durch einen Zähler ermittelt werden
        "bucket": "done",
        "title": "HTML Base Template Creation",
        "description": "Create reusable HTML base templates...",
        "assigned": ["Benedikt Ziegler"],
        "duedate": "20231007",
        "prio": "low",
        "category": "Technical Task",
        "subtask": []
    };
    testTasks.push(addTestTask);
}


async function saveTestTasks() {
    await setItem('test', JSON.stringify(testTasks));
}


// TESTDATA

/*
let testTasks = [{
    "id": 0,
    "bucket": "in-progress",
    "title": "Kochwelt Page & Recipe Recommender",
    "description": "Build start page with recipe recommendation.",
    "assigned": ["Emanuel Mauer", "Marcel Bauer", "Anton Mayer"],
    "duedate": "20230510",
    "prio": "medium",
    "category": "User Story",
    "subtask": [
        {
            "subid": 0,
            "subtitle": "Implement Recipe Recommendation",
            "subdone": true
        },
        {
            "subid": 1,
            "subtitle": "Start Page Layout",
            "subdone": false
        }
    ]
},
{
    "id": 1,
    "bucket": "done",
    "title": "CSS Architecture Planning",
    "description": "Define CSS naming conventions and structure.",
    "assigned": ["Sofia Müller (You)", "Benedikt Ziegler"],
    "duedate": "20230902",
    "prio": "urgent",
    "category": "Technical Task",
    "subtask": [
        {
            "subid": 0,
            "title": "Establish CSS Methodology",
            "done": true
        },
        {
            "subid": 1,
            "title": "Setup Base Styles",
            "done": true
        },
        {
            "subid": 2,
            "subtitle": "Subtaks 3",
            "subdone": false
        }
    ]
}];
*/