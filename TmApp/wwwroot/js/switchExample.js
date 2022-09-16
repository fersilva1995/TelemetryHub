function changeOn(){
	alert("true");
    $('input[name="my-checkbox"]').bootstrapSwitch('state', true, true);
    $('input[name="my-checkbox"]').bootstrapSwitch('onColor', 'danger');
}

function changeOff(){
	alert("false");
	//$('input[name="my-checkbox"]').bootstrapSwitch('state', false, true);
	$('#switch_25').bootstrapSwitch('state', false, true);
	$('input[name="my-checkbox"]').bootstrapSwitch('offColor', 'blue');
}

function alertValue(){
	alert($('input[name="my-checkbox"]').bootstrapSwitch('state', '', true));
}

function ChangeSwitch(id) {
	ChangeDigitalState(id);	
	//ChangeSWITCH
}

function changeColorSwitchOff(id, color) {
    switch (color) {
        case "Vermelho":
            $("input[name=name_" + id + "]").bootstrapSwitch('offColor', 'red');
            break;
        case "Laranja":
            $("input[name=name_" + id + "]").bootstrapSwitch('offColor', 'orange');
            break;
        case "Amarelo":
            $("input[name=name_" + id + "]").bootstrapSwitch('offColor', 'yellow');
            break;
        case "Verde":
            $("input[name=name_" + id + "]").bootstrapSwitch('offColor', 'green');
            break;
        case "Violeta":
            $("input[name=name_" + id + "]").bootstrapSwitch('offColor', 'purple');
            break;
        case "Azul":
            $("input[name=name_" + id + "]").bootstrapSwitch('offColor', 'blue');
            break;
    }
}

function changeColorSwitchOn(id, color) {
    switch (color) {
        case "Vermelho":
            $("input[name=name_" + id + "]").bootstrapSwitch('onColor', 'red');
            break;
        case "Laranja":
            $("input[name=name_" + id + "]").bootstrapSwitch('onColor', 'orange');
            break;
        case "Amarelo":
            $("input[name=name_" + id + "]").bootstrapSwitch('onColor', 'yellow');
            break;
        case "Verde":
            $("input[name=name_" + id + "]").bootstrapSwitch('onColor', 'green');
            break;
        case "Violeta":
            $("input[name=name_" + id + "]").bootstrapSwitch('onColor', 'purple');
            break;
        case "Azul":
            $("input[name=name_" + id + "]").bootstrapSwitch('onColor', 'blue');
            break;
    }
}