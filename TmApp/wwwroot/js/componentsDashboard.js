function EditComponentDashBoard(id, idPanel) {

    var type = document.getElementById("type_" + id).value;
    var name = document.getElementById("name_" + id).value;
    var position = document.getElementById("position_" + id).value;
    var minimun = document.getElementById("minimun_" + id).value;
    var maximun = document.getElementById("maximun_" + id).value;
    var multiplicator = document.getElementById("multiplicator_" + id).value;
    var constant = document.getElementById("constant_" + id).value;
    var unit = document.getElementById("unit_" + id).value;
    var subtitleOn = document.getElementById("subtitleOn_" + id).value;
    var subtitleOff = document.getElementById("subtitleOff_" + id).value;
    var text3 = document.getElementById("text3_" + id).value;
    var color1 = document.getElementById("color1_" + id).value;
    var color2 = document.getElementById("color2_" + id).value;
    var color3 = document.getElementById("color3_" + id).value;
    var edge1 = document.getElementById("edge1_" + id).value;
    var edge2 = document.getElementById("edge2_" + id).value;

    $.ajax({
        type: "GET",
        url: "/Dashboard/EditComponentFromCDash",
        data: {
            id: id,
            idPanel: idPanel,
            type: type,
            name: name,
            position: position,
            minimun: minimun,
            maximun: maximun,
            multiplicator: multiplicator,
            constant: constant,
            unit: unit,
            subtitleOn: subtitleOn,
            subtitleOff: subtitleOff,
            color1: color1,
            color2: color2,
            color3: color3,
            edge1: edge1,
            edge2: edge2,
            text3: text3
        },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (result) {
            var labelInfo = document.getElementById("infoLabel");
            labelInfo.innerHTML = "Componente Editado";

            var messageInfo = document.getElementById("infoDiv");
            messageInfo.style.display = "block";

            changeAlarmLabel("Componente Editado");
        },
    });


}

function ShowHideDetailDivDashboard(id, variableId) {

    var divDetail = document.getElementById("divDetail_" + id);


    if (divDetail.style.display == "none" || divDetail.style.display == "") {
        divDetail.style.display = "grid";
    }
    else {
        divDetail.style.display = "none";
        document.getElementById("variableDiv_" + variableId).style.display = "none";
        document.getElementById("alamarDiv_" + variableId).style.display = "none";
        document.getElementById("actionDiv_" + variableId).style.display = "none";
    }
}

function checkActionOptionDashboard(value, id) {

    var timePeriod = document.getElementById("time_" + id);
    var timeLabel = document.getElementById("timeLabel_" + id);

    if (value == "Abrir-Fechar" || value == "Fechar-Abrir") {
        timePeriod.style.display = "block";
        timeLabel.style.display = "block";
    }
    else {
        timeLabel.style.display = "none";
        timePeriod.style.display = "none";
    }
}

function ShowVariableLayer(id) {

    var divVariable = document.getElementById("variableDiv_" + id);
    if (divVariable.style.display == "none" || divVariable.style.display == "") {
        divVariable.style.display = "grid";

        GetvariableDataDashboard(id);
    }
    else {
        divVariable.style.display = "none";
    }
}

function GetvariableDataDashboard(id) {
    var nameVariable = document.getElementById("name_" + id);
    var typeVariable = document.getElementById("tipo_" + id);
    var variationVariable = document.getElementById("variation_" + id);
    var alarmVariable = document.getElementById("alarm_" + id);
    var historyVariable = document.getElementById("history_" + id);
    var alarmSelector = document.getElementById("alarmSelector_" + id);

    $.ajax({
        type: "GET",
        url: "/Maps/getVariableById",
        data: { id: id },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (result) {
            var variable = result.responseJSON.variable;
            nameVariable.value = variable.aliasVariable;
            typeVariable.value = variable.name;
            variationVariable.value = variable.percentage;
            historyVariable.checked = variable.recordData;

            if (variable.condition != ";") {
                if (variable.condition != "") {
                    insertAlarmsDashboard(variable.condition, alarmVariable);
                }
                else {
                    hideAlarmsShowMessageDashboard(id);
                }
            }
            else {
                hideAlarmsShowMessageDashboard(id);
            }
        },
        error: function (response) {

        },
    });
}

function insertAlarmsDashboard(ids, alarmSelector) {
    cleanAlarmSelectorDashboard(alarmSelector);

    $.ajax({
        type: "GET",
        url: "/AlarmConfiguration/getNeoAlarmList",
        data: { ids: ids },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (result) {
            var arrayList = result.responseJSON;
            for (var counter = 0; arrayList.length > counter; counter++) {

                var option = document.createElement("option");
                option.id = arrayList[counter].id;
                option.innerHTML = arrayList[counter].name;
                alarmSelector.appendChild(option);
            }
        },
        error: function (response) {
        },
    });
    //make option bu each ids detected;
}

function cleanAlarmSelectorDashboard(alarmSelector) {

    while (alarmSelector.childNodes.length > 1) {
        alarmSelector.childNodes[1].remove();
    }
}

function EditVariableDashboard(id) {

    var nameVariable = document.getElementById("name_" + id).value;
    var variationVariable = document.getElementById("variation_" + id).value;
    var historic = document.getElementById("history_" + id).checked;

    $.ajax({
        type: "GET",
        url: "/Home/EditVariableDashboard",
        data: {
            nameVariable: nameVariable, variationVariable: variationVariable,
            historic: historic, idVariable: id
        },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (result) {

            var labelInfo = document.getElementById("infoLabel");
            labelInfo.innerHTML = "Váriavel Editada";

            var messageInfo = document.getElementById("infoDiv");
            messageInfo.style.display = "block";


            changeAlarmLabel("Váriavel Editada");

        },
        error: function (response) {

        },
    });
}

function GetAlarmVariableDashboard(id, componentId) {
    var alamarDiv = document.getElementById("alamarDiv_" + id);
    if (alamarDiv.style.display == "none" || alamarDiv.style.display == "") {
        alamarDiv.style.display = "grid";

        var alarmSelector = document.getElementById("alarm_" + id).selectedIndex;
        var valueId = document.getElementById("alarm_" + id)[alarmSelector].id;
        GetAlarmDataDashboard(id, valueId, componentId);
    }
    else {
        alamarDiv.style.display = "none";
    }
    //colocar os dados em "algum
}

function GetAlarmDataDashboard(variableid, alarmId, componentId) {

    var multiplicator = document.getElementById("multiplicator_" + componentId).value;
    var type = document.getElementById("type_" + componentId).value;
    var iconMulti = document.getElementById("iconMulti_" + variableid);

    if (type === "GRAPHIC") {
        iconMulti.style.display = "block";
    }
    else {
        iconMulti.style.display = "none";
    }


    //pullOneAlarmDataFromMDB
    var name = document.getElementById("alarmName_" + variableid);
    var alamarCondition = document.getElementById("alarmCondition_" + variableid);
    var conditionValue = document.getElementById("conditionValue_" + variableid);
    var action = document.getElementById("action_" + variableid);
    var buttonAlarm = document.getElementById("alarmEditor_" + variableid);

    $.ajax({
        type: "GET",
        url: "/AlarmConfiguration/getNeoAlarmList",
        data: { ids: alarmId },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (result) {
            var arrayList = result.responseJSON;
            for (var counter = 0; arrayList.length > counter; counter++) {
                name.value = arrayList[counter].name;
                alamarCondition.value = arrayList[counter].condition;
                if (type === "GRAPHIC") {
                    conditionValue.value = (arrayList[counter].conditionValue * multiplicator);
                }
                else {
                    conditionValue.value = arrayList[counter].conditionValue;
                }
                buttonAlarm.onclick = function () { EditAlarmOnDashboard(alarmId, variableid) };

                if (arrayList[counter].action.id === 0) {
                    document.getElementById("actionLabel_" + variableid).style.display = "none";
                    action.style.display = "none";
                    hideActionShowMessageDashboard(variableid);
                }
                else {
                    inputNewActionOptionDashboard(arrayList[counter].action.id, action);
                    document.getElementById("actionLabel_" + variableid).style.display = "block";
                    document.getElementById("actionButton_" + variableid).style.display = "block";
                    action.style.display = "block";
                }
            }
        },
        error: function (response) {
        },
    });
}

function changeTimerValuesDashboard(value, id) {
    var timerMajorLabel = document.getElementById("endingValueLabel_" + id);
    var timerMajor = document.getElementById("endingValue_" + id);
    var timerMinorLabel = document.getElementById("begginingValueLabel_" + id);
    var timerMinor = document.getElementById("begginingValue_" + id);

    if (value) {
        timerMajor.style.display = "block";
        timerMinor.style.display = "block";
        timerMinorLabel.style.display = "block";
        timerMajorLabel.style.display = "block";
    }
    else {
        timerMajor.style.display = "none";
        timerMinor.style.display = "none";
        timerMinorLabel.style.display = "none";
        timerMajorLabel.style.display = "none";
    }
}

function inputNewActionOptionDashboard(id, parentElement) {
    //get IDAção

    cleanAlarmSelectorDashboard(parentElement);

    $.ajax({
        type: "GET",
        url: "/AlarmConfiguration/GetActionOfAlarm",
        data: { id: id },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (result) {
            var action = result.responseJSON;

            var option = document.createElement("option");
            option.id = action.id;
            option.innerHTML = action.name;
            parentElement.appendChild(option);
        },
        error: function (response) {
        },
    });

}

function ShowActionDashboardSelected(id) {
    var divAction = document.getElementById("actionDiv_" + id);

    if (divAction.style.display == "none" || divAction.style.display == "") {
        divAction.style.display = "grid";

        var actionSelector = document.getElementById("action_" + id).selectedIndex;
        actionSelector = document.getElementById("action_" + id)[actionSelector].id;
        GetActionDataDashboardComponents(id, actionSelector);
    }
    else {
        divAction.style.display = "none";
    }
}

function GetActionDataDashboardComponents(id, idAction) {

    var name = document.getElementById("actionName_" + id);
    var type = document.getElementById("typeAction_" + id);
    var time = document.getElementById("time_" + id);
    var variableAction = document.getElementById("variableAction_" + id);
    var buttonActionRef = document.getElementById("buttonActionRef_" + id);
    var actionButtonEdit = document.getElementById("ActinOfAlarm_" + id);


    $.ajax({
        type: "GET",
        url: "/AlarmConfiguration/GetActionOfAlarm",
        data: { id: idAction },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (result) {
            var actionValues = result.responseJSON;

            name.value = actionValues.name;
            type.value = actionValues.action;
            time.value = actionValues.time;
            if (actionValues.variable.aliasVariable != "") {
                variableAction.value = actionValues.variable.aliasVariable;
                variableAction.id = actionValues.variable.id;

            }
            else {
                variableAction.value = actionValues.variable.name;
                variableAction.id = actionValues.variable.id;
            }

            actionButtonEdit.onclick = function () { editActionDashboard(id, idAction) };
            buttonActionRef.href = "/ActionConfig/Edit/" + idAction;
            GetActionDataDashboardTelemetry(id, actionValues.variable.id);
        },
        error: function (response) {

        },
    });
}

function GetActionDataDashboardTelemetry(id, idVariable) {
    var telemetry = document.getElementById("telemetryAction_" + id);

    $.ajax({
        type: "GET",
        url: "/ActionConfig/GetActionData",
        data: { idVariable: idVariable },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response.success) {
                telemetry.value = response.action.idRegisterTelemetry;
                GetModulesDataDashBoard(response.action.idModule, id);
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

function GetModulesDataDashBoard(idModule, id) {

    var module = document.getElementById("moduleAction_" + id)

    $.ajax({
        type: "GET",
        url: "/Dashboard/GetModulesById",
        data: { idModule: idModule },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            module.value = msg.responseJSON[0];
        }
    });
}

function hideAlarmsShowMessageDashboard(id) {

    var divLabel = document.getElementById("alarmLabel__" + id);
    var divButton = document.getElementById("alarm_" + id);
    var divalarms = document.getElementById("alarmSelector_" + id);

    divLabel.style.display = "none";
    divButton.style.display = "none";
    divalarms.style.display = "none";

    var labelInfo = document.getElementById("infoLabel");
    labelInfo.innerHTML = "Nenhum Alarme Configurado";

    var messageInfo = document.getElementById("infoDiv");
    messageInfo.style.display = "block";

    changeAlarmLabel("Nenhum Alarme Configurado");
}

function hideActionShowMessageDashboard(id) {

    var divLabel = document.getElementById("actionLabel_" + id);
    var divButton = document.getElementById("actionButton_" + id);
    var divaction = document.getElementById("action_" + id);

    divLabel.style.display = "none";
    divButton.style.display = "none";
    divaction.style.display = "none";

    var labelInfo = document.getElementById("infoLabel");
    labelInfo.innerHTML = "Nenhuma Ação Configurada";

    var messageInfo = document.getElementById("infoDiv");
    messageInfo.style.display = "block";

    changeAlarmLabel("Nenhuma Ação Configurada");
}

function divDetailCollapse(id) {
    var div = document.getElementById("divDetail_" + id);
    div.style.display = "none";
}

function variableDivCollapse(id) {
    var div = document.getElementById("variableDiv_" + id);
    div.style.display = "none";
}

function alamarDivCollapse(id) {
    var div = document.getElementById("alamarDiv_" + id);
    div.style.display = "none";
}

function actionDivCollapse(id) {
    var div = document.getElementById("actionDiv_" + id);
    div.style.display = "none";
}

function EditAlarmOnDashboard(id, variableId) {

    var bool = true;
    var name = document.getElementById("alarmName_" + variableId).value;
    var condition = document.getElementById("alarmCondition_" + variableId).value;
    var conditionValue = document.getElementById("conditionValue_" + variableId).value;
    /*var action = ???*/
    conditionValue = parseFloat(conditionValue);
    var formerAlarm = document.getElementById("alarm_" + variableId);

    if (name === "") {
        bool = false;
        alert("preencha Alarmes");
    }
    else if (condition === "") {
        bool = false;
        alert("preencha as Condições");
    }
    else if (conditionValue === "") {
        bool = false;
        alert("preencha o Valor de Condição");
    }

    if (bool) {

        $.ajax({
            type: "GET",
            url: "/AlarmConfiguration/EditNeoAlarmByComponent",
            data: {
                name: name, condition: condition, conditionValue: conditionValue, id: id
            },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            complete: function (data) {
                var labelInfo = document.getElementById("infoLabel");
                labelInfo.innerHTML = "Alarme Editado";

                var messageInfo = document.getElementById("infoDiv");
                messageInfo.style.display = "block";
                formerAlarm[formerAlarm.selectedIndex].innerHTML = name;

                changeAlarmLabel("Alarme Editado");
            },
            error: function (response) {
            },
        });
    }
}

function editActionDashboard(idVariable, idAction) {

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    var name = document.getElementById("actionName_" + idVariable).value;
    var typeAction = document.getElementById("typeAction_" + idVariable).value;
    var time = document.getElementById("time_" + idVariable).value;
    var formerName = document.getElementById("action_" + idVariable)


    $.ajax({
        url: "/ActionConfig/Edit",
        type: 'POST',
        data: {
            __RequestVerificationToken: token,
            actionId: idAction,
            name: name,
            variableId: idVariable,
            action: typeAction,
            time: time
        },
        success: function (data) {
            formerName[formerName.selectedIndex].innerHTML = name;


            var labelInfo = document.getElementById("infoLabel");
            labelInfo.innerHTML = "Ação Editada";

            var messageInfo = document.getElementById("infoDiv");
            messageInfo.style.display = "block";

            changeAlarmLabel("Ação Editada");
        }
    });
}