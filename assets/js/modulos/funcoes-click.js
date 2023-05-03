import { conteudos } from './conteudos.js';
import { SwalAlert, isEmpty, copiar } from './utilitarios.js';
import { renderPendencias, renderPopover, renderResumo, renderTooltips } from './funcoes-render.js';
import { atualizar, escutaEventoInput } from './funcoes-base.js';
import { atualizarNumerosProponentes, edicaoInputNome } from './funcoes-de-conteudo.js';

const clickIncluirRenda = (botao) => {
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
}

window.clickIncluirRenda = clickIncluirRenda

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
    
    renderResumo();
    renderPendencias();
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

const clickCopiarResumo = () => {
  const btn = document.querySelector('[data-action="copiar-resumo"]');
  try{
    btn.addEventListener('click', () => {copiar(btn.closest('.card').querySelector('[data-content="resumo"]').textContent); feedback({html: '<i class="bi bi-check2"></i>', classe: 'btn btn-outline-success'});});
  }catch(error){
    feedback({html: '<i class="bi bi-x-lg"></i>', classe: 'btn btn-outline-danger'});
  }

  function feedback({html, classe}){
    const html_botao = btn.innerHTML;
    const class_botao = btn.classList.value;

    btn.innerHTML = html;
    btn.classList.value = classe;

    setTimeout(() => {
      btn.innerHTML = html_botao;
      btn.classList.value = class_botao;
    }, 2500);
  }
}

const clickDownload = (elemento) => {
  switch(elemento.dataset.download){
    case 'baixar-dados':
      //Selecionar Nome, CPF e data de nascimento de todos os proponentes
    break
    case 'baixar-relatorio':
      //Selecionar conteúdo no textarea de relatório
    break
    case 'baixar-pendencias':
      //Selecionar conteúdo no textarea de pendências
    break;
  }
}
window.clickDownload = clickDownload;

export {
  clickIncluirRenda,
  clickRemoverRenda,
  clickIncluirProponente,
  clickRemoverProponente,
  clickCopiarResumo
}