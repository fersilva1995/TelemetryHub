function AddText(nameValue, variableValue, positionValue, multiplicatorValue, constantValue, unitValue, color1, timeDuration) {
    //var adjustPosition = position - 1;
    //var finalPosition = CheckNumberCell(adjustPosition);
    var finalPosition = positionValue;

    var cell = table.getElementsByTagName('td')[finalPosition];

    if (cell.children.length == 0) {
        if (IDChecker(variableValue)) {
            TransferText(cell, nameValue, unitValue, variableValue, multiplicatorValue, constantValue, color1, "", "", color1, color1, "", "", "", "", timeDuration);
            return "true";
        }
        else {
            return "false";
        }
    }
    else {
        CheckNumberCell(positionValue);
        if (IDChecker(variableValue)) {
            TransferText(cell, nameValue, unitValue, variableValue, multiplicatorValue, constantValue, color1, "", "", color1, color1, "", "", "", "", timeDuration);
            return "true";
        }
        else {
            return "false";
        }
    }
}

function TransferText(cell, nameValue, unitValue, variableValue, multiplicatorValue, constantValue, color1,
    maximum, minimum, mediumColor, highColor, edge1, edge2, offLabel, onLabel, text3, timeDuration)
{
    cell.style.backgroundColor = "#303030";

    //cell.onmouseover = function () { componentCellMouseOver(variableValue) };
    //cell.onmouseout = function () { componentCellMouseOut(variableValue) };

    var divHeader = document.createElement("div");
    divHeader.classList.add("textComponentHeader");
    cell.appendChild(divHeader);

    var title = document.createElement("h5");
    title.innerHTML = nameValue;
    title.id = "name_" + variableValue;
    title.classList.add("textTitle");
    divHeader.appendChild(title);

    var divChanger = document.createElement("div");
    divChanger.classList.add("textComponentChanger");
    divHeader.appendChild(divChanger);

    //select Changer
    var selectchanger = document.createElement("select");
    selectchanger.classList.add("componentSelector");
    selectchanger.title = "Mudança Temporária de Componente";
    selectchanger.onchange = function () { changeComponent(variableValue, "TEXT") };
    selectchanger.id = "changeSelector" + variableValue;
    divChanger.appendChild(selectchanger);
        
    inputOptionsType(selectchanger, "TEXT");
    addTimeDuration(cell, variableValue, timeDuration);

    var div1 = document.createElement("div");
    div1.classList.add("textIcons");
    cell.appendChild(div1);

    //icons
    var span5 = document.createElement("div");
    span5.id = "id" + variableValue;
    span5.classList.add("textIcons");
    cell.appendChild(span5);

    var icon1 = document.createElement("i");
    icon1.id = variableValue + "iconAlarm";
    icon1.classList.add("fas");
    icon1.classList.add("fa-bell");
    icon1.classList.add("alarmText");
    div1.appendChild(icon1);

    var icon2 = document.createElement("i");
    icon2.id = variableValue + "iconHistoric";
    icon2.classList.add("fas");
    icon2.classList.add("fa-history");
    icon2.classList.add("historyText");
    icon2.onclick = function () {
        showHistoricValuesDashboard(variableValue, cell, timeDuration, constantValue, multiplicatorValue, nameValue);
    };
    icon2.style.cursor = "pointer";
    div1.appendChild(icon2);

    var icon3 = document.createElement("i");
    icon3.id = variableValue + "iconAction";
    icon3.classList.add("fas");
    icon3.classList.add("fa-bolt");
    icon3.classList.add("actionText");
    div1.appendChild(icon3);

    var icon4 = document.createElement("i");
    icon4.id = variableValue + "iconActionReceiver";
    icon4.classList.add("fas");
    icon4.classList.add("fa-sign-in-alt");
    icon4.classList.add("actionReceiverText");
    div1.appendChild(icon4);
    //end Icons

    var span1 = document.createElement("span");
    span1.innerHTML = "0";
    span1.classList.add("text-value");
    span1.id = "valueC_" + variableValue;    
    cell.appendChild(span1);

    inputCellOff(cell, variableValue);    

    var span2 = document.createElement("span");
    span2.innerHTML = unitValue;
    span2.id = "unit_" + variableValue;
    span2.classList.add("text-value-subtitle");
    cell.appendChild(span2);

    var div2 = document.createElement("div");
    div1.id = "id" + variableValue;//ID
    div2.classList.add("hidden_value");
    cell.appendChild(div2);

    var p2 = document.createElement("label");
    p2.classList.add("hidden_value");
    p2.id = variableValue + "unit_" + unitValue;//unit+ id
    p2.innerHTML = unitValue;
    div2.appendChild(p2);

    var p3 = document.createElement("label");
    p3.classList.add("hidden_value");
    p3.id = "multiplicator_" + variableValue;//multi+ id
    p3.innerHTML = multiplicatorValue;
    div2.appendChild(p3);

    var p4= document.createElement("label");
    p4.classList.add("hidden_value");
    p4.id = "constant_" + variableValue; //multi+ id
    p4.innerHTML = constantValue;
    div2.appendChild(p4);

    var p5 = document.createElement("label");
    p5.classList.add("hidden_value");
    p5.id = "color_" + variableValue; //multi+ id
    p5.innerHTML = color1;
    div2.appendChild(p5);

    var label4 = document.createElement("p");
    label4.id = variableValue + "_text3";
    label4.style.display = "none";
    label4.innerHTML = text3;
    div2.appendChild(label4);

    var label5 = document.createElement("p");
    label5.id = variableValue + "_type";
    label5.style.display = "none";
    label5.innerHTML = "TEXT";
    div2.appendChild(label5);

    var label6 = document.createElement("p");
    label6.id = variableValue + "_max";
    label6.style.display = "none";
    label6.innerHTML = maximum;
    div2.appendChild(label6);

    var label7 = document.createElement("p");
    label7.id = variableValue + "_min";
    label7.style.display = "none";
    label7.innerHTML = minimum;
    div2.appendChild(label7);

    var label8 = document.createElement("p");
    label8.id = variableValue + "_color2";
    label8.style.display = "none";
    label8.innerHTML = mediumColor;
    div2.appendChild(label8);

    var label9 = document.createElement("p");
    label9.id = variableValue + "_color3";
    label9.style.display = "none";
    label9.innerHTML = highColor;
    div2.appendChild(label9);

    var label10 = document.createElement("p");
    label10.id = variableValue + "_edge1";
    label10.style.display = "none";
    label10.innerHTML = edge1;
    div2.appendChild(label10);

    var label11 = document.createElement("p");
    label11.id = variableValue + "_edge2";
    label11.style.display = "none";
    label11.innerHTML = edge2;
    div2.appendChild(label11);

    var label12 = document.createElement("p");
    label12.id = variableValue + "_offLabel";
    label12.style.display = "none";
    label12.innerHTML = offLabel;
    div2.appendChild(label12);

    var label13 = document.createElement("p");
    label13.id = variableValue + "_onLabel";
    label13.style.display = "none";
    label13.innerHTML = onLabel;
    div2.appendChild(label13);

    var sound = document.createElement("audio");
    sound.src = '/Sounds/Red Alert.mp3';
    sound.preload = "auto";
    sound.id = "sound";
    sound.classList.add("hidden_value");    
    div2.appendChild(sound);

    var textColor = ReturnColor(color1);
    span1.style.color = textColor[0];    
}


function insertValueToText(value, variable) {    
    variableName = "id" + variable;    

    var multi = document.getElementById("multiplicator_" + variable).innerHTML;
    var constValue = document.getElementById("constant_" + variable).innerHTML;    

    value = parseFloat(value);
    multi = parseFloat(multi);
    constValue = parseFloat(constValue);

    var finalvalue = (value * multi) + constValue;       
    var valueC = document.getElementById("valueC_" + variable);

    valueC.innerHTML = Math.round(finalvalue * 100) / 100;
    /*element.parentNode.childNodes[2].innerHTML = finalvalue.toFixed(3);    */
}

function RemoveTextBox(element) {
    var td = element.parentNode;
    while (td.firstChild) {
        td.removeChild(td.firstChild);
    }
    td.style.backgroundColor = "#222123";
    td.style.opacity = 1;

    inputLabelDivTable(td);
 }