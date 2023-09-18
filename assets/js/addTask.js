function ChangeButtonColor(buttonId) {
    let button = document.getElementById(buttonId);
   
    let buttons = document.querySelectorAll('.prio-buttons button');
    buttons.forEach(function(btn) {
        btn.classList.remove('active');
    });

    
    // Fügen Sie die "active" Klasse nur zum ausgewählten Button hinzu
    button.classList.add('active');
}