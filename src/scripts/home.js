import { getFromStorage } from "./storage.js";
import { deleteRequest, getRequest, postCreateRequest } from "./api.js";
import { openModal } from "./modal.js";
import { editPostCreate } from "./forms.js";

const postsEnd = 'posts';
const usertokenKey = "@users:userFound";
const invertedOrderPosts = recentFirst(await getRequest(usertokenKey, postsEnd));
const lgUrl = "../../../index.html";
const headerHtml = document.getElementById("header_container");
const postsContainerHtml = document.getElementById('posts_container');
const creatEnd = 'posts/create';
const profileEnd = 'users/profile';
const myProfile = await getRequest(usertokenKey, profileEnd);

function headerRender(obj, tagHtml, callback) {
    tagHtml.innerHTML = '';
    const myHeader = callback(obj);
    tagHtml.append(myHeader);
}

function validateLogin(key, url) {
    const user = getFromStorage(key);
    if (user.length == 0) {
        window.location.assign(url)
    } else {
        renderPosts(invertedOrderPosts);
    }
}

function headerCreate(user) {
    const { username, email, password, avatar } = user
    const tagNav = document.createElement('nav');
    const tagTitle = document.createElement('h1');
    const tagMenu = document.createElement('div');
    const tagBtn = document.createElement('button');
    const tagLink = document.createElement('a'); 
    const exitContainer = document.createElement('div');
    const userNameHeader = document.createElement('p');
    const exitBox = document.createElement('div');
    const exitPic = document.createElement('div');
    const exitP = document.createElement('p');
    const tagImg = document.createElement('img');

    tagNav.classList = "container nav-content";
    tagTitle.classList = "grey-1 title-4";
    tagMenu.classList.add('menu');
    tagBtn.classList = "grey-9 text-1 button button-home";
    tagLink.classList.add('exit-link')
    exitContainer.classList.add('exit-container')
    tagImg.classList = "profile-picture";
    userNameHeader.classList = 'grey-1 text-1'
    exitBox.classList.add('exit-box')
    exitP.classList = 'grey-4 text-2'
    exitPic.classList.add('exit-pic')

    exitBox.addEventListener('click', (e) => {
        e.preventDefault();
        let myToken = getFromStorage(usertokenKey)
        if (myToken.length >= 1) {
            myToken.splice(0, 1)
        }
        localStorage.setItem(usertokenKey, JSON.stringify(myToken));
        window.location.replace("../../../index.html");
    })

    tagTitle.innerText = 'Petinfo';
    tagBtn.innerText = 'Criar publicação'
    tagImg.src = avatar;
    tagImg.alt = username;
    userNameHeader.innerText = '@' + username;
    exitP.innerText = 'Sair da conta';

    tagBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const newPost = newPostCreate(creatEnd, usertokenKey);
        openModal(newPost)
    })

    exitBox.append(exitPic, exitP)
    exitContainer.append(userNameHeader, exitBox);
    tagLink.append(tagImg, exitContainer)
    tagMenu.append(tagBtn, tagLink);
    tagNav.append(tagTitle, tagMenu);

    return tagNav
}

function postCreate(obj) {
    const { id, title, content, createdAt, user } = obj;
    const tagPost = document.createElement('li');
    const tagHead = document.createElement('div');
    const infoBox = document.createElement('div');
    const tagImg = document.createElement('img');
    const tagInfo = document.createElement('div');
    const userName = document.createElement('h3');
    const tagDate = document.createElement('span');
    const postContent = document.createElement('div');
    const postTitle = document.createElement('h2');
    const postDescription = document.createElement('p');
    const tagLink = document.createElement('a');
    const plusLink = document.createElement('a');

    tagPost.classList.add("feed-post");
    tagHead.classList.add('user-post-header');
    infoBox.classList.add("user-post-info-box");
    tagInfo.classList.add("user-post-info");
    userName.classList = 'grey-1 text-2';
    tagDate.classList = "grey-4 text-2";
    postContent.classList.add("user-post-content");
    postTitle.classList = "grey-1 title-2";
    postDescription.classList = "grey-3 text-3";
    tagLink.classList = "brand-1 text-2";
    plusLink.classList = "brand-1 text-2 plus-link";

    tagLink.innerText = "Acessar publicação";
    plusLink.innerText = "...";

    const newdate = new Date(createdAt);
    const brDate = Intl.DateTimeFormat('pt-br', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(newdate);

    tagLink.addEventListener('click', (e) => {
        e.preventDefault(e);
        const postHtml = openPostCreate(obj, brDate);
        openModal(postHtml);
    });

    tagImg.src = user.avatar;
    userName.innerText = user.username;
    tagDate.innerText = brDate;
    postTitle.innerText = title;

    if (content.length > 145) {
        postDescription.innerText = `${content.substring(0, 145)}`;
        postDescription.appendChild(plusLink)
        plusLink.addEventListener('click', (e) => {
            e.preventDefault(e);
            const postHtml = openPostCreate(obj, brDate);
            openModal(postHtml);
        });
    }
    else {
        postDescription.innerText = content;
    }

    postContent.append(postTitle, postDescription, tagLink);
    tagInfo.append(userName, tagDate);
    infoBox.append(tagImg, tagInfo);

    if (user.id == myProfile.id) {
        const bttnBox = document.createElement('div');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        bttnBox.classList.add("user-post-buttons");
        editBtn.classList = "button button-card-edit";
        deleteBtn.classList = "button button-card-delete";
        editBtn.innerText = "Editar";
        deleteBtn.innerText = "Excluir";
        bttnBox.append(editBtn, deleteBtn);
        tagHead.append(infoBox, bttnBox);

        editBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const editingPost = editPostCreate(obj);
            openModal(editingPost);
        });

        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const deletingPost = deletePostCreate(obj)
            openModal(deletingPost);
        });

    } else {
        tagHead.append(infoBox);
    }

    tagPost.append(tagHead, postContent);

    return tagPost;
}

function openPostCreate(obj, brDate) {
    const { id, title, content, createdAt, user } = obj;
    const postBox = document.createElement('div');
    const postHeader = document.createElement('div');
    const postProfileInfo = document.createElement('div');
    const postUserAvatar = document.createElement('img');
    const postUserName = document.createElement('h3');
    const postCreatedAt = document.createElement('span');
    const postTitle = document.createElement('h2');
    const postContent = document.createElement('p');

    postBox.classList.add('feed-post');
    postHeader.classList.add('post-profile-info');
    postProfileInfo.classList.add('post-profile-info');
    postUserName.classList = 'grey-1 text-2';
    postCreatedAt.classList = 'grey-4 text-2';
    postTitle.classList = 'grey-1 title-2';
    postContent.classList = 'grey-3 text-3';

    postUserAvatar.src = user.avatar;
    postUserAvatar.alt = user.username;
    postUserName.innerText = user.username;
    postCreatedAt.innerText = brDate;
    postTitle.innerText = title;
    postContent.innerText = content;

    postProfileInfo.append(postUserAvatar, postUserName);
    postHeader.append(postProfileInfo, postCreatedAt);
    postBox.append(postHeader, postTitle, postContent);

    return postBox
}

function deletePostCreate(obj) {
    const deletePostContainer = document.createElement('div');
    const deleteTitle = document.createElement('h3');
    const deleteConfirm = document.createElement('h2');
    const deleteConfirmInstruction = document.createElement('p');
    const deleteButtonsBox = document.createElement('div');
    const cancelButton = document.createElement('button');
    const confirmButton = document.createElement('button');

    deletePostContainer.classList.add('delete-post-container');
    deleteButtonsBox.classList = 'delete-button-box';
    cancelButton.classList = 'grey-4 text-1 button button-cancel';
    confirmButton.classList = 'grey-9 text-1 button button-delete-post';

    deleteTitle.classList = 'grey-1 title-5';
    deleteConfirm.classList = 'grey-1 title-2';
    deleteConfirmInstruction.classList = 'grey-3 text-3';

    deleteTitle.innerText = 'Confirmação de exclusão';
    deleteConfirm.innerText = 'Tem certeza que deseja excluir este post?';
    deleteConfirmInstruction.innerText = 'Esta ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir';
    cancelButton.innerText = 'Cacelar';
    confirmButton.innerText = 'Sim, excluir este post';

    cancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.modal-wrapper').remove();
    });

    confirmButton.addEventListener('click', async (e) => {
        e.preventDefault();
        document.querySelector('.modal-wrapper').remove();
        await deleteRequest(obj.id);
        renderAnything(recentFirst(await getRequest(usertokenKey, postsEnd)))
    })

    deleteButtonsBox.append(cancelButton, confirmButton);
    deletePostContainer.append(deleteTitle, deleteConfirm, deleteConfirmInstruction, deleteButtonsBox);

    return deletePostContainer;
}

function newPostCreate(end, key) {
    const createForm = document.createElement('form');
    const titleForm = document.createElement('h2');
    const titlePostBox = document.createElement('div');
    const labelTitlePost = document.createElement('label');
    const inputTitlePost = document.createElement('textarea');
    const contentPostBox = document.createElement('div');
    const labelContentPost = document.createElement('label');
    const inputContentPost = document.createElement('textarea');
    const buttonsFormBox = document.createElement('div');
    const cancelButton = document.createElement('button');
    const saveButton = document.createElement('button');

    cancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.modal-wrapper').remove();
    });

    createForm.classList.add('edit-form');
    titleForm.classList = 'grey-1 title-5 title-form';
    titlePostBox.classList.add('title-post-box');
    labelTitlePost.classList = 'grey-1 text-1 label-title-post';
    inputTitlePost.classList = 'grey-1 text-3 input-title-post';
    contentPostBox.classList.add('content-post-box');
    labelContentPost.classList = 'grey-1 text-1 label-content-post';
    inputContentPost.classList = 'grey-1 text-3 input-content-post';
    buttonsFormBox.classList.add('buttons-box');
    cancelButton.classList = 'grey-4 text-1 button button-cancel';
    saveButton.classList = 'grey-9 text-1 button button-create';
    saveButton.id = "post_button";

    titleForm.innerText = 'Edição';

    labelTitlePost.innerText = 'Título do post';
    labelTitlePost.for = 'title';

    inputTitlePost.placeholder = 'Digite o título do post aqui...';
    inputTitlePost.name = 'title';
    inputTitlePost.required = true;

    labelContentPost.innerText = 'Conteúdo do post';
    labelContentPost.innerText = 'content';

    inputContentPost.placeholder = 'Desenvolva o conteúdo do post aqui...';
    inputContentPost.name = 'content';
    inputContentPost.required = true;

    cancelButton.innerText = 'Cancelar';
    saveButton.innerText = 'Salvar Alterações';
    saveButton.type = 'submit';

    titlePostBox.append(labelTitlePost, inputTitlePost);
    contentPostBox.append(labelContentPost, inputContentPost);
    buttonsFormBox.append(cancelButton, saveButton);
    createForm.append(titleForm, titlePostBox, contentPostBox, buttonsFormBox);

    const elements = [...createForm.elements];
    elements.forEach((elt) => {
        if (elt.tagName == "TEXTAREA") {
            elt.addEventListener('keyup', (e) => {
                elt.style.height = '56px';
                let newHeigth = e.target.scrollHeight;
                elt.style.height = `${newHeigth}px`;
            })
        }
    });

    createForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const inputs = [...e.target];
        const newObject = {};
        inputs.forEach(({ name, value }) => {
            if (name) {
                newObject[name] = value;
            }
        });
        await postCreateRequest(newObject, saveButton, end, key);
        renderAnything(recentFirst(await getRequest(usertokenKey, postsEnd)))
        document.querySelector('.modal-wrapper').remove();
    });

    return createForm
}

async function renderPosts(array) {
    postsContainerHtml.innerHTML = '';
    await Promise.all(array.map(async (user) => {
        const newCard = postCreate(user);
        postsContainerHtml.appendChild(newCard);
    }));
}


function recentFirst(array) {
    let newOrder = [];
    array.forEach(post => {
        newOrder = [post, ...newOrder];
    });
    return newOrder;
}

validateLogin(usertokenKey, lgUrl);
headerRender(myProfile, headerHtml, headerCreate);

export {
    renderPosts, usertokenKey, recentFirst
}