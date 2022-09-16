function getPassword() {
    var password = document.getElementById("password").value;

    $.ajax({
        type: "GET",
        url: "/TelemetryConfiguration/Configuration",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: {
            password: password         
        },
        complete: function (data) {
            
        },
        error: function (data) {

        },
    });


}