setFieldsToValidation = function () {
  var dataCL = {}, dataAD = {},
    nomeFantasia = $('#nomeFantasia').val(),
    cnpj = $('#cnpj').val(),
    inscricaoEstadual = $('#inscricaoEstadual').val(),
    isento = $('#isento').val(),
    email = $('#email').val(),
    cep = $('#cep').val(),
    nomeFantasia = $('#nomeFantasia').val(),
    contatoResponsavel = $('#contatoResponsavel').val(),
    telefone = $('#telefone'),
    razaoSocial = $('#razaoSocial').val(),
    cep = $('#cep').val(),
    logradouro = $('#logradouro').val(),
    numero = $('#numero').val(),
    bairro = $('#bairro').val(),
    complemento = $('#complemento').val(),
    cidade = $('#cidade').val(),
    estado = $('#estado').val(),
    pais = $('#pais').val();

  objValidation = [
    { field: '#email', isValid: validadorEmail(email), msgErro: 'Email no formato inválido.', required: true },
    { field: '#cep', isValid: cepAutoComplete(cep), msgErro: 'Cep inválido.', required: false },
    { field: '#cnpj', isValid: validaCnpj(cnpj), msgErro: 'CNPJ inválido.', required: true },
    { field: '#nomeFantasia', isValid: true, msgErro: 'Campo obrigatório.', required: true },
    { field: '#telefone', isValid: validaTelefone(telefone), msgErro: 'Telefone inválido.', required: true },
    { field: '#inscricaoEstadual', isValid: validaInscricaoEstadual(), msgErro: 'Inscrição Estadual inválida.', required: true },
  ]

  dataCL.email = email;
  dataCL.corporateDocument = cnpj;
  dataCL.stateRegistration = inscricaoEstadual;
  dataCL.tradeName = nomeFantasia;
  dataCL.businessPhone = telefone;
  dataCL.contatoResponsavel = contatoResponsavel;
  dataCL.corporateName = razaoSocial;
  dataAD.postalCode = cep;
  dataAD.street = logradouro;
  dataAD.number = numero;
  dataAD.neighborhood = bairro;
  dataAD.complement = complemento;
  dataAD.city = cidade;
  dataAD.state = estado;
  dataAD.country = pais;

  return [objValidation, dataCL, dataAD];
},
formRegister = function () {
  $("#cadastrar").on('click', function (e) {
    var isValid = false;
    var objValidation = Common.setFieldsToValidation();
    validacao(e, objValidation[0]);

    if ($('.field-invalid').length <= 0) {
      isValid = true;
    }

    if (isValid) {
      $.ajax({
        headers: {
          'Accept': 'application/vnd.vtex.ds.v10+json',
          'Content-Type': 'application/json; charset=UTF-8',
          'REST-Range': 'resources=0-10'
        },
        type: "PATCH",
        url: "/lojasawary/dataentities/CL/documents",
        dataType: 'json',
        crossDomain: true,
        data: JSON.stringify(objValidation[1]),
        success: function (response) {

        },
        error: function (data) {

        }
      });

      $.ajax({
        headers: {
          'Accept': 'application/vnd.vtex.ds.v10+json',
          'Content-Type': 'application/json; charset=UTF-8',
          'REST-Range': 'resources=0-10'
        },
        type: "PATCH",
        url: "/lojasawary/dataentities/AD/documents",
        dataType: 'json',
        crossDomain: true,
        data: JSON.stringify(objValidation[2]),
        success: function (response) {

        },
        error: function (data) {

        }
      });
    }
  })

  $(".form-register input").focus(function (e) {
    var objValidation = Common.setFieldsToValidation();
    validacaoByFields(e, objValidation[0]);
  })

  $(".form-register input").keyup(function (e) {
    var objValidation = Common.setFieldsToValidation();
    validacaoByFields(e, objValidation[0]);
  })
}