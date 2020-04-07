// document.getElementById("input").onkeyup = function(e) {

// };

var createXMLTree = function(){
    console.clear();

    var inputText = document.getElementById("input").value;
    var oParser = new DOMParser();
    var oDOM = oParser.parseFromString(inputText, "text/xml");

    console.log(oDOM.children);
    var rootXMLElement = oDOM.children[0];

    recursiveXMLTree(rootXMLElement, document.getElementById("output"));
    
    for (var i = 0; i < document.getElementById("output").children.length; i++) {
        document.getElementById("output").children[i].style.display = "";
    };
}

var getChildNumberPill = function(number) {
    var numberPill = document.createElement("span");
    numberPill.classList.add("badge");
    numberPill.classList.add("badge-primary");
    numberPill.classList.add("badge-pill");
    numberPill.innerHTML = "" + number + "";
    return numberPill;
}

var level = 0;
var recursiveXMLTree = function(rootXMLElement, parent) {
    var spanElement = document.createElement("span");
    spanElement.innerHTML = rootXMLElement.tagName;
    // parent.prepend(spanElement);

    var currentXML = rootXMLElement;
    var currentNode;
    currentNode = document.createElement("ul");
    currentNode.innerHTML = "&nbsp &nbsp" + "<b>" + currentXML.tagName + "</b>";
    currentNode.style.cursor = "pointer";
    currentNode.style.display = "none";
    currentNode.addEventListener('click', hideChildElements, false);
    currentNode.setAttribute("id", currentXML.tagName);

    //if current has children
    if (currentXML.children.length !== 0) {
        level++;

        currentNode.prepend(getChildNumberPill(currentXML.children.length));

        //iterate over children
        for (var i = 0; i < currentXML.children.length; i++) {
            recursiveXMLTree(currentXML.children[i], currentNode);
        }
    }
    //nochildren
    else {
        //lasts element, so style with only containing one value
        currentNode.prepend(getChildNumberPill(1));

        console.log("Parent: " + parent.getAttribute("id") + "  " + level + "  " + currentNode.getAttribute("id"));
        //list value
        valueNode = document.createElement("ul");
        //if first terminating value is null
        if (((currentXML.firstChild == undefined) || (currentXML.firstChild == null))) {
            valueNode.innerHTML = "<b>Null entry</b>";
        } else {
            valueNode.innerHTML = currentXML.firstChild.nodeValue;
            valueNode.setAttribute("id", currentXML.firstChild.nodeValue);
        }

        valueNode.style.display = "none";

        //append to current node to complete tree
        currentNode.appendChild(valueNode);
    }
    parent.appendChild(currentNode);
    return currentNode;
};

var hideChildElements = function(event) {
    event.stopPropagation();

    console.log("No. of children : " + event.currentTarget.children.length);
    for (var i = 0; i < event.currentTarget.children.length; i++) {
        if (event.currentTarget.children[i].tagName == "SPAN") {
            console.log("innerthtml = " + event.currentTarget.children[i].innerHTML);

            if ((event.currentTarget.children[i].innerHTML !== "&#9660;") && (event.currentTarget.children[i].innerHTML !== "▼")) {
                event.currentTarget.children[i].innerHTML = "&#9660;";
            } else {
                //account for span now being part of children
                console.log("here again")
                event.currentTarget.children[i].innerHTML = "" + event.currentTarget.children.length - 1;
            }
        }

        if (event.currentTarget.children[i].tagName == "UL") {
            if (event.currentTarget.children[i].style.display == "none") {
                event.currentTarget.children[i].style.display = "";
            } else {
                event.currentTarget.children[i].style.display = "none";
            }
        }

        console.log(event.currentTarget);
    }
};