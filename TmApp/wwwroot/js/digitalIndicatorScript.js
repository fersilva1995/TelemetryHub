function AddDigitalIndicator(positionValue, variableValue, nameValue, offLabel, onLabel, digitalType, color1, color2, timeDuration) {
    var state = false;

    $.ajax({
        type: "GET",
        url: "/Dashboard/GetVariablesType",
        data: { variableValue: variableValue },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false, // HERE
        complete: function (msg) {
            type = msg.responseJSON[0];
            type = type.substring(0, 2);

            if (type == "DO" || type == "DI") {
                positionValue = parseInt(positionValue);
                //var adjustPosition = position - 1;
                //var finalPosition = CheckNumberCell(adjustPosition);
                var finalPosition = positionValue;

                var cell = table.getElementsByTagName('td')[finalPosition];

                if (cell.children.length == 0) {
                    if (IDChecker(variableValue)) {
                        TransferDigitalIndicator(cell, variableValue, nameValue, offLabel, onLabel, type, color1, color2,
                            "", "", "", "", "", color2, "", "", "", timeDuration);
                        state = "true";
                    }
                    else {
                        return "false";
                    }
                }
                else {
                    CheckNumberCell(positionValue);
                    if (IDChecker(variableValue)) {
                        TransferDigitalIndicator(cell, variableValue, nameValue, offLabel, onLabel, type, color1, color2,
                            "", "", "", "", "", color2, "", "", "", timeDuration);
                        state = "true";
                    }
                    else {
                        return "false";
                    }
                }
            }
            else {
                alert("Escolha um componente DO ou DI");
                return false;
            }
        }
    });

    return state;
    //var type = digitalType.substring(0, 2);
}

function TransferDigitalIndicator(cell, variableValue, nameValue, offLabel, onLabel, type, color1, color2,
    maximum, minimum, multiplicator, unit, constant, color3, edge1, edge2, text3, timeDuration) {

    cell.style.backgroundColor = "#303030";

    var divHeader = document.createElement("div");
    divHeader.classList.add("digiComponentHeader");
    cell.appendChild(divHeader);

    var title = document.createElement("h5");
    title.innerHTML = nameValue;
    title.id = "name_" + variableValue;
    title.classList.add("digIndicatorTitle");
    divHeader.appendChild(title);

    var divChanger = document.createElement("div");
    divChanger.classList.add("digiComponentChanger");
    divHeader.appendChild(divChanger);
    
    addTimeDuration(cell, variableValue, timeDuration);

    var span3 = document.createElement("div");
    span3.id = "id" + variableValue;
    span3.classList.add("digIndicatorIcons");
    cell.appendChild(span3);

    //Put Icon Labels in time
    var icon1 = document.createElement("i");
    icon1.id = variableValue + "iconAlarm";
    icon1.classList.add("fas");
    icon1.classList.add("fa-bell");
    icon1.classList.add("alarmDigIndicator");
    span3.appendChild(icon1);

    var icon2 = document.createElement("i");
    icon2.id = variableValue + "iconHistoric";
    icon2.classList.add("fas");
    icon2.classList.add("fa-history");
    icon2.classList.add("historyDigIndicator");
    icon2.onclick = function () {        
        showHistoricValuesDashboard(variableValue, cell, timeDuration, constant, multiplicator, nameValue);
    };
    icon2.style.cursor = "pointer";
    span3.appendChild(icon2);

    var icon3 = document.createElement("i");
    icon3.id = variableValue + "iconAction";
    icon3.classList.add("fas");
    icon3.classList.add("fa-bolt");
    icon3.classList.add("actionDigIndicator");
    span3.appendChild(icon3);

    var icon4 = document.createElement("i");
    icon4.id = variableValue + "iconActionReceiver";
    icon4.classList.add("fas");
    icon4.classList.add("fa-sign-in-alt");
    icon4.classList.add("actionReceiverDigIndicator");
    span3.appendChild(icon4);
    //endIcons

    inputCellOff(cell, variableValue);

    //Digital Indicator
    var div1 = document.createElement("div");
    div1.classList.add("digIndicatorShow");
    cell.appendChild(div1);

    //NEW ONE 
    if (type == "DO") {
        var inputNew = document.createElement("input");
        inputNew.setAttribute("data-on-text", onLabel);
        inputNew.setAttribute("data-off-text", offLabel);
        inputNew.setAttribute("data-label-width", "1");
        inputNew.name = "name_" + variableValue;
        inputNew.type = "checkbox";
        inputNew.checked = "checked";
        inputNew.className = "switchComponent";
        inputNew.id = "idSwitch" + variableValue;

        var inputNotDo = document.createElement("button");
        inputNotDo.innerHTML = "0";
        inputNotDo.style.display = "none";
        inputNotDo.id = "digitalLabel" + variableValue;

        div1.appendChild(inputNew);
        div1.appendChild(inputNotDo);
    }
    else {
        var labelDivDI = document.createElement("button");
        labelDivDI.readOnly = true;
        labelDivDI.id = "labelDivDI_" + variableValue;
        labelDivDI.classList.add("digitalLabelDi");
        labelDivDI.style.cursor = "default";
        labelDivDI.innerHTML = "0";

        div1.appendChild(labelDivDI);
    }

    //Leds display
    var div2 = document.createElement("div");
    div2.id = variableValue + "labels";
    div1.appendChild(div2);

    var label1 = document.createElement("p");
    label1.id = variableValue + "_labelOFF";
    label1.classList.add("digitallabels");
    label1.style.display = "none";
    label1.innerHTML = offLabel;
    div2.appendChild(label1);

    var label2 = document.createElement("p");
    label2.id = variableValue + "_labelON";
    label2.classList.add("digitallabels");
    label2.style.display = "none";
    label2.innerHTML = onLabel;
    div2.appendChild(label2);

    var label3 = document.createElement("p");
    label3.id = variableValue + "_lowColor";
    label3.classList.add("digitallabels");
    label3.style.display = "none";
    label3.innerHTML = color1;
    div2.appendChild(label3);

    var label4 = document.createElement("p");
    label4.id = variableValue + "_mediumColor";
    label4.classList.add("digitallabels");
    label4.style.display = "none";
    label4.innerHTML = color2;
    div2.appendChild(label4);
       

    var label6 = document.createElement("p");
    label6.id = variableValue + "_max";
    label6.classList.add("digitallabels");
    label6.style.display = "none";
    label6.innerHTML = maximum;
    div2.appendChild(label6);

    var label7 = document.createElement("p");
    label7.id = variableValue + "_min";
    label7.classList.add("digitallabels");
    label7.style.display = "none";
    label7.innerHTML = minimum;
    div2.appendChild(label7);

    var label8 = document.createElement("p");
    label8.id = variableValue + "_multi";
    label8.classList.add("digitallabels");
    label8.style.display = "none";
    label8.innerHTML = multiplicator;
    div2.appendChild(label8);

    var label10 = document.createElement("p");
    label10.id = variableValue + "_unit";
    label10.classList.add("digitallabels");
    label10.style.display = "none";
    label10.innerHTML = unit;
    div2.appendChild(label10);

    var label11 = document.createElement("p");
    label11.id = variableValue + "_constant";
    label11.classList.add("digitallabels");
    label11.style.display = "none";
    label11.innerHTML = constant;
    div2.appendChild(label11);

    var label12 = document.createElement("p");
    label12.id = variableValue + "_color3";
    label12.classList.add("digitallabels");
    label12.style.display = "none";
    label12.innerHTML = color3;
    div2.appendChild(label12);

    var label13 = document.createElement("p");
    label13.id = variableValue + "_edge1";
    label13.classList.add("digitallabels");
    label13.style.display = "none";
    label13.innerHTML = edge1;
    div2.appendChild(label13);

    var label14 = document.createElement("p");
    label14.id = variableValue + "_edge2";
    label14.classList.add("digitallabels");
    label14.style.display = "none";
    label14.innerHTML = edge2;
    div2.appendChild(label14);

    var label15 = document.createElement("p");
    label15.id = variableValue + "_type";
    label15.style.display = "none";
    label15.innerHTML = "DIGITAL";
    div2.appendChild(label15);

    var label16 = document.createElement("p");
    label16.id = variableValue + "_text3";
    label16.style.display = "none";
    label16.innerHTML = text3;
    div2.appendChild(label16);

    var label17 = document.createElement("p");
    label17.id = variableValue + "DigitalType";
    label17.style.display = "none";
    label17.innerHTML = type;
    div2.appendChild(label17);

    // Sound on trigger
    var sound = document.createElement("audio");
    sound.src = '/Sounds/Red Alert.mp3';
    sound.preload = "auto";
    sound.id = "sound";
    sound.classList.add("hidden_value");
    sound.style.display = "none";
    div2.appendChild(sound);

    if (type == "DO") {
        $("input[name=name_" + variableValue + "]").on('switchChange.bootstrapSwitch', function (event, state) {
            ChangeSwitch(variableValue);
        });
        changeColorSwitchOff(variableValue, color1);
        changeColorSwitchOn(variableValue, color3);
    }
}

function RemoveDigitalBox(element) {
    var td = element.parentNode;

    if (td != undefined) {
        while (td.firstChild) {
            td.removeChild(td.firstChild);
        }
        td.style.backgroundColor = "#222123";
        td.style.position = "relative";
        td.style.opacity = 1;

        inputLabelDivTable(td);
    }
}

function insertValueToDigitalIndicator(value, id) {
    var color = '';

    var DigitalType = document.getElementById(id + "DigitalType").innerHTML;

    if (DigitalType == "DO") {
        if (value == 0) {
            $("input[name=name_" + id + "]").bootstrapSwitch('state', false, true);
            color = document.getElementById(id + "_lowColor").innerHTML;
            changeColorSwitchOff(id, color);
            //alterar display para OFF;
        }
        else if (value > 0) {
            $("input[name=name_" + id + "]").bootstrapSwitch('state', true, true);
            color = document.getElementById(id + "_color3").innerHTML;

            changeColorSwitchOn(id, color);
        }
    }
    else {
        insertLabelToDigital(value, id);
    }
}

function insertLabelToDigital(value, id) {

    var labelNotDo = document.getElementById("labelDivDI_" + id);
    labelNotDo.style.display = "block";
    var color = "";

    if (value == 0) {
        var label = document.getElementById(id + "_labelOFF").innerHTML;
        labelNotDo.innerHTML = label;
        color = document.getElementById(id + "_lowColor").innerHTML;

        changeLabelColor(color, labelNotDo);
    }
    else if (value >  0) {
        var label = document.getElementById(id + "_labelON").innerHTML;
        labelNotDo.innerHTML = label;
        color = document.getElementById(id + "_color3").innerHTML;

        changeLabelColor(color, labelNotDo);
    }
}

function changeLabelColor(color, element) {
    switch (color) {
        case "Vermelho":
            element.style.color = "#ffffff";
            element.style.background = "rgb(254, 32, 35)";
            break;
        case "Laranja":
            element.style.color = "#000";
            element.style.background = "rgb(250,130,76)";
            break;
        case "Amarelo":
            element.style.color = "#000";
            element.style.background = "rgb(255,224,133)";
            break;
        case "Verde":
            element.style.color = "#000";
            element.style.background = "rgb(208,227,179)";
            break;
        case "Violeta":
            element.style.color = "#ffffff";
            element.style.background = "rgb(174,111,216)";
            break;
        case "Azul":
            element.style.color = "#ffffff";
            element.style.background = "rgb(46,162,249)";
            break;
    }
}