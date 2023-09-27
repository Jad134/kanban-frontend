
let userData = [];

async function init() {
  renderContent();
  const main = document.querySelector('.main-container');
  main.style.opacity = "0";
  await loadUserDataFromRemote();
  console.log(userData);                                           // console.log
  rememberMe();
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
}


function renderSignUp() {
  let signUpArea = document.getElementById('sign-up-area');
  signUpArea.style.display = 'none';
  let topArea = document.getElementById('top-area');
  topArea.style.height = '130px';
  const middleContent = document.getElementById('middle-area');
  middleContent.innerHTML = '';
  middleContent.innerHTML += signUpHtmlTemplate();
}


function userDataFromSignUp() {
  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let color = document.getElementById('randomColor')
  if (!Array.isArray(userData)) {                       // so wird geprüft, dass es immer ein Array ist
    userData = [];
  }
  let backgroundColor = color.style.backgroundColor;
  let hexColor = rgbToHex(backgroundColor);
  let users = {
    'name': name.value,
    'email': email.value,
    'password': password.value,
    'color': hexColor,
  }
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


// muss eingebaut werden, weil die Speicherung von Farbcodes von Browser zu Browser verschieden angezeigt
// und dann auch so gespeichert wird
function rgbToHex(rgb) {
  if (/^#[0-9A-F]{6}$/i.test(rgb)) {
    return rgb;
  }
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

  function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}


function setColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const colorElement = document.getElementById("randomColor");
  colorElement.style.backgroundColor = "#" + randomColor;
  colorElement.innerHTML = "#" + randomColor;                         
}


function signUpUser() {
  let registerEmail = document.getElementById('email');
  let emailValue = registerEmail.value;
  let passwordsMatch = passwordCheck();
  if (passwordsMatch) {
    emailCheck(emailValue);
    setColor();
    // Array userData erfährt hier ein Update mit den jeweiligen Daten
    userDataFromSignUp();
    displayMessage('Registrierung erfolgreich!');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2500);
  }
}


function emailCheck(emailValue) {
  const ifEmailExists = userData.some((user) => user.email === emailValue);
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
    overlay.style.transform = 'translateY(0)';
    message.style.transform = 'translate(-50%, -50%)';
  }, 200);
  setTimeout(() => {
    hideMessage();
  }, 1500);
}


function hideMessage() {
  const overlay = document.getElementById('overlay');
  overlay.style.transform = 'translateY(100%)';
}


function login(event) {
  event.preventDefault();
  let email = document.getElementById('user-email');
  let password = document.getElementById('user-password');
  let dataExists = userData.find(u => u.email == email.value && u.password == password.value);
  if (dataExists) {
    displayMessage('Anmeldung erfolgreich')
    // 26.09.2023 - Alexander Riedel: Login im LocalStorage speichern
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
  const rememberMeCheckbox = document.getElementById('remember-me');
  const userEmailInput = document.getElementById('user-email');
  const userPasswordInput = document.getElementById('user-password');
  const storedUserEmail = localStorage.getItem('userEmail');
  const storedUserPassword = localStorage.getItem('userPassword');
  if (rememberMeCheckbox.checked) {
    localStorage.setItem('userEmail', userEmailInput.value);
    localStorage.setItem('userPassword', userPasswordInput.value);
  } else {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
  } if (storedUserEmail) {
    userEmailInput.value = storedUserEmail;
  } if (storedUserPassword) {
    userPasswordInput.value = storedUserPassword;
  }
}

// -------------------       HTML-Templates       --------------------
function renderHtmlTemplate() {
  return /*html*/`
  <div class="border-radius-30 login">
  <h1 class="padding-top">Log in</h1>
  <div class="underline border-radius-8"></div>
  <form onsubmit="login(event)">
      <input id="user-email" class="login-input bg-email-icon icon" type="email" placeholder="Email" name="userEmail" required/>
      <input id="user-password" class="login-input bg-password-icon icon" minlength="5" type="password" placeholder="Password" name="userPassword" required/>
    <div class="checkbox-container">
      <label class="checkbox-label">
        <input id="remember-me" name="checkbox" type="checkbox"/>Remember me
      </label>
    </div>
    <div class="login-buttons">
      <button type="submit" class="h-button border-radius-8">Log in</button>
      <a href="/summary.html" class="link-button-white border-radius-8" onclick="loginAsGuest()">Guest Log in</a>
      </a>
    </div>
  </form>
  `; 
}


function signUpHtmlTemplate(){
  return /*html*/`
           <div class="border-radius-30 login">
               <a href="index.html">
                   <img src="assets/img/arrow-left.svg" class="arrow-left" alt="left arrow">
               </a>
             <h1>Sign up</h1>
             <div class="underline border-radius-8"></div>
             <form onsubmit="checkCheckbox(); return false">
               <input id="name" minlength="2" class="login-input bg-password-icon icon" type="text" placeholder="Name" name="userName"required/>
               <input id="email" class="login-input bg-email-icon icon" type="email" placeholder="Email" name="userEmail" required/>
               <input id="password" minlength="5" class="login-input bg-password-icon icon" type="password" placeholder="Password" name="userPassword" required/>
               <input id="password-confirm" class="login-input bg-password-icon icon" type="password" placeholder="Confirm Password" required/>
               <div class="checkbox-container-accept">
                 <label class="checkbox-label">
                   <input id="checkbox" name="checkbox" type="checkbox" />I accept the<a class="startpage-links" href="privace-policy.html">Privacy Policy</a>
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



// 26.09.2023 - Alexander Riedel: Login im LocalStorage speichern
function loginToLocalStorage(dataExists) {
  let loginName = dataExists['name'];
  let loginInitials = getInitials(loginName);
  let loginStatus = true;
  let loginTime = new Date();
  let userColor = '#cb4948';       //// PLATZHALTER
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
  let userColor = '#FFFFFF';       //// PLATZHALTER
  localStorage.setItem('login-name', loginName);
  localStorage.setItem('login-initials', loginInitials);
  localStorage.setItem('login-status', loginStatus);
  localStorage.setItem('login-time', loginTime);
  localStorage.setItem('user-color', userColor); 
}


// 26.09.2023 - Alexander Riedel: Initialien erstellen
function getInitials(loginName) {
  let nameInput = loginName.split(' ');
  let initials = nameInput[0].charAt(0);
  if (nameInput.length > 1) {
      let lastName = nameInput[nameInput.length - 1];
      initials += lastName.charAt(0);
  }
  return initials;
}


// Braucht es die Reset-Funktion bei Formularen überhaupt? Sie werden onsubmit zurückgesetzt.. 

/* function resetForm() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  document.getElementById('user-mail').value = '';
  document.getElementById('user-password').value = '';
  document.getElementById('password-confirm').value = '';
  signUpButton.disabled = false;
} */










