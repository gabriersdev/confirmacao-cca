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

function resizeTextArea(elemento){
  while( $(elemento).outerHeight() < elemento.scrollHeight +
  parseFloat($(elemento).css("borderTopWidth")) +
  parseFloat($(elemento).css("borderBottomWidth")) && $(elemento).height() < 500
  ) {
    $(elemento).height($(elemento).height()+1);
  };
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
  primeiroNome
}