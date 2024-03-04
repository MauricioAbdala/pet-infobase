import { activateButton, replaceTo } from "./functional.js";
import { eventPost, postRequest } from "./api.js";
import { getFromStorage } from "./storage.js";


const reForm = document.getElementById('register_form');
const reFormBttn = document.getElementById('register_button');
const backLogin = document.querySelectorAll('.back-to-login');


const lgUrl = "../../../index.html";
const homeUrl = "../home/home.html";


const reKey = "@registeredUsers:userFound";
const rePoint = 'users/create';
const lgKey = "@users:userFound";

function validateLogin(key, url) {
  const user = getFromStorage(key);
  if (user.length > 0) {
    window.location.assign(url);
  }
}

validateLogin(lgKey, homeUrl);

eventPost(reForm, reFormBttn, rePoint, reKey, lgUrl, postRequest);
activateButton(reForm, reFormBttn);
replaceTo(backLogin, lgUrl);
