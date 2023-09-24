
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
    <form onsubmit="login(event)">
        <input id="user-email" class="login-input bg-email-icon icon" type="email" placeholder="Email" name="userEmail" required/>
        <input id="user-password" class="login-input bg-password-icon icon" minlength="5" type="password" placeholder="Password" name="userPassword" required/>
      <div class="checkbox-container">
        <label class="checkbox-label">
          <input name="checkbox" type="checkbox"/>Remember me
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
              <form onsubmit="signUpUser(); return false">
                
                <input id="name" minlength="2" class="login-input bg-password-icon icon" type="text" placeholder="Name" name="userName"required/>
                <input id="email" class="login-input bg-email-icon icon" type="email" placeholder="Email" name="userEmail"required/>
                <input id="password" minlength="5" class="login-input bg-password-icon icon" type="password" placeholder="Password" name="userPassword" required/>
                <input id="password-confirm" class="login-input bg-password-icon icon" type="password" placeholder="Confirm Password" required/>
    
                <div class="checkbox-container-accept">
                  <label class="checkbox-label">
                    <input id="checkbox" name="checkbox" type="checkbox" onclick="checkCheckbox()" />I accept the<a class="startpage-links" href="privace-policy.html">Privacy Policy</a>
                  </label>
                </div>

                <div class="login-buttons">
                  <button id="signUpButton" class="h-button border-radius-8" disabled>Sign up</button>
                </div>
              </form>
            </div>
          </div>
    `;
}


function signUpUser() {
  let registerEmail = document.getElementById('email');
  const emailValue = registerEmail.value;
  emailCheck(emailValue);
  passwordCheck();
}


function emailCheck(emailValue) {
  const ifEmailExists = userData.some((user) => user.email === emailValue);
  if (!ifEmailExists) {
    let registerName = document.getElementById('name');
    let registerPassword = document.getElementById('password');
    userData.push({ name: registerName.value, email: emailValue, password: registerPassword.value });
    console.log('eingegeben', userData);
    /*  setItem('user-data', JSON.stringify(userData));
  savingRemote(); */
    displayMessage('Erfolgreich registriert. Sie werden in 2 Sekunden zur Startseite weitergeleitet')
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 3000);
  } else {
    displayMessage('Diese E-Mail-Adresse wurde bereits verwendet')
  }
}


function passwordCheck() {
  let passwordInput = document.getElementById('password');
  let confirmPasswordInput = document.getElementById('password-confirm');
  let password = passwordInput.value;
  let confirmPassword = confirmPasswordInput.value;
  if (password === confirmPassword) {
     // Hier noch die alternative Form-Validation einbauen
    return true;
  } else {
    displayMessage('Die Passwörter stimmen nicht überein. Bitte überprüfen Sie Ihre Eingabe');
    // Hier noch die alternative Form-Validation einbauen
  }
}


function checkCheckbox() {
  let signUpButton = document.getElementById('signUpButton');
  let checkBox = document.getElementById('checkbox');
  checkBox.addEventListener('change', function () {
    signUpButton.disabled = !checkBox.checked;
    if (!checkBox.checked) {
      displayMessage('Bitte die Privacy Policy akzeptieren');
    } else {
      signUpUser();
    }
  });
}


function displayMessage(messageText) {
  const overlay = document.getElementById('overlay');
  const message = document.getElementById('animated-message');
  message.textContent = messageText;
  overlay.style.display = 'flex';
  setTimeout(() => {
    overlay.style.transform = 'translateY(0)';
    message.style.transform = 'translate(-50%, -50%)';
  }, 300);
  setTimeout(() => {
    hideMessage();
  }, 2500);
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
    setTimeout(() => {
      window.location.href = 'board.html';
    }, 3000);
  }
  else {
    displayMessage('Falsche Email oder Passwort')
  }
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
  } catch (e) }
    console.error('Remote Datenspeicherung Error:', e);
  }
} */







