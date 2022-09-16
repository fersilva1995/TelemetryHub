
function CreateTelemetry() {

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    var nameValue = document.getElementById("name").value;
    var serialNumberValue = document.getElementById("serialNumber").value;
    var ipApu = document.getElementById("ipApu").value;
    var description1Value = document.getElementById("description1").value;
    var description2Value = document.getElementById("description2").value;
    var description3Value = document.getElementById("description3").value;
    var description4Value = document.getElementById("description4").value;
    var userId = document.getElementById("user").value;

    var bool = true;
    if (serialNumberValue == "") {
        bool = false;
    }
    if (nameValue == "") {
        bool = false;
    }   


    if (bool) {
        $.ajax({
            url: $('#createButton').data('url'),
            type: 'POST',
            data: {
                __RequestVerificationToken: token,
                name: nameValue,
                serialNumber: serialNumberValue,
                ipApu: ipApu,
                description1: description1Value,
                description2: description2Value,
                description3: description3Value,
                description4: description4Value,
                userId: userId
            },
            success: function (data) {
                window.location.href = data;
            }
        });
    }
    else {
        changeAlarmLabel("Preencha Todos os Campos Principais");
    }

    return false;
}

function EditTelemetry() {

    ShowLoading();

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();
    var id = document.getElementById("telemetryId").innerText;
    var nameValue = document.getElementById("name").value;
    var ipApu = document.getElementById("ipApu").value;
    var description1Value = document.getElementById("description1").value;
    var description2Value = document.getElementById("description2").value;
    var description3Value = document.getElementById("description3").value;
    var description4Value = document.getElementById("description4").value;


    $.ajax({
        url: $('#editButton').data('url'),
        type: 'POST',
        data: {
            __RequestVerificationToken: token,
            id: id,
            name: nameValue,
            ipAPu: ipApu,
            description1: description1Value,
            description2: description2Value,
            description3: description3Value,
            description4: description4Value
        },
        complete: function (data) {
            hideLoading();
            changeAlarmLabel("Sucesso na Edição!");
        },
        success: function (data) {
            hideLoading();
            changeAlarmLabel("Sucesso na Edição!");
        }
    });

    hideLoading();
    return false;
}

function DeleteTelemetry() {

    ShowLoading();
    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();
    var id = document.getElementById("telemetryId").innerText;

    $.ajax({
        url: $('#deleteButton').data('url'),
        type: 'POST',
        data: {
            __RequestVerificationToken: token,
            idValue: id
        },
        success: function (data) {
            hideLoading();
            window.location.href = data;
        }
    });
    return false;
}


function ReloadTelemetries() {
    $.ajax({
        type: "GET",
        url: "/Home/ReloadTelemetries",
        data: {},
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            $('#componentDiv').load(document.URL + ' #componentDiv');

        }
    });
}

function PaymentCheck() {
    var checker;
    $.ajax({
        type: "GET",
        url: "/Home/PaymentCheck",
        data: {},
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {
            checker = msg.responseJSON[0];
            if (checker == false) {
                $("#overlay").show();
                warningText.innerText = "Inadimplência Detectada";
                $('#warningModel').modal('show');
            }
        }
    });

    var idOverlay = document.getElementById("overlay");

    if (idOverlay == undefined) {

        var body = document.getElementsByTagName("BODY")[0];

        var div1 = document.createElement("div");
        div1.id = "overlay";
        body.appendChild(div1);
    }
}

function goBack() {
    window.history.back();
}

function ShowLoading() {
    //var div_loading = document.getElementById("loadingDiv");
    //div_loading.style.display = "block";
}

function hideLoading() {
    //var div_loading = document.getElementById("loadingDiv");
    //div_loading.style.display = "none";
}