
let userData = [];

async function init() {
  renderContent();
  let main = document.querySelector('.main-container');
  main.style.opacity = "0";
  await loadUserDataFromRemote();
  console.log(userData);                  // console.log
  getLoginFromLocal();
}


/**
 * This function loads the user data from remote storage
 * 
 * @param {string} newUserDataString - This is the parsed user data from remote
 */
async function loadUserDataFromRemote() {
  let newUserDataString = await getItem('users');
  newUserDataString = JSON.parse(newUserDataString['data']['value']);
  for (let i = 0; i < newUserDataString.length; i++) {
    let users = newUserDataString[i];
    userData.push(users);
  }
}

/**
 * This function reacts on loading the page and animates the join-logo 
 */

/* document.addEventListener("DOMContentLoaded", function () { */
window.addEventListener("load", function () {
  let logo = document.getElementById('logo');
  let main = document.querySelector('.main-container')
  setTimeout(() => {
    logo.style.position = "absolute";
    logo.style.top = "130px";
    logo.style.left = "130px";
    logo.style.transform = "translate(-50%, -50%) scale(0.5)";
    logo.style.transition = "0.7s ease-out";
    main.style.transition = "opacity 1s ease-in";
    main.style.opacity = "1";
  }, 500);
});

/**
 * This function renders dynamically the content of the html-template on index.html for the user login form
 */
function renderContent() {
  const middleContent = document.getElementById('middle-area');
  middleContent.innerHTML += renderHtmlTemplate();
}

/**
 * This function renders dynamically the content of the html-template on index.html for the sign-up form
 */
function renderSignUp() {
  let signUpArea = document.getElementById('sign-up-area');
  signUpArea.style.display = 'none';
  let topArea = document.getElementById('top-area');
  topArea.style.height = '120px';
  const middleContent = document.getElementById('middle-area');
  middleContent.innerHTML = '';
  middleContent.innerHTML += signUpHtmlTemplate();
}


/**
 * This function collects the new user data from the sign-up form
 * 
 * @param {string} a - This is the color of which each user gets assigned one
 */
function userDataFromSignUp(a) {
  let name = document.getElementById('name');
  name = name.value;
  let initials = getInitials(name);
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let color = a;
  if (!Array.isArray(userData)) {
    userData = [];
  }
  let users = {
    'name': name,
    'email': email.value,
    'password': password.value,
    'color': color,
    'initials': initials
  };
  userData.push(users);
  saveUserDataInRemote();
}

/**
 * This function stores the user data in remote storage
 */
async function saveUserDataInRemote() {
  try {
    const userDataString = JSON.stringify(userData);
    await setItem('users', userDataString);
    console.log('Daten remote gespeichert');                        // console.log
  } catch (e) {
    console.error('Fehler bei der Remote-Datenspeicherung', e);
  }
}

/**
 * This function sets a random color for a new user
 * 
 * @returns {string} The hexcode of the generated random color
 */
function setColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
}

/**
 * This function sums up the functions for the registration process for a new user
 */
function signUpUser() {
  let registerEmail = document.getElementById('email').value;
 let passwordsMatch = passwordCheck();
 debugger;
  if (passwordsMatch) {
    emailCheck(registerEmail);
    let color = setColor();
    userDataFromSignUp(color); 
    displayMessage('You registered successfully!');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  }
}

/**
 * This function checks the userData whether a user already has been signed up before with the same email-address
 * 
 * @param {string} registerEmail - This correspondends to the email-address entered by the user 
 * @returns {boolean} - Returns true if the email doesn't exist, otherwise it returns false
 */
function emailCheck(registerEmail) {
  const ifEmailExists = userData.some((user) => user.email === registerEmail);
  if (!ifEmailExists) {
    return true;
  } else {
    displayMessage('This email address has already been used');
    return false;
  }
}

/**
 * This function checks whether the entered password and its confirmation match
 *
 * @returns {boolean} - Returns true if the passwords match, otherwise it returns false
 */
function passwordCheck() {
  let passwordInput = document.getElementById('password');
  let confirmPasswordInput = document.getElementById('password-confirm');
  let password = passwordInput.value;
  let confirmPassword = confirmPasswordInput.value;
  if (password === confirmPassword) {
    return true;
  } else {
    displayMessage('The passwords do not match');
    return false;
  }
}

/**
 * This function checks whether the user has ticked the privacy policy box and displays a message
 * 
 * @returns {boolean} - Returns true if the box has been ticked, otherwise it returns false
 */
function checkCheckbox() {
  let checkBox = document.getElementById('checkbox');
  if (!checkBox.checked) {
    displayMessage('Please accept the privacy policy');
    return false;
  } else {
    debugger;
    signUpUser();
  }
}

/**
 * This is a general function for displaying messages in an overlay
 * 
 * @param {string} messageText - This is the message text that will be shown in the overlay
 */
function displayMessage(messageText) {
  const overlay = document.getElementById('overlay');
  const message = document.getElementById('animated-message');
  message.textContent = messageText;
  overlay.style.display = 'flex';
  setTimeout(() => {
    message.style.transform = 'translate(-50%, -50%)';
  }, 200);
  setTimeout(() => {
    hideMessage();
  }, 1500);
}

/**
 * This function hides the message overlay
 */
function hideMessage() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';
}

/**
 * This function does the login for a user based on the provided email and password.
 * If successful, the user is redirected to the summary page
 * 
 * @param {Event} event - The event object from the form submission
 */
function login(event) {
  event.preventDefault();
  let email = document.getElementById('user-email');
  let password = document.getElementById('password-login');
  let dataExists = userData.find(u => u.email == email.value && u.password == password.value);
  if (dataExists) {
    rememberMe();
    displayMessage('You logged in successfully!')
    loginToLocalStorage(dataExists);
    setTimeout(() => {
      window.location.href = '/summary.html';
    }, 1200);
  }
  else {
    displayMessage('Wrong Email or password')
  }
}

/**
 * This function saves or removes the user's email and password to/from local storage
 * based on the user's decision whether to be remembered as a user or not
 */
function rememberMe() {
  let checkBox = document.getElementById('remember-me');
  const userEmailInput = document.getElementById('user-email');
  const userPasswordInput = document.getElementById('password-login');
  if (checkBox.checked) {
    localStorage.setItem('userEmail', userEmailInput.value);
    localStorage.setItem('userPassword', userPasswordInput.value);
  } else {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
  }
}

/**
 * This function retrieves the user's login data from local storage and fills in the data if available
 */
function getLoginFromLocal() {
  const savedEmail = localStorage.getItem('userEmail');
  const savedPassword = localStorage.getItem('userPassword');
  const emailInput = document.getElementById('user-email');
  const passwordInput = document.getElementById('password-login');
  if (savedEmail) {
    emailInput.value = savedEmail;
  }
  if (savedPassword) {
    passwordInput.value = savedPassword;
  }
}

/**
 * This function saves user login information to local storage
 *
 * @param {Object} dataExists - This is the user data to be saved
 */
function loginToLocalStorage(dataExists) {
  let loginName = dataExists['name'];
  let loginInitials = dataExists['initials'];
  let loginStatus = true;
  let loginTime = new Date();
  let userColor = dataExists['color'];
  let welcomeDone = false;
  localStorage.setItem('login-name', loginName);
  localStorage.setItem('login-initials', loginInitials);
  localStorage.setItem('login-status', loginStatus);
  localStorage.setItem('login-time', loginTime);
  localStorage.setItem('user-color', userColor);
  localStorage.setItem('welcome-done', welcomeDone);
}

/**
 * This function is for logging in a guest user 
 */
function loginAsGuest() {
  let loginName = 'Guest';
  let loginInitials = 'G';
  let loginStatus = true;
  let loginTime = new Date();
  let userColor = '#FFFFFF';
  let welcomeDone = false;
  localStorage.setItem('login-name', loginName);
  localStorage.setItem('login-initials', loginInitials);
  localStorage.setItem('login-status', loginStatus);
  localStorage.setItem('login-time', loginTime);
  localStorage.setItem('user-color', userColor);
  localStorage.setItem('welcome-done', welcomeDone);
}

/**
 * This function creates the initials using the first and last name of each user
 * 
 * @param {string} loginName - The first and last name 
 * @returns {string} - The initials extracted from the provided full name
 */
function getInitials(loginName) {
  let nameInput = loginName.split(' ');
  let initials = nameInput[0].charAt(0);
  if (nameInput.length > 1) {
    let lastName = nameInput[nameInput.length - 1];
    initials += lastName.charAt(0);
  }
  return initials;
}

/**
 * This function changes the background icon in the input field 
 * 
 * @param {HTMLInputElement} input - This is the input field
 */
function changePasswordIcon(click) {
  let passwordInput = click;
  passwordInput.type = "password";
  if (passwordInput.value != "") {
    passwordInput.nextElementSibling.style.backgroundImage =
      "url(/assets/img/visibility.svg)";
  } else {
    passwordInput.nextElementSibling.style.backgroundImage =
      "url(/assets/img/lock.svg)";
  }
}

/**
 * This function toggles the visibility of the password between text and hidden mode
 * 
 * @param {HTMLDivElement} click - This is the element that is used to change the password visibility
 */
function togglePassword(click) {
  let passwordInput = click.previousElementSibling;
  if (passwordInput.value == "") {
    return;
  }
  if (passwordInput.type === "password") {
    click.style.backgroundImage = "url(/assets/img/visibility_off.svg)";
    passwordInput.type = "text";
  } else {
    click.style.backgroundImage = "url(/assets/img/visibility.svg)";
    passwordInput.type = "password";
  }
}

/**
 * This function displays the logo overlay in responsive mode
 */
function responsiveLogoOverlay() {
  let overlay = document.getElementById('responsive-overlay');
  let logo = document.getElementById('responsive-logo');
  if (window.innerWidth < 1080) {
    overlay.style.opacity = 1;
    overlay.style.transition = "opacity 1s ease-in-out";
    logo.style.position = "fixed";
    logo.style.top = "calc(50vh - 100px)";
    logo.style.left = "calc(50vw - 84px)";
    setTimeout(() => {
      logo.style.top = "60px";
      logo.style.left = "64px";
      logo.style.transform = "translate(-50%, -50%) scale(0.3)";
      logo.style.transition = "0.7s ease-out";
      overlay.style.opacity = 0;
      overlay.style.zIndex = -1;
    }, 500);
  } else {
    overlay.style.display = "none";
  }
}

window.addEventListener("load", responsiveLogoOverlay);


/* ############ EXAMPLE DATA #############

[{
  "name": "Alexander Riedel",
  "email": "alex@alex",
  "password": "password123",
  "color": "#ce2abe",
  "initials": "AR"
},
{
  "name": "Jad",
  "email": "jadTest@Test.de",
  "password": "12345",
  "color": "#2fb93c",
  "initials": "J"
}]

 ###################################### */






