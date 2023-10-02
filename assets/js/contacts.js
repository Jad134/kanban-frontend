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
        'email': 'sabineberg@test.de',
        'phone-number': 4444444444
    },
    {
        'name': 'Charly Fiedler',
        'email': 'charlyfiedler@test.de',
        'phone-number': 55555555555
    }
];
let letters = [];

function openContacts() {
    sortMyContacts();
}
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
function getFirstLettersForOverview(i, contacts){
    let name = contacts[i]['name'];
    let splitName = name.split(' ');
    let firstName = splitName[0];
    let secondName = splitName[1];
    let thirdName = splitName[2];
    let firstLetter = firstName.charAt(0);
    let secondLetter = secondName.charAt(0);

    if (thirdName !== undefined) {
            let secondLetter = thirdName.charAt(0);
            return  [firstLetter + ' ' + secondLetter];
    } else return [firstLetter + ' ' + secondLetter];
}
function renderSortContainer(letterArray){
    document.getElementById('render-contacts-overview').innerHTML = ``;
        
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
            let setLetters = getFirstLettersForOverview(i, contacts);
                        
            if (name.charAt(0) === letter) {                    
                document.getElementById('render-contacts-overview').innerHTML += /*html*/ `
                <div id="${i}sub-contact-block" class="sub-contact-block" onclick="openContactDetails(${i})">
                    <div id="${i}first-letters" class="first-letters">${setLetters}</div>
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
function markMyContact(i){
    let excludeElement = document.getElementById(`${i}sub-contact-block`);
    deMarkMyContact();
    excludeElement.classList.add('sub-contact-block-marked');

}
function deMarkMyContact(){    
    let container = document.getElementById('render-contacts-overview');
    let elements = container.querySelectorAll('.sub-contact-block-marked');

    elements.forEach((element) => {
        element.classList.remove('sub-contact-block-marked');
    })
}
function openContactDetails(i) {
    markMyContact(i);
    let details = document.getElementById('detail-view-of-contacts');    
    let lettersOfContact = document.getElementById(`${i}first-letters`).innerHTML;
    let name = contacts[i]['name'];
    let email = contacts[i]['email'];
    let phone = contacts[i]['phone-number'];
    
    details.innerHTML = ``;
    details.innerHTML = /*html*/ `
        <div id="letters-and-name">
            <div class="first-letters-for-details">
                ${lettersOfContact}
            </div>
            <div id="main-name">
                <h2>${name}</h2>
                <div class="edit-and-delete">
                    <div id="edit-contact">
                        <img src="./assets/img/edit.svg" alt="">
                        <p>Edit</p>
                    </div>
                    <div id="delete-contact">
                        <img src="./assets/img/delete.svg" alt="">
                        <p>Delete</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="contact-information">
            <p>Contact Information</p>
            <div>
                <h3>Email</h3>
                <div>
                    <a>${email}</a>
                </div>
            </div>
            <div>
                <h3>Phone</h3>
                <div>${phone}</div>
            </div>
        </div>
    `;
}
async function formatNames(){
    let formatMyName = document.getElementById('contact-name-input').value;
    let splitedName = formatMyName.split(' ');
        
    for (let k = 0; k < splitedName.length; k++) {
        const name = splitedName[k];
        if (name.length > 0) {
            splitedName[k] = name.charAt(0).toUpperCase() + name.slice(1);
            newString = splitedName.join(' ');
        }
    }
    return newString;
}
async function pushContactInfo(){
    let name = await formatNames();
    let email = document.getElementById('contact-email-input');
    let phoneNumber = document.getElementById('contact-phone-input');
    let newContact = {
        "name": `${name}`,
        "email": `${email.value}`,
        "phone-number": `${phoneNumber.value}`
    }
    contacts.push(newContact);
    document.getElementById('contact-name-input').value = ``;
    email.value = ``;
    phoneNumber.value = ``;

    closeContactAddCard();
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