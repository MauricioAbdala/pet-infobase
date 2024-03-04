function activateButton(form, button) {
    const elements = [...form.elements];
    elements.forEach((elt) => {
      if (elt.tagName === 'INPUT') {
        elt.addEventListener('keyup', (e) => {
          button.classList = e.target.value !== '' ? 'grey-9 text-1 button button-form-1' : 'grey-9 text-1 button button-form-1 inative-button';
        });
      }
    });
  }
  
  function changePage(button, href) {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.assign(href);
    });
  }
  
  function replaceTo(buttonArray, href) {
    buttonArray.forEach((elt) => {
      changePage(elt, href);
    });
  }
  
  function spinnerIn(button) {
    button.innerHTML = '';
    const img = document.createElement('img');
    img.src = button.id === 'register_button' || button.id === 'post_button' ? '../../assets/spinner.png' : './src/assets/spinner.png';
    img.classList.add('loading');
    button.appendChild(img);
  }
  
  export {
    activateButton,
    changePage,
    replaceTo,
    spinnerIn,
  };
  