let myHistoryMap = new Map();
let slidersMap = new Map();
let searchBoolean = true;
let mywindow;

// take the element of History entry
//get Modules
//Get Variable
//Create Graphs - History Graph

function ProcessBeggining() {
    var now = new Date();

    var startDay = document.getElementById("initialDay").value;
    if (startDay == "") {
        //get Current day
        startDay = now.getDate();
        document.getElementById("initialDay").value = startDay;
    }
    var startMonth = document.getElementById("initialMonth").value;
    if (startMonth == "" || startMonth == -1) {
        //get Current Month
        startMonth = now.getMonth();
        if (startMonth < 10) {
            startMonth = "0" + startMonth;
            document.getElementById("initialMonth").value = startMonth;
        }
    }
    var startYear = document.getElementById("initialYear").value;
    if (startYear == "" || startYear == "Ano") {
        //get Current Year
        startYear = now.getFullYear();
        document.getElementById("initialYear").value = startYear;
    }
    var startHour = document.getElementById("initialHour").value;
    if (startHour == "") {
        startHour = 0;
        document.getElementById("initialHour").value = startHour;
    }
    var startMinute = document.getElementById("initialMinute").value;
    if (startMinute == "") {
        startMinute = 0;
        document.getElementById("initialMinute").value = startMinute;
    }
    var startSecond = document.getElementById("initialSecond").value;
    if (startSecond == "") {
        startSecond = 0;
        document.getElementById("initialSecond").value = startSecond;
    }

    if (startHour.length == 1) {
        startHour = "0" + startHour;
    }
    if (startMinute.length == 1) {
        startMinute = "0" + startMinute;
    }
    if (startSecond.length == 1) {
        startSecond = "0" + startSecond;
    }
    var startDate = new Date(startYear, startMonth, startDay, startHour, startMinute, startSecond, 0);

    if (startDate == 'Invalid Date') {
        startDate = "";
    }
    return startDate;
}

function ProcessEnding() {
    var now = new Date();

    var endDay = document.getElementById("endDay").value;
    if (endDay == "") {
        endDay = now.getDate();
        document.getElementById("endDay").value = endDay;
    }
    var endMonth = document.getElementById("endMonth").value;
    if (endMonth == "" || endMonth == -1) {
        endMonth = now.getMonth();
        if (endMonth < 10) {
            endMonth = "0" + endMonth;
            document.getElementById("endMonth").value = endMonth;
        }
    }
    var endYear = document.getElementById("endYear").value;
    if (endYear == "" || endYear == "Ano") {
        endYear = now.getFullYear();
        document.getElementById("endYear").value = endYear;
    }
    var endHour = document.getElementById("endHour").value;
    if (endHour == "") {
        endHour = now.getHours();
        document.getElementById("endHour").value = endHour;
    }
    var endMinute = document.getElementById("endMinute").value;
    if (endMinute == "") {
        endMinute = now.getMinutes();
        document.getElementById("endMinute").value = endMinute;
    }
    var endSeconds = document.getElementById("endSeconds").value;
    if (endSeconds == "") {
        endSeconds = now.getSeconds();
        document.getElementById("endSeconds").value = endSeconds;
    }
    if (endHour.length == 1) {
        endHour = "0" + endHour;
    }
    if (endMinute.length == 1) {
        endMinute = "0" + endMinute;
    }
    if (endSeconds.length == 1) {
        endSeconds = "0" + endSeconds;
    }

    var endDate = new Date(endYear, endMonth, endDay, endHour, endMinute, endSeconds, 0);
    if (endDate == 'Invalid Date') {
        endDate = "";
    }

    return endDate;
}

function processGraphXAxis(date) {

    d = new Date(date);
    var month
    var day
    var hour
    var minute
    var second

    day = d.getDate();
    if (day < 10) {
        day = "0" + day;
    }

    month = d.getMonth() + 1
    if (month < 10) {
        month = "0" + month;
    }

    hour = d.getHours();
    if (hour < 10) {
        hour = "0" + hour;
    }

    minute = d.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }

    second = d.getSeconds();
    if (second < 10) {
        second = "0" + second;
    }

    return day + '/' + month + '/' + d.getFullYear() + " " +
        hour + ":" + minute + ":" + second;
}


function processLocalDate(valueDate) {

    var time = valueDate.split("T")[0];
    var year = time.split("-")[0];
    var month = time.split("-")[1];
    month = parseInt(month) - 1;
    var day = time.split("-")[2];
    time = valueDate.split("T")[1];
    var hour = time.split(":")[0];
    var minute = time.split(":")[1];

    var time = new Date(parseInt(year), parseInt(month), parseInt(day), parseInt(hour), parseInt(minute), 0);
    time = time.toLocaleString('pt-bB');

    return time
}


function createSliderLocalHistory(ids) {

    var name = "#slider-container" + ids;

    //var initialDateHistory = document.getElementById("initialDateHistory").value;
    var initialDateHistory = ProcessBeggining();
    if (initialDateHistory != "") {
        initialDateHistory = initialDateHistory.toISOString();
    }
    initialDateHistory = Date.parse(initialDateHistory);

    /*var finalDateHistory = document.getElementById("finalDateHistory").value;*/
    var finalDateHistory = ProcessEnding();
    if (finalDateHistory != "") {
        finalDateHistory = finalDateHistory.toISOString();
    }
    finalDateHistory = Date.parse(finalDateHistory);

    //var totalTime = (finalDateHistory - initialDateHistory) / 1000 / 60 / 60 / 24;

    d3.select(name).call(d3.slider().min(0).max(100).step(1).value([0, 100]).on("slide", function (evt, value) {
        if (searchBoolean) {
            searchBoolean = false;
            mainSliderTimer(ids);
        }
        inputNewBeggin(value[0], ids);
        inputNewEnd(value[1], ids);
    }));

    inputNewBeggin(0, ids);
    inputNewEnd(100, ids);
}

function inputNewEnd(value, ids) {
    //input New "title"
    var slider_container = document.getElementById("slider-container" + ids);
    var handle_two = slider_container.getElementsByClassName("d3-slider-handle");

    //input New "title"
    var beggining = document.getElementById("localBeggining" + ids).value;
    beggining.pattern = "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}";
    beggining = Date.parse(beggining);

    var endDate = document.getElementById("localEnding" + ids).value;
    endDate = Date.parse(endDate);

    var total = endDate - beggining;

    var percentageToBeAdd = total / 100;
    var totalToBeAdded = value * percentageToBeAdd;

    var ticks = beggining + totalToBeAdded;

    var finalDate = new Date(ticks);
    var newYear = finalDate.getFullYear();
    var newMonth = finalDate.getMonth();
    newMonth++;
    if (newMonth < 10) {
        newMonth = "0" + newMonth;
    }
    var newDay = finalDate.getDate();
    if (newDay < 10) {
        newDay = "0" + newDay;
    }
    //Get hour and Minutes of final Date
    var newHour = finalDate.getHours();
    if (newHour < 10) {
        newHour = "0" + newHour;
    }
    var newMinute = finalDate.getMinutes();

    if (newMinute < 10) {
        newMinute = "0" + newMinute;
    }
    var finalDateString = newYear + "-" + newMonth + "-" + newDay + "T" + newHour + ":" + newMinute;

    var barFinal = document.getElementById("barFinalLocal" + ids);
    barFinal.value = finalDateString;
    barFinal.setAttribute("value", finalDateString);

    finalDateString = newDay + "/" + newMonth + "/" + newYear + "-" + newHour + ":" + newMinute;
    //input New "title"
    handle_two[1].title = finalDateString;

}

function inputNewBeggin(value, ids) {
    //input New "title"    

    var slider_container = document.getElementById("slider-container" + ids);
    var handle_two = slider_container.getElementsByClassName("d3-slider-handle");

    var beggining = document.getElementById("localBeggining" + ids).value;
    beggining = Date.parse(beggining);

    var endDate = document.getElementById("localEnding" + ids).value;
    endDate = Date.parse(endDate);

    var total = endDate - beggining;

    var percentageToBeAdd = total / 100;
    var totalToBeAdded = value * percentageToBeAdd;

    var ticks = beggining + totalToBeAdded;

    var newDate = new Date(ticks);

    var newYear = newDate.getFullYear();
    var newMonth = newDate.getMonth();
    newMonth++;
    if (newMonth < 10) {
        newMonth = "0" + newMonth;
    }
    var newDay = newDate.getDate();
    if (newDay < 10) {
        newDay = "0" + newDay;
    }
    var newHour = newDate.getHours();
    if (newHour < 10) {
        newHour = "0" + newHour;
    }
    var newMinute = newDate.getMinutes();
    if (newMinute < 10) {
        newMinute = "0" + newMinute;
    }

    var finalDateString = newYear + "-" + newMonth + "-" + newDay + "T" + newHour + ":" + newMinute;
    var barInitial = document.getElementById("barInitialLocal" + ids);
    barInitial.pattern = "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}";
    barInitial.value = finalDateString;
    barInitial.setAttribute("value", finalDateString);
    finalDateString = newDay + "/" + newMonth + "/" + newYear + "-" + newHour + ":" + newMinute;
    //input New "title"
    handle_two[0].title = finalDateString;
}

function GetDataForDivhistory() {

    var bool = true;
    var titleName = document.getElementById("graphicName").value;

    //any Date at it
    //check if theres range of Dates

    var datesBeginning;
    var datesEnding;

    var datesBeginning2 = ProcessBeggining();
    if (datesBeginning2 != "") {
        datesBeginning2 = datesBeginning2.toLocaleString('pt-bB');
    }

    var datesEnding2 = ProcessEnding();
    if (datesEnding2 != "") {
        datesEnding2 = datesEnding2.toLocaleString('pt-bB');
    }

    datesEnding = datesEnding2;
    datesBeginning = datesBeginning2;

    var graphicType = document.getElementById("graphicType").selectedIndex; //get Variables Ids And Names
    graphicType = document.getElementById("graphicType")[graphicType].innerText;


    var variables = document.getElementById("listOfSelectedComponents");
    var listOfVariables = '';
    var listOfNames = '';
    var listOfComponents = '';
    for (var components = 0; components < variables.childNodes.length; components++) {
        if (variables.childNodes[components].nodeName != "#text") {
            listOfVariables = listOfVariables + variables.childNodes[components].childNodes[1].id.split("_")[1] + ";";
            listOfNames = listOfNames + variables.childNodes[components].childNodes[1].textContent + ";";
            listOfComponents = listOfComponents + variables.childNodes[components].id + ";";
        }
    }

    if (titleName == "") {
        titleName = "Gráfico " + listOfNames;
    }

    //get name for checking
    var finalName = graphicType + "_" + listOfNames;
    var map = myHistoryMap.get(finalName);

    //check Dates
    if (datesBeginning == "") {
        alert("Selecione um início válido");
        bool = false;
    }
    if (datesEnding == "") {
        alert("Selecione um final válido");
        bool = false;
    }
    if (listOfVariables == '') {
        alert("Selecione alguma variável");
        bool = false;
    }
    if (map != undefined) {
        alert("Componentes já formam um gráfico do tipo selecionado");
        bool = false;
    }

    if (bool) {
        if (graphicType == "Gráfico de Linha") {

            $.ajax({
                type: "GET",
                url: "/HistoryShow/GetAbsoluteHistoryValuesResult",
                data: { listOfVariables: listOfVariables, listOfNames: listOfNames, graphicType: graphicType, datesBeginning: datesBeginning, datesEnding: datesEnding, listOfComponents: listOfComponents },
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                complete: function (msg) {
                    // responseJSON = return [ArrayPoints,Min,Max];
                    var data = processingData(msg.responseJSON.value[0]);
                    var min = msg.responseJSON.value[1];
                    var max = msg.responseJSON.value[2];

                    if (data.length == 0) {
                        data = "nulo";
                    }
                    GenerateDivContainer(titleName, data, listOfVariables, listOfNames, graphicType, datesBeginning, datesEnding, listOfComponents, max, min);

                    var pdfGenerator = document.getElementById("pfdGenerator")
                    pdfGenerator.style.display = "block";
                }
            });
        }
        else if (graphicType == "Gráfico de Barras") {
            $.ajax({
                type: "GET",
                url: "/HistoryShow/GetAverageHistoryValues",
                data: { listOfVariables: listOfVariables, listOfNames: listOfNames, graphicType: graphicType, datesBeginning: datesBeginning, datesEnding: datesEnding, listOfComponents: listOfComponents },
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                complete: function (msg) {
                    //var data = msg.responseJSON.value;

                    var data = msg.responseJSON.value[0];
                    var min = parseFloat(msg.responseJSON.value[1]);
                    var max = parseFloat(msg.responseJSON.value[2]);

                    if (data != undefined) {
                        data = processingDataAverage(msg.responseJSON.value[0]);
                    }
                    else {
                        data = "nulo";
                    }
                    var pdfGenerator = document.getElementById("pfdGenerator")
                    pdfGenerator.style.display = "block";

                    GenerateDivContainer(titleName, data, listOfVariables, listOfNames, graphicType, datesBeginning, datesEnding, listOfComponents, max, min);
                }
            });
        }
    }
    //return MEDIA, return points for graph, return MAX and MIN of Range and Acomulado
    //input names, type of Graphic, values of possible Range, variables Ids,     
}

function GenerateDivContainer(titleName, data, listOfVariables, listOfNames, graphicType, datesBeggining, datesEnding, listOfComponents, max, min) {

    var sideDiv = document.getElementById("graphics");
    sideDiv.classList.add("mainDivHistoryGraphics");

    var sideDiv = getHistoryDiv();
    //check if mainDiv has DIV sons, Create Div sons if Last Div Sons has 2 Sons
    //Div Son set on "display: flex";

    var divContainer = document.createElement("div");
    divContainer.classList.add("historyContainerDiv");
    sideDiv.appendChild(divContainer);

    var table = document.createElement("table");
    table.classList.add("historyContainerTable");
    divContainer.appendChild(table);

    var rowTitle = document.createElement("tr");
    rowTitle.classList.add("historyTitle");
    table.appendChild(rowTitle);

    var tdTitle = document.createElement("td");
    tdTitle.innerHTML = titleName;
    tdTitle.colSpan = "5";
    tdTitle.classList.add("titleTableGraphHistory");
    rowTitle.appendChild(tdTitle);
    rowTitle.id = listOfVariables + "_" + graphicType;

    var listVariable = document.createElement("span");
    listVariable.innerHTML = listOfVariables;
    listVariable.id = "variableForGraph";
    listVariable.classList.add("nameAndVariablesForGraph");
    rowTitle.appendChild(listVariable);

    var listNames = document.createElement("span");
    listNames.innerHTML = listOfNames;
    listNames.id = "namesForGraph";
    listNames.classList.add("nameAndVariablesForGraph");
    rowTitle.appendChild(listNames);

    var typeName = document.createElement("span");
    typeName.innerHTML = graphicType;
    typeName.classList.add("nameAndVariablesForGraph");
    rowTitle.appendChild(typeName);

    var listOfComponetsSpam = document.createElement("span");
    listOfComponetsSpam.innerHTML = listOfComponents;
    listOfComponetsSpam.id = "listOfComponenents";
    listOfComponetsSpam.classList.add("nameAndVariablesForGraph");
    rowTitle.appendChild(listOfComponetsSpam);

    var row1 = document.createElement("tr");
    row1.classList.add("componentsHistory");
    table.appendChild(row1);

    var td1 = document.createElement("td");
    row1.appendChild(td1);
    var td2 = document.createElement("td");
    row1.appendChild(td2);

    var td3 = document.createElement("td");
    row1.appendChild(td3);

    //var td4 = document.createElement("td");
    //row1.appendChild(td4);
    var bDelete = document.createElement("button");
    bDelete.onclick = function () { showDeleteHistoryWindown(this) };
    bDelete.className = "historyIcon fas fa-trash";
    bDelete.title = "Remover Gráfico";
    row1.appendChild(bDelete);
    td2.appendChild(bDelete);

    var listHistory = document.createElement("button");
    listHistory.onclick = function () { ShowCard(this) };
    listHistory.className = "historyIcon fas fa-list";
    listHistory.title = "Lista de Valores";
    row1.appendChild(listHistory);
    td1.appendChild(listHistory);

    var listHistoryReset = document.createElement("button");
    listHistoryReset.className = "historyIcon fas fa-undo";
    listHistoryReset.title = "Retornar aos limites originais";
    row1.appendChild(listHistoryReset);
    td3.appendChild(listHistoryReset);

    var i1 = document.createElement("p");
    td1.appendChild(i1);

    var fieldData = document.createElement("div");
    fieldData.classList.add("mainDivhistoryData");
    divContainer.appendChild(fieldData);

    //Eixo Y - Slider E Range colocadas a "Força"
    var divYAxis = document.createElement("div");
    divYAxis.id = "divYaxis";
    divYAxis.classList.add("historyDivYaxis");
    fieldData.appendChild(divYAxis);

    var axisYmax = document.createElement("div");
    axisYmax.classList.add("historyYMaxValue");
    divYAxis.appendChild(axisYmax);
    var axisYmaxValue = document.createElement("label");
    axisYmaxValue.value = max;
    axisYmaxValue.innerHTML = max;
    axisYmax.appendChild(axisYmaxValue);

    //divSliderY
    var divSliderY = document.createElement("div");
    divYAxis.appendChild(divSliderY);

    var sliderY = document.createElement("div");
    divSliderY.appendChild(sliderY);


    //divsliderYContinuation
    var axisYmin = document.createElement("div");
    axisYmin.classList.add("historyYMinValue");
    divYAxis.appendChild(axisYmin);
    var axisYminValue = document.createElement("label");
    axisYminValue.value = min;
    axisYminValue.innerHTML = min;
    axisYmin.appendChild(axisYminValue);

    var axis75 = document.createElement("div");
    axis75.classList.add("historyYaxisTop");
    divYAxis.appendChild(axis75);
    var axis75Value = document.createElement("label");
    axis75Value.value = ((max - min) * 0.75) + min;
    axis75Value.innerHTML = ((max - min) * 0.75) + min;
    axis75.appendChild(axis75Value);

    var axis50 = document.createElement("div");
    axis50.classList.add("historyYaxisMiddle");
    divYAxis.appendChild(axis50);
    var axis50Value = document.createElement("label");
    axis50Value.value = ((max - min) * 0.5) + min;
    axis50Value.innerHTML = ((max - min) * 0.5) + min;
    axis50.appendChild(axis50Value);

    var axis25 = document.createElement("div");
    axis25.classList.add("historyYaxisBottom");
    divYAxis.appendChild(axis25);
    var axis25Value = document.createElement("label");
    axis25Value.value = ((max - min) * 0.25) + min;
    axis25Value.innerHTML = ((max - min) * 0.25) + min;
    axis25.appendChild(axis25Value);

    //comeco do grafico
    var divGraph = document.createElement("div");
    divGraph.classList.add("tdHistoryGraphCanvas");
    fieldData.appendChild(divGraph);

    var iconImage = document.createElement("div");
    iconImage.style.display = "none";
    iconImage.classList.add("iconHistoryWindown");
    divGraph.appendChild(iconImage);

    var icon = document.createElement("img");
    icon.classList.add("iconHistoryGraph");
    iconImage.appendChild(icon);
    icon.src = "/Images/onda_nova.gif";

    if (data == "nulo") {
        var warning = document.createElement("p");
        warning.classList.add("WarningGraphZero");
        warning.innerText = "Intervalo não possui dados";
        divGraph.appendChild(warning);
    }
    else {
        GenerateGraph(divGraph, data, graphicType, listOfNames, min, max);
    }

    //getOnlyVariableAndTypeNameForId - slider-container14151912type
    var Gtype = graphicType.split(" ")[2];
    var finalVariablesId = listOfVariables.replace(/;/g, "");
    finalVariablesId = finalVariablesId + Gtype;

    //create div for Slider
    var divSlider = document.createElement("div");
    divSlider.classList.add("sliderDiv");
    divContainer.appendChild(divSlider);

    //----------------------------Dates-----------------------//
    /*var mainDatesBeginning = document.getElementById("initialDateHistory").value;*/
    var mainDatesBeginning = ProcessBeggining();
    if (mainDatesBeginning != "") {
        mainDatesBeginning = mainDatesBeginning.toISOString();
    }
    mainDatesBeginning = mainDatesBeginning.split("T").join(" ");

    /*var mainDatesEnding = document.getElementById("finalDateHistory").value;*/
    var mainDatesEnding = ProcessEnding();
    if (mainDatesEnding != "") {
        mainDatesEnding = mainDatesEnding.toISOString();
    }
    mainDatesEnding = mainDatesEnding.split("T").join(" ");

    var divMainDateBeggining = document.createElement("div");
    divMainDateBeggining.classList.add("divDateInputLocalLeft");
    divSlider.appendChild(divMainDateBeggining);

    var divMainDateEnding = document.createElement("div");
    divMainDateEnding.classList.add("divDateInputLocalRight");
    divSlider.appendChild(divMainDateEnding);

    var textInputBegging = document.createElement("p");
    textInputBegging.id = "localBeggining" + finalVariablesId;
    textInputBegging.title = "Período de inicio";
    textInputBegging.value = mainDatesBeginning;
    textInputBegging.innerHTML = new Date(mainDatesBeginning).toLocaleString('pt-BR');
    textInputBegging.readOnly = true;
    divMainDateBeggining.appendChild(textInputBegging);

    var textInputEnding = document.createElement("p");
    textInputEnding.value = mainDatesEnding;
    textInputEnding.id = "localEnding" + finalVariablesId;
    textInputEnding.title = "Período de fim";
    textInputEnding.readOnly = true;
    textInputEnding.innerHTML = new Date(mainDatesEnding).toLocaleString('pt-BR');

    divMainDateEnding.appendChild(textInputEnding);
    //----------------------------Dates-----------------------//
    var divParentSliderContainer = document.createElement("div");
    divParentSliderContainer.classList.add("parent-slider-container");
    divSlider.appendChild(divParentSliderContainer);

    var divSliderContainer = document.createElement("div");
    divSliderContainer.classList.add("parent-slider-container");
    divSliderContainer.classList.add("localSliderDiv");
    divSliderContainer.id = "slider-container" + finalVariablesId;
    divParentSliderContainer.appendChild(divSliderContainer);

    var dateContainerSlider = document.createElement("div");
    dateContainerSlider.classList.add("DateSlider");
    dateContainerSlider.id = "dateSliderSub" + finalVariablesId;
    //dateContainerSlider.innerHTML = "0 - 10";
    dateContainerSlider.style.textAlign = "center";

    divSlider.appendChild(dateContainerSlider);
    //put new Div for Slider;

    var divInputs = document.createElement("div")
    divInputs.classList.add("dateLocalStyle")
    divSlider.appendChild(divInputs);

    var inputBeggining = document.createElement("input");
    inputBeggining.type = "datetime-local";
    inputBeggining.pattern = "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}";
    inputBeggining.classList.add("inputSelectedDateLocal");
    inputBeggining.style.marginLeft = "5px";
    inputBeggining.id = "barInitialLocal" + finalVariablesId;
    inputBeggining.readOnly = true;
    divInputs.appendChild(inputBeggining);

    var inputEnding = document.createElement("input");
    inputEnding.type = "datetime-local";
    inputEnding.pattern = "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}";
    inputEnding.id = "barFinalLocal" + finalVariablesId;
    inputEnding.readOnly = true;
    inputEnding.classList.add("inputSelectedDateLocal");
    inputEnding.style.marginRight = "5px";
    divInputs.appendChild(inputEnding);

    //create slider Y; set Ids
    divSliderY.id = "barYAxis" + finalVariablesId;
    divSliderY.style.height = "230px";
    axisYminValue.id = "yMinValue" + finalVariablesId;
    axisYmaxValue.id = "yMaxValue" + finalVariablesId;
    axis75Value.id = "75Value" + finalVariablesId;
    axis50Value.id = "50Value" + finalVariablesId;
    axis25Value.id = "25Value" + finalVariablesId;
    divGraph.id = "divGraph" + finalVariablesId;
    iconImage.id = "graphIcon" + finalVariablesId;

    createSliderLocalHistory(finalVariablesId);
    createSliderY(finalVariablesId, min, max);

    var divSpreadSheet = document.createElement("div");
    fieldData.appendChild(divSpreadSheet);
    divSpreadSheet.id = "spreadSheet";
    divSpreadSheet.classList.add("spreadSheet");

    listHistoryReset.onclick = function () { resetParametersHistory(finalVariablesId) };

    ////scroll na altura do ultimo card
    //window.scrollTo(0, document.body.offsetHeight);

    window.scrollTo(0, (divSpreadSheet.getBoundingClientRect().top - (table.offsetHeight + 30)));

    $.ajax({
        type: "GET",
        url: "/HistoryShow/GetValuesOfVariant",
        data: { listOfVariables: listOfVariables, listOfNames: listOfNames, datesBeggining: datesBeggining, datesEnding: datesEnding, listOfComponents: listOfComponents },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            CreateRowHistory(msg.responseJSON, divSpreadSheet);
        }
    });
    HistoryBreak(sideDiv.parentElement);
}

function getHistoryDiv() {

    var mainDiv = document.getElementById("graphics");
    var divsFromMain = mainDiv.childNodes;

    //try and check if each of the Divs has a Son, if it has a son, check if has 2 and return a grandson after it being created;
    if (divsFromMain.length == 1) {
        //create first DIV        
        var sonDiv = document.createElement("div");
        sonDiv.classList.add("sonDivHistory");
        mainDiv.appendChild(sonDiv);

        var grandSonDiv = document.createElement("div");
        grandSonDiv.classList.add("grandSonDivHistory");
        sonDiv.appendChild(grandSonDiv);

        return grandSonDiv;
    }
    else {
        for (var counterDiv = 1; counterDiv < divsFromMain.length; counterDiv++) {
            if (divsFromMain[counterDiv].className != "historyBreak") {

                if (divsFromMain[counterDiv].childNodes.length == 1) {
                    var grandSonDiv = document.createElement("div");
                    grandSonDiv.classList.add("grandSonDivHistory");
                    divsFromMain[counterDiv].appendChild(grandSonDiv);
                    return grandSonDiv;
                }
            }
            else if (counterDiv == divsFromMain.length - 1) {
                //else if (divsFromMain[counterDiv].childNodes.length == 2) {
                var sonDiv = document.createElement("div");
                sonDiv.classList.add("sonDivHistory");
                mainDiv.appendChild(sonDiv);

                var grandSonDiv = document.createElement("div");
                grandSonDiv.classList.add("grandSonDivHistory");
                sonDiv.appendChild(grandSonDiv);

                return grandSonDiv;
            }

        }
    }
    return grandSonDiv;
}

function ExpandCollapseComponentNames(tableId, element) {

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

    for (var counter = 0; counter < tableElement.childNodes.length; counter++) {
        var element = tableElement.childNodes[counter];

        if (element.tagName == "TR") {
            if (element.className == "historyRowComponents" || element.className == "historyRowComponentsSelected") {

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

function HistoryBreak(div) {
    if (div.children.length >= 2) {
        var divSon = document.createElement("div");
        divSon.classList.add("historyBreak");
        divSon.style.pageBreakAfter = "always";
        div.parentElement.appendChild(divSon);
    }
}

function transferVariableAllComponent(id) {
    //check all menber of said table and input them on transferVariableComponent
    var table = document.getElementById("panel_" + id);
    table = table.lastChild;

    for (var counter = 0; counter < table.children.length; counter++) {
        var element = table.children[counter].children[1];
        if (element != undefined) {
            if (element.childNodes[1] != undefined) {
                element = element.childNodes[1];
                transferVariableComponent(element);
            }
        }
    }
}

function processingData(data) {
    var arrayPoints = [];

    for (var counter = 0; data.length > counter; counter++) {
        //insere a row
        var point = new Object();
        point.Periodo = data[counter][0];

        for (var rowCounter = 1; data[counter].length - 1 >= rowCounter; rowCounter = rowCounter + 2) {
            point[data[counter][rowCounter]] = Math.round(parseFloat(data[counter][rowCounter + 1]) * 100) / 100;
        };
        arrayPoints.push(point);
    }

    return arrayPoints;
}

function processingDataAverage(data) {

    var arrayPoints = [];

    var point = new Object();
    point.Periodo = "periodo";

    for (var counter = 0; data.length - 1 > counter; counter = counter + 2) {
        point[data[counter + 1]] = parseFloat(data[counter]);
    }
    arrayPoints.push(point);

    return arrayPoints;
}

function GenerateGraph(canvas, data, type, listOfNames, min, max) {
    var names = listOfNames.split(";");
    var finalName = type + "_" + listOfNames;

    for (var count = 0; names.length > count; count++) {
    }

    if (type == "Gráfico de Linha") {

        var map = Morris.Line({
            element: canvas,
            data: data,
            xkey: 'Periodo',
            ykeys: names,
            labels: names,
            pointSize: "0px",
            pointSize: 0,
            grid: true,
            ymin: min,
            ymax: max,
            smooth: false,
            behaveLikeLine: true,
            resize: true,
            dateFormat: function (date) {
                return processGraphXAxis(date);
            },
            axes: false,
            hideHover: true
        });
        myHistoryMap.set(finalName, map);
    }
    else if (type == "Gráfico de Barras") {
        var map = Morris.Bar({
            element: canvas,
            data: data,
            xkey: 'Periodo',
            ykeys: names,
            labels: names,
            hideHover: true
        }).on('click', function (i, row) {
            console.log(i, row);
        })
    }
    myHistoryMap.set(finalName, map);
    //myHistoryMap.set(id, map);
}

function SearchLocalHistory(ids) {

    var minYAxis = document.getElementById("yMinValue" + ids).innerHTML;
    var maxYAxis = document.getElementById("yMaxValue" + ids).innerHTML;

    var bool = true;

    var datesBeginning = document.getElementById("barInitialLocal" + ids).value;
    var datesEnding = document.getElementById("barFinalLocal" + ids).value;;

    datesBeginning = processLocalDate(datesBeginning);
    datesEnding = processLocalDate(datesEnding);

    var mainElement = document.getElementById("barInitialLocal" + ids).parentElement.parentElement.parentElement;
    mainElement = mainElement.childNodes[0].childNodes[0];

    var listOfVariables = mainElement.childNodes[1].textContent;
    var listOfNames = mainElement.childNodes[2].textContent;
    var graphicType = mainElement.childNodes[3].textContent;
    var listOfComponents = mainElement.childNodes[4].textContent;

    var finalName = graphicType + "_" + listOfNames;

    if (datesBeginning == "") {
        alert("data de inicio invalida");
        bool = false;
    }
    if (datesEnding == "") {
        alert("data de final invalida");
        bool = false;
    }

    if (bool) {
        if (graphicType == "Gráfico de Linha") {
            $.ajax({
                type: "GET",
                url: "/HistoryShow/GetAbsoluteHistoryValuesForGraph",
                data: {
                    listOfVariables: listOfVariables, listOfNames: listOfNames, datesBeginning: datesBeginning,
                    datesEnding: datesEnding, listOfComponents: listOfComponents
                },
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                complete: function (msg) {
                    // responseJSON = return [ArrayPoints,Min,Max];
                    var data = processingData(msg.responseJSON[0]);

                    myHistoryMap.get(finalName).options.ymin = minYAxis;
                    myHistoryMap.get(finalName).options.ymax = maxYAxis;

                    myHistoryMap.get(finalName).setData(data);

                    hideLoadingGraph(ids);
                }
            });
        }
        else if (graphicType = "Gráfico de Barras") {
            $.ajax({
                type: "GET",
                url: "/HistoryShow/GetAverageHistoryValuesForGraph",
                data: {
                    listOfVariables: listOfVariables, listOfNames: listOfNames,
                    datesBeginningLocal: datesBeginning, datesEndingLocal: datesEnding,
                    listOfComponents: listOfComponents
                    //string listOfVariables, string listOfNames, string datesBeginningLocal, string datesEndingLocal
                },
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                complete: function (msg) {

                    var data = processingDataAverage(msg.responseJSON[0]);

                    myHistoryMap.get(finalName).setData(data);
                    hideLoadingGraph(ids);
                }
            });
        }
        RemakeSpreadSheet(listOfVariables, listOfNames, datesBeginning, datesEnding, listOfComponents, graphicType);
    }
    NewLimitsForYAxis(ids, minYAxis, maxYAxis);

}

function DeleteGraphDiv(element) {
    var mapName = element.parentElement.parentElement.parentElement.childNodes[0].childNodes[2].innerHTML;
    var typeName = element.parentElement.parentElement.parentElement.childNodes[0].childNodes[3].innerHTML;

    var fatherElement = element.parentElement.parentElement.parentElement.parentElement.parentElement;
    var grandfather = fatherElement.parentElement;
    var mainDivGraph = grandfather.parentElement;

    var index = -1;
    if (grandfather.childNodes.length == 1) {
        index = Array.prototype.indexOf.call(mainDivGraph.children, grandfather);
        grandfather.remove();
        if (mainDivGraph.children.length > 0) {
            mainDivGraph.removeChild(mainDivGraph.children[index]);
        }
    }
    else {
        fatherElement.remove();
    }

    var finalName = typeName + "_" + mapName;

    if (myHistoryMap.get(finalName) != undefined) {
        myHistoryMap.delete(finalName);
    }
    hideDeleteAlarmWindown();
}

function generatePdfPage() {

    var counter = 0;
    var graphicDivChildren = document.getElementById("graphics");

    var sliderDivElements = graphicDivChildren.getElementsByClassName("dateLocalStyle");

    var iconsDivElements = graphicDivChildren.getElementsByClassName("componentsHistory");
    for (counter = 0; counter < iconsDivElements.length; counter++) {
        iconsDivElements[counter].style.display = "none";
    }
    var labelBegginElement = graphicDivChildren.getElementsByClassName("divDateInputLocalLeft");
    for (counter = 0; counter < labelBegginElement.length; counter++) {
        labelBegginElement[counter].style.display = "flex";
    }
    var labelEndElement = graphicDivChildren.getElementsByClassName("divDateInputLocalRight");
    for (counter = 0; counter < labelEndElement.length; counter++) {
        labelEndElement[counter].style.display = "flex";
    }

    mywindow = window.open('', 'newWindow', 'height=650,width=900,top=100,left=150');
    mywindow.document.write('<html><head><title>Relatório</title>');

    mywindow.document.write(ReturnCssBars());
    mywindow.document.write('<style>');
    mywindow.document.write(ReturnCssGraphs());
    mywindow.document.write('</style>');
    mywindow.document.write('</head><body>');

    mywindow.document.write(document.getElementById("graphics").innerHTML);
    mywindow.document.write(returnJsBars());    

    mywindow.document.write('</body></html>');

    mywindow.focus(); // necessary for IE >= 10*/

    setTimeout(function () {
        mywindow.print();
        mywindow.close();
    }, 300);

    for (counter = 0; counter < sliderDivElements.length; counter++) {
        sliderDivElements[counter].style.display = "flex";
    }
    for (counter = 0; counter < iconsDivElements.length; counter++) {
        iconsDivElements[counter].style.display = "flex";
    }
    for (counter = 0; counter < labelBegginElement.length; counter++) {
        labelBegginElement[counter].style.display = "block";
    }
    for (counter = 0; counter < labelEndElement.length; counter++) {
        labelEndElement[counter].style.display = "block";
    }    
}

function CreateRowHistory(array, parentElement) {
    //add Row
    var row;
    var name;
    var date;
    var value;
    var unit;
    var dateNew = "";

    var table = document.createElement("table");
    table.style.display = "none";
    parentElement.appendChild(table);

    for (var counter = 0; array.length > counter; counter++) {
        row = array[counter];

        var rowNew = document.createElement("tr");
        table.appendChild(rowNew);

        name = row[0];
        value = Math.round(parseFloat(row[1]) * 100) / 100;
        date = row[2];
        unit = row[3];

        var nameTd = document.createElement("td");
        nameTd.innerHTML = name;
        rowNew.appendChild(nameTd);

        var valueTd = document.createElement("td");
        valueTd.innerHTML = value;
        rowNew.appendChild(valueTd);

        var unitTd = document.createElement("td");
        unitTd.innerHTML = unit;
        rowNew.appendChild(unitTd);

        var dateTd = document.createElement("td");
        dateTd.innerHTML = date;
        rowNew.appendChild(dateTd);
    }
}

function ShowCard(element) {
    var nameHistoryCard = document.getElementById("nameHistoryCard");
    clearNamesHistory(nameHistoryCard);

    var mainDiv = element.parentElement.parentElement.parentElement.parentElement.parentElement;
    var sons = mainDiv.getElementsByClassName("spreadSheet");
    sons = sons[0].childNodes[0];
    var tableCopy = sons.cloneNode(true);
    var mainTable = document.getElementById("mainSpreadSheetHistoryCard");
    var mainTableParent = mainTable.parentElement;

    /*delete table*/
    mainTableParent.removeChild(mainTable);
    var newTable = document.createElement("table");
    mainTableParent.appendChild(newTable);
    newTable.id = "mainSpreadSheetHistoryCard";
    newTable.style.display = "none";

    while (tableCopy.childNodes.length) {
        newTable.appendChild(tableCopy.firstChild);
    }

    var card = document.getElementById("mydivHistoryShow");
    card.style.display = "block";

    document.getElementById("historyCardPage").value = 1;
    TransferHistoryTable(1);

    if (mainTable.childNodes[0].nodeName == "#text") {
        InputCardNameValues(newTable);
    }
    else {
        InputCardNameValues(mainTable);
    }
}

function clearNamesHistory(selector) {
    while (selector.children.length > 0) {
        selector.removeChild(selector.children[0]);
    }
}

function TransferHistoryTable(value) {
    var localTable = document.getElementById("localSpreadSheetHistoryCard");

    ClearTableLocalHistory(localTable);
    InputRowHeaderHistoric(localTable);
    //delete  name HistoryCard    

    var mainTable = document.getElementById("mainSpreadSheetHistoryCard");
    //check for arrows
    var rightArrow = document.getElementById("historyCardNextArrow");
    var leftArrow = document.getElementById("historyCardPreviousArrow");

    if (value == 1) {
        leftArrow.style.display = "none";
    }
    else if (value > 1) {
        leftArrow.style.display = "block";
    }

    value = value * 1000;
    if (mainTable.childNodes.length >= value) {
        for (var counter = value - 1000; counter < value; counter++) {
            if (mainTable.childNodes[counter] != undefined) {
                var node = mainTable.childNodes[counter].cloneNode(true);
                localTable.appendChild(node);

                rightArrow.style.display = "block";
            }
        }
    }
    else {
        for (var counter = value - 1000; counter < mainTable.childNodes.length; counter++) {
            var node = mainTable.childNodes[counter].cloneNode(true);
            localTable.appendChild(node);

            rightArrow.style.display = "none";
        }
    }
}

function TransferHistoryTableFilter(pageValue) {
    var localTable = document.getElementById("localSpreadSheetHistoryCard");
    var counterLines = 0;
    var counterMax = parseInt(pageValue) * 1000;
    var counterMin = (parseInt(pageValue) * 1000) - 1000;

    //delete after
    var totalLines = 0;

    ClearTableLocalHistory(localTable);
    InputRowHeaderHistoric(localTable);

    var mainTable = document.getElementById("mainSpreadSheetHistoryCard");
    var historyCardPage = document.getElementById("historyCardPage");
    historyCardPage = historyCardPage.value;
    historyCardPage = parseInt(historyCardPage);

    var boolName = false;
    var boolCondition = false;
    var finalBool = true;

    var filterName = document.getElementById("nameHistoryCard").value;
    var condition = document.getElementById("valueContidionHistoryCard");
    condition = condition[condition.selectedIndex].value;
    var filterContidionValue = document.getElementById("valueHistoryCard").value;

    if (filterName != "none") {
        boolName = true;
    }
    if (condition != "none") {
        if (filterContidionValue != "") {
            boolCondition = true;
        }
    }

    for (var counterNodes = 0; mainTable.childNodes.length > counterNodes; counterNodes++) {
        finalBool = true;
        finalBool = checkRowHistory(mainTable.childNodes[counterNodes], filterName, condition, filterContidionValue, boolName, boolCondition);

        if (finalBool) {
            counterLines++;

            if (counterLines <= counterMax && counterLines > counterMin) {
                var node = mainTable.childNodes[counterNodes].cloneNode(true);
                localTable.appendChild(node);
                totalLines++;
            }
        }
    }
    //hide right arrow
    if (totalLines < 1000) {
        document.getElementById("historyCardNextArrow").style.display = "none";
    }
}

function checkRowHistory(row, filterName, condition, filterValue, boolName, boolCondition) {
    var finalBool = true;

    value1 = row.childNodes[0].childNodes[0].nodeValue;
    if (boolName) {
        if (value1 != filterName) {
            finalBool = false;
            return finalBool;
        }
    }
    value2 = parseFloat(row.childNodes[1].childNodes[0].nodeValue);
    if (boolCondition) {
        switch (condition) {
            case "maior":
                if (value2 < filterValue) {
                    finalBool = false;
                    return finalBool;
                }
                break;
            case "menor":
                if (value2 > filterValue) {
                    finalBool = false;
                    return finalBool;
                }
                break;
            default:
                if (value2 != filterValue) {
                    finalBool = false;
                    return finalBool;
                }
        }
    }
    value3 = row.childNodes[2].childNodes[0].nodeValue;
    value4 = row.childNodes[3].childNodes[0].nodeValue;

    return finalBool;
}

function historyCardNextPage() {
    var pageValue = parseInt(document.getElementById("historyCardPage").value);
    pageValue++;
    document.getElementById("historyCardPage").value = pageValue;

    var leftArrow = document.getElementById("historyCardPreviousArrow");
    leftArrow.style.display = "block";

    TransferHistoryTableFilter(pageValue);
}

function historyCardPreviousPage() {
    var pageValue = parseInt(document.getElementById("historyCardPage").value);
    pageValue--;
    document.getElementById("historyCardPage").value = pageValue;

    if (pageValue == 1) {
        document.getElementById("historyCardPreviousArrow").style.display = "none";
    }
    var rightArrow = document.getElementById("historyCardNextArrow");
    rightArrow.style.display = "block";

    TransferHistoryTableFilter(pageValue);
}

function DeleteHistoryCard() {
    var cardHistory = document.getElementById("mydivHistoryShow");
    cardHistory.style.display = "none";

    deleteCardNames();
}

function deleteCardNames() {
    var nameDiv = document.getElementById("nameHistoryCard");

    while (nameDiv.childNodes.length > 1) {
        nameDiv.childNodes[1].remove();
    }
}

function InputCardNameValues(table) {
    var names = [];
    var name = "";

    var optionNone = document.createElement("option");
    optionNone.innerHTML = "Componente";
    optionNone.value = "none";
    nameHistoryCard.appendChild(optionNone);

    nameHistoryCard.appendChild(optionNone);

    for (var counter = 0; table.childNodes.length > counter; counter++) {
        name = table.childNodes[counter].childNodes[0].innerHTML;
        if (!names.includes(name)) {
            names.push(name);

            var option = document.createElement("option");
            option.innerHTML = name;
            option.value = name;
            nameHistoryCard.appendChild(option);
        }
    }
}

function RemakeSpreadSheet(listOfVariables, listOfNames, datesBeggining, datesEnding, listOfComponents, graphicType) {
    //delete former Table, input new one
    var id = document.getElementById(listOfVariables + "_" + graphicType).parentElement.parentElement;
    var mainTable = id.getElementsByClassName("spreadSheet");
    mainTable = mainTable[0].childNodes[0];

    var parentElement = mainTable.parentElement;
    parentElement.removeChild(mainTable);

    $.ajax({
        type: "GET",
        url: "/HistoryShow/GetValuesOfVariant",
        data: { listOfVariables: listOfVariables, listOfNames: listOfNames, datesBeggining: datesBeggining, datesEnding: datesEnding, listOfComponents: listOfComponents },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            CreateRowHistory(msg.responseJSON, parentElement);
        }
    });
}

function FilterHistoryCardsValues() {
    var historyCardPage = document.getElementById("historyCardPage");
    historyCardPage.value = 1;
    var leftArrow = document.getElementById("historyCardPreviousArrow");
    leftArrow.style.display = "none";
    //reset Page

    var localHistory = document.getElementById("localSpreadSheetHistoryCard");
    ClearTableLocalHistory(localHistory);
    InputRowHeaderHistoric(localHistory);

    var nameCard = document.getElementById("nameHistoryCard").value;
    var conditionValueCard = document.getElementById("valueContidionHistoryCard").value;
    var valueCard = document.getElementById("valueHistoryCard").value;
    var mainHistory = document.getElementById("mainSpreadSheetHistoryCard");
    var value = document.getElementById("historyCardPage").value;
    var checkBool = true;
    var counterRows = 0;
    if (value == "") {
        value = 1;
    }

    for (var counter = 0; mainHistory.childNodes.length > counter; counter++) {
        checkBool = ProcessFilterHistoryCard(mainHistory.childNodes[counter], nameCard, conditionValueCard, valueCard);
        if (checkBool) {
            //iunput there
            var node = mainHistory.childNodes[counter].cloneNode(true);
            localHistory.appendChild(node);
            counterRows++;
        }
    }
    //if counterRows > 1000 break list into smaller results
    if (counterRows > 1000) {
        AlterArrowUpdateValues(value, localHistory);
    }
    else {
        var rightArrow = document.getElementById("historyCardNextArrow");
        rightArrow.style.display = "none";
        leftArrow.style.display = "none";
    }
    var checkBool = true;
}

function InputRowHeaderHistoric(table) {
    var tr = document.createElement("tr");
    tr.classList.add("tableHistoricTitles")
    table.appendChild(tr);

    var tdName = document.createElement("td");
    tdName.innerHTML = "Nome";
    tr.appendChild(tdName);

    var tdValue = document.createElement("td");
    tdValue.innerHTML = "Valor";
    tr.appendChild(tdValue);

    var tdUnit = document.createElement("td");
    tdUnit.innerHTML = "Unidade";
    tr.appendChild(tdUnit);

    var tdDate = document.createElement("td");
    tdDate.innerHTML = "Data";
    tr.appendChild(tdDate);
}

function ProcessFilterHistoryCard(row, nameCard, conditionValueCard, valueCard) {
    var checkBool = true;

    if (nameCard != "" && nameCard != "none") {
        checkBool = FilterHistoryTableName(nameCard, row);
    }
    if (conditionValueCard != "none") {
        if (valueCard != "") {
            checkBool = FilterHistoryTableValue(conditionValueCard, valueCard, row);
        }
    }
    return checkBool;
}

function ClearTableLocalHistory(localHistory) {
    while (localHistory.firstChild) {
        localHistory.removeChild(localHistory.firstChild);
    }
}

function FilterHistoryTableName(nameCard, row) {
    var checkBool = true;

    if (row.childNodes[0].innerHTML != nameCard) {
        checkBool = false;
    }
    return checkBool;
}

function FilterHistoryTableValue(condition, valueCard, row) {
    //foreach row turn display into none when not matching the codition;    
    var valueNumber = parseFloat(valueCard);
    var value = parseFloat(row.childNodes[1].innerHTML);
    var checkBool = true;

    //foreach row turn display into none when not matching the name;
    switch (condition) {
        case "maior":
            if (value < valueNumber) {
                checkBool = false;
            }
            break;
        case "menor":
            if (value > valueNumber) {
                checkBool = false;
            }
            break;
        default:
            if (value != valueNumber) {
                checkBool = false;
            }
    }
    return checkBool;
}

function AlterArrowUpdateValues(total, localHistory) {
    //hide all, show only the range
    for (var counter = 0; localHistory.childNodes.length > counter; counter++) {
        localHistory.childNodes[counter].style.display = "none";
    }

    if (total == 1) {
        //no back to 0
        var leftArrow = document.getElementById("historyCardPreviousArrow");
        leftArrow.style.display = "none";
    }

    total = total * 1000;
    for (var counter = total - 1000; counter < total; counter++) {
        var node = localHistory.childNodes[counter].style.display = "block";
    }

    var rightArrow = document.getElementById("historyCardNextArrow");
    if (localHistory.childNodes.length >= total) {
        rightArrow.style.display = "block";
    }
    else {
        rightArrow.style.display = "none";
    }
}

function GoToTop() {
    window.scrollTo(0, 0);
}

function deleteHistoryComponents() {
    ///call function that changes Color and Remove element;
    var counter = document.getElementById("listOfSelectedComponents").childNodes.length;
    var panel = document.getElementById("listOfSelectedComponents").childNodes;
    var elementId;

    while (counter > 1) {
        counter--;

        elementId = panel[counter].childNodes[1];
        elementId = elementId.id.split("_")[1];
        DeletedSelectedVariableFromDiv(elementId);
    }
}

function createSliderY(ids, min, max) {
    var name = "#barYAxis" + ids;

    var minValue = parseFloat(min);
    var maxValue = parseFloat(max);
    //var slider = createD3RangeSlider(min, max, name);

    d3.select(name).call(d3.slider().min(minValue).max(maxValue).value([minValue, maxValue]).step(1).orientation("vertical").on("slide", function (evt, value) {
        if (searchBoolean) {
            searchBoolean = false;
            YSliderTimer(ids);
        }

        InputNewYLabels(value, ids);
    }));
}

function InputNewYLabels(value, ids) {
    var yMaxLabel = document.getElementById("yMaxValue" + ids);
    var yMinLabel = document.getElementById("yMinValue" + ids);

    yMinLabel.innerHTML = value[0];
    yMaxLabel.innerHTML = value[1];
    //"yMinValue" + finalVariablesId;
    //"yMaxValue" + finalVariablesId;
}

function mainSliderTimer(ids) {
    ShowLoadingGraph(ids);

    var minValues = document.getElementById("barInitialLocal" + ids).value;
    var maxValues = document.getElementById("barFinalLocal" + ids).value;

    setTimeout(function () { searchBoolean = checkMainSliderValues(maxValues, minValues, ids) }, 4000);
}

function checkMainSliderValues(maxValues, minValues, ids) {
    var newMinValues = document.getElementById("barInitialLocal" + ids).value;
    var newMaxValues = document.getElementById("barFinalLocal" + ids).value;

    if (newMinValues != minValues) {
        SearchLocalHistory(ids);
    }
    else if (newMaxValues != maxValues) {
        SearchLocalHistory(ids);
    }
    return true;
}

function YSliderTimer(ids) {
    ShowLoadingGraph(ids);
    var minValues = document.getElementById("yMinValue" + ids).innerHTML;
    var maxValues = document.getElementById("yMaxValue" + ids).innerHTML;

    setTimeout(function () { searchBoolean = checkYSliderValues(maxValues, minValues, ids) }, 4000);
}

function checkYSliderValues(maxValues, minValues, ids) {
    var newMinValues = document.getElementById("yMinValue" + ids).innerHTML;
    var newMaxValues = document.getElementById("yMaxValue" + ids).innerHTML;

    if (newMinValues != minValues) {
        SearchLocalHistory(ids);
    }
    else if (newMaxValues != maxValues) {
        SearchLocalHistory(ids);
    }
    return true;
}

function generateCSVFile() {
    //get Full table and generate;
    var rows = [];
    var table = document.getElementById("mainSpreadSheetHistoryCard");

    var filterName = document.getElementById("nameHistoryCard");
    filterName = filterName[filterName.selectedIndex].value;
    var filterContidionValue = document.getElementById("valueContidionHistoryCard");
    filterContidionValue = filterContidionValue[filterContidionValue.selectedIndex].value;
    var filterValue = document.getElementById("valueHistoryCard").value;
    var filterBoolean = true;

    if (filterName != "none") {
        filterBoolean = false;
    }
    if (filterContidionValue != "none") {
        if (filterValue != "") {
            filterBoolean = false;
        }
    }

    if (filterBoolean) {
        var value1 = 's';
        var value2 = 's';
        var value3 = 's';
        var value4 = 's';

        if (table.childNodes[0].tagName == "TR") {
            for (counter = 0; table.childNodes.length > counter; counter++) {
                value1 = table.childNodes[counter].childNodes[0].childNodes[0].nodeValue;
                value2 = table.childNodes[counter].childNodes[1].childNodes[0].nodeValue;
                value3 = table.childNodes[counter].childNodes[2].childNodes[0].nodeValue;
                value4 = table.childNodes[counter].childNodes[3].childNodes[0].nodeValue;
                var newRow = new Array(value1, value2, value3, value4);

                rows.push(newRow);
            }
        }
        else {
            for (counter = 1; table.childNodes.length > counter; counter++) {
                value1 = table.childNodes[counter].childNodes[0].childNodes[0].nodeValue;
                value2 = table.childNodes[counter].childNodes[1].childNodes[0].nodeValue;
                value3 = table.childNodes[counter].childNodes[2].childNodes[0].nodeValue;
                value4 = table.childNodes[counter].childNodes[3].childNodes[0].nodeValue;
                var newRow = new Array(value1, value2, value3, value4);

                rows.push(newRow);
            }
        }
    }
    else {
        rows = csvWithFilters(rows, filterName, filterValue, filterContidionValue, table);
    }

    let csvContent = "data:text/csv;charset=utf-8,";

    rows.forEach(function (rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dadoHorario.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
}

function csvWithFilters(rows, filterName, filterValue, filterContidionValue, table) {

    var value1 = "s";
    var value2 = "s";
    var value3 = "s";
    var value4 = "s";

    var boolName = false;
    var boolCondition = false;
    var finalBool = true;

    if (filterName != "none") {
        boolName = true;
    }
    if (filterContidionValue != "none") {
        if (filterValue != "") {
            boolCondition = true;
        }
    }

    if (table.childNodes[0].tagName == "TR") {
        for (counter = 0; table.childNodes.length > counter; counter++) {
            finalBool = true;
            value1 = table.childNodes[counter].childNodes[0].childNodes[0].nodeValue;
            if (boolName) {
                if (value1 != filterName) {
                    finalBool = false;
                }
            }
            value2 = parseFloat(table.childNodes[counter].childNodes[1].childNodes[0].nodeValue);
            if (boolCondition) {
                switch (filterContidionValue) {
                    case "maior":
                        if (value2 < filterValue) {
                            finalBool = false;
                        }
                        break;
                    case "menor":
                        if (value2 > filterValue) {
                            finalBool = false;
                        }
                        break;
                    default:
                        if (value2 != filterValue) {
                            finalBool = false;
                        }
                }
            }
            value3 = table.childNodes[counter].childNodes[2].childNodes[0].nodeValue;
            value4 = table.childNodes[counter].childNodes[3].childNodes[0].nodeValue;

            if (finalBool) {
                var newRow = new Array(value1, value2, value3, value4);
                rows.push(newRow);
            }
        }
    }
    else {
        for (counter = 1; table.childNodes.length > counter; counter++) {
            finalBool = true;
            value1 = table.childNodes[counter].childNodes[0].childNodes[0].nodeValue;
            if (boolName) {
                if (value1 != filterName) {
                    finalBool = false;
                }
            }
            value2 = parseFloat(table.childNodes[counter].childNodes[1].childNodes[0].nodeValue);

            if (boolCondition) {
                switch (filterContidionValue) {
                    case "maior":
                        if (value2 > filterValue) {
                            finalBool = false;
                        }
                        break;
                    case "menor":
                        if (value2 < filterValue) {
                            finalBool = false;
                        }
                        break;
                    default:
                        if (value2 != filterValue) {
                            finalBool = false;
                        }
                }
            }
            value3 = table.childNodes[counter].childNodes[2].childNodes[0].nodeValue;
            value4 = table.childNodes[counter].childNodes[3].childNodes[0].nodeValue;

            if (finalBool) {
                var newRow = new Array(value1, value2, value3, value4);
                rows.push(newRow);
            }
        }
    }
    return rows;
}

function resetParametersHistory(ids) {
    //reset axis Y

    ShowLoadingGraph(ids);

    var barY = document.getElementById("barYAxis" + ids);

    for (var counterY = barY.childNodes.length - 1; counterY > 0; counterY--) {
        barY.removeChild(barY.childNodes[counterY]);
    }
    barY.className = '';

    var minValueElement = document.getElementById("yMinValue" + ids);
    var minValue = document.getElementById("yMinValue" + ids).value;
    minValueElement.innerHTML = minValue;

    var maxValueElement = document.getElementById("yMaxValue" + ids);
    var maxValue = document.getElementById("yMaxValue" + ids).value;
    maxValueElement.innerHTML = maxValue;

    d3.select("#barYAxis" + ids).call(d3.slider().min(minValue).max(maxValue).value([minValue, maxValue]).step(1).orientation("vertical").on("slide", function (evt, value) {
        if (searchBoolean) {
            searchBoolean = false;
            YSliderTimer(ids);
        }
        InputNewYLabels(value, ids);
    }));

    //reset axis X
    var barX = document.getElementById("slider-container" + ids);

    for (var counterX = barX.childNodes.length - 1; counterX > -1; counterX--) {
        barX.removeChild(barX.childNodes[counterX]);
    }
    barX.className = "parent-slider-container localSliderDiv";

    d3.select("#slider-container" + ids).call(d3.slider().min(0).max(100).step(1).value([0, 100]).on("slide", function (evt, value) {
        if (searchBoolean) {
            searchBoolean = false;
            mainSliderTimer(ids);
        }
        inputNewBeggin(value[0], ids);
        inputNewEnd(value[1], ids);
    }));
    inputNewBeggin(0, ids);
    inputNewEnd(100, ids);

    SearchLocalHistory(ids);
}

function NewLimitsForYAxis(ids, min, max) {
    var value75 = document.getElementById("75Value" + ids);
    var value50 = document.getElementById("50Value" + ids);
    var value25 = document.getElementById("25Value" + ids);

    value75.innerHTML = ((max - min) * 0.75) + parseFloat(min);
    value50.innerHTML = ((max - min) * 0.50) + parseFloat(min);
    value25.innerHTML = ((max - min) * 0.25) + parseFloat(min);
}

function ShowLoadingGraph(ids) {
    var mainGraph = document.getElementById("divGraph" + ids);
    var icon = document.getElementById("graphIcon" + ids);
    var divGraph = document.getElementById("divGraph" + ids);

    divGraph.childNodes[0].style.opacity = 0.6;
    mainGraph.style.backgroundColor = "rgb(132 189 252 / 69%)";
    mainGraph.style.opacity = 0.8;
    icon.style.display = "block";
    var graph = mainGraph.childNodes[0];
    graph.style.opacity = 0.4;
}

function hideLoadingGraph(ids) {
    var mainGraph = document.getElementById("divGraph" + ids);
    var icon = document.getElementById("graphIcon" + ids);
    var divGraph = document.getElementById("divGraph" + ids);

    divGraph.childNodes[0].style.opacity = 1;
    mainGraph.style.backgroundColor = "#f4f6f9";
    mainGraph.style.opacity = 1;
    icon.style.display = "none";
    var graph = mainGraph.childNodes[0];
    graph.style.zIndex = 1;
}

function monthBegginingChange(value) {
    var day = document.getElementById("initialDay").value;

    if (value == 1) {
        if (day > 28) {
            document.getElementById("initialDay").value = 28;
        }
    }
    if (value == 8 || value == 3 || value == 5 || value == 8 || value == 10) {
        if (day > 30) {
            document.getElementById("initialDay").value = 30;
        }
    }
    if (value == 9 || value == 7 || value == 6 || value == 2 || value == 11 || value == 0) {
        if (day > 31) {
            document.getElementById("initialDay").value = 31;
        }
    }
}

function dayBegginingChange(value) {
    var month = document.getElementById("initialMonth").value;
    //first index of month is <"mes">
    if (value > 28) {
        if (month == 1) {
            document.getElementById("initialMonth").selectedIndex = 3;
            document.getElementById("initialDay").value = 1;
        }
    }
    if (value > 30) {
        if (month == 8 || month == 3 || month == 5 || month == 8 || month == 10) {
            var monthIndex = document.getElementById("initialMonth").selectedIndex;
            document.getElementById("initialMonth").selectedIndex = monthIndex + 1;
            document.getElementById("initialDay").value = 1;
        }
    }
    if (value > 31) {
        document.getElementById("initialDay").value = 1;
        if (document.getElementById("initialMonth").selectedIndex == 12) {
            document.getElementById("initialMonth").selectedIndex = 1
        }
        else {
            var monthIndex = document.getElementById("initialMonth").selectedIndex;
            document.getElementById("initialMonth").selectedIndex = monthIndex + 1;
        }
    }
}



function monthEndingChange(value) {
    var day = document.getElementById("endDay").value;

    if (value == 1) {
        if (day > 28) {
            document.getElementById("endDay").value = 28;
        }
    }
    if (value == 8 || value == 3 || value == 5 || value == 8 || value == 10) {
        if (day > 30) {
            document.getElementById("endDay").value = 30;
        }
    }
    if (value == 9 || value == 7 || value == 6 || value == 2 || value == 11 || value == 0) {
        if (day > 31) {
            document.getElementById("endDay").value = 31;
        }
    }
}

function dayEndingChange(value) {

    var month = document.getElementById("endMonth").value;

    if (value > 28) {
        if (month == 1) {
            document.getElementById("endMonth").selectedIndex = 3;
            document.getElementById("endDay").value = 1;
        }
    }
    if (value > 30) {
        if (month == 8 || month == 3 || month == 5 || month == 8 || month == 10) {
            var monthIndex = document.getElementById("endMonth").selectedIndex;
            document.getElementById("endMonth").selectedIndex = monthIndex + 1;
            document.getElementById("endDay").value = 1;
        }
    }
    if (value > 31) {
        document.getElementById("endDay").value = 1;
        if (document.getElementById("endMonth").selectedIndex == 12) {
            document.getElementById("endMonth").selectedIndex = 1;
        }
        else {
            var monthIndex = document.getElementById("endMonth").selectedIndex;
            document.getElementById("endMonth").selectedIndex = monthIndex + 1;
        }
    }
}

function showDeleteHistoryWindown(element) {
    var windown = document.getElementById("deleteWindown");
    windown.style.display = "block";

    var buttonDelete = document.getElementById("alarmDeleteButton");
    buttonDelete.onclick = function () { DeleteGraphDiv(element) };
}
