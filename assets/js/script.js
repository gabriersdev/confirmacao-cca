"use strict";

import { conteudos } from './modulos/conteudos.js';
import { SwalAlert, isEmpty } from './modulos/utilitarios.js';

(() => {
  hljs.highlightAll();
  
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
  
  $(document).ready(function(){
    $('[data-bs-toggle="popover"]').popover();  
  });
  
  document.querySelectorAll('[data-recarrega-pagina]').forEach(botao => {
    botao.addEventListener('click', () => {
      window.location.reload;
    })
  })
  
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

  const clickIncluirProponente = () => {
    document.querySelector('[data-action="incluir-proponente"]').addEventListener('click', (evento) => {
      document.querySelector('.accordion').innerHTML += `${conteudos.accordion_item(document.querySelectorAll('.accordion-item').length + 1)}`;
      clickRemoverProponente();
    })
  }

  const clickRemoverProponente = () => {
    const botao = document.querySelectorAll('[data-action="remover-proponente"]');

    botao.forEach(botao => {
      // removeEventListener('click', botao);
      botao.addEventListener('click', async (evento) => {
        SwalAlert('confirmacao', 'question', 'Tem certeza que deseja remover?', 'Depois de remover esta ação não poderá ser desfeita').then((retorno) => {
          if(retorno.isConfirmed){
            evento.target.closest('[data-identify]').remove();
          }
        });
      })
    })
  }

  clickIncluirProponente();
  clickRemoverProponente();
  
})();