"use strict";

import { conteudos } from './modulos/conteudos.js';
import { atualizarDatas, capitalize, isEmpty, atribuirLinks, ordernarString } from './modulos/utilitarios.js';
import { funcoesBase } from './modulos/funcoes-base.js';

(() => { 
  document.querySelectorAll('[data-recarrega-pagina]').forEach(botao => {
    botao.addEventListener('click', () => {
      window.location.reload;
    })
  }) 

  const pagina = new URL(window.location).pathname.trim().replace('/', '');
  const body = document.querySelector('body');
  console.log(pagina);

  if(pagina == 'index.html' || pagina == 'confirmacao-cca/' || pagina == 'confirmacao-cca/index.html' || isEmpty(pagina)){
    body.innerHTML += conteudos.conteudo_pagina_confirmacao;
    const accordion_item = document.createElement('div');
    accordion_item.classList.value = 'accordion-item';
    accordion_item.innerHTML = conteudos.accordion_item(1);
    document.querySelector('.accordion').appendChild(accordion_item);
  }
  
  else if(pagina == 'consultas/index.html' || pagina == 'confirmacao-cca/consultas/' || pagina == 'confirmacao-cca/consultas/index.html'){
    body.innerHTML += conteudos.conteudo_pagina_consultas;
    const area_consultas = document.querySelector('[data-content="area-consultas"]');

    renderConteudosPagina(area_consultas, ordernarString(conteudos.consultas), 'consultas')
  }

  else if(pagina == 'arquivos/index.html' || pagina == 'confirmacao-cca/arquivos/' || pagina == 'confirmacao-cca/arquivos/index.html'){
    body.innerHTML += conteudos.conteudo_pagina_arquivos;
    const area_arquivos = document.querySelector('[data-content="area-arquivos"]');

    renderConteudosPagina(area_arquivos, ordernarString(conteudos.arquivos), 'arquivos');
    document.querySelectorAll('a').forEach(a => {
      a.setAttribute('confirm', a.getAttribute('href'));
      a.removeAttribute('href');
      a.setAttribute('onclick', 'clickConfirm()');
    })

    function clickConfirm(){
      console.log('clicou');
    }
    window.clickConfirm = clickConfirm;
  }

  body.innerHTML += conteudos.rodape;

  window.addEventListener("load", function () {
    const overlay2 = document.querySelector(".overlay-2");
    overlay2.style.display = "none";

    funcoesBase();
    atribuirLinks();
    atualizarDatas();
  });

  function renderConteudosPagina(area_elementos, elementos, objeto){
    const tags = new Array();
    const conteudos_tag = new Array();
    
    elementos.forEach(e => {
      if(!tags.includes(e.tag) && !isEmpty(e.tag)){
        tags.push(e.tag);
      }
    })
    
    tags.forEach(tag => {
      conteudos_tag.push(elementos.filter(e => e.tag == tag))
    })
    
    conteudos_tag.forEach((conteudo_tag, index) => {
      const titulo = document.createElement('h5');
      titulo.classList.value = `titulo-${objeto} text-muted`;
      titulo.appendChild(document.createTextNode(`${capitalize(tags[index])}`));
      const div = document.createElement('div');
      div.classList.add(`${objeto}`);
      
      area_elementos.appendChild(titulo)
      area_elementos.appendChild(div);
      
      conteudo_tag.forEach(elemento => {
        const div_elemento = area_elementos.querySelectorAll(`div.${objeto}`);
        const a = document.createElement('a');
        a.classList.add('content');
        a.setAttribute('href', `${elemento.link}`)
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noreferrer noopener')
        a.innerHTML = `<span class="content-tag">${capitalize(elemento.tag)}</span><div class="content-principal"><h5>${elemento.titulo}</h5><span>${elemento.sistema}</span></div>`;
        div_elemento[(div_elemento.length - 1)].appendChild(a);
      })
    })
  }

})();

const datetime = moment();
const codigo = `${datetime.get('year')}${datetime.get('month')}${datetime.get('date')}${datetime.get('hour')}${datetime.get('minutes')}${datetime.get('seconds')}`