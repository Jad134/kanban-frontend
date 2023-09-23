
let userData = [];


async function init() {
  renderContent();
  const main = document.querySelector('.main-container');
  main.style.opacity = "0";
  /*   loadUserData(); */
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
    <form onsubmit="login(); return false" method="post">
        <input id="name" class="login-input bg-email-icon icon" type="email" placeholder="Email" name="userEmail" required/>
        <input id="email" class="login-input bg-password-icon icon" minlength="5" type="password" placeholder="Password" name="userPassword" required/>
      <div class="checkbox-container">
        <label class="checkbox-label">
          <input name="checkbox" type="checkbox"/>Remember me
        </label>
        <a class="startpage-links" href="#">I forgot my password</a>
      </div>
      <div class="login-buttons">
        <button id="login" class="h-button border-radius-8">Log in</button>
        <a href="board.html">
          <button class="h-button-white border-radius-8">Guest Log in</button>
        </a>
      </div>
    </form>
    `;
}

let msgBox;

function renderSignUp() {
  const middleContent = document.getElementById('middle-area');
  middleContent.innerHTML = '';
  middleContent.innerHTML += /*html*/`
            <div class="border-radius-30 login">
                <a href="index.html">
                    <img src="assets/img/arrow-left.svg" class="arrow-left" alt="left arrow">
                </a>
              <h1>Sign up</h1>
              <div class="underline border-radius-8"></div>
              <form onsubmit="signUpUser(); return false">
                
                <input id="name" minlength="2" class="login-input bg-password-icon icon" type="text" placeholder="Name" name="userName"required/>
                <input id="email" class="login-input bg-email-icon icon" type="email" placeholder="Email" name="userEmail"required/>
                <input id="password" minlength="5" class="login-input bg-password-icon icon" type="password" placeholder="Password" name="userPassword" required/>
                <input id="password-confirm" class="login-input bg-password-icon icon" type="password" placeholder="Confirm Password" required/>
    
                <div class="checkbox-container-accept">
                  <label class="checkbox-label">
                    <input name="checkbox" type="checkbox"/>I accept the<a class="startpage-links" href="#">Privacy Policy</a>
                  </label>
                </div>

                <div class="login-buttons">
                  <button id="signUpButton" class="h-button border-radius-8">Sign up</button>
                </div>
              </form>
            </div>
          </div>
    `;
  msgBox = document.getElementById('msgBox');
}


const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');
if (msg) {
  msgBox.innerHTML = msg;
} else {
  msgBox.style.display = 'none';
}

function showMsg() {
  if (msgBox) {
    msgBox.style.display = 'block';
  }
}


function signUpUser() {
  signUpButton.disabled = true;
  let registerName = document.getElementById('name');
  let registerEmail = document.getElementById('email');
  let registerPassword = document.getElementById('password');
  userData.push({ name: registerName.value, email: registerEmail.value, password: registerPassword.value })
  /*  setItem('user-data', JSON.stringify(userData));
   savingRemote(); */
  emailCheck();
  resetForm();
}


function emailCheck() {
  const emailValue = document.getElementById("email").value;
  const ifEmailExists = userData.some((user) => user.email === emailValue);
  if (ifEmailExists) {
    alert('Diese E-Mail-Adresse wurde bereits verwendet.');
  } else {
    alert('Erfolgreich registriert. Sie werden in 2 Sekunden zur Startseite weitergeleitet.');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
  }
}

// aktuell noch nicht weiterführend, da die 
function login() {
  let email = document.getElementById('email')[0];
  let password = document.getElementById('password')[0];
  let user = userData.find(u => u.email == email.value && u.password == password.value);
  if (user) {
    alert('Anmeldung erfolgreich');
    window.location.href = 'board.html';
  }
  else {
    alert('Falsche Email oder Passwort')
  }
}


function resetForm() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  document.getElementById('password-confirm').value = '';
  signUpButton.disabled = false;
}


/* Remote Storage Speicherung und Laden wird gemeinsam/extra implementiert
async function loadUserData() {
  try {
    const userDataString = await getItem('user-data');
    userData = JSON.parse(userDataString);
  } catch (e) {
    console.error('error:', e);
  }
}

function savingRemote() {
  try {
    setItem('user-data', JSON.stringify(userData));
    console.log('Daten remote gespeichert');
  } catch (e) {
    console.error('Remote Datenspeicherung Error:', e);
  }
} */







/*
function signUp() {
  let registerName = document.getElementById('name').value;
  let registerEmail = document.getElementById('email').value;
  let registerPassword = document.getElementById('password').value;

  let signUpData = [
    {
    'name': registerName,
    'email': registerEmail,
    'password': registerPassword,
  }]

  userData.push(signUpData);
 
  document.getElementById('msgBox').textContent = 'Du hast Dich erfolgreich registriert';

  let userDataAsString = JSON.stringify(allUsers);
  localStorage.setItem('user-data', userDataAsString);
  loadUserData();
}
*/