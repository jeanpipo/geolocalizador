//Prototypes


var objectToArray = function(obj) {
    return Object.keys(obj).map(function (key) {
        return obj[key];
    });
};

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var redirectIfNotAuthorized = function(data) {
    if (data.type === 'err' && data.code === 99)
        window.location = "http://www.google.com"; //Cambiar por paǵina de loggin
};

function scapeCharacters (st){
    var ltr = ['[àáâãä]','[èéêë]','[ìíîï]','[òóôõö]','[ùúûü]','ñ','ç','[ýÿ]','\\s|\\W|_',' ']; //,'\\s|\\W|_'
    var rpl = ['a','e','i','o','u','n','c','y','','']; //,''
    var str = String(st.toLowerCase());

    for (var i = 0, c = ltr.length; i < c; i++){
        var rgx = new RegExp(ltr[i],'g');
        str = str.replace(rgx,rpl[i]);
    }
    return str;
};

function showDialog(title, message) {
    $("#modalTitle")[0].innerHTML = title;
    $('#dialogMessage')[0].innerHTML = message;
    $('#modalInfo').modal({
        show: 'true'
    });
};

function listToTree(data, options) {
    options = options || {};
    var ID_KEY = options.idKey || 'id';
    var PARENT_KEY = options.parentKey || 'parent';
    var CHILDREN_KEY = options.childrenKey || 'children';


    var tree = [],
        childrenOf = {};
    var item, id, parentId;

    Object.keys(data).forEach(function(key) {
        item = data[key];
        id = item[ID_KEY];
        parentId = item[PARENT_KEY] || 0;
        // every item may have children
        childrenOf[id] = childrenOf[id] || [];
        // init its children
      
        item[CHILDREN_KEY] = childrenOf[id];
        if (parentId != 0) {
            // init its parent's children object
            childrenOf[parentId] = childrenOf[parentId] || [];
            // push it into its parent's children object
            childrenOf[parentId].push(item);
        } else {
            tree.push(item);
        }
    });
    return tree;
}

function generateContainer(divClass, id, divText,otherParams){
    var container;
    if(otherParams){
        container =  $("<div>",{
            "class":divClass,
            "id":id,
            "data-toggle":otherParams[0],
            "href":otherParams[1],
            "style": otherParams[2],
            "text": divText,
            "aria-expanded":otherParams[3],
            "innerHTML":otherParams[4]
        });
    }
    else{
        container =  $("<div>",{
            "class":divClass,
            "id":id
        }); 
    }
    

    return container;
}

function generateSpan(count,spanClass, value){

    var span = $("<span>",{
        "class":spanClass,
        "id":count,
        "text":value
    });

    return span;
}

function generateParagraph(count,pClass, value, style){

    var p = $("<p>",{
        "class":pClass,
        "id":"p"+count,
        "text":value,
        "style":style
    });

    return p;
}

function generateButton(count,buttonClass, value){

    var button = $("<button>",{
        "class":buttonClass,
        "id":"button"+count,
        "text":value,
        "style":"margin-top:5px;"
    });

    return button;
}

function generateLabel(count,labelClass,value){

    var label = $("<label>",{
        "class":labelClass,
        "id":"label"+count,
        "style":"margin-top:5px;"
    });

    return label;
}

function generateInput(count,inputClass,value,type){

    var input = $("<input>",{
        "type":type,
        "class":inputClass,
        "id":"input"+count,
        "value":value,
        "style":"margin-top:5px;"
    });

    return input;
}

function generateSelect(count,selectClass,value,type){

    var select = $("<select>",{
        "type":type,
        "class":selectClass,
        "id":"select"+count,
        "multiple":value,
        "style":"margin-top:5px;"
    });

    return select;
}

function generateOption(count,optionClass,value,type,text){

    var option = $("<option>",{
        "type":type,
        "class":optionClass,
        "id":"option"+count,
        "value":value,
        "text":text
    });

    return option;
}

function appendTo(objToAppend, idToAppendTo) {
    objToAppend.appendTo("#"+idToAppendTo);
}
