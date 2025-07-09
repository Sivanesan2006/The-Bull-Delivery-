
// script.js

window.addEventListener('DOMContentLoaded', () => {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isDarkMode) {
    document.body.classList.add('dark');
  }

  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const section = document.querySelector(link.getAttribute('href'));
      section.scrollIntoView({ behavior: 'smooth' });
    });
  });
});

window.loginWithEmail = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const auth = window.auth;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert('Login successful!');
  } catch (err) {
    alert('Login error: ' + err.message);
  }
};

window.registerWithEmail = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const auth = window.auth;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert('Registration successful!');
  } catch (err) {
    alert('Registration error: ' + err.message);
  }
};

window.sendOTP = () => {
  const phone = document.getElementById('phone').value;
  const auth = window.auth;

  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    size: 'invisible',
    callback: (response) => {}
  }, auth);

  signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert('OTP sent!');
    }).catch((error) => {
      alert('Error sending OTP: ' + error.message);
    });
};

window.verifyOTP = () => {
  const code = document.getElementById('otp').value;
  if (window.confirmationResult) {
    window.confirmationResult.confirm(code)
      .then((result) => {
        alert('Phone login successful!');
      }).catch((error) => {
        alert('Invalid OTP: ' + error.message);
      });
  }
};
