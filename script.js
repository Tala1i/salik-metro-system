const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signup');

signUpButton.addEventListener('click', function () {
  signInForm.style.display = "none";
  signUpForm.style.display = "block";
});
signInButton.addEventListener('click', function () {
  signInForm.style.display = "block";
  signUpForm.style.display = "none";
});

// ✅ تحقق كلمة المرور في صفحة التسجيل فقط
const passwordInput = document.getElementById("rPassword"); // <-- هنا التعديل
const passwordMsg = document.getElementById("password-msg");
const submitBtn = document.getElementById("submitSignUp");

function validatePassword() {
  const pass = passwordInput.value;

  if (pass.length < 8) {
    passwordMsg.textContent = "Password must be at least 8 characters.";
    submitBtn.disabled = true;
  } else if (!/\d/.test(pass)) {
    passwordMsg.textContent = "Password must include at least one number.";
    submitBtn.disabled = true;
  } else if (!/[A-Z]/.test(pass)) {
    passwordMsg.textContent = "Password must include at least one uppercase letter.";
    submitBtn.disabled = true;
  } else {
    passwordMsg.textContent = "";
    submitBtn.disabled = false;
  }
}

if (passwordInput && submitBtn) {
  submitBtn.disabled = true;
  passwordInput.addEventListener("input", validatePassword);
}

