import * as api from "./api.js";
import { activateButton, changePage } from "./functional.js";
import { getFromStorage } from "./storage.js";

const registrationButton = document.getElementById('siginup');
const registrationUrl = "./src/pages/register/register.html";
const homeUrl = "./src/pages/home/home.html";
const loginPath = 'login';
const userKey = "@users:userFound";
const loginForm = document.getElementById('login_form');
const loginButton = document.getElementById('login_button');

function validateLogin(key, url) {
    const user = getFromStorage(key);
    if (user.length > 0) {
        window.location.assign(url);
    }
}

validateLogin(userKey, homeUrl);
api.eventPost(loginForm, loginButton, loginPath, userKey, homeUrl, api.postRequest);
activateButton(loginForm, loginButton);
changePage(registrationButton, registrationUrl);
