let comparativeMap = new Map();


function AddComparativeGraph(name, variable, position, minimun, maximun, multiplicator, constant, unit, color2, auxiliaryVariables, timeDuration) {

    var adjustPosition = position - 1;
    var finalPosition = CheckNumberCell(adjustPosition);
    var table = document.getElementById('table');
    var cell = table.getElementsByTagName('td')[finalPosition];

    if (cell.children.length == 0) {
        if (IDChecker(variable)) {
            CreateDivComparativeGraph(cell, variable, maximun, minimun, multiplicator, constant, unit, name, color2, auxiliaryVariables, timeDuration);

            adjustCalculator();
            return "true";
        }
    }
    else {
        alert("a célula contém membros");
    }
}

function CreateDivComparativeGraph(cell, variable, maximun, minimun, multiplicator, constant, unit, name, color2, auxiliaryVariables, timeDuration) {

    if (auxiliaryVariables.includes(variable)) {
        variable = "";
    }

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
    maximumValue.innerHTML = maximun;
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

    var ArrayValue = document.createElement("p");
    ArrayValue.id = "arrayPlace" + variable;
    ArrayValue.classList.add("hiddenvalue");
    ArrayValue.innerHTML = CheckArrayLocation();
    multiDiv.appendChild(ArrayValue);

    //MIN VALUE SUB
    var minimumValue = document.createElement("p");
    minimumValue.id = "minimumID" + variable;
    minimumValue.classList.add("minimunElement");
    minimumValue.innerHTML = minimun;
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

    //$.ajax({
    //    type: "GET",
    //    url: "/History/GetDataForComparative",
    //    data: { variable: variable, timeDuration: timeDuration, auxiliaryVariables: auxiliaryVariables },
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",
    //    complete: function (data) {
    //        createComparativeGraph(valueLine.id, variable, maximun, minimun, data);
    //    },
    //    error: function (data) {
    //    },
    //});
}

function createComparativeGraph(containerID, id, max, min, data) {
    id = parseInt(id);

    var myArray = [];

    for (var z = 0; z < data.responseJSON.length; z++) {
        myArray.push({ name: data.responseJSON[z].ids, valor: data.responseJSON[z].totalValue });
    }

    //myMap.get(id) = Morris.Area({
    var map = Morris.Bar({
        element: containerID,
        data: myArray,
        ymax: max,
        ymin: min,
        xkey: 'nome',
        ykeys: ['valor'],
        labels: ['valor'],
        axes: false
    });
    comparativeMap.set(id, map);
}

function InsertValueToComparativeGraph(value, id) {

    //comparativeMap.get(id).setData([
    //    { x: 'A', y: 5, z: 18, a:9},
    //    { x: 'V', y: 5, z: 4, a: 9},
    //    { x: 'B', y: 5, z: 4, a: 9},
    //    { x: 'N', y: 6, z: 8, a: 5},
    //    { x: 'J', y: 5, z: 18, a:9}, 
    //    { x: 'K', y: 5, z: 4, a: 9},
    //    { x: 'O', y: 5, z: 4, a: 9},
    //    { x: 'P', y: 6, z: 8, a: 5},
    //    { x: 'L', y: 5, z: 18,a: 9},
    //    { x: 'E', y: 5, z: 4, a: 9},
    //    { x: 'T', y: 5, z: 4, a: 9},
    //    { x: 'G', y: 6, z: 8, a: 5}
    //]);

}

function removeCompareGraphBox(element, variableID)
{
    variableID = parseInt(variableID);
    comparativeMap.delete(variableID);

    var td = element.parentElement;

    while (td.firstChild) {
        td.removeChild(td.firstChild);
    }

    td.style.backgroundColor = "#222123";
}

