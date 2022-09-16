function saveLayer() {
    var layerName = document.getElementById("newName").value;
    var layerDescription = document.getElementById("newDescription").value;
    var layerColor = document.getElementById("newColor").selectedIndex;
    layerColor = document.getElementById("newColor")[layerColor].value;
    var idMap = document.getElementById("idMapLayer").value;
    var layerSound = document.getElementById("newSound").selectedIndex;
    layerSound = document.getElementById("newSound")[layerSound].value;

    if (layerName != "") {

        $.ajax({
            url: "/Maps/SaveLayer",
            type: 'POST',
            data: {
                layerName: layerName,
                layerDescription: layerDescription,
                layerColor: layerColor,
                idMap: idMap,
                layerSound: layerSound
            },
            complete: function (data) {
                if (data.responseJSON != 0) {
                    var id = data.responseJSON;
                    addNewLayerDivEdit(layerName, layerDescription, layerColor, layerSound, id);
                    addNewLayerDivRemove(id, layerName);
                    cleanSaveLayerInputs();
                    changeAlarmLabel("Camada Salva");                    
                }
                else {
                    changeAlarmLabel("Falha na Adição");                    
                }
            }
        });
    }
    else {
        alert("Insira um Nome para a Camada");
    }
}

function addNewLayerDivEdit(layerName, layerDescription, layerColor, layerSound, id) {
    var mainDiv = document.getElementById("layerDivEdit");

    var editDivLayer = document.createElement("div");
    editDivLayer.className = "editLayers";
    editDivLayer.id = "editLayer_" + id;
    mainDiv.appendChild(editDivLayer);
        
    var labelName = document.createElement("label");
    labelName.innerHTML = "Nome";
    editDivLayer.appendChild(labelName);

    var inputName = document.createElement("input");
    inputName.id = "name_" + id;
    inputName.value = layerName;
    editDivLayer.appendChild(inputName);

    var labelDescription = document.createElement("label");
    labelDescription.innerHTML = "Descrição";
    editDivLayer.appendChild(labelDescription);

    var inputDescription = document.createElement("input");
    inputDescription.id = "description_" + id;
    inputDescription.value = layerDescription;
    editDivLayer.appendChild(inputDescription);

    var labelColor = document.createElement("label");
    labelColor.innerHTML = "Cor";
    editDivLayer.appendChild(labelColor);

    var selectColor = document.createElement("select");
    selectColor.id = "color_" + id;
    editDivLayer.appendChild(selectColor);

    var option0 = document.createElement("option");
    option0.value = "Standart";
    option0.innerHTML = "Padrão";
    selectColor.append(option0);

    var option1 = document.createElement("option");
    option1.value = "Amarelo";
    option1.innerHTML = "Amarelo";
    selectColor.append(option1);

    var option2 = document.createElement("option");
    option2.value = "Vermelho";
    option2.innerHTML = "Vermelho";
    selectColor.append(option2);

    var option3 = document.createElement("option");
    option3.value = "Azul";
    option3.innerHTML = "Azul";
    selectColor.append(option3);

    var option4 = document.createElement("option");
    option4.value = "Cinza";
    option4.innerHTML = "Cinza";
    selectColor.append(option4);

    var option5 = document.createElement("option");
    option5.value = "Escuro";
    option5.innerHTML = "Escuro";
    selectColor.append(option5);

    var labelSound = document.createElement("label");
    labelSound.innerHTML = "Som do Alarme";
    editDivLayer.appendChild(labelSound);

    var selectSound = document.createElement("select");
    selectSound.id = "sound_" + id;
    editDivLayer.appendChild(selectSound);

    var optionSound1 = document.createElement("option");
    optionSound1.value = "0";
    optionSound1.innerHTML = "Sem Som";
    selectSound.append(optionSound1);

    var optionSound2 = document.createElement("option");
    optionSound2.value = "1";
    optionSound2.innerHTML = "Padrão";
    selectSound.append(optionSound2);

    var optionSound3 = document.createElement("option");
    optionSound3.value = "3";
    optionSound3.innerHTML = "Vocal";
    selectSound.append(optionSound3);

    var optionSound4 = document.createElement("option");
    optionSound4.value = "4";
    optionSound4.innerHTML = "Alarme Rápido";
    selectSound.append(optionSound4);

    var button = document.createElement("button");
    button.innerHTML = "Editar";
    button.className = "editLayerBtn";
    button.onclick = function () { editLayer(id); };

    editDivLayer.appendChild(button);
}

function addNewLayerDivRemove(id, name) {
    var mainDiv = document.getElementById("deleteLayerDiv");

    var labelName = document.createElement("label");
    labelName.id = "deleteName_" + id;
    labelName.innerHTML = name;
    mainDiv.appendChild(labelName);

    var button = document.createElement("button");
    button.className = "deleteLayerBtn";
    button.id = "deleteButtonLayer_" + id;
    button.innerHTML = "Deletar";
    button.onclick = function () { removeLayer(id); };
        
    mainDiv.appendChild(button);
}

function cleanSaveLayerInputs() {

    var name = document.getElementById("newName");
    var description = document.getElementById("newDescription");
    var color = document.getElementById("newColor");
    var sound = document.getElementById("newSound");

    name.value = "";
    description.value = "";
    color.selectedIndex = 0;
    sound.selectedIndex = 1;
}

function removeLayerNew() {
    var divSave = document.getElementById("saveLayers");
    divSave.style.display = "none";
}

function removeLayerEdit() {
    var divEdit = document.getElementById("editLayers");
    divEdit.style.display = "none";
}

function removeLayerDelete() {
    var divEdit = document.getElementById("deleteLayers");
    divEdit.style.display = "none";
}

function removeLayer(id) {

    $.ajax({
        url: "/Maps/DeleteLayer",
        type: 'POST',
        data: {
            id: id
        },
        complete: function (data) {
            if (data.responseJSON) {
                deleteLayerEdit(id);
                deleteLayerDelete(id);                
                changeAlarmLabel("Camada Deletada");
            }
            else {
                changeAlarmLabel("Falha em deletar a camadada");
            }
        }
    });  
}

function deleteLayerEdit(id) {
    var editLayer = document.getElementById("editLayer_" + id);
    editLayer.remove();
}

function deleteLayerDelete(id) {
    var deleteLayerButton = document.getElementById("deleteButtonLayer_" + id);
    var deleteLayerName = document.getElementById("deleteName_" + id);
    deleteLayerButton.remove();
    deleteLayerName.remove();
}

function editLayer(id) {

    var layerName = document.getElementById("name_" + id).value;
    var layerDescription = document.getElementById("description_" + id).value;
    var layerColor = document.getElementById("color_" + id).selectedIndex;
    layerColor = document.getElementById("color_" + id)[layerColor].value;
    var layerSound = document.getElementById("sound_" + id).selectedIndex;
    layerSound = document.getElementById("sound_" + id)[layerSound].value;

    if (layerName != "") {
        $.ajax({
            url: "/Maps/EditLayer",
            type: 'POST',
            data:
            {
                id: id,
                layerName: layerName,
                layerColor: layerColor,
                layerDescription: layerDescription,
                layerSound: layerSound
            },
            complete: function (data) {
                //update List
                editLayerDelete(id, layerName);
                changeAlarmLabel("Edição com Sucesso");                
            }
        });
    }
    else {
        changeAlarmLabel("Coloque um Nome para a camada");        
    }
}

function editLayerDelete(id, name) {
    var deleteName = document.getElementById("deleteName_" + id);
    deleteName.innerHTML = name;    
}




function hideAllLayer() {
    var deleteWindowLayer = document.getElementById("deleteLayers");
    var saveWindowLayer = document.getElementById("saveLayers");
    var editWindowLayer = document.getElementById("editLayers");

    deleteWindowLayer.style.display = "none";
    saveWindowLayer.style.display = "none";
    editWindowLayer.style.display = "none";
}

function showDeletelayer() {
    hideAllLayer();

    var deleteWindowLayer = document.getElementById("deleteLayers");
    deleteWindowLayer.style.display = "block";
}

function showSavelayer() {
    hideAllLayer();

    var saveWindowLayer = document.getElementById("saveLayers");
    saveWindowLayer.style.display = "block";
}

function showEditlayer() {
    hideAllLayer();

    var editWindowLayer = document.getElementById("editLayers");
    editWindowLayer.style.display = "block";
}


