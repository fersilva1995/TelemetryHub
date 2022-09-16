function GetVariables() {

    var variablesComboBox = document.getElementById("variables");
    variablesComboBox.options.length = 0;
    var module = document.getElementById("modules");
    var id = module.options[module.selectedIndex].value;

    id = parseInt(id);

    $.ajax({
        type: "GET",
        url: "/Dashboard/GetVariables",
        data: { id: id },
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        sucess: function (result) {
            debugger;
            alert(result);
        },
        error: function (response) {
            debugger;
            alert('Error occured');
        },
        complete: function (msg) {
            for (var counter = 0; counter < msg.responseJSON.length; counter++) {

                var variable = msg.responseJSON[counter];
                var element = document.createElement("option");
                element.value = variable.id;
                element.text = variable.aliasVariable;
                element.id = variable.name;
                variablesComboBox.add(element, variablesComboBox[0]);
            }
        }
    });
}

function GetVariablesData(variableId) {

    var variablesComboBox = document.getElementById("variables");
    variablesComboBox.options.length = 0;
    var module = document.getElementById("modules");
    var id = module.options[module.selectedIndex].value;


    $.ajax({
        type: "GET",
        url: "/Dashboard/GetVariables",
        data: { id: id },
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        sucess: function (result) {
            debugger;
            alert(result);
        },
        error: function (response) {
            debugger;
            alert('Error occured');
        },
        complete: function (msg) {
            for (var counter = 0; counter < msg.responseJSON.length; counter++) {

                var variable = msg.responseJSON[counter];
                var element = document.createElement("option");
                element.value = variable.id;
                element.text = variable.aliasVariable;
                element.id = variable.name;

                variablesComboBox.add(element, variablesComboBox[0]);

            }
            variablesComboBox.value = variableId;
        }
    });
}

function RefreshVariableValues() {
    var panelValue = document.getElementById("panelId").innerText;
    var type;

    $.ajax({
        type: "GET",
        url: "/Dashboard/RefreshVariableValues",
        data: { panelId: panelValue },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {

            for (var counter = 0; counter < msg.responseJSON.length; counter++) {

                var variable = msg.responseJSON[counter];


                type = document.getElementById(variable.id + "_type").innerText;

                switch (type) {
                    case "GAUGE":
                        insertValueToGauge(variable.value, variable.id);
                        break;
                    case "GRAPHIC":
                        InsertValueToGraph(variable.value, variable.id, variable.condition);
                        break;
                    case "TEXT":
                        insertValueToText(variable.value, variable.id);
                        break;
                    case "VERTICAL":
                        InsertValueToVertical(variable.value, variable.id);
                        break;
                    case "DIGITAL":
                        insertValueToDigitalIndicator(variable.value, variable.id);
                        break;
                    case "SEMAPHORE":
                        insertValueToSempaphoreIndicator(variable.value, variable.id);
                        break;
                    case "EXTEND GRAPHIC":
                        InsertValueToExtendedGraph(variable.data, variable.id);
                        break;
                    case "VARIANT GRAPHIC":
                        InsertValueToVariantGraph(variable.value, variable.id, variable.timeDuration, variable.now);
                        break;
                    case "AVERAGE GRAPHIC":
                        InsertValueToAverageGraph(variable.value, variable.id, variable.timeDuration, variable.now);
                    case "COMPARATIVE GRAPHIC":
                        InsertValueToComparativeGraph(variable.value, variable.id);
                        break;
                }
            }
        }
    });

}

function ChangeDigitalState(id) {

    var modal = document.getElementById("text");
    $.ajax({
        type: "GET",
        url: "/Dashboard/ChangeDigitalState",
        data: { id: id },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            modal.innerText = msg.responseJSON.returnValue;
            $('#myModel').modal('show');
        }
    });
}

function selectVariableFromModule(element) {

    var valueId = element[element.selectedIndex].value;
    var mainTable = document.getElementById("variablesNameValue");
    var title = document.getElementById("variableTitle");
    title.style.display = "none";

    var boolResult = true;

    while (mainTable.firstChild) {
        mainTable.removeChild(mainTable.firstChild);
    }
    var boolVariable = false;

    $.ajax({
        type: "GET",
        url: "/History/GetVariablesFromModule",
        data: { id: valueId },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            //add  row with nome da variavel e Valor dela        
            for (var counter = 0; counter < msg.responseJSON.length; counter++) {
                title.style.display = "block";
                var variable = msg.responseJSON[counter];

                if (variable.name != "") {
                    if (boolResult) {
                        CreateTableRowTexts2("Tipo", "Nome", mainTable, "");
                        boolResult = false;
                    }

                    CreateRowEditVariable2(variable.name, "text", variable.id, variable.aliasVariable, mainTable, "VariableId");
                    //CreateRowEditVariable(variable.name, "text", variable.id, variable.aliasVariable, variable.id +
                    //    "%", variable.percentage, "number", mainTable, "");

                    //document.getElementById(variable.id + "%").classList.add("PercentageId");

                    //document.getElementById(variable.id + "%").max = 250;
                    //document.getElementById(variable.id + "%").min = 0;

                    //document.getElementById(variable.id + "%").disabled = true;

                    if (variable.aliasVariable == "") {
                        document.getElementById(variable.id).classList.add("variableNickNameChanged");
                        document.getElementById(variable.id).innerHTML = variable.name;
                        document.getElementById(variable.id).value = variable.name;
                    }
                }
            }

            if (boolVariable) {
                alert("clicke em EDITAR" +
                    "\r\n " +
                    "Uma ou mais variável(eis) não possui apelido");
            }
        }
    });
}


function insertRowVariable(variable, mainTable, boolResult) {

    if (variable.name != "") {

        if (boolResult) {
            CreateTableRowTexts("Tipo", "Nome", "Variação(%)", mainTable, "");
            boolResult = false;
        }

        CreateRowEditVariable(variable.name, "text", variable.id, variable.aliasVariable, variable.id + "%", variable.percentage, "number", mainTable, "");

        document.getElementById(variable.id).classList.add("VariableId");
        document.getElementById(variable.id + "%").classList.add("PercentageId");

        document.getElementById(variable.id + "%").max = 250;
        document.getElementById(variable.id + "%").min = 0;

        if (variable.aliasVariable == "") {
            document.getElementById(variable.id).classList.add("variableNickNameChanged");
            document.getElementById(variable.id).innerHTML = variable.name;
            document.getElementById(variable.id).value = variable.name;
        }
    }
    return boolResult;
}


function ChangeVarialeAliasAndPercentage() {
    ///get variables, make a string or 2 arrays
    var variables = ";";
    var names = ";";
    var percentages = ";";

    var table = document.getElementById("variablesNameValue");
    var elements = table.getElementsByClassName("VariableId");

    for (var counter = 0; counter < elements.length; counter++) {

        variables = variables + elements[counter].id + ";";
        names = names + elements[counter].value + ";";
    }

    var module = document.getElementById("moduleOptions")
    var moduleId = module[module.selectedIndex].value;

    $.ajax({
        type: "GET",
        url: "/Home/ChangeVariableAlias",
        data: { names: names, variables: variables, moduleId: moduleId },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            if (msg.responseJSON) {
                changeAlarmLabel("Sucesso na Edição!");
                element = document.getElementById("moduleOptions");
                element.selectedIndex = 0;
                selectVariableFromModule(element);
            }
            else {
                changeAlarmLabel("Falha na Edição de Variança");
            }

        }
    });
}

function GetVariableType(idVariable) {

    $.ajax({
        type: "GET",
        url: "/Dashboard/GetVariablesType",
        data: { idVariable: idVariable },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            return msg;
        }
    });
}

function UpdateDashboardValues(id) {
    $.ajax({
        type: "GET",
        url: "/Dashboard/UpdateDashboardValues",
        data: { id: id },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {

        }
    });
}
