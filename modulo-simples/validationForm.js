(function () {

  /*
  
  Módulo: Validação de formulários, conjunto de funções para validação de formulários,
  para usar criar um objeto com  as funções para validacao que deseja ser chamada no módulo
  e chamar a função validacao(e, objValidation) no botão enviar
  e/ou a função validacaoByFields(e, objValidation) no evento keyup
  
  Ex:
  
  var objValidation = [
    { field: '#email', isValid: validadorEmail(email), msgErro: 'Email incorreto', required: true }
  ]
  
  @autor: Lucas Ribeiro
  
  */


  validaInscricaoEstadual = function () {

    $('#isento,#cadastrar').on('click', function () {
      if ($('#isento').is(":checked")) {
        $('#inscricaoEstadual')
          .removeClass('field-invalid')
          .addClass('disabled')
          .attr('disabled', 'disabled')
          .val('').siblings('.erro')
          .hide();
      } else {
        $('#inscricaoEstadual').removeClass('disabled').removeAttr('disabled');
      }
    });

    var validaNumber = new RegExp(/^[0-9]{1,}$/);
    if (!validaNumber.test($('#inscricaoEstadual').val())) {
      var str = $('#inscricaoEstadual').val();
      var numbers = $('#inscricaoEstadual').val().substring(0, (str.length - 1));
      $('#inscricaoEstadual').val(numbers);
    }

    if ($('#inscricaoEstadual').val().length < 9) {
      return false;
    }

    return true;
  }

  validaTelefone = function (telefone) {
    if (telefone.val().length < 14) {
      telefone.mask('(00) 0000-0000');
      return false;
    } else if (telefone.val().length == 15) {
      telefone.mask('(00) 00000-0009');
      return true;
    } else if (telefone.val().length == 14) {
      telefone.mask('(00) 0000-00009')
      return true;
    }
  }

  cepAutoComplete = function (cep) {

    $('#cep').mask('99999-999');
    cep = cep.replace('-', '');

    if (cep != "") {
      if (cep) {

        $.get('/api/checkout/pub/postal-code/BRA/' + cep).then(function (dados) {

          $("#logradouro").val(dados.street);
          $("#bairro").val(dados.neighborhood);
          $("#numero").val(dados.number);
          $("#complemento").val(dados.reference);
          $("#cidade").val(dados.city);
          $("#estado").val(dados.state);

          if (dados.country == "BRA") {
            $("#pais").val("Brasil");
          }

          if (dados.street == "" || $("#cep").val().length < 9) {
            $('#cep').addClass("field-invalid").siblings('.erro').html("Cep inválido.").show();
          } else {
            $('#cep').removeClass("field-invalid").siblings('.erro').html("").hide();
          }
        })
      }
    }

    return true;
  }

  validaNomeCompleto = function (nome) {
    var nome = nome.trim();
    var nomeCompleto = nome.split(' ');

    if (nomeCompleto.length < 2) {
      return false;
    }

    return true;
  }

  validaMaiorIdade = function (idade) {

    if (idade >= 18) {
      return true;
    }
    return false;
  }

  validadorEmail = function (email) {
    var emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailValid.test(String(email).toLowerCase());
  }

  validaData = function (data) {
    var dataNascForm = data;
    var minYear = 1902;
    var maxYear = (new Date()).getFullYear();
    var maxMonth = (new Date()).getMonth() + 1;
    var maxDay = (new Date()).getDate();
    var dataSplit = data.split('/');
    var re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    var regs = dataNascForm.match(re);
    var dateNow = new Date();
    var dateInput = new Date(dataSplit[2] + '-' + dataSplit[1] + '-' + dataSplit[0]);

    if (!regs || dataNascForm.length < 10 || regs[1] < 1 || regs[1] > 31 || regs[2] < 1 || regs[2] > 12 || regs[3] < minYear || regs[3] > maxYear) {
      return false;
    } else if (dateInput.getTime() > dateNow.getTime()) {
      return false;
    }
    else {
      return true;
    }
  }

  validaCnpj = function (cnpj) {
    $('#cnpj').mask('99.999.999/9999-99');

    var cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
    var cnpjValidationRegex = cnpj;

    if (!cnpjRegex.test(cnpjValidationRegex)) {
      return false;
    }

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length != 14) return false;

    if (cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999")
      return false;

    var tamanho = cnpj.length - 2
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) {
      return false;
    }

    return true;
  };

  validacao = function (e, objListValidation) {
    var listFields = objListValidation;

    // se algum item do array retornar falso não envia
    listFields.map(function (item, index) {
      if ($(item.field).val() == '' && item.required == true) {
        $(item.field).addClass('field-invalid').siblings('.erro').html('Campo obrigatório').show()
        e.preventDefault();
      } else if (item.isValid === false) {
        $(item.field).addClass('field-invalid').siblings('.erro').html(item.msgErro).show();
        e.preventDefault();
      } else {
        $(item.field).removeClass('field-invalid').siblings('.erro').html(item.msgErro).hide();
      }
    })
  }

  validacaoByFields = function (fieldInFocus, objListValidation) {
    var listFields = objListValidation;
    const field = fieldInFocus.currentTarget;

    listFields.map(function (item, index) {
      if (('#' + field.id == item.field) && $(item.field).val() == '' && item.required == true) {
        $(item.field).addClass('field-invalid').siblings('.erro').html('Campo obrigatório').show();
      }
      else if (('#' + field.id == item.field) && item.isValid == false) {
        $(item.field).addClass('field-invalid').siblings('.erro').html(item.msgErro).show();
      }
      else if (('#' + field.id == item.field) && item.isValid == true) {
        $(item.field).removeClass('field-invalid').siblings('.erro').html('').hide();
      }
    })
  }

  $(document).ready(function () {
    validaInscricaoEstadual();
  })
})();


