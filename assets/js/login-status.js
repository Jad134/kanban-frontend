const loginStatus = localStorage.getItem('login-status');


function checkLogInStatus() {
    if (loginStatus !== 'true' && window.location.pathname !== "/index.html") {
        window.location.href = "/index.html";
    }
}


function logOut() {
    localStorage.removeItem("login-status");
}


/* 
// funktioniert noch nicht. Evtl, weil side_menu.html ebenfalls als template dynamisch geladen wird?! 
   <div class="sidebar-menu" id="sidebar-menu" style="display: none;">
   
function checkLogInStatus() {
    if (loginStatus !== 'true' && window.location.pathname !== "/index.html") {
        window.location.href = "/index.html";
    } else {
        const sidebarMenu = document.getElementById('sidebar-menu');
        if (sidebarMenu) {
            sidebarMenu.style.display = 'block';
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    checkLogInStatus();
}); */
