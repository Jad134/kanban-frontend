function openSlider() {
    document.getElementById('slider-container').classList.remove('slide-to-right');
    document.getElementById('slider-bg').classList.remove('fadeOut');
    document.getElementById('screen-center').classList.add('screen-center');
    document.getElementById('slider-bg').classList.add('slider-bg');
    document.getElementById('screen-center').classList.remove('d-none');
    document.getElementById('slider-bg').classList.remove('d-none');
    document.getElementById('slider-container').classList.add('slider-container');
    document.getElementById('slider-bg').classList.add('fadeIn');
    document.getElementById('slider-container').classList.add('slide-from-right');
    document.getElementById('slider-container').classList.remove('d-none');
}


function closeSlider() {
    document.getElementById('slider-container').classList.remove('slide-from-right');
    document.getElementById('slider-bg').classList.remove('fadeIn');
    document.getElementById('slider-container').classList.add('slide-to-right');
    document.getElementById('slider-bg').classList.add('fadeOut');
    setTimeout(function () {
        document.getElementById('slider-container').classList.add('d-none');
        document.getElementById('slider-container').classList.remove('slider-container');
    }, 120);
    setTimeout(function () {
        document.getElementById('slider-bg').classList.add('d-none');
        document.getElementById('slider-bg').classList.remove('slider-bg');
        document.getElementById('screen-center').classList.add('d-none');
        document.getElementById('screen-center').classList.remove('screen-center');
    }, 200);
}