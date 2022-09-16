let variantMaps = new Map();

function AddVariantGraph(name, variable, position, minimum, maximum, multiplicator, constant, unit, color2, timeDuration) {
    var adjustPosition = position - 1;
    var finalPosition = CheckNumberCell(adjustPosition);
    var table = document.getElementById('table');
    var cell = table.getElementsByTagName('td')[finalPosition];

    if (cell.children.length == 0) {
        if (IDChecker(variable)) {
            CreateDivVariantGraph(cell, variable, maximum, minimum, multiplicator, constant, unit, name, color2, timeDuration);
            adjustCalculator();
            return "true";
        }
    }
    else {
        alert("a célula contém membros");
    }
}

function CreateDivVariantGraph(cell, variable, maximum, minimum, multiplicator, constant, unit, name, color2, timeDuration) {
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
    TimeMeasured.innerHTML = "0";
    multiDiv.appendChild(TimeMeasured);

    //Start Value for Graph
    var minimumValue = document.createElement("p");
    minimumValue.id = "minimumID" + variable;
    minimumValue.classList.add("minimunElement");
    minimumValue.innerHTML = minimum;
    minimumValue.style.color = ReturnColor(color2)[0];
    multiDiv.appendChild(minimumValue);

    var graphValues = document.createElement("p");
    graphValues.id = "valuesID" + variable;
    graphValues.innerHTML = "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0";
    graphValues.classList.add("hiddenvalue");
    multiDiv.appendChild(graphValues);

    var graphDates = document.createElement("p");
    graphDates.id = "datesId" + variable;
    graphDates.innerHTML = "2021-01-23 2021-01-24 2021-01-25 2021-01-25 2021-01-26 2021-01-27 2021-01-28 2021-01-29 2021-01-30 2021-01-31 2021-01-31 " +
        "2021-02-01 2021-02-02 2021-02-03 2021-02-04";
    graphDates.classList.add("hiddenvalue");
    multiDiv.appendChild(graphDates);

    var lowerNumber = document.createElement("p");
    lowerNumber.id = "lowerNumber" + variable;
    lowerNumber.innerHTML = Number.MIN_VALUE;
    lowerNumber.classList.add("hiddenvalue");
    multiDiv.appendChild(lowerNumber);

    var higherNumber = document.createElement("p");
    higherNumber.id = "higherNumber" + variable;
    higherNumber.innerHTML = Number.MAX_VALUE;
    higherNumber.classList.add("hiddenvalue");
    multiDiv.appendChild(higherNumber);
    //End of Value for Graph

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
        url: "/History/GetVariableVariantHistory",
        data: { variable: variable, timeDuration: timeDuration },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (data) {
            InsertDataIntoArrays(variable, data);
            CreateVariantGraph(valueLine.id, color2, maximum, minimum, data, variable);            
        },
        error: function (data) {

        },
    });
}

function InsertDataIntoArrays(elementArrayId, data) {

    var dataValues = "";
    var dateValues = "";

    var values = document.getElementById("valuesID" + elementArrayId);
    var dates = document.getElementById("datesId" + elementArrayId);

    //get constant  
    //get multiplicator



    for (var counter = 0; counter < data.responseJSON.length - 1; counter++) {
        dataValues = dataValues + data.responseJSON[counter].value + " ";
        dateValues = dateValues + data.responseJSON[counter].s + " ";
    }
    dataValues = dataValues;
    dateValues = dateValues;

    dates.innerHTML = dateValues;
    values.innerHTML = dataValues;
}

function CreateVariantGraph(containerID, color2, max, min, data, id) {

    var finalColor = ReturnColor(color2);
    id = parseInt(id);

    var myArray = [];
    for (var z = 0; z < data.responseJSON.length -1; z++) {
        myArray.push({ x: data.responseJSON[z].s, y: data.responseJSON[z].value });
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
    
    variantMaps.set(id, map);
}

function InsertValueToVariantGraph(value, id, timeDuration, now) {

    SetNewvaluesVariantGraph(value, id, now);

    var dateResult = false;
    dateResult = checkVariantStep(id, now, timeDuration);

    if (dateResult) {
        ChangeVariantGraphOrder(value, id);
    }
}

function ChangeVariantGraphOrder(value, id) {
    //read values, update them with new value at the end
    //change values to MAX and MIN respectvely

    var date_array = document.getElementById("datesId" + id).innerHTML.split(" ");
    var value_array = document.getElementById("valuesID" + id).innerHTML.split(" ");

    var maximum_Value = document.getElementById("higherNumber" + id).innerHTML.split(" ")[0];
    var maximum_Date = document.getElementById("higherNumber" + id).innerHTML.split(" ")[1];
    var minimun_Value = document.getElementById("lowerNumber" + id).innerHTML.split(" ")[0];
    var minimun_Date = document.getElementById("lowerNumber" + id).innerHTML.split(" ")[1];

    if (maximum_Value != Number.MAX_VALUE) {
        var final_value = "";
        var final_date = "";

        for (var valueCounter = 2; valueCounter < value_array.length - 1; valueCounter++) {
            final_value = final_value + value_array[valueCounter] + " ";
        }
        final_value = final_value + maximum_Value + " ";
        final_value = final_value + minimun_Value + " ";

        for (valueCounter = 2; valueCounter < date_array.length; valueCounter++) {
            final_date = final_date + date_array[valueCounter] + " ";
        }

        final_date = final_date + maximum_Date + " ";
        final_date = final_date + minimun_Date;

        document.getElementById("datesId" + id).innerHTML = final_date;
        document.getElementById("valuesID" + id).innerHTML = final_value;


        //document.getElementById("higherNumber" + id).innerHTM = Number.MAX_VALUE;        
        //document.getElementById("lowerNumber" + id).innerHTML = Number.MIN_VALUE;
    }
}

function checkVariantStep(id, now, timeDuration) {

    var timeBorder = document.getElementById("timeBorder" + id).innerHTML;
    var days = timeDuration.split(" ")[0];
    var point = 100;
    days = days / point;
    var msInDay = 86400000;

    now = Date.parse(now);
    timeBorder = Date.parse(timeBorder);    
    timeBorder = timeBorder + (msInDay * days);


    if (timeBorder > now) {
        return false;
    }
    else {
        document.getElementById("timeBorder" + id).innerHTML = "0";
        return true;
    }
}

function SetNewvaluesVariantGraph(value, id, now) {
    //check timeBorder
    var timeborder = document.getElementById("timeBorder" + id).innerHTML;

    if (timeborder == "0") {
        document.getElementById("timeBorder" + id).innerHTML = now;
    }

    var d_valuesElement = document.getElementById("datesId" + id).innerHTML.split(" ");
    var v_valueElement = document.getElementById("valuesID" + id).innerHTML.split(" ");

    var higherPoint = parseFloat(document.getElementById("higherNumber" + id).innerHTML.split(" ")[0]);
    var lowerPoint = parseFloat(document.getElementById("lowerNumber" + id).innerHTML.split(" ")[0]);

    if (higherPoint == Number.MAX_VALUE) {
        higherPoint = value + " " + now;
        document.getElementById("higherNumber" + id).innerHTML = higherPoint;
    }

    if (lowerPoint == Number.MIN_VALUE) {
        lowerPoint = value + " " + now;
        document.getElementById("lowerNumber" + id).innerHTML = lowerPoint;
    }
    var minStringValue = document.getElementById("lowerNumber" + id).innerHTML;
    var maxStringValue = document.getElementById("higherNumber" + id).innerHTML;

    var newValue = "";
    if (value < minStringValue.split(" ")[0]) {
        newValue = value + " " + now;
        document.getElementById("lowerNumber" + id).innerHTML = newValue;
    }

    if (value > maxStringValue.split(" ")[0]) {
        newValue = value + " " + now;
        document.getElementById("higherNumber" + id).innerHTML = newValue;
    }

    var myArray = [];
    for (var z = 0; z < d_valuesElement.length-1; z++) {
        myArray.push({ x: d_valuesElement[z], y: v_valueElement[z] });
    }
    var min_date = minStringValue.split(" ")[1] + " " + minStringValue.split(" ")[2]
    min_date = Date.parse(min_date);
    var max_date = maxStringValue.split(" ")[1] + " " + maxStringValue.split(" ")[2]
    max_date = Date.parse(max_date);

    //check witch one comes first
    if (max_date > min_date) {
        myArray.push({ x: minStringValue.split(" ")[1], y: minStringValue.split(" ")[0] });
        myArray.push({ x: maxStringValue.split(" ")[1], y: maxStringValue.split(" ")[0] });
    }
    else {
        myArray.push({ x: maxStringValue.split(" ")[1], y: maxStringValue.split(" ")[0]});
        myArray.push({ x: minStringValue.split(" ")[1], y: minStringValue.split(" ")[0]});
    }
    variantMaps.get(id).setData(myArray);
}

function removeVariantGraphBox(element, variableId) {
    variableId = parseInt(variableId);
    variantMaps.delete(variableId);

    var td = element.parentElement;

    while (td.firstChild) {
        td.removeChild(td.firstChild);
    }
    td.style.backgroundColor = "#222123";
}
