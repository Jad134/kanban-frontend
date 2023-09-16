function openContacts() {
    document.getElementById('contacts').innerHTML = /*html*/ `
        <div id="contact-overview">
            <div id="add-new-contact">
                <p>Add new contact</p>
                <img src="./assets/img/person_add.png" alt="">
            </div>
            <div>hier werden die kontakte hineingerendert</div>
        </div>
        <div id="welcome-to-contacts">
            <h1>Contacts</h1>
            <div id="contact-seperator"></div>
            <div iod="contact-slogan">Better with a team</div>
        </div>
    
    `;
}