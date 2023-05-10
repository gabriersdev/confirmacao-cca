"use strict";

import { conteudos } from './modulos/conteudos.js';
import { resizeTextArea } from './modulos/utilitarios.js';
import { funcoesBase } from './modulos/funcoes-base.js';

(() => { 
  document.querySelectorAll('[data-recarrega-pagina]').forEach(botao => {
    botao.addEventListener('click', () => {
      window.location.reload;
    })
  }) 
  
  document.querySelector('.accordion').innerHTML += `<div class="accordion-item">${conteudos.accordion_item(1)}</div>`;
  
  funcoesBase();
})();

$("textarea").bind("onpaste keyup input", function(e) {
  resizeTextArea(this);
});