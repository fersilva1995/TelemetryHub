function myRotation() {
    document.getElementById("gauge").style.transform = "rotate(120deg)";
}

function FirstPosition() {
    document.getElementById("gauge").style.transform = "rotate(0deg)";
}

function Rotator() {
    var x = document.getElementById("inputValue").value;
    if (x > 180) {
        x = 180;
    }
    else if (x < 0) {
        x = 0;
    }
    document.getElementById("gauge").style.transform = "rotate(" + x + "deg)";
    document.getElementById("GaugeValue").innerHTML = x;
    color(x);
    x = 0;
}

//changeTheTopHeight
function GaugeOnChange() {

    var elementScGaugeWidth = document.getElementsByClassName("sc-background")[0];
    var widthScGauge = elementScGaugeWidth.offsetWidth;
    var currentTop = widthScGauge / 1.845818181818182;

    var angle = getRotation();
    var elementScGauge = document.getElementsByClassName("sc-percentage")[0];
    var heightScGauge = elementScGauge.offsetHeight;
    var pixelToModify = heightScGauge * 0.021;

    //obter o top atual para depois modificá-lo depende do grau de variação entre +5 e 10 e -5 e -10;
    var pixelChanging = 0;

    color(angle);

    if (angle >= 5 && angle < 10) {
        pixelChanging = currentTop - pixelToModify;
        document.getElementsByClassName("sc-percentage")[0].style.top = pixelChanging.toString() + "px";
    }
    else if (angle >= 10 && angle < 170) {
        pixelChanging = currentTop - (pixelToModify * 2);
        document.getElementsByClassName("sc-percentage")[0].style.top = pixelChanging.toString() + "px";

    }
    else if (angle >= 170 && angle < 175) {
        pixelChanging = currentTop - pixelToModify;
        document.getElementsByClassName("sc-percentage")[0].style.top = pixelChanging.toString() + "px";
    }

    else {
        pixelChanging = currentTop;
        document.getElementsByClassName("sc-percentage")[0].style.top = pixelChanging.toString() + "px";

    }
    //realizar um ajuste da propria Gauge;

}

//getAngle
function getRotation() {
    var st = document.getElementsByClassName("sc-percentage")[0];

    var element = window.getComputedStyle(st, null)

    var rotationValue = element.getPropertyValue("-webkit-transform") ||
        element.getPropertyValue("-moz-transform") ||
        element.getPropertyValue("-ms-transform") ||
        element.getPropertyValue("-o-transform") ||
        element.getPropertyValue("transform")
    "FAIL";

    console.log('Matrix: ' + rotationValue);

    var values = rotationValue.split('(')[1].split(')')[0].split(',');
    var a = values[0];
    var b = values[1];
    var c = values[2];
    var d = values[3];

    var scale = Math.sqrt(a * a + b * b);
    console.log('Scale: ' + scale);
    var sin = b / scale;

    var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    return angle;
}

//changeTheColor
function color(x) {
    alert(x);
    var v = parseInt(x);
    if (v <= 60) {
        document.getElementById("gauge").style.backgroundColor = "#00ef41";
    }
    else if (v <= 120) {
        document.getElementById("gauge").style.backgroundColor = "#efb900";
    }
    else {
        document.getElementById("gauge").style.backgroundColor = "rgb(174, 11, 0)";
    }
}

function removeGaugeBox(element) {

    var td = element.parentElement.parentElement;
    while (td.firstChild) {
        td.removeChild(td.firstChild);
    }

    td.style.backgroundColor = "#222123";
    td.style.position = "relative";
    td.style.opacity = 1;

    inputLabelDivTable(td);
}

//add Gauge
function AddGauge(name, variable, position, minimum, maximum, multiplicator, constant, unit, c1, c2, c3, edge1, edge2, timeDuration) {

    //var adjustPosition = position - 1;
    //var finalPosition = CheckNumberCell(adjustPosition);
    var finalPosition = position;

    var table = document.getElementById('table');
    var cell = table.getElementsByTagName('td')[finalPosition];

    if (cell.children.length == 0) {
        if (IDChecker(variable)) {
            transferGauge(cell, variable, maximum, minimum, multiplicator, unit, name, constant, c1, c2, c3, edge1, edge2, "", "", "", timeDuration);
            adjustCalculator();
            return "true";
        }
        else {
            return "false";
        }
    }
    else {
        CheckNumberCell(position);
        if (IDChecker(variable)) {            
            transferGauge(cell, variable, maximum, minimum, multiplicator, unit, name, constant, c1, c2, c3, edge1, edge2, "", "", "", timeDuration);
            adjustCalculator();
            return "true";
        }
        else {
            return "false";
        }
    }
}

function transferGauge(cell, variable, maximum, minimum, multiplicator, unit, name, constant, lowColor, mediumColor, highColor,
    edge1, edge2, offLabel, onLabel, text3, timeDuration) {

    cell.style.backgroundColor = "#303030"; //caixa da variavel

    //cell.onmouseover = function () { componentCellMouseOver(variable) };
    //cell.onmouseout  = function () { componentCellMouseOut(variable) };

    var divHeader = document.createElement("div");
    divHeader.classList.add("gaugeComponentHeader");
    cell.appendChild(divHeader);

    var title = document.createElement("h5");
    //title.id = variable + "_name";
    title.id = "name_" + variable;
    title.innerHTML = name.toString();
    title.classList.add("gaugeTitleStyle");
    title.setAttribute("ondblclick", variable);
    divHeader.appendChild(title);

    inputCellOff(cell, variable);

    var divChanger = document.createElement("div");
    divChanger.classList.add("gaugeComponentChanger");
    divHeader.appendChild(divChanger);

    var selectchanger = document.createElement("select");
    selectchanger.classList.add("componentSelector");
    selectchanger.title = "Mudança Temporária de Componente";
    selectchanger.onchange = function () { changeComponent(variable, "GAUGE") };
    selectchanger.id = "changeSelector" + variable;
    divChanger.appendChild(selectchanger);
       
    inputOptionsType(selectchanger,"GAUGE");
    addTimeDuration(cell, variable,timeDuration);

    var span4 = document.createElement("div");
    span4.classList.add("sc-info");
    cell.appendChild(span4);

    ////Put Icon Labels in time
    var icon1 = document.createElement("i");
    icon1.id = variable + "iconAlarm";
    icon1.classList.add("fas");
    icon1.classList.add("fa-bell");
    icon1.classList.add("alarmGauge");
    span4.appendChild(icon1);

    var icon2 = document.createElement("i");
    icon2.id = variable + "iconHistoric";
    icon2.classList.add("fas");
    icon2.classList.add("fa-history");
    icon2.classList.add("historyGauge");
    icon2.onclick = function () {
        showHistoricValuesDashboard(variable, cell, timeDuration, constant, multiplicator, name);
    };
    icon2.style.cursor = "pointer";
    span4.appendChild(icon2);

    var icon3 = document.createElement("i");
    icon3.id = variable + "iconAction";
    icon3.classList.add("fas");
    icon3.classList.add("fa-bolt");
    icon3.classList.add("actionGauge");
    span4.appendChild(icon3);

    var icon4 = document.createElement("i");
    icon4.id = variable + "iconActionReceiver";
    icon4.classList.add("fas");
    icon4.classList.add("fa-sign-in-alt");
    icon4.classList.add("actionReceiverGauge");
    span4.appendChild(icon4);
    //end Icons

    var div1 = document.createElement("div");
    div1.id = "gaugeIndicator" + variable;
    div1.classList.add("gaugePosition");
    cell.appendChild(div1);

    var div2 = document.createElement("input");
    div2.id = "DivGauge" + variable;
    div2.classList.add("testGauge");
    div2.type = "text";
    div2.step = 0.1;
    div2.value = 80;
    div1.append(div2);
    cell.appendChild(div1);

    var div5 = document.createElement("div");
    div5.classList.add("gaugeInformation");
    cell.appendChild(div5);

    var span1 = document.createElement("span");
    span1.classList.add("sc-min");
    span1.id = "sc-min" + variable;
    div5.appendChild(span1);
    span1.innerText = minimum.toString();

    var span5 = document.createElement("span");
    span5.classList.add("sc-middle");
    span5.id = "unit_" + variable;
    span5.innerHTML = unit.toString();
    div5.appendChild(span5);

    var span2 = document.createElement("span");
    span2.classList.add("sc-max");
    span2.id = "sc-max" + variable;
    div5.appendChild(span2);
    span2.innerHTML = maximum.toString();

    //checkerOfConst, check after Implement.
    if (constant == undefined) {
        constant = "hz";
    };

    //end check
    var span3 = document.createElement("span");
    span3.classList.add("hiddenSpan");
    span3.id = "costant" + variable;
    span3.innerHTML = constant;
    div5.appendChild(span3);

    //Colors
    var c1 = document.createElement("span");
    c1.id = variable + "_lowColor";
    c1.classList.add("hiddenSpan");
    c1.innerHTML = lowColor;
    div5.appendChild(c1);

    var c2 = document.createElement("span");
    c2.id = variable + "_mediumColor";
    c2.classList.add("hiddenSpan");
    c2.innerHTML = mediumColor;
    div5.appendChild(c2);

    var c3 = document.createElement("span");
    c3.id = variable + "_highColor";
    c3.classList.add("hiddenSpan");
    c3.innerHTML = highColor;
    div5.appendChild(c3);
    //endColors

    var c4 = document.createElement("span");
    c4.id = "id" + variable;
    c4.classList.add("hiddenSpan");
    div5.appendChild(c4);

    var c5 = document.createElement("span");
    c5.id = "limit1_" + variable;
    c5.innerHTML = edge1;
    c5.classList.add("hiddenSpan");
    div5.appendChild(c5);

    var c6 = document.createElement("span");
    c6.id = "limit2_" + variable;
    c6.innerHTML = edge2;
    c6.classList.add("hiddenSpan");
    div5.appendChild(c6);


    var label4 = document.createElement("p");
    label4.id = variable + "_text3";
    label4.style.display = "none";
    label4.innerHTML = text3;
    div5.appendChild(label4);

    var label5 = document.createElement("p");
    label5.id = variable + "_type";
    label5.style.display = "none";
    label5.innerHTML = "GAUGE";
    div5.appendChild(label5);

    var label6 = document.createElement("p");
    label6.id = variable + "_offLabel";
    label6.style.display = "none";
    label6.innerHTML = offLabel;
    div5.appendChild(label6);

    var label7 = document.createElement("p");
    label7.id = variable + "_onLabel";
    label7.style.display = "none";
    label7.innerHTML = onLabel;
    div5.appendChild(label7);

    var sound = document.createElement("audio");
    sound.src = '/Sounds/Red Alert.mp3';
    sound.preload = "auto";
    sound.id = "sound";
    sound.classList.add("hidden_value");
    div5.appendChild(sound);

    var p1 = document.createElement("p");
    p1.classList.add("sc_Multiplicator_Value");
    p1.id = "multi" + variable;
    p1.innerHTML = multiplicator.toString();
    cell.appendChild(p1);

    var colorArray = ["rgb(240,255,255)", "rgb(240,255,255)"];   

    insertGaugeElemet(div2.id, maximum, minimum, colorArray);    
}

function insertGaugeElemet(idDiv, max, min, color) {

    $("#" + idDiv).knob({
        'min': min,
        'max': max,
        "fgColor": color[0],
        "step": 0.01,
        "skin": "tron",
        "cursor": false,
        "angleArc": "250",
        "readOnly": true,
        "angleOffset": "235",
        "bgColor": color[1],
        "thickness": 0.152,
        'width': '55%',
        'draw': function () {
            $(this.i).css('font-size', '34px');
        }
        //'height': '100%'
    });
}

function insertValueToGauge(value, id) {
    //define Value

    var constant = parseFloat(document.getElementById("costant" + id).innerHTML);
    var multi = parseFloat(document.getElementById("multi" + id).innerHTML);
    if (constant == undefined) {
        constant = 0;
    }
    value = parseFloat(value);
    value = (value * multi) + constant;
    value = Math.round(value * 100) / 100;

    //define Color
    var max = parseFloat(document.getElementById("sc-max" + id).innerHTML);
    var min = parseFloat(document.getElementById("sc-min" + id).innerHTML);
    if (value > max) {
        value = max;
    }
    else if (value < min) {
        value = min;
    }
    color = adjustColorRange(min, max, id, value);

    $("#DivGauge" + id)
        .val(value)
        .trigger('change');

    $("#DivGauge" + id).trigger(
        'configure',
        {
            "inputColor": color[0],
            "bgColor": "rgb(142 139 139)",
            "fgColor": color[0]
        }
    );
}

function adjustColorRange(min, max, id, value) {
    var range = max - min;

    /*if (id == 38) {*/
    var edge1 = parseFloat(document.getElementById("limit1_" + id).innerHTML);
    var edge2 = parseFloat(document.getElementById("limit2_" + id).innerHTML);

    if (value <= edge1) {
        return color = ReturnColor(document.getElementById(id + "_lowColor").innerHTML);
    }
    else if (value <= edge2) {
        return color = ReturnColor(document.getElementById(id + "_mediumColor").innerHTML);
    }
    else {
        return color = ReturnColor(document.getElementById(id + "_highColor").innerHTML);
    }
}


function InsertNewGauge(max, min, id, color) {
    $("#" + id).knob({
        'min': min,
        'max': max,
        "fgColor": color[0],
        "skin": "tron",
        "cursor": false,
        "angleArc": "250",
        "readOnly": true,
        "angleOffset": "235",
        "bgColor": "rgb(142 139 139)",
        'width': '100%',
        'height': '100%'
    });
}

function adjustGauge(element, angle) {

    var height = element.parentNode.childNodes[0].offsetHeight;

    var widthScGauge = element.offsetWidth;
    var currentTop = height + 1;

    var elementScGauge = document.getElementsByClassName("sc-percentage")[0];
    var heightScGauge = elementScGauge.offsetHeight;

    var pixelToModify = heightScGauge * 0.0225;

    //obter o top atual para depois modificalo depende do grau de variação entre +5 e 10 e -5 e -10;
    var pixelChanging = 0;
    var scGaugePercentage = element.childNodes[0];

    if (angle >= 5 && angle < 10) {
        pixelChanging = currentTop - pixelToModify;
        scGaugePercentage.style.top = pixelChanging.toString() + "px";
    }
    else if (angle >= 10 && angle < 170) {
        pixelChanging = currentTop - (pixelToModify * 2);
        scGaugePercentage.style.top = pixelChanging.toString() + "px";
    }
    else if (angle >= 170 && angle < 175) {
        pixelChanging = currentTop - pixelToModify;
        scGaugePercentage.style.top = pixelChanging.toString() + "px";
    }
    else {
        pixelChanging = currentTop;
        scGaugePercentage.style.top = pixelChanging.toString() + "px";
    }
    adjustColor(scGaugePercentage, angle);
}

function adjustColor(elementGauge, angle) {
    if (angle <= 60) {
        elementGauge.style.backgroundColor = "#00ef41";
    }
    else if (angle <= 120) {
        elementGauge.style.backgroundColor = "#efb900";
    }
    else {
        elementGauge.style.backgroundColor = "rgb(174, 11, 0)";
    }
}

function adjustTextGauge(backgroundElement, textElement) {

    var totalWidth = backgroundElement.offsetWidth;
    var textWidth = textElement.offsetWidth;

    var computedFontSize = window.getComputedStyle(textElement).fontSize;
    var numberFontSize = parseFloat(computedFontSize);
    var divisor = 1.6;
    var maxSize = totalWidth / divisor;

    if (textWidth > maxSize) {
        numberFontSize--;
        textElement.style.fontSize = numberFontSize + "px";
        adjustTextGauge(backgroundElement, textElement);
    }
    var minSize = totalWidth / 1.8;

    if (textWidth < minSize) {
        textElement.style.fontSize = "1.3rem";
    }
}