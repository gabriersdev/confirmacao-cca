import { conteudos } from './conteudos.js';
import { SwalAlert, isEmpty } from './utilitarios.js';
import { renderPendencias, renderPopover, renderTooltips } from './funcoes-render.js';
import { atualizar, escutaEventoInput } from './funcoes-base.js';
import { atualizarNumerosProponentes, edicaoInputNome } from './funcoes-de-conteudo.js';

const clickIncluirRenda = () => {
  const botao = document.querySelectorAll('[data-action="incluir_renda"]');
  botao.forEach(botao => {
    removeEventListener('click', botao, false);
    botao.addEventListener('click', (evento) => {
      evento.preventDefault();
      const proponente = botao.closest('[data-identify]');
      const div = document.createElement('div');
      div.classList.value = `input-group mt-2 mb-2`;
      div.dataset.element = "renda";
      const length = null;
      try{length = proponente.querySelector('[data-element="renda"]').length}catch(error){}
      div.innerHTML = `${conteudos.secao_rendas(!isEmpty(length) ? length + 1 : 1)}`;
      proponente.querySelector('[data-element="area_rendas"]').appendChild(div);
      escutaEventoInput();
      clickRemoverRenda(div);
    })
  })
}

const clickRemoverRenda = (elemento) => {
  if(!isEmpty(elemento)){
    acao(elemento.querySelector('[data-action="remover-renda"]'));
  }else{
    document.querySelectorAll('[data-action="remover-renda"]').forEach(botao => {
      acao(botao);
    })
  }

  function acao(botao){
    removeEventListener('click', botao);
    botao.addEventListener('click', (evento) => {
      evento.preventDefault();
      $(botao).tooltip('dispose')
      botao.closest('[data-element="renda"]').remove();
    })
  }
}

const clickIncluirProponente = () => {
  const botao = document.querySelector('[data-action="incluir-proponente"]');
  botao.addEventListener('click', (evento) => {
    removeEventListener('click', botao);
    const div = document.createElement('div');
    div.classList.value = `accordion-item`;
    div.innerHTML = `${conteudos.accordion_item(document.querySelectorAll('.accordion-item').length + 1)}`;
    document.querySelector('.accordion').appendChild(div);
    
    clickIncluirRenda();
    clickRemoverRenda();
    clickRemoverProponente();
    escutaEventoInput();
    atualizar();
  })
}

const clickRemoverProponente = () => {
  const botao = document.querySelectorAll('[data-action="remover-proponente"]');
  botao.forEach(botao => {
    removeEventListener('click', botao);
    botao.addEventListener('click', async (evento) => {
      SwalAlert('confirmacao', 'question', 'Tem certeza que deseja remover?', 'Esta ação não poderá ser desfeita').then((retorno) => {
        if(retorno.isConfirmed){
          botao.closest('.accordion-item').remove();
          atualizarNumerosProponentes();
          renderPendencias();
        }
      });
    })
  })
}

export {
  clickIncluirRenda,
  clickRemoverRenda,
  clickIncluirProponente,
  clickRemoverProponente
}