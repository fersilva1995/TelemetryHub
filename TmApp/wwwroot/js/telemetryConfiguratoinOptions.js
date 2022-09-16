function GetPassword() {
    var password = document.getElementById("password").value;

    $.ajax({
        type: "GET",
        url: "/TelemetryConfiguration/ConfigurationCheck/",
        data: {
            password: password
        },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (data) {
            if (data.responseJSON) {
                window.location.href = "/TelemetryConfiguration/Configuration";
            }
            else {
                window.location.href = "/Login/Login";
            }
        }
    });
}