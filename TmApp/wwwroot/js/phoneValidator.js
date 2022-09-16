

function dddValidate(value) {
    //var number = value.replace(/\D/g, "");
    //var numberForArray = value.replace(/\D/g, " ");

    //var finalString = "";
    //var arrayNumber = numberForArray.split(" ");

    //finalString = arrayNumber[0];

    //if (number.length == 2) {
    //    finalString = "(" + finalString + ")";
    //    if (arrayNumber[1] != undefined) {
    //        finalString = finalString + arrayNumber[1];
    //    }
    //}

    //document.getElementById("ddd").value = finalString;
}

function phoneValidate(value) {
    var number = value.replace(/\D/g, "");
    var numberForArray = value.replace(/\D/g, " ");

    var finalString = "";
    var arrayNumber = numberForArray.split(" ");

    finalString = arrayNumber[0];

    if (number.length >= 5) {
        finalString = finalString + "-";
        if (arrayNumber[1] != undefined) {
            finalString = finalString + arrayNumber[1];
        }
    }

    if (number.length == 9) {
        finalString = finalString;
        if (arrayNumber[2] != undefined) {
            finalString = finalString + arrayNumber[2];
        }
    }

    document.getElementById("phone").value = finalString;
}

function zipCodeValidate(value) {
    var number = value.replace(/\D/g, "");
    var numberForArray = value.replace(/\D/g, " ");

    var finalString = "";
    var arrayNumber = numberForArray.split(" ");

    finalString = arrayNumber[0];

    if (number.length >= 5) {
        finalString = finalString + "-";
        if (arrayNumber[1] != undefined) {
            finalString = finalString + arrayNumber[1];
        }
    }

    if(number.length == 9) {
        finalString = finalString;
        if (arrayNumber[2] != undefined) {
            finalString = finalString + arrayNumber[2];
        }
    }

    document.getElementById("cep").value = finalString;
}

//function prefix(ddd) {
//    ddd = ddd.replace(/\D/g, ""); //Remove todos os caracteres que não sejam dígito
//    ddd = ddd.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
//    return ddd;
//}

//function phone(tel) {
//    tel = tel.replace(/\D/g, ""); //Remove todos os caracteres que não sejam dígito
//    tel = tel.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
//    return tel;
//}

//function zipCode(cep) {
//    cep = cep.replace(/\D/g, "");
//    cep = cep.replace(/(\d)(\d{3})$/, "$1-$2");
//    return cep;
//}

//function id(el) {
//    return document.getElementById(el);
//}

//window.onload = function () {
//    id('ddd').onkeyup = function () {
//        mascara(this, ddd);
//    }
//}

//window.onload = function () {
//    id('phone').onkeyup = function () {
//        mascara(this, phone);
//    }
//}

//window.onload = function () {
//    id('cep').onkeyup = function () {
//        mascara(this, zipCode);
//    }
//}