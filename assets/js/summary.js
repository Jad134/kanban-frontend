function initSummary() {
    renderGreeting();
    renderGreetingName();
}


function renderGreeting() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let greeting;

    if (hours < 12) {
        greeting = 'Guten Morgen,';
    } else if (hours < 18) {
        greeting = 'Guten Tag,';
    } else {
        greeting = 'Guten Abend,';
    }

    document.getElementById('greeting-daytime').innerHTML = greeting;
}


function renderGreetingName() {
    let greetingName = localStorage.getItem('login-name');
    document.getElementById('greeting-name').innerHTML = greetingName;
}