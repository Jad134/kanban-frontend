/**
 * Includes HTML content within designated elements marked with the 'w3-include-html' attribute. 
 * Checks and fetches content based on the provided attribute. 
 * If the fetch is successful, it updates the element with the fetched content. 
 * If the fetch fails, it updates the element with an error message ('Page not found'). 
 * Initiates additional functions to check login status, path, and render user initials.
 * @returns {Promise<void>} - No direct return value but dynamically updates HTML content within specified elements.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    checkLogInStatus();
    checkPath();
    renderInitials();
}


/**
 * Checks the current path and activates the corresponding menu link if it matches specific page URLs.
 */
function checkPath() {
    let currentPath = window.location.pathname;

    if (currentPath === '/summary.html' || currentPath === '/add-task.html' || currentPath === '/board.html' || currentPath === '/contacts.html') {
        activeMenuLink();
    }
}


/**
 * Activates the menu link that corresponds to the current page.
 */
function activeMenuLink() {
    let urlAsId = window.location.pathname.split('/').pop().split('.html')[0] + '-link';
    document.getElementById(urlAsId).classList.add('sidebar-menu-link-active');
}


/**
 * Opens the user menu by removing display-none from its container and background elements.
 */
function openUserMenu() {
    document.getElementById('user-menu-container').classList.remove('display-none');
    document.getElementById('user-menu-bg').classList.remove('display-none');
}


/**
 * Closes the user menu by adding display-none to its container and background elements.
 */
function closeUserMenu() {
    document.getElementById('user-menu-container').classList.add('display-none');
    document.getElementById('user-menu-bg').classList.add('display-none');
}


/**
 * Renders the user's initials in the designated element based on stored data in localStorage.
 */
function renderInitials() {
    // let userInitials = localStorage.getItem('login-initials');
    
    let userInitials = localStorage.getItem('login-initials');
    document.getElementById('user-initials').innerHTML = userInitials;
}