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

export{
  renderTooltips,
  renderPopover,
  renderPendencias
}