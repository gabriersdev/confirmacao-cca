import { conteudos } from './conteudos.js';
import { SwalAlert, isEmpty, copiar, sanitizarCPF, primeiroNome } from './utilitarios.js';
import { renderPendencias, renderResumo } from './funcoes-render.js';
import { atualizar, escutaEventoInput } from './funcoes-base.js';
import { atualizarNumerosProponentes } from './funcoes-de-conteudo.js';

const clickIncluirRenda = (botao) => {
  const proponente = botao.closest('[data-identify]');
  const div = document.createElement('div');
  div.classList.value = `input-group mt-2 mb-2`;
  div.dataset.element = "renda";
  let length = null;
  try{length = proponente.querySelectorAll('[data-element="renda"]').length}catch(error){}
  div.innerHTML = `${conteudos.secao_rendas(!isEmpty(length) ? length + 1 : 1)}`;
  proponente.querySelector('[data-element="area_rendas"]').appendChild(div);
  escutaEventoInput();
  clickRemoverRenda(div);
  renderPendencias();
}

window.clickIncluirRenda = clickIncluirRenda

const clickRemoverRenda = (elemento) => {
  if(!isEmpty(elemento)){
    acao(elemento.querySelector('[data-action="remover-renda"]'));
  }else{
    document.querySelectorAll('[data-action="remover-renda"]').forEach(botao => {
      acao(botao);
      renderPendencias();
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
  if(!isEmpty(botao)){
    botao.addEventListener('click', (evento) => {
      acaoClickIncluirProponente();
    })
  }
}

const acaoClickIncluirProponente = () => {
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
}

const clickRemoverProponente = () => {
  const botao = document.querySelectorAll('[data-action="remover-proponente"]');
  botao.forEach(botao => {
    removeEventListener('click', botao);
    botao.addEventListener('click', async (evento) => {
      SwalAlert('confirmacao', 'question', 'Tem certeza que deseja remover?', 'Esta ação não poderá ser desfeita').then((retorno) => {
        if(retorno.isConfirmed){
          botao.closest('.accordion-item').remove();
          renderResumo();
          atualizarNumerosProponentes();
          renderPendencias();
        }
      });
    })
  })
}

const clickCopiar = () => {
  const btns = document.querySelectorAll('[data-action="copiar"]');
  btns.forEach(btn => {
    if(!isEmpty(btn)){
      try{
        btn.addEventListener('click', () => {
          const elemento = btn.closest('[data-node="card"]').querySelector('[data-copiar="texto"]');
          copiar(elemento.textContent || elemento.value).then(retorno => {
            feedback({html: '<i class="bi bi-check2"></i>', classe: 'btn btn-outline-success'});});
          })
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
  })
}

const clickDownload = (elemento) => {
  switch(elemento.dataset.download){
    case 'baixar-dados':
    //Selecionar Nome, CPF e data de nascimento de todos os proponentes
    const saida = new Array();
    const proponentes = document.querySelectorAll('.accordion-item');
    const primeirosNomes = new Array();
    proponentes.forEach((proponente, index) => {
      const nome = proponente.querySelector('[data-input="nome"]').value.trim();
      !isEmpty(nome) ? primeirosNomes.push(primeiroNome(nome)) : '';
      saida.push(`PROPONENTE ${index + 1}\n` +`NOME: ${!isEmpty(nome) ? nome.toUpperCase() : ''}\n` + `CPF: ${sanitizarCPF(proponente.querySelector('[data-input="cpf"]').value.trim())}\n` + `DT NASC: ${proponente.querySelector('[data-input="data_nascimento"]').value.trim()}\n` + `TELEFONE: ${proponente.querySelector('[data-input="telefone"]').value.replaceAll('-', '').trim()}\n` + `EMAIL: ${proponente.querySelector('[data-input="email"]').value.trim()}\n\n`)
    });
    criarEBaixarTXT(JSON.stringify(saida.join('\n')), `DADOS${!isEmpty(primeirosNomes) ? ' - ' + primeirosNomes.join(', ') : ''}`);
    break;
    
    case 'baixar-relatorio':
    //Selecionar conteúdo no textarea de relatório
    const relatorio = document.querySelector('[data-content="relatorio"]').value;
    criarEBaixarTXT(JSON.stringify(relatorio), "RELATORIO");
    break;

    case 'baixar-pendencias':
    //Selecionar conteúdo no textarea de pendências
    const pendencias = document.querySelector('[data-content="pendencias"]').value;
    criarEBaixarTXT(JSON.stringify(pendencias), "PENDENCIAS");
    break;
  }
}
window.clickDownload = clickDownload;

const criarEBaixarTXT = (conteudo, nome) => {
  let blob = new Blob([`${JSON.parse(conteudo)}`], {type: "text/plain;charset=utf-8"});
  saveAs(blob, `${nome.toUpperCase()}.txt`);
}

const criarEBaixarJSON = (conteudo, nome) => {
  let blob = new Blob([`${JSON.stringify(conteudo)}`], {type: "text/plain;charset=utf-8"});
  saveAs(blob, `${nome.toUpperCase()}.txt`);
}

function clickLimparProcesso(){
  const btn = document.querySelector('[data-action="limpar-processo"]');
  if(!isEmpty(btn)){
    btn.addEventListener('click', (evento) => {
      evento.preventDefault();
      
      SwalAlert('confirmacao', 'question', 'Tem certeza que deseja limpar todo o processo?', 'Esta ação não poderá ser desfeita').then((retorno) => {
        if(retorno.isConfirmed){
          document.querySelectorAll('[data-input]').forEach(input => {
            if(input.tagName.toLowerCase() == 'textarea' || input.tagName.toLowerCase() == 'input' && input.getAttribute('type') == 'text'){
              input.value = '';
            }else if(input.tagName.toLowerCase() == 'input' && input.getAttribute('type') == 'checkbox'){
              input.checked = false;
            }      
          })
      
          document.querySelectorAll('.accordion-item').forEach(item => { item.remove() });
          renderResumo();
          atualizarNumerosProponentes();
          renderPendencias();
        }
      });
    })
  }
}

export {
  clickIncluirRenda,
  clickRemoverRenda,
  clickIncluirProponente,
  clickRemoverProponente,
  clickCopiar,
  clickLimparProcesso
}
