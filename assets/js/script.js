

function init(){
    renderContent();
    const main = document.querySelector('.main-container');
    main.style.opacity = "0";
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
    middleContent.innerHTML+= `
    <div class="border-radius-30 login">
    <h1 class="padding-top">Log in</h1>
    <div class="underline border-radius-8"></div>
    <form onsubmit="" method="post">
        <input class="login-input bg-email-icon icon" type="text" placeholder="Email" required/>
        <input class="login-input bg-password-icon icon" type="password" placeholder="Password" required/>
      <div class="checkbox-container">
        <label class="checkbox-label">
          <input name="checkbox" type="checkbox" />Remember me
        </label>
        <a class="startpage-links" href="#">I forgot my password</a>
      </div>
      <div class="login-buttons">
        <button onclick="login()" id="login" class="h-button border-radius-8">Log in</button>
        <button onclick="" id="guest-login" class="h-button-white border-radius-8">Guest Log in</button>
      </div>
    </form>
    `;
}

function renderSignUp() {
    const middleContent = document.getElementById('middle-area');
    middleContent.innerHTML='';
    middleContent.innerHTML+= `
            <div class="border-radius-30 login">
                <a href="index.html">
                    <img src="assets/img/arrow-left.svg" class="arrow-left" alt="left arrow">
                </a>
              <h1>Sign up</h1>
              <div class="underline border-radius-8"></div>
              <form onsubmit="signUp(); return false">
                
                <input id="name" min-length="2" class="login-input bg-password-icon icon" type="text" placeholder="Name" required/>
                <input id="email" class="login-input bg-email-icon icon" type="email" placeholder="Email" required/>
                <input id="password" min-length="5" class="login-input bg-password-icon icon" type="password" placeholder="Password" required/>
                <input class="login-input bg-password-icon icon" type="password" placeholder="Confirm Password" required/>
    
                <div class="checkbox-container-accept">
                  <label class="checkbox-label">
                    <input name="checkbox" type="checkbox" />I accept the<a class="startpage-links" href="#">Privacy Policy</a>
                  </label>
                </div>

                <div class="login-buttons">
                  <button id="signUpButton" class="h-button border-radius-8">Sign up</button>
                </div>
              </form>

            </div>
          </div>
    `;
}


let allMembersData = [];

function signUp() {

 let registerName = document.getElementById('name').value;
 let registerEmail = document.getElementById('email').value;
 let registerPassword = document.getElementById('password').value;

 let signUpData = {
  'name': registerName,
  'email': registerEmail,
  'password': registerPassword,
 }
 allMembersData.push(signUpData);
 window.location.href ='index.html?msg=Du hast Dich erfolgreich registriert';
 document.getElementById('msgBox').textContent = 'Du hast Dich erfolgreich registriert';

 let allMembersDataAsString = JSON.stringify(allMembers);
 localStorage.setItem('all-members-data', allMembersDataAsString);
}


const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');
if(msg) {
  msgBox.innerHTML = msg;
}


function loadAllMembersData() {
let allMembersDataAsString = localStorage.getItem('all-members-data');
allMembersData = JSON.parse(allMembersDataAsString);
}


/* 
let users = [];


async function init(){
    loadUsers();
}

async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}


async function register() {
    signUpButton.disabled = true;
    users.push({
        email: register-email.value,
        password: password.value,
    });
    await setItem('users', JSON.stringify(users));
    resetForm();
}

function resetForm() {
    email.value = '';
    password.value = '';
    signUpButton.disabled = false;
}
 */