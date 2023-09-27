
let userData = [];

async function init() {
  renderContent();
  const main = document.querySelector('.main-container');
  main.style.opacity = "0";
  await loadUserDataFromRemote();
  console.log(userData);                                           // console.log
  rememberMe();
}


/* 
async function loadUserDataFromRemote() {
  try {
    const newUserDataString = await getItem('users');
    console.log('Daten aus Remote-Speicher:', newUserDataString);   // console.log
    if (newUserDataString && newUserDataString.value) {
      userData = JSON.parse(newUserDataString.value);               // hier gibt's noch einen Fehler. userData wird nicht befüllt
    }
  } catch (e) {
    console.error('Fehler beim Laden von Benutzerdaten:', e);
  }
}
*/


async function loadUserDataFromRemote() {
  let newUserDataString = await getItem('users');
  newUserDataString = JSON.parse(newUserDataString['data']['value']);

  for (let i = 0; i < newUserDataString.length; i++) {
    let users = newUserDataString[i];
    userData.push(users);
  }
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
  middleContent.innerHTML += /*html*/`
  
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
        <a class="startpage-links" href="#">I forgot my password</a>
      </div>
      <div class="login-buttons">
        <button type="submit" class="h-button border-radius-8">Log in</button>
        <a href="board.html" class="link-button-white border-radius-8">Guest Log in</a>
        </a>
      </div>
    </form>
    `;
}


function renderSignUp() {
  let signUpArea = document.getElementById('sign-up-area');
  signUpArea.style.display = 'none';
  let topArea = document.getElementById('top-area');
  topArea.style.height = '130px';
  const middleContent = document.getElementById('middle-area');
  middleContent.innerHTML = '';
  middleContent.innerHTML += /*html*/`
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


function userDatafromSignUp() {
  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  // Stellen Sie sicher, dass userData immer ein Array ist, selbst wenn keine Benutzerdaten vorhanden sind
  if (!Array.isArray(userData)) {
    userData = [];
  }
  let users = {
    'name': name.value,
    'email': email.value,
    'password': password.value,
  }
  userData.push(users);
  saveUserDataInRemote();
}



function signUpUser() {
  let registerEmail = document.getElementById('email');
  let emailValue = registerEmail.value;
  let passwordsMatch = passwordCheck();
  if (passwordsMatch) {
    emailCheck(emailValue);
    // Array userData erfährt hier ein Update mit den jeweiligen Daten
    userDatafromSignUp();
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










