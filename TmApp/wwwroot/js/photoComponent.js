
function AddPhoto(position, text3, nameValue) {

    var finalPosition = position;
    var cell = table.getElementsByTagName('td')[finalPosition];

    if (checkUrlPhoto(text3)) {
        if (cell.children.length == 0) {
            TransferPhoto(cell, text3, nameValue);
            return "true";
        }
        else {
            position = CheckNumberCell(position);
            TransferPhoto(cell, text3, nameValue);
            return "true";
        }
    }
    else {
        return "false";
    }
}

function checkUrlPhoto(url) {
    url = "url_" + url;
    var element = document.getElementById(url);
    if (element == undefined) {
        return true;
    }
    else if (element != undefined) {
        changeAlarmLabel("URL já está em uso");
        //alert("Variavel já esta em uso");
        return false;
    }
}

function TransferPhoto(cell, text3, nameValue) {
    cell.style.backgroundColor = "#303030";

    let divMain = document.createElement("div");

    divMain.classList.add("maiDivPhoto");
    divMain.classList.add("container");
    cell.appendChild(divMain);

    let divTitle = document.createElement("div");
    divTitle.classList.add("photoTitle");
    divMain.appendChild(divTitle);

    let divTitleHtml = document.createElement("h5");
    divTitleHtml.innerHTML = nameValue;
    divTitle.appendChild(divTitleHtml);
    
    let divPhoto = document.createElement("div");
    divPhoto.id = "url_" + text3;    
    divPhoto.setAttribute("url", text3);
    divPhoto.classList.add("photoDiv");
    divMain.appendChild(divPhoto);

    let photo = document.createElement("img");
    photo.src = "../DOG.jpg";
    photo.classList.add("imagePhoto");
    photo.id = `path_${text3}`;
    divPhoto.appendChild(photo);   
}

function getUrlPhoto(path, id) {
   path = path.response.path;
   let photo = document.getElementById("path_" + id);
    photo.src = path;
   // INPUT PHOTO
}


function RemovePhotoComponent(formerUrl) {
    let div = document.getElementById("url_" + formerUrl);
    let cell = div.parentElement.parentElement;

    while (cell.firstChild) {
        cell.removeChild(cell.firstChild);
    }

    cell.style.backgroundColor = "#222123";
    cell.style.position = "relative";
    cell.style.opacity = 1;

    inputLabelDivTable(cell);
}

function loadPhotos() {
    let urls = document.querySelectorAll('[url]');
    if (urls.length > 0) {
        Array.from(urls).forEach(function (element) {
            //do Stuff with
            let path = element.getAttribute("url");

            $.ajax({
                type: "GET",
                url: "/Dashboard/getLastFileFromPath",
                data: { path: path },
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (response) {
                    getUrlPhoto(response,path);
                    
                },
                error: function (response) { }
            });
        });
    }
}

function transferFileServer() {

    $.ajax({
        type: "GET",
        url: "/Dashboard/getPathServer",
        data: {},
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            loadPaths(response);
        },
        error: function (response) { }
    });
}

function loadPaths(pathArray) {

    pathArray = pathArray.pathArray;
    if (pathArray.length > 0) {
        let pathsDiv = document.getElementById("pathsDiv");
        pathsDiv.style.opacity = 1;

        let table = document.getElementById("tablePaths");

        while (table.firstChild) {
            table.removeChild(table.firstChild);
            //clearTable
        }

        for (let i in pathArray) {
            let row = document.createElement("tr");
            table.appendChild(row);

            let td = document.createElement("td");  
            td.innerHTML = pathArray[i];
            row.appendChild(td);
            td.onclick = function () { tranferPath(pathArray[i]) }
        }
    }
    else {
        changeAlarmLabel("Nenhum Caminho Encontrado");
    }
}

function tranferPath(path) {
    let input = document.getElementById("text3")    
    input.value = path;    
}

function closePaths() {
    let pathsDiv = document.getElementById("pathsDiv");
    pathsDiv.style.opacity = 0;
}