async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    if (window.location.pathname == 'summary.html' || 'add-task.html' || 'board.html' || 'contacts.html' ) {
        activeMenuLink();
    }
}


function activeMenuLink() {
    let urlAsId = window.location.pathname.split('/').pop().split('.html')[0] + '-link';
    console.log(urlAsId);
    document.getElementById(urlAsId).classList.add('sidebar-menu-link-active');
}


function openUserMenu() {
    document.getElementById('user-menu-container').classList.remove('display-none');
    document.getElementById('user-menu-bg').classList.remove('display-none');
}


function closeUserMenu() {
    document.getElementById('user-menu-container').classList.add('display-none');
    document.getElementById('user-menu-bg').classList.add('display-none');
}