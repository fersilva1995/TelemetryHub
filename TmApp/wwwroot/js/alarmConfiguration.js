function EditAlarm(idAlarm) {

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    var smtpServer = document.getElementById("smtpServer").value;
    var smtpPort = document.getElementById("smtpPort").value;
    var sendEmail = document.getElementById("sendEmail").value;
    var emailPassword = document.getElementById("emailPassword").value;
    var targetEmail = document.getElementById("targetEmail").value;
    var user = document.getElementById("users");
    var userId = user.options[user.selectedIndex].value;

    var smsCheck = document.getElementById("smsChecker").checked;
    var targetTelephone = document.getElementById("phoneNumbers").value;

    $.ajax({
        url: "/AlarmConfiguration/Edit",
        type: 'POST',
        data: {
            __RequestVerificationToken: token,
            smtpServer: smtpServer,
            smtpPort: smtpPort,
            sendEmail: sendEmail,
            emailPassword: emailPassword,
            targetEmail: targetEmail,
            userId: userId,
            smsCheck: smsCheck,
            targetTelephone: targetTelephone
        },
        success: function (data) {
            window.location.href = "/AlarmConfiguration/Index/" + idAlarm;
        }
    });
    return false;
}

function GetUserInfo() {

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    var user = document.getElementById("users");
    var userId = user.options[user.selectedIndex].value;

    $.ajax({
        type: "GET",
        url: "/AlarmConfiguration/GetUserInfo",
        data: { userId: userId },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response.success) {
                document.getElementById("smtpServer").value = response.alarmInfo.smtpServer;
                document.getElementById("smtpPort").value = response.alarmInfo.smtpPort;
                document.getElementById("sendEmail").value = response.alarmInfo.originEmail;
                document.getElementById("emailPassword").value = response.alarmInfo.password;
                document.getElementById("targetEmail").value = response.alarmInfo.targetEmail;
                document.getElementById("phoneNumbers").value = response.alarmInfo.targetTelephone;
                document.getElementById("smsChecker").checked = response.alarmInfo.smsCheck;

                document.getElementById("alarmInfo").style.removeProperty('display');
                document.getElementById("saveButton").style.removeProperty('display');
            } else {

                alert("USUARIO INVALIDO");
                window.location.href = "/Login/Login";
            }
        },
        error: function (response) {
            alert("FALHA AO CARREGAR COMPONENTES!");
            window.location.href = "/Login/Login";
        }
    });
}

function Not_Char(value)
{
    var lastValue = value[value.length - 1];
    if (lastValue != ";"){
        if (lastValue != "-") {
            lastValue = lastValue.replace(/\D/g, "");
        }
    }
    value = value.substring(0, value.length - 1);
    value = value + lastValue;

    document.getElementById("phoneNumbers").value = value;
}