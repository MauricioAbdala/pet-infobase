function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function storageAdd(key, user) {
    let users = getFromStorage(key);
    let indexFound = users.findIndex(obj => obj.id === user.id);
    if (indexFound < 0) {
      users = [user, ...users];
    } else {
      users[indexFound] = user;
    }
    localStorage.setItem(key, JSON.stringify(users));
  }

export {
    getFromStorage, storageAdd
}