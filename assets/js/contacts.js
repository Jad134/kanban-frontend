let contacts = [];


async function openContacts() {
  contacts = await getItemsInRemoteStorage();
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
  let firstLetter = firstName.charAt(0);  

  if (secondName !== undefined) {
    let secondLetter = secondName.charAt(0);
    return [firstLetter + " " + secondLetter];
  } else return [firstLetter];
}


async function renderSortContainer(letterArray) {
  document.getElementById("render-contacts-overview").innerHTML = ``;

  for (let k = 0; k < letterArray.length; k++) {
    const letter = letterArray[k];

    document.getElementById("render-contacts-overview").innerHTML += /*html*/ `
        <div class="contact-block">
            <p class="alphabet">${letter}</p>
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
                    <div class="name-and-email">
                        <p id="${k}-contact-name" class="contact-name">${name}</p>
                        <a id="${k}-contact-email" class="contact-email" href="mailto:${email}">${email}</a>
                    </div>
                </div>
            `;
      setColorForLetters(i);
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
  let backgroundColor = document.getElementById('color-my-back-edit-card');

  backgroundColor.style.display = 'none';
  backgroundColor.style.backgroundColor = 'transparent';
  hideEditCard.classList.add('hide-edit-card');
  
  hideEditCard.addEventListener('animationend', () => {
    let deactivateOverflow = document.body;
    overview.removeChild(hideEditCard);
    deactivateOverflow.classList.remove("hide-my-scrolls");
  }, { once: true })
}


function styleAboutEditCard(){
  let deactivateOverflow = document.body;
  let backgroundColor = document.getElementById('color-my-back-edit-card');
  deactivateOverflow.classList.add("hide-my-scrolls");
  backgroundColor.style.display = 'flex';
  setTimeout(function() {
    backgroundColor.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
  }, 100);
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
  await setItemsInRemoteStorage();
  await openContacts();
  await openContactDetails(i);
}


async function deleteContact(i) {
  let contactDetails = document.getElementById("detail-view-of-contacts");
  let switchZindexOverview = document.getElementById('contact-overview');
  switchZindexOverview.style.zIndex = "400";
  contacts.splice([i], 1);
  contactDetails.innerHTML = "";
  if (document.getElementById('edit-card')) {
    hideEditCard(i);    
  }
  await setItemsInRemoteStorage()
  openContacts();
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

  await setItemsInRemoteStorage();
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
  document.getElementById('contact-overview').style.zIndex = "2";
}


async function colorMyBack() {
  const background = document.getElementById("color-my-back");
  background.style.display = "block";
  setTimeout(() => {
    background.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
  }, 100);
}


async function setColorForLetters(i) {
  const randomColor = (Math.floor(Math.random() * 16777215)).toString(16).padStart(6, '0');
  let colorMyLetters = document.getElementById(`${i}first-letters`);
  colorMyLetters.style.backgroundColor = `#${randomColor}`;
}


function successfullyMove(){
  return /*html*/`
    <div>
      <p>Successfully edit/delete/add</p>
    </div>
  `;
}


async function setItemsInRemoteStorage(){
  await setItem('contacts', contacts);
}
async function getItemsInRemoteStorage(){
  let contactsFromStorage = await getItem('contacts');
  let contactsFromStorageAsString = JSON.parse(contactsFromStorage['data']['value']);

  return contactsFromStorageAsString;
}


function openEditDeleteMobile(){
  let changeStyle = document.getElementById('edit-and-delete');
  let hideMyButton = document.getElementById('open-edit-function-mobile');
  changeStyle.style.display = "flex";
  hideMyButton.style.display = "none";
}


function closeEditDeleteMobile(){
  let changeStyle = document.getElementById('edit-and-delete');
  let showMyButton = document.getElementById('open-edit-function-mobile');
  showMyButton.style.display = "flex";
  changeStyle.classList.add('close-edit-delete-mobile');
}


function backToContactListMobile(){
  let switchZindexDetails = document.getElementById('details-of-contacts');
  let switchZindexOverview = document.getElementById('contact-overview');
  switchZindexDetails.style.zIndex = "1";
  switchZindexOverview.style.zIndex = "400";
}
