function ChangeButtonColor(buttonId) {
    let button = document.getElementById(buttonId);
    let urgentBtn = document.getElementById('urgent-btn');
    let mediumBtn = document.getElementById('medium-btn')
    let lowBtn = document.getElementById('low-btn');

    // Überprüfen, ob die Button-Klasse 'active' hat
    if (button.classList.contains('active')) {
        // Wenn der Button die Klasse 'active' hat, entfernen Sie sie, um die Farbe zurückzusetzen
        button.classList.remove('active');
        
    } else {
        // Andernfalls fügen Sie die Klasse 'active' hinzu, um die Farbe zu ändern
        button.classList.add('active');
        
    }

    if (urgentBtn.classList.contains('active')){
        mediumBtn.classList.remove('active');
        lowBtn.classList.remove('active')
    }
    if (mediumBtn.classList.contains('active')){
        urgentBtn.classList.remove('active');
        lowBtn.classList.remove('active')
    }

   

}