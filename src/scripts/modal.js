function createModal(tagHtml) {
    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal-wrapper');

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('container', 'modal-container');

    const closeModal = document.createElement('button');
    closeModal.classList.add('button', 'grey-4', 'text-5', 'close-modal');
    closeModal.innerText = 'X';

    modalContainer.appendChild(tagHtml);
    modalContainer.appendChild(closeModal);
    modalWrapper.appendChild(modalContainer);

    return modalWrapper;
}

function openModal(tagHtml) {
    const body = document.querySelector('body');
    const modalWrapper = createModal(tagHtml);
    body.appendChild(modalWrapper);

    modalWrapper.addEventListener('click', (event) => {
        const { className } = event.target;
        if (className === 'modal-wrapper' || className === 'button grey-4 text-5 close-modal') {
            modalWrapper.remove();
        }
    });
}

export {
    openModal
};
