// Como usar criar função setando objeto com funcoes para validacao  e chamar no botao enviar e keyup 
function setFieldsToValidation() {
  var nome = $('#nome').val();
  var idade = $('#idade').val();
  var email = $('#email').val();

  var objValidation = [
    { field: '#nome', isValid: PFTX.modules.validationForm.validaNomeCompleto(nome), msgErro: 'Deve ser informado o nome completo.' },
    { field: '#idade', isValid: PFTX.modules.validationForm.validaMaiorIdade(idade), msgErro: 'Usuário deve ser maior de idade.' },
    { field: '#email', isValid: PFTX.modules.validationForm.validadorEmail(email), msgErro: 'Email incorreto' },
  ]

  return objValidation;
}

$(document).ready(function () {
  $('#enviar').click(function (e) {
    var objValidation = setFieldsToValidation();
    validacao(e, objValidation);
  })

  $("input").keyup(function (e) {
    var objValidation = setFieldsToValidation();
    validacaoByFields(e, objValidation);
  })
});