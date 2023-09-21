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
    addContact();
}

function addContact() {
    document.getElementById('add-contact-card').innerHTML = /*html */ `
    <div id="create-contact">

        <div id="design-sector">
            <img src="./assets/img/logo4SideBar.svg" alt="join logo">
            <h2>Add contact</h2>
            <p>Tasks are better with a team!</p>
            <div id="horizon-seperator"></div>    
        </div>

        <div id="fill-in-sector">
            <div id="move-img">
                <div class="cancel-svg">
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="change-cancel-svg-color-head" d="M12.2496 11.9998L17.4926 17.2428M7.00659 17.2428L12.2496 11.9998L7.00659 17.2428ZM17.4926 6.75684L12.2486 11.9998L17.4926 6.75684ZM12.2486 
                        11.9998L7.00659 6.75684L12.2486 11.9998Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <div id="img-and-inputs">
                <div id="put-the-img">
                    <img id="img-big-person" src="./assets/img/person.svg" alt="">
                </div>
                <div>
                    <div id="input-fields">
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
                    </div>
            
                    <div id="cancel-and-create-contact-btns">
                        <div id="cancel-contact-btn">
                            <p>Cancel</p>
                            <div class="cancel-create-img">
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path id="change-cancel-svg-color-btn" d="M12.2496 11.9998L17.4926 17.2428M7.00659 17.2428L12.2496 11.9998L7.00659 17.2428ZM17.4926 6.75684L12.2486 11.9998L17.4926 6.75684ZM12.2486 
                                        11.9998L7.00659 6.75684L12.2486 11.9998Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <div id="create-contact-btn">
                            <p>Create Task</p>
                            <img class="cancel-create-img" src="./assets/img/check.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>


        </div>

    </div>

    `;
}