import { patchRequest, getRequest } from "./api.js";
import { renderPosts, recentFirst, usertokenKey } from "./home.js";

const postsEnd = 'posts';

function createFormElement(tag, classes) {
    const element = document.createElement(tag);
    element.classList.add(...classes);
    return element;
}

function createFormTextArea(name, label, value, required = true) {
    const labelElement = createFormElement('label', ['grey-1', 'text-1']);
    labelElement.innerText = label;

    const inputElement = createFormElement('textarea', ['grey-1', 'text-3']);
    inputElement.name = name;
    inputElement.value = value;
    inputElement.required = required;

    return [labelElement, inputElement];
}

function createFormButton(text, classes, onClick) {
    const buttonElement = createFormElement('button', classes);
    buttonElement.innerText = text;
    buttonElement.addEventListener('click', onClick);
    return buttonElement;
}

function editPostCreate(obj) {
    const { id, title, content } = obj;

    const editForm = createFormElement('form', ['edit-form']);
    const titleForm = createFormElement('h2', ['grey-1', 'title-5', 'title-form']);
    const titlePostBox = createFormElement('div', ['title-post-box']);
    const contentPostBox = createFormElement('div', ['content-post-box']);
    const buttonsFormBox = createFormElement('div', ['buttons-box']);

    titleForm.innerText = 'Edição';

    const [labelTitlePost, inputTitlePost] = createFormTextArea('title', 'Título do post', title);
    const [labelContentPost, inputContentPost] = createFormTextArea('content', 'Conteúdo do post', content);

    const cancelButton = createFormButton('Cancelar', ['grey-4', 'text-1', 'button', 'button-cancel'], (e) => {
        e.preventDefault();
        document.querySelector('.modal-wrapper').remove();
    });

    const saveButton = createFormButton('Salvar Alterações', ['grey-9', 'text-1', 'button', 'button-create'], async (e) => {
        e.preventDefault();
        const newObject = {
            title: inputTitlePost.value,
            content: inputContentPost.value,
        };
        await patchRequest(newObject, saveButton, id);
        renderPosts(recentFirst(await getRequest(usertokenKey, postsEnd)));
        document.querySelector('.modal-wrapper').remove();
    });

    titlePostBox.append(labelTitlePost, inputTitlePost);
    contentPostBox.append(labelContentPost, inputContentPost);
    buttonsFormBox.append(cancelButton, saveButton);
    editForm.append(titleForm, titlePostBox, contentPostBox, buttonsFormBox);

    const textareas = editForm.querySelectorAll('textarea');
    textareas.forEach((textarea) => {
        textarea.addEventListener('keyup', (e) => {
            textarea.style.height = '56px';
            let newHeight = e.target.scrollHeight;
            textarea.style.height = `${newHeight}px`;
        });
    });

    return editForm;
}

export {
    editPostCreate
}
