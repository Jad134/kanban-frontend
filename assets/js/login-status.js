let loginStatus = localStorage.getItem('login-status');


function checkLogInStatus() {
    if (loginStatus !== 'true' && (window.location.pathname == "/privacy-policy.html" || window.location.pathname === "/legal-notice.html")) {
        let sidebarMenu = document.querySelector('.sidebar-menu');
        let rightSideHeader = document.querySelector('.rightside-header');
        if (sidebarMenu) {
            sidebarMenu.style.display = 'none';
        }
        if (rightSideHeader) {
            rightSideHeader.style.display = 'none';
        }
    } else if (loginStatus !== 'true' && window.location.pathname !== "/index.html") {
        window.location.href = "/index.html";
    }
}


function logOut() {
    localStorage.removeItem("login-status");
}