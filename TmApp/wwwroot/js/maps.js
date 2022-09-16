//map Details
const markerList = new Map();
const infoWindowList = new Map();
let map;

//map Details
function CreateMaps() {
    var userId = document.getElementById("user").value;
    var nameValue = document.getElementById("name").value;
    var descriptionValue = document.getElementById("description").value;
    var latitude = document.getElementById("latitude").value;
    var longitude = document.getElementById("longitude").value;

    $.ajax({
        type: "GET",
        url: "/Maps/CreateMap",
        data: { userId: userId, nameValue: nameValue, descriptionValue: descriptionValue, latitude: latitude, longitude: longitude },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            window.location.href = result;
        },
        error: function (response) {
            window.location.href = result;
        },
    });
}

function EditMaps() {

    var nameValue = document.getElementById("name").value;
    var descriptionValue = document.getElementById("description").value;
    var id = document.getElementById("mapId").innerHTML;
    var latitude = document.getElementById("latitude").value;
    var longitude = document.getElementById("longitude").value;

    $.ajax({
        type: "GET",
        url: "/Maps/EditMap",
        data: { nameValue: nameValue, descriptionValue: descriptionValue, id: id, latitude: latitude, longitude: longitude },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            window.location.href = result;
        },
        error: function (response) {
            window.location.href = result;
        },
    });
}

function DeleteMap() {
    var id = document.getElementById("mapId").innerHTML;

    $.ajax({
        type: "GET",
        url: "/Maps/DeleteMap",
        data: { id: id },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            window.location.href = result;
        },
        error: function (response) {
            window.location.href = result;
        },
    });
}

function initMap(idMap) {
    var lat;
    var long;
    var idMap = document.getElementById("panelId");
    var mapBool = document.getElementById("map");
    if (idMap != undefined && mapBool != undefined) {

        idMap = document.getElementById("panelId").innerHTML;
        idMap = parseInt(idMap);

        if (idMap != 0) {

            $.ajax({
                type: "GET",
                url: "/Maps/GetMapData",
                data: { idMap: idMap },
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                complete: function (data) {

                    var result = data.responseJSON;
                    map = new google.maps.Map(document.getElementById("map"), {
                        center:
                        {
                            lat: result.latitude, lng: result.longitude
                        },
                        zoom: 15,
                        mapTypeControlOptions: {
                            mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"],
                        },
                    });
                    map.mapTypes.set("styled_map", styledMapType);
                    map.setMapTypeId("styled_map");
                    let infoWindow = new google.maps.InfoWindow({
                        content: "Clique no mapa para ter latitude e longitude",
                        position: {
                            lat: result.latitude, lng: result.longitude,
                        }
                    });
                    infoWindow.open(map);
                    // Configure the click listener.
                    map.addListener("click", (mapsMouseEvent) => {
                        // Close the current InfoWindow.
                        infoWindow.close();
                        // Create a new InfoWindow.
                        infoWindow = new google.maps.InfoWindow({
                            position: mapsMouseEvent.latLng,
                        });
                        infoWindow.setContent(
                            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2),
                            updateAxis(mapsMouseEvent.latLng.toJSON())
                        );
                        infoWindow.open(map);
                    });
                    if (result.list.length > 0) {
                        ElementsToMap(result.list);
                    }
                },
                error: function (response) {

                },
            });
        }
    }
}

function ElementsToMap(list) {
    for (var counter = 0; list.length > counter; counter++) {
        AddElementToMap(list[counter]);
    }
}

function AddElementToMap(element) {
    var image = {
        /*url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",*/
        url: ElementColor(element.color2).icon,
        size: new google.maps.Size(60, 60),
        scaledSize: new google.maps.Size(60, 60),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).        
        anchor: new google.maps.Point(0, 60),
        labelOrigin: new google.maps.Point(30, 20),
    };

    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: "poly",
    };



    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h3 id="idValue' + element.id + '" class="firstHeading"> ' + element.variable.value + '</h3>' +
        '<button class="buttonLabelMarker" onclick="expandComponentsOfElemet(' + element.variable.id + ',' + element.id + ')"> Expandir Componentes</button>' +
        '<div id="bodyContent">' +
        "</div>" +
        "</div>";

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    infoWindowList.set(element.id, infowindow);

    var marker = new google.maps.Marker({
        position: { lat: element.xAxis, lng: element.yAxis },
        /*icon: ElementColor(element.color2).icon,*/
        labelAnchor: new google.maps.Point(0, 0),
        icon: image,
        label: {
            text: element.name,
            color: "black",
        },
        optimized: false,
        labelClass: "labelsIconMap",
        map,
    });
    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
            shape: shape,
        });

        lowerSupValue(element.id);
    });
    markerList.set(element.id, marker);

    InsertElement(element);
}

function addNewElementToMap(element) {
    var image = {
        /*url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",*/
        url: ElementColor(element.color2).icon,
        size: new google.maps.Size(60, 60),
        scaledSize: new google.maps.Size(60, 60),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).        
        anchor: new google.maps.Point(0, 60),
        labelOrigin: new google.maps.Point(30, 20),
    };

    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: "poly",
    };

    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h3 id="idValue' + element.id + '" class="firstHeading"> ' + 0 + '</h1>' +
        '<button class="buttonLabelMarker" onclick="expandComponentsOfElemet(' + 0 + ',' + element.id + ')"> Expandir Componentes</button>' +
        '<div id="bodyContent">' +
        "</div>" +
        "</div>";

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    infoWindowList.set(element.id, infowindow);

    var marker = new google.maps.Marker({
        position: { lat: element.xAxis, lng: element.yAxis },
        /*icon: ElementColor(element.color2).icon,*/
        labelAnchor: new google.maps.Point(0, 0),
        icon: image,
        label: {
            text: element.name,
            color: "black",
        },
        optimized: false,
        labelClass: "labelsIconMap",
        map,
    });
    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
            shape: shape,
        });
        lowerSupValue(element.id);

    });
    markerList.set(element.id, marker);
    InsertElement(element);
}

function updateAxis(position) {
    var axisX = document.getElementById("Xaxis");
    var axisY = document.getElementById("Yaxis");

    if (axisX != null && axisY != null) {
        axisX.value = position.lat;
        axisY.value = position.lng;
    }
}

function RefreshMapVariableValues(mapId) {
    //refreshvariables set new Values into elements
    let timerValue = document.getElementById("timeIdValue").value;

    $.ajax({
        type: "GET",
        url: "/Maps/RefreshMapVariableValues",
        data: { mapId: mapId },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (timerValue == "realTime") {
                updateMapValueRealTimer(result.listOfRealTimeVariable);
            }
            else {
                updateMapValueEvents(result.listOfRealTimeVariable);
            }
        },
        error: function (response) {
        },
    });
}

function updateMapValueRealTimer(listOfValues) {
    //get all ElmentsFromMapAnd Change Them;
    let element;
    let multi;
    let constant;
    let result;
    let name;

    var finalBoolAlarm = false;

    for (var counter = 0; listOfValues.length > counter; counter++) {
        element = listOfValues[counter].split(";");
        ///IdElemento/IdVariavel/camada/Nome/Valor/Alarme

        multi = parseFloat(document.getElementById("multiplicator" + element[0]).innerHTML);
        constant = parseFloat(document.getElementById("constant" + element[0]).innerHTML);

        result = (multi * parseFloat(element[4])) + constant;
        result = Math.round(result * 100) / 100;
        name = element[3];

        let contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            '<h3 id="idValue' + element[0] + '" class="firstHeading"> ' + name + ": " + result.toString() + '</h3>' +
            '<button class="buttonLabelMarker" onclick="expandComponentsOfElemet(' + element[1].toString() + ',' + element[0].toString() + ')"> Expandir Componentes</button>' +
            '<div id="bodyContent">' +
            "</div>" +
            "</div>";

        /*infoWindowList.get(parseInt(element[0])).setContent(result.toString());*/
        infoWindowList.get(parseInt(element[0])).setContent(contentString);

        let colorElement;
        colorElement = returnElementColor(element[0], element[4]);

        if (element[5] == "True") {
            finalBoolAlarm = true;

            var image = {
                url: "http://maps.google.com/mapfiles/kml/shapes/caution.png",
                /*size: new google.maps.Size(60, 60),*/
                scaledSize: new google.maps.Size(60, 50),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 60),
                labelOrigin: new google.maps.Point(30, 20),
            };
            markerList.get(parseInt(element[0])).setIcon(image);
            markerList.get(parseInt(element[0])).label.color = "white";

            addHiddenAlarmNews(name, element[0]);
        }
        else {
            var image = {
                url: ElementColor(colorElement).icon,
                size: new google.maps.Size(60, 60),
                scaledSize: new google.maps.Size(60, 60),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 60),
                labelOrigin: new google.maps.Point(30, 20),
            };
            markerList.get(parseInt(element[0])).setIcon(image);
            markerList.get(parseInt(element[0])).label.color = "black";
        }
        ChangeAlarmValueMap(element[0], element[5]);
    }
    if (finalBoolAlarm) {
        TriggerMapAlarms(listOfValues);
    }
}

function updateMapValueEvents(listOfValues) {
    //check if has alarm
    let element;
    let alarm;
    let alarmValue;
    let labelText;
    let labelType;
    let resultRealTime;
    let multi;
    let constant;
    let valueRealTime;
    let name;

    var colorElement;

    for (var counter = 0; listOfValues.length > counter; counter++) {
        ///IdElemento/IdVariavel/camada/Nome/Valor/Alarme
        element = listOfValues[counter]
        element = element.split(";");
        valueRealTime = element[4];
        alarm = element[5];
        name = element[3];
        element = element[0];
        element = parseInt(element);

        multi = parseFloat(document.getElementById("multiplicator" + element).innerHTML)
        constant = parseFloat(document.getElementById("constant" + element).innerHTML);
        valueRealTime = (multi * parseFloat(valueRealTime)) + constant;
        valueRealTime = Math.round(valueRealTime * 100) / 100;

        alarmValue = document.getElementById("alarmTimer" + element);

        labelText = markerList.get(element).getLabel();
        labelType = typeof labelText.text;
        labelText = parseFloat(labelText.text);

        if (alarm == "True") {
            if (!alarmValue.checked) {
                //check if alarm was already trigger before adding.
                labelText++;
                labelText = labelText.toString();

                var label = {
                    text: labelText,
                    color: "white"
                };
                markerList.get(element).setLabel(label);
                //change icon to Alarm
                var image = {
                    url: "http://maps.google.com/mapfiles/kml/shapes/caution.png",
                    /*size: new google.maps.Size(60, 60),*/
                    scaledSize: new google.maps.Size(60, 50),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(0, 60),
                    labelOrigin: new google.maps.Point(30, 20),
                };
                markerList.get(element).setIcon(image);

                let label2 = '<div id="content">' +
                    '<div id="siteNotice">' +
                    "</div>" +
                    '<h3 id="idValue' + element + '" class="firstHeading"> ' + name + ":  " + labelText + '</h3>' +
                    '<div id="bodyContent">' +
                    "</div>" +
                    "</div>";

                infoWindowList.get(element).setContent(label2);
            }
            else {
                labelText = labelText.toString();

                var label = {
                    text: labelText,
                    color: "white"
                };
                markerList.get(element).setLabel(label);
            }
            addHiddenAlarmNews(name, element);
        }
        else {
            colorElement = returnElementColor(element, valueRealTime);

            var image = {
                url: ElementColor(colorElement).icon,
                size: new google.maps.Size(60, 60),
                scaledSize: new google.maps.Size(60, 60),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 60),
                labelOrigin: new google.maps.Point(30, 20),
            };
            markerList.get(element).setIcon(image);
            markerList.get(element).label.color = "black";

            labelText = labelText.toString();

            var label = {
                text: labelText,
                color: "black"
            };
            markerList.get(element).setLabel(label);
        }
        ChangeAlarmValueMap(element, alarm);
    }
}

function TriggerMapAlarms(listOfValues) {

    var element;
    var listString = '';
    var queryResult;
    var layer;

    for (var counter = 0; listOfValues.length > counter; counter++) {
        element = listOfValues[counter].split(";");
        if (element[4] != undefined) {
            if (element[4] == "True") {
                listString = listString + element[2] + ",";
            }
        }
    }
    if (listString.length > 0) {
        if (listString.endsWith(",")) {
            listString = listString.substring(0, listString.length - 1);
        }
        $.ajax({
            type: "GET",
            url: "/Maps/GetLayerTrigger",
            data: { listString: listString },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                queryResult = result.listOfIdColorSound;
                //<idCamada,Cor,Som>

                if (queryResult.length == 1) {
                    layer = queryResult[0].split(",");
                    changeStyleMap(layer[1]);
                    ChangeLayerSelector(layer[0]);
                    SoundAlarmMap(layer[2]);
                    alterMapLayerMenu(-1, true);
                }
                else {
                    for (var counter = 0; queryResult.length > counter; counter++) {
                        layer = queryResult[counter].split(",");
                        checkLayerMap(layer[1]);
                        SoundAlarmMap(layer[2]);
                        ChangeLayerSelector(layer[0]);
                    }
                    alterMapLayerMenu(-1, true);
                }
            },
            error: function (response) {

            },
        });
    }
    //make sound Of Layer and Change to It;
    //in case +1 layer is triggered, give message and Highligh Layer
}

function EditElementFromMap(id, Xaxis, Yaxis, name) {
    var myLatlng = new google.maps.LatLng(Xaxis, Yaxis);
    markerList.get(parseInt(id)).setPosition(myLatlng);
    //changemarker TOO -> For name
}

function EditLabelName(name, id) {
    markerList.get(parseInt(id)).setLabel({
        text: name.toString(),
        color: 'black',
    });
}

function RemoveElementAndInfoFromMap(id) {
    markerList.get(parseInt(id)).setMap(null);

    markerList.delete(id);
    infoWindowList.delete(id);
}

function highlightElement(id) {
    markerList.get(parseInt(id)).setAnimation(google.maps.Animation.BOUNCE);
    map.setCenter(markerList.get(parseInt(id)).getPosition());

    setTimeout(function () {
        stopMarkerBouncing(id);
    }, 3000);
}

function stopMarkerBouncing(id) {
    markerList.get(parseInt(id)).setAnimation(null);
}

function HideMapOptions() {
    ImportOptionsMaps();

    var div = document.getElementById("inputDivsMap");
    div.style.display = "none";
}

function hideMapComponentDiv() {
    var div = document.getElementById("MapComponent");
    div.value = false;
    div.style.display = "none";

    document.getElementById("CanvasMapComponent").value = null;
    document.getElementById("componentType").value = null;
}

function expandComponentsOfElemet(variableId, elementId) {
    var name = markerList.get(parseInt(elementId)).getLabel().text;

    ClearMapContent();

    $.ajax({
        type: "GET",
        url: "/Maps/GetComponentsByVariable",
        data: { variableId: variableId },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (result) {
            var listOfComponents = result.responseJSON.listOfComponents;
            if (listOfComponents.length == 0) {
                insertNullMessageOnMapTable();
                hideMapComponentDiv();
            }
            else if (listOfComponents.length > 0) {
                if (listOfComponents.length == 1) {
                    TrasferComponentToMap(listOfComponents[0]);
                }
                else {
                    GenerateListOfComponentsForMap(listOfComponents);
                }
            }
        },
        success: function (result) {

        },
        error: function (response) {

        },
    });
}

function TrasferComponentToMap(component) {
    var mainDiv = document.getElementById("MapComponent");
    mainDiv.style.display = "block";
    mainDiv.value = true;
    var div = document.getElementById("CanvasMapComponent");
    div.value = component.variable.id;

    document.getElementById("componentType").value = component.type;

    if (component.type === "GAUGE") {
        transferGauge(div, component.variable.id, component.maximun, component.minimun, component.multiplicator,
            component.unit, component.name, component.constant, component.color1, component.color2, component.color3,
            component.edge1, component.edge2, "", "", "", component.timeDuration);
    }
    else if (component.type === "GRAPHIC") {
        CreateDivGraph(div, component.variable.id, component.maximun, component.minimun, component.multiplicator,
            component.constant, component.unit, component.name, component.color2, component.color2, component.color2,
            "", "", "", "", "", component.timeDuration);
    }
    else if (component.type === "TEXT") {
        TransferText(div, component.name, component.unit, component.variable.id, component.multiplicator, component.constant,
            component.color1, "", "", component.color1, component.color1, "", "", "", "", "", component.timeDuration);
    }
    else if (component.type === "DIGITAL") {
        var type = GetTypeForDigitalComponent(component.variable.id, component, div);
    }
    else if (component.type === "SEMAPHORE") {
        TransferSemaphore(div, component.variable.id, component.name, component.multiplicator, component.constant, component.unit,
            component.subtitleOff, component.subtitleOn, component.text3, component.color1, component.color2, component.color3,
            component.edge1, component.edge2, component.maximun, component.minimun, component.timeDuration);
    }
    else if (component.type === "VERTICAL") {
        TransferVertical(div, component.name, component.unit, component.variable.id, component.multiplicator, component.maximun,
            component.minimun, component.constant, component.color1, component.color2, component.color3, component.edge1,
            component.edge2, "", "", "", component.timeDuration);
    }
    else if (component.type === "EXTEND GRAPHIC") {
        CreateDivExtendGraph(div, component.variable.id, component.maximun, component.minimun, component.multiplicator,
            component.constant, component.unit, component.name, component.color2, component.timeDuration);
    }
    else if (component.type === "VARIANT GRAPHIC") {
        CreateDivVariantGraph(div, component.variable.id, component.maximun, component.minimun, component.multiplicator,
            component.constant, component.unit, component.name, component.color2, component.timeDuration);
    }
    else if (component.type === "AVERAGE GRAPHIC") {
        CreateDivAverageGraph(div, component.variable.id, component.maximun, component.minimun, component.multiplicator,
            component.constant, component.unit, component.name, component.color2, component.timeDuration);
    }
    else if (component.type === "COMPARATIVE GRAPHIC") {
        CreateDivComparativeGraph(div, component.variable.id, component.maximun, component.minimun, component.multiplicator,
            component.constant, component.unit, component.name, component.color2, component.auxiliaryVariables, component.timeDuration);
    }
    hideChangeSelectorMap(component.variable.id);
}

function hideChangeSelectorMap(variable) {

    var changeSelector = document.getElementById("changeSelector" + variable);
    if (changeSelector != undefined) {
        changeSelector.style.display = "none";
    }
}

function GetTypeForDigitalComponent(variableValue, component, div) {

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

            TransferDigitalIndicator(div, component.variable.id, component.name, component.subtitleOff,
                component.subtitleOn, type, component.color1, component.color2, "", "", "", "", "",
                component.color2, "", "", "", component.timeDuration);
        }
    });
}

function ClearMapContent() {
    var div = document.getElementById("CanvasMapComponent");

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function GenerateListOfComponentsForMap(listOfComponents) {
    var divComponents = document.getElementById("componentList");
    var componentSelection = document.getElementById("componentSelection");

    componentSelection.style.display = "block";
    ClearListOfComponentsOfMaps(divComponents);

    for (var i = 0; listOfComponents.length > i; i++) {
        var row = document.createElement("tr");
        divComponents.appendChild(row);
        var tdName = document.createElement("td");
        row.appendChild(tdName);
        var name = document.createElement("label");
        name.innerHTML = listOfComponents[i].name;
        tdName.appendChild(name);
        var tdButton = document.createElement("td");
        row.appendChild(tdButton);
        var button = document.createElement("button");
        button.innerHTML = "Selecionar componente";
        button.id = listOfComponents[i].id;
        button.innerHTML = "Selecionar";
        button.addEventListener("click", function () { SelectComponentForMap(this.id) });

        button.classList.add("componentListButton");
        tdButton.appendChild(button);
    }
}

function ClearListOfComponentsOfMaps(divComponents) {
    if (divComponents.childNodes.length > 1) {
        while (divComponents.childNodes.length != 1) {
            divComponents.deleteRow(0);
        }
    }
}

function insertNullMessageOnMapTable() {
    var componentSelection = document.getElementById("componentSelection");
    componentSelection.style.display = "block";

    var divComponents = document.getElementById("componentList");
    ClearListOfComponentsOfMaps(divComponents);

    var row = document.createElement("tr");
    divComponents.appendChild(row);

    var tdName = document.createElement("td");
    row.appendChild(tdName);

    var message = document.createElement("label");
    message.innerHTML = "Nenhum componente encontrado";
    message.classList.add("componentListButton");
    tdName.appendChild(message);
}

function hideMapComponentList() {
    var divComponents = document.getElementById("componentList");
    ClearListOfComponentsOfMaps(divComponents);

    var componentSelection = document.getElementById("componentSelection");
    componentSelection.style.display = "none";
}

function SelectComponentForMap(id) {
    ClearMapContent();

    $.ajax({
        type: "GET",
        url: "/Maps/GetComponentsById",
        data: { id: id },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (result) {
            var component = result.responseJSON.componentModel;

            TrasferComponentToMap(component);
        },
        success: function (result) {

        },
        error: function (response) {

        },
    });
}

function refreshComponentOfMap() {
    var idVariable = document.getElementById("CanvasMapComponent").value;

    if (idVariable != null) {
        var type = document.getElementById("componentType").value;

        $.ajax({
            type: "GET",
            url: "/Maps/getVariableById",
            data: { id: idVariable },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            complete: function (result) {
                var variable = result.responseJSON.variable;
                CheckIconsOfMap(variable);
                refreshValueComponentOfMap(type, variable.value, idVariable);
            },
            success: function (result) {

            },
            error: function (response) {

            },
        });

    }
}

function refreshValueComponentOfMap(type, value, divVariableId) {

    switch (type) {
        case "GAUGE":
            insertValueToGauge(value, divVariableId);
            break;
        case "GRAPHIC":
            UpdateGraph(divVariableId, value);
            GraphLimitsMapComponent(divVariableId);
            break;
        case "TEXT":
            insertValueToText(value, divVariableId);
            break;
        case "DIGITAL":
            insertValueToDigitalIndicator(value, divVariableId);
            break;
        case "SEMAPHORE":
            insertValueToSempaphoreIndicator(value, divVariableId);
            break;
        case "VERTICAL":
            InsertValueToVertical(value, divVariableId);
            break;
        case "EXTEND GRAPHIC":
            InsertValueToExtendedGraph(variable.data, variable.id);
            break;
        case "VARIANT GRAPHIC":
            InsertValueToVariantGraph(value, divVariableId, variable.timeDuration, variable.now);
            break;
        case "AVERAGE GRAPHIC":
            InsertValueToVariantGraph(value, divVariableId, variable.timeDuration, variable.now);
            break;
        case "AVERAGE GRAPHIC":
            InsertValueToAverageGraph(value, divVariableId, variable.timeDuration, variable.now);
            break;
        case "COMPARATIVE GRAPHIC":
            InsertValueToComparativeGraph(value, divVariableId);
            break;
    }
}

function CheckIconsOfMap(variable) {
    ChangeIconHistoryOfMap(variable.recordData, variable.id);
    ChangeIconReceiverOfMap(variable.id);
    ChangeActionOfMap(variable.action, variable.id);
    ChangeAlarmIconsOfMaps(variable.condition, variable.id, variable.alarm);
}

function ChangeIconHistoryOfMap(boolean, id) {

    var nameID = id + "iconHistoric";
    var VariableHistoryIcon = document.getElementById(nameID);
    if (VariableHistoryIcon != undefined) {
        if (boolean) {
            VariableHistoryIcon.classList.add("nav-icon");
            VariableHistoryIcon.classList.add("fas");
            VariableHistoryIcon.classList.add("fa-history");
        }
        else {
            VariableHistoryIcon.classList.remove("nav-icon");
            VariableHistoryIcon.classList.remove("fas");
            VariableHistoryIcon.classList.remove("fa-history");
        }
    }
}

function ChangeIconReceiverOfMap(elementId) {

    $.ajax({
        type: "GET",
        url: "/Maps/CheckActionReceiverIconById",
        data: { idVariable: elementId },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (response) {

            var boolean = response.responseJSON;
            var icon = document.getElementById(elementId + "iconActionReceiver");

            if (icon != undefined) {
                if (boolean) {
                    icon.style.display = "block";
                }
                else {
                    icon.style.display = "none";
                }
            }
        }
    });
}

function ChangeActionOfMap(actionvalue, variableId) {
    var icon = document.getElementById(variableId + "iconAction");

    if (actionvalue == null) {
        icon.style.display = "none";
    }
    else {
        icon.style.display = "block";
    }
}

function ChangeAlarmIconsOfMaps(listOfAlarms, idVariable, alarmTrigger) {
    //check Alarms - shortway thou
    var variableIconAlarm = document.getElementById(idVariable + "iconAlarm");
    //Div do histórico
    var mapComponent = document.getElementById("MapComponent");

    if (listOfAlarms.length == 1 || listOfAlarms.length == 0) {
        variableIconAlarm.style.display = "none";

        if (mapComponent.classList.contains("divAlarmRinging")) {
            mapComponent.classList.remove("divAlarmRinging");
        }
    }
    if (alarmTrigger) {
        variableIconAlarm.style.display = "block";
        variableIconAlarm.style.color = "rgb(255, 0, 12)";

        mapComponent.classList.add("divAlarmRinging");
    }
    else if (listOfAlarms.length > 1) {
        $.ajax({
            type: "GET",
            url: "/Maps/CheckAlarmOfMapComponent",
            data: { listOfAlarms: listOfAlarms },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            complete: function (response) {
                var color = response.responseJSON.alarmColor;

                if (color == "yellow") {
                    variableIconAlarm.style.display = "block";
                    variableIconAlarm.style.color = "rgb(207,178,31)";

                    if (mapComponent.classList.contains("divAlarmRinging")) {
                        mapComponent.classList.remove("divAlarmRinging");
                    }
                }
                if (color == "white") {
                    variableIconAlarm.style.display = "block";
                    variableIconAlarm.style.color = "rgb(196,193,193)";

                    if (mapComponent.classList.contains("divAlarmRinging")) {
                        mapComponent.classList.remove("divAlarmRinging");
                    }
                }
            }
        });
    }
}

function CentralizeMap() {
    var idMap = document.getElementById("panelId").innerHTML;

    $.ajax({
        type: "GET",
        url: "/Maps/GetMapData",
        data: { idMap: idMap },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (data) {
            var result = data.responseJSON;
            map.setCenter({ lat: result.latitude, lng: result.longitude });
        },
        error: function (response) {
        },
    });
}

function OpenMenuMap() {
    //get Menu and Make It visible;
    var mainDiv = document.getElementById("divfilterMap");
    mainDiv.style.display = "block";
}

function closeDivFilterMap() {
    //get Menu and Make It visible;
    var mainDiv = document.getElementById("divfilterMap");
    mainDiv.style.display = "none";
}

function changeElementMenu(element) {

    var nameClass = element.className;

    if (nameClass == "uncheckedLayer") {
        element.className = "checkedLayer";
    }
    if (nameClass == "checkedLayer") {
        element.className = "uncheckedLayer";
    }
}

function alterMapLayerMenu(element, changeElementBool) {

    if (changeElementBool) {
        if (element != -1) {
            changeElementMenu(element);
        }
    }

    var layerOptions = document.getElementById("menuMainLayer");

    var resultLayers = "";
    var layerValue = '';
    var layerNames = '';
    var id = -1;



    for (var counterLayer = 0; layerOptions.children.length > counterLayer; counterLayer++) {
        if (layerOptions.children[counterLayer].className === "checkedLayer") {
            layerValue = layerOptions.children[counterLayer].children[0].value;
            layerValue = layerValue.split("-");
            layerNames = layerNames + layerValue[1] + ",";
            resultLayers = resultLayers + "'" + layerValue[0] + "',";
        }
    }
    if (resultLayers.endsWith(",")) {
        resultLayers = resultLayers.substring(0, resultLayers.length - 1);
    }
    checkColorLayer(layerNames);
    var timer = getTimerMap();

    if (timer == "realTime") {
        //event realTime
        $.ajax({
            type: "GET",
            url: "/Maps/FilterMapOptions",
            data: { resultLayers: resultLayers },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            complete: function (response) {
                var list = response.responseJSON;

                for (var element of markerList) {
                    markerList.get(element[0]).setMap(null);
                }
                for (var counter = 0; list.length > counter; counter++) {
                    if (markerList.get(list[counter])) {
                        markerList.get(list[counter]).setMap(map);
                    }
                }
            }
        });
    }
    else {
        //event Timer
        $.ajax({
            type: "GET",
            url: "/Maps/FilterMapOptionsHistoric",
            data: { resultLayers: resultLayers },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            complete: function (response) {
                var list = response.responseJSON;

                for (var element of markerList) {
                    markerList.get(element[0]).setMap(null);
                }
                for (var counter = 0; list.length > counter; counter++) {

                    id = parseInt(list[counter].split("-")[1]);

                    if (markerList.get(id) != undefined) {
                        markerList.get(id).setMap(map);
                    }
                }
            }
        });
    }
}

function alterMapLayer() {
    var layerOptions = document.getElementById("filterListOptions");
    var layerOptions = layerOptions.getElementsByTagName("input");

    var resultLayers = "";
    var layerValue = '';
    var layerNames = '';

    //layer
    for (var counterLayer = 0; layerOptions.length > counterLayer; counterLayer++) {
        if (layerOptions[counterLayer].checked) {
            layerValue = layerOptions[counterLayer].value;
            layerValue = layerValue.split("-");
            layerNames = layerNames + layerValue[1] + ",";
            resultLayers = resultLayers + "'" + layerValue[0] + "',";
        }
    }
    if (resultLayers.endsWith(",")) {
        resultLayers = resultLayers.substring(0, resultLayers.length - 1);
    }
    checkColorLayer(layerNames);

    $.ajax({
        type: "GET",
        url: "/Maps/FilterMapOptions",
        data: { resultLayers: resultLayers },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (response) {
            var list = response.responseJSON;

            for (var element of markerList) {
                markerList.get(element[0]).setMap(null);
            }
            for (var counter = 0; list.length > counter; counter++) {
                if (markerList.get(list[counter])) {
                    markerList.get(list[counter]).setMap(map);
                }
            }
        }
    });
}

function alterLayerForAlarm(idLayer) {
    $.ajax({
        type: "GET",
        url: "/Maps/FilterMapOptions",
        data: { resultLayers: idLayer },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (response) {
            var list = response.responseJSON;

            for (var element of markerList) {
                markerList.get(element[0]).setMap(null);
            }

            for (var counter = 0; list.length > counter; counter++) {
                if (markerList.get(list[counter])) {
                    markerList.get(list[counter]).setMap(map);
                }
            }
        }
    });
}

function checkColorLayer(layerNames) {

    var nameColor = '';
    var boolColor = true;
    //check if colors are same;
    if (layerNames.endsWith(",")) {
        layerNames = layerNames.substring(0, layerNames.length - 1);

        if (layerNames.length > 1) {
            layerNames = layerNames.split(",");
            nameColor = layerNames[0]

            for (var counter = 0; layerNames.length > counter; counter++) {
                if (layerNames[counter] != "") {
                    if (nameColor != layerNames[counter]) {
                        boolColor = false;
                    }
                }
            }
            if (boolColor) {
                changeStyleMap(nameColor);
            }
            else {
                changeStyleMap("Padrão");
            }
        }
    }
}

function changeFilterLayer(id, value) {
    //Get -> all values, give ID
    $.ajax({
        type: "GET",
        url: "/Maps/ObtainListOfElementsByLayer",
        data: { id: id },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (response) {
            var list = response.responseJSON;

            for (var counter = 0; list.length > counter; counter++) {
                if (value) {
                    if (markerList.get(list[counter])) {
                        markerList.get(list[counter]).setMap(map);
                    }
                }
                else {
                    if (markerList.get(list[counter])) {
                        markerList.get(list[counter]).setMap(null);
                    }
                }
            }

        }
    });
}

function timeSelectorChange() {
    var mapOption = document.getElementById("mapOption");
    var value = mapOption.value;
    var timeSelector = document.getElementById("timeSelector");

    switch (value) {
        case "RealTime":
            timeSelector.style.display = "none";
            break
        case "Historic":
            timeSelector.style.display = "block";
            break
    }
}

function changeFilterTimePeriod(type, checker) {
    $.ajax({
        type: "GET",
        url: "/Maps/ObtainListOfElementsByType",
        data: { type: type },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (response) {
            var list = response.responseJSON;

            for (var counter = 0; list.length > counter; counter++) {
                if (checker) {
                    if (markerList.get(list[counter])) {
                        markerList.get(list[counter]).setMap(map);
                    }
                }
                else {
                    if (markerList.get(list[counter])) {
                        markerList.get(list[counter]).setMap(null);
                    }
                }
            }
        }
    });
}

function showPanelsMap() {
    var componentDivsMap = document.getElementById("ComponentDivsMap");
    if (componentDivsMap.style.display == "block") {
        componentDivsMap.style.display = "none";
    }
    else {
        componentDivsMap.style.display = "block";
    }
}

function ReturnMainMenuMaps() {
    var div = document.getElementById("inputDivsMap");
    div.style.width = "0px";

    div = document.getElementById("mainMapConfig");
    div.style.display = "block";

    div = document.getElementById("importConfigBtn");
    div.style.display = "block";

    div = document.getElementById("mapAreaSave");
    div.style.display = "flex";
}

function ExpandCollapseComponentNamesMap(tableId, element) {

    var className = element.childNodes[1].classList[2];
    if (className == "fa-arrow-alt-circle-down") {
        element.childNodes[1].classList.remove("fa-arrow-alt-circle-down");
        element.childNodes[1].classList.add("fa-arrow-alt-circle-up");
        element.childNodes[1].title = "Encolher Componentes";
    }
    else if (className == "fa-arrow-alt-circle-up") {
        element.childNodes[1].classList.remove("fa-arrow-alt-circle-up");
        element.childNodes[1].classList.add("fa-arrow-alt-circle-down");
        element.childNodes[1].title = "Expandir Componentes";
    }
    var tableElement = document.getElementById("panel_" + tableId);

    tableElement = tableElement.lastChild;

    for (var counter = 0; counter < tableElement.children.length; counter++) {
        var element = tableElement.children[counter];

        if (element.tagName == "TR") {
            if (element.classList.contains("mapsRowComponents") || element.classList.contains("historyRowComponentsSelected")) {
                if (element.style.display == "") {
                    element.style.display = "grid";
                }
                else if (element.style.display == "none") {
                    element.style.display = "grid";
                }
                else if (element.style.display == "grid") {
                    element.style.display = "none";
                }
            }
        }
    }
}

function SoundAlarmMap(number) {
    var sound;

    switch (number) {
        case "0":
            //No Sound
            break;
        case "1":
            sound = document.getElementById("redAlertSound").play();
            break;
        case "2":
            sound = document.getElementById("futureSound").play();
            break;
        case "3":
            sound = document.getElementById("vocalSound").play();
            break;
        case "4":
            sound = document.getElementById("atention").play();
            break;
        default:
            sound = document.getElementById("redAlertSound").play();
            break;
    }
}

function ChangeLayerSelector(id) {
    var idLayer = document.getElementById("idLayer_" + id);
    idLayer.parentElement.className = "checkedLayer";
    //change Class of document
}

function InitializeMap() {
    let sidebar = document.getElementById("viewportPage");
    sidebar.style.height = "81vh";

    //////justInCase
    //var checkBox = document.getElementById("my-checkbox");

    //checkBox = checkBox.children[0];
    //for (var counter = 0; checkBox.childNodes.length > counter; counter++) {
    //    if (checkBox.childNodes[counter].nodeName == "DIV") {
    //        checkBox.childNodes[counter].style.fontSize = "22px";
    //        checkBox.childNodes[counter].style.letterSpacing = "-1.1px";
    //    }
    //    if (counter == 1) {
    //        checkBox.childNodes[counter].style.width = "162px";
    //    }
    //}
}

function ChangeTimeValueMap(time) {
    ChangeTimeValue(time);
    changeToggleTitle(time)

    if (time == "realTime") {
        showAllPinsMap();
        InputNameOnPinsMap();
        //realTimeValue Default;
    }
    else {
        ClearMapPins();
        ShowPinEvents();
        //historic of 1 day IF able to get;
    }
}

function ClearMapPins() {
    markerList.forEach(ClearMap);
}

function showAllPinsMap() {
    var pins = Array.from(markerList.keys());
    for (let counter = 0; counter < pins.length; counter++) {
        markerList.get(pins[counter]).setMap(map);
    }
}

function InputNameOnPinsMap() {
    var pins = Array.from(markerList.keys());
    var idElements = "";
    var result;
    var id;
    var name;

    for (let counter = 0; counter < pins.length; counter++) {
        idElements = idElements + "," + pins[counter];
    }
    if (idElements.startsWith(",")) {
        idElements = idElements.substring(1, idElements.length);
    }

    if (idElements != "") {
        $.ajax({
            type: "GET",
            url: "/Maps/GetElementsName",
            data: { elements: idElements },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            complete: function (response) {
                result = response.responseJSON.listElements;
                //id-name;
                for (var counter = 0; result.length > counter; counter++) {
                    id = parseInt(result[counter].split("-")[0]);
                    name = result[counter].split("-")[1];

                    var label = {
                        text: name
                    };

                    markerList.get(id).setLabel(label);
                }
            }
        });
    }
}

function ShowPinEvents() {
    var listElements = "";
    var result;
    var pins;

    var keys = Array.from(markerList.keys());

    for (var counter = 0; keys.length > counter; counter++) {
        listElements = listElements + "," + keys[counter];
    }
    if (listElements.startsWith(",")) {
        listElements = listElements.substring(1, listElements.length);
    }

    if (listElements != "") {
        $.ajax({
            type: "GET",
            url: "/Maps/GetElementsHistoricRecordData",
            data: { elements: listElements },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            complete: function (response) {
                result = response.responseJSON.listElements;
                for (var counter = 0; result.length > counter; counter++) {
                    pins = parseInt(result[counter].split("-")[0]);
                    markerList.get(pins).setMap(map);
                }
                if (result.length > 0) {
                    InputHistoricValueMaps(result);
                }
            }
        });
    }
}

function InputHistoricValueMaps(listElements) {
    var elements = "";
    var pin;
    var result;
    var contentString;
    let name = "";
    for (var counter = 0; listElements.length > counter; counter++) {
        elements = elements + ";" + listElements[counter];
    }
    if (elements.startsWith(";")) {
        elements = elements.substring(1, elements.length);
    }

    $.ajax({
        type: "GET",
        url: "/HistoryShow/GetEventFromElementsVariable",
        data: { listElements: elements },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            result = msg.responseJSON;
            //idElement-idVariable.
            for (var counter = 0; result.length > counter; counter++) {
                elements = result[counter];
                pin = parseInt(elements.split("-")[0]);
                elements = elements.split("-")[1];
                //values
                name = document.getElementById("name" + pin);
                name = name.innerHTML;

                contentString = '<div id="content">' +
                    '<div id="siteNotice">' +
                    "</div>" +
                    '<h3 id="idValue' + pin + '" class="firstHeading"> ' + name + ":  " + elements.toString() + '</h3>' +
                    '<div id="bodyContent">' +
                    "</div>" +
                    "</div>";

                if (elements.toString().length > 3) {
                    var exponential;
                    var exponentialValue;
                    var acomulative;

                    exponentialValue = parseInt(elements).toString().length - 1;
                    exponential = 1;
                    for (var counterExp = 0; counterExp < parseInt(elements).toString().length - 1; counterExp++) {
                        exponential = exponential * 10;
                    }
                    elements = parseInt(elements) / exponential;

                    elements = Math.round(elements * 100) / 100;
                    acomulative = elements + " x10 <sup id='exponential_" + pin + "'>" + exponentialValue + "</sup>";
                    //elements on Label;

                    contentString = '<div id="content">' +
                        '<div id="siteNotice">' +
                        "</div>" +
                        '<h3 id="idValue' + pin + '" class="firstHeading"> ' + name + ":  " + acomulative + '</h3>' +
                        '<div id="bodyContent">' +
                        "</div>" +
                        "</div>";
                }

                elements = elements.toString();
                var label = {
                    text: elements
                };

                markerList.get(pin).setLabel(label);
                infoWindowList.get(pin).setContent(contentString);
            }
        }
    });
}

function CheckSupValueMaps(array) {
    for (var counter = 0; array.length > counter; counter++) {
        lowerSupValue(array[counter].split("-")[0]);
    }
}

function lowerSupValue(pin) {
    setTimeout(function () {
        var expo = document.getElementById("exponential_" + pin);
        if (expo != undefined || expo != null) {
            expo.style.top = "0.5em";
        }
    }, 500);

}

function returnKeyMap(value, key, map) {
    return key;
}

function ChangeTimeValue(time) {
    var timer = document.getElementById("timeIdValue");
    timer.value = time;
}

function changeToggleTitle(time) {
    let toggle = document.getElementById("sliderMapToggle");
    time == "realTime" ? toggle.title = "Tempo Real" : toggle.title = "Eventos";
}

function getTimerMap() {
    var timer = document.getElementById("timeIdValue").value;
    return timer;
}


function ClearMap(value, key, map) {
    map.get(parseInt(key)).setMap(null);
}

function ChangeSideBarLeftMap() {
    var sidebar = document.getElementById("asideBar");
    sidebar.style.height = "93vh";
}

function addHiddenAlarmNews(elementName, elementId) {
    inputNewDivNewsBar(elementId, elementName);

}

function inputNewDivNewsBar(elementId, name) {

    function putZero(i) {
        if (i < 10) { i = "0" + i }
        return i;
    }

    let today = new Date();
    let hour = putZero(today.getHours());
    let minutes = putZero(today.getMinutes());
    let seconds = putZero(today.getSeconds());

    let divElement = document.getElementById(`${elementId}divNew`);
    let divNewsbar = document.getElementById("newsDiv");

    if (!!divElement) {
        let statusAlarm = document.getElementById(`newsTimer${elementId}`).checked;

        let endingP = document.getElementById(`ending${elementId}`);
        endingP.innerHTML = ` ${hour}:${minutes}:${seconds} |`;

        if (!statusAlarm) {
            let beggining = document.getElementById(`begging${elementId}`);
            beggining.innerHTML = ` ${hour}:${minutes}:${seconds} -`;
        }
    }
    else {
        divElement = document.createElement("div");
        divElement.id = `${elementId}divNew`;
        divNewsbar.appendChild(divElement);

        let nameP = document.createElement("p");
        nameP.innerHTML = "| " + name;
        divElement.appendChild(nameP);

        let begginngP = document.createElement("p");
        begginngP.title = `Primeiro alarme`;
        begginngP.id = `begging${elementId}`;
        begginngP.innerHTML = ` ${hour}:${minutes}:${seconds} —`;
        divElement.appendChild(begginngP);

        let endingP = document.createElement("p");
        endingP.title = `Último alarme`;
        endingP.id = `ending${elementId}`
        endingP.innerHTML = ` ${hour}:${minutes}:${seconds} |`;
        divElement.appendChild(endingP);

        let timer = document.createElement("input");
        timer.id = `newsTimer${elementId}`;
        timer.type = "checkbox";
        timer.checked = true;
        timer.hidden = true;
        divElement.appendChild(timer);
    }
    adjustTransformNew(divNewsbar);
}

function deleteNews() {
    let divNewsbar = document.getElementById("newsDiv");
    while (divNewsbar.firstChild) {
        divNewsbar.removeChild(divNewsbar.firstChild);
    }
}

function adjustTransformNew(divNews) {
    let stringSize = divNews.innerHTML.length;
    let sizeDividor = stringSize / 300;

    if (sizeDividor > 1) {
        sizeDividor = parseInt(sizeDividor);
    }
    else {
        sizeDividor = 1;
    }

    sizeDividor = 20 + sizeDividor;
    sizeDividor++;

    //max = 128;
    //transition = 15;
}


function showAllElementsHTMLMap() {
    let sidebar = document.getElementById("menu");
    sidebar.style.display = "block";
    let upbar = document.getElementById("topMenu");
    upbar.style.display = "flex";
    let titleBar = document.getElementById("MainDiv");
    titleBar.style.display = "block";
    let body = document.getElementById("body");
    body.style.marginLeft = sidebar.offsetWidth + "px";
}

function changeMapOption(value) {
    console.log(`value is == ${value}`);
}

const mapSlider = document.querySelector("#mapSlider");

if (!!mapSlider) {

    mapSlider.addEventListener("click", () => {
        const mapSliderValue = mapSlider.checked;
        let state = "events";

        if (mapSliderValue == true) {
            state = "events";
        }
        else {
            state = "realTime";
        }

        ChangeTimeValueMap(state);
        setTimeout(function () {
            alterMapLayerMenu(0, false);
        }, 400);
    });
}

function changeLabelStatusMap(elementId, value) {
    let label = document.getElementById(`labelStatus${elementId}`);
    if (value != 0) {
        label.innerHTML = "false";
    }
    else {
        label.innerHTML = "true";
    }
}

function ChangeAlarmValueMap(element, value = false) {
    let alarmValue = document.getElementById("alarmTimer" + element);

    if (value == "True") {
        alarmValue.checked = true;
    }
    else {
        alarmValue.checked = false;
    }

    changeNewsTimerValue(element, value);
}

function changeNewsTimerValue(element, value = false) {
    let alarmValue = document.getElementById(`newsTimer${element}`);

    if (!!alarmValue) {
        if (value == "True") {
            alarmValue.checked = true;
        }
        else {
            alarmValue.checked = false;
        }
    }
}



//change when new value comes;