var typingTimer;
var doneTypingInterval = 1000;


function CallPage() {
    $.ajax({
        url: "/Login/CreateUser",
        type: 'POST',
        data: {

        },
        success: function (data) {
        }
    });
}


function RegisterUsers() {

    var login = document.getElementById("login").value;
    var psw = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var nickname = document.getElementById("nickname").value;
    var companyName = document.getElementById("companyName").value;




    var cnpjNumber = document.getElementById("CNPJNumber").value;;
    var municipalNumber = document.getElementById("municipalNumber").value;
    var stateNumber = document.getElementById("stateNumber").value;
    var stateName = document.getElementById("states").selectedIndex;

    if (stateName == -1) {
        stateName = "";
    }
    else {
        stateName = document.getElementById("states")[stateName].value;
    }

    var cityName = document.getElementById("cities").selectedIndex;
    if (cityName == -1) {
        cityName = " ";
    }
    else {
        cityName = document.getElementById("cities")[cityName].value;
    }

    var region = document.getElementById("region").value;
    var address = document.getElementById("address").value;
    var number = document.getElementById("number").value;
    var complement = document.getElementById("complement").value;
    var cep = document.getElementById("cep").value;
    var email = document.getElementById("email").value;
    var completeName = document.getElementById("completeName").value;
    var ddd = document.getElementById("ddd").value;
    var phone = document.getElementById("phone").value;

    var privelegeDoc = document.getElementById("permissionLevel");

    var comfirm1 = document.getElementById("confirm1").checked;
    /*    var comfirm2 = document.getElementById("confirm2").checked;*/

    if (comfirm1 == true) {
        if (psw == confirmPassword) {

            $.ajax({
                url: "/Login/AddUser",
                type: 'POST',
                data: {
                    login: login,
                    psw: psw,
                    confirmPassword: confirmPassword,
                    nickname: nickname,
                    companyName: companyName,
                    region: region,
                    address: address,
                    number: number,
                    complement: complement,
                    cep: cep,
                    email: email,
                    completeName: completeName,
                    ddd: ddd,
                    phone: phone,
                    cnpjNumber: cnpjNumber,
                    municipalNumber: municipalNumber,
                    stateNumber: stateNumber,
                    stateName: stateName,
                    cityName: cityName,
                    province: stateName
                },
                success: function (data) {
                    window.location.href = data = "/Login/Login";
                }
            });
        }
        else if (psw != confirmPassword) {
            alert("Insira a mesma senha nos campos delimitados");
        }
    }
    else {
        alert("Por favor Confirme todos os campos antes de salvar");
    }
}

/* Linha 50 => Se precisar do 2º confirm futuramente, inserir (&& confirm2 == true) ... */