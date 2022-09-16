let averageMaps = new Map();

function AddAverageGraph(name, variable, position, minimum, maximum, multiplicator, constant, unit, color2, timeDuration) {
    var adjustPosition = position - 1;
    var finalPosition = CheckNumberCell(adjustPosition);
    var table = document.getElementById('table');
    var cell = table.getElementsByTagName('td')[finalPosition];

    if (cell.children.length == 0) {
        if (IDChecker(variable)) {
            CreateDivAverageGraph(cell, variable, maximum, minimum, multiplicator, constant, unit, name, color2, timeDuration);
            adjustCalculator();
            return "true";
        }
    }
    else {
        alert("a célula contém membros");

    }
}

function CreateDivAverageGraph(cell, variable, maximum, minimum, multiplicator, constant, unit, name, color2, timeDuration) {

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
    divForSize.style.position = "relative";
    divToChart.appendChild(divForSize);

    var valueLine = document.createElement("div");
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

    //TimeBorder
    var TimeMeasured = document.createElement("p");
    TimeMeasured.id = "timeBorder" + variable;
    TimeMeasured.classList.add("hiddenvalue");
    TimeMeasured.innerHTML = "";
    multiDiv.appendChild(TimeMeasured);

    //MIN VALUE SUB
    var minimumValue = document.createElement("p");
    minimumValue.id = "minimumID" + variable;
    minimumValue.classList.add("minimunElement");
    minimumValue.innerHTML = minimum;
    minimumValue.style.color = ReturnColor(color2)[0];
    multiDiv.appendChild(minimumValue);

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

    //ELEMENTS FOR ARRAY
    var TotalValue = document.createElement("p");
    TotalValue.id = "totalValue" + variable;
    TotalValue.innerHTML = 0;
    TotalValue.classList.add("hiddenvalue");
    multiDiv.appendChild(TotalValue);

    var TotalOfEntries = document.createElement("p");
    TotalOfEntries.id = "totalEntries" + variable;
    TotalOfEntries.innerHTML = 0;
    TotalOfEntries.classList.add("hiddenvalue");
    multiDiv.appendChild(TotalOfEntries);

    var arrayOfValues = document.createElement("p");
    arrayOfValues.id = "arrayOfValues" + variable;
    arrayOfValues.innerHTML = "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ";
    arrayOfValues.classList.add("hiddenvalue");
    multiDiv.appendChild(arrayOfValues);

    var arrayOfDates = document.createElement("p");
    arrayOfDates.id = "arrayOfDates" + variable;
    arrayOfDates.innerHTML = "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ";
    arrayOfDates.classList.add("hiddenvalue");
    multiDiv.appendChild(arrayOfDates);
    //END OF ELEMENTS 

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
        url: "/History/GetDataForAverageForVarible",
        data: { variable: variable, timeDuration: timeDuration },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (data) {
            InputDataToArrays(data, variable);
            CreateAverageGraph(valueLine.id, color2, maximum, minimum, data, variable);
        },

        error: function (data) {

        },
    });
}

function CreateAverageGraph(containerID, color2, max, min, data, id) {
    id = parseInt(id);

    var finalColor = ReturnColor(color2);

    var myArray = [];
    for (var z = 0; z < data.responseJSON.length; z++) {
        myArray.push({ x: data.responseJSON[z].date, y: data.responseJSON[z].value });
    }

    var map = Morris.Area({
        element: containerID,
        data: myArray,
        pointSize: 0,
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
    averageMaps.set(id, map);
}

function InsertValueToAverageGraph(value, id, timeDuration, now) {
    //SUM VALUE IN SUM OF PREVIOUS VALUES
    //SUM 1 to QTED of ENTRIES
    //input new total in the graph


    var constantV = parseInt(document.getElementById("constant" + id).innerHTML);
    var multiplatorV = parseFloat(document.getElementById("multiID" + id).innerHTML);

    value = (multiplatorV * value) + constantV;

    var values = parseFloat(document.getElementById("totalValue" + id).innerHTML);
    values = values + value;
    document.getElementById("totalValue" + id).innerHTML = values;
    id = parseInt(id);

    var entry = 1;
    var entries = parseFloat(document.getElementById("totalEntries" + id).innerHTML);
    entries = entry + entries;
    document.getElementById("totalEntries" + id).innerHTML = entries;

    var finalValue = values / entries;

    finalValue = Math.round(finalValue * 100) / 100;

    //find arrays and form a matrix with Values
    var dateArray = document.getElementById("arrayOfDates" + id).innerHTML.split(" ");
    var valueArray = document.getElementById("arrayOfValues" + id).innerHTML.split(" ");
    var finalDateReached = dateArray[dateArray.length - 2];


    var myArray = [];
    for (var z = 0; z < dateArray.length; z++)
    {
        if (dateArray[z] != "") {
            myArray.push({ x: dateArray[z].replace("/"," "), y: valueArray[z] });
        }
    }

    now = now.replace("/", " ");
    myArray.push({ x: now, y: finalValue });


    averageMaps.get(id).setData(myArray);

    //check if is time to "step" graph
    CheckStepVariantGraphic(id, finalDateReached, dateArray, valueArray, timeDuration, now, value);
}

function CheckStepVariantGraphic(id, finalDateReached, dateArray, valueArray, timeDuration, now, value) {
    var days = timeDuration.split(" ")[0];
    var point = 100;
    days = days / point;
    var msInDay = 86400000;

    var past = Date.parse(finalDateReached);
    past = past + (msInDay * days);
    var timeNow = Date.parse(now);

    if (past > timeNow) {
        var finalDate = "";
        var finalValue = "";

        for (var counter = 1; counter < valueArray.length; counter++) {

            if (dateArray[counter] != "") {
                finalDate = finalDate + dateArray[counter] + " ";
                finalValue = finalValue + valueArray[counter] + " ";
            }
        }
        document.getElementById("totalEntries" + id).innerHTML = "0";
        document.getElementById("totalValue" + id).innerHTML = "0";

        now = now.replace(" ", "/");

        finalDate = finalDate + now;
        finalValue = finalValue + value;

        document.getElementById("arrayOfValues" + id).innerHTML = finalValue;
        document.getElementById("arrayOfDates" + id).innerHTML = finalDate;
        
    }
    //change arrays to [0] = [1] and array.lenght = new values
    //change values of qted and sumValue to 0 respectvely
}

function InputDataToArrays(data, id)
{
    var constantV = parseInt(document.getElementById("constant" + id).innerHTML);
    var multiplatorV = parseFloat(document.getElementById("multiID" + id).innerHTML);

    var finalDates = "";
    var finalValues = "";

    for (var counter = 0; counter < data.responseJSON.length; counter++) {
        finalDates = finalDates + data.responseJSON[counter].date + " ";
        finalValues = finalValues + (data.responseJSON[counter].value * multiplatorV + constantV) + " ";
    }
    document.getElementById("arrayOfValues" + id).innerHTML = finalValues;
    document.getElementById("arrayOfDates" + id).innerHTML = finalDates;
}

function removeAverageGraphBox(element, variableId) {
    variableId = parseInt(variableId)
    averageMaps.delete(variableId);

    var td = element.parentElement;

    while (td.firstChild) {
        td.removeChild(td.firstChild);
    }
    td.style.backgroundColor = "#222123";
}
