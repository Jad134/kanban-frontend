
/**
 * This function returns the HTML template for the login form
 * 
 * @returns {string} The HTML template
 */
function renderHtmlTemplate() {
    return /*html*/`
    <div class="border-radius-30 login">
    <h1 class="padding-top">Log in</h1>
    <div class="underline border-radius-8"></div>
      <form onsubmit="login(event)">
        <input id="user-email" class="login-input bg-email-icon icon" type="email" placeholder="Email" name="userEmail" required/>
        <div class="pw-input">
          <input id="password-login" class="passwords" minlength="5" type="password" placeholder="Password" name="userPassword" onkeyup="changePasswordIcon(this)" required/>
          <div class="pw-img" onclick="togglePassword(this)"></div>
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
  
  
  /**
   * This function returns the HTML template for the sign-up form
   * 
   * @returns {string} The HTML template
   */
  function signUpHtmlTemplate() {
    return /*html*/`
             <div class="border-radius-30 login">
              <div class="arrow-position">
                    <a href="index.html">
                     <img src="assets/img/arrow-left.svg" class="arrow-left" alt="left arrow">
                    </a>
                    <h1 class="responsive-padding">Sign up</h1>
                </div>
                <div class="underline border-radius-8"></div>
                <form class="signup-form" onsubmit="checkCheckbox(); return false">
                  <input id="name" minlength="2" class="login-input bg-person-icon" type="text" placeholder="Name" name="userName"required/>
                  <input id="email" class="login-input bg-email-icon" type="email" placeholder="Email" name="userEmail" required/>
                  <div class="pw-input">
                    <input id="password-signup" class="passwords" minlength="5" type="password" placeholder="Password" name="userPassword" onkeyup="changePasswordIcon(this)" required/>
                    <div class="pw-img" onclick="togglePassword(this)"></div>
                  </div>
                  <div class="pw-input">
                    <input id="confirm-password" class="passwords" minlength="5" type="password" placeholder="Password" name="userPassword" onkeyup="changePasswordIcon(this)" required/>
                    <div class="pw-img" onclick="togglePassword(this)"></div>
                  </div>
                  <div class="checkbox-container-accept">
                   <label class="checkbox-label">
                     <input id="checkbox" name="checkbox" type="checkbox"/>I accept the<a class="startpage-links" href="privacy-policy.html" target="_blank">Privacy Policy</a>
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

  