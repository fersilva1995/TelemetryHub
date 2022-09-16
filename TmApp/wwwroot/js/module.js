function GetModules() {

    var moduleComboBox = document.getElementById("modules");
    moduleComboBox.options.length = 0;
    var id = document.getElementById("userId").innerText;
    var telemetry = document.getElementById("telemetry");
    var idTelemetry = telemetry.options[telemetry.selectedIndex].value;

    $.ajax({
        type: "GET",
        url: "/Dashboard/GetModules",
        data: { id: id, idTelemetry: idTelemetry },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            for (var i = 0; i < msg.responseJSON.length; i++) {

                var module = msg.responseJSON[i];
                var element = document.createElement("option")
                element.value = module.id;
                element.text = module.description;
                moduleComboBox.add(element, moduleComboBox[0]);

            }
            jQuery('#modules').trigger('change');
        }
    })
}


function GetModulesData(moduleId, variableId) {

    var moduleComboBox = document.getElementById("modules");
    moduleComboBox.options.length = 0;
    var id = document.getElementById("userId").innerText;
    var telemetry = document.getElementById("telemetry");
    var idTelemetry = telemetry.options[telemetry.selectedIndex].value;

    $.ajax({
        type: "GET",
        url: "/Dashboard/GetModules",
        data: { id: id, idTelemetry: idTelemetry },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {

            for (var i = 0; i < msg.responseJSON.length; i++) {

                var module = msg.responseJSON[i];
                var element = document.createElement("option")
                element.value = module.id;
                element.text = module.description;
                moduleComboBox.add(element, moduleComboBox[0]);
            }

            moduleComboBox.value = moduleId;
            GetVariablesData(variableId);
        }
    });
}



function checkModulesStatus(panelId) {

    if (panelId != undefined)
    {
        panelId = panelId;
        var results;
        var result
        var boolData = false;
        var variables = "";

        $.ajax({
            type: "GET",
            url: "/Dashboard/UpdateModuleStatus",
            data: { id: panelId },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            complete: function (msg) {
                results = msg.responseJSON;
                for (var counter = 0; results.length > counter; counter++) {
                    result = results[counter].split("-");

                    boolData = result[1];
                    variables = result[0].split(",");

                    for (var counter2 = 0; variables.length > counter2; counter2++) {
                        ShowHideDiv(variables[counter2], boolData);
                    }
                }
            }
        });
    }
}

