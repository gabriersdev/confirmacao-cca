"use strict";

import { conteudos } from './modulos/conteudos.js';
import { atualizarDatas, isEmpty, atribuirLinks, ordernarString, limparEFocar, sanitizarCPF, sanitizarNumero, sanitizarString, criarEBaixarArquivo, resizeTextArea } from './modulos/utilitarios.js';
import { verificacao } from './modulos/confirmacao.js';
import { funcoesBase } from './modulos/funcoes-base.js';
import { adicionarOpcoesAutoComplete, renderConteudosPagina } from './modulos/funcoes-de-conteudo.js';

(() => {  
  // Redirecionamento para a página de mudanças
  try{
    document.querySelector('html').setAttribute('style', 'display: none !important'); 
    window.location.replace('https://gabrieszin.github.io/confirmacao-cca/mudamos.html');
  }catch(error){}
  
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
    $(body).append(conteudos.conteudo_pagina_desligamento)
    
    setTimeout(() => {
      // $('[data-input="contato"]').mask('SSSSSSSSSSSSSSS ')
      // $('[data-input="cliente"]').mask('SSSSSSSSSSSSSSS')
    }, 0)
    
    // Página ignora preventDefault() se não houver tiver o setTimeout()
    setTimeout(() => {
      $('[data-action="form-laudo"]').submit((event) => {
        event.preventDefault()
        const saida = new Array();
        
        event.target.querySelectorAll('[data-input]').forEach(elemento => {
          if(['textarea', 'input'].includes(elemento.tagName.toLowerCase())){
            console.log(elemento.dataset.input)
            switch(elemento.dataset.input){
              case 'CPF':
              case 'cpf':
              case 'CEP':
              case 'cep':
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
      
      $('textarea').each((index, elemento) => {
        resizeTextArea(elemento);
      })
      
      $('textarea').on('input', (evento) => {
        resizeTextArea(evento.target);
      })
      
    }, 10)
    
    try{
      document.querySelector('[data-form="desligamento-internalizado"] [data-form="conteudo-texto"]').value = `Prezados, bom dia! \n\nGentileza gerar formulários e dar andamento ao processo que está em desligamento.\n\nModalidade: \nEmpreendimento: \nUnidade: \nValor de contrato: \nValor de financiamento: \nValor de FGTS: \n\n[Observações]`;
    }catch(error){

    }
    
    async function getCartorios(){
      const response = await fetch('https://apicartorioshmlg.registrocivil.org.br/api/cartorios/geolocalizacao?estado=MG&apikey=SECRET')
      return response.json();
    }
    
    let cartorios = new Array();

    const cartorios_imoveis = [
      "1º Oficio de Registro de Imoveis da Comarca de Belo Horizonte",
      "1º Tabelionato de Protesto de Titulos de Belo Horizonte",
      "2 Ofício de Registro de Títulos e Documentos",
      "2O Ofício de Registro de Imóveis de Belo Horizonte",
      "2º Tabelionato de Protesto de Títulos de Belo Horizonte",
      "3º Ofício de Registro de Imóveis de Belo Horizonte",
      "3º Tabelionato de Protesto de Títulos de Belo Horizonte",
      "4º Ofício de Notas de Belo Horizonte",
      "6O. Ofício de Registro de Imóveis de Bh",
      "Belo Horizonte Cartorio de Paz e Registro Civil 1 Subd Mg",
      "Belo Horizonte Cartório do 3º Ofício de Notas",
      "Cartório 2º Oficio de Notas de Belo Horizonte",
      "Cartório 9º Oficio de Notas de Belo Horizonte",
      "Cartorio do 10º Oficio de Notas de Belo Horizonte",
      "Cartório do 1° Ofício de Notas de Bh",
      "Cartório do 4º Ofício de Registro de Imóveis de Belo Horizonte",
      "Cartório do 5º Ofício de Registro de Imóveis de Belo Horizonte",
      "Cartório do 7° Ofício de Notas",
      "Cartorio do 7º Oficio do Reg. Imoveis",
      "Cartorio do Quinto Oficio de Notas",
      "Cartório do Registro Civil e Notas do Distrito do Barreiro",
      "Cartorio Registro Civil 3ºSubdistrito de Belo Horizonte",
      "Oficio do 4º Tabelionato de Protestos de Belo Horizonte/mg",
      "Ofício do 6º Tabelionato de Notas",
      "Oficio do Registro de Distribuição de Protesto de Títulos",
      "Primeiro Ofício de Registro de Titulos e Documentos de Belo Horizonte",
      "Registro Civil das Pessoas Jurídicas",
      "Registro Civil do Quarto Subdistrito",
      "Segundo Subdistrito de Registro Civil das Pessoas Naturais de Belo Horizonte - Mg",
      "Serviço de Registro Civil das Pessoas Naturais do Distrito de Venda Nova",
      "Serviço Notarial do 8º Ofício de Belo Horizonte"
    ]
    
    getCartorios().then((retorno) => {
      cartorios = retorno.concat(cartorios_imoveis)
      let cartorio;

      for (cartorio of cartorios){
        if(cartorio.nome !== undefined){
          $('#lista-cartorios').append(`<option value='${cartorio.nome}'></option>`);
        }else{
          $('#lista-cartorios').append(`<option value='${cartorio}'></option>`);
        }
      }
    })
  }
  
  $(body).prepend(conteudos.nav)
  $(body).append(conteudos.rodape)
  
  window.addEventListener("load", function () {
    $('.overlay').hide();
    
    // funcoesBase();
    atribuirLinks();
    atualizarDatas();
    
    setTimeout(() => {
      $('[data-content="secao-controlada"] .card-header').on('click', (evento) => {
        $('[data-content="secao-controlada"] .card-body').toggleClass('none');
        if($('[data-content="secao-controlada"] .card-body').css('display') !== 'none'){
          // $('[data-content="secao-controlada"] .card-header span').text('Clique para fechar');
          $('[data-content="secao-controlada"] .card-header span').text('');
        }else{
          $('[data-content="secao-controlada"] .card-header span').text('Clique para abrir');
        }
      })
      
      $('.btn-copy-float').on('click', (evento) => {
        evento.preventDefault();
        const btn = document.querySelector('.btn-copy-float')
        const [html_inicial, cor_inicial, display_inicial] = ['<i class="bi bi-clipboard2"></i>', '#D3D3D3', 'none'];
        try{
          navigator.clipboard.writeText(document.querySelector('[data-form="conteudo-texto"]').innerText.trim() || document.querySelector('[data-form="conteudo-texto"]').value.trim()).then(() => {
          })
          btn.style.backgroundColor = '#99CC99';
          btn.innerHTML = '<i class="bi bi-clipboard2-check"></i>';
        }catch{
          btn.style.backgroundColor = '#F0928B';
          btn.innerHTML = '<i class="bi bi-clipboard2-x"></i>';
        }finally{
          btn.style.display = 'block';
        }
        
        setTimeout(() => {
          btn.style.backgroundColor = cor_inicial;
          btn.innerHTML = html_inicial;
          btn.style.display = display_inicial;
        }, 1000)
      })
    }, 0)
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
