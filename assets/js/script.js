"use strict";

import { conteudos } from './modulos/conteudos.js';
import { isEmpty } from './modulos/utilitarios.js';
import { funcoesBase } from './modulos/funcoes-base.js';

(() => { 
  document.querySelectorAll('[data-recarrega-pagina]').forEach(botao => {
    botao.addEventListener('click', () => {
      window.location.reload;
    })
  }) 

  document.querySelector('.accordion').innerHTML += `${conteudos.accordion_item(1)}`;

  funcoesBase();
})();