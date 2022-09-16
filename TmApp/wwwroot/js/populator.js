function EnableTelemetry(Id) {

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    $.ajax({
        url: $('#enableButton').data('url'),
        type: 'POST',
        data: {
            __RequestVerificationToken: token,
            id: Id
        },
        success: function (data) {
            if (data.sucess) {
                window.location.href = data.url;
            }
            else {

            }


        }
    });
    return false;
}

function CreateSerialNumber() {

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    var serialNumber = document.getElementById("serialNumber").value;
    var description = document.getElementById("description").value;

    $.ajax({
        url: $('#createButton').data('url'),
        type: 'POST',
        data: {
            __RequestVerificationToken: token,
            serialNumber: serialNumber,
            description: description
        },
        success: function (data) {
            window.location.href = data;
        }
    });

    return false;
}

function EditSerialNumber() {
    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();
    var id = document.getElementById("serialNumberId").innerText;
    var description = document.getElementById("description").value;
    var sensibility = document.getElementById("Sensibility").value;
    var serialNumber = document.getElementById("textSerialNumber").value;

    $.ajax({
        url: "/Populator/Edit",
        type: 'POST',
        data: {
            __RequestVerificationToken: token,
            id: id,
            description: description,
            sensibility: sensibility,
            serialNumber: serialNumber
        },
        success: function (data) {
            window.location.href = data;
        }
    });

    return false;
}

function DeleteSerialNumber() {

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();
    var id = document.getElementById("serialNumberId").innerText;

    $.ajax({
        url: $('#deleteButton').data('url'),
        type: 'POST',
        data: {
            __RequestVerificationToken: token,
            idValue: id
        },
        success: function (data) {
            window.location.href = data;
        }
    });

    return false;
}

