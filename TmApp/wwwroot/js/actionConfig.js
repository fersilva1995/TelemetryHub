function CreateActionConfig() {

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    var nameValue = document.getElementById("name").value;
    var actionValue = document.getElementById("action").value;
    var timeValue = document.getElementById("time").value;
    var telemetryId = document.getElementById("telemetry").value;
    var variableId = document.getElementById("variables").value;

    $.ajax({
        url: "/ActionConfig/Create",
        type: 'POST',
        data: {
            __RequestVerificationToken: token,
            name: nameValue,
            variableId: variableId,
            telemetryId: telemetryId,
            action: actionValue,
            time: timeValue
        },
        success: function (data) {
            window.location.href = data;
        }
    });

    return false;
}

function EditActionConfig() {

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    var actionId = document.getElementById("actionId").innerText;
    var nameValue = document.getElementById("name").value;
    var actionValue = document.getElementById("action").value;
    var timeValue = document.getElementById("time").value;
    var variableId = document.getElementById("variables").value;


    if (variableId != "") {
        $.ajax({
            url: "/ActionConfig/Edit",
            type: 'POST',
            data: {
                __RequestVerificationToken: token,
                actionId: actionId,
                name: nameValue,
                variableId: variableId,
                action: actionValue,
                time: timeValue
            },
            success: function (data) {
                window.location.href = data;
            }
        });
    }
    return false;
}

function DeleteActionConfig() {

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();
    var id = document.getElementById("actionId").innerText;

    $.ajax({
        url: "/ActionConfig/Delete",
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

function loadAction() {

    var idVariable = document.getElementById("variableId").innerText;
    var telemetry = document.getElementById("telemetry");
    var action = document.getElementById("action");

    $.ajax({
        type: "GET",
        url: "/ActionConfig/GetActionData",
        data: { idVariable: idVariable },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response.success) {
                telemetry.value = response.action.idRegisterTelemetry;
                action.value = document.getElementById("actionValue").innerText;
                GetModulesData(response.action.idModule, response.action.idVariable);

            } else {

                alert("FALHA AO CARREGAR ACAO");
                window.location.href = "/Login/Login";
            }
        },
        error: function (response) {
            alert("FALHA AO CARREGAR ACAO!");
            window.location.href = "/Login/Login";
        }
    });
}

function refreshVariables() {

    var variable = document.getElementById("variables");
    var option;
    var typeOfVariable;

    for (var counter = 0, len = variable.options.length; counter < len; counter++) {
        option = variable.options[counter];

        idVariable = option.value;
        typeOfVariable = option.id;

        if (!typeOfVariable == "") {
            if (!typeOfVariable.includes('DO')) {
                variable.remove(counter);
                counter--;
            }
        }
    }
}

function checkActionOption(value) {

    var timePeriod = document.getElementById("time");
    var timeLabel = document.getElementById("timeLabel");

    if (value == "Abrir-Fechar" || value == "Fechar-Abrir") {
        timePeriod.style.display = "block";
        timeLabel.style.display = "block";
    }
    else {
        timeLabel.style.display = "none";
        timePeriod.style.display = "none";
    }
}

function CheckActionAvaiableVariable(alarmId, selectedAlarm) {
    var actionTable = document.getElementById("actionValue");
    var actionTableAvaible = document.getElementById("actionsOptionsAvaible");
    var actionProhibit;
    var boolResult = true;

    while (actionTable.firstChild) {
        actionTable.removeChild(actionTable.firstChild);
    }
    var option1 = document.createElement("option");
    option1.value = "0";
    option1.innerHTML = "Nenhuma Ação";
    actionTable.appendChild(option1);

    $.ajax({
        type: "GET",
        url: "/ActionConfig/CheckActionAvaiableVariable",
        data: { alarmId: alarmId },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            actionProhibit = response;

            for (var counter = 0; counter < actionTableAvaible.children.length; counter++) {
                boolResult = true;

                for (var counter2 = 0; counter2 < actionProhibit.length; counter2++) {
                    if (actionProhibit[counter2] == actionTableAvaible[counter].value) {
                        boolResult = false;
                    }
                }
                if (boolResult) {
                    var optionNew = document.createElement("option");
                    optionNew.value = actionTableAvaible.children[counter].value;
                    optionNew.innerHTML = actionTableAvaible.children[counter].innerHTML;
                    actionTable.appendChild(optionNew);


                    if (selectedAlarm == actionTableAvaible.children[counter].value) {
                        optionNew.selected = true;
                    }

                }
            }
        },
        error: function (response) {
        }
    });
}

function GetVariablesAction(idAction) {
    var module = document.getElementById("modules");
    var id = module.options[module.selectedIndex].value;
    var boolResult;


    id = parseInt(id);

    $.ajax({
        type: "GET",
        url: "/Dashboard/GetVariables",
        data: { id: id },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            CheckActionAvaible(msg.responseJSON, idAction);
        }
    });
}

function CheckActionAvaible(listVariables, idAction) {
    var ids = "";
    var variable;
    var counter = 0;
    var boolResult = true;

    var variablesComboBox = document.getElementById("variables");
    variablesComboBox.options.length = 0;

    for (counter = 0; counter < listVariables.length; counter++) {
        variable = listVariables[counter];

        if (variable.name.includes('DO')) {
            ids = ids + variable.id + ","
        }
    }

    if (ids.endsWith(",")) {
        ids = ids.substring(0, ids.length - 1);
    }
    $.ajax({
        type: "GET",
        url: "/ActionConfig/CheckActionAvaible",
        data: { ids: ids, idAction: idAction },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (result) {
            result = result.responseJSON;

            for (counter = 0; counter < listVariables.length; counter++) {
                variable = listVariables[counter];

                for (var counter2 = 0; counter2 < result.length; counter2++) {
                    if (variable.id == result[counter2]) {
                        boolResult = false;
                    }
                }
                if (boolResult) {
                    var element = document.createElement("option");
                    element.value = variable.id;
                    element.text = variable.aliasVariable;
                    element.id = variable.name;
                    variablesComboBox.add(element);
                }
            }
        }
    });

}
