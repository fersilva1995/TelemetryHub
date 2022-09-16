function AddSemaphore(positionValue, variableValue, nameValue, Multiplicador, constant, unit, offLabel, onLabel,
    text3, color1, color2, color3, edge1, edge2, timeDuration)
{
    var finalPosition = positionValue;
    var cell = table.getElementsByTagName('td')[finalPosition];
        
    if (cell.children.length == 0) {
        if (IDChecker(variableValue)) {
            TransferSemaphore(cell, variableValue, nameValue, Multiplicador, constant, unit, onLabel, offLabel,
                text3, color1, color2, color3, edge1, edge2, timeDuration);
            return "true";
        }
        else {
            return "false";
        }
    }
    else {
        CheckNumberCell(positionValue);
        if (IDChecker(variableValue)) {
            TransferSemaphore(cell, variableValue, nameValue, Multiplicador, constant, unit, onLabel, offLabel,
                text3, color1, color2, color3, edge1, edge2, " ", " ", timeDuration);
            return "true";
        }
        else {
            return "false";
        }
    }    
}

function TransferSemaphore(cell, variableValue, nameValue, multiplicator, constant, unit, offLabel, onLabel,
    text3, color1, color2, color3, edge1, edge2, max, min, timeDuration)
{
    cell.style.backgroundColor = "#303030";

    //cell.onmouseover = function () { componentCellMouseOver(variableValue) };
    //cell.onmouseout = function () { componentCellMouseOut(variableValue) };

    var divHeader = document.createElement("div");
    divHeader.classList.add("semaphoreComponentHeader");
    cell.appendChild(divHeader);

    var title = document.createElement("h5");
    title.innerHTML = nameValue;
    title.id = "name_" + variableValue;
    title.classList.add("semaphoreTitle");
    divHeader.appendChild(title);

    var divChanger = document.createElement("div");
    divChanger.classList.add("semaphoreComponentChanger");
    divHeader.appendChild(divChanger);

    //select changer
    var selectchanger = document.createElement("select");
    selectchanger.classList.add("componentSelector");
    selectchanger.title = "Mudança Temporária de Componente";
    selectchanger.onchange = function () { changeComponent(variableValue, "SEMAPHORE") };
    selectchanger.id = "changeSelector" + variableValue;
    divChanger.appendChild(selectchanger);
    
    inputOptionsType(selectchanger, "SEMAPHORE");
    addTimeDuration(cell, variableValue, timeDuration);
    //end select changer

    //Put Icon Labels in time
    var span6 = document.createElement("div");
    span6.id = "id" + variableValue;
    span6.classList.add("semaphoreIcons");
    cell.appendChild(span6);

    var icon1 = document.createElement("i");
    icon1.id = variableValue + "iconAlarm";
    icon1.classList.add("fas");
    icon1.classList.add("fa-bell");
    icon1.classList.add("alarmSemaphore");
    span6.appendChild(icon1);

    var icon2 = document.createElement("i");
    icon2.id = variableValue + "iconHistoric";
    icon2.classList.add("fas");
    icon2.classList.add("fa-history");
    icon2.classList.add("historySemaphore");
    icon2.onclick = function () {
        showHistoricValuesDashboard(variableValue, cell, timeDuration, constant, multiplicator, nameValue);

    };
    icon2.style.cursor = "pointer";
    span6.appendChild(icon2);

    var icon3 = document.createElement("i");
    icon3.id = variableValue + "iconAction";
    icon3.classList.add("fas");
    icon3.classList.add("fa-bolt");
    icon3.classList.add("actionSemaphore");
    span6.appendChild(icon3);

    var icon4 = document.createElement("i");
    icon4.id = variableValue + "iconActionReceiver";
    icon4.classList.add("fas");
    icon4.classList.add("fa-sign-in-alt");
    icon4.classList.add("actionReceiverSemaphore");
    span6.appendChild(icon4);
    //endIcons

    //DisplayValues
    var div1 = document.createElement("div");
    div1.classList.add("semaphoreShow");
    cell.appendChild(div1);

    var ledDiv = document.createElement("div");
    ledDiv.classList.add("led-box-table");
    div1.appendChild(ledDiv);

    var lightDiv = document.createElement("div");
    lightDiv.classList.add("led-table");
    lightDiv.classList.add("blink_me");
    lightDiv.id = variableValue + "LighterLamp";
    ledDiv.appendChild(lightDiv);

    inputCellOff(cell, variableValue);

    var div2 = document.createElement("div");
    div2.id = variableValue + "labels";
    cell.appendChild(div2);

    var mainLabel = document.createElement("p");
    mainLabel.id = variableValue + "mainLable";
    mainLabel.classList.add("varLabelSemaphore");
    div2.appendChild(mainLabel);

    var mainLabel = document.createElement("p");
    mainLabel.id = variableValue + "_lableValue";
    mainLabel.classList.add("valueLabelSemaphore");
    div2.appendChild(mainLabel);
   
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
    label3.id = variableValue + "_text3";
    label3.classList.add("digitallabels");
    label3.style.display = "none";
    label3.innerHTML = text3;
    div2.appendChild(label3);

    var label4 = document.createElement("p");
    label4.id = variableValue + "_lowColor";    
    label4.style.display = "none";
    label4.innerHTML = color1;
    div2.appendChild(label4);

    var label5 = document.createElement("p");
    label5.id = variableValue + "_mediumColor";    
    label5.style.display = "none";
    label5.innerHTML = color2;
    div2.appendChild(label5);

    var label6 = document.createElement("p");
    label6.id = variableValue + "_highColor";    
    label6.style.display = "none";
    label6.innerHTML = color3;
    div2.appendChild(label6);

    var label7 = document.createElement("p");
    label7.id = variableValue + "_max";    
    label7.style.display = "none";
    label7.innerHTML = max;
    div2.appendChild(label7);

    var label8 = document.createElement("p");
    label8.id = variableValue + "_multi";    
    label8.style.display = "none";
    label8.innerHTML = multiplicator;
    div2.appendChild(label8);

    var label9 = document.createElement("p");
    label9.id = variableValue + "_unit";    
    label9.style.display = "none";
    label9.innerHTML = unit;
    div2.appendChild(label9);

    var label11 = document.createElement("p");
    label11.id = variableValue + "_constant";    
    label11.style.display = "none";
    label11.innerHTML = constant;
    div2.appendChild(label11);

    var label12 = document.createElement("p");
    label12.id = variableValue + "_edge1";    
    label12.style.display = "none";
    label12.innerHTML = edge1;
    div2.appendChild(label12);

    var label13 = document.createElement("p");
    label13.id = variableValue + "_edge2";    
    label13.style.display = "none";
    label13.innerHTML = edge2;
    div2.appendChild(label13);

    var label14 = document.createElement("p");
    label14.id = variableValue + "_type";
    label14.style.display = "none";
    label14.innerHTML = "SEMAPHORE";
    div2.appendChild(label14);

    var label15 = document.createElement("p");
    label15.id = variableValue + "_text3";
    label15.classList.add("digitallabels");
    label15.style.display = "none";
    label15.innerHTML = text3;
    div2.appendChild(label15);

    var label16 = document.createElement("p");
    label16.id = variableValue + "_min";
    label16.style.display = "none";
    label16.innerHTML = min;
    div2.appendChild(label16);

    // Sound on trigger
    var sound = document.createElement("audio");
    sound.src = '/Sounds/Red Alert.mp3';
    sound.preload = "auto";
    sound.id = "sound";
    sound.classList.add("hidden_value");
    sound.style.display = "none";
    div2.appendChild(sound);    
}


function insertValueToSempaphoreIndicator(value,id) {
    //get limits -> colors and labels -> update value with the colors;
    var lamp = document.getElementById(id + "LighterLamp");
    var labelMain = document.getElementById(id + "mainLable");
    var valueMain = document.getElementById(id + "_lableValue");
    var color;

    var constant = document.getElementById(id + "_constant").innerHTML;
    var multiplicator = document.getElementById(id + "_multi").innerHTML;
    var unit = document.getElementById(id + "_unit").innerHTML;
    multiplicator = parseFloat(multiplicator);
    constant = parseFloat(constant);

    //update Value
    value = (value * multiplicator) + constant;
    value = Math.round(value * 100) / 100;

    //Get Color AND sideLabel
    var edge1 = document.getElementById(id + "_edge1").innerHTML;
    var edge2 = document.getElementById(id + "_edge2").innerHTML;
    if (value <= edge1) {
        color = ReturnColor(document.getElementById(id + "_lowColor").innerHTML);
        labelMain.innerHTML = document.getElementById(id + "_labelOFF").innerHTML;
    }
    else if (value <= edge2) {
        color = ReturnColor(document.getElementById(id + "_mediumColor").innerHTML);
        labelMain.innerHTML = document.getElementById(id + "_labelON").innerHTML;
    }
    else {
        color = ReturnColor(document.getElementById(id + "_highColor").innerHTML);
        labelMain.innerHTML = document.getElementById(id + "_text3").innerHTML;
    }
    //update color
    lamp.style.backgroundColor = color[0];
    lamp.style.boxShadow = "0px 0px 0px 2px " + color[1];

    //update Label
    value = value  + " " + unit;
    valueMain.innerHTML = value;
}