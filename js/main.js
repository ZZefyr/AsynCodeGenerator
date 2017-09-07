/*
Author: Zdeněk Vojkůvka
Company: Internet Billboard a. s.
Date: 6/2017
Version: 1.02
*/
function putVariable() {
    //zobrazeni-skryti nekterych buttonu pri generovani
    document.getElementById('code').style.display = "block";
    document.getElementById('editBtn').style.display = "block";
    document.getElementById('removeBtn').style.display = "none";


    var pocetSpan = document.getElementsByClassName("slotVariable").length;
    var pocetLabel = document.getElementsByClassName("labelIdPosition").length;
    var divSlots = document.getElementById('divSlots');
    var templatePosition = document.getElementById("manageAdSlot");
    var keywordValues = document.getElementById("keywordValues").value.trim();

    //vlozeni instance do DOM stranky
    var getAdProvider = document.getElementById('useAdProvider');
    getAdProvider.innerHTML = "var adserver = ibbAds.tag.useAdProvider('"+ document.getElementById("selectInstance").value +"'); <br>";

    //kontrola vkladanych promennych proti poctu spanu, ve kterych jsou zobrazeny.
    for (n = pocetSpan; n < pocetLabel; n++) {
        console.log("Počet cyklů");
        var createManageAdslot = document.createElement("span");
        createManageAdslot.className = "slotVariable";

        //vlozeni manage ad slot promennych do DOM stranky
        templatePosition.appendChild(createManageAdslot);
        var slotName = document.getElementById('inputName' + n).value.trim();
        var adServerId = document.getElementById('inputId' + n).value.trim();

        createManageAdslot.innerHTML = "adserver.manageAdSlot('" + slotName + "', '" + adServerId + "'); <br>";

        //vlozeni div ad-slotu do vysledku generovani
        var createDivSlots = document.createElement("div");
        createDivSlots.className = "exampleSlot";

        //vlozeni div ad slot promennych do DOM stranky
        divSlots.appendChild(createDivSlots);
        createDivSlots.innerHTML ="&lt;div id=\""+ slotName + "\"&gt;&lt;/div&gt;<br>";

    }
    //pokud nejsou keywordy vlozeny, nevkladej do templatu nic
    if (keywordValues === ""){
        document.getElementById("keywords").innerHTML = null;
        document.getElementById("keywords").style.display ="none";
    }
    else {
        document.getElementById("keywords").style.display ="block";
        document.getElementById("keywords").innerHTML = "adserver.attachData('keywords','" + keywordValues + "');";
    }

}

//inicializovana po kliku na button back, skryva code template a zobrazuje remove button
//maze prechozí vlozené promenné v code template, aby se tam mohly vlozit opetovne znovu.
function edit() {
    document.getElementById('code').style.display = "none";
    document.getElementById('editBtn').style.display = "none";
    document.getElementById('removeBtn').style.display = "block";
    var elems = document.getElementsByClassName("slotVariable");
    for (var k = elems.length - 1; k >= 0; k--) {
        var parent = elems[k].parentNode;
        parent.removeChild(elems[k]);
    }
    var elemsSlot = document.getElementsByClassName("exampleSlot");
    for (var b = elemsSlot.length - 1; b >= 0; b--) {
        var parentSlot = elemsSlot[b].parentNode;
        parentSlot.removeChild(elemsSlot[b]);
    }
}

//pridava dalsí input rádky pro pozice
function addLine(){
    var pocetInput = document.getElementsByClassName("idInput").length / 2;
    for (n = pocetInput; n <= pocetInput; n++) {

        var nextDiv = document.createElement("div");
        nextDiv.id = "positionIdInput" + n;
        var nextLabel = document.createElement("label");
        nextLabel.className ="control-label labelIdPosition";
        nextLabel.innerHTML = "Position number " + (n + 1);


        var nextInputName = document.createElement("input");
        nextInputName.type = "text";
        nextInputName.className = "form-control idInput";
        nextInputName.name = "inputName" + n;
        nextInputName.id = "inputName" + n;
        nextInputName.placeholder = "Name of Ad-Slot element";

        var nextInputId = document.createElement("input");
        nextInputId.type = "text";
        nextInputId.className = "form-control idInput";
        nextInputId.name = "inputId" + n;
        nextInputId.id = "inputId" + n;
        nextInputId.placeholder = "Position ID from Ad Server";

        var nextLinePosition = document.getElementById("inputsForIds");
        nextLinePosition.appendChild(nextDiv);
        nextDiv.appendChild(nextLabel);
        nextDiv.appendChild(nextInputName);
        nextDiv.appendChild(nextInputId);

    }

}

//odstranuje posledně pridaný input rádek pro pozici
function removeLine (elementId) {
    var list = document.getElementById(elementId); 
    list.removeChild(list.lastChild);
}


