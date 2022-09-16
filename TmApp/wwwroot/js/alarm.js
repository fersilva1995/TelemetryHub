function SaveAlarm() {

    var component = document.getElementById("component");
    var id = component.options[component.selectedIndex].value;
    var condition = document.getElementById("condition");
    var conditionValue = condition.options[condition.selectedIndex].value;
    var value = document.getElementById("value").value;
    var actionValue = document.getElementById("action").value;
    var aliasVariable = document.getElementById("aliasVariable").value;

    if (AlarmValidator(component, condition)) {

        $.ajax({
            type: "GET",
            url: "/Dashboard/SaveAlarm",
            data: { id: id, condition: conditionValue, value: value, actionValue: actionValue, aliasVariable: aliasVariable },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            sucess: function (result) {
            },
            error: function (response) {
            },
        })
    }
    else {
        alert("Preencha os campos do Alarme");
    }

    var userId = document.getElementById("userId").innerHTML;
    var panelId = document.getElementById("panelId").innerHTML;

    IconChecker(userId, panelId);
}

function GetAlarm() {
    var condition = document.getElementById("condition");
    var value = document.getElementById("value");
    var component = document.getElementById("component");
    var action = document.getElementById("action");
    var id = component.options[component.selectedIndex].value;

    $.ajax({
        type: "GET",
        url: "/Dashboard/GetAlarm",
        data: { id: id },
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        sucess: function (result) {
            debugger;
            alert(result);
        },
        error: function (response) {
            debugger;
            alert('Error occured');
        },
        complete: function (msg) {

            value.value = msg.responseJSON.value;
            if (value.value === "") {
                value.value = "0"
            }
            condition.value = msg.responseJSON.condition;
            action.value = msg.responseJSON.action;
            aliasVariable.value = msg.responseJSON.aliasVariable;

        }
    });
}

function updateNeoAlarm(id) {
    var bool = true;

    var name = document.getElementById("alarmOptions").selectedIndex;
    name = document.getElementById("alarmOptions")[name].value;

    var condition = document.getElementById("conditionValue").value;
    var conditionValue = document.getElementById("conditionNumberValue").value;
    var action = document.getElementById("actionValue").selectedIndex;
    action = document.getElementById("actionValue")[action].value;
    var temp = document.getElementById("timerValue").checked;
    var email = document.getElementById("emailReceiver").value;
    var multiplicator = document.getElementById("alarmMultiplicator").value;
    var constant = document.getElementById("alarmConstant").value;
    var unit = document.getElementById("alarmUnit").value;
    var HysteresisCheck = document.getElementById("alarmHysteresisChecker").checked;
    var HysteresisValue = document.getElementById("alarmHysteresis").value;
    var sms = document.getElementById("smsReceiver").value;

    var beginMonday = document.getElementById("dateBegin1").value;
    var beginMondaymin = document.getElementById("dateBeginMin1").value;
    beginMonday = (parseInt(beginMonday) * 60) + parseInt(beginMondaymin);

    var endMonday = document.getElementById("dateEnd1").value;
    var endMondaymin = document.getElementById("dateEndMin1").value;
    endMonday = (parseInt(endMonday) * 60) + parseInt(endMondaymin);

    var beginTuesday = document.getElementById("dateBegin2").value;
    var beginTuesdaymin = document.getElementById("dateBeginMin2").value;
    beginTuesday = (parseInt(beginTuesday) * 60) + parseInt(beginTuesdaymin);

    var endTuesday = document.getElementById("dateEnd2").value;
    var endTuesdaymin = document.getElementById("dateEndMin2").value;
    endTuesday = (parseInt(endTuesday) * 60) + parseInt(endTuesdaymin);

    var beginWednesday = document.getElementById("dateBegin3").value;
    var beginWednesdaymin = document.getElementById("dateBeginMin3").value;
    beginWednesday = (parseInt(beginWednesday) * 60) + parseInt(beginWednesdaymin);

    var endWednesday = document.getElementById("dateEnd3").value;
    var endWednesdaymin = document.getElementById("dateEndMin3").value;
    endWednesday = (parseInt(endWednesday) * 60) + parseInt(endWednesdaymin);

    var beginThursday = document.getElementById("dateBegin4").value;
    var beginThursdaymin = document.getElementById("dateBeginMin4").value;
    beginThursday = (parseInt(beginThursday) * 60) + parseInt(beginThursdaymin);

    var endThursday = document.getElementById("dateEnd4").value;
    var endThursdaymin = document.getElementById("dateEndMin4").value;
    endThursday = (parseInt(endThursday) * 60) + parseInt(endThursdaymin);

    var beginFriday = document.getElementById("dateBegin5").value;
    var beginFridaymin = document.getElementById("dateBeginMin5").value;
    beginFriday = (parseInt(beginFriday) * 60) + parseInt(beginFridaymin);

    var endFriday = document.getElementById("dateEnd5").value;
    var endFridayMin = document.getElementById("dateBeginMin5").value;
    endFriday = (parseInt(endFriday) * 60) + parseInt(endFridayMin);

    var beginSaturday = document.getElementById("dateBegin6").value;
    var beginSaturdaymin = document.getElementById("dateBeginMin6").value;
    beginSaturday = (parseInt(beginSaturday) * 60) + parseInt(beginSaturdaymin);

    var endSaturday = document.getElementById("dateEnd6").value;
    var endSaturdaymin = document.getElementById("dateEndMin6").value;
    endSaturday = (parseInt(endSaturday) * 60) + parseInt(endSaturdaymin);

    var beginSunday = document.getElementById("dateBegin7").value;
    var beginSundaymin = document.getElementById("dateBeginMin7").value;
    beginSunday = (parseInt(beginSunday) * 60) + parseInt(beginSundaymin);

    var endSunday = document.getElementById("dateEnd7").value;
    var endSundaymin = document.getElementById("dateEndMin7").value;
    endSunday = (parseInt(endSunday) * 60) + parseInt(endSundaymin);

    HysteresisValue = parseInt(HysteresisValue);
    conditionValue = parseInt(conditionValue);

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
    if (action === undefined || action === "") {
        action = 0;
    }

    if (bool) {

        $.ajax({
            type: "GET",
            url: "/AlarmConfiguration/EditNeoAlarm",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: {
                name: name, condition: condition, conditionValue: conditionValue,
                actionIdNumber: action, id: id, temp: temp, email: email,
                multiplicator: multiplicator, constant: constant, unit: unit,
                HysteresisCheck: HysteresisCheck, HysteresisValue: HysteresisValue,
                beginMonday: beginMonday, endMonday: endMonday, beginTuesday: beginTuesday,
                endTuesday: endTuesday, beginWednesday: beginWednesday, endWednesday: endWednesday,
                beginThursday: beginThursday, endThursday: endThursday, beginFriday: beginFriday,
                endFriday: endFriday, beginSaturday: beginSaturday, endSaturday: endSaturday,
                beginSunday: beginSunday, endSunday: endSunday, sms: sms
            },
            complete: function (data) {
                CleanPageForAlarms();
                window.scrollTo(0, 0);
                changeAlarmLabel("Sucesso na Edição!");
            },
            sucess: function (data) {
                CleanPageForAlarms();
            },
            error: function (data) {
                CleanPageForAlarms();
                window.scrollTo(0, 0);
                changeAlarmLabel("Falha na Edição!");
            },
        });
    }
}

function AddNeoAlarm() {
    var bool = true;
    var name = document.getElementById("alarmName").value;
    var condition = document.getElementById("alarmCondition").value;
    var conditionValue = document.getElementById("alarmValueCondition").value;
    var actionId = document.getElementById("alarmAction").selectedIndex;
    actionId = document.getElementById("alarmAction")[actionId].value;

    var sound = document.getElementById("alarmSound").value;
    var periodChecker = document.getElementById("PeriodChecker").checked;

    var email = document.getElementById("emailReceiver").value;
    var multiplicator = document.getElementById("alarmMultiplicator").value;
    var constant = document.getElementById("alarmConstant").value;
    var unit = document.getElementById("alarmUnit").value;
    var sms = document.getElementById("alarmSms").value;
    var alarmHysteresisChecker = document.getElementById("alarmHysteresisChecker").checked;
    var alarmHysteresis = document.getElementById("alarmHysteresis").value;

    //Schedule
    var beginMonday = document.getElementById("dateBegin1").value;
    var beginMondaymin = document.getElementById("dateBeginMin1").value;
    beginMonday = (parseInt(beginMonday) * 60) + parseInt(beginMondaymin);

    var endMonday = document.getElementById("dateEnd1").value;
    var endMondaymin = document.getElementById("dateEndMin1").value;
    endMonday = (parseInt(endMonday) * 60) + parseInt(endMondaymin);

    var beginTuesday = document.getElementById("dateBegin2").value;
    var beginTuesdaymin = document.getElementById("dateBeginMin2").value;
    beginTuesday = (parseInt(beginTuesday) * 60) + parseInt(beginTuesdaymin);

    var endTuesday = document.getElementById("dateEnd2").value;
    var endTuesdaymin = document.getElementById("dateEndMin2").value;
    endTuesday = (parseInt(endTuesday) * 60) + parseInt(endTuesdaymin);

    var beginWednesday = document.getElementById("dateBegin3").value;
    var beginWednesdaymin = document.getElementById("dateBeginMin3").value;
    beginWednesday = (parseInt(beginWednesday) * 60) + parseInt(beginWednesdaymin);

    var endWednesday = document.getElementById("dateEnd3").value;
    var endWednesdaymin = document.getElementById("dateEndMin3").value;
    endWednesday = (parseInt(endWednesday) * 60) + parseInt(endWednesdaymin);

    var beginThursday = document.getElementById("dateBegin4").value;
    var beginThursdaymin = document.getElementById("dateBeginMin4").value;
    beginThursday = (parseInt(beginThursday) * 60) + parseInt(beginThursdaymin);

    var endThursday = document.getElementById("dateEnd4").value;
    var endThursdaymin = document.getElementById("dateEndMin4").value;
    endThursday = (parseInt(endThursday) * 60) + parseInt(endThursdaymin);

    var beginFriday = document.getElementById("dateBegin5").value;
    var beginFridaymin = document.getElementById("dateBeginMin5").value;
    beginFriday = (parseInt(beginFriday) * 60) + parseInt(beginFridaymin);

    var endFriday = document.getElementById("dateEnd5").value;
    var endFridayMin = document.getElementById("dateBeginMin5").value;
    endFriday = (parseInt(endFriday) * 60) + parseInt(endFridayMin);

    var beginSaturday = document.getElementById("dateBegin6").value;
    var beginSaturdaymin = document.getElementById("dateBeginMin6").value;
    beginSaturday = (parseInt(beginSaturday) * 60) + parseInt(beginSaturdaymin);

    var endSaturday = document.getElementById("dateEnd6").value;
    var endSaturdaymin = document.getElementById("dateEndMin6").value;
    endSaturday = (parseInt(endSaturday) * 60) + parseInt(endSaturdaymin);

    var beginSunday = document.getElementById("dateBegin7").value;
    var beginSundaymin = document.getElementById("dateBeginMin7").value;
    beginSunday = (parseInt(beginSunday) * 60) + parseInt(beginSundaymin);

    var endSunday = document.getElementById("dateEnd7").value;
    var endSundaymin = document.getElementById("dateEnd7").value;
    endSunday = (parseInt(endSunday) * 60) + parseInt(endSundaymin);

    alarmHysteresis = parseInt(alarmHysteresis);
    conditionValue = parseInt(conditionValue);
    //send Alarm to be added, NeoAlarm

    if (name === "") {
        bool = false;
        alert("preencha o nome");
    }
    else if (condition === "") {
        bool = false;
        alert("preencha a Condição");
    }
    else if (conditionValue === "") {
        bool = false;
        alert("preencha o Valor da Condição");
    }
    if (actionId == "" || actionId == "null") {
        actionId = 0;
    }

    if (bool) {
        $.ajax({
            type: "GET",
            url: "/AlarmConfiguration/SaveNeoAlarm",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: {
                name: name, condition: condition, conditionValue: conditionValue, actionId: actionId, sound: sound,
                periodChecker: periodChecker, email: email, multiplicator: multiplicator, constant: constant, unit: unit,
                sms: sms, alarmHysteresisChecker: alarmHysteresisChecker, alarmHysteresis: alarmHysteresis,
                beginMonday: beginMonday, endMonday: endMonday, beginTuesday: beginTuesday, endTuesday: endTuesday,
                beginWednesday: beginWednesday, endWednesday: endWednesday, beginThursday: beginThursday, endThursday: endThursday,
                beginFriday: beginFriday, endFriday: endFriday, beginSaturday: beginSaturday, endSaturday: endSaturday,
                beginSunday: beginSunday, endSunday: endSunday
            },
            sucess: function (data) {
                location.href = "/AlarmConfiguration/AlarmDashboard";
            },
            error: function (data) {
                location.href = "/AlarmConfiguration/AlarmDashboard";
            },
        });
    }
}

function DeleteNeoAlarm(id) {
    $.ajax({
        type: "GET",
        url: "/AlarmConfiguration/DeleteNeoAlarm",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: {
            id: id
        },
        complete: function (data) {
            hideDeleteAlarmWindown();
            $("#alarmOptions option:selected").remove();
            CleanPageForAlarms();
            changeAlarmLabel("Alarme Deletado");
            deleteAlarmFromList(id);
        },
        sucess: function (data) {
            hideDeleteAlarmWindown();
            location.href = "/Home/Index";

        },
        error: function (data) {
            hideDeleteAlarmWindown();
            location.href = "/Home/Index";
        },
    });
    /*call JSON funciont and delete all alarms where they are seted;*/
}


function UpdateDeleteButtonNeoAlarm(id) {

    var windown = document.getElementById("deleteWindown");
    windown.style.display = "block";
}

function showDeleteAlarmWindown() {
    var windown = document.getElementById("deleteWindown");
    windown.style.display = "block";
}

function hideDeleteAlarmWindown() {

    var windown = document.getElementById("deleteWindown");
    if (!!windown) {
        windown.style.display = "none";
    }
}

function OpenVariableAlarmScreen(id) {
    location.href = "/Home/EditAlarm";
}

function ChangeAlarmOfVariable(idVariable) {

    var tableSelecteds = document.getElementById("AlarmsOn");
    var idsSelect = "";
    var id;

    var elements = tableSelecteds.getElementsByTagName("label");

    for (var counter = 0; counter < elements.length; counter++) {

        id = elements[counter].id;
        id = id.split("_")[1];

        idsSelect = idsSelect + id + ";";
    }
    idsSelect = idsSelect.substring(0, idsSelect.length - 1);



    ShowLoading();
    $.ajax({
        type: "GET",
        url: "/AlarmConfiguration/EditNeoAlarmFromVariable",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: {
            idVariable: idVariable, idAlarm: idsSelect
        },
        complete: function (data) {
            changeAlarmLabel("Alarmes Editados");
        },
        sucess: function (data) {
        },
        error: function (data) {
            changeAlarmLabel("Falha ao Editar Alarmes");
        },
    });
}

function ChangeAlarm() {
    var select = document.getElementById("alarmOptions");
    var id = parseInt(document.getElementById("alarmOptions")[select.selectedIndex].id);

    var alarmOptions = document.getElementById("alarmOptions");
    alarmOptions = document.getElementById("alarmOptions")[alarmOptions.selectedIndex].value;

    $.ajax({
        type: "GET",
        url: "/AlarmConfiguration/ReturnJsonNeoAlarm",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: {
            id: id
        },
        complete: function (data) {
            var alarmModel = data.responseJSON.neoAlarmModel;
            document.getElementById("conditionValue").value = alarmModel.condition;
            document.getElementById("conditionNumberValue").value = alarmModel.conditionValue;
            document.getElementById("emailReceiver").value = alarmModel.email;

            document.getElementById("alarmUnit").value = alarmModel.unit;
            document.getElementById("alarmConstant").value = alarmModel.constant;
            document.getElementById("alarmMultiplicator").value = alarmModel.multiplicator;

            document.getElementById("alarmHysteresisChecker").checked = alarmModel.hysteresis;
            changeHysterisValue(alarmModel.hysteresis);
            document.getElementById("alarmHysteresis").value = alarmModel.hysteresisValue;
            document.getElementById("smsReceiver").value = alarmModel.sms;
            //date
            clearSlidersAlarm();
            inputAlarmClockValues(alarmModel);
            document.getElementById("timerValue").checked = alarmModel.timer;
            changeTimerValues(alarmModel.timer);

            /*document.getElementById("actionValue").value = alarmModel.action.id;*/
            CheckActionAvaiableVariable(id, alarmModel.action.id);
            document.getElementById("buttonEdit").onclick = function () { updateNeoAlarm(alarmModel.id) };
            document.getElementById("buttonDelete").onclick = function () { DeleteNeoAlarm(alarmModel.id) };

        },
    });
}

function CleanPageForAlarms() {
    var select = document.getElementById("alarmOptions");
    select.selectedIndex = 0;

    var alarmOptions = document.getElementById("alarmOptions");
    alarmOptions.selectedIndex = 0;

    document.getElementById("conditionValue").value = "";
    document.getElementById("conditionNumberValue").value = "";
    document.getElementById("actionValue").value = "";

    document.getElementById("timerValue").checked = false;
    changeTimerValues(false);

    document.getElementById("emailReceiver").value = "";
    document.getElementById("alarmMultiplicator").value = "";
    document.getElementById("alarmConstant").value = "";
    document.getElementById("alarmUnit").value = "";
    document.getElementById("alarmHysteresisChecker").checked = false;
    document.getElementById("alarmHysteresis").value = "";
    document.getElementById("smsReceiver").value = "";

    document.getElementById("buttonEdit").onclick = "";
    document.getElementById("buttonDelete").onclick = "";
}

function changeAlarmLabel(message) {

    var div = document.getElementById("infoDiv");
    var label = document.getElementById("infoLabel");
    label.innerHTML = message;
    label.style.display = "block";

    div.classList.add("infoDiv");
    setTimeout(function () {
        div.style.opacity = 0;
        div.classList.remove("infoDiv");
    }, 6000);
}

function ShowLimitsForAlarm(id, idVariavel) {
    //get Variable Type value
    var typeVariable = document.getElementById("variableMaximun_" + id);
    var conditionValueLabel = document.getElementById("conditionValue_" + id);
    var alarmValueLabel = document.getElementById("alarmValue_" + id);
    var statusAlarm = document.getElementById("statusAlarm_" + id);
    var MaximumValueVariable = 0;

    $.ajax({
        type: "GET",
        url: "/Dashboard/GetVariableFromDatabase",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: {
            id: idVariavel
        },
        complete: function (response) {
            //create div for variables;
            var type = response.responseJSON[0].name;

            if (type.includes("HU")) {
                typeVariable.innerHTML = "Máximo que esta Variável pode atingir: 80";
                MaximumValueVariable = 80;
            }
            else if (type.includes("DO")) {
                typeVariable.innerHTML = "Máximo que esta Variável pode atingir: 1";
                MaximumValueVariable = 1;
            }
            else if (type.includes("DI")) {
                typeVariable.innerHTML = "Máximo que esta Variável pode atingir: 1";
                MaximumValueVariable = 1;
            }
            else if (type.includes("TE")) {
                typeVariable.innerHTML = "Máximo que esta Variável pode atingir: 85";
                MaximumValueVariable = 85;
            }
            else if (type.includes("DC")) {
                typeVariable.innerHTML = "Máximo que esta Variável pode atingir: 100";
                MaximumValueVariable = 100;
            }
            else if (type.includes("AC")) {
                typeVariable.innerHTML = "Máximo que esta Variável pode atingir: 240";
                MaximumValueVariable = 240;
            }

            $.ajax({
                type: "GET",
                url: "/AlarmConfiguration/ReturnJsonNeoAlarm",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                data: {
                    id: id
                },
                complete: function (response) {
                    var alarmValue = response.responseJSON.neoAlarmModel.conditionValue;
                    var alarmCondition = response.responseJSON.neoAlarmModel.condition;

                    switch (alarmCondition) {
                        case "maiorque":
                            conditionValueLabel.innerHTML = "Condição do alarme é: Maior que";
                            break;
                        case "menorque":
                            conditionValueLabel.innerHTML = "Condição do alarme é: Menor que";
                            break;
                        case "iguala":
                            conditionValueLabel.innerHTML = "Condição do alarme é: Igual a";
                            break;
                        case "variancia5%":
                            conditionValueLabel.innerHTML = "Condição do alarme é: Tolerancia Máxima +-5%";
                            break;
                        case "variancia10%":
                            conditionValueLabel.innerHTML = "Condição do alarme é: Tolerancia Máxima +-10%";
                            break;
                        case "variancia20%":
                            conditionValueLabel.innerHTML = "Condição do alarme é: Tolerancia Máxima +-20%";
                            break;
                        default:
                            conditionValueLabel.innerHTML = "Alarme não possui condição";
                    }

                    alarmValueLabel.innerHTML = "Valor do Alarme é :" + alarmValue;

                    switch (alarmCondition) {
                        case "maiorque":
                            if (alarmValue > MaximumValueVariable) {
                                statusAlarm.innerHTML = "Alarme nunca irá tocar";
                                //alarme nunca tocando
                            }
                            break;
                        case "menorque":
                            if (alarmValue > MaximumValueVariable) {
                                statusAlarm.innerHTML = "Sempre irá tocar";
                                //alarme sempre tocando
                            }
                            else {
                                statusAlarm.innerHTML = "Alarme está funcional";
                            }
                            break;
                        case "variancia5%":
                            alarmValue = alarmValue - (alarmValue * 0.05);
                            if (alarmValue > MaximumValueVariable) {
                                statusAlarm.innerHTML = "Alarme nunca irá tocar";
                            }
                            else {
                                statusAlarm.innerHTML = "Alarme está funcional";
                            }
                            break;
                        case "variancia10%":
                            alarmValue = alarmValue - (alarmValue * 0.1);
                            if (alarmValue > MaximumValueVariable) {
                                statusAlarm.innerHTML = "Alarme nunca irá tocar";
                            }
                            else {
                                statusAlarm.innerHTML = "Alarme está funcional";
                            }
                            break;
                        case "variancia20%":
                            alarmValue = alarmValue - (alarmValue * 0.2);
                            if (alarmValue > MaximumValueVariable) {
                                statusAlarm.innerHTML = "Alarme nunca irá tocar";
                            }
                            else {
                                statusAlarm.innerHTML = "Alarme está funcional";
                            }
                        default:
                            if (alarmValue > MaximumValueVariable) {
                                statusAlarm.innerHTML = "Alarme nunca irá tocar";
                            }
                            else {
                                statusAlarm.innerHTML = "Alarme está funcional";
                            }
                    }
                }
            });
        }
    });
}

function TransferToSelectedAlarm(idAlarm, idVariable) {
    var mainDiv = document.getElementById("alarm_" + idAlarm);
    mainDiv.parentElement.parentElement.remove();

    var table = document.getElementById("AlarmsOn");
    var tr = document.createElement("tr");
    table.appendChild(tr);
    var td = document.createElement("td");
    tr.appendChild(td);

    var divAlarm = document.createElement("div");
    divAlarm.id = "alarm_" + idAlarm;
    td.appendChild(divAlarm);

    var i = document.createElement("i");
    i.className = "fas fa fa-arrow-alt-circle-right arrowHover arrowIcon";
    divAlarm.id = "alarm_" + idAlarm;
    i.onclick = function () { TransferToAvaible(idAlarm, idVariable) };
    divAlarm.appendChild(i);

    var label = document.createElement("label");
    label.id = "VariableSelected_" + idAlarm;
    label.style.fontWeight = 500;
    divAlarm.appendChild(label);


    $.ajax({
        type: "GET",
        url: "/AlarmConfiguration/getNeoAlarmList",
        data: { ids: idAlarm },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (result) {
            var arrayList = result.responseJSON;
            for (var counter = 0; arrayList.length > counter; counter++) {

                label.innerHTML = arrayList[counter].name;
            }
        },
        error: function (response) {
        },
    });
}

function TransferToAvaible(idAlarm, idVariable) {
    var mainDiv = document.getElementById("alarm_" + idAlarm);
    mainDiv.parentElement.parentElement.remove();

    var table = document.getElementById("AlarmsAvaibleTable");
    var tr = document.createElement("tr");
    table.appendChild(tr);
    var td = document.createElement("td");
    tr.appendChild(td);

    var divAlarm = document.createElement("div");
    divAlarm.id = "alarm_" + idAlarm;
    td.appendChild(divAlarm);

    var i = document.createElement("i");
    i.onmouseover = function () { ShowLimitsForAlarm(idAlarm, idVariable) };
    i.className = "fas fa fa-arrow-alt-circle-left arrowHover arrowIcon";
    i.onclick = function () { TransferToSelectedAlarm(idAlarm, idVariable) };
    divAlarm.appendChild(i);

    var label = document.createElement("label");
    label.id = idAlarm
    divAlarm.appendChild(label);

    var divInfo = document.createElement("div");
    divInfo.className = "fas fa-info-circle alarmIcon";
    divInfo.onmouseover = function () { ShowLimitsForAlarm(idAlarm, idVariable) };
    divAlarm.appendChild(divInfo);

    var divInfoSon = document.createElement("div");
    divInfoSon.className = "tooltipAlarm";
    divInfo.appendChild(divInfoSon);


    var labelMax = document.createElement("label");
    labelMax.id = "variableMaximun_" + idAlarm;
    divInfoSon.appendChild(labelMax);
    var breakMax = document.createElement("br");
    divInfoSon.appendChild(breakMax);

    var labelCondition = document.createElement("label");
    labelCondition.id = "conditionValue_" + idAlarm;
    divInfoSon.appendChild(labelCondition);
    var breakCondition = document.createElement("br");
    divInfoSon.appendChild(breakCondition);

    var labelAlarm = document.createElement("label");
    labelAlarm.id = "alarmValue_" + idAlarm;
    divInfoSon.appendChild(labelAlarm);
    var breakAlarm = document.createElement("br");
    divInfoSon.appendChild(breakAlarm);

    var labelStatus = document.createElement("label");
    labelStatus.id = "statusAlarm_" + idAlarm;
    divInfoSon.appendChild(labelStatus);
    var breakStatus = document.createElement("br");
    divInfoSon.appendChild(breakStatus);


    $.ajax({
        type: "GET",
        url: "/AlarmConfiguration/getNeoAlarmList",
        data: { ids: idAlarm },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (result) {
            var arrayList = result.responseJSON;
            for (var counter = 0; arrayList.length > counter; counter++) {

                label.innerHTML = arrayList[counter].name;
                label.style.fontWeight = 500;
            }
        },
        error: function (response) {
        },
    });
}

function CheckIfmodulesChanged() {
    var moduleSelector = document.getElementById("moduleOptions");
    selectVariableFromModule(moduleSelector);
}

function hello() {
    alert('Hello world! in func hello');
}

$(function () {
    $('div[onload]').trigger('onload');
});


function changeTimerValues(value) {
    var divLabelHistory = document.getElementById("divLabelHistory");

    if (value) {
        divLabelHistory.classList.add("scheduleSlider");
        divLabelHistory.style.display = "table";
    }
    else {
        divLabelHistory.style.display = "none";
    }
}

function changeHysterisValue(value) {
    var div = document.getElementById("alarmHysteresisDiv");

    if (value) {
        div.style.display = "block";
    }
    else {
        div.style.display = "none";
    }
}

function loadSliderAlarm() {
    d3.select('#slider1').call(d3.slider().axis(false).min(0).max(1439).step(1).value([0, 1439]).on("slide", function (evt, value) {
        alarmLabelsValueBegin(1, value[0]);
        alarmLabelsValueEnd(1, value[1]);
    }));

    d3.select('#slider2').call(d3.slider().axis(false).min(0).max(1439).step(1).value([0, 1439]).on("slide", function (evt, value) {
        alarmLabelsValueBegin(2, value[0]);
        alarmLabelsValueEnd(2, value[1]);
    }));

    d3.select('#slider3').call(d3.slider().axis(false).min(0).max(1439).step(1).value([0, 1439]).on("slide", function (evt, value) {
        alarmLabelsValueBegin(3, value[0]);
        alarmLabelsValueEnd(3, value[1]);
    }));

    d3.select('#slider4').call(d3.slider().axis(false).min(0).max(1439).step(1).value([0, 1439]).on("slide", function (evt, value) {
        alarmLabelsValueBegin(4, value[0]);
        alarmLabelsValueEnd(4, value[1]);

    }));

    d3.select('#slider5').call(d3.slider().axis(false).min(0).max(1439).step(1).value([0, 1439]).on("slide", function (evt, value) {
        alarmLabelsValueBegin(5, value[0]);
        alarmLabelsValueEnd(5, value[1]);
    }));

    d3.select('#slider6').call(d3.slider().axis(false).min(0).max(1439).step(1).value([0, 1439]).on("slide", function (evt, value) {
        alarmLabelsValueBegin(6, value[0]);
        alarmLabelsValueEnd(6, value[1]);
    }));

    d3.select('#slider7').call(d3.slider().axis(false).min(0).max(1439).step(1).value([0, 1439]).on("slide", function (evt, value) {
        alarmLabelsValueBegin(7, value[0]);
        alarmLabelsValueEnd(7, value[1]);
    }));
}


function clearSlidersAlarm() {
    var slider1 = document.getElementById("slider1");
    var slider2 = document.getElementById("slider2");
    var slider3 = document.getElementById("slider3");
    var slider4 = document.getElementById("slider4");
    var slider5 = document.getElementById("slider5");
    var slider6 = document.getElementById("slider6");
    var slider7 = document.getElementById("slider7");

    while (slider1.firstChild) {
        slider1.removeChild(slider1.firstChild);
    }
    while (slider2.firstChild) {
        slider2.removeChild(slider2.firstChild);
    }
    while (slider3.firstChild) {
        slider3.removeChild(slider3.firstChild);
    }
    while (slider4.firstChild) {
        slider4.removeChild(slider4.firstChild);
    }
    while (slider5.firstChild) {
        slider5.removeChild(slider5.firstChild);
    }
    while (slider6.firstChild) {
        slider6.removeChild(slider6.firstChild);
    }
    while (slider7.firstChild) {
        slider7.removeChild(slider7.firstChild);
    }
}


function inputAlarmClockValues(alarmModel) {
    //monday
    d3.select("#slider1").call(d3.slider().axis(false).min(0).max(1439).step(1).value([alarmModel.beginMonday, alarmModel.endMonday]).on("slide", function (evt, value) {
        alarmLabelsValueBegin(1, value[0]);
        alarmLabelsValueEnd(1, value[1]);
    }));
    alarmLabelsValueBegin(1, alarmModel.beginMonday)
    alarmLabelsValueEnd(1, alarmModel.endMonday);
    //Tuesday
    d3.select("#slider2").call(d3.slider().axis(false).min(0).max(1439).step(1).value([alarmModel.beginTuesday, alarmModel.endTuesday]).on("slide", function (evt, value) {
        alarmLabelsValueBegin(2, value[0]);
        alarmLabelsValueEnd(2, value[1]);
    }));
    alarmLabelsValueBegin(2, alarmModel.beginTuesday)
    alarmLabelsValueEnd(2, alarmModel.endTuesday);
    //Wednesday
    d3.select("#slider3").call(d3.slider().axis(false).min(0).max(1439).step(1).value([alarmModel.beginWednesday, alarmModel.endWednesday]).on("slide", function (evt, value) {
        alarmLabelsValueBegin(3, value[0]);
        alarmLabelsValueEnd(3, value[1]);
    }));
    alarmLabelsValueBegin(3, alarmModel.beginWednesday)
    alarmLabelsValueEnd(3, alarmModel.endWednesday);
    //Thursday
    d3.select("#slider4").call(d3.slider().axis(false).min(0).max(1439).step(1).value([alarmModel.beginThursday, alarmModel.endThursday]).on("slide", function (evt, value) {
        alarmLabelsValueBegin(4, value[0]);
        alarmLabelsValueEnd(4, value[1]);
    }));
    alarmLabelsValueBegin(4, alarmModel.beginThursday)
    alarmLabelsValueEnd(4, alarmModel.endThursday);
    //friday
    d3.select("#slider5").call(d3.slider().axis(false).min(0).max(1439).step(1).value([alarmModel.beginFriday, alarmModel.endFriday]).on("slide", function (evt, value) {
        alarmLabelsValueBegin(5, value[0]);
        alarmLabelsValueEnd(5, value[1]);
    }));
    alarmLabelsValueBegin(5, alarmModel.beginFriday)
    alarmLabelsValueEnd(5, alarmModel.endFriday);
    //Saturday
    d3.select("#slider6").call(d3.slider().axis(false).min(0).max(1439).step(1).value([alarmModel.beginSaturday, alarmModel.endSaturday]).on("slide", function (evt, value) {
        alarmLabelsValueBegin(6, value[0]);
        alarmLabelsValueEnd(6, value[1]);
    }));
    alarmLabelsValueBegin(6, alarmModel.beginSaturday)
    alarmLabelsValueEnd(6, alarmModel.endSaturday);
    //Sunday 
    d3.select("#slider7").call(d3.slider().axis(false).min(0).max(1439).step(1).value([alarmModel.beginSunday, alarmModel.endSunday]).on("slide", function (evt, value) {
        alarmLabelsValueBegin(7, value[0]);
        alarmLabelsValueEnd(7, value[1]);
    }));
    alarmLabelsValueBegin(7, alarmModel.beginSunday)
    alarmLabelsValueEnd(7, alarmModel.endSunday);
}

function alarmLabelsValueBegin(numberDiv, value) {
    var hour = value / 60;
    var min = value % 60;

    hour = parseInt(hour);
    min = parseInt(min);

    if (hour < 2) {
        document.getElementById("dateBeginLabel" + numberDiv).innerHTML = "Horas";
    }
    if (min < 2) {
        document.getElementById("dateBeginLabelMin" + numberDiv).innerHTML = "Minuto";
    }
    else {
        document.getElementById("dateBeginLabelMin" + numberDiv).innerHTML = "Minutos";
    }
    document.getElementById("dateBegin" + numberDiv).value = hour;
    document.getElementById("dateBeginMin" + numberDiv).value = min;
}

function alarmLabelsValueEnd(numberDiv, value) {
    var hour = value / 60;
    var min = value % 60;

    hour = parseInt(hour);
    min = parseInt(min);

    if (hour < 2) {
        document.getElementById("dateEndLabel" + numberDiv).innerHTML = "Horas";
    }
    //else {
    //    document.getElementById("dateEndLabel" + numberDiv).innerHTML = "Horas";
    //}
    if (min < 2) {
        document.getElementById("dateEndLabelMin" + numberDiv).innerHTML = "Minuto";
    }
    else {
        document.getElementById("dateEndLabelMin" + numberDiv).innerHTML = "Minutos";
    }
    document.getElementById("dateEnd" + numberDiv).value = hour;
    document.getElementById("dateEndMin" + numberDiv).value = min;
}

function updateSliderValue(idNumber) {
    idNumber = parseInt(idNumber);
    var slider = document.getElementById("slider" + idNumber);

    while (slider.firstChild) {
        slider.removeChild(slider.firstChild);
    }

    var end = document.getElementById("dateEnd" + idNumber).value;
    var endMin = document.getElementById("dateEndMin" + idNumber).value;
    end = parseInt(endMin) + (parseInt(end) * 60);
    var begin = document.getElementById("dateBegin" + idNumber).value;
    var beginMin = document.getElementById("dateBeginMin" + idNumber).value;

    begin = parseInt(beginMin) + (parseInt(begin) * 60);

    d3.select("#slider" + idNumber).call(d3.slider().axis(false).min(0).max(1439).step(1).value([begin, end]).on("slide", function (evt, value) {
        alarmLabelsValueBegin(idNumber, value[0]);
        alarmLabelsValueEnd(idNumber, value[1]);
    }));
}