let contacts = [
  {
    "name": "Tobi Mayer",
    "email": "tobimayer@test.de",
    "phone-number": 111111111111
  },
  {
    "name": "Clara Müller",
    "email": "claramüller@test.de",
    "phone-number": 2222222222222
  },
  {
    "name": "Hans Peter",
    "email": "hanspeter@test.de",
    "phone-number": 3333333333333
  },
  {
    "name": "Sabine Berg",
    "email": "sabineberg@test.de",
    "phone-number": 4444444444
  },
  {
    "name": "Charly Fiedler",
    "email": "charlyfiedler@test.de",
    "phone-number": 55555555555
  },
];

function openContacts() {
  sortMyContacts();
}
function sortMyContacts() {
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
function getLettersFromNames() {
  let letters = [];

  for (let i = 0; i < contacts.length; i++) {
    const firstLetterString = contacts[i]["name"].charAt(0);
    for (const char of firstLetterString) {
      letters.push(char);
    }
  }
  eliminateDoubles(letters);
}
function eliminateDoubles(letters) {
  let cleanLetters = new Set(letters);
  let letterArray = Array.from(cleanLetters);
  renderSortContainer(letterArray);
}
function getFirstLettersForOverview(i, contacts) {
  let name = contacts[i]["name"];
  let splitName = name.split(" ");
  let firstName = splitName[0];
  let secondName = splitName[1];
  let thirdName = splitName[2];
  let firstLetter = firstName.charAt(0);
  let secondLetter = secondName.charAt(0);

  if (thirdName !== undefined) {
    let secondLetter = thirdName.charAt(0);
    return [firstLetter + " " + secondLetter];
  } else return [firstLetter + " " + secondLetter];
}
function renderSortContainer(letterArray) {
  document.getElementById("render-contacts-overview").innerHTML = ``;

  for (let k = 0; k < letterArray.length; k++) {
    const letter = letterArray[k];

    document.getElementById("render-contacts-overview").innerHTML += /*html*/ `
        <div class="contact-block">
            <p id="" class="alphabet">${letter}</p>
            <div class="contact-seperator-horizontal"></div>            
        </div>
        `;
    for (let i = 0; i < contacts.length; i++) {
      let name = contacts[i]["name"];
      let email = contacts[i]["email"];
      let setLetters = getFirstLettersForOverview(i, contacts);

      if (name.charAt(0) === letter) {
        document.getElementById(
          "render-contacts-overview"
        ).innerHTML += /*html*/ `
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
function markMyContact(i) {
  let excludeElement = document.getElementById(`${i}sub-contact-block`);
  deMarkMyContact();
  excludeElement.classList.add("sub-contact-block-marked");
  excludeElement.classList.remove("sub-contact-block");
}
function deMarkMyContact() {
  let container = document.getElementById("render-contacts-overview");
  let elements = container.querySelectorAll(".sub-contact-block-marked");

  elements.forEach((element) => {
    element.classList.remove("sub-contact-block-marked");
    element.classList.add("sub-contact-block");
  });
}
async function hideEditCard(){
  let hideEditCard = document.getElementById('edit-card');
  let overview = document.getElementById('render-my-edit-card');

  hideEditCard.classList.add('hide-edit-card');
  
  hideEditCard.addEventListener('animationend', () => {
    let deactivateOverflow = document.body;
    overview.removeChild(hideEditCard);
    deactivateOverflow.classList.remove("hide-my-scrolls");
  }, { once: true })
}
function editContact(i) {
  let editCard = document.getElementById('render-my-edit-card');
  let setLetters = getFirstLettersForOverview(i, contacts);
  let editContact = contacts[i];
  let deactivateOverflow = document.body;
  let editName = editContact['name'];
  let editPhone = editContact['phone-number'];
  let editEmail = editContact['email'];

  deactivateOverflow.classList.add("hide-my-scrolls");

  editCard.innerHTML += /*html*/ `
    <div id="edit-card" class="edit-card">
      <div class="left-side-edit-card">
        <svg style="background-color: #2A3647; margin-bottom: 24px;" width="102" height="122" viewBox="0 0 102 122" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M72.655 0H50.4972V25.4923H72.655V0Z" fill="white"/>
          <path d="M50.4971 46.2251H72.655V82.1779C72.7562 90.8292 70.2941 99.3153 65.5815 106.557C60.9284 113.594 51.9459 121.966 35.3275 121.966C17.2263 121.966 6.67577 113.406 0.98291 108.715L14.9594 91.4743C20.5159 96.0112 25.8679 99.7435 35.4128 99.7435C42.6396 99.7435 45.5202 96.7988 47.2076 94.2307C49.5015 90.6637 50.6881 86.4923 50.6165 82.2464L50.4971 46.2251Z" fill="white"/>
          <path d="M39.1967 30.1318H17.0388V52.3884H39.1967V30.1318Z" fill="#29ABE2"/>
          <path d="M84.2622 111.522C84.2622 116.265 81.859 118.815 78.5012 118.815C75.1434 118.815 72.9447 115.785 72.9447 111.762C72.9447 107.739 75.2116 104.554 78.6887 104.554C82.1658 104.554 84.2622 107.687 84.2622 111.522ZM75.5184 111.711C75.5184 114.57 76.6604 116.675 78.6205 116.675C80.5806 116.675 81.6885 114.45 81.6885 111.539C81.6885 108.988 80.6659 106.592 78.6205 106.592C76.5752 106.592 75.5184 108.903 75.5184 111.711Z" fill="white"/>
          <path d="M88.6597 104.76V118.593H86.2053V104.76H88.6597Z" fill="white"/>
          <path d="M91.3187 118.593V104.76H94.0458L96.9775 110.461C97.7322 111.952 98.4036 113.483 98.9887 115.049C98.8353 113.337 98.7672 111.368 98.7672 109.177V104.76H101.017V118.593H98.4774L95.5117 112.772C94.7265 111.243 94.0266 109.671 93.4152 108.064C93.4152 109.776 93.5345 111.711 93.5345 114.09V118.576L91.3187 118.593Z" fill="white"/>
        </svg>
        <h2>Edit contact</h2>
        <div class="seperator"></div>
      </div>
      <div class="right-side-edit-card">
        <div class="move-img">
          <svg onclick="hideEditCard()" class="cancel-svg" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="change-cancel-svg-color-head" d="M12.2496 11.9998L17.4926 17.2428M7.00659 17.2428L12.2496 11.9998L7.00659 17.2428ZM17.4926 6.75684L12.2486 11.9998L17.4926 6.75684ZM12.2486 
                11.9998L7.00659 6.75684L12.2486 11.9998Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div class="first-letters-and-inputs">
          <div class="first-letters-in-edit">${setLetters}</div>
          <div class="edit-informations">
            <form onsubmit="return submitForm(i)" class="information-inputs">
              <input id="name${i}" type="text" placeholder="Name" value='${editName}' required>
              <input id="email${i}" type="email" placeholder="E-Mail" value='${editEmail}'>
              <input id="phone${i}" type="tel" placeholder="Phone" value='${editPhone}'>
              <div class="dele-and-save-buttons">
                <button onclick="deleteContact(${i})" type="button">delete</button>
                <button onsubmit="saveEditContact(${i})" type="submit">save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
}
function submitForm(i){
  if (validateForm(i)) {
    saveEditContact(i); // Rufe getValues() auf, wenn die Validierung erfolgreich ist
    return true; // Das Formular wird abgesendet
  } else {
    return false; // Das Formular wird nicht abgesendet, wenn die Validierung fehlschlägt
  }
}
function validateForm(){
  let nameInput = document.getElementById(`name${i}`);
  let emailInput = document.getElementById(`email${i}`);
  let phoneInput = document.getElementById(`phone${i}`);

    
    if (nameInput.type !== 'text' || emailInput.type !== 'email' || phoneInput.type !== 'tel') {
        alert('Die Felder haben nicht den richtigen Typ!');
      return false;
    } return true ;
}
async function saveEditContact(i){
  let editContact = contacts[i];

  let editedName = document.getElementById(`name${i}`).value;
  let editedPhone = document.getElementById(`phone${i}`).value;
  let editedEmail = document.getElementById(`email${i}`).value;

  editContact.name = editedName;
  editContact.email = editedEmail;
  editContact["phone-number"] = editedPhone;
  await hideEditCard(i);
  openContacts();
  openContactDetails(i);
}
function deleteContact(i) {
  let contactDetails = document.getElementById("detail-view-of-contacts");
  contacts.splice([i], 1);
  contactDetails.innerHTML = "";
  if (document.getElementById('edit-card')) {
    hideEditCard(i);    
  }
  openContacts();
  openContactDetails(i);
}
function openContactDetails(i) {
  markMyContact(i);
  let details = document.getElementById("detail-view-of-contacts");
  let lettersOfContact = document.getElementById(`${i}first-letters`).innerHTML;
  let name = contacts[i]["name"];
  let email = contacts[i]["email"];
  let phone = contacts[i]["phone-number"];

  details.innerHTML = ``;
  details.innerHTML = /*html*/ `
        <div id="letters-and-name">
            <div class="first-letters-for-details">
                ${lettersOfContact}
            </div>
            <div id="main-name">
                <h2>${name}</h2>
                <div class="edit-and-delete">
                    <div id="edit-contact" onclick="editContact(${i})">
                    <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="change-edit-btn" d="M3.0612 22.1418H4.92787L16.4279 10.6418L14.5612 8.7751L3.0612 20.2751V22.1418ZM22.1279 8.70843L16.4612 3.10843L18.3279 1.24176C18.839 0.730653 19.4668 0.475098 20.2112 0.475098C20.9556 0.475098 21.5834 0.730653 22.0945 1.24176L23.9612 3.10843C24.4723 3.61954 24.739 4.23621 24.7612 4.95843C24.7834 5.68065 24.539 6.29732 24.0279 6.80843L22.1279 8.70843ZM20.1945 10.6751L6.0612 24.8084H0.394531V19.1418L14.5279 5.00843L20.1945 10.6751Z" fill="black"/>
                    </svg>
                        <p>Edit</p>
                    </div>
                    <div id="delete-contact" onclick="deleteContact(${i})">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask  ask id="mask0_89435_4124" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_89435_4124)">
                        <path id="change-delete-btn" d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
                        </g>
                    </svg>
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
                    <a class="contact-email" href="">${email}</a>
                </div>
            </div>
            <div>
                <h3>Phone</h3>
                <div>${phone}</div>
            </div>
        </div>
    `;
}
async function formatNames() {
  let formatMyName = document.getElementById("contact-name-input").value;
  let splitedName = formatMyName.split(" ");

  for (let k = 0; k < splitedName.length; k++) {
    const name = splitedName[k];
    if (name.length > 0) {
      splitedName[k] = name.charAt(0).toUpperCase() + name.slice(1);
      newString = splitedName.join(" ");
    }
  }
  return newString;
}
async function pushContactInfo() {
  let name = await formatNames();
  let email = document.getElementById("contact-email-input");
  let phoneNumber = document.getElementById("contact-phone-input");
  let newContact = {
    name: `${name}`,
    email: `${email.value}`,
    "phone-number": `${phoneNumber.value}`,
  };
  contacts.push(newContact);
  document.getElementById("contact-name-input").value = ``;
  email.value = ``;
  phoneNumber.value = ``;

  closeContactAddCard();
  sortMyContacts();
}
async function slideInCard() {
  await waitForIt();
  startAnimation();
}
async function waitForIt() {
  let slider = document.getElementById("slide-container");
  let deactivateOverflow = document.body;

  slider.style.display = "flex";
  deactivateOverflow.classList.add("hide-my-scrolls");
}
async function startAnimation() {
  let animation = document.getElementById("add-contact-card");
  animation.style.width = "100%";
  animation.style.right = "0%";
}
function closeContactAddCard() {
  let animation = document.getElementById("add-contact-card");
  let slider = document.getElementById("slide-container");
  let back = document.getElementById("color-my-back");

  animation.style.right = "-200%";
  slider.style.display = "none";
  setTimeout(() => {
    back.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
  }, 100);
  back.style.display = "none";

  animation.addEventListener("transitionend", function () {
    if (animation.style.right === "-200%") {
      let activateOverflow = document.body;
      let shrikDiv = document.getElementById("create-contact");
      activateOverflow.classList.remove("hide-my-scrolls");
      animation.style.width = "0%";
      shrikDiv.style.width = "0%";
      shrikDiv.style.display = "none";
    }
  });
}
async function renderAddContactCard() {
  await showMyCard();
  await colorMyBack();
  slideInCard();
}
async function showMyCard() {
  document.getElementById("add-contact-card").style.width = "100%";
  document.getElementById("create-contact").style.width = "100%";
  document.getElementById("create-contact").style.display = "flex";
}
async function colorMyBack() {
  const background = document.getElementById("color-my-back");
  background.style.display = "block";
  setTimeout(() => {
    background.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
  }, 100);
}
