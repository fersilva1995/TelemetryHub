window.sidebarWidth = '0px';

function myFunction() {
    adjustCalculator();
}

function CreateDashboard() {
    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    var boolResult = true;
    var userId = document.getElementById("user").value;
    var nameValue = document.getElementById("name").value;
    var descriptionValue = document.getElementById("description").value;

    //if (nameValue == "") {
    //    boolResult = false;
    //}

    if (boolResult) {
        ShowLoading();
        $.ajax({
            url: $('#createButton').data('url'),
            type: 'POST',
            data: {
                __RequestVerificationToken: token,
                userId: userId,
                name: nameValue,
                description: descriptionValue
            },
            success: function (data) {
                hideLoading();
                window.location.href = data;
            }

        });
    }
    return false;
}

function EditDashboard() {

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    var id = document.getElementById("panelId").innerText;
    var nameValue = document.getElementById("name").value;
    var descriptionValue = document.getElementById("description").value;
    var userId = document.getElementById("userId").value;


    $.ajax({
        type: "GET",
        url: "/Dashboard/EditPanel",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: {
            __RequestVerificationToken: token,
            id: id,
            name: nameValue,
            description: descriptionValue,
            userId: userId
        },
        sucess: function (data) {
            hideLoading();
            window.location.href = "/Dashboard/Index";
        },
        error: function (data) {
            hideLoading();
            window.location.href = "/Dashboard/Index";
        },
    });
}

function DeleteDashboard() {

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    var id = document.getElementById("panelId").innerText;
    ShowLoading();

    $.ajax({
        url: $('#deleteButton').data('url'),
        type: 'POST',
        data: {
            __RequestVerificationToken: token,
            id: id
        },
        success: function (data) {
            hideLoading();
            window.location.href = data;
        }
    });
    return false;
}

function InitializeDashboard(id, panelId) {
    var id = id.innerText;
    var panelId = panelId.innerText;

    $.ajax({
        type: "GET",
        url: "/Dashboard/GetComponents",
        data: { id: id, panelId: panelId },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.success) {

                for (var i = 0; i < response.components.length; i++) {
                    var component = response.components[i];
                    var nameValue = component.name;
                    var variableValue = component.variable.id;
                    var positionValue = component.position;
                    var minimumValue = component.minimun;
                    var maximumValue = component.maximun;
                    var multiplicatorValue = component.multiplicator;
                    var constantValue = component.constant;
                    var unitValue = component.unit;
                    var type = component.type;
                    var onLabel = component.subtitleOn;
                    var offLabel = component.subtitleOff;
                    var digitalType = component.digitalType;
                    var color1 = component.color1;
                    var color2 = component.color2;
                    var color3 = component.color3;
                    var text3 = component.text3;
                    var edge1 = component.edge1;
                    var edge2 = component.edge2;
                    var timeDuration = component.timeDuration;
                    var auxiliaryVariables = component.auxiliaryVariables;

                    var adjustPosition = positionValue - 1;
                    positionValue = CheckNumberCell(adjustPosition);

                    if (type === "GAUGE") {
                        AddGauge(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue, constantValue,
                            unitValue, color1, color2, color3, edge1, edge2, timeDuration);
                    }
                    else if (type === "VERTICAL") {
                        AddVertical(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue, constantValue,
                            unitValue, color1, color2, color3, edge1, edge2, timeDuration);
                    }
                    else if (type === "GRAPHIC") {
                        AddGraph(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue, constantValue,
                            unitValue, color2, timeDuration);
                    }
                    else if (type === "EXTEND GRAPHIC") {
                        AddExtendGraph(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue, constantValue,
                            unitValue, color2, timeDuration);
                    }
                    else if (type === "TEXT") {
                        AddText(nameValue, variableValue, positionValue, multiplicatorValue, constantValue, unitValue, color2, timeDuration);
                    }
                    else if (type === "DIGITAL") {
                        AddDigitalIndicator(positionValue, variableValue, nameValue, offLabel, onLabel, digitalType, color1, color2, timeDuration);
                    }
                    else if (type === "SEMAPHORE") {
                        AddSemaphore(positionValue, variableValue, nameValue, multiplicatorValue, constantValue, unitValue, offLabel, onLabel,
                            text3, color1, color2, color3, edge1, edge2, timeDuration);
                    }
                    else if (type === "PHOTO") {
                        AddPhoto(positionValue, text3, nameValue);
                    }
                    else if (type === "VARIANT GRAPHIC") {
                        AddVariantGraph(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue, constantValue, unitValue, color2, timeDuration);
                    }
                    else if (type === "AVERAGE GRAPHIC") {
                        AddAverageGraph(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue, constantValue, unitValue, color2, timeDuration);
                    }
                    else if (type === "COMPARATIVE GRAPHIC") {
                        AddComparativeGraph(nameValue, variableValue, positionValue, minimumValue, maximumValue, multiplicatorValue, constantValue, unitValue, color2, auxiliaryVariables, timeDuration);
                    }
                }
                IconChecker(id, panelId);
            }
            else {
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

function InitializeInsert(page) {

    if (page === "table") {
        ShowLabelDivTable();
    }

    $.ajax({
        type: "GET",
        url: "/Dashboard/InitializeInsert",
        data: {},
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            $('#componentDiv').load(document.URL + ' #componentDiv');
        }
    });

    if (page === "maps") {
        ChangeSideBarLeftMap();
    }

}

function InitializeEdit(page) {

    if (page === "table") {
        ShowLabelDivTable();
    }


    $.ajax({
        type: "GET",
        url: "/Dashboard/InitializeEdit",
        data: {},
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            $('#componentDiv').load(document.URL + ' #componentDiv');
        }
    });

    if (page === "maps") {
        ChangeSideBarLeftMap();
    }
}

function InitializeRemove() {
    $.ajax({
        type: "GET",
        url: "/Dashboard/InitializeRemove",
        data: {},
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            $('#componentDiv').load(document.URL + ' #componentDiv');
        }
    });
}

function InitializeHistory() {
    $.ajax({
        type: "GET",
        url: "/Dashboard/InitializeHistory",
        data: {},
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            $('#componentDiv').load(document.URL + ' #componentDiv');
        }
    });
}

function InitializeAlarm() {
    $.ajax({
        type: "GET",
        url: "/Dashboard/InitializeAlarm",
        data: {},
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            $('#componentDiv').load(document.URL + ' #componentDiv');
        }
    });
}

function LoadTypeData() {

    let hideTelemetry = false;
    var type = document.getElementById("type")
    var value = type.options[type.selectedIndex].value;

    if (value === "GAUGE" || value === "VERTICAL") {

        var typeElements = document.getElementById("typeElements");
        var mainTable = document.createElement("table");
        mainTable.style = "float:none";
        typeElements.innerHTML = '';

        CreateTableRow("Mínimo", "number", "min", mainTable, "inputsTypes");
        CreateTableRow("Máximo", "number", "max", mainTable, "inputsTypes");
        CreateTableRow("Multiplicador", "number", "multiplicator", mainTable, "inputsTypes");
        CreateTableRow("Constante", "number", "constant", mainTable, "inputsTypes");
        CreateTableRow("Unidade", "text", "unit", mainTable, "inputsTypes");
        CreateHiddenTableRow("Texto Ligado", "text", "onLabel", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Texto Desligado", "text", "offLabel", mainTable, "HiddenComponent");
        CreateTableRow("Texto Alto", "text", "text3", mainTable, "HiddenComponent");
        //CreateHiddenTableRow

        //CreateTableRow("Cor baixa", "select", "lowColor", mainTable, "Component"); RowsLimits Created too
        CreateTableRowSelect("Cor baixa", "lowColor", mainTable, "inputsTypes");
        CreateTableRow("Valor do limite menor", "number", "firstEdge", mainTable, "inputsTypes");
        CreateTableRowSelect("Cor média", "mediumColor", mainTable, "inputsTypes");
        CreateTableRow("Valor do limite maior", "number", "secondEdge", mainTable, "inputsTypes");
        CreateTableRowSelect("Cor alta", "highColor", mainTable, "inputsTypes");
        typeElements.appendChild(mainTable);

        //create Limit Row;
        document.getElementById("firstEdge").step = 1;
        document.getElementById("secondEdge").step = 1;

        //insertColorsOptions
        InsertColorToElement("lowColor");
        document.getElementById("lowColor").selectedIndex = 3;
        InsertColorToElement("mediumColor");
        document.getElementById("mediumColor").selectedIndex = 2;
        InsertColorToElement("highColor");
        document.getElementById("highColor").selectedIndex = 0;

        CreateTableRow("Variaveis Auxiliares", "text", "auxiliary_variables", mainTable, "HiddenComponent");
    }
    else if (value === "SEMAPHORE") {
        var typeElements = document.getElementById("typeElements");
        var mainTable = document.createElement("table");
        mainTable.style = "float:none";
        typeElements.innerHTML = '';

        CreateTableRow("Mínimo", "number", "min", mainTable, "HiddenComponent");
        CreateTableRow("Máximo", "number", "max", mainTable, "HiddenComponent");
        CreateTableRow("Multiplicador", "number", "multiplicator", mainTable, "inputsTypes");
        CreateTableRow("Constante", "number", "constant", mainTable, "inputsTypes");
        CreateTableRow("Unidade", "text", "unit", mainTable, "inputsTypes");
        //CreateHiddenTableRow

        //CreateTableRow("Cor baixa", "select", "lowColor", mainTable, "Component"); RowsLimits Created too
        CreateTableRow("Texto Baixo", "text", "onLabel", mainTable, "inputsTypes");
        CreateTableRowSelect("Cor baixa", "lowColor", mainTable, "inputsTypes");
        CreateTableRow("Valor do limite menor", "number", "firstEdge", mainTable, "inputsTypes");
        CreateTableRow("Texto Médio", "text", "offLabel", mainTable, "inputsTypes");
        CreateTableRowSelect("Cor média", "mediumColor", mainTable, "inputsTypes");
        CreateTableRow("Valor do limite maior", "number", "secondEdge", mainTable, "inputsTypes");
        CreateTableRow("Texto Alto", "text", "text3", mainTable, "inputsTypes");
        CreateTableRowSelect("Cor alta", "highColor", mainTable, "inputsTypes");
        typeElements.appendChild(mainTable);

        //create Limit Row;
        document.getElementById("firstEdge").step = 1;
        document.getElementById("secondEdge").step = 1;

        //insertColorsOptions
        InsertColorToElement("lowColor");
        document.getElementById("lowColor").selectedIndex = 3;
        InsertColorToElement("mediumColor");
        document.getElementById("mediumColor").selectedIndex = 2;
        InsertColorToElement("highColor");
        document.getElementById("highColor").selectedIndex = 0;

        CreateTableRow("Variaveis Auxiliares", "text", "auxiliary_variables", mainTable, "HiddenComponent");

    }
    else if (value === "DIGITAL") {

        var typeElements = document.getElementById("typeElements");
        var mainTable = document.createElement("table");
        mainTable.style = "float:none";
        typeElements.innerHTML = '';

        CreateHiddenTableRow("Mínimo", "number", "min", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Máximo", "number", "max", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Multiplicador", "number", "multiplicator", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Constante", "number", "constant", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Unidade", "text", "unit", mainTable, "HiddenComponent");

        CreateTableRow("Texto Aberto", "text", "offLabel", mainTable, "inputsTypes");
        CreateTableRowSelect("Cor Aberta", "lowColor", mainTable, "inputsTypes");

        CreateTableRow("Texto Fechado ", "text", "onLabel", mainTable, "inputsTypes");
        CreateTableRowSelect("Cor Fechada", "mediumColor", mainTable, "inputsTypes");

        CreateTableRow("Texto Alto", "text", "text3", mainTable, "HiddenComponent");

        CreateHiddenTableRowSelect("Cor baixa", "highColor", mainTable, "HiddenComponent");
        typeElements.appendChild(mainTable);

        InsertColorToElement("lowColor");
        document.getElementById("lowColor").selectedIndex = 4;
        InsertColorToElement("mediumColor");
        document.getElementById("mediumColor").selectedIndex = 2;
        InsertColorToElement("highColor");
        document.getElementById("highColor").selectedIndex = 2;

        CreateHiddenTableRow("Valor do limite menor", "number", "firstEdge", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Valor de 2° limite", "text", "secondEdge", mainTable, "HiddenComponent");

        CreateTableRow("Variaveis Auxiliares", "text", "auxiliary_variables", mainTable, "HiddenComponent");
    }
    else if (value === "TEXT") {
        var typeElements = document.getElementById("typeElements");
        var mainTable = document.createElement("table");
        mainTable.style = "float:none";
        typeElements.innerHTML = '';

        CreateHiddenTableRow("Mínimo", "number", "min", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Máximo", "number", "max", mainTable, "HiddenComponent");
        CreateTableRow("Multiplicador", "number", "multiplicator", mainTable, "inputsTypes");
        CreateTableRow("Constante", "number", "constant", mainTable, "inputsTypes");
        CreateTableRow("Unidade", "text", "unit", mainTable, "inputsTypes");
        CreateHiddenTableRow("Texto Ligado", "text", "onLabel", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Texto Desligado", "text", "offLabel", mainTable, "HiddenComponent");
        CreateTableRow("Texto Alto", "text", "text3", mainTable, "HiddenComponent");

        CreateHiddenTableRowSelect("Cor baixa", "lowColor", mainTable, "HiddenComponent");
        CreateTableRowSelect("Cor de Texto", "mediumColor", mainTable, "inputsTypes");
        CreateHiddenTableRowSelect("Cor alta", "highColor", mainTable, "HiddenComponent");
        typeElements.appendChild(mainTable);

        InsertColorToElement("lowColor");
        document.getElementById("lowColor").selectedIndex = 4;
        InsertColorToElement("mediumColor");
        document.getElementById("mediumColor").selectedIndex = 3;
        InsertColorToElement("highColor");
        document.getElementById("highColor").selectedIndex = 2;

        CreateHiddenTableRow("Valor do limite menor", "number", "firstEdge", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Valor de 2° limite", "text", "secondEdge", mainTable, "HiddenComponent");

        CreateTableRow("Variaveis Auxiliares", "text", "auxiliary_variables", mainTable, "HiddenComponent");
    }

    else if (value === "GRAPHIC") {
        var typeElements = document.getElementById("typeElements");
        var mainTable = document.createElement("table");
        mainTable.style = "float:none";
        typeElements.innerHTML = '';

        CreateTableRow("Mínimo", "number", "min", mainTable, "inputsTypes");
        CreateTableRow("Máximo", "number", "max", mainTable, "inputsTypes");
        CreateTableRow("Multiplicador", "number", "multiplicator", mainTable, "inputsTypes");
        CreateTableRow("Constante", "number", "constant", mainTable, "inputsTypes");
        CreateTableRow("Unidade", "text", "unit", mainTable, "inputsTypes");
        CreateHiddenTableRow("Texto Ligado", "text", "onLabel", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Texto Desligado", "text", "offLabel", mainTable, "HiddenComponent");
        CreateTableRow("Texto Alto", "text", "text3", mainTable, "HiddenComponent");

        CreateHiddenTableRowSelect("Cor ", "lowColor", mainTable, "HiddenComponent");
        CreateTableRowSelect("Cor do gráfico", "mediumColor", mainTable, "inputsTypes");
        CreateHiddenTableRowSelect("Cor ", "highColor", mainTable, "HiddenComponent");

        typeElements.appendChild(mainTable);

        //insertColorsOptions
        InsertColorToElement("lowColor");
        document.getElementById("lowColor").selectedIndex = 2;
        InsertColorToElement("mediumColor");
        document.getElementById("lowColor").selectedIndex = 4;
        InsertColorToElement("highColor");
        document.getElementById("highColor").selectedIndex = 2;

        CreateHiddenTableRow("Valor do limite menor", "number", "firstEdge", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Valor de 2° limite", "text", "secondEdge", mainTable, "HiddenComponent");

        CreateTableRow("Variaveis Auxiliares", "text", "auxiliary_variables", mainTable, "HiddenComponent");
    }
    else if (value === "PHOTO") {

        var typeElements = document.getElementById("typeElements");
        var mainTable = document.createElement("table");
        mainTable.style = "float:none";
        typeElements.innerHTML = '';

        CreateHiddenTableRow("Mínimo", "number", "min", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Máximo", "number", "max", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Multiplicador", "number", "multiplicator", mainTable, "HiddenComponent");
                
        CreateHiddenTableRow("Constante", "number", "constant", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Unidade", "text", "unit", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Texto Ligado", "text", "onLabel", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Texto Desligado", "text", "offLabel", mainTable, "HiddenComponent");


        CreateTableRowFile("URL", "text", "text3", mainTable, "inputsTypes");
        CreateHiddenTableRow("URL", "text", "formerText3", mainTable, "HiddenComponent")

        CreateHiddenTableRowSelect("Cor baixa", "lowColor", mainTable, "HiddenComponent");
        CreateHiddenTableRowSelect("Cor de Texto", "mediumColor", mainTable, "HiddenComponent");
        CreateHiddenTableRowSelect("Cor alta", "highColor", mainTable, "HiddenComponent");
        typeElements.appendChild(mainTable);

        InsertColorToElement("lowColor");
        document.getElementById("lowColor").selectedIndex = 4;
        InsertColorToElement("mediumColor");
        document.getElementById("mediumColor").selectedIndex = 3;
        InsertColorToElement("highColor");
        document.getElementById("highColor").selectedIndex = 2;

        CreateHiddenTableRow("Valor do limite menor", "number", "firstEdge", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Valor de 2° limite", "text", "secondEdge", mainTable, "HiddenComponent");

        CreateHiddenTableRow("Variaveis Auxiliares", "text", "auxiliary_variables", mainTable, "HiddenComponent");

        hideTelemetry = true;
    }
    else if (value === "EXTEND GRAPHIC" || value === "VARIANT GRAPHIC" || value === "AVERAGE GRAPHIC") {
        var typeElements = document.getElementById("typeElements");
        var mainTable = document.createElement("table");
        mainTable.style = "float:none";
        typeElements.innerHTML = '';

        CreateTableRow("Mínimo", "number", "min", mainTable, "inputsTypes");
        CreateTableRow("Máximo", "number", "max", mainTable, "inputsTypes");
        CreateTableRow("Multiplicador", "number", "multiplicator", mainTable, "inputsTypes");
        CreateTableRow("Constante", "number", "constant", mainTable, "inputsTypes");
        CreateTableRow("Unidade", "text", "unit", mainTable, "inputsTypes");
        CreateHiddenTableRow("Texto Ligado", "text", "onLabel", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Texto Desligado", "text", "offLabel", mainTable, "HiddenComponent");


        CreateHiddenTableRowSelect("Cor ", "lowColor", mainTable, "HiddenComponent");
        CreateTableRowSelect("Cor do gráfico", "mediumColor", mainTable, "inputsTypes");
        CreateHiddenTableRowSelect("Cor ", "highColor", mainTable, "HiddenComponent");

        typeElements.appendChild(mainTable);

        //insertColorsOptions
        InsertColorToElement("lowColor");
        document.getElementById("lowColor").selectedIndex = 2;
        InsertColorToElement("mediumColor");
        document.getElementById("lowColor").selectedIndex = 4;
        InsertColorToElement("highColor");
        document.getElementById("highColor").selectedIndex = 2;

        CreateHiddenTableRow("Valor do limite menor", "number", "firstEdge", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Valor de 2° limite", "text", "secondEdge", mainTable, "HiddenComponent");

        CreateTableRow("Variaveis Auxiliares", "text", "auxiliary_variables", mainTable, "HiddenComponent");
    }
    else if (value === "COMPARATIVE GRAPHIC") {

        var typeElements = document.getElementById("typeElements");
        var mainTable = document.createElement("table");
        mainTable.style = "float:none";
        typeElements.innerHTML = '';

        CreateTableRow("Mínimo", "number", "min", mainTable, "inputsTypes");
        CreateTableRow("Máximo", "number", "max", mainTable, "inputsTypes");
        CreateTableRow("Multiplicador", "number", "multiplicator", mainTable, "inputsTypes");
        CreateTableRow("Constante", "number", "constant", mainTable, "inputsTypes");
        CreateTableRow("Unidade", "text", "unit", mainTable, "inputsTypes");
        CreateHiddenTableRow("Texto Ligado", "text", "onLabel", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Texto Desligado", "text", "offLabel", mainTable, "HiddenComponent");

        CreateHiddenTableRowSelect("Cor ", "lowColor", mainTable, "HiddenComponent");
        CreateTableRowSelect("Cor do gráfico", "mediumColor", mainTable, "inputsTypes");
        CreateHiddenTableRowSelect("Cor ", "highColor", mainTable, "HiddenComponent");

        typeElements.appendChild(mainTable);

        //insertColorsOptions
        InsertColorToElement("lowColor");
        document.getElementById("lowColor").selectedIndex = 2;
        InsertColorToElement("mediumColor");
        document.getElementById("lowColor").selectedIndex = 4;
        InsertColorToElement("highColor");
        document.getElementById("highColor").selectedIndex = 2;

        CreateHiddenTableRow("Valor do limite menor", "number", "firstEdge", mainTable, "HiddenComponent");
        CreateHiddenTableRow("Valor de 2° limite", "text", "secondEdge", mainTable, "HiddenComponent");

        var typeSelected = document.getElementById("variables").selectedIndex;
        ReturnVariablesNames(document.getElementById("variables")[typeSelected].innerHTML, mainTable);
        //new div where actual variables are

        var divFinalVariable = document.createElement("div");
        divFinalVariable.id = "finalVariables";
        divFinalVariable.className = "divVariablesContainer";
        mainTable.appendChild(divFinalVariable);

        insertRowFinalVariable(divFinalVariable, document.getElementById("variables")[typeSelected].innerHTML, document.getElementById("variables")[typeSelected].value, "fa-genderless", false);
    }
    hideNotVarComponentMenu(hideTelemetry);
}


function hideNotVarComponentMenu(hideTelemetry) {
    //telemetria
    //modulo
    //variavel
    //historico

    let titleTelemtry = document.getElementById("telemetryTitle");
    let inputTelemtry = document.getElementById("telemetry");
    let titleModule = document.getElementById("moduleTitle");
    let inputModule = document.getElementById("modules");
    let titleVarible = document.getElementById("VariableTitle");
    let inputVarible = document.getElementById("variables");
    let historicTitle = document.getElementById("historicTitle");
    let historicDiv = document.getElementsByClassName("historicDashboard")[0];

    if (hideTelemetry) {
        titleTelemtry.style.display = "none";
        inputTelemtry.style.display = "none";
        titleModule.style.display = "none";
        inputModule.style.display = "none";
        titleVarible.style.display = "none";
        inputVarible.style.display = "none";

        if (!!historicTitle) {
            historicTitle.style.display = "none";
            historicDiv.style.display = "none";
        }
    }
    else {
        titleTelemtry.style.display = "";
        inputTelemtry.style.display = "";
        titleModule.style.display = "";
        inputModule.style.display = "";
        titleVarible.style.display = "";
        inputVarible.style.display = "";

        if (!!historicTitle) {
            historicTitle.style.display = "";
            historicDiv.style.display = "";
        }
    }

}

function InsertPlaceholder(id, placeholder) {
    document.getElementById(id).placeholder = placeholder;
}

function Fullscreen() {
    var elem = document.documentElement;
    var fullscreenIcon = document.getElementById("fullscreenIcon");

    topMenu = document.getElementById("topMenu");
    menu = document.getElementById("menu");
    body = document.getElementById("body");

    if (fullscreenIcon.className === "fas fa-expand") {

        $('#body').attr('style', 'margin-left: 0px !important');
        topMenu.style.display = "none";
        menu.style.display = "none";
        fullscreenIcon.className = "fas fa-compress";

        if (elem.requestFullscreen) {

            elem.requestFullscreen();
        }
        else if (elem.mozRequestFullScreen) {

            elem.mozRequestFullScreen();
        }
        else if (elem.webkitRequestFullscreen) {

            elem.webkitRequestFullscreen();
        }
        else if (elem.msRequestFullscreen) {

            elem = window.top.document.body;
            elem.msRequestFullscreen();
        }
    }
    else {

        body.removeAttribute("marginLeft");
        topMenu.removeAttribute("display");
        menu.removeAttribute("display");
        fullscreenIcon.className = "fas fa-expand";

        if (document.exitFullscreen) {

            document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) {

            document.mozCancelFullScreen();
        }
        else if (document.webkitExitFullscreen) {

            document.webkitExitFullscreen();
        }
        else if (document.msExitFullscreen) {

            window.top.document.msExitFullscreen();
        }
        location.reload();
    }

    var millisecondsToWait = 1000;
    setTimeout(function () {
        adjustCalculator();
    }, millisecondsToWait);
}

function FullscreenMap() {
    var elem = document.documentElement;
    var fullscreenIcon = document.getElementById("fullscreenIcon");

    topMenu = document.getElementById("topMenu");
    menu = document.getElementById("menu");
    body = document.getElementById("body");

    if (fullscreenIcon.className === "fas fa-expand") {

        $('#body').attr('style', 'margin-left: 0px !important');
        topMenu.style.display = "none";
        menu.style.display = "none";
        fullscreenIcon.className = "fas fa-compress";

        if (elem.requestFullscreen) {

            elem.requestFullscreen();
        }
        else if (elem.mozRequestFullScreen) {

            elem.mozRequestFullScreen();
        }
        else if (elem.webkitRequestFullscreen) {

            elem.webkitRequestFullscreen();
        }
        else if (elem.msRequestFullscreen) {

            elem = window.top.document.body;
            elem.msRequestFullscreen();
        }
    }
    else {

        body.removeAttribute("marginLeft");
        topMenu.removeAttribute("display");
        menu.removeAttribute("display");
        fullscreenIcon.className = "fas fa-expand";

        if (document.exitFullscreen) {
            document.exitFullscreen();
            showAllElementsHTMLMap();
        }
        else if (document.mozCancelFullScreen) {

            document.mozCancelFullScreen();
        }
        else if (document.webkitExitFullscreen) {

            document.webkitExitFullscreen();
        }
        else if (document.msExitFullscreen) {

            window.top.document.msExitFullscreen();
        }
    }

    var millisecondsToWait = 1000;
    setTimeout(function () {
        adjustCalculator();
    }, millisecondsToWait);
}

function ReturnVariablesNames(name, table) {
    createTableDiv(table, "tableDivVariable");


    var mainTable = document.getElementById("tableDivVariable");
    CreateTableRowSelect("Telemetrias", "telemetryList", mainTable, "Component");
    var telemetryList = document.getElementById("telemetryList");
    telemetryList.onchange = function () { getVariablesFromTelemetry(this.selectedIndex, this) };

    $.ajax({
        type: "GET",
        url: "/Dashboard/ReturnTelemetryFromUser",
        data: {},
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            for (var v = 0; v, v < msg.responseJSON.length - 1; v = v + 2) {
                InsertVariablesValue(telemetryList, msg.responseJSON[v], msg.responseJSON[v + 1]);

            }
        }
    });

}

function HistoryValidator(component, startDate, endDate) {
    //check if component != null and StartDateTime < endDateTime;
    if (component.selectedIndex == 0) {
        return false;
    }
    if (startDate == "" || endDate == "") {
        return false
    }
    var startDate = new Date(startDate);
    var endDate = new Date(endDate);
    if (startDate > endDate || startDate == endDate) {
        return false;
    }
    return true;
}

function AlarmValidator(component, condition) {
    if (component.selectedIndex == 0 || condition.selectedIndex == 0) {
        return false;
    }
    return true;
}

function checkComponentHistory(id, panelId) {

    $.ajax({
        type: "GET",
        url: "/Dashboard/HistoryChecker",
        data: { id: id, panelId: panelId },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            for (var i = 0; i < msg.responseJSON.length; i++) {
                var component = msg.responseJSON[i];

                var id = component.id;
                var status = component.status;

                var nameID = id + "iconHistoric";
                var VariableHistoryIcon = document.getElementById(nameID);
                if (VariableHistoryIcon != undefined) {
                    if (status) {
                        VariableHistoryIcon.style.display = "block";
                        VariableHistoryIcon.style.color = "white";
                    }
                    else {
                        VariableHistoryIcon.style.cursor = "default"
                        VariableHistoryIcon.style.display = "block";
                        VariableHistoryIcon.style.color = "#303030";
                    }
                }
            }
        }
    });
}

function RingAlarmSound() {
    var sound = document.getElementById('sound');
    var end = sound.ended;

    var time = sound.currentTime;

    if (time > 1.9) {
        document.getElementById('redAlertSound').play();
    }
    else if (time == 0) {
        document.getElementById('redAlertSound').play();
    }
}

function CheckActionIcon(id, panelId) {
    let elements = document.getElementsByClassName('fa-bolt');
    elements = Object.values(elements);

    elements = elements.filter(function (value) {
        if (value.className != "nav-icon fas fa-bolt") {
            if (value.className != "fas fa-bolt dashboardTitleIcon") {
                return true
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
        return false;
    });


    $.ajax({
        type: "GET",
        url: "/Dashboard/ActionIconChecker",
        data: { id: id, panelId: panelId },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            for (var i = 0; i < msg.responseJSON.length; i++) {
                var variable = msg.responseJSON[i];
                var icon = document.getElementById(variable + "iconAction");
                if (icon != undefined) {
                    icon.style.color = "white";

                    //filter array elements 
                    elements = elements.filter(function (value) {
                        if (icon.id != value.id) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                }
            }
            for (let icon in elements) {
                elements[icon].style.color = "#303030";
            }
        }
    });
}

function CheckActionReceiverIcon() {
    var elements = document.getElementsByClassName('actionReceiverDigIndicator');
    var numberElements = [];

    $.ajax({
        type: "GET",
        url: "/Dashboard/CheckActionReceiverIcon",
        data: {},
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            ////////-----------------|||||-----------------\\\\\\
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.color = "#303030";
                numberElements[i] = i;
            }
            elements = document.getElementsByClassName('actionReceiverGauge');
            numberElements = [];
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.color = "#303030";
            }
            elements = document.getElementsByClassName('actionReceiverText');
            numberElements = [];
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.color = "#303030";
            }
            elements = document.getElementsByClassName('actionReceiverSemaphore');
            numberElements = [];
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.color = "#303030";
            }
            elements = document.getElementsByClassName('vertBarActionReceiver');
            numberElements = [];
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.color = "#303030";
            }
            ////////-----------------|||||-----------------\\\\\\

            for (var i = 0; i < msg.responseJSON.length; i++) {
                var variable = msg.responseJSON[i];
                var icon = document.getElementById(variable + "iconActionReceiver");
                if (icon != undefined) {
                    icon.style.color = "white";
                }
            }
        }
    });
}

function CheckAlarmsOnPanels() {
    var id = document.getElementById("userId").innerHTML;
    var elements = document.getElementsByClassName('panelSelection');
    var dashboard = document.getElementById('Dashboard');
    var IconsElements;
    //Check Alarms on Panels all Panels Of Account;

    $.ajax({
        type: "GET",
        url: "/Dashboard/CheckAlarmsOnPanels",
        data: { id: id },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {

            //after answer from DB
            for (var i = 0; i < elements.length; i++) {
                //NOW elements[i].classList.add("panelSelection");
                //elements[i].style.backgroundColor = "rgb(244,246,249)";
                //elements[i].style.color = "#212529";

                var IconsElements = elements[i].getElementsByTagName("A")
                if (IconsElements.length > 0) {
                    for (var counterIcons = 0; IconsElements.length > counterIcons; counterIcons++) {
                        IconsElements[counterIcons].style.color = "dodgerBlue";
                    }
                }
            }
            var trElements = dashboard.getElementsByTagName("tr");
            if (trElements.length > 0) {
                for (var trIcons = 0; trElements.length > trIcons; trIcons++) {
                    if (trElements[trIcons].className == "mobileIcons") {
                        if (trElements[trIcons].style.display != "") {
                            trElements[trIcons].className = "panelSelection";
                        }
                    }
                    else {
                        trElements[trIcons].className = "panelSelection";
                    }
                }
            }

            for (var counter = 0; counter < msg.responseJSON.length; counter++) {
                var variable = msg.responseJSON[counter].value;

                var led = document.getElementById("led_" + variable.id);
                var divLed = document.getElementById("divLed_" + variable.id);

                if (variable.alarmStatus == true) {
                    var linePanel = document.getElementById("panelId_" + variable.id);
                    if (linePanel != undefined) {
                        linePanel.classList.add("panelAlarmShow");
                        led.className = "led-red";
                        divLed.title = "Painel Alarmando";

                        IconsElements = linePanel.getElementsByTagName("A");
                        if (IconsElements.length > 0) {
                            for (var counterIcons = 0; IconsElements.length > counterIcons; counterIcons++) {
                                IconsElements[counterIcons].style.color = "#AF1D24";
                            }
                        }
                    }
                }
                else {
                    led.className = "led-green";
                    divLed.title = "Painel Normal";
                }
            }
        }
    });
}

function IconChecker(id, panelId) {
    checkComponentHistory(id, panelId);
    CheckActionReceiverIcon();
    CheckActionIcon(id, panelId);
    AlarmCheckerIconsAndPeriods(id, panelId);
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function AlarmCheckerIconsAndPeriods(id, panelId) {
    var boolAlarm = false;
    var id;
    var alarmCondition;
    var alarmColor;
    var variableIconAlarm;
    panelId = parseInt(panelId);

    //reset Divs of triggerred Alarms 
    RemoveClassAlarmRinging();

    $.ajax({
        type: "GET",
        url: "/Dashboard/AlarmCheckerIconsAndPeriods",
        data: { id: id, panelId: panelId },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            if (msg.responseJSON != undefined) {
                for (var i = 0; i < msg.responseJSON.length; i++) {

                    var componentArray = msg.responseJSON[i].split(" ");
                    id = componentArray[0];

                    alarmCondition = componentArray[1];
                    variableIconAlarm = document.getElementById(id + "iconAlarm");
                    if (id == 37) {
                        let ilu = 8;
                    } 

                    if (alarmCondition != "False") {
                        boolAlarm = true;
                        variableIconAlarm.style.display = "block";
                        variableIconAlarm.style.color = "rgb(255, 0, 12)";
                        inputDivTrigger(id);
                    }
                    else {
                        if (componentArray.length < 3) {                            
                            variableIconAlarm.style.color = "#303030";
                        }
                        else {
                            alarmColor = componentArray[2];

                            if (alarmColor == "yellow") {
                                variableIconAlarm.style.display = "block";
                                variableIconAlarm.style.color = "rgb(207,178,31)";
                            }
                            else if (alarmColor == "white") {
                                variableIconAlarm.style.display = "block";
                                variableIconAlarm.style.color = "rgb(196,193,193)";
                            }
                            else {
                                variableIconAlarm.style.color = "#303030";
                            }
                        }
                    }
                }
                if (boolAlarm) {
                    RingAlarmSound();
                    document.getElementById("dashboardTable").classList.add("alarmTriggerPageTitle");
                    document.getElementById("pageTitle").classList.add("alarmTriggerPageTitle");
                    document.getElementById("dashboardHeader").classList.add("alarmTriggerDashboardHeader");
                    document.getElementById("panelId").classList.add("panelAlarmShow");
                }
                else {
                    document.getElementById("dashboardTable").classList.remove("alarmTriggerPageTitle");
                    document.getElementById("pageTitle").classList.remove("alarmTriggerPageTitle");
                    document.getElementById("dashboardHeader").classList.remove("alarmTriggerDashboardHeader");
                    document.getElementById("panelId").classList.remove("panelAlarmShow");
                }
            }
        }
    });
}

function checkGraphsValuesForLimits(id, panelId) {
    //check if component Graph has 1 or more COdition if it has, reload that graph with the new Values;
    var id = id.innerText;
    var multi;
    var constant;
    var newValue;

    $.ajax({
        type: "GET",
        url: "/Dashboard/CheckIfComponentHasOtherLimits",
        data: { id: id, panelId: panelId },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            for (var counterElements = 0; response.length > counterElements; counterElements++) {
                /*<idVariable>;<alarmId-alarmId>*/
                var idVariable = response[counterElements].split(";")[0];
                var value = response[counterElements].split(";")[1];

                if (value != "") {
                    value = value.split("-");

                    if (document.getElementById(idVariable + "_type").innerHTML == "GRAPHIC") {
                        multi = parseFloat(document.getElementById("multiID" + idVariable).innerHTML);
                        constant = parseFloat(document.getElementById("constant" + idVariable).innerHTML);

                        for (var counter = 0; value.length > counter; counter++) {
                            newValue = (parseFloat(value[counter]) * multi) + constant;
                            value[counter] = newValue;
                        }
                        CheckIfGraphLimit(value, idVariable);
                    }
                }
            }
        }
    });
}

function RemoveClassAlarmRinging() {
    var divs = document.getElementsByClassName("divAlarmRinging");
    while (divs.length > 0) {
        divs[0].classList.remove("divAlarmRinging");
    }
}

function inputDivTrigger(id) {

    var type = document.getElementById(id + "_type").innerHTML;
    var variableDiv = document.getElementById("id" + id);
    switch (type) {

        case "SEMAPHORE":
            variableDiv.parentElement.classList.add("divAlarmRinging");
            break;
        case "GAUGE":
            variableDiv.parentElement.parentElement.classList.add("divAlarmRinging");
            break;
        case "GRAPHIC":
            variableDiv.parentElement.classList.add("divAlarmRinging");
            break;
        case "TEXT":
            variableDiv.parentElement.classList.add("divAlarmRinging");
            break;
        case "DIGITAL":
            variableDiv.parentElement.classList.add("divAlarmRinging");
            break;
        case "VERTICAL":
            variableDiv.parentElement.classList.add("divAlarmRinging");
            break;
    }
}

function ShowLabelDivTable() {
    var divs = document.getElementsByClassName("labelEmptyTable");
    for (var counter = 0; divs.length > counter; counter++) {
        if (divs[counter].style.display == "none" || divs[counter].style.display == "") {
            divs[counter].style.display = "flex";
        }
        else {
            divs[counter].style.display = "none";
        }
    }
}

function hideLabelOnRemove() {
    var divs = document.getElementsByClassName("labelEmptyTable");
    for (var counter = 0; divs.length > counter; counter++) {
        divs[counter].style.display = "none";
    }
}

function inputLabelDivTable(td) {
    var number = td.id.split("_")[1];
    var label = document.createElement("label");
    label.className = "labelEmptyTable";
    label.style.display = "flex";
    label.innerHTML = number;
    td.appendChild(label);
}

function addZoomOfTable() {
    var table = document.getElementById("table");
    var zoomTable = document.getElementById("zoomTable").value;
    zoomTable = parseFloat(zoomTable) + 0.1;
    table.style.zoom = zoomTable;

    document.getElementById("zoomTable").value = zoomTable;
    ReprintTable();
}

function subtractZoomOfTable() {
    var table = document.getElementById("table");
    var zoomTable = document.getElementById("zoomTable").value;
    zoomTable = parseFloat(zoomTable) - 0.1;
    table.style.zoom = zoomTable;

    document.getElementById("zoomTable").value = zoomTable;
    ReprintTable();
}

function addHistoricValues(variable, timeDuration) {

    $.ajax({
        type: "GET",
        url: "/Dashboard/ReturnHistoricValues",
        data: { variables: variable, timeDuration: timeDuration },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            var result = msg.responseJSON;
            //id;majorData;max_subkey;Size;countEvent;SUM
            return result;

            for (var counter2 = 0; result.length > counter2; counter2++) {
                variableValue = result[counter2].split(";");
                //id;majorData;max_subkey;Size;countEvent;SUM
                multiplicator = returnMultiplicatorComponent(variableValue[0]);
                constant = returnConstantComponent(variableValue[0]);

                if (variableValue[3] === "minor") {
                    component = document.getElementById("minHistoric_" + variableValue[0]);
                    if (component != null) {
                        component.title = "Menor valor, ocorrido pela última vez em: " + variableValue[1];
                        value = Math.round(parseFloat(variableValue[2]) * 100) / 100;
                        value = (value * multiplicator) + constant;
                        value = Math.round(value);
                        component.innerHTML = value;
                    }
                }
                else if (variableValue[3] === "major") {
                    component = document.getElementById("maxHistoric_" + variableValue[0]);
                    if (component != null) {
                        component.title = "Maior Valor, ocorrido pela última vez em: " + variableValue[1];
                        value = Math.round(parseFloat(variableValue[2]) * 100) / 100;
                        value = (value * multiplicator) + constant;
                        value = Math.round(value);
                        component.innerHTML = value;
                    }
                }
                //UPDATE ALL VALUES;
            }
        }
    });
}

function addNewHistoricValues(variables, timeDuration, constant, multiplicator) {
    timeDuration = timeDuration.split(" ");
    if (timeDuration.length > 1) {
        timeDuration = timeDuration[0];
    }
    else {
        timeDuration = 1;
    }


    if (constant == "") {
        constant = 0;
    }
    if (multiplicator == "") {
        multiplicator = 0;
    }

    $.ajax({
        type: "GET",
        url: "/Dashboard/ReturnHistoricValues",
        data: { variables: variables, timeDuration: timeDuration },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            var result = msg.responseJSON;

            for (var counter2 = 0; result.length > counter2; counter2++) {
                variableValue = result[counter2].split(";");
                //id;majorData;max_subkey;Size;countEvent;SUM
                multiplicator = returnMultiplicatorComponent(variableValue[0]);
                constant = returnConstantComponent(variableValue[0]);

                if (variableValue[3] === "minor") {
                    component = document.getElementById("minHistoric_" + variableValue[0]);
                    if (component != null) {
                        component.title = "Menor valor, ocorrido pela última vez em: " + variableValue[1];
                        value = Math.round(parseFloat(variableValue[2]) * 100) / 100;
                        value = (value * multiplicator) + constant;
                        value = Math.round(value);
                        component.innerHTML = value;
                    }
                }
                else if (variableValue[3] === "major") {
                    component = document.getElementById("maxHistoric_" + variableValue[0]);
                    if (component != null) {
                        component.title = "Maior Valor, ocorrido pela última vez em: " + variableValue[1];
                        value = Math.round(parseFloat(variableValue[2]) * 100) / 100;
                        value = (value * multiplicator) + constant;
                        value = Math.round(value);
                        component.innerHTML = value;
                    }
                }
                //UPDATE ALL VALUES;
            }
        }
    });
}

function addHistoricValuesAcomulative(variable, timeDuration) {

    $.ajax({
        type: "GET",
        url: "/Dashboard/ReturnHistoricValuesAcomulative",
        data: { variables: variable, timeDuration: timeDuration },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            var result = msg.responseJSON;
            return result;

            for (var counter2 = 0; result.length > counter2; counter2++) {
                variableValue = result[counter2].split(";");

                constant = returnConstantComponent(variableValue[0]);
                multiplicator = returnMultiplicatorComponent(variableValue[0]);

                if (variableValue[1] != "0") {
                    //variable;acomulative;average;counterAlarm

                    component = document.getElementById("acomulativeHistoric_" + variableValue[0]);
                    if (component != null) {
                        component.title = "Valor acumulado dentro do tempo estipulado";

                        value = Math.round(parseFloat(variableValue[1]) * 100) / 100;
                        value = (value * multiplicator) + constant;
                        value = Math.round(value * 100) / 100;

                        if (parseInt(value).toString().length > 5) {
                            exponentialValue = parseInt(value).toString().length - 1;

                            exponential = 1;
                            for (var counterExp = 0; counterExp < parseInt(value).toString().length - 1; counterExp++) {
                                exponential = exponential * 10;
                            }

                            value = parseInt(value) / exponential;
                            value = Math.round(value * 100) / 100;

                            value = value + " x10 <sup>" + exponentialValue + "</sup>";
                            component.innerHTML = value;
                        }
                        else {
                            component.innerHTML = value;
                        }
                    }
                }
                if (variableValue[2] != "0") {
                    component = document.getElementById("averageHistoric_" + variableValue[0]);
                    if (component != null) {
                        component.title = "Média do valor acumulado dentro do tempo estipulado";
                        value = Math.round(parseFloat(variableValue[2]) * 100) / 100;
                        value = (value * multiplicator) + constant;
                        value = Math.round(value);
                        component.innerHTML = value;
                    }
                }
                if (variableValue[3] != "0") {
                    component = document.getElementById("eventHistoric_" + variableValue[0]);
                    if (component != null) {
                        component.title = "Numero de vezes em que o alarme tocou dentro do tempo estipulado";
                        value = Math.round(parseFloat(variableValue[3]) * 100) / 100;
                        component.innerHTML = value;
                    }
                }
            }
        }
    });
}

function addNewHistoricValuesAcomulative(variables, timeDuration, constant, multiplicator) {
    timeDuration = timeDuration.split(" ");
    if (timeDuration.length > 1) {
        timeDuration = timeDuration[0];
    }
    else {
        timeDuration = 1;
    }

    if (constant == "") {
        constant = 0;
    }
    if (multiplicator == "") {
        multiplicator = 0;
    }

    $.ajax({
        type: "GET",
        url: "/Dashboard/ReturnHistoricValuesAcomulative",
        data: { variables: variables, timeDuration: timeDuration },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            var result = msg.responseJSON;

            for (var counter2 = 0; result.length > counter2; counter2++) {
                variableValue = result[counter2].split(";");

                constant = returnConstantComponent(variableValue[0]);
                multiplicator = returnMultiplicatorComponent(variableValue[0]);


                if (variableValue[1] != "0") {
                    //variable;acomulative;average;counterAlarm
                    component = document.getElementById("acomulativeHistoric_" + variableValue[0]);
                    if (component != null) {
                        component.title = "Valor acumulado dentro do tempo estipulado";
                        value = Math.round(parseFloat(variableValue[1]) * 100) / 100;
                        value = (value * multiplicator) + constant;
                        value = Math.round(value);
                        component.innerHTML = value;
                    }
                }
                if (variableValue[2] != "0") {
                    component = document.getElementById("averageHistoric_" + variableValue[0]);
                    if (component != null) {
                        component.title = "Média do valor acumulado dentro do tempo estipulado";
                        value = Math.round(parseFloat(variableValue[2]) * 100) / 100;
                        value = (value * multiplicator) + constant;
                        value = Math.round(value);
                        component.innerHTML = value;
                    }
                }
                if (variableValue[3] != "0") {
                    component = document.getElementById("eventHistoric_" + variableValue[0]);
                    if (component != null) {
                        component.title = "Numero de vezes em que o alarme tocou dentro do tempo estipulado";
                        value = Math.round(parseFloat(variableValue[3]) * 100) / 100;
                        component.innerHTML = value;
                    }
                }
                //UPDATE ALL VALUES;
            }
        }
    });

}

function showHistoricValuesDashboard(variable, position, timeDuration, constant, multiplicator, name) {
    if (constant == "") {
        constant = 0;
    }
    if (multiplicator == "") {
        multiplicator = 1;
    }

    var div = document.getElementById("historicValues");
    div.style.display = "block";

    var divPosition = div.getBoundingClientRect();

    var body = document.body.getBoundingClientRect();
    var positionXY = position.getBoundingClientRect()

    div.style.top = (positionXY.top - body.top) + "px";
    div.style.left = (positionXY.left + ((positionXY.width / 2) - (divPosition.width / 2))) + "px";

    transferHistoricValues(variable, timeDuration, constant, multiplicator, name);
}

function transferHistoricValues(variable, timeDuration, constant, multiplicator, name) {
    timeDuration = timeDuration.split(" ");
    if (timeDuration.length > 1) {
        timeDuration = timeDuration[0];
    }
    else if (timeDuration.length == 1) {
        timeDuration = timeDuration[0];
    }
    else {
        timeDuration = 1;
    }

    var array;
    var acomulative;
    var average;
    var counterAlarm;
    var result;
    var min;
    var max;

    $.ajax({
        type: "GET",
        url: "/Dashboard/ReturnHistoricValuesAcomulative",
        data: { variables: variable, timeDuration: timeDuration },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            //variable;acomulative;average;counterAlarm
            result = msg.responseJSON[0];
            result = result.split(";");

            acomulative = parseFloat(result[1]) * parseFloat(multiplicator);
            acomulative = acomulative + parseFloat(constant);
            average = parseFloat(result[2]) * parseFloat(multiplicator);
            average = average + parseFloat(constant);
            counterAlarm = parseInt(result[3]);

            acomulative = Math.round(acomulative * 100) / 100;
            average = Math.round(average * 100) / 100;

            //acomulative -> exponential
            if (parseInt(acomulative).toString().length > 5) {
                var exponential;
                var exponentialValue;

                exponentialValue = parseInt(acomulative).toString().length - 1;

                exponential = 1;
                for (var counterExp = 0; counterExp < parseInt(acomulative).toString().length - 1; counterExp++) {
                    exponential = exponential * 10;
                }
                acomulative = parseInt(acomulative) / exponential;
                acomulative = Math.round(acomulative * 100) / 100;

                acomulative = acomulative + " x10 <sup>" + exponentialValue + "</sup>";
                document.getElementById("acomulativeHistoricDiv").innerHTML = acomulative;
            }
            else {
                document.getElementById("acomulativeHistoricDiv").innerHTML = acomulative;
            }

            document.getElementById("eventHistoricDiv").innerHTML = counterAlarm;
            document.getElementById("averageHistoricDiv").innerHTML = average;
            if (timeDuration > 1) {
                document.getElementById("componentNameHistoric").innerHTML = name + " - " + timeDuration + " dias";
            }
            else {
                document.getElementById("componentNameHistoric").innerHTML = name + " - " + timeDuration + " dia";
            }
        }
    });

    $.ajax({
        type: "GET",
        url: "/Dashboard/ReturnHistoricValues",
        data: { variables: variable, timeDuration: timeDuration },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            var result = msg.responseJSON;
            for (var counter = 0; result.length > counter; counter++) {
                //id;majorData;max_subkey;Size;countEvent;SUM

                array = result[counter];
                array = array.split(";");

                if (array[3] === "minor") {
                    min = parseFloat(array[2]) * parseFloat(multiplicator);
                    min = min + constant;
                    min = Math.round(parseFloat(min) * 100) / 100;

                    document.getElementById("minHistoricDiv").innerHTML = min;
                    document.getElementById("minHistoricDiv").title = "Menor valor, ocorrido pela última vez em: " + array[1];
                }
                else if (array[3] === "major") {
                    max = parseFloat(array[2]) * parseFloat(multiplicator);
                    max = max + constant;
                    max = Math.round(parseFloat(max) * 100) / 100;

                    document.getElementById("maxHistoricDiv").innerHTML = max;
                    document.getElementById("maxHistoricDiv").title = "Maior Valor, ocorrido pela última vez em: " + array[1];
                }
            }

        }
    });

    document.getElementById("maxHistoricDiv").innerHTML = max;
    document.getElementById("minHistoricDiv").innerHTML = min;
}

function closeHistoricDash() {
    var div = document.getElementById("historicValues");
    div.style.display = "none";
}

function returnMultiplicatorComponent(variableValue) {
    var type = document.getElementById(variableValue + "_type").innerHTML;
    var multiplicator;

    switch (type) {
        case "SEMAPHORE":
            multiplicator = document.getElementById(variableValue + "_multi").innerHTML;
            break;
        case "GAUGE":
            multiplicator = document.getElementById("multi" + variableValue).innerHTML;
            break;
        case "GRAPHIC":
            multiplicator = document.getElementById("multiID" + variableValue).innerHTML;
            break;
        case "TEXT":
            multiplicator = document.getElementById("multiplicator_" + variableValue).innerHTML;
            break;
        case "DIGITAL":
            multiplicator = document.getElementById(variableValue + "_multi").innerHTML;
            break;
        case "VERTICAL":
            multiplicator = document.getElementById("multiplicator_" + variableValue).innerHTML;
            break;
    }
    if (multiplicator == "") {
        multiplicator = 1;
    }
    multiplicator = parseFloat(multiplicator);
    return multiplicator;
}

function returnConstantComponent(variableValue) {
    var type = document.getElementById(variableValue + "_type").innerHTML;
    var constant;

    switch (type) {
        case "SEMAPHORE":
            constant = document.getElementById(variableValue + "_constant").innerHTML;
            break;
        case "GAUGE":
            constant = document.getElementById("costant" + variableValue).innerHTML;
            break;
        case "GRAPHIC":
            constant = document.getElementById("constant" + variableValue).innerHTML;
            break;
        case "TEXT":
            constant = document.getElementById("constant_" + variableValue).innerHTML;
            break;
        case "DIGITAL":
            constant = document.getElementById(variableValue + "_constant").innerHTML;
            break;
        case "VERTICAL":
            constant = document.getElementById("constant_" + variableValue).innerHTML;
            break;
    }
    if (constant == "") {
        constant = 0;
    }
    constant = parseFloat(constant);
    return constant;
}

function addTimeDuration(cell, idVariable, timeDuration) {
    var span = document.createElement("SPAN");
    span.id = idVariable + "_durationComp";
    span.innerHTML = timeDuration;
    span.classList.add("minMaxComponent");
    cell.appendChild(span);
}


