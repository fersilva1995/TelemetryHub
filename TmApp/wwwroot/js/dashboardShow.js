function StartDashboardShow() {
    ShowLoading();

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    var userId = document.getElementById("user").value;
    var panelId = document.getElementById("panelId");
    var user = document.getElementById("userId");
    var configuration = document.getElementById("configuration");
    var dashboardTable = document.getElementById("dashboardTable");
    var selectPainel = document.getElementById("selectPainelIcon");
    var ownerPanel = document.getElementById("pageOwner");

    $.ajax({
        type: "GET",
        url: "/DashboardShow/Start",
        data: { userId: userId },
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        sucess: function (data) {
            if (data.responseJSON.panelId != 0) {

                hideLoading();
                configuration.style.display = "none";
                dashboardTable.removeAttribute("display");

                pageTitle.innerHTML = data.panelName;
                panelId.innerHTML = data.panelId;
                selectPainel.href = '/DashBoard/DashBoard/' + data.responseJSON.panelId + '})';

                TableStart();
                InitializeDashboard(user, panelId);
                RefreshVariableValues();

                timer = setInterval(function () {
                    Update();

                }, 1000);
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
            if (data.responseJSON.panelId != 0) {

                hideLoading();
                FullscreenShow();
                configuration.style.display = "none";
                dashboardTable.style.removeProperty("display");

                pageTitle.innerHTML = data.responseJSON.panelName;
                panelId.innerHTML = data.responseJSON.panelId;
                ownerPanel.innerHTML = data.responseJSON.ownerName;
                selectPainel.href = "/DashBoard/DashBoard/" + data.responseJSON.panelId;

                TableStart();
                InitializeDashboard(user, panelId);
                RefreshVariableValues();

                timer = setInterval(function () {
                    Update();
                }, 1000);
            }
            else {
                changeAlarmLabel("Nenhum Painel encontrado");
            }
        }
    })
}


function Update() {
    RefreshVariableValues();

    var userId = document.getElementById("userId");
    var panelId = document.getElementById("panelId");
    var pageTitle = document.getElementById("pageTitle");
    var selectPainel = document.getElementById("selectPainelIcon");
    var formerIdPanel = document.getElementById("panelId").innerHTML;
    var ownerPanel = document.getElementById("pageOwner");

    IconChecker(userId.innerHTML, panelId.innerHTML);

    var dashboardTime = document.getElementById("dashBoardTime").value;
    var counter = document.getElementById("counter").innerText;

    if (dashboardTime === counter) {

        $.ajax({
            url: "/DashboardShow/RefreshDashboard",
            type: 'GET',
            success: function (data) {
                if (formerIdPanel == data.panelId) {
                    counter = 0;
                    document.getElementById("counter").innerText = counter;
                }

                pageTitle.innerHTML = data.panelName;
                panelId.innerHTML = data.panelId;

                RemoveTableComponents()
                panelId = document.getElementById("panelId");
                selectPainel.href = "/DashBoard/DashBoard/" + data.panelId;
                ownerPanel.innerHTML = data.ownerName;
                TableStart();
                InitializeDashboard(userId, panelId);
                RefreshVariableValues();

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

function Exit() {
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

    window.location.href = "/DashboardShow/Index";
}

function FullscreenShow() {
    var elem = document.documentElement;

    topMenu = document.getElementById("topMenu");
    menu = document.getElementById("menu");
    body = document.getElementById("body");


    $('#body').attr('style', 'margin-left: 0px !important');
    topMenu.style.display = "none";
    menu.style.display = "none";
    document.body.style.overflow = 'hidden';


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