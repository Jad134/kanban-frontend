let loginStatus = localStorage.getItem('login-status');


/**
 * Checks the login status and performs UI modifications based on the status and current URL path.
 */
function checkLogInStatus() {
    if (loginStatus !== 'true' && (window.location.pathname == "/privacy-policy.html" || window.location.pathname === "/legal-notice.html")) {
        let sidebar = document.querySelector('.sidebar');
        let informationContainer = document.querySelector('.information-container');
        let sidebarMenu = document.querySelector('.sidebar-menu');
        let rightSideHeader = document.querySelector('.rightside-header');
        if (sidebarMenu) {
            sidebarMenu.style.display = 'none';
        }
        if (rightSideHeader) {
            rightSideHeader.style.display = 'none';
        }
        if (window.innerWidth < 992) {
            sidebar.style.display = 'none';
            informationContainer.style.padding = '0 24px 24px 24px';
        }
    } else if (loginStatus !== 'true' && window.location.pathname !== "/index.html") {
        window.location.href = "/index.html";
    }
}


/**
 * Logs the user out by removing the login status from local storage.
 */
function logOut() {
    localStorage.removeItem("login-status");
}