/*

  Módulo: Validação de formulários, conjunto de funções para validação de formulários, 
  para usar criar uma função setando um objeto com  as funções para validacao que deseja ser chamada no módulo
  e chamar a função validacao(e, objValidation) no botão enviar 
  e/ou a função validacaoByFields(e, objValidation) no evento keyup

  Ex:
  function setFieldsToValidation(){
    var email = $('#email').val();

    var objValidation = [
      { field: '#email', isValid: PFTX.modules.validationForm.validadorEmail(email), msgErro: 'Email incorreto', required: true }
    ]

    return objValidation;
  }

  @autor: Lucas Ribeiro

*/

(function ($, window, document, undefined) {

  'use strict';

  PFTX.modules.validationForm = window.PFTX.modules.validationForm || {};

  PFTX.modules.validationForm.validaNomeCompleto = function(nome) {
    var nome = nome.trim();
    var nomeCompleto = nome.split(' ');

    if (nomeCompleto.length < 2) {
      return false;
    }

    return true;
  }

  PFTX.modules.validationForm.validaMaiorIdade = function(idade) {

    if (idade >= 18) {
      return true;
    }
    return false;
  }

  PFTX.modules.validationForm.validadorEmail = function(email) {
    var emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailValid.test(String(email).toLowerCase());
  }

  PFTX.modules.validationForm.validaData = function(data) {
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

  PFTX.modules.validationForm.validaCnpj = function (cnpj) {
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

  PFTX.modules.validationForm.validacao = function(e, objListValidation) {
    var listFields = objListValidation;

    // se algum item do array retornar falso não envia
    listFields.map(function (item, index) {
      if ($(item.field).val() == '' && item.required == true) {
        $(item.field).siblings('.erro').html('Campo obrigatório').show().addClass('field-invalid');
        e.preventDefault();
      } else if (item.isValid === false) {
        $(item.field).siblings('.erro').html(item.msgErro).show().addClass('field-invalid');
        e.preventDefault();
      } else {
        $(item.field).siblings('.erro').html(item.msgErro).hide().removeClass('field-invalid');
      }
    })

    if (!$('.erro').hasClass('field-invalid')) {
      $('.erro').siblings('input').val('');
    }
  }

  PFTX.modules.validationForm.validacaoByFields = function(fieldInFocus, objListValidation) {
    var listFields = objListValidation;
    const field = fieldInFocus.currentTarget;

    var infoItem = listFields.map(function (item, index) {
      if ($(item.field).val() == '' && item.required == true) {
        $(item.field).siblings('.erro').html('Campo obrigatório').show().addClass('field-invalid');
      }
      else if ('#' + field.id == item.field && item.isValid == false) {
        return item.msgErro;
      } else {
        return item.msgErro = '';
      }
    })

    $(field).siblings('.erro').html(infoItem).show();
  }

})(jQuery, window, document);