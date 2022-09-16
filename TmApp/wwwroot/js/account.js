function CreateAccount() {

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    var resultBoolean = true;

    var login = document.getElementById("login").value;
    if (login == "") {
        resultBoolean = false;
    }
    var psw = document.getElementById("password").value;
    if (psw == "") {
        resultBoolean = false;
    }
    var confirmPassword = document.getElementById("confirmPassword").value;
    if (confirmPassword == "") {
        resultBoolean = false;
    }
    var nickname = document.getElementById("nickname").value;
    if (nickname == "") {
        resultBoolean = false;
    }
    var companyName = document.getElementById("companyName").value;
    if (companyName == "") {
        resultBoolean = false;
    }
    var cnpj = document.getElementById("CNPJNumber").value;
    if (cnpj == "") {
        resultBoolean = false;
    }


    if (resultBoolean) {
        var cityInscription = document.getElementById("cityInscription").value;
        var provinceInscription = document.getElementById("provinceInscription").value;
        var provinceIndex = document.getElementById("states").selectedIndex;
        var province = document.getElementById("states")[provinceIndex].innerHTML;
        var city = document.getElementById("cities").value;
        var region = document.getElementById("region").value;
        var address = document.getElementById("address").value;
        var number = document.getElementById("number").value;
        var complement = document.getElementById("complement").value;
        var cep = document.getElementById("cep").value;
        var email = document.getElementById("email").value;
        var completeName = document.getElementById("completeName").value;
        var ddd = document.getElementById("ddd").value;
        var phone = document.getElementById("phone").value;
        var privilege = document.getElementById("privilege").value;

        $.ajax({
            url: "/Account/Create",
            type: 'POST',
            data: {
                __RequestVerificationToken: token,
                login: login,
                psw: psw,
                confirmPassword: confirmPassword,
                nickname: nickname,
                companyName: companyName,
                cnpj: cnpj,
                cityInscription: cityInscription,
                provinceInscription: provinceInscription,
                province: province,
                city: city,
                region: region,
                address: address,
                number: number,
                complement: complement,
                cep: cep,
                email: email,
                completeName: completeName,
                ddd: ddd,
                phone: phone,
                privilege: privilege
            },

            success: function (data) {
                window.location.href = data;
            }
        });
        if (psw != confirmPassword) {
            alert("Insira a mesma senha nos campos delimitados");
        }
        return false;
    }
    else {
        changeAlarmLabel("Preencha Todos os Campos Principais");
    }

}

function CreateSimpleAccount(idSecondaryUser) {

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    var login = document.getElementById("login").value;
    var psw = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var nickname = document.getElementById("nickname").value;
    var panels = ";";


    var selectedPanels = document.getElementById("selectedPanels");
    selectedPanels = selectedPanels.getElementsByTagName("label");
    var id = 0;

    for (var counter = 0; selectedPanels.length > counter; counter++) {
        id = selectedPanels[counter].id.split("_")[1];
        panels = panels + id + ";";
    }



    $.ajax({
        url: "/Account/CreateSimple",
        type: 'POST',
        data: {
            __RequestVerificationToken: token,
            login: login,
            psw: psw,
            confirmPassword: confirmPassword,
            nickname: nickname,
            idSecondaryUser: idSecondaryUser,
            panels: panels
        },
        success: function (data) {
            window.location.href = data;
        }
    });

    if (psw != confirmPassword) {
        alert("Insira a mesma senha nos campos delimitados");
    }
    return false;
}

function EditAccount() {

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    var id = document.getElementById("accountId").innerText;
    var login = document.getElementById("login").value;
    var psw = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var nickname = document.getElementById("nickname").value;
    var companyName = document.getElementById("companyName").value;
    var region = document.getElementById("region").value;
    var address = document.getElementById("address").value;
    var number = document.getElementById("number").value;
    var complement = document.getElementById("complement").value;
    var cep = document.getElementById("cep").value;
    var email = document.getElementById("email").value;
    var completeName = document.getElementById("completeName").value;
    var ddd = document.getElementById("ddd").value;
    var phone = document.getElementById("phone").value;
    var compliance = document.getElementById("compliance").checked;

    var city = document.getElementById("cities").value;
    var statesIndex = document.getElementById("states").selectedIndex;
    var state = document.getElementById("states")[statesIndex].innerHTML;

    $.ajax({
        url: "/Account/Edit",
        type: 'POST',
        data: {
            __RequestVerificationToken: token,
            id: id,
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
            compliance: compliance,
            state: state,
            city: city
        },
        success: function (data) {
            window.location.href = data;
        }
    });

    if (psw != confirmPassword) {
        alert("Insira a mesma senha nos campos delimitados");
    }

    return false;
}


function EditSimpleAccount() {

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    var idUser = document.getElementById("simpleIdUser").innerHTML;
    var login = document.getElementById("login").value;
    var psw = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var nickname = document.getElementById("nickname").value;
    var panels = ";";


    var selectedPanels = document.getElementById("selectedPanels");
    selectedPanels = selectedPanels.getElementsByTagName("label");
    var id = 0;

    for (var counter = 0; selectedPanels.length > counter; counter++) {
        id = selectedPanels[counter].id.split("_")[1];
        panels = panels + id + ";";
    }

    $.ajax({
        url: "/Account/EditSimple",
        type: 'POST',
        data: {
            __RequestVerificationToken: token,
            id: idUser,
            login: login,
            psw: psw,
            confirmPassword: confirmPassword,
            nickname: nickname,
            panels: panels
        },
        success: function (data) {
            window.location.href = data;
        }
    });
    if (psw != confirmPassword) {
        alert("Insira a mesma senha nos campos delimitados");
    }
    return false;
}

function DeleteAccount() {
    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();
    var id = document.getElementById("accountId").innerText;

    $.ajax({
        url: "/Account/Delete",
        type: 'POST',
        data: {
            __RequestVerificationToken: token,
            idValue: id
        },
        success: function (data) {
            window.location.href = data;
        }
    });
    return false;
}

function callCnpjfunction(value) {
    var number = value.replace(/\D/g, "");
    var numberForArray = value.replace(/\D/g, " ");

    var finalString = "";
    var arrayNumber = numberForArray.split(" ");

    finalString = arrayNumber[0];

    if (number.length >= 2) {
        finalString = finalString + ".";
        if (arrayNumber[1] != undefined) {
            finalString = finalString + arrayNumber[1];
        }
    }

    if (number.length >= 5) {
        finalString = finalString + ".";
        if (arrayNumber[2] != undefined) {
            finalString = finalString + arrayNumber[2];
        }
    }
    if (number.length >= 8) {
        finalString = finalString + "/";
        if (arrayNumber[3] != undefined) {
            finalString = finalString + arrayNumber[3];
        }
    }

    if (number.length >= 12) {
        finalString = finalString + "-";
        if (arrayNumber[4] != undefined) {
            finalString = finalString + arrayNumber[4];
        }
    }

    document.getElementById("CNPJNumber").value = finalString;
}


function changeValueOfAccountChecker() {
    var checker = document.getElementById("changeChecker");

    checker.value = true;
}

function checkChangesAccountEdit() {
    var checker = document.getElementById("changeChecker").value;
    var checkDiv = document.getElementById("checkerDiv");
    var idUser = document.getElementById("accountId").innerHTML;

    if (checker) {
        checkDiv.style.display = "block";
    }
    else {
        window.location.href = "/AlarmConfiguration/Index/" + idUser;
    }
}



function editUserReturnAlert() {
    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    var id = document.getElementById("accountId").innerText;
    var login = document.getElementById("login").value;
    var psw = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var nickname = document.getElementById("nickname").value;
    var companyName = document.getElementById("companyName").value;
    var region = document.getElementById("region").value;
    var address = document.getElementById("address").value;
    var number = document.getElementById("number").value;
    var complement = document.getElementById("complement").value;
    var cep = document.getElementById("cep").value;
    var email = document.getElementById("email").value;
    var completeName = document.getElementById("completeName").value;
    //var ddd = document.getElementById("ddd").value;
    var phone = document.getElementById("phone").value;
    var compliance = document.getElementById("compliance").checked;




    $.ajax({
        url: "/Account/Edit",
        type: 'POST',
        data: {
            __RequestVerificationToken: token,
            id: id,
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
            //ddd: ddd,
            phone: phone,
            compliance: compliance
        },
        success: function (data) {
            window.location.href = "/alarmConfiguration/Index/" + id;
        }
    });

    return false;
}

function redirectToAlert() {
    var id = document.getElementById("accountId").innerText;

    window.location.href = "/alarmConfiguration/Index/" + id;
}

function InputCityState() {
    var value = document.getElementById("stateLabel").textContent;
    var finalValue = '';

    switch (value) {
        case "Acre":
            finalValue = 'ac';
            break;
        case "Alagoas":
            finalValue = 'al';
            break;
        case "Amapá":
            finalValue = 'ap';
            break;
        case "Amazonas":
            finalValue = 'am';
            break;
        case "Bahia":
            finalValue = 'bh';
            break;
        case "Ceará":
            finalValue = 'ce';
            break;
        case "Distrito Federal":
            finalValue = 'df';
            break;
        case "Espírito Santo":
            finalValue = 'es';
            break;
        case "Goiás":
            finalValue = 'go';
            break;
        case "Maranhão":
            finalValue = 'ma';
            break;
        case "Mato Grosso":
            finalValue = 'mt';
            break;
        case "Mato Grosso do Sul":
            finalValue = 'ms';
            break;
        case "Minas Gerais":
            finalValue = 'mg';
            break;
        case "Pará":
            finalValue = 'pa';
            break;
        case "Paraíba":
            finalValue = 'pb';
            break;
        case "Paraná":
            finalValue = 'pr';
            break;
        case "Pernambuco":
            finalValue = 'pe';
            break;
        case "Piauí":
            finalValue = 'pi';
            break;
        case "Rio de Janeiro":
            finalValue = 'rj';
            break;
        case "Rio Grande do Norte":
            finalValue = 'rn';
            break;
        case "Rio Grande do Sul":
            finalValue = 'rs';
            break;
        case "Rondônia":
            finalValue = 'ro';
            break;
        case "Roraima":
            finalValue = 'rr';
            break;
        case "Santa Catarina":
            finalValue = 'sc';
            break;
        case "São Paulo":
            finalValue = 'sp';
            break;
        case "Sergipe":
            finalValue = 'se';
            break;
        case "Tocantins":
            finalValue = 'to';
            break;
    }
    if (finalValue == "") {
        finalValue = value;
    }

    var stateSelector = document.getElementById("states");
    stateSelector.value = finalValue;
    var citySelector = document.getElementById("cities");
    var cityName = document.getElementById("cityLabel").innerText;


    var c = statesAndCities[0][finalValue];
    for (var counter = 0; counter < c.length; counter++) {
        var option = document.createElement("option");
        option.text = c[counter];
        citySelector.appendChild(option);
        if (cityName == c[counter]) {
            citySelector.selectedIndex = counter;
        }
    }
}

function TransferPanelToSelected(id) {
    var name = document.getElementById("VariableSelected_" + id).innerHTML;
    var formerDiv = document.getElementById("panel_" + id);
    formerDiv.parentNode.removeChild(formerDiv);

    var mainDiv = document.getElementById("selectedPanels");
    var divPanel = document.createElement("div");
    divPanel.id = "panel_" + id;
    mainDiv.appendChild(divPanel);

    var icon = document.createElement("i");    
    icon.className = "fas fa fa-arrow-alt-circle-right arrowHover arrowIcon";
    icon.style.paddingRight = "10px";
    icon.onclick = function () { deletePanelFromAccount(id) };
    divPanel.appendChild(icon);

    var label = document.createElement("label");
    label.id = "VariableSelected_" + id;
    label.innerHTML = name;
    divPanel.appendChild(label);
}



function deletePanelFromAccount(id) {

    var name = document.getElementById("VariableSelected_" + id).innerHTML;
    var formerDiv = document.getElementById("panel_" + id);
    formerDiv.parentNode.removeChild(formerDiv);

    var mainDiv = document.getElementById("avaiblePanels");
    var divPanel = document.createElement("div");
    divPanel.id = "panel_" + id;
    mainDiv.appendChild(divPanel);

    var icon = document.createElement("i");
    icon.className = "fas fa fa-arrow-alt-circle-left arrowHover arrowIcon";
    icon.style.paddingRight = "10px";
    icon.onclick = function () { TransferPanelToSelected(id) };
    divPanel.appendChild(icon);

    var label = document.createElement("label");
    label.id = "VariableSelected_" + id;
    label.innerHTML = name;
    divPanel.appendChild(label);

}

function deleteSimpleUser(id) {    

    $.ajax({
        url: "/Account/DeleteSimple",
        type: 'POST',
        data: {
            id: id,
        },
        success: function (data) {
            var row = document.getElementById("row_" + id);
            row.parentNode.removeChild(row);

            alert("Usuario simples deletado");
        }
    });

}



function addSipleUserDelete(id) {
    let alarmDeleteButton = document.getElementById("alarmDeleteButton");
    alarmDeleteButton.onclick = function () { deleteSimpleUser(id) }


    showDeleteAlarmWindown();
}