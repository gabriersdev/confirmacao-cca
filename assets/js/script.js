"use strict";

import { conteudos } from './modulos/conteudos.js';
import { SwalAlert, isEmpty } from './modulos/utilitarios.js';

(() => {
  hljs.highlightAll();
  
  const renderTooltips = () => {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }
  
  const renderPopover = () => {
    $(document).ready(function(){
      $('[data-bs-toggle="popover"]').popover();  
    });
  }
  
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
      renderTooltips();
      renderPopover();
      clickRemoverProponente();
      edicaoInputNome();
      renderPendencias();
    })
  }
  
  const clickRemoverProponente = () => {
    const botao = document.querySelectorAll('[data-action="remover-proponente"]');
    
    botao.forEach(botao => {
      // removeEventListener('click', botao);
      botao.addEventListener('click', async (evento) => {
        SwalAlert('confirmacao', 'question', 'Tem certeza que deseja remover?', 'Esta ação não poderá ser desfeita').then((retorno) => {
          if(retorno.isConfirmed){
            evento.target.closest('[data-identify]').remove();
          }
        });
      })
    })
  }
  
  const edicaoInputNome = () => {
    document.querySelectorAll('[data-input="nome"]').forEach(input => {
      input.addEventListener('input', () => {
        input.closest('[data-identify]').querySelectorAll('[data-content="nome"]').forEach(content => {
          content.textContent = !isEmpty(input.value) ? input.value : 'Nome do cliente';
        }) 
      })
    })
  }
  
  const renderPendencias = () => {
    const proponentes = document.querySelectorAll('.accordion-item');
    proponentes.forEach(proponente => {
      const inputs = proponente.querySelectorAll('[data-element="input"]');
      
      const elementos = {
        nome : get('nome'),
        cpf : get('cpf'),
        data_nascimento : get('data_nascimento'),
        email : get('email'),
        telefone : get('telefone'),
        endereco : get('endereco'),
        tipo_endereco : get('tipo_endereco'),
        renda : get('renda'),
        tipo_renda : get('tipo_renda'),
        comprovante_estado_civil : get('comprovante_estado_civil'),
        fgts : get('fgts'),
      }
      
      console.log(elementos)
      
      function get(id){
        const saida = new Array();
        inputs.forEach(input => {
          input.dataset.input == `${id}` ? saida.push(input.value) : '';
        })
        return saida;
      }
    })
  }
  
  
  renderTooltips();
  renderPopover();
  document.querySelector('.accordion').innerHTML += `${conteudos.accordion_item(1)}`;
  clickIncluirProponente();
  clickRemoverProponente();
  edicaoInputNome();
  renderPendencias();
  
})();