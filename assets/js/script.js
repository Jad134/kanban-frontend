function init(){
    const main = document.querySelector('.main-container');
    main.style.opacity = "0";
}

document.addEventListener("DOMContentLoaded", function () {
    const logo = document.getElementById('logo');
    const main = document.querySelector('.main-container')
    
    setTimeout(() => {
        logo.style.position = "absolute";
        logo.style.top = "130px";
        logo.style.left = "130px";
        logo.style.transform = "translate(-50%, -50%) scale(0.5)";
        logo.style.transition = "0.7s ease-out";

        main.style.transition = "opacity 0.7s ease-in";
        main.style.opacity = "1";
    }, 500);
});