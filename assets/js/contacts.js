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
function sortMyContacts(){
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
      getLettersFromNames(contacts);
}
function getLettersFromNames(){
    let letters = [];

    for (let i = 0; i < contacts.length; i++) {
        const firstLetterString = contacts[i]['name'].charAt(0);
        for (const char of firstLetterString) {            
            letters.push(char);            
        }
    }
    eliminateDoubles(letters);
}
function eliminateDoubles(letters){
    let cleanLetters = new Set(letters)
    let letterArray = Array.from(cleanLetters);
    renderSortContainer(letterArray);
}
function renderSortContainer(letterArray){
    document.getElementById('render-contacts-overview').innerHTML = ``; 

    console.log(letterArray);
    
    for (let k = 0; k < letterArray.length; k++) {        
        const letter = letterArray[k];        
        
        document.getElementById('render-contacts-overview').innerHTML += /*html*/ `
        <div class="contact-block">
            <p id="" class="alphabet">${letter}</p>
            <div class="contact-seperator-horizontal"></div>            
        </div>
        `;
        for (let i = 0; i < contacts.length; i++) {
            let name = contacts[i]['name'];
            let email = contacts[i]['email'];
            if (name.charAt(0) === letter) {

            document.getElementById('render-contacts-overview').innerHTML += /*html*/ `
            <div class="sub-contact-block">
                <div class="first-letters"></div>
                <div id="name-and-email" class="name-and-email">
                    <p id="${k}-contact-name" class="contact-name">${name}</p>
                    <a id="${k}-contact-email" class="contact-email" href="">${email}</a>
                </div>
            </div>
            `;
            }
            
        }
    }
}
function renderContactsOverview(){
    let inputName = document.getElementById(``);
    let inputEmail = document.getElementById(``);
    
    for (let i = 0; i < contacts.length; i++) {
        

    }
}

function pushContactInfo(){
    let name = document.getElementById('contact-name-input');
    let email = document.getElementById('contact-email-input');
    let phoneNumber = document.getElementById('contact-phone-input');

    let newContact = {
        "name": `${name.value}`,
        "email": `${email.value}`,
        "phone": `${phoneNumber.value}`
    }

    contacts.push(newContact);

    name.value = ``;
    email.value = ``;
    phoneNumber.value = ``;

    closeContactAddCard();
    sortMyContacts();
}

function openContacts() {
    sortMyContacts();
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