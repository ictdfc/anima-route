const form = document.getElementById("form");
const firstNameInput = document.getElementById("fninput");
const lastNameInput = document.getElementById("lninput");
const emailInput = document.getElementById("einput");
const passwordInput = document.getElementById("pwinput");
const repeatPasswordInput = document.getElementById("rpwinput");
const errorMsg = document.getElementById("errorMsg");

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA-LCzW2hPlP7fNoNCvMnaVws_KIac1kcw",
    authDomain: "animaroute-b8c2e.firebaseapp.com",
    projectId: "animaroute-b8c2e",
    storageBucket: "animaroute-b8c2e.firebasestorage.app",
    messagingSenderId: "175353624443",
    appId: "1:175353624443:web:4b6ec67850d9f337d3afde",
    measurementId: "G-G91XYSFZFZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    let errors = [];
    [firstNameInput, lastNameInput, emailInput, passwordInput, repeatPasswordInput].forEach(input => {
        input.classList.remove("error");
        input.parentElement.classList.remove("error");
    });

    if (firstNameInput.value.trim() === "") {
        errors.push("First name is required.");
        firstNameInput.classList.add("error");
        firstNameInput.parentElement.classList.add("error");
    }
    if (lastNameInput.value.trim() === "") {
        errors.push("Last name is required.");
        lastNameInput.classList.add("error");
        lastNameInput.parentElement.classList.add("error");
    }
    if (emailInput.value.trim() === "") {
        errors.push("Email is required.");
        emailInput.classList.add("error");
        emailInput.parentElement.classList.add("error");
    }
    if (passwordInput.value.trim() === "") {
        errors.push("Password is required.");
        passwordInput.classList.add("error");
        passwordInput.parentElement.classList.add("error");
    }
    if (repeatPasswordInput.value.trim() === "") {
        errors.push("Please confirm your password.");
        repeatPasswordInput.classList.add("error");
        repeatPasswordInput.parentElement.classList.add("error");
    }
    if (passwordInput.value !== repeatPasswordInput.value) {
        errors.push("Passwords do not match.");
        passwordInput.classList.add("error");
        passwordInput.parentElement.classList.add("error");
        repeatPasswordInput.classList.add("error");
        repeatPasswordInput.parentElement.classList.add("error");
    }

    if (errors.length > 0) {
        errorMsg.innerText = errors.join(" | ");
        return;
    } else {
        errorMsg.innerText = "";
    }

    const email = emailInput.value;
    const password = passwordInput.value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        errorMsg.style.color = "green";
        errorMsg.innerText = "Account created successfully! Redirecting...";
        setTimeout(() => {
            window.location.href = "homepage.html";
        }, 1000);
    })
    .catch((error) => {
        errorMsg.innerText = error.message;
    });
});