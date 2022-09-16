let extendMaps = new Map();

function AddExtendGraph(name, variable, position, minimum, maximum, multiplicator, constant, unit, color2, timeDuration) {

    var adjustPosition = position - 1;
    var finalPosition = CheckNumberCell(adjustPosition);
    var table = document.getElementById('table');
    var cell = table.getElementsByTagName('td')[finalPosition];

    if (cell.children.length == 0) {
        if (IDChecker(variable)) {
            CreateDivExtendGraph(cell, variable, maximum, minimum, multiplicator, constant, unit, name, color2, timeDuration);
            adjustCalculator();
            return "true";
        }
    }
    else {
        alert("a célula contém membros");
    }
}

function CreateDivExtendGraph(cell, variable, maximum, minimum, multiplicator, constant, unit, name, color2, timeDuration) {

    cell.style.backgroundColor = "#303030";

    var nameCell = document.createElement("p");
    nameCell.id = "name" + variable;
    nameCell.innerHTML = name;
    nameCell.classList.add("nameSpark");
    cell.appendChild(nameCell);

    //Put Icon Labels in time
    var icon1 = document.createElement("i");
    icon1.id = variable + "iconAlarm";
    icon1.classList.add("nav-icon");
    icon1.classList.add("fas");
    icon1.classList.add("fa-bell");
    icon1.classList.add("componentIconBell");
    nameCell.appendChild(icon1);

    var icon2 = document.createElement("i");
    icon2.id = variable + "iconHistoric";
    icon2.classList.add("nav-icon");
    icon2.classList.add("fas");
    icon2.classList.add("fa-history");
    icon2.classList.add("componentIcon");
    icon2.onclick = function () {
        showHistoricValuesDashboard(variable, cell);
    };
    icon2.style.cursor = "pointer";
    nameCell.appendChild(icon2);

    var icon3 = document.createElement("i");
    icon3.id = variable + "iconAction";
    icon3.classList.add("nav-icon");
    icon3.classList.add("fas");
    icon3.classList.add("fa-bolt");
    icon3.classList.add("componentIcon");
    icon3.style.color = "#DCCFCD";
    nameCell.appendChild(icon3);

    var icon4 = document.createElement("img");
    icon4.id = variable + "iconActionReceiver";
    icon4.src = "/Images/miniIconActionReceiver.png";
    icon4.classList.add("nav-icon");
    icon4.classList.add("actionReceiverIcon");
    icon4.classList.add("componentIconBell");
    nameCell.appendChild(icon4);
    //endForIcons

    //MAX VALUE SUB
    var maximumValue = document.createElement("p");
    maximumValue.id = "maximumID" + variable;
    maximumValue.classList.add("maximumElement");
    maximumValue.style.color = ReturnColor(color2)[0];
    maximumValue.innerHTML = maximum;
    cell.appendChild(maximumValue);

    //Elements For Canvas
    var divToChart = document.createElement("div");
    divToChart.id = "divForChart" + variable;
    divToChart.classList.add("divForChart");
    cell.appendChild(divToChart);

    var divForSize = document.createElement("div");
    divForSize.id = "divForSize" + variable;
    divForSize.style.height = (cell.offsetHeight - (cell.offsetHeight * 0.3)) + "px";
    //divForSize.style.top = "-" + (cell.offsetHeight * 0.1) + "px";
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

    //var ArrayValue = document.createElement("p");
    //ArrayValue.id = "arrayPlace" + variable;
    //ArrayValue.classList.add("hiddenvalue");
    //ArrayValue.innerHTML = CheckArrayLocation();
    //multiDiv.appendChild(ArrayValue);

    //MIN VALUE SUB
    var minimumValue = document.createElement("p");
    minimumValue.id = "minimumID" + variable;
    minimumValue.classList.add("minimunElement");
    minimumValue.innerHTML = minimum;
    minimumValue.style.color = ReturnColor(color2)[0];
    multiDiv.appendChild(minimumValue);

    var graphValues = document.createElement("p");
    graphValues.id = "valuesID" + variable;
    graphValues.innerHTML = "0 0 0 0 0 0 0 0";
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
    colorValue.innerHTML = color2;
    colorValue.classList.add("hiddenvalue");
    multiDiv.appendChild(colorValue);

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

    $.ajax({
        type: "GET",
        url: "/History/GetVariableHistory",
        data: { variable: variable, timeDuration: timeDuration },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (data) {
            CreateExtendGraph(valueLine.id, color2, maximum, minimum, data, variable);
        },
        error: function (data) {

        },
    });
}

function CreateExtendGraph(containerID, color2, max, min, data, id) {
    id = parseInt(id);
    var finalColor = ReturnColor(color2);


    var map = Morris.Area({
        element: containerID,
        data: [
            { x: data.responseJSON[1], y: parseInt(data.responseJSON[0]) },
            { x: data.responseJSON[3], y:  parseInt(data.responseJSON[2]) },
            { x: data.responseJSON[5], y:  parseInt(data.responseJSON[4]) },
            { x: data.responseJSON[7], y:  parseInt(data.responseJSON[6]) },
            { x: data.responseJSON[9], y:  parseInt(data.responseJSON[8]) },
            { x: data.responseJSON[11], y: parseInt(data.responseJSON[10])},
            { x: data.responseJSON[13], y: parseInt(data.responseJSON[12])},
            { x: data.responseJSON[15], y: parseInt(data.responseJSON[14])}
        ],
        pointSize: 3,
        xkey: 'x',
        ykeys: ['y'],
        labels: ['y'],
        pointFillColors: [finalColor[0]],
        lineColors: [finalColor[1]],
        gridTextColor: [finalColor[1]],
        grid: true,
        ymin: min,
        ymax: max,
        axes: false,
        hideHover: 'true',
        smooth: false,
        behaveLikeLine: true,
        goalStrokeWidth: 4,
        resize: true
    });
    extendMaps.set(id, map);
}

function InsertValueToExtendedGraph(data, id) {

    var multiplicator = parseFloat(document.getElementById("multiID" + id).innerHTML);
    var constant = parseInt(document.getElementById("constant" + id).innerHTML);
       
    var values = processExetendArray(data, multiplicator, constant);

    extendMaps.get(id).setData([
        { y: values[0], x: data[15] },
        { y: values[1], x: data[14] },
        { y: values[2], x: data[13] },
        { y: values[3], x: data[12] },
        { y: values[4], x: data[11] },
        { y: values[5], x: data[10] },
        { y: values[6], x: data[9] },
        { y: values[7], x: data[8] }
    ]);
}

function processExetendArray(data, multiplicator, constant) {
    var values = [
        (parseInt(data[7]) * multiplicator + constant),
        (parseInt(data[6]) * multiplicator + constant),
        (parseInt(data[5]) * multiplicator + constant),
        (parseInt(data[4]) * multiplicator + constant),
        (parseInt(data[3]) * multiplicator + constant),
        (parseInt(data[2]) * multiplicator + constant),
        (parseInt(data[1]) * multiplicator + constant),
        (parseInt(data[0]) * multiplicator + constant)
    ];
    return values;
}

function GetArrayPlace(idVariable) {
    var counter = document.getElementById("arrayPlace" + idVariable);
    return counter.innerHTML;
}


function removeExtendGraphBox(element, variableId) {
    variableId = parseInt(variableId);
    extendMaps.delete(variableId);

    var td = element.parentElement;

    while (td.firstChild) {
        td.removeChild(td.firstChild);
    }

    td.style.backgroundColor = "#222123";
}
