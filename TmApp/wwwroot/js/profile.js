function EditUserAccount() {

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    var login = document.getElementById("login").value;
    var psw = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var nickname = document.getElementById("nickname").value;
    var companyName = document.getElementById("companyName").value;
    var region = document.getElementById("region").value;
    var address = document.getElementById("address").value;
    var number = document.getElementById("number").value;
    var complement = document.getElementById("complement").value;
    var cep = document.getElementById("cep").value;
    var email = document.getElementById("email").value;
    var completeName = document.getElementById("completeName").value;
    //transfer Values for ddd and phone into separete values
    var phone = document.getElementById("phone").value;
    var ddd = document.getElementById("ddd").value;


    var city = document.getElementById("cities").value;
    var statesIndex = document.getElementById("states").selectedIndex;
    var state = document.getElementById("states")[statesIndex].innerHTML;

        $.ajax({
            url: "/Profile/Edit",
            type: 'POST',
            data: {
                __RequestVerificationToken: token,
                login: login,
                psw: psw,
                confirmPassword: confirmPassword,
                nickname: nickname,
                companyName: companyName,
                region: region,
                address: address,
                number: number,
                complement: complement,
                cep: cep,
                email: email,
                completeName: completeName,
                ddd: ddd,
                phone: phone,
                city: city,
                state: state
            },
            success: function (data) {
                window.location.href = "/Profile/Index";
            }
        });

    if (psw != confirmPassword) {
        alert("Insira a mesma senha nos campos delimitados");
    }


    return false;
}

function changeMessageUserLabel(message) {

    var div = document.getElementById("infoDiv");
    var label = document.getElementById("infoLabel");
    label.innerHTML = message;

    div.classList.add("messsageLabelUser");
    setTimeout(function () {
        div.style.opacity = 0;
        div.classList.remove("messsageLabelUser");
    }, 6000);

}




