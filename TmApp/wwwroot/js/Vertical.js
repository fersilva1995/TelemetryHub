function AddVertical(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue,
    constantValue, unitValue, color1, color2, color3, edge1, edge2, timeDuration) {

    var finalPosition = positionValue;
    var cell = table.getElementsByTagName('td')[finalPosition];

    if (cell.children.length == 0) {
        if (IDChecker(variableValue)) {
            TransferVertical(cell, nameValue, unitValue, variableValue, multiplicatorValue, maximumValue, minimumValue, constantValue, color1, color2, color3, edge1, edge2, "", "", "", timeDuration);
            return "true";
        }
        else {
            return "false";
        }
    }
    else {
        CheckNumberCell(positionValue);
        if (IDChecker(variableValue)) {
            TransferVertical(cell, nameValue, unitValue, variableValue, multiplicatorValue, maximumValue, minimumValue, constantValue, color1, color2, color3, edge1, edge2, "", "", "", timeDuration);
            return "true";
        }
        else {
            return "false";
        }
    }
}

function TransferVertical(cell, nameValue, unitValue, variableValue, multiplicatorValue, maximum, minimum,
    constantValue, color1, color2, color3, edge1, edge2, offLabel, onLabel, text3, timeDuration) {
    cell.style.backgroundColor = "#303030";

    //cell.onmouseover = function () { componentCellMouseOver(variable) };
    //cell.onmouseout = function () { componentCellMouseOut(variable) };

    var divHeader = document.createElement("div");
    divHeader.classList.add("vertBarHeader");
    cell.appendChild(divHeader);

    var title = document.createElement("h5");
    title.innerHTML = nameValue;
    title.id = "name_" + variableValue;
    title.classList.add("vertBarTitle");
    divHeader.appendChild(title);

    var divChanger = document.createElement("div");
    divChanger.classList.add("vertBarChanger");
    divHeader.appendChild(divChanger);

    //select Changer
    var selectchanger = document.createElement("select");
    selectchanger.classList.add("componentSelector");
    selectchanger.title = "Mudança Temporária de Componente";
    selectchanger.onchange = function () { changeComponent(variableValue, "VERTICAL") };
    selectchanger.id = "changeSelector" + variableValue;
    divChanger.appendChild(selectchanger);
    
    inputOptionsType(selectchanger, "VERTICAL");
    addTimeDuration(cell, variableValue, timeDuration);

    var div1 = document.createElement("div");
    div1.classList.add("vertBarIcons");
    cell.appendChild(div1);

    //icons
    //var span5 = document.createElement("div");
    //span5.id = "id" + variableValue;
    //span5.classList.add("textIcons");
    //cell.appendChild(span5);

    var icon1 = document.createElement("i");
    icon1.id = variableValue + "iconAlarm";
    icon1.classList.add("fas");
    icon1.classList.add("fa-bell");
    icon1.classList.add("vertBarAlarm");
    div1.appendChild(icon1);

    var icon2 = document.createElement("i");
    icon2.id = variableValue + "iconHistoric";
    icon2.classList.add("fas");
    icon2.classList.add("fa-history");
    icon2.classList.add("vertBarHistory");
    icon2.onclick = function () {
        showHistoricValuesDashboard(variableValue, cell, timeDuration, constantValue, multiplicatorValue, nameValue);
    };
    icon2.style.cursor = "pointer";
    div1.appendChild(icon2);

    var icon3 = document.createElement("i");
    icon3.id = variableValue + "iconAction";
    icon3.classList.add("fas");
    icon3.classList.add("fa-bolt");
    icon3.classList.add("vertBarAction");
    div1.appendChild(icon3);

    var icon4 = document.createElement("i");
    icon4.id = variableValue + "iconActionReceiver";
    icon4.classList.add("fas");
    icon4.classList.add("fa-sign-in-alt");
    icon4.classList.add("vertBarActionReceiver");
    div1.appendChild(icon4);
    //end Icons             

    inputCellOff(cell, variableValue);

    var span1 = document.createElement("span");
    span1.innerHTML = maximum;
    span1.id = "maximunLabel" + variableValue;
    span1.classList.add("vertBarMaximumValue");
    cell.appendChild(span1);

    var div1Column = document.createElement("div");
    div1Column.className = "column-wrapperVertical";
    cell.appendChild(div1Column);

    var div2Column = document.createElement("div");
    div2Column.className = "columnVertical";
    div2Column.id = "column_" + variableValue;
    div1Column.appendChild(div2Column);

    var span4 = document.createElement("div");
    span4.innerHTML = minimum;
    span4.id = "minimunLabel" + variableValue;
    span4.classList.add("vertBarMinimumValue");
    cell.appendChild(span4);

    var span2 = document.createElement("span");
    span2.innerHTML = unitValue;
    span2.id = "value_" + variableValue;
    span2.classList.add("vertBarValue");
    cell.appendChild(span2);

    var span5 = document.createElement("span");
    span5.innerHTML = unitValue;
    span5.id = variableValue;
    span5.classList.add("vertBarUnit");
    cell.appendChild(span5);

    var span3 = document.createElement("span");
    span3.innerHTML = unitValue;
    span3.id = "unit_" + variableValue;
    span3.hidden = true;
    span3.classList.add("vertBarValue");
    cell.appendChild(span3);

    var div2 = document.createElement("div");
    div2.id = "id" + variableValue;//ID
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

    var p4 = document.createElement("label");
    p4.classList.add("hidden_value");
    p4.id = "constant_" + variableValue; //multi+ id
    p4.innerHTML = constantValue;
    div2.appendChild(p4);

    var p5 = document.createElement("label");
    p5.classList.add("hidden_value");
    p5.id = variableValue + "_color1";
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
    label5.innerHTML = "VERTICAL";
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
    label8.innerHTML = color2;
    div2.appendChild(label8);

    var label9 = document.createElement("p");
    label9.id = variableValue + "_color3";
    label9.style.display = "none";
    label9.innerHTML = color3;
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

    var textColor = ReturnColor(color2);
}


function InsertValueToVertical(value, variable) {
    var min = parseFloat(document.getElementById(variable + "_min").innerHTML)
    var max = parseFloat(document.getElementById(variable + "_max").innerHTML);

    var edge1 = parseFloat(document.getElementById(variable + "_edge1").innerHTML);
    var edge2 = parseFloat(document.getElementById(variable + "_edge2").innerHTML);

    value = parseFloat(value);
    var multi = parseFloat(document.getElementById("multiplicator_" + variable).innerHTML)
    var constant = parseFloat(document.getElementById("constant_" + variable).innerHTML);
    value = (value * multi) + constant;
    value = Math.round(value * 100) / 100;


    var unit = document.getElementById("unit_" + variable).innerHTML;
    document.getElementById("value_" + variable).innerHTML = value;

    var color = getColorVertical(variable, edge1, edge2, value);
    $('#column_' + variable).css({ background: color[0] });
    UpdateColorVertical(color[0], variable);

    document.getElementById("value_" + variable).style.color = color[0];
    addValueToVerticalBar(value, variable, min, max);
}

function addValueToVerticalBar(value, variable, min, max) {
    var range = max - min;
    value = value - min;

    if (value < 0) {
        value = 0;
    }
    if (value >= max) {
        value = range;
    }

    value = (value * 100) / range;

    $('#column_' + variable).animate({
        height: value + '%',
    });
}

function getColorVertical(id, edge1, edge2, value) {
    if (value <= edge1) {
        return color = ReturnColor(document.getElementById(id + "_color1").innerHTML);
    }
    else if (value <= edge2) {
        return color = ReturnColor(document.getElementById(id + "_color2").innerHTML);
    }
    else {
        return color = ReturnColor(document.getElementById(id + "_color3").innerHTML);
    }
}

function inputOptionsType(selectchanger, type) {
    var option0 = document.createElement("option");
    option0.innerHTML = "&#128065;";
    option0.style.display = "none";
    option0.selected = true;
    selectchanger.appendChild(option0);


    var option1 = document.createElement("option");
    option1.value = "GAUGE";
    option1.innerHTML = "Galvanômetro";    
    selectchanger.appendChild(option1);

    var option2 = document.createElement("option");
    option2.value = "TEXT";
    option2.innerHTML = "Texto";    
    selectchanger.appendChild(option2);

    var option4 = document.createElement("option");
    option4.value = "GRAPHIC";
    option4.innerHTML = "Gráfico";    
    selectchanger.appendChild(option4);

    var option5 = document.createElement("option");
    option5.value = "SEMAPHORE";
    option5.innerHTML = "Semáforo";    
    selectchanger.appendChild(option5);

    var option6 = document.createElement("option");
    option6.value = "VERTICAL";
    option6.innerHTML = "Vertical";    
    selectchanger.appendChild(option6);
}

function UpdateColorVertical(color, variable) {
    var max = document.getElementById("maximunLabel" + variable);
    var min = document.getElementById("minimunLabel" + variable);

    max.style.color = color;
    min.style.color = color;
}


function RemoveVerticalBox(element) {
    var td = element.parentNode;
    while (td.firstChild) {
        td.removeChild(td.firstChild);
    }
    td.style.backgroundColor = "#222123";
    td.style.opacity = 1;

    inputLabelDivTable(td);
}