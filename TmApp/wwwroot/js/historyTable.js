function transferVariableComponent(component) {
    //take html of previus element and put it on new DIV

    var SelectedeComponentsDiv = document.getElementById("listOfSelectedComponents");

    var component = component.parentElement.parentElement.childNodes[1].childNodes[1];
    var variable = component.id;
    var componentId = component.parentElement.parentElement.id;
    variable = variable.split("_")[1];

    var nameSelected = "selectedVariable_" + variable;
    var variableBool = document.getElementById(nameSelected);

    if (variableBool == undefined) {
        var sonDiv = document.createElement("div");
        sonDiv.classList.add("rowSelectedVariable");
        sonDiv.id = componentId
        SelectedeComponentsDiv.appendChild(sonDiv);

        var tagArrow = document.createElement("arrow");
        tagArrow.className = "fas fa fa-arrow-left arrowHover arrowSelectedVariable";
        tagArrow.onclick = function () { DeletedSelectedVariableFromDiv(variable) };
        sonDiv.appendChild(tagArrow);

        var finalVariable = document.createElement("span");
        finalVariable.nodeValue = variable;
        finalVariable.id = "selectedVariable_" + variable;
        finalVariable.innerHTML = component.innerText;
        finalVariable.classList.add("labelSelectedVariable");
        sonDiv.appendChild(finalVariable);

        ChangeColorTrHistory(variable);
    }
}

function DeletedSelectedVariableFromDiv(variable) {
    //get Id, delete other Id, call changeColor;
    var row = document.getElementById("selectedVariable_" + variable).parentElement;
    row.parentElement.removeChild(row);

    ChangeColorTrHistory(variable);
}


function ChangeColorTrHistory(variable) {  

    var elements = document.getElementsByClassName("variable_" + variable);
    for (var counter = 0; elements.length > counter; counter++) {
        element = elements[counter];
        element = element.parentElement.parentElement;
        if (element.classList.contains("historyRowComponents")){
            //if (element.className == "historyRowComponents") {
            element.classList.remove("historyRowComponents");
            element.classList.add("historyRowComponentsSelected");
        }
        //(element.className == "historyRowComponentsSelected")
        else if (element.classList.contains("historyRowComponentsSelected")){
            element.classList.remove("historyRowComponentsSelected");
            element.classList.add("historyRowComponents");
        }
    }
}