import { text_areas_editados } from '../script.js';
import { clickRemoverRenda, clickIncluirProponente, clickRemoverProponente, clickCopiar, clickLimparProcesso, clickAddInformacoes, clickVisibilidadeSenha, clickAddDevolucaoFID, submitAddDevolucaoFID, clickImportarPendencias } from './funcoes-click.js'
import { edicaoInputNome, atualizarNumerosProponentes, edicaoInputCPF, edicaoInputEmail, edicaoInputData, edicaoTextAreaRelatorio, edicaoTextAreaPendencias } from './funcoes-de-conteudo.js';
import { renderTooltips, renderPopover, renderPendencias, renderResumo } from './funcoes-render.js';
import { isEmpty, resizeTextArea } from './utilitarios.js';

/* Verificar funcionamento desta função */
const verificarInputsRecarregamento = (funcao) => {
  if(true){
    if(isEmpty(funcao)){
      if(document.title.trim() == 'Confirmação de dados - CCA' && true){
        window.onbeforeunload = async (evento) => {
          evento.preventDefault();
          await document.querySelectorAll('[data-element="input"]').forEach(elemento => {
            if(!isEmpty(elemento.value)){
              return 'Tem certeza que deseja sair?';
            }
          })
        }
      }
    }else{
      console.log('aqui');
      window.onbeforeunload = '';
    }
  }
}

const escutaEventoInput = () => {
  const inputs = document.querySelectorAll('[data-element="input"]');
  inputs.forEach(elemento => {
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
    else if(elemento.dataset.content == 'relatorio'){
      edicaoTextAreaRelatorio(elemento)
    }
    else if(elemento.dataset.content == 'pendencias'){
      edicaoTextAreaPendencias(elemento)
      elemento.addEventListener('keypress', (evento) => {
        text_areas_editados(true);
      })
      elemento.addEventListener('input', (evento) => {
        text_areas_editados(true);
      })
    }
    if(elemento.tagName.toLowerCase() !== 'textarea'){
      elemento.addEventListener('input', (evento) => { renderPendencias(); });
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
      
      case 'id-fid':
      $(input).mask('000000');
      break;
      
      case 'id-valor-imovel':
      mascararValores(input);
      break;
      
      default:
      break;
    }
    
    switch(input.dataset.mask){
      case 'money':
      mascararValores(input);
      break;
    }
    
    function mascararValores(input){
      SimpleMaskMoney.setMask(input, {
        prefix: 'R$ ',
        fixed: true,
        fractionDigits: 2,
        decimalSeparator: ',',
        thousandsSeparator: '.',
        cursor: 'end'
      });
      input.removeAttribute('maxlength');
    }
    
  });
}

function funcoesBase(){
  verificarInputsRecarregamento();
  renderTooltips();
  renderPopover();
  renderResumo();
  renderPendencias();
  clickCopiar();
  clickLimparProcesso();
  clickIncluirProponente();
  clickRemoverProponente();
  clickRemoverRenda();
  clickAddInformacoes();
  clickVisibilidadeSenha();
  clickAddDevolucaoFID();
  submitAddDevolucaoFID();
  edicaoInputNome();
  escutaEventoInput();
  clickImportarPendencias();
  
  const btnCarregarPendencias = document.querySelector('[data-action="carregar-pendencias"]');
  !isEmpty(btnCarregarPendencias) ? btnCarregarPendencias.onclick = carregarPendencias : '';
  
  function carregarPendencias(evento){
    evento.preventDefault();
    $(evento.target).tooltip('hide');
    
    text_areas_editados(false);
    renderPendencias();
  }
  
  const modal = document.querySelector('#modal-devolucao-fid');
  if(!isEmpty(modal)){
    modal.querySelectorAll('textarea').forEach(textarea => {
      textarea.addEventListener('input', (evento) => {
        resizeTextArea(textarea);
      })
    })
  }
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
  atualizar,
  verificarInputsRecarregamento
}