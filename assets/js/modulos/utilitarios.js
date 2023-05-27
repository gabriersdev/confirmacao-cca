const isEmpty = (valor) => {
  if(typeof valor == 'string'){
    return valor == undefined || valor == null || valor.length <= 0;
  }else if(Array.isArray(valor)){
    return valor.length <= 0;
  }else{
    return valor == undefined || valor == null
  }
}

const capitalize = (valor) => {
  return valor.charAt(0).toUpperCase() + valor.substr(1, valor.length);
}

const atualizarDatas = () => {
  const dataAtual = new Date();
  document.querySelectorAll("[data-ano-atual]").forEach(area => {
    area.textContent = `${dataAtual.getFullYear()}`;
  })
} 

function atribuirLinks(){
  const linkElementos = document.querySelectorAll('[data-link]');
  
  linkElementos.forEach(link => {
    switch(link.dataset.link.toLowerCase().trim()){
      case 'arquivos':
      link.href = './arquivos.html';
      break;
      
      case 'confirmacao':
      link.href = './index.html';
      break;
      
      case 'consultas':
      link.href = './consultas.html';
      break;
      
      case 'github-dev':
      link.href = 'https://github.com/gabrieszin';
      break;
      
      case 'github-projeto':
      link.href = 'https://github.com/gabrieszin/confirmacao-cca';
      break;
    }
  })
}

const controleFechamentoModal = () => {
  const modais = document.querySelectorAll('.modal');
  modais.forEach(modal => {
    const btnFecha = modal.querySelector('[data-modal-fecha]');
    btnFecha.addEventListener('click', () => {
      $('#' + modal.id).modal('hide');
    })
  })
}

function sanitizarString(string){
  if(typeof string == 'string'){
    const substituir = [
      {
        original: '-',
        subst: ''
      },
      {
        original: '(',
        subst: ''
      },
      {
        original: ')',
        subst: ''
      },
      {
        original: ' ',
        subst: ''
      },
    ]
    
    substituir.forEach(substituicao => {
      string = string.replace(substituicao.original, substituicao.subst)
    })
    
    return string.trim();
  }else{
    console.log('O tipo do parâmetro passado não é uma string.');
    return null;
  }
}

async function SwalAlert(tipo, icon, title, text, mensagem){
  tipo = tipo.toLowerCase().trim();
  if(tipo == 'confirmacao'){
    const dialog = await Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      focusCancel: true
    })
    
    return new Promise((resolve, reject) => {
      resolve({isConfirmed: dialog.isConfirmed})
    })
  }
  
  else if(tipo == 'aviso'){
    Swal.fire({
      icon: icon,
      title: title,
      text: text
    })
  }
  
  else if(tipo == 'error'){
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      footer: mensagem
    }) 
  }
}

function resizeTextArea(textarea){
  while( $(textarea).outerHeight() < textarea.scrollHeight +
  parseFloat($(textarea).css("borderTopWidth")) +
  parseFloat($(textarea).css("borderBottomWidth")) && $(textarea).height() < 500
  ) {
    $(textarea).height($(textarea).height()+1);
  };
  // const initialHeight = parseInt(getComputedStyle(textarea).getPropertyValue('height'));
  // textarea.style.height = `${initialHeight}px`;
  // const scrollHeight = textarea.scrollHeight;
  // const newHeight = textarea.scrollHeight - initialHeight;
  // const t = newHeight < scrollHeight ? (scrollHeight + newHeight) < initialHeight ? initialHeight : scrollHeight : newHeight;
  // textarea.style.height = `${t}px`;
  // console.log(initialHeight, scrollHeight, newHeight, t)
}

const copiar = async (valor) => {
  await navigator.clipboard.writeText(valor);
}

function sanitizarCPF(cpf){
  return cpf.toString().replaceAll('.', '').replaceAll('-', '');
}

function primeiroNome(nome){
  const nome_separado = nome.split(' ');
  return nome_separado[0];
}

function verificarCPF(cpf){
  cpf = cpf.replace(/\D/g, '');
  
  switch (cpf){
    case '00000000000':
    resultado = false
    break;
    case '11111111111':
    resultado = false
    break;
    case '22222222222':
    resultado = false
    break;
    case '33333333333':
    resultado = false
    break;
    case '44444444444':
    resultado = false
    break;
    case '55555555555':
    resultado = false
    break;
    case '66666666666':
    resultado = false
    break;
    case '77777777777':
    resultado = false
    break;
    case '88888888888':
    resultado = false
    break;
    case '99999999999':
    resultado = false
    break;
    default: 
    if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var resultado = true;
    [9,10].forEach(function(j){
      var soma = 0, r;
      cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
        soma += parseInt(e) * ((j+2)-(i+1));
      });
      r = soma % 11;
      r = (r <2)?0:11-r;
      if(r != cpf.substring(j, j+1)) resultado = false;
    });
  }
  
  return resultado;
}

const verificarEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
}

const verificarData = (data) => {
  if(data.replaceAll('/', '').length == 8){
    const data_moment = moment(data, "DD/MM/YYYY");
    return data_moment._isValid && (data_moment.get('year') <= moment().get('year') - 18);
  }
  return false;
}

export{
  isEmpty,
  capitalize,
  atualizarDatas,
  atribuirLinks,
  controleFechamentoModal,
  sanitizarString,
  SwalAlert,
  resizeTextArea,
  copiar,
  sanitizarCPF,
  primeiroNome,
  verificarCPF,
  verificarEmail,
  verificarData
}