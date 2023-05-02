import { clickIncluirRenda, clickRemoverRenda, clickIncluirProponente, clickRemoverProponente } from './funcoes-click.js'
import { edicaoInputNome, atualizarNumerosProponentes } from './funcoes-de-conteudo.js';
import { renderTooltips, renderPopover, renderPendencias } from './funcoes-render.js';

const verificarInputsRecarregamento = () => {
  window.onbeforeunload = async (evento) => {
    evento.preventDefault();
    await document.querySelectorAll('[data-element="input"]').forEach(elemento => {
      if(!isEmpty(elemento.value) || !isEmpty(elemento.textContent)){
        return 'Tem certeza que deseja sair?';
      }
    })
  }
}

const escutaEventoInput = () => {
  document.querySelectorAll('[data-element="input"]').forEach(elemento => {
    tratamentoCampos(elemento);
    removeEventListener('input', elemento);
    if(elemento.dataset.input == "nome"){
      edicaoInputNome();
    }
    if(elemento.tagName.toLowerCase() !== 'textarea'){
      elemento.addEventListener('input', (evento) => { renderPendencias()});
    }
  })
}

const atualizarFeedbacks = () => {
  //
}

const tratamentoCampos = (input) => {
  $(document).ready(function(){
    switch(input.dataset.input){
      case 'cpf':
      $(input).mask('000.000.000-00', {reverse: true});
      break;

      case 'data_nascimento':
      $(input).mask('00/00/0000');
      break;

      case 'telefone':
      $(input).mask('(00) 00000-0000');
      break;
      
      default:
      break;
    }
  });
}

function funcoesBase(){
  renderTooltips();
  renderPopover();
  clickIncluirProponente();
  clickRemoverProponente();
  clickIncluirRenda();
  clickRemoverRenda();
  edicaoInputNome();
  escutaEventoInput();
}

function atualizar(){
  renderTooltips();
  renderPopover();
  renderPendencias();
  escutaEventoInput();
  atualizarNumerosProponentes();
}

export {
  escutaEventoInput,
  funcoesBase,
  atualizar
}