import { isEmpty, resizeTextArea, verificarCPF, verificarData, verificarEmail } from "./utilitarios.js";

const edicaoInputNome = () => {
  document.querySelectorAll('[data-input="nome"]').forEach(input => {
    input.addEventListener('input', () => {
      input.closest('[data-identify]').querySelectorAll('[data-content="nome"]').forEach(content => {
        content.textContent = !isEmpty(input.value) ? input.value.toUpperCase() : 'Nome do cliente';
      }) 
    })
  })
} 

const atualizarNumerosProponentes = () => {
  const accordions_headers = document.querySelectorAll('.accordion-header').forEach((elemento, index) => {
    const valorInputNome = elemento.closest('.accordion-item').querySelector('[data-input="nome"]').value;
    elemento.querySelector('span').innerHTML = `Proponente ${index + 1} - <b data-content="nome" data-information="nome-proponente">${!isEmpty(valorInputNome) ? valorInputNome.toUpperCase() : 'Nome do cliente'}</b>`;
    edicaoInputNome();
  })
}

const edicaoInputCPF = (input) => {
  input.addEventListener('input', () => {
    verificarCPF(input.value.trim()) ? input.parentElement.classList.remove('invalido') : input.parentElement.classList.add('invalido');
  })
}

const edicaoInputEmail = (input) => {
  input.addEventListener('input', () => {
    verificarEmail(input.value.trim()) ? input.parentElement.classList.remove('invalido') : input.parentElement.classList.add('invalido');
  })
}

const edicaoInputData = (input) => {
  input.addEventListener('input', () => {
    verificarData(input.value.trim()) ? input.parentElement.classList.remove('invalido') : input.parentElement.classList.add('invalido');
  })
}

const edicaoTextAreaRelatorio = (textarea) => {
  textarea.addEventListener('input', (evento) => {
    const initialHeight = parseInt(getComputedStyle(textarea).getPropertyValue('height'));
    textarea.addEventListener('input', () => {
      resizeTextArea(textarea)
    });
  })
}

const edicaoTextAreaPendencias = (textarea) => {
  textarea.addEventListener('input', (evento) => {
    const initialHeight = parseInt(getComputedStyle(textarea).getPropertyValue('height'));
    textarea.addEventListener('input', () => {
      resizeTextArea(textarea)
    });
  })
}

export {
  edicaoInputNome,
  atualizarNumerosProponentes,
  edicaoInputCPF,
  edicaoInputEmail,
  edicaoInputData,
  edicaoTextAreaRelatorio,
  edicaoTextAreaPendencias
}