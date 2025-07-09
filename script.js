
// script.js

import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

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

const auth = window.auth;
const db = getFirestore();

window.loginWithEmail = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    showDashboard(email);
  } catch (err) {
    alert('Login error: ' + err.message);
  }
};

window.registerWithEmail = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "restaurants", result.user.uid), {
      email: email,
      type: "email"
    });
    alert('Registration successful!');
  } catch (err) {
    alert('Registration error: ' + err.message);
  }
};

window.sendOTP = () => {
  const phone = document.getElementById('phone').value;
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
  const restaurantName = document.getElementById('restaurantName').value;
  if (window.confirmationResult) {
    window.confirmationResult.confirm(code)
      .then(async (result) => {
        const phone = result.user.phoneNumber;
        await setDoc(doc(db, "restaurants", result.user.uid), {
          phone: phone,
          name: restaurantName,
          type: "phone"
        });
        showDashboard(phone);
      }).catch((error) => {
        alert('Invalid OTP: ' + error.message);
      });
  }
};

window.logout = () => {
  signOut(auth).then(() => {
    document.getElementById("dashboard").style.display = "none";
    alert("Logged out.");
  });
};

function showDashboard(identity) {
  document.getElementById("dashboard").style.display = "block";
  document.getElementById("welcomeMessage").innerText = `Welcome, ${identity}`;
}
