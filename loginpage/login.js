document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
  });
  
  document.addEventListener('gesturechange', function (e) {
  e.preventDefault();
  });
  
  document.addEventListener('gestureend', function (e) {
  e.preventDefault();
  });  



function togglePass(){
  const passwordInput = document.getElementById("password");
  const toggleBtn = document.getElementById("togglePassword");
  const icon = toggleBtn.querySelector("i");

  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";

    // Toggle icons
    if (isPassword) {
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });
}


function toggleResetPass(){
  const passwordInput = document.getElementById("passwordReset");
  const toggleBtn = document.getElementById("toggleResetPassword");
  const icon = toggleBtn.querySelector("i");

  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";

    // Toggle icons
    if (isPassword) {
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });


}

function toggleConfirmResetPass(){
  const passwordInput = document.getElementById("confirmPasswordReset");
  const toggleBtn = document.getElementById("toggleConfirmResetPassword");
  const icon = toggleBtn.querySelector("i");

  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";

    // Toggle icons
    if (isPassword) {
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });


}

toggleConfirmResetPass()
toggleResetPass()
togglePass()


async function validatePasswords() {
  const password = document.getElementById('passwordReset').value;
  const confirm = document.getElementById('confirmPasswordReset').value;

  if (password !== confirm) {
    console.log("Passwords do not match.");
    return false;
  }

  let request = await fetch("http://34.163.87.189:3000/updatePassword", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({password: await hash(password)})

  })

  let response = await request.json()

  if (response.status == "ok")
  {
    document.querySelector(".loginwindow").style.display = "block"
    document.querySelector(".resetPasswordWindow").style.display = "none"

  }

  return true;
}

function realTimePasswordCheck(){
  const passwordInput = document.getElementById('passwordReset');
  const confirmInput = document.getElementById('confirmPasswordReset');
  const errorMsg = document.getElementById('match-error');

  function checkMatch() {
    const password = passwordInput.value;
    const confirm = confirmInput.value;

    if (confirm === "") {
      confirmInput.classList.remove('valid', 'invalid');
      errorMsg.style.display = "none";
    } else if (password === confirm) {
      confirmInput.classList.add('valid');
      confirmInput.classList.remove('invalid');
      errorMsg.style.display = "none";
    } else {
      confirmInput.classList.add('invalid');
      confirmInput.classList.remove('valid');
      errorMsg.style.display = "block";
    }
  }

  passwordInput.addEventListener('input', checkMatch);
  confirmInput.addEventListener('input', checkMatch);
}
realTimePasswordCheck()

function verifyPassReqs(){
  const passwordInput = document.getElementById('passwordReset');
  const lengthReq = document.getElementById('length');
  const lettersNumbersReq = document.getElementById('letters-numbers');
  const specialCharReq = document.getElementById('special-char');

  passwordInput.addEventListener('input', () => {
    const value = passwordInput.value;

    // Check length
    if (value.length >= 8) {
      lengthReq.classList.add('valid');
    } else {
      lengthReq.classList.remove('valid');
    }

    // Check letters and numbers
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    if (hasLetter && hasNumber) {
      lettersNumbersReq.classList.add('valid');
    } else {
      lettersNumbersReq.classList.remove('valid');
    }

    // Check special character
    const hasSpecial = /[^A-Za-z0-9]/.test(value);
    if (hasSpecial) {
      specialCharReq.classList.add('valid');
    } else {
      specialCharReq.classList.remove('valid');
    }
  });
}

verifyPassReqs()


async function sendmail() {

  let request = await fetch("http://34.163.87.189:3000/sendVerificationCode", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
  })
}

async function verifyEmail() {

  let codeInput = document.querySelector(".verificationNumberInput").value
  let code = codeInput.replace("-", "")
  let resetWindow = document.querySelector(".resetPasswordWindow")
  let forgetPasswordWindow = document.querySelector(".forgetPasswordWindow")
  let wrongCodeMessage = document.getElementById('wrongcode')

  

  let request = await fetch("http://34.163.87.189:3000/verifyCode", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({code: code})
  })

  let status = await request.json()

  // resetWindow.style.display = "block"
  // forgetPasswordWindow.style.display = "none"
  // wrongCodeMessage.style.display = "none"

  if (status.status == "ok")
  {
    resetWindow.style.display = "block"
    forgetPasswordWindow.style.display = "none"
    wrongCodeMessage.style.display = "none"


  }

  else{

    wrongCodeMessage.style.display = "block"
  }

  
}

// document.querySelector(".forgetPassword").click()

function backToLoginPage(){
  let loginWindow = document.querySelector(".loginwindow")
  let forgetPasswordWindow = document.querySelector(".forgetPasswordWindow")

  loginWindow.style.display = "block"
  forgetPasswordWindow.style.display = "none"
}

function forgetPassword()
{

  

  let loginWindow = document.querySelector(".loginwindow")
  let forgetPasswordWindow = document.querySelector(".forgetPasswordWindow")

  loginWindow.style.display = "none"
  forgetPasswordWindow.style.display = "block"
  sendmail()



}

//removing the ability to type letters

document.querySelector(".verificationNumberInput").addEventListener("input", function () {

  // Remove all non-digit characters
  let rawValue = this.value.replace(/\D/g, '');
  
  // Format: Add hyphen after 3 digits (but only if typing forward)
  let formattedValue = "";
  if (rawValue.length > 3) {
      formattedValue = rawValue.substring(0, 3) + "-" + rawValue.substring(3, 6);
  } else {
      formattedValue = rawValue;
  }
  
  // Update input value (max 6 digits total)
  this.value = formattedValue;
  
});

// hash function (idk)
async function hash(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

async function authenticateLogIn()
{

  let emailDiv = document.querySelector("#email")
  let passwordDiv = document.querySelector("#password")

  

  let info = new URLSearchParams({
    email: emailDiv.value,
    password: await hash(passwordDiv.value)
  })

  let request = await fetch(`http://34.163.87.189:3000/authenticateAdminUser?${info}`, {
    method: "GET"
  })


  let status = await request.json()

  
  if (status.emailStatus == "incorrect")
  {

    document.querySelector(".inputcontainer").children[0].addEventListener("change", () => {

      document.querySelector(".inputcontainer").classList.remove("incompleteDiv")
    document.querySelector(".inputcontainer").children[0].classList.remove("incompleteInput")

    })

    document.querySelector(".inputcontainer").classList.add("incompleteDiv")
    document.querySelector(".inputcontainer").children[0].classList.add("incompleteInput")
  }

  if (status.passwordStatus == "incorrect")
  {

    document.querySelectorAll(".inputcontainer")[1].children[0].addEventListener("change", () => {

      document.querySelectorAll(".inputcontainer")[1].classList.remove("incompleteDiv")
      document.querySelectorAll(".inputcontainer")[1].children[0].classList.remove("incompleteInput")

    })

    document.querySelectorAll(".inputcontainer")[1].classList.add("incompleteDiv")
    document.querySelectorAll(".inputcontainer")[1].children[0].classList.add("incompleteInput")
  }


}