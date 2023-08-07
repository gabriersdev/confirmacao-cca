import { isEmpty, limparEFocar } from "./utilitarios.js";

export {
  verificacao
}

const conteudos = [
  {conteudo: 'Relatório', attr: '1LWYfPTFp_SWztUaKc4Dkuveg5l3Bn3x2'},
  {conteudo: 'Tabela de Apuração', attr: '1TyHuRRsv4IwEr04MNhWGDkx8JH_boK08'},
  {conteudo: 'Capa', attr: '1AvwrylQwYmu1ufh176X4HHSGjq1GqMdZ'},
  {conteudo: 'Ateste', attr: '11NfAmCbZUrgNuY05-SkuiNUxkYwMA8eq'},
  {conteudo: 'Validação de Pesquisa', attr: '1OAATqKl1MT9lOYM4RlL4lqef5F4-PC_A'},
]

function verificacao(evento, elemento, referencia){
  evento.preventDefault();
  const input = elemento.parentElement.querySelectorAll('input')[0];
  
  let encrypted = CryptoJS.AES.encrypt(elemento.parentElement.querySelector('#senha-arquivo').value, "ZX5I8Q9HUWMQP0VD3I379CSUCC9Q9T");
  
  let descrypted = CryptoJS.AES.decrypt(encrypted, "ZX5I8Q9HUWMQP0VD3I379CSUCC9Q9T");
  let visible = descrypted.toString(CryptoJS.enc.Utf8);

  try{
    const attr = conteudos.find(e => e.conteudo == referencia);
    let download_id = null;
    if(!isEmpty(attr)){
      download_id = attr.attr;
    }

    if(!isEmpty(visible) && typeof(visible) === 'string' && visible.length >= 6 && visible.length <= 8){
      if(visible.slice(0)[0] == '0' && visible.slice(0)[1] == '6' && visible.slice(0)[2] == '3' && visible.slice(0)[3] == '7' && visible.slice(0)[4] == '6' && visible.slice(0)[5] == '3' && visible.slice(0)[6] == '7'){
        feedback(elemento, 'btn btn-success mt-3', 'Tudo certo!');
        setTimeout(() => {
          const modal = document.querySelector('#modal-confirmar-senha');
          $(modal).modal('hide');
          modal.querySelector('[data-element="link-referencia"]').href = `https://drive.google.com/uc?export=download&id=${download_id}`;
          modal.querySelector('[data-element="link-referencia"]').click();
        }, 450);
      }else{
        feedback(elemento, 'btn btn-danger mt-3', 'Oops... senha incorreta!');
      }
    }else{
      feedback(elemento, 'btn btn-danger mt-3', 'Oops... senha incorreta!');
    }
  }catch(erro){
    feedback(elemento, 'btn btn-danger mt-3', 'Oops... ocorreu um erro!');
  }

  limparEFocar(input);
}

function feedback(elemento, classe, HTML){
  elemento.setAttribute('class', classe);
  elemento.innerHTML = HTML;

  setTimeout(() => {
    elemento.setAttribute('class', 'btn btn-outline-primary mt-3');
    elemento.innerHTML = 'Enviar';
  }, 500);
}