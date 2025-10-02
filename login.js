const form = document.getElementById("form")
const emailInput = document.getElementById("einput")
const passwordInput = document.getElementById("pwinput")
const errorMsg = document.getElementById("errorMsg");

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

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

form.addEventListener("submit", function(e){
    e.preventDefault();
    let errors = [];

    [emailInput, passwordInput].forEach(input => {
        input.classList.remove("error");
        input.parentElement.classList.remove("error");
    });

    if (emailInput.value.trim()===""){
        errors.push("Email is required.");
        emailInput.classList.add("error");
        emailInput.parentElement.classList.add("error");
    }
    if (passwordInput.value.trim()===""){
        errors.push("Password is required.");
        passwordInput.classList.add("error");
        passwordInput.parentElement.classList.add("error");
    }

    if (errors.length > 0) {
        errorMsg.innerText = errors.join(" | ");
        return;
    }
    else{
        errorMsg.innerText="";
    }

    const email = emailInput.value;
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        errorMsg.style.color = "green";
        errorMsg.innerText = "Login successfully! Redirecting...";
        setTimeout(() => {
            window.location.href = "homepage.html";
        }, 1000);
    })
    
    .catch((error) => {
        errorMsg.innerText = error.message;
    });
})

