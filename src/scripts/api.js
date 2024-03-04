import { toltipRender } from "./toltip.js";
import { spinnerIn } from "./functional.js";
import { storageAdd, getFromStorage } from "./storage.js";

const baseUrl = "http://localhost:3333/";
const apiJson = { 'Content-Type': 'application/json' };
const editNDeletePoint = 'posts/';

async function eventPost(form, btn, end, key, url, callback) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const obj = {};
    const elements = [...form.elements];
    elements.forEach((elt) => {
      if (elt.tagName == "INPUT" && elt.value !== '') {
        obj[elt.name] = elt.value;
      }
    });
    await callback(obj, btn, end, key, url);
  });
}

async function getRequest(key, end) {
  const result = getFromStorage(key);
  try {
    const request = await fetch(baseUrl + end, {
      method: 'GET',
      headers: {
        ...apiJson,
        'Authorization': `Bearer ${result[0].token}`
      }
    });
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function postRequest(obj, btn, end, key, url) {
  try {
    const request = await fetch(baseUrl + end, {
      method: 'POST',
      headers: apiJson,
      body: JSON.stringify(obj)
    });
    if (request.ok) {
      toltipRender(request.url, request.status);
      spinnerIn(btn);
      const response = await request.json();
      storageAdd(key, response);
      setTimeout(() => {
        window.location.assign(url);
      }, 4000);
    } else {
      toltipRender(request.url, request.status);
    }
  } catch (error) {
    console.log(error);
  }
}

async function postCreateRequest(obj, btn, end, key) {
  const authorization = getFromStorage(key);
  try {
    const request = await fetch(baseUrl + end, {
      method: 'POST',
      headers: {
        ...apiJson,
        'Authorization': `Bearer ${authorization[0].token}`
      },
      body: JSON.stringify(obj)
    });
    if (request.ok) {
      toltipRender(request.url, request.status);
      spinnerIn(btn);
      const response = await request.json();
      return response;
    } else {
      toltipRender(request.url, request.status);
    }
  } catch (error) {
    console.log(error);
  }
}

async function patchRequest(obj, button, id) {
    const authorization = getFromStorage("@users:userFound")[0].token;
    try {
      const request = await fetch(`${baseUrl}${editNDeletePoint}${id}`, {
        method: 'PATCH',
        headers: {
          ...apiJson,
          'Authorization': `Bearer ${authorization}`
        },
        body: JSON.stringify(obj)
      });
      if (request.ok) {
        spinnerIn(button);
        const response = await request.json();
        return response;
      } else {
        console.log(request);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  async function deleteRequest(id) {
    const authorization = getFromStorage("@users:userFound")[0].token;
    try {
      const request = await fetch(`${baseUrl}${editNDeletePoint}${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authorization}`
        }
      });
      if (request.ok) {
        const response = await request.json();
        return response;
      } else {
        console.log(request);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  export {
    postRequest,
    eventPost,
    getRequest,
    postCreateRequest,
    patchRequest,
    deleteRequest
  };
  