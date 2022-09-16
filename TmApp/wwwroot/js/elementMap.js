var iconBase = 'http://maps.google.com/mapfiles/kml/paddle/';
var icons = {
    red: {
        icon: iconBase + 'red-blank.png'
    },
    blue: {
        icon: iconBase + 'blu-blank.png'
    },
    green: {
        icon: iconBase + 'grn-blank.png'
    },
    azul_claro: {
        icon: iconBase + 'purple-blank.png'
    },
    yellow: {
        icon: iconBase + 'ylw-blank.png'
    },
    pink: {
        icon: iconBase + 'pink-blank.png'
    },
    purple: {
        icon: iconBase + 'purple-blank.png'
    },
    white: {
        icon: iconBase + 'wht-blank.png'
    },
    orange: {
        icon: iconBase + 'orange-blank.png'
    }
};

function ElementColor(elementColor) {
    switch (elementColor) {
        case "Vermelho":
            return icons.red;
            break;

        case "Laranja":
            return icons.orange;
            break;

        case "Amarelo":
            return icons.yellow;
            break;

        case "Verde":
            return icons.green;
            break;

        case "Azul":
            return icons.blue;
            break;

        case "Violeta":
            return icons.purple;
            break;

        default:
            return "branco";
    }
}

function saveElement() {
    var bool = true;

    var userId = document.getElementById("userId").innerText;

    var edge1 = document.getElementById("edge1").value;
    var edge2 = document.getElementById("edge2").value;
    var color1 = document.getElementById("color1").value;
    var color2 = document.getElementById("color2").value;
    var color3 = document.getElementById("color3").value;
    var offText = document.getElementById("offText").value;
    var onText = document.getElementById("onText").value;
    var multiplicador = document.getElementById("multiplicator").value;
    var constant = document.getElementById("constant").value;
    var unit = document.getElementById("unit").value;
    var min = document.getElementById("min").value;
    var max = document.getElementById("max").value;

    var name = document.getElementById("name").value;
    var variables = document.getElementById("variables").value;
    var Xaxis = document.getElementById("Xaxis").value;
    var Yaxis = document.getElementById("Yaxis").value;

    var panelValue = document.getElementById("panelId").innerText;

    var mapType = document.getElementById("mapOption").value;
    var layerName = document.getElementById("layerOption").value;
    var TimePeriod = document.getElementById("TimePeriod").value;

    if (layerName == "") {
        layerName = "standart";
    }

    if (variables == "" || name == "" || Xaxis == "" || Yaxis == "") {
        bool = false;
        alert("preencha os campos principais");
    }       
    
    if (bool)
    {
        $.ajax({
            type: "GET",
            url: "/Dashboard/CreateElement",
            data: {
                edge1: edge1,
                edge2: edge2,
                color1: color1,
                color2: color2,
                color3: color3,
                offText: offText,
                onText: onText,
                mult: multiplicador,
                constant: constant,
                unit: unit,
                min: min,
                max: max,
                name: name,
                variables: variables,
                Xaxis: Xaxis,
                Yaxis: Yaxis,
                idMap: panelValue,
                userId: userId,
                layer: layerName,
                type: mapType,
                TimePeriod: TimePeriod

            },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (response) {
                var element = {
                    max: response.maximun,
                    min: response.minimun,
                    unit: response.unit,
                    color1: response.color1,
                    color2: response.color2,
                    color3: response.color3,
                    edge1: response.edge1,
                    edge2: response.edge2,
                    constant: response.constant,
                    multiplicator: response.multiplicator,
                    id: response.id,
                    name: response.name,
                    xAxis: response.xAxis,
                    yAxis: response.yAxis
                };
                addNewElementToMap(element);
            },
            error: function (response) {

            },
        });
    }
    HideMapOptions();
}

function GetElementData() {

    var element = document.getElementById("element");
    var id = element.options[element.selectedIndex].value;
    var name = document.getElementById("name");
    var telemetry = document.getElementById("telemetry");

    $.ajax({
        type: "GET",
        url: "/Dashboard/GetElementData",
        data: { id: id },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response.success) {
                name.value = response.element.name;
                document.getElementById("unit").value = response.element.unit;
                document.getElementById("min").value = response.element.minimun;
                document.getElementById("max").value = response.element.maximun;
                document.getElementById("multiplicator").value = response.element.multiplicator;
                document.getElementById("constant").value = response.element.constant;
                document.getElementById("onText").value = response.element.subtitleOn;
                document.getElementById("offText").value = response.element.subtitleOff;
                document.getElementById("color1").value = response.element.color1;
                document.getElementById("color2").value = response.element.color2;
                document.getElementById("color3").value = response.element.color3;
                document.getElementById("edge1").value = response.element.edge1;
                document.getElementById("edge2").value = response.element.edge2;
                document.getElementById("Xaxis").value = response.element.xAxis;
                document.getElementById("Yaxis").value = response.element.yAxis;

                document.getElementById("mapOption").value = response.element.type;
                document.getElementById("layerOption").value = response.element.layer;

                //timeDuration
                var timeSelector = document.getElementById("timeSelector");
                if (response.element.type == "Historic") {
                    timeSelector.style.display = "block";
                }
                else {
                    timeSelector.style.display = "none";
                }
                document.getElementById("TimePeriod").value = response.element.timePeriod;

                telemetry.value = response.element.idRegisterTelemetry;
                GetModulesData(response.element.idModule, response.element.variable.id);
            }
            else {

            }
        },
        error: function (response) {

        }
    });
    highlightElement(id);
}


function GetElementDataRemove() {

    var element = document.getElementById("element");
    var id = element.options[element.selectedIndex].value;
    var name = document.getElementById("name");

    $.ajax({
        type: "GET",
        url: "/Dashboard/GetElementData",
        data: { id: id },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response.success) {
                name.value = response.element.name;

                document.getElementById("Xaxis").value = response.element.xAxis;
                document.getElementById("Yaxis").value = response.element.yAxis;
            }
            else {

            }
        },
        error: function (response) {

        }
    });
    highlightElement(id);
}


function EditElement() {
    var bool = true;

    var element = document.getElementById("element");
    var id = element.options[element.selectedIndex].value;

    var edge1 = document.getElementById("edge1").value;
    var edge2 = document.getElementById("edge2").value;
    var color1 = document.getElementById("color1").value;
    var color2 = document.getElementById("color2").value;
    var color3 = document.getElementById("color3").value;
    var offText = document.getElementById("offText").value;
    var onText = document.getElementById("onText").value;
    var multiplicator = document.getElementById("multiplicator").value;
    var constant = document.getElementById("constant").value;
    var unit = document.getElementById("unit").value;
    var min = document.getElementById("min").value;
    var max = document.getElementById("max").value;

    var name = document.getElementById("name").value;
    var variables = document.getElementById("variables").value;
    var Xaxis = document.getElementById("Xaxis").value;
    var Yaxis = document.getElementById("Yaxis").value;

    var elementType = document.getElementById("mapOption").value;
    var layerName = document.getElementById("layerOption").value;
    var timeDuration = document.getElementById("TimePeriod").value;

    if (layerName == "") {
        layerName = "standart";
    }

    var panelValue = document.getElementById("panelId").innerText;

    if (variables == "" || name == "" || Xaxis == "" || Yaxis == "") {
        bool = false;
        alert("preencha os campos principais");
    }

    if (bool) {
        $.ajax({
            type: "GET",
            url: "/Dashboard/EditElementMap",
            data: {
                id: id,
                edge1: edge1,
                edge2: edge2,
                color1: color1,
                color2: color2,
                color3: color3,
                offText: offText,
                onText: onText,
                multiplicator: multiplicator,
                constant: constant,
                unit: unit,
                min: min,
                max: max,
                name: name,
                Xaxis: Xaxis,
                Yaxis: Yaxis,
                panelValue: panelValue,
                elementType: elementType,
                layerName: layerName,
                timeDuration: timeDuration
            },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            complete: function (result) {
                EditElementFromMap(id, Xaxis, Yaxis, name);
                changeAlarmLabel("Posição editada com sucesso");

                EditLabelName(name, id);
                EditElementValues(multiplicator, constant, edge1, edge2, color1, color2, color3, unit, min, max, id, layerName, elementType, timeDuration,name);
            },

            sucess: function (result) {
            },
            error: function (response) {

            },
        });
    }
    HideMapOptions();
}

function deleteElement() {

    var element = document.getElementById("element");
    var id = element.options[element.selectedIndex].value;
    var mapId = document.getElementById("panelId").innerText;

    $.ajax({
        type: "GET",
        url: "/Dashboard/RemoveElement",
        data: {
            elementId: id,
            mapId: mapId
        },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (result) {
            RemoveElementAndInfoFromMap(id)
        },
        sucess: function (result) {

        },
        error: function (response) {

        },
    });
    HideMapOptions();
}

function returnHistoricElementColor(id, value) {
    var edge1 = document.getElementById("edge1" + id).innerHTML;
    var edge2 = document.getElementById("edge2" + id).innerHTML;

    var rangeEdge1 = parseFloat(edge1);
    var rangeEdge2 = parseFloat(edge2);

    var color;
    if (value <= rangeEdge1) {
        color = document.getElementById("color1" + id).innerHTML;
        return color;
    }
    else if (value <= rangeEdge2) {
        color = document.getElementById("color2" + id).innerHTML;
        return color;
    }
    else {
        color = document.getElementById("color3" + id).innerHTML;
        return color;
    }
}

function returnElementColor(id, value) {
    value = parseFloat(value);
   
    var edge1 = parseFloat(document.getElementById("edge1" + id).innerHTML);
    var edge2 = parseFloat(document.getElementById("edge2" + id).innerHTML);

    var color;
    if (value <= edge1) {
        color = document.getElementById("color1" + id).innerHTML;
        return color;
    }
    else if (value <= edge2) {
        color = document.getElementById("color2" + id).innerHTML;
        return color;
    }
    else {
        color = document.getElementById("color3" + id).innerHTML;
        return color;
    }
}

function InsertElement(element) {

    /*create a node for each attribute*/
    var mainDiv = document.getElementById("divElementsHidden");

    var divElement = document.createElement("div");
    mainDiv.appendChild(divElement);

    var pMultiplicator = document.createElement("p");
    pMultiplicator.innerHTML = element.multiplicator;
    pMultiplicator.id = "multiplicator" + element.id;
    divElement.appendChild(pMultiplicator);

    var pConstant = document.createElement("p");
    pConstant.innerHTML = element.constant;
    pConstant.id = "constant" + element.id;
    divElement.appendChild(pConstant);

    var pEdge1 = document.createElement("p");
    pEdge1.innerHTML = element.edge1;
    pEdge1.id = "edge1" + element.id;
    divElement.appendChild(pEdge1);

    var pEdge2 = document.createElement("p");
    pEdge2.innerHTML = element.edge2;
    pEdge2.id = "edge2" + element.id
    divElement.appendChild(pEdge2);

    var pColor1 = document.createElement("p");
    pColor1.innerHTML = element.color1;
    pColor1.id = "color1" + element.id;
    divElement.appendChild(pColor1);

    var pColor2 = document.createElement("p");
    pColor2.innerHTML = element.color2;
    pColor2.id = "color2" + element.id;
    divElement.appendChild(pColor2);

    var pColor3 = document.createElement("p");
    pColor3.innerHTML = element.color3;
    pColor3.id = "color3" + element.id;
    divElement.appendChild(pColor3);

    var pUnit = document.createElement("p");
    pUnit.innerHTML = element.unit;
    pUnit.id = "unit" + element.id;
    divElement.appendChild(pUnit);

    var pMin = document.createElement("p");
    pMin.innerHTML = element.minimun;
    pMin.id = "min" + element.id;
    divElement.appendChild(pMin);

    var pMax = document.createElement("p");
    pMax.innerHTML = element.maximun;
    pMax.id = "max" + element.id;
    divElement.appendChild(pMax);


    var pLayer = document.createElement("p");
    pLayer.innerHTML = element.layer;
    pLayer.id = "layer" + element.id;
    divElement.appendChild(pLayer);

    var pType = document.createElement("p");
    pType.innerHTML = element.type;
    pType.id = "type" + element.id;
    divElement.appendChild(pType);

    var pPeriod = document.createElement("p");
    pPeriod.innerHTML = element.type;
    pPeriod.id = "Period" + element.id;
    divElement.appendChild(pPeriod);

    let pName = document.createElement("p");
    pName.innerHTML = element.name;
    pName.id = "name" + element.id;
    divElement.appendChild(pName);

    var inputAlarmTimer= document.createElement("input");    
    inputAlarmTimer.id = "alarmTimer" + element.id;
    inputAlarmTimer.checked = true;
    divElement.appendChild(inputAlarmTimer);
}

function EditElementValues(multi, constant, edge1, edge2, color1, color2, color3, unit, min, max, id, layer, type, Period,name) {

    document.getElementById("multiplicator" + id).innerHTML = multi;
    document.getElementById("constant" + id).innerHTML = constant;
    document.getElementById("edge1" + id).innerHTML = edge1;
    document.getElementById("edge2" + id).innerHTML = edge2;
    document.getElementById("color1" + id).innerHTML = color1;
    document.getElementById("color2" + id).innerHTML = color2;
    document.getElementById("color3" + id).innerHTML = color3;
    document.getElementById("unit" + id).innerHTML = unit;
    document.getElementById("min" + id).innerHTML = min;
    document.getElementById("max" + id).innerHTML = max;
    document.getElementById("layer" + id).innerHTML = layer;
    document.getElementById("type" + id).innerHTML = type;
    document.getElementById("Period" + id).innerHTML = Period;
    document.getElementById("name" + id).innerHTML = name;
}

function alertpanel() {
    alert("sim");
}
