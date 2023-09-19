function ChangeButtonColor(buttonId, imgId) {
    let button = document.getElementById(buttonId);
    let img = document.getElementById(imgId)

    let buttons = document.querySelectorAll('.prio-buttons button');
    buttons.forEach(function (btn,) {
        btn.classList.remove('active');
        
    });

    let images = document.querySelectorAll('.prio-buttons button img');
    images.forEach(function (imag,) {
        imag.classList.remove('active');
        
    });


    // Fügen Sie die "active" Klasse nur zum ausgewählten Button hinzu
    button.classList.add('active');
    img.classList.add('active')


}