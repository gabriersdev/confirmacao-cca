"use strict";

(() => {
  hljs.highlightAll();

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  $(document).ready(function(){
    $('[data-bs-toggle="popover"]').popover();  
  });

  document.querySelectorAll('[data-recarrega-pagina]').forEach(botao => {
    botao.addEventListener('click', () => {
      window.location.reload;
    })
  })

})();