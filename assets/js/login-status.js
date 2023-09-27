const loginStatus = localStorage.getItem('login-status');


checkLogInStatus();


function checkLogInStatus() {
    if (loginStatus !== 'true' && window.location.pathname !== "/index.html") {
        window.location.href = "/index.html";
    }
}


function logOut() {
    localStorage.removeItem("login-status");
}