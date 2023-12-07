let contacts = [];
/**
 * Opens and populates the contact list.
 * 
 * This asynchronous function retrieves contact data from remote storage, updates the global 'contacts' array, and sorts the contacts. It is typically used to refresh the contact list view.
 */
async function openContacts() {
  contacts = await getItemsInRemoteStorage();
  sortMyContacts();
}

/**
 * Sorts the `contacts` array in alphabetical order based on the contact names and updates the letters used for grouping.
 *
 * @returns {void}
 */
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

/**
 * Extracts the first letters from the contact names in the `contacts` array and populates the `letters` array with these letters after eliminating duplicates.
 *
 * @returns {void}
 */
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

/**
 * Removes duplicate letters from an array and then renders a container using the cleaned array.
 *
 * @param {string[]} letters - An array of letters with potential duplicates.
 * @returns {void}
 */
function eliminateDoubles(letters) {
  let cleanLetters = new Set(letters);
  let letterArray = Array.from(cleanLetters);
  renderSortContainer(letterArray);
}

/**
 * Get the first letters from the contact's name for overview display.
 *
 * @param {number} i - The index of the contact to extract letters from.
 * @param {Object[]} contacts - An array of contact objects.
 * @returns {string[]} An array containing the first letters of the contact's name.
 */
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

/**
 * Render a container for sorting contacts alphabetically and display the contacts.
 *
 * @param {string[]} letterArray - An array containing the first letters of contacts.
 */
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

/**
 * Mark a specific contact as selected by adding a CSS class.
 *
 * @param {number} i - The index of the contact to be marked.
 */
function markMyContact(i) {
  let excludeElement = document.getElementById(`${i}sub-contact-block`);
  deMarkMyContact();
  excludeElement.classList.add("sub-contact-block-marked");
  excludeElement.classList.remove("sub-contact-block");
}

/**
 * Deselect all marked contacts by removing the CSS class "sub-contact-block-marked".
 */
function deMarkMyContact() {
  let container = document.getElementById("render-contacts-overview");
  let elements = container.querySelectorAll(".sub-contact-block-marked");

  elements.forEach((element) => {
    element.classList.remove("sub-contact-block-marked");
    element.classList.add("sub-contact-block");
  });
}

/**
 * Hides the edit card and related elements.
 */
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

/**
 * Applies styles to prepare for displaying the edit card.
 * This function hides the body's overflow, sets the background color overlay, and makes the edit card visible.
 */
function styleAboutEditCard(){
  let deactivateOverflow = document.body;
  let backgroundColor = document.getElementById('color-my-back-edit-card');
  deactivateOverflow.classList.add("hide-my-scrolls");
  backgroundColor.style.display = 'flex';
  setTimeout(function() {
    backgroundColor.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
  }, 100);
}

/**
 * Saves the edited contact details and updates the data in the storage.
 *
 * @param {number} i - The index of the contact to be edited.
 */
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

/**
 * Deletes a contact at the specified index and updates the data in the storage.
 *
 * @param {number} i - The index of the contact to be deleted.
 */
async function deleteContact(i) {
  let contactDetails = document.getElementById("detail-view-of-contacts");
  let switchZindexOverview = document.getElementById('contact-overview');
  switchZindexOverview.style.zIndex = "400";
  let contactName = document.getElementById(`${i}-contact-name`)
  let name = contactName.innerText;
  uncheckCheckboxIfContactIsDeleted(name);
  contacts.splice([i], 1);
  contactDetails.innerHTML = "";
  if (document.getElementById('edit-card')) {
    hideEditCard(i);    
  }
  await setItemsInRemoteStorage()
  openContacts();
}

/**
 * Formats a name by capitalizing the first letter of each word.
 *
 * @returns {string} The formatted name.
 */
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

/**
 * Adds a new contact to the `contacts` array after formatting the name.
 *
 * @returns {void}
 */
async function pushContactInfo() {
  let name = await formatNames();
  let email = document.getElementById("contact-email-input");
  let phoneNumber = document.getElementById("contact-phone-input");
  let initials = getContactInitials(name);
  let color = getContactColor()
  let newContact = {
    name: `${name}`,
    email: `${email.value}`,
    "phone-number": `${phoneNumber.value}`,
    'initials': initials,
    'color': color,
  };
  contacts.push(newContact);
  document.getElementById("contact-name-input").value = ``;
  email.value = ``;
  phoneNumber.value = ``;

  await setItemsInRemoteStorage();
  closeContactAddCard();
  sortMyContacts();
}


function getContactColor(){
  const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  return "#" + randomColor;
}


/**
 * 
 * @param {string} name
 * @returns the initials for the contacts. This function is used for the add Task function
 */
function getContactInitials(name){
  let nameInput = name.split(' ');
  let initials = nameInput[0].charAt(0);
  if (nameInput.length > 1) {
    let lastName = nameInput[nameInput.length - 1];
    initials += lastName.charAt(0);
  }
  return initials;
}

/**
 * Initiates a slide-in animation for a card after waiting for a delay.
 *
 * @returns {Promise<void>} A Promise that resolves when the animation is complete.
 */
async function slideInCard() {
  await waitForIt();
  startAnimation();
}

/**
 * Waits for a specific event, typically a delay or transition, and prepares for the animation.
 * This function displays a slider and deactivates body scrolling.
 *
 * @returns {Promise<void>} A Promise that resolves when the preparation is complete.
 */
async function waitForIt() {
  let slider = document.getElementById("slide-container");
  let deactivateOverflow = document.body;
  slider.style.display = "flex";
  deactivateOverflow.classList.add("hide-my-scrolls");
}

/**
 * Initiates the animation by expanding the add contact card.
 * This function sets the width and position of the card to trigger the animation.
 *
 * @returns {Promise<void>} A Promise that resolves when the animation starts.
 */
async function startAnimation() {
  let animation = document.getElementById("add-contact-card");
  animation.style.width = "100%";
  animation.style.right = "0%";
}

/**
 * Closes the contact add card by reversing the animation and hiding the card.
 * This function sets the card's position and visibility to close it smoothly.
 */
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

/**
 * Renders the contact add card by triggering a series of animations and style changes.
 * This function shows the card, adds background color, and slides it into view.
 */
async function renderAddContactCard() {
  await showMyCard();
  await colorMyBack();
  slideInCard();
}

/**
 * Shows the contact add card by adjusting its width and display style.
 * Additionally, it changes the z-index of the contact overview.
 */
async function showMyCard() {
  document.getElementById("add-contact-card").style.width = "100%";
  document.getElementById("create-contact").style.width = "100%";
  document.getElementById("create-contact").style.display = "flex";
  document.getElementById('contact-overview').style.zIndex = "2";
}

/**
 * Changes the background color of an element with an ID of "color-my-back" to a semi-transparent black,
 * creating a dimmed overlay effect, and displays it.
 */
async function colorMyBack() {
  const background = document.getElementById("color-my-back");
  background.style.display = "block";
  setTimeout(() => {
    background.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
  }, 100);
}

/**
 * Generates a random color code in hexadecimal format and sets it as the background color
 * for the element with the specified ID, identified by the provided index (i).
 *
 * @param {number} i - The index used to identify the target element by its ID.
 */
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

/**
 * Saves the 'contacts' array in remote storage using an asynchronous function.
 * It calls the 'setItem' function with the key 'contacts' and the provided 'contacts' array.
 * 
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
async function setItemsInRemoteStorage(){
  await setItem('contacts', contacts);
}

/**
 * Retrieves the 'contacts' array from remote storage using an asynchronous function.
 * It calls the 'getItem' function to fetch the stored 'contacts' data and parses it into an array.
 * 
 * @returns {Promise<Array>} A promise that resolves with the 'contacts' array from remote storage.
 */
async function getItemsInRemoteStorage(){
  let contactsFromStorage = await getItem('contacts');
  let contactsFromStorageAsString = JSON.parse(contactsFromStorage['data']['value']);

  return contactsFromStorageAsString;
}

/**
 * Shows the edit and delete buttons on mobile view by changing their display style.
 * 
 * This function is called to reveal the edit and delete buttons while hiding the open-edit button on mobile view.
 */
function openEditDeleteMobile(){
  let changeStyle = document.getElementById('edit-and-delete');
  let hideMyButton = document.getElementById('open-edit-function-mobile');
  changeStyle.style.display = "flex";
  hideMyButton.style.display = "none";
}

/**
 * Closes the edit and delete buttons on mobile view by changing their display style.
 * 
 * This function is called to hide the edit and delete buttons while showing the open-edit button on mobile view.
 */
function closeEditDeleteMobile(){
  let changeStyle = document.getElementById('edit-and-delete');
  let showMyButton = document.getElementById('open-edit-function-mobile');
  showMyButton.style.display = "flex";
  changeStyle.classList.add('close-edit-delete-mobile');
}

/**
 * Switches the z-index of mobile view elements to navigate back to the contact list view.
 * 
 * This function sets the z-index of elements in the mobile view to show the contact list and hide the contact details view.
 */
function backToContactListMobile(){
  let switchZindexDetails = document.getElementById('details-of-contacts');
  let switchZindexOverview = document.getElementById('contact-overview');
  switchZindexDetails.style.zIndex = "1";
  switchZindexOverview.style.zIndex = "400";
}
