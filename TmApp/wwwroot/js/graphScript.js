let myMap = new Map();

function data(offset) {
    var ret = [];
    for (var x = 0; x <= 360; x += 10) {
        var v = (offset + x) % 360;
        ret.push({
            x: x,
            y: Math.sin(Math.PI * v / 180).toFixed(4),
            z: Math.cos(Math.PI * v / 180).toFixed(4)
        });
    }
    return ret;
}

function removeGraphBox(element, variableId) {
    variableId = parseInt(variableId);
    myMap.delete(variableId);

    var td = element.parentElement;

    while (td.firstChild) {
        td.removeChild(td.firstChild);
    }
    td.style.backgroundColor = "#222123";
    td.style.opacity = 1;

    inputLabelDivTable(td);
}

function AddGraph(name, variable, position, minimum, maximum, multiplicator, constant, unit, color1, timeDuration) {

    //var adjustPosition = position - 1;
    //var finalPosition = CheckNumberCell(adjustPosition);
    var finalPosition = position;

    var table = document.getElementById('table');
    var cell = table.getElementsByTagName('td')[finalPosition];

    if (cell.children.length == 0) {
        if (IDChecker(variable)) {
            CreateDivGraph(cell, variable, maximum, minimum, multiplicator, constant, unit, name, color1, color1, color1, "", "", "", "", "", timeDuration);
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
            CreateDivGraph(cell, variable, maximum, minimum, multiplicator, constant, unit, name, color1, color1, color1, "", "", "", "", "", timeDuration);
            adjustCalculator();
            return "true";
        }
        else {
            return "false";
        }
    }
}

function CreateDivGraph(cell, variable, maximum, minimum, multiplicator, constant, unit, name, color1,
    color1, color3, edge1, edge2, offLabel, OnLabel, text3, timeDuration) {

    var stringMin = "";
    for (var counter = 0; counter < 15; counter++) {
        stringMin = minimum + " " + stringMin;
    }
    stringMin = stringMin.substring(0, stringMin.length - 1);

    cell.style.backgroundColor = "#303030";

    //cell.onmouseover = function () { componentCellMouseOver(variable) };
    //cell.onmouseout = function () { componentCellMouseOut(variable) };

    var divHeader = document.createElement("div");
    divHeader.classList.add("graphComponentHeader");
    cell.appendChild(divHeader);

    var nameCell = document.createElement("h5");
    nameCell.id = "name_" + variable;
    nameCell.innerHTML = name;
    nameCell.classList.add("graphTitle");
    divHeader.appendChild(nameCell);

    var divChanger = document.createElement("div");
    divChanger.classList.add("graphComponentChanger");
    divHeader.appendChild(divChanger);

    var selectchanger = document.createElement("select");
    selectchanger.classList.add("componentSelector");
    selectchanger.title = "Mudança Temporária de Componente";
    selectchanger.onchange = function () { changeComponent(variable, "GRAPHIC") };
    selectchanger.id = "changeSelector" + variable;
    divChanger.appendChild(selectchanger);
        
    inputOptionsType(selectchanger, "GRAPHIC");
    addTimeDuration(cell, variable, timeDuration);

    var div1 = document.createElement("div");
    div1.classList.add("graphIcons");
    cell.appendChild(div1);

    //Put Icon Labels in time
    var icon1 = document.createElement("i");
    icon1.id = variable + "iconAlarm";
    icon1.classList.add("fas");
    icon1.classList.add("fa-bell");
    icon1.classList.add("alarmGauge");
    div1.appendChild(icon1);

    var icon2 = document.createElement("i");
    icon2.id = variable + "iconHistoric";
    icon2.onclick = function () {        
        showHistoricValuesDashboard(variable, cell, timeDuration, constant, multiplicator, name);
    };
    icon2.classList.add("fas");
    icon2.classList.add("fa-history");
    icon2.classList.add("historyGauge");
    icon2.style.cursor = "pointer";
    div1.appendChild(icon2);

    var icon3 = document.createElement("i");
    icon3.id = variable + "iconAction";
    icon3.classList.add("fas");
    icon3.classList.add("fa-bolt");
    icon3.classList.add("actionGauge");
    div1.appendChild(icon3);

    var icon4 = document.createElement("i");
    icon4.id = variable + "iconActionReceiver";
    icon4.classList.add("fas");
    icon4.classList.add("fa-sign-in-alt");
    icon4.classList.add("actionReceiverGauge");
    div1.appendChild(icon4);
    //endForIcons

    //MAX VALUE SUB
    var maximumValue = document.createElement("p");
    maximumValue.id = "maximumID" + variable;
    maximumValue.classList.add("graphMaxValue");
    maximumValue.style.color = ReturnColor(color1)[1];
    maximumValue.innerHTML = maximum;
    cell.appendChild(maximumValue);

    //Elements For Canvas
    var divToChart = document.createElement("div");
    divToChart.id = "divForChart" + variable;
    divToChart.classList.add("divForChart");
    cell.appendChild(divToChart);

    var divForSize = document.createElement("div");
    divForSize.id = "divForSize" + variable;
    divForSize.style.height = 180 + "px";
    divForSize.style.position = "relative";
    divToChart.appendChild(divForSize);

    var valueLine = document.createElement("div");
    //valueLine.id = "containerID" + variable;
    valueLine.id = "containerID" + variable;
    valueLine.classList.add("containerProperties");
    divForSize.appendChild(valueLine);

    //hidden Elements
    var multiDiv = document.createElement("div");
    multiDiv.id = "id" + variable;
    cell.appendChild(multiDiv);

    var multiplatorValue = document.createElement("p");
    multiplatorValue.id = "multiID" + variable;
    multiplatorValue.classList.add("hiddenvalue");
    multiplatorValue.innerHTML = multiplicator;
    multiDiv.appendChild(multiplatorValue);

    var ArrayValue = document.createElement("p");
    ArrayValue.id = "arrayPlace" + variable;
    ArrayValue.classList.add("hiddenvalue");
    ArrayValue.innerHTML = CheckArrayLocation();
    multiDiv.appendChild(ArrayValue);

    //MIN VALUE SUB
    var minimumValue = document.createElement("p");
    minimumValue.id = "minimumID" + variable;
    minimumValue.classList.add("graphMinValue");
    minimumValue.innerHTML = minimum;
    minimumValue.style.color = ReturnColor(color1)[1];
    multiDiv.appendChild(minimumValue);

    var graphValues = document.createElement("p");
    graphValues.id = "valuesID" + variable;
    graphValues.innerHTML = stringMin;
    graphValues.classList.add("hiddenvalue");
    multiDiv.appendChild(graphValues);

    var measureUnit = document.createElement("p");
    measureUnit.id = "measureUnit" + variable;
    measureUnit.innerHTML = unit;
    measureUnit.classList.add("hiddenvalue");
    multiDiv.appendChild(measureUnit);

    if (constant == undefined) {
        constant = 0;
    };
    var constantValue = document.createElement("p");
    constantValue.id = "constant" + variable;
    constantValue.innerHTML = constant;
    constantValue.classList.add("hiddenvalue");
    multiDiv.appendChild(constantValue);

    var colorValue = document.createElement("p");
    colorValue.id = variable + "_color";
    colorValue.innerHTML = color1;
    colorValue.classList.add("hiddenvalue");
    multiDiv.appendChild(colorValue);

    var label4 = document.createElement("p");
    label4.id = variable + "_text3";
    label4.style.display = "none";
    label4.innerHTML = text3;
    multiDiv.appendChild(label4);

    var label5 = document.createElement("p");
    label5.id = variable + "_type";
    label5.style.display = "none";
    label5.innerHTML = "GRAPHIC";
    multiDiv.appendChild(label5);

    var label6 = document.createElement("p");
    label6.id = variable + "_color1";
    label6.style.display = "none";
    label6.innerHTML = color1;
    multiDiv.appendChild(label6);

    var label7 = document.createElement("p");
    label7.id = variable + "_color3";
    label7.style.display = "none";
    label7.innerHTML = color3;
    multiDiv.appendChild(label7);

    var label8 = document.createElement("p");
    label8.id = variable + "_edge1";
    label8.style.display = "none";
    label8.innerHTML = edge1;
    multiDiv.appendChild(label8);

    var label9 = document.createElement("p");
    label9.id = variable + "_edge2";
    label9.style.display = "none";
    label9.innerHTML = edge2;
    multiDiv.appendChild(label9);

    var label10 = document.createElement("p");
    label10.id = variable + "_offLabel";
    label10.style.display = "none";
    label10.innerHTML = offLabel;
    multiDiv.appendChild(label10);

    var label11 = document.createElement("p");
    label11.id = variable + "_onLabel";
    label11.style.display = "none";
    label11.innerHTML = OnLabel;
    multiDiv.appendChild(label11);

    var sound = document.createElement("audio");
    sound.src = '/Sounds/Red Alert.mp3';
    sound.preload = "auto";
    sound.id = "sound";
    sound.classList.add("currentValueAtributes");
    multiDiv.appendChild(sound);

    var currentValue = document.createElement("p");
    currentValue.id = "currentValue" + variable;
    currentValue.classList.add("currentValueAtributes");
    cell.appendChild(currentValue);

    createGraph(valueLine.id, color1, maximum, minimum, variable, multiplicator);
    inputCellOff(cell, variable);
}

function DataAdjuster(data) {
    //combine 2 arrays into one separete each of them;
    var arrayValue = [];
    var arrayKey = [];
    var FinalArray = [];

    var provDate;
    var newDate;

    for (var i = 0; data.length > i; i++) {
        arrayValue.push(data[i].value);
        provDate = data[i].key;
        newDate = provDate.replace("T", " ");

        arrayKey.push(newDate);
        FinalArray.push([arrayKey[i], arrayValue[i]]);
    }
    return FinalArray;
}

function createHistoryGraph(min, max, containerID, data) {

    data = DataAdjuster(data);
    var body = document.getElementById("body");
    var graphicElemente = document.getElementById(containerID);
    var label = document.getElementById("graphicLoading");
    label.style.display = "block";

    graphicElemente.style = "height:" + body.offsetHeight * 0.8 + "px";
    // create a chart
    var chart = anychart.line();

    // create an area series and set the data
    var series = chart.line(data);

    // set scale mode
    chart.margin(30);
    chart.xScale().mode('continuous');

    chart.yScale().minimum(parseFloat(min));
    chart.yScale().maximum(parseFloat(max));

    // set the titles of the axes OFF
    chart.xAxis().labels(true);
    chart.yAxis().labels(true);

    var xLabels = chart.xAxis().labels();
    xLabels.width(90);
    xLabels.rotation(90);
    xLabels.wordWrap("break-word");
    xLabels.wordBreak("break-all");


    //set Color Graph
    var color = "#3c8dea";
    series.normal().fill(color, 0.3);
    series.hovered().fill(color, 0.1);
    series.selected().fill(color, 0.5);
    series.normal().stroke(color);
    series.hovered().stroke(color, 2);
    series.selected().stroke(color, 4);

    chart.container(containerID);

    chart.draw();
    RemoveElement(containerID);

    label.style.display = "none";
}

function createGraph(containerID, color1, max, min, id, multiplicator) {

    id = parseInt(id);

    var finalColor = ReturnColor(color1);

    var map = Morris.Area({
        element: containerID,
        data: [
            { x: '1', y: 0 },
            { x: '2', y: 0 },
            { x: '3', y: 0 },
            { x: '4', y: 0 },
            { x: '5', y: 0 },
            { x: '6', y: 0 },
            { x: '7', y: 0 },
            { x: '8', y: 0 },
            { x: '9', y: 0 },
            { x: '10', y: 0 },
            { x: '11', y: 0 },
            { x: '12', y: 0 },
            { x: '13', y: 0 },
            { x: '14', y: 0 },
            { x: '15', y: 0 }],
        pointSize: 0.2,
        xkey: 'x',
        ykeys: ['y'],
        labels: ['y'],
        pointFillColors: [finalColor[0]],
        lineColors: [finalColor[1]],
        fillOpacity: 0.4,
        gridTextColor: [finalColor[1]],
        grid: true,
        ymin: min,
        ymax: max,
        axes: false,
        hideHover: 'true',
        smooth: true,
        behaveLikeLine: true,
        goalLineColors: ["rgb(178,34, 34)"],
        goalStrokeWidth: 2,
        resize: true
    });
    myMap.set(id, map);
}

function RemoveElement(elementID) {

    myMap.delete(elementID);

    var mainElement = document.getElementById(elementID);
    if (mainElement == null) {
        var elementName = "id" + elementID;
        mainElement = document.getElementById(elementName);
    }
}

function InsertValueToGraph(value, id, condition) {
    UpdateGraph(id, value);
}

function removeCurrentGraph(id) {

    var containerName = "containerID" + id;
    var container = document.getElementById(containerName);

    var canvasParent = container.parentElement;

    while (canvasParent.lastChild) {
        canvasParent.removeChild(canvasParent.lastChild);
    }
    createCanvas(canvasParent, id);
}

function createCanvas(parentelement, variable) {
    var newCanvas = document.createElement("div");
    newCanvas.id = "containerID" + variable;
    newCanvas.classList.add("containerProperties");

    parentelement.insertBefore(newCanvas, parentelement.children[2]);
}

function replace_newGraph(value, id, condition) {
    var oldData = getData(id, value);

    var data = [];
    for (var i = 0; i < oldData.length; i++) {
        data[i] = parseFloat(oldData[i]);;
    }

    var colorName = document.getElementById(id + "_color").innerHTML;
    var finalColor = ReturnColor(colorName);

    var min = parseFloat(document.getElementById("minimumID" + id).innerHTML);
    var max = parseFloat(document.getElementById("maximumID" + id).innerHTML);

    var goalValue = "";
    goalValue = ReturnConditionValue(condition, max);

    var colorValue = [];
    colorValue = ReturnColorValue(goalValue, condition, value, finalColor);


    if (colorValue[0] == undefined) {
        colorValue[0] = finalColor[0];
    }
    if (goalValue[0] == undefined) {
        goalValue[0] = "";
    }
}

function UpdateGraph(idVariable, value) {

    var data = getData(idVariable, value);
        
    myMap.get(idVariable).setData
        ([{ x: '1', y: parseFloat(data[0]) },
        { x: '2', y: parseFloat(data[1]) },
        { x: '3', y: parseFloat(data[2]) },
        { x: '4', y: parseFloat(data[3]) },
        { x: '5', y: parseFloat(data[4]) },
        { x: '6', y: parseFloat(data[5]) },
        { x: '7', y: parseFloat(data[6]) },
        { x: '8', y: parseFloat(data[7]) },
        { x: '9', y: parseFloat(data[8]) },
        { x: '10', y: parseFloat(data[9]) },
        { x: '11', y: parseFloat(data[10]) },
        { x: '12', y: parseFloat(data[11]) },
        { x: '13', y: parseFloat(data[12]) },
        { x: '14', y: parseFloat(data[13]) },
        { x: '15', y: parseFloat(data[14]) }]);
}

function checkMapGraphLimitsAlarm(idVariable) {
    var value = 0;

    $.ajax({
        type: "GET",
        url: "/Dashboard/checkMapGraphLimitsAlarm",
        data: { idVariable: idVariable },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != "") {
                value = response.split("-");
                CheckIfGraphLimit(value, idVariable);
            }
        }
    });

}

function ReturnColorValue(goalArray, condition, value, finalColor) {
    var conditionArray = condition.split(" ");
    var parameterCondition = conditionArray[0];

    var alertColorOff = "#e6e40c";
    var alertColorOn = "#FF0000";

    var colorArray = [];
    if (goalArray[0] != undefined) {
        switch (parameterCondition) {
            case "menorque":
                if (value < goalArray[1]) {
                    colorArray[0] = alertColorOn;
                }
                else {
                    colorArray[0] = alertColorOff;
                }
                break;
            case "maiorque":
                if (value > goalArray[1]) {
                    colorArray[0] = alertColorOn;
                }
                else {
                    colorArray[0] = alertColorOff;
                }
                break;
            case "iguala":
                if (goalArray[0] == value) {
                    colorArray[0] = alertColorOn;
                }
                else {
                    colorArray[0] = alertColorOff;
                }
                break;
            default:
                colorArray[0] = alertColorOn;
        }
    }
    return colorArray;
}

function ReturnConditionValue(condition, max) {
    var goalValues = [];
    conditionParamenters = condition.split(" ");

    if (condition != "" || conditionParamenters != "variancia5%" || conditionParamenters != "variancia10%" || conditionParamenters != "variancia20%") {
        var conditionarray = condition.split(" ");
        goalValues[0] = conditionarray[1];
    }
    return goalValues;
}

function getMultiplicator(element) {
    var multiplicator = element.parentNode.childNodes[2].childNodes[0].innerHTML;

    return multiplicator;
}

function getMinimum(element) {
    var minimum = element.parentNode.childNodes[2].childNodes[1].innerHTML;

    return minimum;
}

function getMaximum(element) {
    var maximum = element.parentNode.childNodes[2].childNodes[2].innerHTML;

    return maximum;
}

function getConstant(element) {
    var constant = element.parentNode.childNodes[2].childNodes[5].innerHTML;

    return constant;
}

function getData(id, value) {

    var dataElement = document.getElementById("valuesID" + id);
    var data = document.getElementById("valuesID" + id).innerHTML;
    var multiplicator = document.getElementById("multiID" + id).innerHTML;
    var measureValue = document.getElementById("measureUnit" + id);
    var textValue = document.getElementById("currentValue" + id);

    data = data.split(" ");

    var constantvalue = document.getElementById("constant" + id).innerHTML;
    constantvalue = parseInt(constantvalue);

    var newvalue = value;
    newValue = parseFloat(newvalue);
    newvalue = (newvalue * multiplicator) + constantvalue


    newvalue = Math.round(newvalue * 100) / 100;

    data.push(newvalue);

    data.splice(0, 1);

    aleterElementvalue(dataElement, data);
    alterTextProperties(textValue, measureValue, newvalue);

    return data;
}

function aleterElementvalue(dataElement, data) {
    var result;
    for (var i = 0; data.length > i; i++) {
        if (result == undefined) {
            result = data[i];
        }
        else {
            result = result + " " + data[i];
        }
    }
    dataElement.innerHTML = result;
}

function alterTextProperties(textElement, measureValue, newvalue) {
    textElement.innerHTML = newvalue + " " + measureValue.innerHTML;
}

function changeContainerProperties() {

}

function CheckArrayLocation() {
    return 0;
}

function CheckIfGraphLimit(value, idVariable) {

    idVariable = parseInt(idVariable);

    var finalArray = [];
    for (var counterArray = 0; value.length > counterArray; counterArray++) {
        if (value[counterArray] != "") {
            var newValue = parseInt(value[counterArray]);
            if (newValue != null || newvalue != undefined) {
                finalArray.push(newValue);
            }
        }
    }
    //graph1.setData([{ x: '1', y: data[0] },
    myMap.get(idVariable).options.goals = finalArray;
}