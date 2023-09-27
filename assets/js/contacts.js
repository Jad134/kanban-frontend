let contacts = [

    {
        'name': 'Tobi Mayer',
        'email': 'tobimayer@test.de',
        'phone-number': [111111111111]
    },
    {
        'name': 'Clara Müller',
        'email': 'claramüller@test.de',
        'phone-number': 2222222222222
    },
    {
        'name': 'Hans Peter',
        'email': 'hanspeter@test.de',
        'phone-number': 3333333333333
    },
    {
        'name': 'Sabine Berg',
        'email': 'sabineberg.de',
        'phone-number': 4444444444
    },
    {
        'name': 'Charly Fiedler',
        'email': 'charlyfiedler@test.de',
        'phone-number': 55555555555
    }
];

function renderContactsOverview(){
    document.getElementById('render-contacts-overview').innerHTML = ``;

    contacts.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
      
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

    for (let i = 0; i < contacts.length; i++) {
        let name = contacts[i]['name'];
        let email = contacts[i]['email'];
        let firstLetters = contacts[i]['name'][0].charAt(0);

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