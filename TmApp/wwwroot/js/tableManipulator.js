function TableStart()
{
    var markerTable = 0;
    var table = document.getElementById("table");

    var numberOfColumns = Math.floor(table.offsetWidth / 320);
    var numberOfRows = Math.ceil(30 / numberOfColumns);

    var columnWidth = Math.ceil(table.offsetWidth / numberOfColumns) + "px";
    var columnHeight = Math.ceil(table.offsetWidth / numberOfColumns / 1.5) + "px";

    for (var rowCounter = 0; rowCounter < numberOfRows; rowCounter++) {

        var row = document.createElement("tr");
        row.classList.add("tableRow");

        for (var columnCounter = 0; columnCounter < numberOfColumns; columnCounter++) {
            markerTable++;

            var cell = document.createElement("td");
            cell.id = "cellNumber_" + markerTable;
            cell.style.width = 100 / numberOfColumns + "%"
            cell.style.minHeight = columnHeight;
            cell.style.maxHeight = columnHeight;
            cell.style.height = columnHeight;

            var label = document.createElement("label");
            label.className = "labelEmptyTable";
            label.style.height = columnHeight + "px";
            label.innerHTML = markerTable;

            cell.appendChild(label);
            row.appendChild(cell);

            cell.classList.add("tableHeader");
        }
        // add the row to the end of the table body
        table.appendChild(row);
    }
    // sets the border attribute of tbl to 2;
    table.setAttribute("border", "2");
}

function CreateTableRowCheckBox(labelText, id, nameIdTable, className) {

    mainTable = document.getElementById(nameIdTable);

    var row = document.createElement("tr");
    var rowHeader = document.createElement("th");
    var rowValue = document.createElement("td");
    var rowLabel = document.createElement("label");
    var rowInput = document.createElement("input");

    rowLabel.className = "Component";
    rowInput.className = className;
    rowInput.type = "checkbox";
    rowInput.value = id;

    rowLabel.innerHTML = labelText;
    rowHeader.appendChild(rowLabel);

    rowValue.appendChild(rowInput);

    row.appendChild(rowHeader);
    row.appendChild(rowValue);

    mainTable.appendChild(row);
}

function CreateTableRowTexts(labelText, labelText2, labelText3, mainTable, className) {

    var row = document.createElement("tr");
    row.classList.add("titleVariableRow");
    var rowHeader = document.createElement("td");
    var rowValue = document.createElement("td");

    var rowValue2 = document.createElement("td");
    var rowLabel = document.createElement("label");
    var rowLabel2 = document.createElement("label");
    var rowLabel3 = document.createElement("label");

    rowLabel.className = className;
    rowLabel2.className = className;    
    rowLabel3.className = labelText2;
    rowLabel2.innerHTML = labelText2;   
    
    rowLabel2.innerHTML = labelText2;
    rowLabel3.innerHTML = labelText3;    

    rowLabel.innerHTML = labelText;
    rowHeader.appendChild(rowLabel);
    
    rowValue.appendChild(rowLabel2);
    rowValue2.appendChild(rowLabel3);

    row.appendChild(rowHeader);    
    row.appendChild(rowValue);
    row.appendChild(rowValue2);

    mainTable.appendChild(row);
}


function CreateTableRowTexts2(labelText, labelText2, mainTable, className) {
    var row = document.createElement("tr");
    row.classList.add("titleVariableRow");
    var rowHeader = document.createElement("td");
    var rowValue = document.createElement("td");
        
    var rowLabel = document.createElement("label");
    var rowLabel2 = document.createElement("label");    

    rowLabel.className = className;
    rowLabel2.className = className;
    
    rowLabel2.innerHTML = labelText2;
    rowLabel2.innerHTML = labelText2;    

    rowLabel.innerHTML = labelText;
    rowHeader.appendChild(rowLabel);

    rowValue.appendChild(rowLabel2);    

    row.appendChild(rowHeader);
    row.appendChild(rowValue);
    
    mainTable.appendChild(row);
}


function CreateTableRow(labelText, inputType, inputId, mainTable, className) {

    var row = document.createElement("tr");
    var rowHeader = document.createElement("th");
    var rowValue = document.createElement("td");
    var rowLabel = document.createElement("label");
    var rowInput = document.createElement("input");

    rowLabel.className = className;
    rowInput.className = className;
    rowInput.autocomplete = "off";
    rowInput.type = inputType;
    rowInput.id = inputId;
    rowInput.value = "";

    rowLabel.innerHTML = labelText;
    rowHeader.appendChild(rowLabel);

    rowValue.appendChild(rowInput);

    row.appendChild(rowHeader);
    row.appendChild(rowValue);

    mainTable.appendChild(row);
}

function CreateRowEditVariable2(labelText, inputType, inputId, inputlabel, mainTable, className) {
    var row = document.createElement("tr");
    row.classList.add("varInfo");

    var rowHeader = document.createElement("th");
    var rowValue = document.createElement("td");
    var rowLabel = document.createElement("label");

    var rowInput = document.createElement("input");   
    var rowButton = document.createElement("td");

    var buttonOfAlarm = document.createElement("button");
    buttonOfAlarm.classList.add("varButton");

    var linkButton = document.createElement("a");
    linkButton.classList.add("alarmLink");

    rowLabel.className = "";
    rowInput.className = className;
    rowInput.type = inputType;
    rowInput.id = inputId;
    rowInput.value = inputlabel;
    rowInput.innerHTML = inputlabel;

    rowLabel.innerHTML = labelText;
    rowHeader.appendChild(rowLabel);

    linkButton.href = "/Home/EditAlarm/" + inputId;
    linkButton.onclick = function () { ShowLoading() };
    linkButton.title = "Seleção de Alarmes de Váriavel";
    linkButton.innerHTML = "Associar Alarmes";
    buttonOfAlarm.appendChild(linkButton);

    rowValue.appendChild(rowInput);    

    //rowButton.appendChild(buttonOfAlarm);
    rowButton.appendChild(linkButton);

    row.appendChild(rowHeader);
    row.appendChild(rowValue);    
    row.appendChild(rowButton);
 
    mainTable.appendChild(row);
}


function CreateRowEditVariable(labelText, inputType, inputId, inputlabel, inputId2, inputlabel2, input2Type, mainTable, className) {
    var row = document.createElement("tr");
    row.classList.add("varInfo");

    var rowHeader = document.createElement("th");
    var rowValue = document.createElement("td");
    var rowValue2 = document.createElement("td");
    var rowLabel = document.createElement("label");

    var rowInput = document.createElement("input");
    var rowInput2 = document.createElement("input");

    var rowButton = document.createElement("td");

    var buttonOfAlarm = document.createElement("button");
    buttonOfAlarm.classList.add("varButton");

    var linkButton = document.createElement("a");
    linkButton.classList.add("alarmLink");

    rowLabel.className = className;
    rowInput.className = className;
    rowInput.type = inputType;
    rowInput.id = inputId;
    rowInput.value = inputlabel;
    rowInput.innerHTML = inputlabel;

    rowInput2.className = className;
    rowInput2.type = input2Type;
    rowInput2.id = inputId2;
    rowInput2.value = inputlabel2;
    rowInput2.innerHTML = inputlabel2;

    rowLabel.innerHTML = labelText;
    rowHeader.appendChild(rowLabel);

    linkButton.href = "/Home/EditAlarm/" + inputId;
    linkButton.onclick = function () { ShowLoading() };
    linkButton.title = "Seleção de Alarmes de Váriavel";
    linkButton.innerHTML = "Associar Alarmes";
    buttonOfAlarm.appendChild(linkButton);

    rowValue.appendChild(rowInput);
    rowValue2.appendChild(rowInput2);

    //rowButton.appendChild(buttonOfAlarm);
    rowButton.appendChild(linkButton);

    row.appendChild(rowHeader);
    row.appendChild(rowValue);
    row.appendChild(rowValue2);
    row.appendChild(rowButton);

    mainTable.appendChild(row);
}



function CreateTableRowFile(labelText, inputType, inputId, mainTable, className) {
    var row = document.createElement("tr");
    var rowHeader = document.createElement("th");    
    var rowValue = document.createElement("td");    
    var rowLabel = document.createElement("label");
    var rowInput = document.createElement("input");

    //label has Label + hidden input type files
    rowLabel.className = className;
    rowLabel.setAttribute("for", "files");

    let inputFile= document.createElement("input");
    inputFile.type = "file"
    inputFile.i = "files";
    inputFile.style.display = "none";
    
        
    rowInput.className = className;
    rowInput.type = inputType;
    rowInput.id = inputId;
    rowInput.value = "";
    rowInput.autocomplete = "off";

    rowLabel.innerHTML = labelText;
    rowLabel.onclick = function () { transferFileServer() };
    rowHeader.appendChild(rowLabel);
    rowHeader.appendChild(inputFile);    

    rowValue.appendChild(rowInput);

    row.appendChild(rowHeader);
    row.appendChild(rowValue);

    mainTable.appendChild(row);


}

function CreateHiddenTableRow(labelText, inputType, inputId, mainTable, className) {

    var row = document.createElement("tr");
    var rowHeader = document.createElement("th");
    rowHeader.style.padding = "0px";
    var rowValue = document.createElement("td");
    rowValue.style.padding = "0px";
    var rowLabel = document.createElement("label");
    var rowInput = document.createElement("input");

    rowLabel.className = className;
    rowInput.className = className;
    rowInput.type = inputType;
    rowInput.id = inputId;
    rowInput.value = "";
    rowInput.autocomplete = "off";

    rowLabel.innerHTML = labelText;
    rowHeader.appendChild(rowLabel);

    rowValue.appendChild(rowInput);

    row.appendChild(rowHeader);
    row.appendChild(rowValue);

    mainTable.appendChild(row);
}

function CreateTableRowSelect(labelText, inputId, mainTable, className) {

    var row = document.createElement("tr");
    var rowHeader = document.createElement("th");
    var rowValue = document.createElement("td");
    var rowLabel = document.createElement("label");
    var rowSelect= document.createElement("select");

    rowLabel.className = className;
    rowSelect.className = className;    
    rowSelect.id = inputId;
    rowSelect.value = "";
    rowSelect.autocomplete = "off";

    rowLabel.innerHTML = labelText;
    rowHeader.appendChild(rowLabel);

    rowValue.appendChild(rowSelect);

    row.appendChild(rowHeader);
    row.appendChild(rowValue);

    mainTable.appendChild(row);
}

function CreateHiddenTableRowSelect(labelText, inputId, mainTable, className) {

    var row = document.createElement("tr");
    var rowHeader = document.createElement("th");
    rowHeader.style.padding = "0px";
    var rowValue = document.createElement("td");
    rowValue.style.padding = "0px";
    var rowLabel = document.createElement("label");
    var rowSelect = document.createElement("select");

    rowLabel.className = className;
    rowSelect.className = className;
    rowSelect.id = inputId;
    rowSelect.value = "";

    rowLabel.innerHTML = labelText;
    rowHeader.appendChild(rowLabel);

    rowValue.appendChild(rowSelect);

    row.appendChild(rowHeader);
    row.appendChild(rowValue);

    mainTable.appendChild(row);
}

function ReloadTable() {
    setTimeout(RestartTable, 400);
}

function RestartTable() {
    adjustCalculator();
}

function ajustTableHeaders() {
    //pega height e width de table e define o tamanho dos espacos 
    ChangeTableProportions()

    var table = document.getElementById("table");

    var heightTable = table.offsetHeight;
    var widthTable = table.offsetWidth;

    var heightHeader = heightTable / 5;
    var widthHeader = widthTable / 4;

    heightHeader = heightHeader.toString();
    WidthHeader = widthHeader.toString();

    $('.tableHeader').css("width", widthHeader + "px");
    $('.tableHeader').css("height", heightHeader + "px");
}
//To Reshape
function getHeight() {
    var element = document.getElementsByClassName("tableHeader")[0];
    var height = element.offsetHeight;
    return height;
}

function getWidth() {
    var element = document.getElementsByClassName("tableHeader")[0];
    var width = element.offsetWidth;
    return width;
}

//windown for table Lenght;
function getWindownHeight() {
    var window_size = $(window).height();
    return window_size.toString();
}

function getWindownWidth() {
    var window_Width = $(window).width();
    return window_Width.toString();

}

function ChangeTableProportions() {
    var table = document.getElementById('table');

    var windown = getWindownHeight();
    var navItenElement = document.getElementsByClassName("nav-item")[0];
    var navItenElementHeight = navItenElement.offsetHeight;
    var menuBar = document.getElementById("dashboardTable");
    var menuBarHeight = menuBar.offsetHeight;
    var tableHeightFinal = windown - (navItenElementHeight + menuBarHeight + 10);

    var windowWidth = getWindownWidth();
    var sideBarElement = document.getElementsByClassName("main-sidebar")[0];
    var sideBarWIdth = sideBarElement.offsetWidth;

    var tableFinalWidth = windowWidth - sideBarWIdth;


    //final Position Table

    table.style.height = tableHeightFinal + "px";
    table.style.width = tableFinalWidth + "px";

}

function adjustCalculator() {

    var elementScGaugeWidth = document.getElementsByClassName("sc-background")[0];
    if (elementScGaugeWidth != null) {
        var widthScGauge = elementScGaugeWidth.offsetWidth;
        var heightScGauge = elementScGaugeWidth.offsetHeight;
    }

    var heightBackground = widthScGauge / 1.845818181818182;
    $('.sc-background').css("height", heightBackground.toString() + "px");

    //obtem a height da mask para subtrair da height do background e assim achar a pexelagem para o Top;
    var scMaskElement = document.getElementsByClassName("sc-mask")[0];
    if (scMaskElement != null) {

        var HeightMask = scMaskElement.offsetHeight;
        var topMask = (heightBackground - HeightMask) + 1;

        $('.sc-mask').css("top", topMask.toString() + "px");


        var increasedSize = widthScGauge * 0.055;
        widthScGauge = widthScGauge + increasedSize;

        $('.sc-percentage').css("top", heightBackground.toString() + "px");
        $('.sc-percentage').css("width", widthScGauge.toString() + "px");
        $('.sc-percentage').css("height", widthScGauge.toString() + "px");

    }
    changeContainerProperties();
}

function ReprintTable() {
    var dashboardTable = document.getElementById("dashboardTable")
    var table = document.getElementById("table");
    var userId = document.getElementById("userId");
    var panelId = document.getElementById("panelId");

    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    TableStart();

    InitializeDashboard(userId, panelId);
}

function sortTable(table) {

    var  rows, switching, i, x, y, shouldSwitch;
    switching = true;
  

   while (switching) {
 
        switching = false;
        rows = table.rows;
  
        for (i = 1; i < (rows.length - 1); i++) {
          
            shouldSwitch = false;
         
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
         
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
        
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }

    table.style.removeProperty('display');
}

function CheckNumberCell(number)
{
    var table = document.getElementById('table');
    var cells = table.getElementsByTagName('td');

    var content = cells[number].children;

    if (content.length == 0) {
        return number;
    }

    if (content[0].localName === "label") {

        while (cells[number].firstChild) {
            cells[number].removeChild(cells[number].firstChild);
        }
        return number;
    }

    for (var i = 0; cells.length > i; i++) {
        content = cells[i].children;

        if (content.length == 0) {
            return i;
        }

        if (content[0].localName === "label") {
            while (cells[i].firstChild) {
                cells[i].removeChild(cells[i].firstChild);
            }
            return i;
        }
    }
}

function createTableDiv(table, id){
    var div = document.createElement("div");
    div.id = id;
    div.className = "divVariablesContainer";

    table.appendChild(div);
}

function clearLabelDivGraph(div) {
    var label = div.getElementsByTagName("label");

    div.removeChild(label[0]);
}

function CheckRecordValue(recordvalue) {    
    var timer = document.getElementById("timeExtension");

    hideShowTimePeriod(recordvalue);

    if (recordvalue) {
        timer = timer.parentNode.parentNode;
        for (counter = 0; counter < timer.childNodes.length; counter++) {
            timer.childNodes[counter].childNodes[0].className = "inputsTypes";
        }
    }
}



function clearAutoComplete() {
    let elements = document.getElementsByTagName("input");

    for (let i in elements) {
        elements[i].autocomplete = "off";
    }
    let selects = document.getElementsByTagName("select");
    for (let i in selects) {
        selects[i].autocomplete = "off";
    }

}