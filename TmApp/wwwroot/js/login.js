
function CheckConnection() {
    var warningText = document.getElementById("warningText");
    $.ajax({
        type: "GET",
        url: "/Login/CheckConnection",
        data: {},
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (msg) {

            if (msg.responseJSON.returnValue == 0) {
                warningText.innerText = msg.responseJSON.statusCode;
                $('#warningModel').modal('show');
            }
            if (msg.responseJSON.checkUserResult) {
            }
        }
    });
}

