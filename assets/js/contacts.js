let contacts = [];

function openContacts() {
    document.getElementById('contacts').innerHTML = /*html*/ `
        <div id="contact-overview">
            <div id="add-new-contact" onclick="addContact()">
                <p>Add new contact</p>
                <img src="./assets/img/person_add.png" alt="">
            </div>
            <div id="render-contacts-ovewrview">hier werden die kontakte hineingerendert</div>
        </div>
        <div id="details-of-contacts">
            <div id="welcome-to-contacts">
                <h1>Contacts</h1>
                <div id="contact-seperator"></div>
                <div iod="contact-slogan">Better with a team</div>
            </div>
            <div id="detail-view-of-contacts">detailansicht ausgewählter kontakte</div>
        </div>
    
    `;
}

function addContact() {
    document.getElementById('detail-view-of-contacts').innerHTML = /*html */ `
        <div id="contact-name" class="contact-input-area">
            <input required type="text" placeholder="Name" id="contact-name-input">
            <img src="./assets/img/person.png" alt="Name" onclick="pushContactInfo()">
        </div>
        <div id="contact-email" class="contact-input-area">
            <input required type="email" placeholder="E-Mail" id="contact-email-input">
            <img src="./assets/img/mail.png" alt="E-Mail" onclick="pushContactInfo()">
        </div>
        <div id="contact-phone" class="contact-input-area">
            <input type="tel" placeholder="Phone" id="contact-phone-input">
            <img src="./assets/img/call.png" alt="Phone" onclick="pushContactInfo()">
        </div>
    `;
}
function pushContactInfo(){
    let name = document.getElementById('contact-name-input').value;
    let email = document.getElementById('contact-email-input').value;
    let phone = document.getElementById('contact-phone-input').value;

    let infos = {
        'name': name,
        'email': email,
        'phone': phone
    };

    contacts.push(infos);
    console.log(infos);

    let contactsAsString = JSON.stringify(contacts);
    localStorage.setItem('contacts', contactsAsString);

    document.getElementById('contact-name-input').value = ``;
    document.getElementById('contact-email-input').value = ``;
    document.getElementById('contact-phone-input').value = ``;

}
function loadContacts(){
    let contactsAsString = localStorage.getItem('contacts');
    contacts = JSON.parse(contactsAsString);
    console.log(contacts);
    if (contacts !== null) {
    renderContactsInOverview(contacts);
    }
}
function renderContactsInOverview(contacts){
    let contactsInOverview = document.getElementById('render-contacts-ovewrview');
        
    for (let i = 0; i < contacts.length; i++) {
        let name = contacts[i]['name'];
        let email = contacts[i]['email'];
        let phone = contacts[i]['phone'];
        
        contactsInOverview.innerHTML += /*html*/ `
        <div>${name}</div>
        <div>${email}</div>
        <div>${phone}</div>
        `;
    }

}