let contacts = {
    'name': ['beispielname h', 'name h'],
    'email': ['beispiel@test.de', 'email'],
    'phone-number': ['beispiel', 'phone-number']
};

function renderContactsOverview(){
    document.getElementById('render-contacts-overview').innerHTML = ``;

    for (let i = 0; i < contacts['name'].length; i++) {
        let name = contacts['name'][i];
        let email = contacts['email'][i];
        let firstLetters = contacts['name'][i].charAt(0);

        let spaceIndex = name.indexOf(' ');
        if (spaceIndex !== -1 && spaceIndex < name.length - 1) {
            let firstLetterAfterSpace = name.charAt(spaceIndex + 1);

        document.getElementById('render-contacts-overview').innerHTML += /*html*/ `
            <div class="contact-block">
                <p class="alphabet">a-z</p>
                <div class="contact-seperator-horizontal"></div>
                <div class="sub-contact-block">
                    <div class="first-letters">${firstLetters} ${firstLetterAfterSpace}</div>
                    <div class="name-and-email">
                        <p id="name${i}" class="contact-name">${name}</p>
                        <a id="email${i}" class="contact-email" href="">${email}</a>
                    </div>
                </div>
            </div>
        `;
        }
    }
}

function pushContactInfo(){
    let name = document.getElementById('contact-name-input');
    let email = document.getElementById('contact-email-input');
    let phoneNumber = document.getElementById('contact-phone-input');

    contacts['name'].push(name.value);
    contacts['email'].push(email.value);
    contacts['phone-number'].push(phoneNumber.value);

    name.value = ``;
    email.value = ``;
    phoneNumber.value = ``;

    closeContactAddCard();
    renderContactsOverview();
}

function openContacts() {
    renderContactsOverview();
}

async function slideInCard(){
    await waitForIt();
    startAnimation();
}
async function waitForIt(){
    let slider = document.getElementById('slide-container');       
    let deactivateOverflow = document.body;
    
    slider.style.display = "flex";
    deactivateOverflow.classList.add('hide-my-scrolls');
}
async function startAnimation(){   
    let animation = document.getElementById('add-contact-card');
    animation.style.width = "100%";
    animation.style.right = "0%";
}
function closeContactAddCard(){
    let animation = document.getElementById('add-contact-card');
    let slider = document.getElementById('slide-container');
    let back = document.getElementById('color-my-back');
        
    animation.style.right = "-200%";
    slider.style.display = "none";
    setTimeout(() => {
        back.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
      }, 100);
    back.style.display = "none"
        
    animation.addEventListener('transitionend', function() {
        if (animation.style.right === "-200%") {
        let activateOverflow = document.body;
        let shrikDiv = document.getElementById('create-contact');
        activateOverflow.classList.remove('hide-my-scrolls');
        animation.style.width = "0%";
        shrikDiv.style.width = "0%";
        shrikDiv.style.display = "none";
        }
        })
}
async function renderAddContactCard() {
    await showMyCard();
    await colorMyBack();
    slideInCard();
}
async function showMyCard(){
    document.getElementById('add-contact-card').style.width = "100%";
    document.getElementById('create-contact').style.width = "100%";
    document.getElementById('create-contact').style.display = "flex";
}
async function colorMyBack(){
        const background = document.getElementById('color-my-back');
        background.style.display = 'block';
        setTimeout(() => {
          background.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
        }, 100);
}