function OnProcessor1Click() {
    document.getElementById("proc1LevelOfSignal").disabled = !document.getElementById("proc1LevelOfSignal").disabled;
    document.getElementById("proc1LowFreqLimit").disabled = !document.getElementById("proc1LowFreqLimit").disabled;
    document.getElementById("proc1HighFreqLimit").disabled = !document.getElementById("proc1DurationOfSignal").disabled;
    document.getElementById("proc1DurationOfSignal").disabled = !document.getElementById("proc1DurationOfSignal").disabled;
    document.getElementById("proc1LowLevelTolerance").disabled = !document.getElementById("proc1LowLevelTolerance").disabled;
    document.getElementById("proc1EventCount").disabled = !document.getElementById("proc1EventCount").disabled;
    document.getElementById("proc1EventWindow").disabled = !document.getElementById("proc1EventWindow").disabled;
    document.getElementById("proc1EventMask").disabled = !document.getElementById("proc1EventMask").disabled;
}

function OnProcessor2Click() {
    document.getElementById("proc2LevelOfSignal").disabled = !document.getElementById("proc2LevelOfSignal").disabled;
    document.getElementById("proc2LowFreqLimit").disabled = !document.getElementById("proc2LowFreqLimit").disabled;
    document.getElementById("proc2HighFreqLimit").disabled = !document.getElementById("proc2HighFreqLimit").disabled;
    document.getElementById("proc2DurationOfSignal").disabled = !document.getElementById("proc2DurationOfSignal").disabled;
    document.getElementById("proc2LowLevelTolerance").disabled = !document.getElementById("proc2LowLevelTolerance").disabled;
    document.getElementById("proc2EventCount").disabled = !document.getElementById("proc2EventCount").disabled;
    document.getElementById("proc2EventWindow").disabled = !document.getElementById("proc2EventWindow").disabled;
    document.getElementById("proc2EventMask").disabled = !document.getElementById("proc2EventMask").disabled;
}

function UpdateValues() {
    var id = document.getElementById("telemetryId").innerText;
    var zone = document.getElementById("zone").value;

    $.ajax({
        url: "/ApuConfig/GetApu",
        type: 'GET',
        data: {
            id: id,
            zone: zone
        },
        success: function (data) {
            document.getElementById("sensitivity").value = data.sensitivity;
            document.getElementById("gain").value = data.gain;

            document.getElementById("processor1").checked = data.processor1;

            document.getElementById("proc1LevelOfSignal").disabled = !data.processor1;
            document.getElementById("proc1LowFreqLimit").disabled = !data.processor1;
            document.getElementById("proc1HighFreqLimit").disabled = !data.processor1;
            document.getElementById("proc1DurationOfSignal").disabled = !data.processor1;
            document.getElementById("proc1LowLevelTolerance").disabled = !data.processor1;
            document.getElementById("proc1EventCount").disabled = !data.processor1;
            document.getElementById("proc1EventWindow").disabled = !data.processor1;
            document.getElementById("proc1EventMask").disabled = !data.processor1;

            document.getElementById("proc1LevelOfSignal").value = data.proc1LevelOfSignal;
            document.getElementById("proc1LowFreqLimit").value = data.proc1LowFreqLimit;
            document.getElementById("proc1HighFreqLimit").value = data.proc1HighFreqLimit;
            document.getElementById("proc1DurationOfSignal").value = data.proc1DurationOfSignal;
            document.getElementById("proc1LowLevelTolerance").value = data.proc1LowLevelTolerance;
            document.getElementById("proc1EventCount").value = data.proc1EventCount;
            document.getElementById("proc1EventWindow").value = data.proc1EventWindow;
            document.getElementById("proc1EventMask").value = data.proc1EventMask;

            document.getElementById("processor2").checked = data.processor2;

            document.getElementById("proc2LevelOfSignal").disabled = !data.processor2;
            document.getElementById("proc2LowFreqLimit").disabled = !data.processor2;
            document.getElementById("proc2HighFreqLimit").disabled = !data.processor2;
            document.getElementById("proc2DurationOfSignal").disabled = !data.processor2;
            document.getElementById("proc2LowLevelTolerance").disabled = !data.processor2;
            document.getElementById("proc2EventCount").disabled = !data.processor2;
            document.getElementById("proc2EventWindow").disabled = !data.processor2;
            document.getElementById("proc2EventMask").disabled = !data.processor2;

            document.getElementById("proc2LevelOfSignal").value = data.proc2LevelOfSignal;
            document.getElementById("proc2LowFreqLimit").value = data.proc2LowFreqLimit;
            document.getElementById("proc2HighFreqLimit").value = data.proc2HighFreqLimit;
            document.getElementById("proc2DurationOfSignal").value = data.proc2DurationOfSignal;
            document.getElementById("proc2LowLevelTolerance").value = data.proc2LowLevelTolerance;
            document.getElementById("proc2EventCount").value = data.proc2EventCount;
            document.getElementById("proc2EventWindow").value = data.proc2EventWindow;
            document.getElementById("proc2EventMask").value = data.proc2EventMask;

            document.getElementById("combRejectFilter").value = data.combRejectFilter;
            document.getElementById("preFilterFactor").value = data.preFilterFactor;
            document.getElementById("windRejectFactor").value = data.windRejectFactor;
            document.getElementById("xmlreportinterval").value = data.xmlReportInterval;

            document.getElementById("windProcessing").checked = data.windProcessing;
            document.getElementById("showAdvancedParameters").checked = data.showAdvancedParameters;
            document.getElementById("faultRelay").checked = data.faultRelay;
            document.getElementById("tamper").checked = data.tamper;
            document.getElementById("buriedMode").checked = data.buriedMode;


        }
    });
}

function UpdateValuesDetail() {
    var id = document.getElementById("telemetryId").innerText;
    var zone = document.getElementById("zone").value;

    $.ajax({
        url: "/ApuConfig/GetApu",
        type: 'GET',
        data: {
            id: id,
            zone: zone
        },
        success: function (data) {
            document.getElementById("sensitivity").value = data.sensitivity;
            document.getElementById("gain").value = data.gain;

            document.getElementById("proc1LevelOfSignal").value = data.proc1LevelOfSignal;
            document.getElementById("proc1LowFreqLimit").value = data.proc1LowFreqLimit;
            document.getElementById("proc1HighFreqLimit").value = data.proc1HighFreqLimit;
            document.getElementById("proc1DurationOfSignal").value = data.proc1DurationOfSignal;
            document.getElementById("proc1LowLevelTolerance").value = data.proc1LowLevelTolerance;
            document.getElementById("proc1EventCount").value = data.proc1EventCount;
            document.getElementById("proc1EventWindow").value = data.proc1EventWindow;
            document.getElementById("proc1EventMask").value = data.proc1EventMask;

            document.getElementById("proc2LevelOfSignal").value = data.proc2LevelOfSignal;
            document.getElementById("proc2LowFreqLimit").value = data.proc2LowFreqLimit;
            document.getElementById("proc2HighFreqLimit").value = data.proc2HighFreqLimit;
            document.getElementById("proc2DurationOfSignal").value = data.proc2DurationOfSignal;
            document.getElementById("proc2LowLevelTolerance").value = data.proc2LowLevelTolerance;
            document.getElementById("proc2EventCount").value = data.proc2EventCount;
            document.getElementById("proc2EventWindow").value = data.proc2EventWindow;
            document.getElementById("proc2EventMask").value = data.proc2EventMask;

            document.getElementById("combRejectFilter").value = data.combRejectFilter;
            document.getElementById("preFilterFactor").value = data.preFilterFactor;
            document.getElementById("windRejectFactor").value = data.windRejectFactor;
            document.getElementById("xmlreportinterval").value = data.xmlReportInterval;

            document.getElementById("windProcessing").checked = data.windProcessing;
            document.getElementById("showAdvancedParameters").checked = data.showAdvancedParameters;
            document.getElementById("faultRelay").checked = data.faultRelay;
            document.getElementById("tamper").checked = data.tamper;
            document.getElementById("buriedMode").checked = data.buriedMode;

        }
    });
}


function EditApuConfig() {
    var label = document.getElementById("editApuLoading");
    label.style.display = "block";

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();
    var id = document.getElementById("telemetryId").innerText;
    var model = document.getElementById("model").innerText;
    var zone = document.getElementById("zone").value;
    var sensitivity = document.getElementById("sensitivity").value;
    var gain = document.getElementById("gain").value;
    var processor1 = document.getElementById("processor1").checked;
    var processor2 = document.getElementById("processor2").checked;

    var proc1LevelOfSignal = document.getElementById("proc1LevelOfSignal").value;
    var proc1LowFreqLimit = document.getElementById("proc1LowFreqLimit").value;
    var proc1HighFreqLimit = document.getElementById("proc1HighFreqLimit").value;
    var proc1DurationOfSignal = document.getElementById("proc1DurationOfSignal").value;
    if (proc1DurationOfSignal.includes(",", 0)) {
        proc1DurationOfSignal = proc1DurationOfSignal.replace(",", ".");
    }
    proc1DurationOfSignal = parseFloat(proc1DurationOfSignal);
    proc1DurationOfSignal = proc1DurationOfSignal * 10;//transform from  Seconds to DS 
    var proc1LowLevelTolerance = document.getElementById("proc1LowLevelTolerance").value;
    var proc1EventCount = document.getElementById("proc1EventCount").value;
    var proc1EventWindow = document.getElementById("proc1EventWindow").value;
    if (proc1EventWindow.includes(",", 0)) {
        proc1EventWindow = proc1EventWindow.replace(",", ".");
    }
    proc1EventWindow = parseFloat(proc1EventWindow);
    proc1EventWindow = proc1EventWindow * 10;//transform from  Seconds to DS 
    var Proc1EventMask = document.getElementById("proc1EventMask").value;
    if (Proc1EventMask.includes(",", 0)) {
        Proc1EventMask = Proc1EventMask.replace(",", ".");
    }
    Proc1EventMask = parseFloat(Proc1EventMask);
    Proc1EventMask = Proc1EventMask * 10;//transform from  Seconds to DS 

    var proc2LevelOfSignal = document.getElementById("proc2LevelOfSignal").value;
    var proc2LowFreqLimit = document.getElementById("proc2LowFreqLimit").value;
    var proc2HighFreqLimit = document.getElementById("proc2HighFreqLimit").value;
    var proc2DurationOfSignal = document.getElementById("proc2DurationOfSignal").value;
    if (proc2DurationOfSignal.includes(",", 0)) {
        proc2DurationOfSignal = proc2DurationOfSignal.replace(",", ".");
    }
    proc2DurationOfSignal = parseFloat(proc2DurationOfSignal);
    proc2DurationOfSignal = proc2DurationOfSignal * 10;//transform from  Seconds to DS 
    var proc2LowLevelTolerance = document.getElementById("proc2LowLevelTolerance").value;
    var proc2EventCount = document.getElementById("proc2EventCount").value;
    var proc2EventWindow = document.getElementById("proc2EventWindow").value;
    if (proc2EventWindow.includes(",", 0)) {
        proc2EventWindow = proc2EventWindow.replace(",", ".");
    }
    proc2EventWindow = parseFloat(proc2EventWindow);
    proc2EventWindow = proc2EventWindow * 10;//transform from  Seconds to DS 
    var Proc2EventMask = document.getElementById("proc2EventMask").value;
    if (Proc2EventMask.includes(",", 0)) {
        Proc2EventMask = Proc2EventMask.replace(",", ".");
    }
    Proc2EventMask = parseFloat(Proc2EventMask);
    Proc2EventMask = Proc2EventMask * 10;//transform from  Seconds to DS 

    var combRejectFilter = document.getElementById("combRejectFilter").value;
    var prefilterFactor = document.getElementById("preFilterFactor").value;
    var windRejectFactor = document.getElementById("windRejectFactor").value;
    if (windRejectFactor > 80) {
        windRejectFactor = 80;
    }
    else if (windRejectFactor < 20) {
        windRejectFactor = 20;
    }
    //transform from km/s to mps
    var xmlreportinterval = document.getElementById("xmlreportinterval").value;
    if (xmlreportinterval.includes(",", 0)) {
        xmlreportinterval = xmlreportinterval.replace(",", ".");
    }
    xmlreportinterval = parseFloat(xmlreportinterval);
    xmlreportinterval = xmlreportinterval * 10;//transform from  Seconds to DS


    var windProcessing = document.getElementById("windProcessing").checked;
    var showAdvancedParameters = document.getElementById("showAdvancedParameters").checked;
    var faultRelay = document.getElementById("faultRelay").checked;
    var tamper = document.getElementById("tamper").checked;
    var buriedMode = document.getElementById("buriedMode").checked;

    $.ajax({
        url: "/ApuConfig/Edit",
        type: 'POST',
        data: {
            __RequestVerificationToken: token,
            id: id,
            model: model,
            zone: zone,
            sensitivity: sensitivity,
            gain: gain,
            processor1: processor1,
            processor2: processor2,
            proc1LevelOfSignal: proc1LevelOfSignal,
            proc1LowFreqLimit: proc1LowFreqLimit,
            proc1HighFreqLimit: proc1HighFreqLimit,
            proc1DurationOfSignal: proc1DurationOfSignal,
            proc1LowLevelTolerance: proc1LowLevelTolerance,
            proc1EventCount: proc1EventCount,
            proc1EventWindow: proc1EventWindow,
            Proc1EventMask: Proc1EventMask,
            proc2LevelOfSignal: proc2LevelOfSignal,
            proc2LowFreqLimit: proc2LowFreqLimit,
            proc2HighFreqLimit: proc2HighFreqLimit,
            proc2DurationOfSignal: proc2DurationOfSignal,
            proc2LowLevelTolerance: proc2LowLevelTolerance,
            proc2EventCount: proc2EventCount,
            proc2EventWindow: proc2EventWindow,
            Proc2EventMask: Proc2EventMask,
            combRejectFilter: combRejectFilter,
            windRejectFactor: windRejectFactor,
            xmlreportinterval: xmlreportinterval,
            windProcessing: windProcessing,
            showAdvancedParameters: showAdvancedParameters,
            faultRelay: faultRelay,
            prefilterFactor: prefilterFactor,
            tamper: tamper,
            buriedMode: buriedMode
        },
        complete: function (data) {
            window.location.href = data.responseJSON;
            
        }
    });

}

function ApuEditToDatabase() {
    var id = document.getElementById("telemetryId").innerText;
    var zone = document.getElementById("zone").value;


    var proc1LevelOfSignal = document.getElementById("proc1LevelOfSignal").value;
    var proc1LevelOfSignal = document.getElementById("proc1LevelOfSignal").value;
    var proc1LowFreqLimit = document.getElementById("proc1LowFreqLimit").value;
    var proc1HighFreqLimit = document.getElementById("proc1HighFreqLimit").value;
    var proc1DurationOfSignal = document.getElementById("proc1DurationOfSignal").value;
    if (proc1DurationOfSignal.includes(",", 0)) {
        proc1DurationOfSignal = proc1DurationOfSignal.replace(",", ".");
    }
    proc1DurationOfSignal = parseFloat(proc1DurationOfSignal);
    proc1DurationOfSignal = proc1DurationOfSignal * 10;//transform from  Seconds to DS 


    var proc1LowLevelTolerance = document.getElementById("proc1LowLevelTolerance").value;
    var proc1EventCount = document.getElementById("proc1EventCount").value;
    var proc1EventWindow = document.getElementById("proc1EventWindow").value;
    if (proc1EventWindow.includes(",", 0)) {
        proc1EventWindow = proc1EventWindow.replace(",", ".");
    }
    proc1EventWindow = parseFloat(proc1EventWindow);
    proc1EventWindow = proc1EventWindow * 10;//transform from  Seconds to DS 

    var proc1EventMask = document.getElementById("proc1EventMask").value;
    if (proc1EventMask.includes(",", 0)) {
        proc1EventMask = proc1EventMask.replace(",", ".");
    }
    proc1EventMask = parseFloat(proc1EventMask);
    proc1EventMask = proc1EventMask * 10;//transform from  Seconds to DS 
    var proc2LevelOfSignal = document.getElementById("proc2LevelOfSignal").value;
    var proc2LowFreqLimit = document.getElementById("proc2LowFreqLimit").value;
    var proc2HighFreqLimit = document.getElementById("proc2HighFreqLimit").value;
    var proc2DurationOfSignal = document.getElementById("proc2DurationOfSignal").value;
    if (proc2DurationOfSignal.includes(",", 0)) {
        proc2DurationOfSignal = proc2DurationOfSignal.replace(",", ".");
    }
    proc2DurationOfSignal = parseFloat(proc2DurationOfSignal);
    proc2DurationOfSignal = proc2DurationOfSignal * 10;//transform from  Seconds to DS 
    var proc2LowLevelTolerance = document.getElementById("proc2LowLevelTolerance").value;
    var proc2EventCount = document.getElementById("proc2EventCount").value;
    var proc2EventWindow = document.getElementById("proc2EventWindow").value;
    if (proc2EventWindow.includes(",", 0)) {
        proc2EventWindow = proc2EventWindow.replace(",", ".");
    }
    proc2EventWindow = parseFloat(proc2EventWindow);
    proc2EventWindow = proc2EventWindow * 10;//transform from  Seconds to DS     
    var proc2EventMask = document.getElementById("proc2EventMask").value;
    if (proc2EventMask.includes(",", 0)) {
        proc2EventMask = proc2EventMask.replace(",", ".");
    }
    proc2EventMask = parseFloat(proc2EventMask);
    proc2EventMask = proc2EventMask * 10;//transform from  Seconds to DS 

    var sensitivity = document.getElementById("sensitivity").value;
    var gain = document.getElementById("gain").value;
    var apu = document.getElementById("zone").selectedIndex;

    var prefilterFactor = document.getElementById("preFilterFactor").value;
    var windRejectFactor = document.getElementById("windRejectFactor").value;
    var xmlreportinterval = document.getElementById("xmlreportinterval").value;
    if (xmlreportinterval.includes(",", 0)) {
        xmlreportinterval = xmlreportinterval.replace(",", ".");
    }
    xmlreportinterval = parseFloat(xmlreportinterval);
    xmlreportinterval = xmlreportinterval * 10;//transform from  Seconds to DS

    var showAdvancedParameters = document.getElementById("showAdvancedParameters").checked;
    var faultRelay = document.getElementById("faultRelay").checked;
    var windProcessing = document.getElementById("windProcessing").checked;
    var processor1 = document.getElementById("processor1").checked;
    var processor2 = document.getElementById("processor2").checked;
    var tamper = document.getElementById("tamper").checked;
    var buriedMode = document.getElementById("buriedMode").checked;
    if (buriedMode == undefined) {
        buriedMode = "false";
    }
    var combRejectFilter = document.getElementById("combRejectFilter").value;

    $.ajax({
        url: "/ApuConfig/ApuEditToDatabase",
        type: 'POST',
        data: {
            id: id,
            zone: zone,
            sensitivity: sensitivity,
            gain: gain,
            processor1: processor1,
            processor2: processor2,
            proc1LevelOfSignal: proc1LevelOfSignal,
            proc1LowFreqLimit: proc1LowFreqLimit,
            proc1HighFreqLimit: proc1HighFreqLimit,
            proc1DurationOfSignal: proc1DurationOfSignal,
            proc1LowLevelTolerance: proc1LowLevelTolerance,
            proc1EventCount: proc1EventCount,
            proc1EventWindow: proc1EventWindow,
            proc1EventMask: proc1EventMask,
            proc2LevelOfSignal: proc2LevelOfSignal,
            proc2LowFreqLimit: proc2LowFreqLimit,
            proc2HighFreqLimit: proc2HighFreqLimit,
            proc2DurationOfSignal: proc2DurationOfSignal,
            proc2LowLevelTolerance: proc2LowLevelTolerance,
            proc2EventCount: proc2EventCount,
            proc2EventWindow: proc2EventWindow,
            proc2EventMask: proc2EventMask,
            windRejectFactor: windRejectFactor,
            xmlreportinterval: xmlreportinterval,
            windProcessing: windProcessing,
            prefilterFactor: prefilterFactor,
            tamper: tamper,
            buriedMode: buriedMode,
            faultRelay: faultRelay,
            showAdvancedParameters: showAdvancedParameters,
            combRejectFilter: combRejectFilter
        },
        success: function (data) {
            window.location.href = data;
        }
    });
}

function RestoreDefautConfig() {
    var label = document.getElementById("editApuLoading");
    label.style.display = "block";

    var form = $('#__AjaxAntiForgeryForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();
    var id = document.getElementById("telemetryId").innerText;
    var model = document.getElementById("model").innerText;
    var zone = document.getElementById("zone").value;
    var sensitivity = 23;
    var gain = 20;
    var processor1 = document.getElementById("processor1").checked;
    var processor2 = document.getElementById("processor2").checked;

    var proc1LevelOfSignal = 10;
    var proc1LowFreqLimit = 170;
    var proc1HighFreqLimit = 600;
    var proc1DurationOfSignal = 3;
    var proc1LowLevelTolerance = 5;
    var proc1EventCount = 3;
    var proc1EventWindow = 50;
    var proc1EventMask = 2;

    var proc2LevelOfSignal = 10;
    var proc2LowFreqLimit = 250;
    var proc2HighFreqLimit = 600;
    var proc2DurationOfSignal = 1;
    var proc2LowLevelTolerance = 3;
    var proc2EventCount = 5;
    var proc2EventWindow = 80;
    var proc2EventMask = 7;

    var combRejectFilter = document.getElementById("combRejectFilter").value;
    var prefilterFactor = 80;
    var windRejectFactor = 50;
    var xmlreportinterval = 10;

    var windProcessing = document.getElementById("windProcessing").checked;
    var showAdvancedParameters = document.getElementById("showAdvancedParameters").checked;
    var faultRelay = document.getElementById("faultRelay").checked;
    var tamper = document.getElementById("tamper").checked;
    var buriedMode = document.getElementById("buriedMode").checked;

    $.ajax({
        url: "/ApuConfig/Edit",
        type: 'POST',
        data: {
            __RequestVerificationToken: token,
            id: id,
            model: model,
            zone: zone,
            sensitivity: sensitivity,
            gain: gain,
            processor1: processor1,
            processor2: processor2,
            proc1LevelOfSignal: proc1LevelOfSignal,
            proc1LowFreqLimit: proc1LowFreqLimit,
            proc1HighFreqLimit: proc1HighFreqLimit,
            proc1DurationOfSignal: proc1DurationOfSignal,
            proc1LowLevelTolerance: proc1LowLevelTolerance,
            proc1EventCount: proc1EventCount,
            proc1EventWindow: proc1EventWindow,
            Proc1EventMask: proc1EventMask,
            proc2LevelOfSignal: proc2LevelOfSignal,
            proc2LowFreqLimit: proc2LowFreqLimit,
            proc2HighFreqLimit: proc2HighFreqLimit,
            proc2DurationOfSignal: proc2DurationOfSignal,
            proc2LowLevelTolerance: proc2LowLevelTolerance,
            proc2EventCount: proc2EventCount,
            proc2EventWindow: proc2EventWindow,
            Proc2EventMask: proc2EventMask,
            combRejectFilter: combRejectFilter,
            windRejectFactor: windRejectFactor,
            xmlreportinterval: xmlreportinterval,
            windProcessing: windProcessing,
            showAdvancedParameters: showAdvancedParameters,
            faultRelay: faultRelay,
            prefilterFactor: prefilterFactor,
            tamper: tamper,
            buriedMode: buriedMode
        },
        success: function (data) {
            window.location.href = data;
        }
    });

}

function RestoreDefautConfigToDatabase() {
    var label = document.getElementById("editApuLoading");
    label.style.display = "block";

    var id = document.getElementById("telemetryId").innerText;
    var model = document.getElementById("model").innerText;
    var zone = document.getElementById("zone").value;
    var sensitivity = 23;
    var gain = 20;
    var processor1 = document.getElementById("processor1").checked;
    var processor2 = document.getElementById("processor2").checked;

    var proc1LevelOfSignal = 10;
    var proc1LowFreqLimit = 170;
    var proc1HighFreqLimit = 600;
    var proc1DurationOfSignal = 3;
    var proc1LowLevelTolerance = 5;
    var proc1EventCount = 3;
    var proc1EventWindow = 50;
    var proc1EventMask = 2;

    var proc2LevelOfSignal = 10;
    var proc2LowFreqLimit = 250;
    var proc2HighFreqLimit = 600;
    var proc2DurationOfSignal = 1;
    var proc2LowLevelTolerance = 3;
    var proc2EventCount = 5;
    var proc2EventWindow = 8;
    var proc2EventMask = 7;

    var combRejectFilter = document.getElementById("combRejectFilter").value;
    var prefilterFactor = 80;
    var windRejectFactor = 50;
    var xmlreportinterval = 1;

    var windProcessing = document.getElementById("windProcessing").checked;
    var showAdvancedParameters = document.getElementById("showAdvancedParameters").checked;
    var faultRelay = document.getElementById("faultRelay").checked;
    var tamper = document.getElementById("tamper").checked;
    var buriedMode = document.getElementById("buriedMode").checked;

    if (model == "Apu3xxSeries") {
        sensitivity = 10;
        gain = 20;

        proc1LevelOfSignal = 10;
        proc1LowFreqLimit = 10;
        proc1HighFreqLimit = 120;
        proc1DurationOfSignal = 3;
        proc1LowLevelTolerance = 5;
        proc1EventCount = 2;
        proc1EventWindow = 90;
        proc1EventMask = 0;

        proc2LevelOfSignal = 10;
        proc2LowFreqLimit = 10;
        proc2HighFreqLimit = 120;
        proc2DurationOfSignal = 1;
        proc2LowLevelTolerance = 3;
        proc2EventCount = 2;
        proc2EventWindow = 90;
        proc2EventMask = 0;

        prefilterFactor = 80;
        windRejectFactor = 50;
        xmlreportinterval = 10;
        combRejectFilter = 0;
    }

    $.ajax({
        url: "/ApuConfig/ApuEditToDatabase",
        type: 'POST',
        data: {
            id: id,
            zone: zone,
            sensitivity: sensitivity,
            gain: gain,
            processor1: processor1,
            processor2: processor2,
            proc1LevelOfSignal: proc1LevelOfSignal,
            proc1LowFreqLimit: proc1LowFreqLimit,
            proc1HighFreqLimit: proc1HighFreqLimit,
            proc1DurationOfSignal: proc1DurationOfSignal,
            proc1LowLevelTolerance: proc1LowLevelTolerance,
            proc1EventCount: proc1EventCount,
            proc1EventWindow: proc1EventWindow,
            proc1EventMask: proc1EventMask,
            proc2LevelOfSignal: proc2LevelOfSignal,
            proc2LowFreqLimit: proc2LowFreqLimit,
            proc2HighFreqLimit: proc2HighFreqLimit,
            proc2DurationOfSignal: proc2DurationOfSignal,
            proc2LowLevelTolerance: proc2LowLevelTolerance,
            proc2EventCount: proc2EventCount,
            proc2EventWindow: proc2EventWindow,
            proc2EventMask: proc2EventMask,
            windRejectFactor: windRejectFactor,
            xmlreportinterval: xmlreportinterval,
            windProcessing: windProcessing,
            prefilterFactor: prefilterFactor,
            tamper: tamper,
            buriedMode: buriedMode,
            faultRelay: faultRelay,
            showAdvancedParameters: showAdvancedParameters,
            combRejectFilter: combRejectFilter
        },
        success: function (data) {
            window.location.href = data;
        }
    });
}

function RestoreDefautConfigToDatabase2() {
    var id = document.getElementById("telemetryId").innerText;
    var model = document.getElementById("model").innerText;
    var zone = document.getElementById("zone").value;
    var sensitivity = 23;
    var gain = 20;
    var processor1 = document.getElementById("processor1").checked;
    var processor2 = document.getElementById("processor2").checked;

    var proc1LevelOfSignal = 10;
    var proc1LowFreqLimit = 170;
    var proc1HighFreqLimit = 600;
    var proc1DurationOfSignal = 3;
    var proc1LowLevelTolerance = 5;
    var proc1EventCount = 3;
    var proc1EventWindow = 50;
    var proc1EventMask = 2;

    var proc2LevelOfSignal = 10;
    var proc2LowFreqLimit = 250;
    var proc2HighFreqLimit = 600;
    var proc2DurationOfSignal = 1;
    var proc2LowLevelTolerance = 3;
    var proc2EventCount = 5;
    var proc2EventWindow = 8;
    var proc2EventMask = 7;

    var combRejectFilter = document.getElementById("combRejectFilter").value;
    var prefilterFactor = 80;
    var windRejectFactor = 50;
    var xmlreportinterval = 1;

    var windProcessing = document.getElementById("windProcessing").checked;
    var showAdvancedParameters = document.getElementById("showAdvancedParameters").checked;
    var faultRelay = document.getElementById("faultRelay").checked;
    var tamper = document.getElementById("tamper").checked;
    var buriedMode = document.getElementById("buriedMode").checked;

    if (model == "Apu3xxSeries") {
        sensitivity = 10;
        gain = 20;

        proc1LevelOfSignal = 10;
        proc1LowFreqLimit = 10;
        proc1HighFreqLimit = 120;
        proc1DurationOfSignal = 0.3;
        proc1LowLevelTolerance = 5;
        proc1EventCount = 2;
        proc1EventWindow = 9;
        proc1EventMask = 0;

        proc2LevelOfSignal = 10;
        proc2LowFreqLimit = 10;
        proc2HighFreqLimit = 120;
        proc2DurationOfSignal = 0.1;
        proc2LowLevelTolerance = 3;
        proc2EventCount = 2;
        proc2EventWindow = 9;
        proc2EventMask = 0;

        prefilterFactor = 0;
        windRejectFactor = 50;
        xmlreportinterval = 1;
        combRejectFilter = 0;

        processor2 = false;
        processor1 = true;

    }
    document.getElementById("sensitivity").value = sensitivity;
    document.getElementById("gain").value = gain;

    document.getElementById("processor1").checked = processor1;

    document.getElementById("proc1LevelOfSignal").disabled = !processor1;
    document.getElementById("proc1LowFreqLimit").disabled = !processor1;
    document.getElementById("proc1HighFreqLimit").disabled = !processor1;
    document.getElementById("proc1DurationOfSignal").disabled = !processor1;
    document.getElementById("proc1LowLevelTolerance").disabled = !processor1;
    document.getElementById("proc1EventCount").disabled = !processor1;
    document.getElementById("proc1EventWindow").disabled = !processor1;
    document.getElementById("proc1EventMask").disabled = !processor1;

    document.getElementById("proc1LevelOfSignal").value = proc1LevelOfSignal;
    document.getElementById("proc1LowFreqLimit").value = proc1LowFreqLimit;
    document.getElementById("proc1HighFreqLimit").value = proc1HighFreqLimit;
    document.getElementById("proc1DurationOfSignal").value = proc1DurationOfSignal;
    document.getElementById("proc1LowLevelTolerance").value = proc1LowLevelTolerance;
    document.getElementById("proc1EventCount").value = proc1EventCount;
    document.getElementById("proc1EventWindow").value = proc1EventWindow;
    document.getElementById("proc1EventMask").value = proc1EventMask;

    document.getElementById("processor2").checked = processor2;

    
    document.getElementById("proc2LevelOfSignal").disabled = !processor2;
    document.getElementById("proc2LowFreqLimit").disabled = !processor2;
    document.getElementById("proc2HighFreqLimit").disabled = !processor2;
    document.getElementById("proc2DurationOfSignal").disabled = !processor2;
    document.getElementById("proc2LowLevelTolerance").disabled = !processor2;
    document.getElementById("proc2EventCount").disabled = !processor2;
    document.getElementById("proc2EventWindow").disabled = !processor2;
    document.getElementById("proc2EventMask").disabled = !processor2;

    document.getElementById("proc2LevelOfSignal").value = proc2LevelOfSignal;
    document.getElementById("proc2LowFreqLimit").value = proc2LowFreqLimit;
    document.getElementById("proc2HighFreqLimit").value = proc2HighFreqLimit;
    document.getElementById("proc2DurationOfSignal").value = proc2DurationOfSignal;
    document.getElementById("proc2LowLevelTolerance").value = proc2LowLevelTolerance;
    document.getElementById("proc2EventCount").value = proc2EventCount;
    document.getElementById("proc2EventWindow").value = proc2EventWindow;
    document.getElementById("proc2EventMask").value = proc2EventMask;

    document.getElementById("preFilterFactor").value = prefilterFactor;
    document.getElementById("windRejectFactor").value = windRejectFactor;
    document.getElementById("xmlreportinterval").value = xmlreportinterval
    document.getElementById("combRejectFilter").value = combRejectFilter;

    document.getElementById("windProcessing").checked = windProcessing;
    document.getElementById("tamper").checked = tamper;
    document.getElementById("buriedMode").checked = buriedMode;
    document.getElementById("faultRelay").checked = faultRelay;
    document.getElementById("showAdvancedParameters").checked = showAdvancedParameters;
}


//Delimiters
function Delimiter1To500(input) {
    var value = parseInt(input.value);
    if (value > 500) {
        return input.value = 500;
    }

}

function Delimiter20To50(input) {
    var value = parseInt(input.value);
    if (value > 50) {
        return input.value = 50;
    }

}
function Delimiter600(input) {
    var value = parseInt(input.value);
    if (value > 600) {
        return input.value = 600;
    }
}

function Delimiter1To40(input) {
    var value = parseInt(input.value);
    if (value > 40) {
        return input.value = 40;
    }
}

function Delimiter10To600(input) {
    var value = parseInt(input.value);
    if (value > 600) {
        return input.value = 600;
    }
}

function Delimiter0dot1To2dot5(input) {
    var value = parseFloat(input.value);
    if (value > 2.5) {
        return input.value = 2.5;
    }
}

function Delimiter1To100(input) {
    var value = parseInt(input.value);
    if (value > 100) {
        return input.value = 100;
    }
}

function Delimiter0dot1To100(input) {
    var value = parseFloat(input.value);
    if (value > 100) {
        return input.value = 100;
    }
}

function Delimiter0To10(input) {
    var value = parseFloat(input.value);
    if (value > 10) {
        return input.value = 10;
    }
}

function Delimiter0To100(input) {
    var value = parseFloat(input.value);
    if (value > 100) {
        return input.value = 100;
    }
}


function Delimiter20To80(input) {
    var value = parseFloat(input.value);
    if (value > 80) {
        return input.value = 80;
    }
    TranformToKm();
}


function Delimiter0dot1To60(input) {
    var value = parseFloat(input.value);
    if (value > 60) {
        return input.value = 60;
    }
}
//EndDelimters


function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 44) {
        if (charCode != 46) {
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
        }
    }
    return true;
}

function TranformToKm() {
    var mphSpeed = document.getElementById("windRejectFactor").value;
    mphSpeed = mphSpeed * 1.60934;
    mphSpeed = parseInt(mphSpeed);
    mphSpeed = Math.ceil(mphSpeed);


    var windKm = document.getElementById("WindVelocityKm");
    windKm.style.display = "block";
    windKm.value = mphSpeed + "     km/h";
    var windlabel = document.getElementById("labelofKm");
    windlabel.style.display = "block";
}

function SaveBackUp() {
    var id = document.getElementById("telemetryId").innerText;
    var zone = document.getElementById("zone").value;

    var proc1LevelOfSignal = document.getElementById("proc1LevelOfSignal").value;
    var proc1LevelOfSignal = document.getElementById("proc1LevelOfSignal").value;
    var proc1LowFreqLimit = document.getElementById("proc1LowFreqLimit").value;
    var proc1HighFreqLimit = document.getElementById("proc1HighFreqLimit").value;
    var proc1DurationOfSignal = document.getElementById("proc1DurationOfSignal").value
    var proc1LowLevelTolerance = document.getElementById("proc1LowLevelTolerance").value;
    var proc1EventCount = document.getElementById("proc1EventCount").value;
    var proc1EventWindow = document.getElementById("proc1EventWindow").value;
    var proc1EventMask = document.getElementById("proc1EventMask").value;

    var proc2LevelOfSignal = document.getElementById("proc2LevelOfSignal").value;
    var proc2LowFreqLimit = document.getElementById("proc2LowFreqLimit").value;
    var proc2HighFreqLimit = document.getElementById("proc2HighFreqLimit").value;
    var proc2DurationOfSignal = document.getElementById("proc2DurationOfSignal").value;
    var proc2LowLevelTolerance = document.getElementById("proc2LowLevelTolerance").value;
    var proc2EventCount = document.getElementById("proc2EventCount").value;
    var proc2EventWindow = document.getElementById("proc2EventWindow").value;
    var Proc2EventMask = document.getElementById("proc2EventMask").value;

    var sensitivity = document.getElementById("sensitivity").value;
    var gain = document.getElementById("gain").value;
    var apu = document.getElementById("zone").selectedIndex;

    var prefilterFactor = document.getElementById("preFilterFactor").value;
    var windRejectFactor = document.getElementById("windRejectFactor").value;
    var xmlreportinterval = document.getElementById("xmlreportinterval").value;

    var windProcessing = document.getElementById("windProcessing").checked;
    var processor1 = document.getElementById("processor1").checked;
    var processor2 = document.getElementById("processor2").checked;
    var tamper = document.getElementById("tamper").checked;
    var buriedMode = document.getElementById("buriedMode").checked;
    if (buriedMode == undefined) {
        buriedMode = "false";
    }
    var showAdvancedParameters = document.getElementById("showAdvancedParameters").checked;
    var faultRelay = document.getElementById("faultRelay").checked;
    var combRejectFilter = document.getElementById("combRejectFilter").value;




    $.ajax({
        url: "/ApuConfig/SaveBackUp",
        type: 'POST',
        data: {
            id: id,
            sensitivity: sensitivity,
            gain: gain,
            processor1: processor1,
            processor2: processor2,
            proc1LevelOfSignal: proc1LevelOfSignal,
            proc1LowFreqLimit: proc1LowFreqLimit,
            proc1HighFreqLimit: proc1HighFreqLimit,
            proc1DurationOfSignal: proc1DurationOfSignal,
            proc1LowLevelTolerance: proc1LowLevelTolerance,
            proc1EventCount: proc1EventCount,
            proc1EventWindow: proc1EventWindow,
            proc1EventMask: proc1EventMask,
            proc2LevelOfSignal: proc2LevelOfSignal,
            proc2LowFreqLimit: proc2LowFreqLimit,
            proc2HighFreqLimit: proc2HighFreqLimit,
            proc2DurationOfSignal: proc2DurationOfSignal,
            proc2LowLevelTolerance: proc2LowLevelTolerance,
            proc2EventCount: proc2EventCount,
            proc2EventWindow: proc2EventWindow,
            Proc2EventMask: Proc2EventMask,
            windRejectFactor: windRejectFactor,
            xmlreportinterval: xmlreportinterval,
            windProcessing: windProcessing,
            prefilterFactor: prefilterFactor,
            tamper: tamper,
            zone: zone,
            buriedMode: buriedMode,
            showAdvancedParameters: showAdvancedParameters,
            faultRelay: faultRelay,
            combRejectFilter: combRejectFilter
        },
        success: function (data) {
            window.location.href = data;
        }
    });
}

function ExtractConfiguration() {
    //take conifg of DataBase and Set on Page.
    var id = document.getElementById("telemetryId").innerText;
    var zone = document.getElementById("zone").value;

    $.ajax({
        url: "/ApuConfig/ExtractConfiguration",
        type: 'GET',
        data: {
            id: id,
            zone: zone /*get zone*/
        },
        success: function (data) {
            document.getElementById("sensitivity").value = data[0].sensibilidade;
            document.getElementById("gain").value = data[0].ganho;

            document.getElementById("processor1").checked = data[0].process1Bool;

            document.getElementById("proc1LevelOfSignal").disabled = !data[0].process1Bool;
            document.getElementById("proc1LowFreqLimit").disabled = !data[0].process1Bool;
            document.getElementById("proc1HighFreqLimit").disabled = !data[0].process1Bool;
            document.getElementById("proc1DurationOfSignal").disabled = !data[0].process1Bool;
            document.getElementById("proc1LowLevelTolerance").disabled = !data[0].process1Bool;
            document.getElementById("proc1EventCount").disabled = !data[0].process1Bool;
            document.getElementById("proc1EventWindow").disabled = !data[0].process1Bool;
            document.getElementById("proc1EventMask").disabled = !data[0].process1Bool;

            document.getElementById("proc1LevelOfSignal").value = data[0].proc1NiveldoSinal;
            document.getElementById("proc1LowFreqLimit").value = data[0].proc1LimiteBaixaFreq;
            document.getElementById("proc1HighFreqLimit").value = data[0].proc1LimiteAltaFreq;
            document.getElementById("proc1DurationOfSignal").value = data[0].proc1DuracaoDoSinal;
            document.getElementById("proc1LowLevelTolerance").value = data[0].proc1ToleranciaBaixoNivel;
            document.getElementById("proc1EventCount").value = data[0].proc1ContadorDeEventos;
            document.getElementById("proc1EventWindow").value = data[0].proc1JanelaDeEventos;
            document.getElementById("proc1EventMask").value = data[0].proc1MascaraDeEventos;

            document.getElementById("processor2").checked = data[0].procss2Bool;


            document.getElementById("proc2LevelOfSignal").disabled = !data[0].procss2Bool;
            document.getElementById("proc2LowFreqLimit").disabled = !data[0].procss2Bool;
            document.getElementById("proc2HighFreqLimit").disabled = !data[0].procss2Bool;
            document.getElementById("proc2DurationOfSignal").disabled = !data[0].procss2Bool;
            document.getElementById("proc2LowLevelTolerance").disabled = !data[0].procss2Bool;
            document.getElementById("proc2EventCount").disabled = !data[0].procss2Bool;
            document.getElementById("proc2EventWindow").disabled = !data[0].procss2Bool;
            document.getElementById("proc2EventMask").disabled = !data[0].procss2Bool;

            document.getElementById("proc2LevelOfSignal").value = data[0].proc2NiveldoSinal;
            document.getElementById("proc2LowFreqLimit").value = data[0].proc2LimiteBaixaFreq;
            document.getElementById("proc2HighFreqLimit").value = data[0].proc2LimiteAltaFreq;
            document.getElementById("proc2DurationOfSignal").value = data[0].proc2DuracaoDoSinal;
            document.getElementById("proc2LowLevelTolerance").value = data[0].proc2ToleranciaBaixoNivel;
            document.getElementById("proc2EventCount").value = data[0].proc2ContadorDeEventos;
            document.getElementById("proc2EventWindow").value = data[0].proc2JanelaDeEventos;
            document.getElementById("proc2EventMask").value = data[0].proc2MascaraDeEventos;

            document.getElementById("preFilterFactor").value = data[0].fatorPreFiltro;
            document.getElementById("windRejectFactor").value = data[0].rejeicaoDeVento;
            document.getElementById("xmlreportinterval").value = data[0].intervaloXml;

            document.getElementById("windProcessing").checked = data[0].processamentoDeVento;
            document.getElementById("tamper").checked = data[0].tamper;
            document.getElementById("faultRelay").checked = data[0].faultRelay;
        }
    });
}


window.onload = function ()//check another form 
{
    var element = document.getElementById("saveConfigs");
    if (element == undefined) { }
    else {
        //json to database - check database;

        var id = document.getElementById("telemetryId").innerText;
        $.ajax({
            url: "/ApuConfig/LoadConfigurationStatus",
            type: 'GET',
            data: {
                id: id
            },
            success: function (data) {
                if (data.success) {

                }
                else {
                    var element = document.getElementById("saveConfigs");
                    element.style.backgroundColor = "#B22222";
                }

            }
        });
    }
}