"use strict";

import { conteudos } from './modulos/conteudos.js';
import { atualizarDatas, isEmpty, atribuirLinks, ordernarString, limparEFocar, sanitizarCPF, sanitizarNumero, sanitizarString, criarEBaixarArquivo } from './modulos/utilitarios.js';
import { verificacao } from './modulos/confirmacao.js';
import { funcoesBase } from './modulos/funcoes-base.js';
import { adicionarOpcoesAutoComplete, renderConteudosPagina } from './modulos/funcoes-de-conteudo.js';

(() => {  
  function clickEnviarConfirmacaoSenha(evento, elemento, referencia){
    verificacao(evento, elemento, referencia);
  }
  window.clickEnviarConfirmacaoSenha = clickEnviarConfirmacaoSenha;
  
  document.querySelectorAll('[data-recarrega-pagina]').forEach(botao => {
    botao.addEventListener('click', () => {
      window.location.reload;
    })
  }) 
  
  const pagina = new URL(window.location).pathname.trim().replace('/', '');
  const body = document.querySelector('body');
  
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
    
    renderConteudosPagina(area_consultas, ordernarString(conteudos.consultas), 'consultas');
    adicionarOpcoesAutoComplete();
  }
  
  else if(pagina == 'arquivos/index.html' || pagina == 'confirmacao-cca/arquivos/' || pagina == 'confirmacao-cca/arquivos/index.html'){
    body.innerHTML += conteudos.conteudo_pagina_arquivos;
    const area_arquivos = document.querySelector('[data-content="area-arquivos"]');
    
    renderConteudosPagina(area_arquivos, ordernarString(conteudos.arquivos), 'arquivos');
    document.querySelectorAll('a').forEach(a => {
      
      // Verifica se a URL no parâmetro HREF é válida ou não. Se for, o código do bloco CATCH não é executado e não será necessária confirmação de senha para ir para a página.
      try{
        new URL(a.getAttribute('href'));
      }catch(error){
        a.setAttribute('confirm', a.getAttribute('href'));
        a.removeAttribute('href'); 
        a.setAttribute('onclick', 'clickConfirm(this)');
      }
    })
    
    function clickConfirm(elemento){
      $('#modal-confirmar-senha').modal('show');
      const modal = document.querySelector('#modal-confirmar-senha');
      const input = modal.querySelectorAll('input')[0];
      limparEFocar(input, 'clear');
      setTimeout(() => {
        limparEFocar(input, 'focus');
        input.setAttribute('type', 'password');
        modal.querySelector('button[type="submit"]').setAttribute('onclick', `clickEnviarConfirmacaoSenha(event, this, '${elemento.getAttribute('confirm')}')`);
      }, 500);
    }
    window.clickConfirm = clickConfirm;
  }
  
  else if(pagina == 'desligamento/index.html' || pagina == 'confirmacao-cca/desligamento/' || pagina == 'confirmacao-cca/desligamento/index.html'){
    $(body).append(``)

    setTimeout(() => {
      $('[data-input="contato"]').mask('SSSSSSSSSSSSSSS')
      $('[data-input="cliente"]').mask('SSSSSSSSSSSSSSS')
    }, 0)
    
    // Página ignora preventDefault() se não houver tiver o setTimeout()
    setTimeout(() => {
      $('[data-action="form-laudo"]').submit((event) => {
        event.preventDefault()
        const saida = new Array();

        event.target.querySelectorAll('[data-input]').forEach(elemento => {
          if(['textarea', 'input'].includes(elemento.tagName.toLowerCase())){
            switch(elemento.dataset.input){
              case 'CPF':
              case 'CEP':
              case 'telefone':
              saida.push(`${sanitizarString(elemento.dataset.input.toUpperCase(), ['-', ' '])}: ${sanitizarNumero(elemento.value)}`);
              break;
              
              default:
              saida.push(`${sanitizarString(elemento.dataset.input.toUpperCase(), ['-', ' '])}: ${elemento.value}`);
              break;
            }
          }
        })

        criarEBaixarArquivo(JSON.stringify(saida.join('\n')), `LAUDO ${event.target.querySelector('[data-input="matricula"]').value}`, 'txt')
      })
    }, 10)
  }
  
  body.innerHTML += conteudos.rodape;
  
  window.addEventListener("load", function () {
    const overlay2 = document.querySelector(".overlay-2");
    overlay2.style.display = "none";
    
    funcoesBase();
    atribuirLinks();
    atualizarDatas();
  });
  
})();

let text_areas_edicao = false;

export function text_areas_editados(condicao){
  if(isEmpty(condicao)){
    return text_areas_edicao;
  }else{
    text_areas_edicao = condicao;
  }
};

const datetime = moment();
const codigo = `${datetime.get('year')}${datetime.get('month')}${datetime.get('date')}${datetime.get('hour')}${datetime.get('minutes')}${datetime.get('seconds')}`