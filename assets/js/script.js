
let userData = [];

async function init() {
  renderContent();
  const main = document.querySelector('.main-container');
  main.style.opacity = "0";
  await loadUserDataFromRemote();
  console.log(userData);                  // console.log
  getLoginFromLocal();
}


async function loadUserDataFromRemote() {
  let newUserDataString = await getItem('users');
  newUserDataString = JSON.parse(newUserDataString['data']['value']);
  for (let i = 0; i < newUserDataString.length; i++) {
    let users = newUserDataString[i];
    userData.push(users);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const logo = document.getElementById('logo');
  const main = document.querySelector('.main-container')
  setTimeout(() => {
    logo.style.position = "absolute";
    logo.style.top = "130px";
    logo.style.left = "130px";
    logo.style.transform = "translate(-50%, -50%) scale(0.5)";
    logo.style.transition = "0.7s ease-out";
    main.style.transition = "opacity 0.7s ease-in";
    main.style.opacity = "1";
  }, 500);
});


function renderContent() {
  const middleContent = document.getElementById('middle-area');
  middleContent.innerHTML += renderHtmlTemplate();
  /*   togglePasswordVisibility(); */
}


function renderSignUp() {
  let signUpArea = document.getElementById('sign-up-area');
  signUpArea.style.display = 'none';
  let topArea = document.getElementById('top-area');
  topArea.style.height = '130px';
  const middleContent = document.getElementById('middle-area');
  middleContent.innerHTML = '';
  middleContent.innerHTML += signUpHtmlTemplate();
  /*  togglePasswordVisibility(); */
}


function userDataFromSignUp(a) {
  let name = document.getElementById('name');
  name = name.value;
  let initials = getInitials(name);
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let color = a;
  if (!Array.isArray(userData)) {                       // so wird geprüft, dass es immer ein Array ist
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


async function saveUserDataInRemote() {
  try {
    const userDataString = JSON.stringify(userData);
    await setItem('users', userDataString);
    console.log('Daten remote gespeichert');                        // console.log
  } catch (e) {
    console.error('Fehler bei der Remote-Datenspeicherung', e);
  }
}


function setColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
}


function signUpUser() {
  let registerEmail = document.getElementById('email').value;
  let passwordsMatch = passwordCheck();
  if (passwordsMatch) {
    emailCheck(registerEmail);
    let color = setColor();
    userDataFromSignUp(color);
    displayMessage('Registrierung erfolgreich!');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2500);
  }
}


function emailCheck(registerEmail) {
  const ifEmailExists = userData.some((user) => user.email === registerEmail);
  if (!ifEmailExists) {
    return true;
  } else {
    displayMessage('Diese E-Mail-Adresse wurde bereits verwendet')
    return false;
  }
}


function passwordCheck() {
  let passwordInput = document.getElementById('password');
  let confirmPasswordInput = document.getElementById('password-confirm');
  let password = passwordInput.value;
  let confirmPassword = confirmPasswordInput.value;
  if (password === confirmPassword) {
    return true;
  } else {
    displayMessage('Die Passwörter stimmen nicht überein');
    return false;
  }
}


// ------------------ password-toggling ... TRIAL ----------


/* function togglePasswordVisibility() {
--> neu aufsetzen mit einzelnen icons, nicht als background-image
 */

// ------------------ password-toggling end ----------------------------

function checkCheckbox() {
  let checkBox = document.getElementById('checkbox');
  if (!checkBox.checked) {
    displayMessage('Bitte die Privacy Policy akzeptieren');
    return false;
  } else {
    signUpUser();
  }
}


function displayMessage(messageText) {
  const overlay = document.getElementById('overlay');
  const message = document.getElementById('animated-message');
  message.textContent = messageText;
  overlay.style.display = 'flex';
  setTimeout(() => {
    /*  overlay.style.transform = 'translateY(0)'; */
    message.style.transform = 'translate(-50%, -50%)';
  }, 200);
  setTimeout(() => {
    hideMessage();
  }, 1500);
}


function hideMessage() {
  const overlay = document.getElementById('overlay');
  /*  overlay.style.transform = 'translateY(100%)'; */
  overlay.style.display = 'none';
}


function login(event) {
  event.preventDefault();
  let email = document.getElementById('user-email');
  let password = document.getElementById('user-password');
  let dataExists = userData.find(u => u.email == email.value && u.password == password.value);
  if (dataExists) {
    debugger;
    rememberMe();
    displayMessage('Anmeldung erfolgreich')
    loginToLocalStorage(dataExists);
    setTimeout(() => {
      window.location.href = '/summary.html';
    }, 3000);
  }
  else {
    displayMessage('Falsche Email oder Passwort')
  }
}


function rememberMe() {
  let checkBox = document.getElementById('remember-me');
  const userEmailInput = document.getElementById('user-email');
  const userPasswordInput = document.getElementById('user-password');
  if (checkBox.checked) {
    localStorage.setItem('userEmail', userEmailInput.value);
    localStorage.setItem('userPassword', userPasswordInput.value);
  } else {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
  }
}


function getLoginFromLocal() {
  const savedEmail = localStorage.getItem('userEmail');
  const savedPassword = localStorage.getItem('userPassword');
  const emailInput = document.getElementById('user-email');
  const passwordInput = document.getElementById('user-password');
  if (savedEmail) {
    emailInput.value = savedEmail;
  }
  if (savedPassword) {
    passwordInput.value = savedPassword;
  }
}


function loginToLocalStorage(dataExists) {
  let loginName = dataExists['name'];
  let loginInitials = dataExists['initials'];
  let loginStatus = true;
  let loginTime = new Date();
  let userColor = dataExists['color'];
  localStorage.setItem('login-name', loginName);
  localStorage.setItem('login-initials', loginInitials);
  localStorage.setItem('login-status', loginStatus);
  localStorage.setItem('login-time', loginTime);
  localStorage.setItem('user-color', userColor);
}


function loginAsGuest() {
  let loginName = 'Guest';
  let loginInitials = 'G';
  let loginStatus = true;
  let loginTime = new Date();
  let userColor = '#FFFFFF';
  localStorage.setItem('login-name', loginName);
  localStorage.setItem('login-initials', loginInitials);
  localStorage.setItem('login-status', loginStatus);
  localStorage.setItem('login-time', loginTime);
  localStorage.setItem('user-color', userColor);
}


function getInitials(loginName) {
  let nameInput = loginName.split(' ');
  let initials = nameInput[0].charAt(0);
  if (nameInput.length > 1) {
    let lastName = nameInput[nameInput.length - 1];
    initials += lastName.charAt(0);
  }
  return initials;
}


// -------------------       HTML-Templates       --------------------
function renderHtmlTemplate() {
  return /*html*/`
  <div class="border-radius-30 login">
  <h1 class="padding-top">Log in</h1>
  <div class="underline border-radius-8"></div>
  <form onsubmit="login(event)">
      <input id="user-email" class="login-input bg-email-icon icon" type="email" placeholder="Email" name="userEmail" required/>
        <input id="user-password" class="login-input bg-password-icon icon visibility-change" minlength="5" type="password" placeholder="Password" name="userPassword" required/>
        <div class="checkbox-container">
      <label class="checkbox-label">
        <input id="remember-me" name="checkbox" type="checkbox"/>Remember me
      </label>
    </div>
    <div class="login-buttons">
      <button  class="h-button border-radius-8">Log in</button>
      <a href="/summary.html" class="link-button-white border-radius-8" onclick="loginAsGuest()">Guest Log in</a>
    </div>
  </form>
  `;
}


function signUpHtmlTemplate() {
  return /*html*/`
           <div class="border-radius-30 login">
               <a href="index.html">
                   <img src="assets/img/arrow-left.svg" class="arrow-left" alt="left arrow">
               </a>
             <h1>Sign up</h1>
             <div class="underline border-radius-8"></div>
             <form onsubmit="checkCheckbox(); return false">
               <input id="name" minlength="2" class="login-input bg-person-icon" type="text" placeholder="Name" name="userName"required/>
               <input id="email" class="login-input bg-email-icon" type="email" placeholder="Email" name="userEmail" required/>
              
                <input id="password" minlength="5" class="login-input bg-password-icon icon visibility-change" type="password" placeholder="Password" name="userPassword" required/>
              <!--   <input id="password" minlength="5" class="login-input" type="password" placeholder="Password" name="userPassword" required/>
                <i class="password-icon" onclick="togglePasswordVisibility()"></i> -->
       
                <input id="password-confirm" minlength="5" class="login-input bg-password-icon icon visibility-change" type="password" placeholder="Password" name="userPassword" required/>
             <!--   <input id="password-confirm" class="login-input" type="password" placeholder="Confirm Password" required/>
               <i class="password-icon" onclick="togglePasswordVisibility()"></i> -->
               <div class="checkbox-container-accept">
                 <label class="checkbox-label">
                   <input id="checkbox" name="checkbox" type="checkbox"/>I accept the<a class="startpage-links" href="privace-policy.html">Privacy Policy</a>
                 </label>
               </div>
               <div class="login-buttons">
                 <button type="submit" id="sign-up-button" class="h-button border-radius-8" >Sign up</button>
               </div>
             </form>
           </div>
         </div>
   `;
}

// -------------------- HTML-Templates Ende --------------------------


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






