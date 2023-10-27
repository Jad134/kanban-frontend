const loginStatus = localStorage.getItem('login-status');

checkLogInStatus();
/* hideAndShowSidebar(); */


// before
/* function checkLogInStatus() {
    if (loginStatus !== 'true' && window.location.pathname !== "/index.html") {
        window.location.href = "/index.html";
    }
} */

function checkLogInStatus() {
    const exemptedPages = ["/privacy-policy.html", "/legal-notice.html"];
    const currentPage = window.location.pathname;
    if (loginStatus !== 'true' && !exemptedPages.includes(currentPage)) {
        window.location.href = "/index.html";
    }
}

// not working nowhere
/*  function hideAndShowSidebar() {
    let sidebar = document.getElementById('sidebar-menu');
    if (loginStatus !== 'true') {
        sidebar = classList.add('d-none');
    } else {
        sidebar = classList.remove('d-none');
    }
  }  */


function logOut() {
    localStorage.removeItem("login-status");
}
