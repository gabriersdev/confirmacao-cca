import { clickRemoverRenda, clickIncluirProponente, clickRemoverProponente, clickCopiar, clickLimparProcesso } from './funcoes-click.js'
import { edicaoInputNome, atualizarNumerosProponentes, edicaoInputCPF, edicaoInputEmail, edicaoInputData } from './funcoes-de-conteudo.js';
import { renderTooltips, renderPopover, renderPendencias, renderResumo } from './funcoes-render.js';
import { isEmpty } from './utilitarios.js';

/* Verificar funcionamento desta função */
const verificarInputsRecarregamento = () => {
  window.onbeforeunload = async (evento) => {
    evento.preventDefault();
    await document.querySelectorAll('[data-element="input"]').forEach(elemento => {
      if(!isEmpty(elemento.value)){
        return 'Tem certeza que deseja sair?';
      }
    })
  }
}

const escutaEventoInput = () => {
  document.querySelectorAll('[data-element="input"]').forEach(elemento => {
    tratamentoCampos(elemento);
    // removeEventListener('input', elemento);
    if(elemento.dataset.input == "nome"){
      edicaoInputNome();
    }
    else if(elemento.dataset.input == 'cpf'){
      edicaoInputCPF(elemento)
    }
    else if(elemento.dataset.input == 'email'){
      edicaoInputEmail(elemento);
    }
    else if(elemento.dataset.input == 'data_nascimento'){
      edicaoInputData(elemento)
    }
    if(elemento.tagName.toLowerCase() !== 'textarea'){
      elemento.addEventListener('input', (evento) => { renderPendencias(); renderResumo();});
    }
  })
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
  // verificarInputsRecarregamento();
  renderTooltips();
  renderPopover();
  renderResumo();
  renderPendencias();
  clickCopiar();
  clickLimparProcesso();
  clickIncluirProponente();
  clickRemoverProponente();
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