import { isEmpty } from "./utilitarios.js";

const edicaoInputNome = () => {
  document.querySelectorAll('[data-input="nome"]').forEach(input => {
    input.addEventListener('input', () => {
      input.closest('[data-identify]').querySelectorAll('[data-content="nome"]').forEach(content => {
        content.textContent = !isEmpty(input.value) ? input.value : 'Nome do cliente';
      }) 
    })
  })
} 

export {
  edicaoInputNome
}