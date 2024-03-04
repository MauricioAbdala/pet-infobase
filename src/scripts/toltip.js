function toltipRender(url, status, id) {
    const body = document.querySelector('body');
    const toltipCont = document.createElement("div");
    toltipCont.classList.add("toltip");
  
    const toltipHead = document.createElement('div');
    toltipHead.classList.add('toltip-header');
  
    const tagImg = document.createElement('img');
    const tagTitle = document.createElement('h3');
    const tagP = document.createElement('p');
  
    if (url === "http://localhost:3333/users/create") {
      if (status === 200) {
        toltipCont.style.background = 'var(--sucess-bgc)';
        tagImg.src = "../../assets/sucsses.png";
        tagTitle.classList.add("sucess", "text-1");
        tagTitle.innerText = "Sua conta foi criada com sucesso!";
        tagP.classList.add("grey-2", "text-4");
        tagP.innerHTML = `Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: 
            <a href="../../../index.html">Acessar página de login</a>`;
      } else {
        toltipCont.style.background = 'var(--alert-bgc)';
        tagImg.src = "../../assets/error.png";
        tagTitle.classList.add("alert-2", "text-1");
        tagTitle.style.alignSelf = 'Center';
        tagTitle.innerText = "Erro! Dados já em uso";
        tagP.style.display = 'none';
      }
    }
  
    if (url === "http://localhost:3333/login") {
      if (status === 200) {
        toltipCont.style.background = 'var(--sucess-bgc)';
        tagImg.src = './src/assets/sucsses.png';
        tagTitle.classList.add("sucess", "text-1");
        tagTitle.innerText = "Login realizado com sucesso!";
        tagP.classList.add("grey-2", "text-4");
        tagP.innerText = 'Aproveite todo nosso conteúdo durante sua sessão.';
      } else {
        toltipCont.style.background = 'var(--alert-bgc)';
        document.getElementById('alert').classList.add('error-flex');
        setTimeout(() => {
          window.location.reload();
        }, 5000);
        tagImg.src = './src/assets/error.png';
        tagTitle.classList.add("alert-2", "text-1");
        tagTitle.style.alignSelf = 'Center';
        tagTitle.innerText = "Erro! Usuário ou senha incorretos";
        tagP.style.display = 'none';
      }
    }
  
    toltipHead.append(tagImg, tagTitle);
    toltipCont.append(toltipHead, tagP);
    body.appendChild(toltipCont);
  }
  
  export { toltipRender };
  