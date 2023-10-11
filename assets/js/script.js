
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
    displayMessage('You registered successfully!');
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
    displayMessage('This email address has already been used')
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
    displayMessage('The passwords do not match');
    return false;
  }
}


function checkCheckbox() {
  let checkBox = document.getElementById('checkbox');
  if (!checkBox.checked) {
    displayMessage('Please accept the privacy policy');
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
    message.style.transform = 'translate(-50%, -50%)';
  }, 200);
  setTimeout(() => {
    hideMessage();
  }, 1500);
}


function hideMessage() {
  const overlay = document.getElementById('overlay');
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
    displayMessage('You logged in successfully!')
    loginToLocalStorage(dataExists);
    setTimeout(() => {
      window.location.href = '/summary.html';
    }, 3000);
  }
  else {
    displayMessage('Wrong Email or password')
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


function togglePasswordImage() {
  let passwordInput = document.getElementById('user-password');
  let togglePassword = document.getElementById('toggle-password');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    togglePassword.innerHTML = renderVisibilityOffSvg();
  } else {
    passwordInput.type = 'password';
    togglePassword.innerHTML = renderVisibilitySvg();
  }
}


function clickPasswordField() {
  let passwordField = document.getElementById('user-password');
  let toggleImage = document.getElementById('toggle-password');

  passwordField.removeAttribute('oninput');
  passwordField.setAttribute('onblur', 'clickOut()')

  toggleImage.innerHTML = renderVisibilitySvg();
  toggleImage.setAttribute('onclick', 'togglePasswordImage()');
  toggleImage.classList.add('toggle-password-visibility');
}


function clickOut() {
  let passwordField = document.getElementById('user-password');
  let toggleImage = document.getElementById('toggle-password');

  if (passwordField.value == '') {
    passwordField.setAttribute('oninput', 'clickPasswordField()');

    toggleImage.innerHTML = renderLockSvg();
    toggleImage.removeAttribute('onclick');
    toggleImage.classList.remove('toggle-password-visibility');
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
      <div class="pw-input" id="pw-input">
        <input id="user-password" minlength="5" type="password" placeholder="Password" name="userPassword" oninput="clickPasswordField()" required/>
        <div class="toggle-password" id="toggle-password">
          <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.14453 21.8083C1.59453 21.8083 1.1237 21.6125 0.732031 21.2208C0.340365 20.8292 0.144531 20.3583 0.144531 19.8083V9.80835C0.144531 9.25835 0.340365 8.78752 0.732031 8.39585C1.1237 8.00418 1.59453 7.80835 2.14453 7.80835H3.14453V5.80835C3.14453 4.42502 3.63203 3.24585 4.60703 2.27085C5.58203 1.29585 6.7612 0.80835 8.14453 0.80835C9.52786 0.80835 10.707 1.29585 11.682 2.27085C12.657 3.24585 13.1445 4.42502 13.1445 5.80835V7.80835H14.1445C14.6945 7.80835 15.1654 8.00418 15.557 8.39585C15.9487 8.78752 16.1445 9.25835 16.1445 9.80835V19.8083C16.1445 20.3583 15.9487 20.8292 15.557 21.2208C15.1654 21.6125 14.6945 21.8083 14.1445 21.8083H2.14453ZM2.14453 19.8083H14.1445V9.80835H2.14453V19.8083ZM8.14453 16.8083C8.69453 16.8083 9.16537 16.6125 9.55703 16.2208C9.9487 15.8292 10.1445 15.3583 10.1445 14.8083C10.1445 14.2583 9.9487 13.7875 9.55703 13.3959C9.16537 13.0042 8.69453 12.8083 8.14453 12.8083C7.59453 12.8083 7.1237 13.0042 6.73203 13.3959C6.34036 13.7875 6.14453 14.2583 6.14453 14.8083C6.14453 15.3583 6.34036 15.8292 6.73203 16.2208C7.1237 16.6125 7.59453 16.8083 8.14453 16.8083ZM5.14453 7.80835H11.1445V5.80835C11.1445 4.97502 10.8529 4.26668 10.2695 3.68335C9.6862 3.10002 8.97786 2.80835 8.14453 2.80835C7.3112 2.80835 6.60286 3.10002 6.01953 3.68335C5.4362 4.26668 5.14453 4.97502 5.14453 5.80835V7.80835Z" fill="#A8A8A8"/>
          </svg>
        </div>
      </div>
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


function renderVisibilitySvg() {
  return /*html*/ `
    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.2443 10.1084L13.7943 8.65845C13.9443 7.87511 13.7193 7.14178 13.1193 6.45845C12.5193 5.77511 11.7443 5.50845 10.7943 5.65845L9.34434 4.20845C9.62767 4.07511 9.91517 3.97511 10.2068 3.90845C10.4985 3.84178 10.811 3.80845 11.1443 3.80845C12.3943 3.80845 13.4568 4.24595 14.3318 5.12095C15.2068 5.99595 15.6443 7.05845 15.6443 8.30845C15.6443 8.64178 15.611 8.95428 15.5443 9.24595C15.4777 9.53761 15.3777 9.82511 15.2443 10.1084ZM18.4443 13.2584L16.9943 11.8584C17.6277 11.3751 18.1902 10.8459 18.6818 10.2709C19.1735 9.69595 19.5943 9.04178 19.9443 8.30845C19.111 6.62511 17.9152 5.28761 16.3568 4.29595C14.7985 3.30428 13.061 2.80845 11.1443 2.80845C10.661 2.80845 10.186 2.84178 9.71934 2.90845C9.25267 2.97511 8.79434 3.07511 8.34434 3.20845L6.79434 1.65845C7.47767 1.37511 8.17767 1.16261 8.89434 1.02095C9.611 0.879281 10.361 0.808447 11.1443 0.808447C13.5277 0.808447 15.6693 1.43761 17.5693 2.69595C19.4693 3.95428 20.8943 5.59178 21.8443 7.60845C21.8943 7.69178 21.9277 7.79595 21.9443 7.92095C21.961 8.04595 21.9693 8.17511 21.9693 8.30845C21.9693 8.44178 21.9568 8.57095 21.9318 8.69595C21.9068 8.82095 21.8777 8.92511 21.8443 9.00845C21.461 9.85845 20.9818 10.6418 20.4068 11.3584C19.8318 12.0751 19.1777 12.7084 18.4443 13.2584ZM18.2443 18.7084L14.7443 15.2584C14.161 15.4418 13.5735 15.5793 12.9818 15.6709C12.3902 15.7626 11.7777 15.8084 11.1443 15.8084C8.761 15.8084 6.61934 15.1793 4.71934 13.9209C2.81934 12.6626 1.39434 11.0251 0.444336 9.00845C0.394336 8.92511 0.361003 8.82095 0.344336 8.69595C0.327669 8.57095 0.319336 8.44178 0.319336 8.30845C0.319336 8.17511 0.327669 8.05011 0.344336 7.93345C0.361003 7.81678 0.394336 7.71678 0.444336 7.63345C0.794336 6.88345 1.211 6.19178 1.69434 5.55845C2.17767 4.92511 2.711 4.34178 3.29434 3.80845L1.21934 1.70845C1.036 1.52511 0.944336 1.29595 0.944336 1.02095C0.944336 0.745947 1.04434 0.508447 1.24434 0.308447C1.42767 0.125114 1.661 0.0334473 1.94434 0.0334473C2.22767 0.0334473 2.461 0.125114 2.64434 0.308447L19.6443 17.3084C19.8277 17.4918 19.9235 17.7209 19.9318 17.9959C19.9402 18.2709 19.8443 18.5084 19.6443 18.7084C19.461 18.8918 19.2277 18.9834 18.9443 18.9834C18.661 18.9834 18.4277 18.8918 18.2443 18.7084ZM4.69434 5.20845C4.211 5.64178 3.76934 6.11678 3.36934 6.63345C2.96934 7.15011 2.62767 7.70845 2.34434 8.30845C3.17767 9.99178 4.3735 11.3293 5.93184 12.3209C7.49017 13.3126 9.22767 13.8084 11.1443 13.8084C11.4777 13.8084 11.8027 13.7876 12.1193 13.7459C12.436 13.7043 12.761 13.6584 13.0943 13.6084L12.1943 12.6584C12.011 12.7084 11.836 12.7459 11.6693 12.7709C11.5027 12.7959 11.3277 12.8084 11.1443 12.8084C9.89434 12.8084 8.83184 12.3709 7.95684 11.4959C7.08184 10.6209 6.64434 9.55845 6.64434 8.30845C6.64434 8.12511 6.65684 7.95011 6.68184 7.78345C6.70684 7.61678 6.74434 7.44178 6.79434 7.25845L4.69434 5.20845Z" fill="#A8A8A8"/>
    </svg>
  `
}


function renderVisibilityOffSvg() {
  return /*html*/ `
    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.1443 12.8083C12.3943 12.8083 13.4568 12.3708 14.3318 11.4958C15.2068 10.6208 15.6443 9.55835 15.6443 8.30835C15.6443 7.05835 15.2068 5.99585 14.3318 5.12085C13.4568 4.24585 12.3943 3.80835 11.1443 3.80835C9.89434 3.80835 8.83184 4.24585 7.95684 5.12085C7.08184 5.99585 6.64434 7.05835 6.64434 8.30835C6.64434 9.55835 7.08184 10.6208 7.95684 11.4958C8.83184 12.3708 9.89434 12.8083 11.1443 12.8083ZM11.1443 11.0083C10.3943 11.0083 9.75684 10.7458 9.23184 10.2208C8.70684 9.69585 8.44434 9.05835 8.44434 8.30835C8.44434 7.55835 8.70684 6.92085 9.23184 6.39585C9.75684 5.87085 10.3943 5.60835 11.1443 5.60835C11.8943 5.60835 12.5318 5.87085 13.0568 6.39585C13.5818 6.92085 13.8443 7.55835 13.8443 8.30835C13.8443 9.05835 13.5818 9.69585 13.0568 10.2208C12.5318 10.7458 11.8943 11.0083 11.1443 11.0083ZM11.1443 15.8083C8.82767 15.8083 6.711 15.1959 4.79434 13.9708C2.87767 12.7458 1.42767 11.0917 0.444336 9.00835C0.394336 8.92502 0.361003 8.82085 0.344336 8.69585C0.327669 8.57085 0.319336 8.44168 0.319336 8.30835C0.319336 8.17502 0.327669 8.04585 0.344336 7.92085C0.361003 7.79585 0.394336 7.69168 0.444336 7.60835C1.42767 5.52502 2.87767 3.87085 4.79434 2.64585C6.711 1.42085 8.82767 0.80835 11.1443 0.80835C13.461 0.80835 15.5777 1.42085 17.4943 2.64585C19.411 3.87085 20.861 5.52502 21.8443 7.60835C21.8943 7.69168 21.9277 7.79585 21.9443 7.92085C21.961 8.04585 21.9693 8.17502 21.9693 8.30835C21.9693 8.44168 21.961 8.57085 21.9443 8.69585C21.9277 8.82085 21.8943 8.92502 21.8443 9.00835C20.861 11.0917 19.411 12.7458 17.4943 13.9708C15.5777 15.1959 13.461 15.8083 11.1443 15.8083ZM11.1443 13.8083C13.0277 13.8083 14.7568 13.3125 16.3318 12.3208C17.9068 11.3292 19.111 9.99168 19.9443 8.30835C19.111 6.62502 17.9068 5.28752 16.3318 4.29585C14.7568 3.30418 13.0277 2.80835 11.1443 2.80835C9.261 2.80835 7.53184 3.30418 5.95684 4.29585C4.38184 5.28752 3.17767 6.62502 2.34434 8.30835C3.17767 9.99168 4.38184 11.3292 5.95684 12.3208C7.53184 13.3125 9.261 13.8083 11.1443 13.8083Z" fill="#A8A8A8"/>
    </svg>
  `
}


function renderLockSvg() {
  return /*html*/ `
    <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.14453 21.8083C1.59453 21.8083 1.1237 21.6125 0.732031 21.2208C0.340365 20.8292 0.144531 20.3583 0.144531 19.8083V9.80835C0.144531 9.25835 0.340365 8.78752 0.732031 8.39585C1.1237 8.00418 1.59453 7.80835 2.14453 7.80835H3.14453V5.80835C3.14453 4.42502 3.63203 3.24585 4.60703 2.27085C5.58203 1.29585 6.7612 0.80835 8.14453 0.80835C9.52786 0.80835 10.707 1.29585 11.682 2.27085C12.657 3.24585 13.1445 4.42502 13.1445 5.80835V7.80835H14.1445C14.6945 7.80835 15.1654 8.00418 15.557 8.39585C15.9487 8.78752 16.1445 9.25835 16.1445 9.80835V19.8083C16.1445 20.3583 15.9487 20.8292 15.557 21.2208C15.1654 21.6125 14.6945 21.8083 14.1445 21.8083H2.14453ZM2.14453 19.8083H14.1445V9.80835H2.14453V19.8083ZM8.14453 16.8083C8.69453 16.8083 9.16537 16.6125 9.55703 16.2208C9.9487 15.8292 10.1445 15.3583 10.1445 14.8083C10.1445 14.2583 9.9487 13.7875 9.55703 13.3959C9.16537 13.0042 8.69453 12.8083 8.14453 12.8083C7.59453 12.8083 7.1237 13.0042 6.73203 13.3959C6.34036 13.7875 6.14453 14.2583 6.14453 14.8083C6.14453 15.3583 6.34036 15.8292 6.73203 16.2208C7.1237 16.6125 7.59453 16.8083 8.14453 16.8083ZM5.14453 7.80835H11.1445V5.80835C11.1445 4.97502 10.8529 4.26668 10.2695 3.68335C9.6862 3.10002 8.97786 2.80835 8.14453 2.80835C7.3112 2.80835 6.60286 3.10002 6.01953 3.68335C5.4362 4.26668 5.14453 4.97502 5.14453 5.80835V7.80835Z" fill="#A8A8A8"></path>
    </svg>
  `
}


function signUpHtmlTemplate() {
  return /*html*/`
           <div class="border-radius-30 login">
               <a href="index.html">
                   <img src="assets/img/arrow-left.svg" class="arrow-left" alt="left arrow">
               </a>
             <h1 class="responsive-padding">Sign up</h1>
             <div class="underline border-radius-8"></div>
             <form onsubmit="checkCheckbox(); return false">

                <input id="name" minlength="2" class="login-input bg-person-icon" type="text" placeholder="Name" name="userName"required/>
                <input id="email" class="login-input bg-email-icon" type="email" placeholder="Email" name="userEmail" required/>
  
              <div class="input-icons">
                <input id="password" minlength="5" class="login-input password-input" type="password" placeholder="Password" name="userPassword" required/>
              </div>
              <div class="input-icons">
                <input id="password-confirm" minlength="5" class="login-input password-input" type="password" placeholder="Password" name="userPassword" required/>
              </div>

               <div class="checkbox-container-accept">
                 <label class="checkbox-label">
                   <input id="checkbox" name="checkbox" type="checkbox"/>I accept the<a class="startpage-links" href="privace-policy.html">Privacy Policy</a>
                 </label>
               </div>
               <div class="login-buttons">
                 <button type="submit" id="sign-up-button" class="sign-button border-radius-8" >Sign up</button>
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






