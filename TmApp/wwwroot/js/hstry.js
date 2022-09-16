function GetHistory() {

    var component = document.getElementById("component");
    var id = component.options[component.selectedIndex].value;
    var history = document.getElementById("recordHistory")


    $.ajax({
        type: "GET",
        url: "/Dashboard/GetHistory",
        data: { id: id },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            $("#recordHistory").prop("checked", msg.responseJSON.recordData);

        }
    })

}

function SetHistory() {

    var component = document.getElementById("component");
    var id = component.options[component.selectedIndex].value;

    $.ajax({
        type: "GET",
        url: "/Dashboard/SetHistory",
        data: { id: id },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {

        }
    })
}

function GetHistoryData() {

    var component = document.getElementById("component");
    var id = component.options[component.selectedIndex].value;

    var endDay = document.getElementById("dayEnd").value;
    var endMonth = document.getElementById("monthEnd").value;
    var endYear = document.getElementById("yearEnd").value;
    var startDay = document.getElementById("dayStart").value;
    var startMonth = document.getElementById("monthStart").value;
    var startYear = document.getElementById("yearStart").value;


    var startHour = document.getElementById("hourStart").value;
    var startMinute = document.getElementById("minuteStart").value;
    var startSecond = document.getElementById("secondsStart").value;

    var endHour = document.getElementById("hourEnd").value;
    var endMinute = document.getElementById("minuteEnd").value;
    var endSecond = document.getElementById("secondsEnd").value;


    if (startDay.length == 1) {
        startDay = "0" + startDay;
    }
    if (endDay.length == 1) {
        endDay = "0" + endDay;
    }

    var startDate = startYear + "-" + startMonth + "-" + startDay;
    var endDate = endYear + "-" + endMonth + "-" + endDay;

    if (HistoryValidator(component, startDate, endDate)) {
        //loading signals
        document.getElementById("cssload-contain").style.position = "fixed";
        document.getElementById("loadingIcon").style.display = "block";
        document.getElementById("warning_text").style.display = "block";

        $.ajax({
            url: "/History/GetHistory",
            type: 'GET',
            data: {
                id: id,
                startDate: startDate,
                //startTime: startTime,
                endDate: endDate,
                //endTime: endTime,
                endDay: endDay,
                endMonth: endMonth,
                endYear: endYear,
                startDay: startDay,
                startMonth: startMonth,
                startYear: startYear,

                startHour: startHour,
                startMinute: startMinute,
                startSecond: startSecond,
                endHour: endHour,
                endMinute: endMinute,
                endSecond: endSecond
            },
            success: function (response) {
                if (response.success) {
                    window.location.href = "/History/Index";
                }
                else {
                    alert("FALHA AO CARREGAR HISTORICO!");
                }

            },

            error: function (response) {
                alert("FALHA AO CARREGAR COMPONENTES!");
                window.location.href = "/Login/Login";
            }

        });
    }
    else {
        alert("Preencha todos os campos corretamente do histórico");
    }
}

function InitializeVariantGraphic() {
    var table = document.getElementById("tableHistory");
    var graphic = document.getElementById("graphic");

    while (graphic.firstChild) {
        graphic.removeChild(graphic.firstChild);
    }

    SetVariantGraphic();

    table.style.display = 'none';
    graphic.style.display = 'block';
}


function SetVariantGraphic() {
    $.ajax({
        type: "GET",
        url: "/History/SetVariantGraphic",
        data: {},
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            createHistoryGraph(msg.responseJSON.min, msg.responseJSON.max, "graphic", msg.responseJSON.data);
            document.getElementById("graphicLoading").style.display = "none";
        }
    });
}


function InitializeLinearGraphic() {

    var table = document.getElementById("tableHistory");
    var graphic = document.getElementById("graphic");
    var label = document.getElementById("graphicLoading");
    label.style.display = "block";

    while (graphic.firstChild) {
        graphic.removeChild(graphic.firstChild);
    }

    SetLinearGraphic();

    table.style.display = 'none';
    graphic.style.display = 'block';
}

function SetLinearGraphic() {
    $.ajax({
        type: "GET",
        url: "/History/SetLinearGraphic",
        data: {},
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            createHistoryGraph(msg.responseJSON.min, msg.responseJSON.max, "graphic", msg.responseJSON.data);
        }
    });
}

function InitializeTable() {
    var table = document.getElementById("tableHistory");
    var graphic = document.getElementById("graphic");

    graphic.style.display = 'none';
    table.style.display = '';
}


function ShowLoadingLinear() {
    var table = document.getElementById("tableHistory");
    var graphic = document.getElementById("graphic");

    while (graphic.firstChild) {
        graphic.removeChild(graphic.firstChild);
    }
    document.getElementById("graphicLoading").style.display = 'block';

    SetVariantGraphic();
    table.style.display = 'none';
    graphic.style.display = 'block';
}