function SaveComponent() {

    var userId = document.getElementById("userId").innerText;
    var typeValue = document.getElementById("type").value;
    var nameValue = document.getElementById("name").value;
    var variableValue = document.getElementById("variables").value;
    var positionValue = document.getElementById("position").value;
    var minimumValue = document.getElementById("min").value;
    var maximumValue = document.getElementById("max").value;
    var multiplicatorValue = document.getElementById("multiplicator").value;
    var constantValue = document.getElementById("constant").value;
    var unitValue = document.getElementById("unit").value;
    var panelValue = document.getElementById("panelId").innerText;
    var onLabel = document.getElementById("onLabel").value;
    var offLabel = document.getElementById("offLabel").value;
    var text3 = document.getElementById("text3").value;

    var numberSelected = document.getElementById("variables").selectedIndex;
    var digitalType = document.getElementById("variables")[numberSelected].innerText;
    var history = document.getElementById("recordHistory").checked;
    //check all colors and Change check Default

    var color1 = document.getElementById("lowColor").value;
    var color2 = document.getElementById("mediumColor").value;
    var color3 = document.getElementById("highColor").value;

    var edge1 = document.getElementById("firstEdge").value;
    var edge2 = document.getElementById("secondEdge").value;

    var timeDuration = document.getElementById("timeExtension").value;
    var divVariables = document.getElementById("finalVariables");

    if (divVariables != null) {
        var variables = divVariables.getElementsByClassName("variableValueRow");

        var auxiliaryVariablesValue = ";";
        for (var counter = 0; counter < variables.length; counter++) {
            if (variables[counter].value != undefined) {
                auxiliaryVariablesValue = auxiliaryVariablesValue + variables[counter].value + ";";
            }
        }
    }

    var adjustPosition = positionValue - 1;
    positionValue = CheckNumberCell(adjustPosition);

    if (positionValue != adjustPosition) {
        alert("posição Alterada para " + (positionValue + 1));
    }

    var result = "false";

    if (typeValue === "GAUGE") {
        result = AddGauge(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue, constantValue, unitValue, color1, color2, color3, edge1, edge2, timeDuration);
    }
    else if (typeValue === "GRAPHIC") {
        result = AddGraph(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue, constantValue, unitValue, color2, timeDuration);
        color1 = color2;
        color3 = color2;
    }
    else if (typeValue === "TEXT") {
        result = AddText(nameValue, variableValue, positionValue, multiplicatorValue, constantValue, unitValue, color2, timeDuration);
        color1 = color2;
        color3 = color2;
    }
    else if (typeValue === "DIGITAL") {
        if (AddDigitalIndicator(positionValue, variableValue, nameValue, offLabel, onLabel, digitalType, color1, color2, timeDuration)) {
            color3 = color2;
            result = "true";
        }
    }
    else if (typeValue === "SEMAPHORE") {
        AddSemaphore(positionValue, variableValue, nameValue, multiplicatorValue, constantValue, unitValue, offLabel, onLabel,
            text3, color1, color2, color3, edge1, edge2, color1, color2, color3, edge1, edge2, timeDuration);
        result = "true";
    }
    else if (typeValue === "VERTICAL") {
        AddVertical(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue,
            constantValue, unitValue, color1, color2, color3, edge1, edge2, timeDuration);
        result = "true";
    }
    else if (typeValue === "PHOTO") {
        variableValue = 0; //set variable to 0, in case model doesnt load correctly
        result = AddPhoto(positionValue, text3, nameValue);

    }

    //MUST CHECK EACH
    else if (typeValue === "EXTEND GRAPHIC") {
        result = AddExtendGraph(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue, constantValue, unitValue, color2, timeDuration);
    }
    else if (typeValue === "VARIANT GRAPHIC") {
        result = AddVariantGraph(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue, constantValue, unitValue, color2, timeDuration);
    }
    else if (typeValue === "AVERAGE GRAPHIC") {
        result = AddAverageGraph(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue, constantValue, unitValue, color2, timeDuration);
    }
    else if (typeValue === "COMPARATIVE GRAPHIC") {
        result = AddComparativeGraph(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue, constantValue, unitValue, color2, auxiliaryVariablesValue, timeDuration);
    }

    //get position back;
    positionValue = positionValue + 1;
    if (result == "true") {
        $.ajax({
            type: "GET",
            url: "/Dashboard/CreateComponent",
            data: {
                userId: userId, panelId: panelValue, name: nameValue, variableId: variableValue, type: typeValue,
                min: minimumValue, max: maximumValue, mult: multiplicatorValue, constant: constantValue,
                unit: unitValue, position: positionValue, onLabel: onLabel, offLabel: offLabel, history: history,
                color1: color1, color2: color2, color3: color3, edge1: edge1, edge2: edge2, timeDuration: timeDuration,
                auxiliaryVariables: auxiliaryVariablesValue, text3: text3
            },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            sucess: function (result) {

            },
            error: function (response) {

            },
        });
    }

    ShowLabelDivTable();
    setTimeout(function () { IconChecker(userId, panelValue); }, 2000);
}


function EditComponent() {
    var component = document.getElementById("component");

    if (component.selectedIndex != 0) {

        var componentId = component.options[component.selectedIndex].value;
        var id = document.getElementById("userId").innerText;
        var typeValue = document.getElementById("type").value;
        var nameValue = document.getElementById("name").value;
        var variableValue = document.getElementById("variables").value;
        var variableDiv = document.getElementById("id" + variableValue);
        var positionValue = parseInt(document.getElementById("position").value);
        var formerPosition = parseInt(document.getElementById("formerPosition").value);

        var minimumValue = document.getElementById("min").value;
        var maximumValue = document.getElementById("max").value;
        var multiplicatorValue = document.getElementById("multiplicator").value;
        var constantValue = document.getElementById("constant").value;
        var unitValue = document.getElementById("unit").value;
        var panelValue = document.getElementById("panelId").innerText;
        var onLabel = document.getElementById("onLabel").value;
        var offLabel = document.getElementById("offLabel").value;
        var text3 = document.getElementById("text3").value;
        var numberSelected = document.getElementById("variables").selectedIndex;

        var digitalType = document.getElementById("variables")[numberSelected].innerText;
        var history = document.getElementById("recordHistoryEdit").checked;

        var color1 = document.getElementById("lowColor").value;
        var color2 = document.getElementById("mediumColor").value;
        var color3 = document.getElementById("highColor").value;

        var edge1 = document.getElementById("firstEdge").value;
        var edge2 = document.getElementById("secondEdge").value;

        var timeDuration = document.getElementById("timeExtension").value;

        var auxiliaryVariables = document.getElementsByClassName("checkBoxVariables");
        var auxiliaryVariablesValue = "";

        if (auxiliaryVariables == undefined) {
            var auxiliaryVariablesValue = ";";
        }
        if (auxiliaryVariables != undefined) {

            for (var variableCounter = 0; variableCounter < auxiliaryVariables.length; variableCounter++) {
                if (auxiliaryVariables[variableCounter].checked == true) {
                    auxiliaryVariablesValue = auxiliaryVariablesValue + ";" + auxiliaryVariables[variableCounter].value;
                }
            }
        }
        if (minimumValue === "") {
            minimumValue = "0";
        }
        if (maximumValue === "") {
            maximumValue = "0";
        }
        if (multiplicatorValue === "") {
            multiplicatorValue = "0";
        }
        if (constantValue === "") {
            constantValue = "0";
        }
        if (timeDuration === "") {
            timeDuration = "1 dia";
        }

        if (positionValue != formerPosition) {
            var adjustPosition = positionValue - 1;
            positionValue = CheckNumberCell(adjustPosition);
            if (positionValue != adjustPosition) {
                alert("posição Alterada para " + (positionValue + 1));
            }
        }
        else {
            positionValue = positionValue - 1;
        }

        var formerType;
        if (!!variableValue) {
            formerType = document.getElementById(variableValue + "_type").innerHTML;
        } else {
            formerType = "PHOTO";
            //in case there are more non-variable components, workAround a variable on menu for non-variable components
        }


        if (formerType === "GAUGE") {
            removeGaugeBox(variableDiv);
        }
        else if (formerType === "GRAPHIC") {
            removeGraphBox(variableDiv, variableValue);
        }
        else if (formerType === "TEXT") {
            RemoveTextBox(variableDiv);
        }
        else if (formerType === "DIGITAL") {
            RemoveDigitalBox(variableDiv);
        }
        else if (formerType === "SEMAPHORE") {
            RemoveDigitalBox(variableDiv);
        }
        else if (formerType === "VERTICAL") {
            RemoveVerticalBox(variableDiv);
        }
        else if (formerType === "PHOTO") {
            let formerText = document.getElementById("formerText3").value;
            RemovePhotoComponent(formerText);
        }

        if (typeValue === "GAUGE") {
            //removeGaugeBox(variableDiv);
            AddGauge(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue, constantValue, unitValue, color1, color2, color3, edge1, edge2, timeDuration);
        }
        else if (typeValue === "GRAPHIC") {
            //removeGraphBox(variableDiv, variableValue);
            AddGraph(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue, constantValue, unitValue, color2, timeDuration);
            color1 = color2;
            color3 = color2;
        }
        else if (typeValue === "TEXT") {
            //RemoveTextBox(variableDiv);
            AddText(nameValue, variableValue, positionValue, multiplicatorValue, constantValue, unitValue, color2, timeDuration);
            color1 = color2;
            color3 = color2;
        }
        else if (typeValue === "DIGITAL") {
            //RemoveDigitalBox(variableDiv);
            AddDigitalIndicator(positionValue, variableValue, nameValue, offLabel, onLabel, digitalType, color1, color2, timeDuration);
            color3 = color2;
        }
        else if (formerType === "SEMAPHORE") {
            AddSemaphore(positionValue, variableValue, nameValue, multiplicatorValue, constantValue, unitValue, offLabel, onLabel,
                text3, color1, color2, color3, edge1, edge2, timeDuration);
        }
        else if (formerType === "VERTICAL") {
            AddVertical(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue,
                constantValue, unitValue, color1, color2, color3, edge1, edge2, timeDuration);
        }
        else if (formerType === "PHOTO") {
            AddPhoto(positionValue, text3, nameValue);
        }


        else if (typeValue === "COMPARATIVE GRAPHIC") {
            removeCompareGraphBox(variableDiv, variableValue);
            AddComparativeGraph(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue, constantValue, unitValue, color2, auxiliaryVariables, timeDuration);
        }
        else if (typeValue === "EXTEND GRAPHIC") {
            removeExtendGraphBox(variableDiv, variableValue);
            AddExtendGraph(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue, constantValue, unitValue, color2, timeDuration);
        }
        else if (typeValue === "VARIANT GRAPHIC") {
            removeVariantGraphBox(variableDiv, variableValue);
            AddVariantGraph(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue, constantValue, unitValue, color2, timeDuration);
        }
        else if (typeValue === "AVERAGE GRAPHIC") {
            removeAverageGraphBox(variableDiv, variableValue);
            AddAverageGraph(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue, constantValue, unitValue, color2, timeDuration);
        }

        positionValue = positionValue + 1;
        $.ajax({
            type: "GET",
            url: "/Dashboard/EditComponent",
            data: {
                componentId: componentId, panelId: panelValue, name: nameValue, min: minimumValue, max: maximumValue, mult: multiplicatorValue, constant: constantValue, unit: unitValue, position: positionValue,
                onLabel: onLabel, offLabel: offLabel, history: history, color1: color1, color2: color2, color3: color3, edge1: edge1, edge2: edge2, timeDuration: timeDuration,
                text3: text3
            },
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            sucess: function (result) {

            },
            error: function (response) {

            },
        });

        if (!!variableValue) {//in case non-variable Component
            addNewHistoricValuesAcomulative(variableValue, timeDuration, multiplicatorValue, constantValue);
            addNewHistoricValues(variableValue, timeDuration, multiplicatorValue, constantValue);
        }
    }
    else {
        alert("Preencha o campo do componente");
    }

    var userId = document.getElementById("userId").innerHTML;
    var panelId = document.getElementById("panelId").innerHTML;
    ShowLabelDivTable();

    setTimeout(function () { IconChecker(userId, panelId); }, 1000);
}


function RemoveComponent() {

    var component = document.getElementById("component");
    if (component.selectedIndex != 0) {

        var typeValue = document.getElementById("type").value;
        var componentId = component.options[component.selectedIndex].value;
        var panelValue = document.getElementById("panelId").innerText;
        var variableValue = document.getElementById("variables").value;


        if (!!variableValue) {

            var variableDiv = document.getElementById("id" + variableValue);
            var td;

            typeValue = document.getElementById(variableValue + "_type").innerHTML;
        }
        else {
            //non variable components dont own variable value
            typeValue = "PHOTO";
        }


        if (typeValue === "GAUGE") {
            removeGaugeBox(variableDiv);
        }
        else if (typeValue === "GRAPHIC") {
            removeGraphBox(variableDiv, variableValue);
        }
        else if (typeValue === "TEXT") {
            RemoveTextBox(variableDiv);
        }
        else if (typeValue === "DIGITAL") {
            RemoveDigitalBox(variableDiv);
        }
        else if (typeValue === "SEMAPHORE") {
            RemoveDigitalBox(variableDiv);
        }
        else if (typeValue === "VERTICAL") {
            RemoveVerticalBox(variableDiv);
        }
        else if (typeValue === "PHOTO") {
            let formerText = document.getElementById("formerText3").value;
            RemovePhotoComponent(formerText);
        }
        else if (typeValue === "COMPARATIVE GRAPHIC") {
            removeCompareGraphBox(variableDiv, variableValue);
        }
        else if (typeValue === "EXTEND GRAPHIC") {
            removeExtendGraphBox(variableDiv, variableValue);
        }
        else if (typeValue === "VARIANT GRAPHIC") {
            removeVariantGraphBox(variableDiv, variableValue);
        }
        else if (typeValue === "AVERAGE GRAPHIC") {
            removeAverageGraphBox(variableDiv, variableValue);
        }

        $.ajax({
            type: "GET",
            url: "/Dashboard/RemoveComponent",
            data: { componentId: componentId, panelId: panelValue },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            sucess: function (result) {

            },
            error: function (response) {

            },
        })
    }
    else {
        alert("Preencha o campo do componente");
    }

    //hide div
    hideLabelOnRemove();

    hideDeleteAlarmWindown();
}

function GetComponentData() {

    var component = document.getElementById("component");
    var id = component.options[component.selectedIndex].value;
    var name = document.getElementById("name");
    var telemetry = document.getElementById("telemetry");
    var position = document.getElementById("position");
    var formerPosition = document.getElementById("formerPosition");
    var type = document.getElementById("type");

    $.ajax({
        type: "GET",
        url: "/Dashboard/GetComponentData",
        data: { id: id },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response.success) {
                position.value = response.component.position;
                formerPosition.value = response.component.position;
                name.value = response.component.name;
                telemetry.value = response.component.idRegisterTelemetry;

                if (response.component.idModule !== 0) {
                    GetModulesData(response.component.idModule, response.component.variable.id);
                }

                type.value = response.component.type;
                LoadTypeData(type.value);

                document.getElementById("unit").value = response.component.unit;
                document.getElementById("min").value = response.component.minimun;
                document.getElementById("max").value = response.component.maximun;
                document.getElementById("multiplicator").value = response.component.multiplicator;
                document.getElementById("constant").value = response.component.constant;
                document.getElementById("onLabel").value = response.component.subtitleOn;
                document.getElementById("offLabel").value = response.component.subtitleOff;
                if (!!document.getElementById("recordHistoryEdit")) {
                    document.getElementById("recordHistoryEdit").checked = response.component.variable.recordData;
                }
                document.getElementById("lowColor").value = response.component.color1;
                document.getElementById("mediumColor").value = response.component.color2;
                document.getElementById("highColor").value = response.component.color3;
                document.getElementById("firstEdge").value = response.component.edge1;
                document.getElementById("secondEdge").value = response.component.edge2;
                if (!!document.getElementById("timeExtension")) {
                    document.getElementById("timeExtension").value = response.component.timeDuration;
                }
                document.getElementById("text3").value = response.component.text3;
                if (!!document.getElementById("formerText3")) {
                    document.getElementById("formerText3").value = response.component.text3;
                }

                CheckRecordValue(response.component.variable.recordData);
                HideShowComponentHistory(response.component.variable.recordData);
            } else {
                alert("FALHA AO CARREGAR COMPONENTES");
                window.location.href = "/Login/Login";
            }
        },
        error: function (response) {
            alert("FALHA AO CARREGAR COMPONENTES!");
            window.location.href = "/Login/Login";
        }
    });
}

function InsertColorToElement(elementID) {
    var element = document.getElementById(elementID);
    var array = ["Vermelho", "Laranja", "Amarelo", "Verde", "Violeta", "Azul"];

    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.value = array[i];
        option.classList.add("Component");
        option.text = array[i];
        element.appendChild(option);
    }
}

function InsertVariablesValue(parentElement, name, idValue) {
    var option = document.createElement("option");
    option.value = idValue;
    option.classList.add("Component");
    option.text = name;
    parentElement.appendChild(option);
}

function getVariablesFromTelemetry(index, element) {
    //get type of variable
    var typeIndex = document.getElementById("variables").selectedIndex;
    var type = document.getElementById("variables")[typeIndex].innerHTML;
    var telemetryID = element[index].value;

    var parentElement = document.getElementById("tableDivVariable");
    RemoveChildElements(parentElement);

    $.ajax({
        type: "GET",
        url: "/Dashboard/getVariablesFromTelemetry",
        data: { telemetryID: telemetryID, type: type },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (response) {
            //create div for variables;

            if (response.responseJSON.length > 0) {
                //create div
            }
            for (var v = 0; v, v < response.responseJSON.length - 1; v = v + 2) {
                insertRowVariableSelector(parentElement, response.responseJSON[v], response.responseJSON[v + 1]);
            }
        }
    });
    //get Json with respective variables
}


function RemoveChildElements(element) {
    for (var counter = 0; counter < element.children.length; counter++) {
        if (counter == 0) {

        }
        else {
            element.removeChild(element.children[counter]);
        }
    }
}

function insertRowVariableSelector(parentElement, name, id) {
    var row = document.createElement("tr");
    var rowHeader = document.createElement("th");
    var rowValue = document.createElement("td");
    var rowLabel = document.createElement("label");

    rowValue.className = "fa fa-arrow-down variableValueRow arrowHover";
    rowValue.onclick = function () { InsertIntoDivVariables(id) };

    rowLabel.innerHTML = name;
    rowLabel.id = id + "_variable";
    rowLabel.className = "variableValueRow";
    rowHeader.appendChild(rowLabel);

    row.appendChild(rowHeader);
    row.appendChild(rowValue);

    parentElement.appendChild(row);
}


function insertRowFinalVariable(parentElement, name, id, iconClass, bool) {
    var idchecker = document.getElementById(id + "_Final");

    if (idchecker == undefined) {

        var row = document.createElement("tr");
        row.style.backgroundColor = "#98989854";
        var rowHeader = document.createElement("th");
        var rowValue = document.createElement("td");
        var rowLabel = document.createElement("label");

        rowValue.className = "fa variableValueRow arrowHover";
        rowValue.classList.add(iconClass);

        if (bool) {
            rowValue.onclick = function () { DeleteRow(rowValue) };
        }
        var valueId = id.split("_")[0];
        rowLabel.innerHTML = name;
        rowLabel.value = valueId;
        rowLabel.id = id + "_Final";
        rowLabel.className = "variableValueRow";
        rowHeader.appendChild(rowLabel);

        row.appendChild(rowHeader);
        row.appendChild(rowValue);

        parentElement.appendChild(row);
    }
}

function DeleteRow(td) {
    //delete row selected
    var row = td.parentElement;
    row.parentNode.removeChild(row);
}

function InsertIntoDivVariables(id) {
    parentElement = document.getElementById("finalVariables");

    var element = document.getElementById(id + "_variable");
    insertRowFinalVariable(parentElement, element.innerHTML, element.id, "fa-arrow-up", true);
    //input element on Div of serials;
}

function ReturnColor(color) {
    var array = [];

    switch (color) {
        case "Vermelho":
            array[0] = "rgb(209,1,4)";
            array[1] = "rgb(254,32,35)";
            break;
        case "Laranja":
            array[0] = "rgb(243,80,7)";
            array[1] = "rgb(250,130,76)";
            break;
        case "Amarelo":
            array[0] = "rgb(255,205,57)";
            array[1] = "rgb(255,224,133)";
            break;
        case "Verde":
            array[0] = "rgb(163,199,104)";
            array[1] = "rgb(208,227,179)";
            break;
        case "Violeta":
            array[0] = "rgb(140,53,197)";
            array[1] = "rgb(174,111,216)";
            break;
        case "Azul":
            array[0] = "rgb(46,162,249)";
            array[1] = "rgb(120,195,251)";
            break;
    }
    return array;
}


function changeComponent(variableValue, formerComponent) {
    var selectchanger = document.getElementById("changeSelector" + variableValue).selectedIndex;
    selectchanger = document.getElementById("changeSelector" + variableValue)[selectchanger].value;
    var variableDiv = document.getElementById("id" + variableValue);

    var unit;
    var textOn;
    var textOff;
    var text3;
    var cell;
    var constant;
    var multiplicator;
    var name;
    var min;
    var max;
    var edge1;
    var edge2;
    var color1;
    var color2;
    var color3;
    var timeDuration;


    switch (formerComponent) {
        case "SEMAPHORE":
            cell = variableDiv.parentElement;
            name = document.getElementById("name_" + variableValue).innerHTML;
            min = document.getElementById(variableValue + "_min").innerHTML;
            max = document.getElementById(variableValue + "_max").innerHTML;
            constant = document.getElementById(variableValue + "_constant").innerHTML;
            color1 = document.getElementById(variableValue + "_lowColor").innerHTML;
            color2 = document.getElementById(variableValue + "_mediumColor").innerHTML;
            color3 = document.getElementById(variableValue + "_highColor").innerHTML;
            edge1 = document.getElementById(variableValue + "_edge1").innerHTML;
            edge2 = document.getElementById(variableValue + "_edge2").innerHTML;
            multiplicator = document.getElementById(variableValue + "_multi").innerHTML;
            unit = document.getElementById(variableValue + "_unit").innerHTML;
            textOn = document.getElementById(variableValue + "_labelON").innerHTML;
            textOff = document.getElementById(variableValue + "_labelOFF").innerHTML;
            text3 = document.getElementById(variableValue + "_text3").innerHTML;
            timeDuration = document.getElementById(variableValue + "_durationComp").innerHTML;
            RemoveDigitalBox(variableDiv);
            break;
        case "GAUGE":
            cell = variableDiv.parentElement.parentElement;
            name = document.getElementById("name_" + variableValue).innerHTML;
            min = document.getElementById("sc-min" + variableValue).innerHTML;
            max = document.getElementById("sc-max" + variableValue).innerHTML;
            constant = document.getElementById("costant" + variableValue).innerHTML;
            color1 = document.getElementById(variableValue + "_lowColor").innerHTML;
            color2 = document.getElementById(variableValue + "_mediumColor").innerHTML;
            color3 = document.getElementById(variableValue + "_highColor").innerHTML;
            edge1 = document.getElementById("limit1_" + variableValue).innerHTML;
            edge2 = document.getElementById("limit2_" + variableValue).innerHTML;
            multiplicator = document.getElementById("multi" + variableValue).innerHTML;
            unit = document.getElementById("unit_" + variableValue).innerHTML;
            textOn = document.getElementById(variableValue + "_onLabel").innerHTML;
            textOff = document.getElementById(variableValue + "_offLabel").innerHTML;
            text3 = document.getElementById(variableValue + "_text3").innerHTML;
            timeDuration = document.getElementById(variableValue + "_durationComp").innerHTML;
            removeGaugeBox(variableDiv);
            break;
        case "GRAPHIC":
            cell = variableDiv.parentElement;
            name = document.getElementById("name_" + variableValue).innerHTML;
            max = document.getElementById("maximumID" + variableValue).innerHTML;
            min = document.getElementById("minimumID" + variableValue).innerHTML;
            unit = document.getElementById("measureUnit" + variableValue).innerHTML;
            constant = document.getElementById("constant" + variableValue).innerHTML;
            multiplicator = document.getElementById("multiID" + variableValue).innerHTML;
            color1 = document.getElementById(variableValue + "_color").innerHTML;
            color2 = document.getElementById(variableValue + "_color1").innerHTML;
            color3 = document.getElementById(variableValue + "_color3").innerHTML;
            edge1 = document.getElementById(variableValue + "_edge1").innerHTML;
            edge2 = document.getElementById(variableValue + "_edge2").innerHTML;
            textOn = document.getElementById(variableValue + "_onLabel").innerHTML;
            textOff = document.getElementById(variableValue + "_offLabel").innerHTML;
            text3 = document.getElementById(variableValue + "_text3").innerHTML;
            timeDuration = document.getElementById(variableValue + "_durationComp").innerHTML;
            removeGraphBox(variableDiv, variableValue);
            break;
        case "TEXT":
            cell = variableDiv.parentElement;
            unit = document.getElementById("unit_" + variableValue).innerHTML;
            constant = document.getElementById("constant_" + variableValue).innerHTML;
            name = document.getElementById("name_" + variableValue).innerHTML;
            multiplicator = document.getElementById("multiplicator_" + variableValue).innerHTML;
            color1 = document.getElementById("color_" + variableValue).innerHTML;
            color2 = document.getElementById(variableValue + "_color2").innerHTML;
            color3 = document.getElementById(variableValue + "_color3").innerHTML;
            edge1 = document.getElementById(variableValue + "_edge1").innerHTML;
            edge2 = document.getElementById(variableValue + "_edge2").innerHTML;
            max = document.getElementById(variableValue + "_max").innerHTML;
            min = document.getElementById(variableValue + "_min").innerHTML;
            textOn = document.getElementById(variableValue + "_onLabel").innerHTML;
            textOff = document.getElementById(variableValue + "_offLabel").innerHTML;
            text3 = document.getElementById(variableValue + "_text3").innerHTML;
            timeDuration = document.getElementById(variableValue + "_durationComp").innerHTML;
            RemoveTextBox(variableDiv);
            break;
        case "DIGITAL":
            cell = variableDiv.parentElement;
            name = document.getElementById("name_" + variableValue).innerHTML;
            color1 = document.getElementById(variableValue + "_lowColor").innerHTML;
            color2 = document.getElementById(variableValue + "_mediumColor").innerHTML;
            color3 = document.getElementById(variableValue + "_color3").innerHTML;
            unit = document.getElementById(variableValue + "_unit").innerHTML;
            constant = document.getElementById(variableValue + "_constant").innerHTML;
            multiplicator = document.getElementById(variableValue + "_multi").innerHTML;
            min = document.getElementById(variableValue + "_min").innerHTML;
            max = document.getElementById(variableValue + "_max").innerHTML;
            edge1 = document.getElementById(variableValue + "_edge1").innerHTML;
            edge2 = document.getElementById(variableValue + "_edge2").innerHTML;
            textOn = document.getElementById(variableValue + "_labelON").innerHTML;
            textOff = document.getElementById(variableValue + "_labelOFF").innerHTML;
            text3 = document.getElementById(variableValue + "_text3").innerHTML;
            timeDuration = document.getElementById(variableValue + "_durationComp").innerHTML;
            RemoveDigitalBox(variableDiv);
            break;
        case "VERTICAL":
            cell = variableDiv.parentElement;
            unit = document.getElementById("unit_" + variableValue).innerHTML;
            constant = document.getElementById("constant_" + variableValue).innerHTML;
            name = document.getElementById("name_" + variableValue).innerHTML;
            multiplicator = document.getElementById("multiplicator_" + variableValue).innerHTML;
            color1 = document.getElementById(variableValue + "_color1").innerHTML;
            color2 = document.getElementById(variableValue + "_color2").innerHTML;
            color3 = document.getElementById(variableValue + "_color3").innerHTML;
            edge1 = document.getElementById(variableValue + "_edge1").innerHTML;
            edge2 = document.getElementById(variableValue + "_edge2").innerHTML;
            max = document.getElementById(variableValue + "_max").innerHTML;
            min = document.getElementById(variableValue + "_min").innerHTML;
            textOn = document.getElementById(variableValue + "_onLabel").innerHTML;
            textOff = document.getElementById(variableValue + "_offLabel").innerHTML;
            text3 = document.getElementById(variableValue + "_text3").innerHTML;
            timeDuration = document.getElementById(variableValue + "_durationComp").innerHTML;
            RemoveVerticalBox(variableDiv);
            break;
    }

    //check Campos
    if (unit == "") {
        unit = " ";
    }
    if (textOn == "") {
        textOn = "Fechado";
    }
    if (textOff == "") {
        textOff = "Aberto";
    }
    if (constant == "") {
        constant = "0";
    }
    if (multiplicator == "") {
        multiplicator = "1";
    }
    if (name == "") {
        name = "Nome";
    }
    if (min == "" || min == undefined) {
        min = "0";
    }
    if (max == "" || max == undefined) {
        max = "250";
    }
    if (edge1 == "" || edge1 == undefined) {
        edge1 = "75";
    }
    if (edge2 == "" || edge2 == undefined) {
        edge2 = "150";
    }
    if (color1 == "" || color1 == undefined) {
        color1 = "Verde";
    }
    if (color2 == "" || color2 == undefined) {
        color2 = "Amarelo";
    }
    if (color3 == "" || color3 == undefined) {
        if (color2 != "" || color2 != undefined) {
            color3 = color2;
        }
        else {
            color3 = "Vermelho";
        }
    }
    if (text3 == "" || text3 == undefined) {
        text3 = "Alto";
    }
    if (timeDuration == "" || timeDuration == undefined) {
        timeDuration = "1 dia";
    }

    clearLabelDivGraph(cell);

    switch (selectchanger) {
        case "SEMAPHORE":
            TransferSemaphore(cell, variableValue, name, multiplicator, constant, unit, textOff,
                textOn, text3, color1, color2, color3, edge1, edge2, max, min, timeDuration);
            break;
        case "GAUGE":
            transferGauge(cell, variableValue, max, min, multiplicator, unit, name, constant, color1,
                color2, color3, edge1, edge2, textOff, textOn, text3, timeDuration);
            break;
        case "GRAPHIC":
            CreateDivGraph(cell, variableValue, max, min, multiplicator, constant, unit, name, color2,
                color1, color3, edge1, edge2, textOff, textOn, text3, timeDuration);
            break;
        case "TEXT":
            TransferText(cell, name, unit, variableValue, multiplicator, constant, color1, max, min,
                color2, color3, edge1, edge2, textOff, textOn, text3, timeDuration);
            break;
        case "VERTICAL":
            TransferVertical(cell, name, unit, variableValue, multiplicator, max, min, constant, color1,
                color2, color3, edge1, edge2, textOff, textOn, text3, timeDuration);
            break;
        case "DIGITAL":
            //get Type;

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

                    TransferDigitalIndicator(cell, variableValue, name, textOff, textOn, type, color1, color2,
                        max, min, multiplicator, unit, constant, color3, edge1, edge2, text3, timeDuration);
                }
            });
            break;
    }
}

function ShowHideDiv(idVariable, boolData) {

    if (boolData === "True") {
        boolData = true;
    }
    else {
        boolData = false;
    }
    var variableDiv = document.getElementById("id" + idVariable);

    if (variableDiv != null) {
        var formerType = document.getElementById(idVariable + "_type").innerHTML;

        if (formerType === "GAUGE") {
            td = variableDiv.parentElement.parentElement;
        }
        else if (formerType === "GRAPHIC") {
            td = variableDiv.parentElement;
        }
        else if (formerType === "TEXT") {
            td = variableDiv.parentElement;
        }
        else if (formerType === "DIGITAL") {
            td = variableDiv.parentElement;
        }
        else if (formerType === "SEMAPHORE") {
            td = variableDiv.parentElement;
        }
        else if (formerType === "VERTICAL") {
            td = variableDiv.parentElement;
        }
        if (boolData) {
            td.style.opacity = 1;
            HideDivOffDash(idVariable);
        }
        else {
            td.style.opacity = 0.5;
            ShowDivOffDash(idVariable);
        }
    }
}

function ShowDivOffDash(idVariable) {
    //hide all elements of cell
    var type = document.getElementById(idVariable + "_type").innerHTML;
    var mainDiv;

    switch (type) {
        case "GAUGE":
            mainDiv = document.getElementById("name_" + idVariable);
            mainDiv.classList.add("gaugeHeaderOffDashboard");

            mainDiv = document.getElementById("changeSelector" + idVariable);
            mainDiv.classList.add("gaugeHeaderOffDashboard");

            mainDiv = document.getElementById("DivGauge" + idVariable);
            mainDiv = mainDiv.parentElement;
            mainDiv.classList.add("componentsOffDashboard");

            mainDiv = mainDiv.parentElement.parentElement.getElementsByClassName("sc-info")[0];
            mainDiv.classList.add("componentsOffDashboard");

            mainDiv = document.getElementById("gaugeIndicator" + idVariable);
            mainDiv.classList.add("componentsOffDashboard");

            mainDiv = document.getElementById("sc-min" + idVariable);
            mainDiv.classList.add("componentsOffDashboard");

            mainDiv = document.getElementById("unit_" + idVariable);
            mainDiv.classList.add("componentsOffDashboard");

            mainDiv = document.getElementById("sc-max" + idVariable);
            mainDiv.classList.add("componentsOffDashboard");
            break;

        case "TEXT":
            mainDiv = document.getElementById("name_" + idVariable);
            mainDiv.classList.add("textHeaderOffDashboard");

            mainDiv = document.getElementById("changeSelector" + idVariable);
            mainDiv.classList.add("textHeaderOffDashboard");

            var mainDiv = document.getElementsByClassName("textIcons")[0];
            mainDiv.classList.add("componentsOffDashboard");

            var mainDiv = document.getElementById("valueC_" + idVariable);
            mainDiv.classList.add("componentsOffDashboard");

            var mainDiv = document.getElementById("unit_" + idVariable);
            mainDiv.classList.add("componentsOffDashboard");
            break;

        case "DIGITAL":
            mainDiv = document.getElementById("name_" + idVariable);
            mainDiv.classList.add("digitalHeaderOffDashboard");

            mainDiv = document.getElementById("changeSelector" + idVariable);
            if (!!mainDiv) {
                mainDiv.classList.add("digitalHeaderOffDashboard");
            }

            var mainDiv = document.getElementById("id" + idVariable);
            mainDiv.classList.add("componentsOffDashobard");

            mainDiv = document.getElementById(idVariable + "labels").parentElement;
            mainDiv.classList.add("componentsOffDashboard");
            break;

        case "GRAPHIC":
            mainDiv = document.getElementById("name_" + idVariable);
            mainDiv.classList.add("graphHeaderOffDashboard");

            mainDiv = document.getElementById("changeSelector" + idVariable);
            mainDiv.classList.add("graphHeaderOffDashboard");

            var mainDiv = document.getElementsByClassName("graphIcons")[0];
            mainDiv.classList.add("componentsOffDashboard");

            mainDiv = document.getElementById("divForChart" + idVariable);
            mainDiv.classList.add("componentsOffDashboard");

            mainDiv = document.getElementById("maximumID" + idVariable);
            mainDiv.classList.add("componentsOffDashboard");

            mainDiv = document.getElementById("minimumID" + idVariable);
            mainDiv.classList.add("componentsOffDashboard");

            mainDiv = document.getElementById("currentValue" + idVariable);
            mainDiv.classList.add("componentsOffDashboard");
            break;

        case "SEMAPHORE":
            mainDiv = document.getElementById("name_" + idVariable);
            mainDiv.classList.add("semaphoreHeaderOffDashboard");

            mainDiv = document.getElementById("changeSelector" + idVariable);
            mainDiv.classList.add("semaphoreHeaderOffDashboard");

            var mainDiv = document.getElementsByClassName("semaphoreIcons")[0];
            mainDiv.classList.add("componentsOffDashboard");

            mainDiv = document.getElementById(idVariable + "labels");
            mainDiv.classList.add("componentsOffDashboard");

            mainDiv = document.getElementById(idVariable + "LighterLamp").parentElement.parentElement;
            mainDiv.classList.add("componentsOffDashboard");

            break;

        case "VERTICAL":
            mainDiv = document.getElementById("name_" + idVariable);
            mainDiv.classList.add("vertBarHeaderOffDashboard");

            mainDiv = document.getElementById("changeSelector" + idVariable);
            mainDiv.classList.add("vertBarHeaderOffDashboard");

            mainDiv = document.getElementById("column_" + idVariable).parentElement;
            mainDiv.classList.add("componentsOffDashboard");

            mainDiv = document.getElementById("maximunLabel" + idVariable);
            mainDiv.classList.add("componentsOffDashboard");

            mainDiv = document.getElementById("minimunLabel" + idVariable);
            mainDiv.classList.add("componentsOffDashboard");

            mainDiv = document.getElementById("value_" + idVariable);
            mainDiv.classList.add("componentsOffDashboard");

            var mainDiv = document.getElementsByClassName("vertBarIcons")[0];
            mainDiv.style.display = "none";
            break;
    }
    document.getElementById("offLabel_" + idVariable).style.display = "flex";
}

function HideDivOffDash(idVariable) {
    var type = document.getElementById(idVariable + "_type").innerHTML;
    var mainDiv;

    switch (type) {
        case "SEMAPHORE":
            mainDiv = document.getElementById(idVariable + "labels");
            mainDiv.style.display = "block";
            mainDiv = document.getElementById(idVariable + "LighterLamp").parentElement.parentElement;
            mainDiv.style.display = "block";
            break;
        case "GAUGE":
            mainDiv = document.getElementById("DivGauge" + idVariable);
            mainDiv = mainDiv.parentElement;
            mainDiv.style.display = "block";
            //mainDiv = mainDiv.parentElement.parentElement.getElementsByClassName("sc-info")[0];
            //mainDiv.style.display = "block";
            break;
        case "GRAPHIC":
            mainDiv = document.getElementById("divForChart" + idVariable);
            mainDiv.style.display = "block";
            mainDiv = document.getElementById("maximumID" + idVariable);
            mainDiv.style.display = "block";
            mainDiv = document.getElementById("minimumID" + idVariable);
            mainDiv.style.display = "block";
            mainDiv = document.getElementById("currentValue" + idVariable);
            mainDiv.style.display = "block";
            break;
        case "TEXT":
            var mainDiv = document.getElementById("valueC_" + idVariable);
            mainDiv.style.display = "block";
            break;
        case "DIGITAL":
            mainDiv = document.getElementById(idVariable + "labels").parentElement;
            mainDiv.style.display = "flex";
            break;
        case "VERTICAL":
            mainDiv = document.getElementById("column_" + idVariable).parentElement;
            mainDiv.style.display = "block";
            mainDiv = document.getElementById("maximunLabel" + idVariable);
            mainDiv.style.display = "block";
            mainDiv = document.getElementById("minimunLabel" + idVariable);
            mainDiv.style.display = "block";
            mainDiv = document.getElementById("value_" + idVariable);
            mainDiv.style.display = "block";
            break;
    }
    document.getElementById("offLabel_" + idVariable).style.display = "none";
}

function addMinValueComponent(cell, idVariable) {
    var span = document.createElement("SPAN");
    span.id = "minHistoric_" + idVariable;
    span.classList.add("minMaxComponent");
    cell.appendChild(span);
}

function addEventValueComponent(cell, idVariable) {
    var span = document.createElement("SPAN");
    span.id = "eventHistoric_" + idVariable;
    span.classList.add("minMaxComponent");
    span.classList.add("eventComponentValue");
    cell.appendChild(span);
}

function inputCellOff(element, variable) {
    var cellOff = document.createElement("label");
    cellOff.id = "offLabel_" + variable;
    cellOff.classList.add("componentOffLabel");
    cellOff.innerHTML = "OFF";
    element.appendChild(cellOff);
}

function HideShowComponentHistory(value) {
    var timer = document.getElementById("timeExtension");

    if (!!timer) {
        if (value) {
            timer.style.display = "block";
        }
        else {
            timer.style.display = "none";
        }
    }
}

function hideShowTimePeriod(booleanValue) {
    var timePeriod = document.getElementById("timeExtension");
    var timePeriodLabel = document.getElementById("timeExtensionLabel");
    var recordPercentage = document.getElementById("recordPercentageLabel");
    var recordPercentageLabel = document.getElementById("recordPercentage");

    if (timePeriod != null) {
        if (booleanValue) {
            timePeriod.style.display = "block";
            timePeriod.style.width = "150px";
            timePeriodLabel.style.display = "block";
            recordPercentage.style.display = "block";
            recordPercentageLabel.style.display = "block";
        }
        else {
            timePeriod.style.display = "none";
            timePeriod.style.width = "0px";
            timePeriodLabel.style.display = "none";
            recordPercentage.style.display = "none";
            recordPercentageLabel.style.display = "none";
        }
    }
}

function GraphLimitsMapComponent(idVariable) {
    var values = [];
    var value = -1;

    $.ajax({
        type: "GET",
        url: "/Dashboard/GraphLimitsMapComponent",
        data: { idVariable: idVariable },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            var multi = parseFloat(document.getElementById("multiID" + idVariable).innerHTML);
            var constant = parseFloat(document.getElementById("constant" + idVariable).innerHTML);

            if (response.length > 0) {
                for (var counter = 0; response.length > counter; counter++)
                    value = response[counter];
                value = parseFloat(value) * parseFloat(multi);
                value = value + parseFloat(constant);
                values.push(value);

                myMap.get(idVariable).options.goals = values;
            }
        }
    });
}


function IDChecker(id) {
    id = "id" + id;
    var element = document.getElementById(id);
    if (element == undefined) {
        return true;
    }
    else if (element != undefined) {
        changeAlarmLabel("Variavel já está em uso");
        //alert("Variavel já esta em uso");
        return false;
    }
}