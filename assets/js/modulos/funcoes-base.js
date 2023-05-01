import { clickIncluirRenda, clickRemoverRenda, clickIncluirProponente, clickRemoverProponente } from './funcoes-click.js'
import { edicaoInputNome } from './funcoes-de-conteudo.js';
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

function funcoesBase(){
  renderTooltips();
  renderPopover();
  clickIncluirProponente();
  clickRemoverProponente();
  clickIncluirRenda();
  clickRemoverRenda();
  edicaoInputNome();
  renderPendencias();
}

export {
  funcoesBase
}