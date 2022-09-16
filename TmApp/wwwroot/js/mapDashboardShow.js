
function TransferDataToElement(componentId) {
    CleanMapsComponentOption(componentId);

    var name = "";
    //call an Ajax to get coponent
    $.ajax({
        type: "GET",
        url: "/Dashboard/GetComponentData",
        data: { id: componentId },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response.success) {
                var component = response.component;

                document.getElementById("edge1").value = component.edge1;
                document.getElementById("edge2").value = component.edge2;
                document.getElementById("color1").value = component.color1;
                document.getElementById("color2").value = component.color2;
                document.getElementById("color3").value = component.color3;
                document.getElementById("offText").value = component.subtitleOff;
                document.getElementById("onText").value = component.subtitleOn;
                document.getElementById("multiplicator").value = component.multiplicator;
                document.getElementById("constant").value = component.constant;
                document.getElementById("unit").value = component.unit;
                document.getElementById("min").value = component.minimun;
                document.getElementById("max").value = component.maximun;

                name = component.name;
                if (name.length > 3) {
                    name = name.substring(0, 2) + name[name.length - 1];
                }
                document.getElementById("name").value = name;

                TransferVariableToElement(component.variable.id);
                ImportOptionsMaps();
            }
        },
        error: function (response) {

        },
    });
    //get Variable details;
}

function TransferVariableToElement(id) {

    $.ajax({
        type: "GET",
        url: "/Maps/GetTelemetryModuleIdsFromVariable",
        data: { idVariable: id },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {


            var telemetry = document.getElementById("telemetry");
            telemetry.value = response.idRegisterTelemetry;

            GetModules();
            setTimeout(function () {
                var modules = document.getElementById("modules");
                modules.value = response.idModule;

                GetVariables();
                setTimeout(function () {
                    //do what you need here
                    var variables = document.getElementById("variables");
                    variables.value = response.idVariable;
                }, 500);

            }, 500);
        },
        error: function (response) {

        },
    });
}

function loadOptionsMaps()
{
    var div = document.getElementById("inputDivsMap");
    //div.style.top = height + "px";
    div.style.width = "234px";

    div = document.getElementById("mainMapConfig");
    div.style.display = "none";

    div = document.getElementById("importConfigBtn");
    div.style.display = "none";

    div = document.getElementById("mapAreaSave");
    div.style.display = "none";
}

function ImportOptionsMaps() {
    var mapDivPanels = document.getElementById("mapDivPanels");
    var asideBar = document.getElementById("asideBar");
    setTimeout(function () {
        if (asideBar.offsetWidth > 0) {
            if (mapDivPanels.style.display == "block") {
                mapDivPanels.style.display = "none";
            }
            else {
                mapDivPanels.style.display = "block";
            }
        }
        else {
            mapDivPanels.style.display = "none";
        }
    }, 500);
}

function filterIdVariableMap() {
    //Filter only options avaible with the variable Chosen.

    var id = '';
    var span = "";
    var idVariable = "";

    var variables = document.getElementById("variables").selectedIndex;
    variables = document.getElementById("variables")[variables].value;

    var panelComponentSpan = document.getElementsByClassName("panelComponentSpan");

    for (var counter = 0; panelComponentSpan.length > counter; counter++) {
        id = panelComponentSpan[counter].id;
        id = id.split("_")[1];

        if (id == variables) {
            panelComponentSpan[counter].parentElement.parentElement.style.backgroundColor = "grey";
            span = panelComponentSpan[counter].parentElement.parentElement.getElementsByClassName("arrowMapSpan");
            idVariable = panelComponentSpan[counter].parentElement.parentElement.id;
            span[0].childNodes[1].className = "arrowHover fas fa-check-circle";
            span[0].childNodes[1].title = "Importar Configurações";
            span[0].childNodes[1].style.color1 = "#343a40";
            span[0].childNodes[1].onclick = function () { TransferDataToElement(idVariable) };
        }
        else {
            panelComponentSpan[counter].parentElement.parentElement.style.backgroundColor = "#676e7a";            
            span = panelComponentSpan[counter].parentElement.parentElement.getElementsByClassName("arrowMapSpan");
            span[0].childNodes[1].className = "fas fa-info-circle infoIcon infoAlerIcon";
            span[0].childNodes[1].title = "Componente não possui à váriavel selecionado";
            span[0].childNodes[1].style.color1 = "firebrick";
            span[0].childNodes[1].onclick = function () { alert("elemento não correponde à variavel") };
        }
    }
}

function CleanMapsComponentOption(idComponent) {

    var list = document.getElementsByClassName("mapsRowComponents");
    //clear all
    for (var counter = 0; list.length > counter; counter++) {
        if (list[counter].tagName == "TR") {
            list[counter].classList.remove("mapsRowComponentsSelected");
        }
    }

    document.getElementById(idComponent).classList.add("mapsRowComponentsSelected");
    //select the other;
}