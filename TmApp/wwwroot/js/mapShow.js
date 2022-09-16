function StartMapShow() {
    ShowLoading();

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    var userId = document.getElementById("user").value;
    var panelId = document.getElementById("panelId");
    var user = document.getElementById("userId");
    var configuration = document.getElementById("configuration");
    var mapTable = document.getElementById("mapTable");
    var selectPainel = document.getElementById("selectPainelIcon");
    var ownerPanel = document.getElementById("pageOwner");

    $.ajax({
        type: "GET",
        url: "/MapsShow/Start",
        data: { userId: userId },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        sucess: function (data) {
            if (data.responseJSON.mapId != 0) {

                hideLoading();
                configuration.style.display = "none";
                mapTable.removeAttribute("display");

                pageTitle.innerHTML = data.responseJSON.mapName;
                panelId.innerHTML = data.responseJSON.mapId;
                ownerPanel.innerHTML = data.responseJSON.ownerName;
                selectPainel.href = "/Map/Map/" + data.responseJSON.mapId;

                initMap(data.responseJSON.mapId);
                //InitializeDashboard(user, panelId);
                //RefreshVariableValues();

                //timer = setInterval(function () {
                //    Update();

                //}, 1000);
            }
            else {
                changeAlarmLabel("Nenhum Painel encontrado");
            }
        },
        error: function (data) {
            hideLoading();
            alert("error");
        },
        complete: function (data) {
            if (data.responseJSON.mapId != 0) {

                hideLoading();
                FullscreenShow();
                configuration.style.display = "none";
                mapTable.style.removeProperty("display");

                pageTitle.innerHTML = data.responseJSON.mapName;
                panelId.innerHTML = data.responseJSON.mapId;
                ownerPanel.innerHTML = data.responseJSON.ownerName;
                selectPainel.href = "/Maps/Map/" + data.responseJSON.mapId;

                ExpandMapShow();
                LoadLayerMapLoad(data.responseJSON.mapId);
                initLayerSelection();

                initMap(data.responseJSON.mapId);




                timer = setInterval(function () {
                    UpdateShowMap();
                }, 1000);
            }
            else {
                changeAlarmLabel("Nenhum Painel encontrado");
            }
        }
    });
}


function UpdateShowMap() {
    var mapId = document.getElementById("panelId").innerHTML;
    RefreshMapVariableValues(mapId);
    refreshComponentOfMap();


    var userId = document.getElementById("user").value;
    var formerIdMap = document.getElementById("panelId").innerHTML;
    var user = document.getElementById("userId");
    var configuration = document.getElementById("configuration");
    var mapTable = document.getElementById("mapTable");
    var selectPainel = document.getElementById("selectPainelIcon");
    var ownerPanel = document.getElementById("pageOwner");


    var dashboardTime = document.getElementById("dashBoardTime").value;
    var counter = document.getElementById("counter").innerText;

    if (dashboardTime === counter) {

        $.ajax({
            url: "/MapsShow/RefreshMapShow",
            type: 'GET',
            success: function (data) {
                if (formerIdMap == data.mapId) {
                    counter = 0;
                    document.getElementById("counter").innerText = counter;
                }

                pageTitle.innerHTML = data.mapName;
                panelId.innerHTML = data.mapId;

                RemoveMapShow();
                removeLayerMapShow();
                panelId = document.getElementById("panelId");

                selectPainel.href = "/Maps/Map/" + data.mapId;
                ownerPanel.innerHTML = data.ownerName;
                LoadLayerMapLoad(data.mapId);
                initLayerSelection();


                switchMapShow();
                ChangeTimeValue("realTime");//set again in realTime



                initMap(data.mapId);
                counter = 0;
                document.getElementById("counter").innerText = counter;
            }
        });
    }
    else {
        counter = parseInt(counter) + 1;
        document.getElementById("counter").innerText = counter;
    }
}

function RemoveTableComponents() {
    var td = document.getElementById("table");
    while (td.firstChild) {
        td.removeChild(td.firstChild);
    }
}

function ExitMapShow() {
    ShowLoading();

    var elem = document.documentElement;

    topMenu = document.getElementById("topMenu");
    menu = document.getElementById("menu");
    body = document.getElementById("body");

    body.removeAttribute("marginLeft");
    topMenu.removeAttribute("display");
    menu.removeAttribute("display");
    document.body.style.overflow = 'visible';

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

    window.location.href = "/MapsShow/Index";
}


function ExpandMapShow() {
    document.getElementById("map").style.display = "block";
}

function LoadLayerMapLoad(id) {
    var layer;
    var mainDiv = document.getElementById("menuMainLayer");

    $.ajax({
        type: "GET",
        url: "/Maps/ReturnListOfLayerOfMap",
        data: { id: id },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (data) {
            var array = data.responseJSON;
            if (array.length > 0) {

                for (var counter = 0; array.length > counter; counter++) {
                    layer = array[counter];
                    var menu = document.createElement("menu");
                    menu.className = "checkedLayer";
                    menu.onclick = function () { alterMapLayerMenu(this, true) };
                    menu.value = layer[1] + "-" + layer[2];
                    mainDiv.appendChild(menu);

                    var input = document.createElement("input");
                    input.style.display = "none"
                    input.hidden = true;
                    input.id = "idLayer_" + layer[1];
                    input.value = layer[1] + "-" + layer[2];
                    menu.appendChild(input);
                }
            }
        }
    });
}

function initLayerSelection() {

    var notepad = document.getElementById("map");
    notepad.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        var ctxMenu = document.getElementById("ctxMenu");
        ctxMenu.style.display = "block";
        ctxMenu.style.left = (event.pageX - 10) + "px";
        ctxMenu.style.top = (event.pageY - 10) + "px";
    }, false);
    notepad.addEventListener("click", function (event) {
        var ctxMenu = document.getElementById("ctxMenu");
        ctxMenu.style.display = "";
        ctxMenu.style.left = "";
        ctxMenu.style.top = "";
    }, false);
}

function RemoveMapShow() {
    var map = document.getElementById("map");
    while (map.firstChild) {
        map.removeChild(map.firstChild);
    }

    removeLayerMapShow();
}

function removeLayerMapShow() {
    var menuMainLayer = document.getElementById("menuMainLayer");

    while (menuMainLayer.firstChild) {
        menuMainLayer.removeChild(menuMainLayer.firstChild);
    }

    var menu = document.createElement("menu");
    menu.title = "Padrão";
    menu.className = "checkedLayer";
    menu.onclick = function () { alterMapLayerMenu(this, true) };
    menuMainLayer.appendChild(menu);

    var input = document.createElement("input");
    input.id = "idLayer_standart";
    input.hidden = true;
    input.value = "Standart-Standart";
    menu.appendChild(input);
}

function switchMapShow() {
    let timer = document.getElementById("timeIdValue").value;

    if (timer != "realTime") {
        let mapSlider = document.getElementById("mapSlider");
        mapSlider.click();
    }
}