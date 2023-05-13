"use strict";

import { conteudos } from './modulos/conteudos.js';
import { capitalize, isEmpty, resizeTextArea } from './modulos/utilitarios.js';
import { funcoesBase } from './modulos/funcoes-base.js';

(() => { 
  document.querySelectorAll('[data-recarrega-pagina]').forEach(botao => {
    botao.addEventListener('click', () => {
      window.location.reload;
    })
  }) 
  
  if(new URL(window.location).pathname.trim().replace('/', '') == 'index.html'){
    document.querySelector('.accordion').innerHTML += `<div class="accordion-item">${conteudos.accordion_item(1)}</div>`;
    funcoesBase();
    
    $("textarea").bind("onpaste keyup input", function(e) {
      resizeTextArea(this);
    });
  }
  
  let contador = 0;
  const area_consultas = document.querySelector('[data-content="area-consultas"]');

  const tags = new Array();
  const conteudos_tag = new Array();

  conteudos.consultas.forEach(consulta => {
    if(!tags.includes(consulta.tag)){
      tags.push(consulta.tag);
    }
  })

  tags.forEach(tag => {
    conteudos_tag.push(conteudos.consultas.filter(e => e.tag == tag))
  })

  conteudos_tag.forEach((conteudo_tag, index) => {
    const titulo = document.createElement('h5');
    titulo.classList.value = 'titulo-consultas text-muted';
    titulo.appendChild(document.createTextNode(`${capitalize(tags[index])}`));
    const div = document.createElement('div');
    div.classList.add('consultas');

    area_consultas.appendChild(titulo)
    area_consultas.appendChild(div);

    conteudo_tag.forEach(elemento => {
      const div_consultas = area_consultas.querySelectorAll('div.consultas');
      const a = document.createElement('a');
      a.classList.add('content');
      a.innerHTML = `<span class="content-tag">${capitalize(elemento.tag)}</span><div class="content-principal"><h5>${elemento.titulo}</h5><span>${elemento.sistema}</span></div>`;
      div_consultas[(div_consultas.length - 1)].appendChild(a);
    })
  })
  
})();