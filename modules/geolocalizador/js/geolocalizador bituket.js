
var map;

var globalPruneCluster = new PruneClusterForLeaflet();
var control;
var marker ={"uno":[],"dos":[],"tres":[],"cuatro":[], "names":{"nameUno":"","nameDos":"","nameTres":"", "nameCuatro":""}};

var vista = '';
var conf;
var zooms="aÃ±o";
var max =getMaxAmountOfthirty();
var min =max-60;
var bufferOptions =[];

var infPop = {"infPop":[]};

function initDatePicker(){
	$('#date').datepicker({
            format: 'mm/dd/yyyy'
    });
}

function initSlider(){
	let cad ='';
	cad+='<input type="text" id="rangeSlider" >';
	cad+='<input type="text" id="rangeHoras" >';

	$(cad).appendTo("#slider-range");

	$('#rangeSlider').slider({
		value:(max-(getValueAge()/2)),
		step:1,
		min: min,
		max: max-1,
		tooltip:"hide",
		id:"styleSliderCustom",
		handle:"rounds"
	})
	$('#rangeSlider').on("slideStop",function (){
		sliderStep();
		$('#fechaInput').datetimepicker('hide');
	});

	$('#rangeHoras').slider({
		value:[20,28],
		step:1,
		min: 0,
		max: 47,
	  tooltip:"hide",
		id:"styleSliderCustom",
		handle:"rounds"
	//	custom
	})

	$('#rangeHoras').on("slideStop",function (){
		setFechaHora(getDate(),$('#rangeHoras').slider("getValue"));
	});


	cad='';
	cad+='<div  class="input-group date "  data-provide="datetimepicker" id="cntnr">';
	cad+='<ul id="items">';
	cad+='<li><input style="" type="button" value="Calendario" dateFormat: "DD/MM/YYYY" class="form-control" id="fechaInput"></li>';
	cad+='</ul>';
	cad+='</div>';  // esten era lo que estaba antes cad+='	<input type="button" value="iuhuihuih'+getDate()+'" onchange="papa();"  dateFormat: "DD/MM/YYYY" class="form-control" id="fechaInput">';

	//cad='<input type="text" value="'+getDate()+'" format="datetime" class="datepicker" dateFormat: "DD/MM/YYYY HH:mm" id="fecha">';
	setParamsSlider();

	$(cad).appendTo("#fecha");
	$('#fechaInput').datetimepicker({
							 format: 'DD/MM/YYYY'
					}).on('dp.change',function(e) {
							let date =new Date(e.date);


							if(e.oldDate && e.date!=e.oldDate){
				      	selectedDate(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getUTCFullYear()/*$('#fechaInput').val()*/);
							}


				    }).on('dp.show',function(e) {
								let date =$("#fechaLeyenda").text().split("/");

								$('#fechaInput').data("DateTimePicker").maxDate(new Date());
								$('#fechaInput').data("DateTimePicker").minDate(new Date("Mon Aug 10 1980"));

							//	$('#fechaInput').data("DateTimePicker").useCurrent(true);
								console.log(new Date(date[2]+"/"+date[1]+"/"+date[0])+" jeeeey "+$("#fechaLeyenda").text());
								$('#fechaInput').data("DateTimePicker").date(new Date(date[2]+"/"+date[1]+"/"+date[0]))
								$("#fechaInput").val("Calendario");
								//console.log(new Date(date[2]+"/"+date[1]+"/"+date[0])+" ***** "+$("#fechaLeyenda").text());
					    }).on('dp.hide',function (e){
								closeMenuToLounchCalender();
							});

	setFechaHora(getDate(),$('#rangeHoras').slider("getValue"));
	$("#fechaInput").val("Calendario");
}

function closeMenuToLounchCalender(){
	$("#cntnr").hide();
}

function menuToLounchCalender(e){
	var e =  window.event || event;

	let isRightMB=false;
	if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
			isRightMB = e.which == 3;
	else if ("button" in e)  // IE, Opera
			isRightMB = e.button == 2;


		//alert("cff");
		$("#cntnr").show();
		window.event.returnValue = false;


		  e.preventDefault();
		  console.log(e.pageX + "," + e.pageY);
		  $("#cntnr").css("left",e.pageX);
		  $("#cntnr").css("top",e.pageY);
		 // $("#cntnr").hide(100);
		  $("#cntnr").fadeIn(200,startFocusOut());


		function startFocusOut(){
		  $(document).on("click",function(){
		  //$("#cntnr").hide();
		  $(document).off("click");
		  });
		}

		/*$("#items > li").click(function(){
			$("#op").text("You have selected "+$(this).text());
			//alert($(this).text());
		});*/

}

function selectedDate(date){
	date=date.split("/");
	$('#rangeSlider').slider("setValue",Math.floor(((new Date(date[1]+"/"+date[0]+"/"+date[2]) - new Date("08/10/1980"))/(1000*60*60*24))/* *48*/));
	sliderStep();
}

function advanceOne(){
	if(parseInt($('#rangeSlider').slider("getValue"))+1<getMaxAmountOfthirty()){
		$('#rangeSlider').slider("setValue",parseInt($('#rangeSlider').slider("getValue"))+1);
		sliderStep();
	}
}

function backWard(){
	if(parseInt($('#rangeSlider').slider("getValue"))-1>0){
		$('#rangeSlider').slider("setValue",parseInt($('#rangeSlider').slider("getValue"))-1);
		sliderStep();
	}
}

function getMin(){

	if(zooms!="todo" && parseInt($("#rangeSlider").slider("getAttribute","min")) >1)
		return max-getValueAge();//-($("#rangeSlider").val()-(getValueAge()/2));
	else if(zooms!="todo" && parseInt($("#rangeSlider").slider("getAttribute","min")) ==1)
		return (getValueAge()/2);
	else
		return 1;
}

function getValueAge(){
	return 60;
}

function setParamsSlider(){

	if(getMin()>=1 ){

	  var minimo=(parseInt($('#rangeSlider').slider("getValue")))-(max-getValueAge())-(getValueAge()/2);

		if(minimo<=0 ){

			 max+=minimo;
			 minimo+=parseInt($("#rangeSlider").slider("getAttribute","min")/*$("#rangeSlider").prop('min')*/);

			 if($('#rangeSlider').slider("getValue") == parseInt($("#rangeSlider").slider("getAttribute","min")))
			 	  minimo=parseInt($("#rangeSlider").slider("getAttribute","min"))-(getValueAge()/2);
		 }
		 else if(minimo) {

			 	max+=minimo;

				if(max>getMaxAmountOfthirty())
				 		max=getMaxAmountOfthirty();

				if($('#rangeSlider').slider("getValue")>max)
						$('#rangeSlider').slider("setAttribute","max",max);

					minimo+=parseInt($("#rangeSlider").slider("getAttribute","min"));

				if(1 == parseInt($("#rangeSlider").slider("getAttribute","min")) && $('#rangeSlider').slider("getValue")>=(parseInt($("#rangeSlider").slider("getAttribute","max"))-Math.floor(getValueAge()*0.08))){
						 minimo=parseInt($('#rangeSlider').slider("getValue"))-(getValueAge()/2);
				}
		 }
	}
	else
		var minimo =1;

		console.log("minimo= "+minimo+" maximo= "+max+" el valor= "+$('#rangeSlider').slider("getValue"));
		if(max != getMaxAmountOfthirty())
			$('#rangeSlider').slider("setAttribute","max", max);
		else
			$('#rangeSlider').slider("setAttribute","max", max-1);
		$('#rangeSlider').slider("setAttribute","min", minimo);
		$('#rangeSlider').slider("setValue",$('#rangeSlider').slider("getValue"));
}

function setValueSlider(){
	if($('#rangeSlider').slider("getValue") <= (parseInt($("#rangeSlider").slider("getAttribute","min"))+Math.floor(getValueAge()*0.08)) && $("#rangeSlider").slider("getAttribute","min")!=1 )
		setParamsSlider();

	else if($('#rangeSlider').slider("getValue") >= (max-Math.floor(getValueAge()*0.08)) && max != getMaxAmountOfthirty())
		setParamsSlider();
}

function getDate(){
	var fech = calculateDate($('#rangeSlider').slider("getValue"));
	//let hour =fech.getHours();
	//let minute=fech.getMinutes();
	let day = fech.getDate();
	let month = fech.getMonth()+1;

/*	if(hour.toString().length==1)
		hour="0"+""+hour;

	if(minute.toString().length==1)
		minute="0"+""+minute;*/

	if(day.toString().length==1)
		day="0"+""+day;

	if(month.toString().length==1)
		month="0"+""+month;


	return day+"/"+(month)+"/"+fech.getUTCFullYear();//+" "+hour+":"+minute;
}
function sliderStep(){
	setValueSlider();

	// esto estaba antes $("#fechaInput").val(getDate());
	setFechaHora(getDate(),$('#rangeHoras').slider("getValue"));
	$("#fechaInput").val("Calendario");
}

function getMaxAmountOfthirty(){
	return Math.floor(((new Date() - new Date("Sun Aug 09 1980"))/(1000*60*60*24)))/* *48 */; /*48 ---> cantidad de 30 mn por dia */
																													// (1000*60*60*24) --> milisegundos -> segundos -> minutos -> horas -> dÃ­as
}

function DateAdd(timeU, byMany, dateObj) {
	var millisecond = 1;
	var second = millisecond * 1000;
	var minute = second * 60;
	var minute = second * 60;
	var hour = minute * 60;
	var day = hour * 24;

	var newDate;
	var dVal = dateObj.valueOf();
	switch (timeU) {
			case "minute": newDate = new Date(dVal + minute * byMany); break;
			case "hour": newDate = new Date(dVal + hour * byMany); break;
			case "day": newDate = new Date(dVal + day * byMany); break;
			case "day2": newDate = new Date(dVal + day * parseInt(byMany)); break;
	}
	return newDate;
}

function calculateDate(amountOfThirty) {
		var Periodo = parseFloat(amountOfThirty/* *30*/);
		var UnidadesDelPeriodo = "day";
		// FechaInicio = "Sun Aug 9 1980 23:59:59";
		 var FechaInicio = new Date("Sun Aug 9 1980");

		FechaInicio = DateAdd(UnidadesDelPeriodo, 1, FechaInicio);

		var fecha = DateAdd(UnidadesDelPeriodo, Periodo, FechaInicio);

		return fecha;

}

function initMap(){

	var tileMap1 = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        tileMap2 = 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png';

    var streets = L.tileLayer(tileMap1, {
            id: 'osm'
        });

    var grayscale = L.tileLayer(tileMap2);

    var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });
    var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });

    var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });

    var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });

	map = L.map('mapResults', {
		center: [-35.0000000,-58.0000000],
		attributionControl:false ,
		zoom: 9,
		layers: [streets]
	});

	var baseLayers = {
		"Mapa": grayscale,
        "Satelite": streets,
        "Google": googleStreets,
        "GoogleSat": googleSat,
        "GoogleHybrid": googleHybrid,
        "GoogleTerrain": googleTerrain
	};

	var overlays = {

	};
	markerClusterLayer = new PruneClusterForLeaflet({
		disableClusteringAtZoom: 10
	}).addTo(map);

	addMapMark();

	L.control.layers(baseLayers, overlays).addTo(map);
	//var clusterGroup = new L.markerClusterGroup();

/*	markerClusterLayer = L.markerClusterGroup({
		disableClusteringAtZoom: 13
	});*/



}

function createTimeRangeElement(){

	var div =  generateContainer('', 'time-range','','');
	//appendTo(generateParagraph('','', 'Fecha: ', 'font-weight:bold'), 'time-range');
	appendTo(generateContainer('fecha','fecha'),'time-range' /*'p'*/);
	//appendTo(generateContainer('fecha','slider-time', '9:00 AM'),'time-range' /*'p'*/);
	appendTo(generateContainer('sliders_step1', 'sliders_step1'), 'time-range');
	appendTo(generateContainer('', 'slider-range'), 'sliders_step1');

	return div;
}

function initTree(){
	$.jstree.defaults.checkbox.cascade_to_hidden;
	$('#jstree_div').jstree({
		'core' : {
			"check_callback" : true,
			"themes" : { "icons": false },
			"data": [{
				"text": conf.tree[0].root,
		    "state" : conf.state.state,
				"children":conf.tree[0].children
			}]
		},
		"check_callback" : true,
    "conditionalselect" : function (node, event) {
					if(node.text!=conf.tree[0].root){

						var e =  window.event || event;

						let isRightMB=false;
						if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
								isRightMB = e.which == 3;
						else if ("button" in e)  // IE, Opera
								isRightMB = e.button == 2;

					if(!isRightMB){
							if(bufferOptions.indexOf(node)>-1){
								deleteOptionsCake(node);
								bufferOptions.splice(bufferOptions.indexOf(node),1);
							}
							else {
								if(!deleteOptionsCake(node)){
									if(bufferOptions.length<4)
										bufferOptions.push(node);
								}

							}
					}

					}
		      return false;
		    },
				"contextmenu":{
			    "items": function($node) {
							if($("#opcion2grafico #opcion2Cake").text()){
					    	return optionsMenuRightClickTree();
							}
			    }
			},
		 "plugins" : [ "wholerow", "conditionalselect","contextmenu" ]
	});
	$(function () {
	  $("#jstree_div").jstree({
	    "checkbox" : {
	      "keep_selected_style" : false
	    },
	    "plugins" : [ "checkbox"]
	  });
	});
}

function getJSONFracciones(){
	return [
										{
											"uno":[{"startAngle":"0" ,"stopAngle":"360"}
														]
										},
										{
											"dos":[{"startAngle":"180","stopAngle":"360"},
															{"startAngle":"0","stopAngle":"180"}
														]
										},
										{
											"tres":[{"startAngle":"360","stopAngle":"240"},
															{"startAngle":"0","stopAngle":"120"},
															{"startAngle":"120","stopAngle":"240"}
														]
										},
										{
											"cuatro":[{"startAngle":"270","stopAngle":"360"},
															{"startAngle":"0","stopAngle":"90"},
															{"startAngle":"180","stopAngle":"270"},
															{"startAngle":"90","stopAngle":"180"}
														]
										}
									];
}

function applyOptionsSlected(){
let keys= ["uno","dos","tres","cuatro"];
let x=0;
let fracciones = getJSONFracciones();
let bool=false;
	//for(let node of bufferOptions){
	//alert(JSON.stringify(marker[keys[x]]));
	let node="";
		//console.log("while antes");
		while(keys[x]){
//			console.log(marker[keys[x]]);
//console.log("while despues");
			if(marker[keys[x]]==false ){
				//for(let node of bufferOptions){
					if(!bufferOptions[x]){
						//console.log("triste");
						break;
					}
					//console.log("contento");
					node=bufferOptions[x];
					let	response=serviceLocations(node.text);
				//	console.log(x+" ff "+fracciones[bufferOptions.length-1][keys[bufferOptions.length-1]][x].startAngle);
					marker[keys[x]]=processesLocationService(response,keys[x],5,fracciones[bufferOptions.length-1][keys[bufferOptions.length-1]][x]);
					marker["name"+keys[x]]=node.text;
					selectingnPin(keys[x]);
					console.log("hay papa");
					addOptionsCake(node);
			}
			else{
				let z=0;
				for(let y=1;y<4;y++){
					console.log("merweboo "+bufferOptions[z]);
					if(marker[keys[y]]==false && bufferOptions[z]!=false){
						node=bufferOptions[z];
						console.log("node = "+node);
						if(node){

							let	response=serviceLocations(node.text);
							//alert(y+" ** "+ JSON.stringify(fracciones[y][keys[y]][y]));
							console.log("ff "+fracciones[y][keys[y]][y].startAngle);
							marker[keys[y]]=processesLocationService(response,keys[y],5,fracciones[y][keys[y]][y]);
							marker["name"+keys[y]]=node.text;
							selectingnPin(keys[y]);
							console.log("hay papa2");
							addOptionsCake(node);
							z++;
							addOneMarker();
						}
						else {
							bool=true;
							break;
						}
					}

				}
			}
			if(bool){

				console.log("brujaaa");
				break;
			}

		x++;
	}
	bufferOptions=[];
}

function optionsMenuRightClickTree(){

	return {
						"Agrupar": {
						"separator_before": false,
						"separator_after": false,
						"label": "Agrupar",
						"action": function (obj) {
							groupingOptions();
							groupingPins();
							 //aqui va lo que se quiere que se haga con esta funcion
						}
					}
				};
}

function groupingOptions(){
	let x=2;
	let cad = "";
	while($("#opcion"+x+"Cake").text()){
		//console.log("hjahahah "+($("#opcion1"+$("#opcion"+x+"Cake").text().replace(" ", "")).text()));
		if(!$("#opcion1"+$("#opcion"+x+"Cake").text().replace(/ /g,'')).text())
			cad="<b id='opcion1"+$("#opcion"+x+"Cake").text().replace(/ /g,'')+"'>"+$("#opcion"+x+"Cake").text()+"<br></b> ";

		$(cad).appendTo("#opcion1grafico");
		$("#opcion"+x+"Cake").text("");
		$("#imgCake").remove();
		cad='<img id="imgCake" src="src/torta1.png" width="50%" height="50%">';
		$(cad).appendTo("#imgTorta");
		cad="";
		x++;
	}
}

function groupingPins(){
	let keys= ["uno","dos","tres","cuatro"];
	let lastPosition ={"latLng":[],"posicion":[]};
	let posicion="";
	let cont=0;
	let popContent =""
	let infPop ="";
	for(let x=0;x<4;x++){
		if(marker[keys[x]]!=false){
				marker[keys[x]].forEach(function (value){
					if(value.getRadius()!=100){
						posicion=lastPosition.latLng.indexOf(value.getLatLng()+"");

						if(posicion>-1){
							posicion = lastPosition.posicion[posicion];

							infPop = marker.uno[posicion].getPopup()._content;

							if(infPop.indexOf("<br>")>-1)
							  popContent=infPop;
							else
								popContent="<b>"+marker.nameuno+"</b> : "+(infPop);

							marker.uno[posicion].bindPopup(popContent+"<br> <b>"+marker["name"+keys[x]]+"</b> : "+value.getPopup()._content);

							popContent="";
							value.remove();
						//	marker[keys[x]][cont-1].remove();
						}
						else{
								lastPosition.posicion.push(cont);
								lastPosition.latLng.push(value.getLatLng()+"");
								value.setStartAngle(0);
								value.setStopAngle(360);
						}
					}
					else {
						if(keys[x]!="uno"){

							value.remove();
						}
					}
					cont++;
				});
				cont=0;
		}

		if(keys[x]!="uno"){
			marker["name"+keys[x]]="";
			marker[keys[x]]=[];
		}
	}
}

function addOptionsCake(node){
	let colorSelected="";
	let arr =getOptionsCake();
	let cad="";
	let bool = false;
	for(let x=1;x<=4;x++){

		if(!$( "#opcion"+x+"Cake").text() && $( "#opcion"+x+"Cake" ).text()!=node.text){

			if(x==1 && !lookforItemsGroup()){
			//	alert()
				$( "#opcion"+x+"Cake" ).text(node.text);
				$("<br>").appendTo("#opcion"+x+"Cake" );
			}
			else if(x==1 && lookforItemsGroup()){
		//		alert(2);
				$( "#opcion"+(arr.length+2)+"Cake" ).text(node.text);
				$("<br>").appendTo("#opcion"+(arr.length+2)+"Cake" );
				$("#imgCake").remove();
				cad= '<img id="imgCake" src="src/torta'+(arr.length+2)+'.png" width="50%" height="50%"/>';
				$(cad).appendTo("#imgTorta");
				break;
			}
			else
				$( "#opcion"+x+"Cake" ).text(node.text);

			$("#imgCake").remove();
			cad= '<img id="imgCake" src="src/torta'+(arr.length+1)+'.png" width="50%" height="50%"/>';

			$(cad).appendTo("#imgTorta");
			break;
		}
	}

}

function deleteOptionsCake(node){
	///let aux =$("#opcion1Cake").val();

	let arr =getOptionsCake();

	let cad="";
	let itemFound =lookforItemsGroup(node.text);
	let stillItems=lookforItemsGroup();
	let aux="";
	let keys= ["uno","dos","tres","cuatro"];
	for(let x=1;x<=4;x++){
		if($( "#opcion"+x+"Cake" ).text()==node.text  ){
			aux=$( "#opcion1Cake" ).text();
			let posicion = x;
			arr.splice(posicion-1,1);
			if(stillItems && x==1){
				$( "#opcion"+x+"Cake" ).text("");
			}
			else{
				$( "#opcion"+x+"Cake" ).text($( "#opcion"+(arr.length+1)+"Cake" ).text());
				$( "#opcion"+(arr.length+1)+"Cake" ).text("");
			}

			if(arr.length>0){
				if(x!=1 || !stillItems){
					$("#imgCake").remove();
					cad= '<img id="imgCake" src="src/torta'+(arr.length)+'.png" width="50%" height="50%"/>';
					$(cad).appendTo("#imgTorta");
				}
			}else {
				if(!stillItems)
					$("#imgCake").remove();
				else {
					$("#imgCake").remove();
					cad= '<img id="imgCake" src="src/torta'+(arr.length+1)+'.png" width="50%" height="50%"/>';
					$(cad).appendTo("#imgTorta");
				}
			}

			//alert(node.text);

			if((!stillItems && node.text!=$("#opcion1Cake").val()) ){

				removeFromMarker(keys[posicion-1]);
				return true;
			}

			else if(aux == node.text) {

				removeOptionFromGroupPin(node.text);
			//	alert(aux+" ** ");
				//if(itemFound)
				return true;
			}

			removeFromMarker(keys[posicion-1]);

			return false;
		}
	}

	return deleteFromGroup(node);
	//return false;
}


function removeOptionFromGroupPin(opcion){
	let arr ="";
	let cad="";
	//alert(opcion);
	let x =0;
	let bool= false;
	marker.uno.forEach(value=>{

		if(value.getRadius()!=100){
			arr=value.getPopup()._content.split("<br>");
			//alert(opcion+" ** "+arr[0]);
			for(let val of arr){
				if(val.split(" : ")[0].indexOf(opcion)==-1){
					if(cad)
						cad+=" <br> "+val.split(" : ")[0]+" : "+val.split(" : ")[1];
					else
						cad=val.split(" : ")[0]+" : "+val.split(" : ")[1];
				}
			}
			if(cad.trim())
				value.bindPopup(cad);
			else{
				marker.uno[x-1].remove();
				value.remove();
				bool=true;
			}
		}
		cad="";
		x++;
	});

	if(bool){
		marker.uno=[];
		marker.nameuno="";
		let arr =getOptionsCake();
	}

}

function deleteFromGroup(node){
	let x=0;
	//let arr= getOptionsCake();
	if($("#opcion1"+node.text.replace(/ /g,'')).text()){
		$("#opcion1"+node.text.replace(/ /g,'')).remove();

		if(!lookforItemsGroup()){
			alert	(" haaay "+ arr.length);
			if(arr.length>0){
				$("#imgCake").remove();
				cad= '<img id="imgCake" src="src/torta'+(arr.length)+'.png" width="50%" height="50%"/>';
				$(cad).appendTo("#imgTorta");
				let stillItems=lookforItemsGroup();
				for(let x=1;x<=4;x++){
					let posicion = x;
					arr.splice(posicion-1,1);
					if(stillItems && x==1){

						$( "#opcion"+x+"Cake" ).text("");
					}
					else{
						$( "#opcion"+x+"Cake" ).text($( "#opcion"+(arr.length+2)+"Cake" ).text());
						$( "#opcion"+(arr.length+2)+"Cake" ).text("");
						removeOptionFromGroupPin(node.text);
						removeFromMarker("uno");
						return true;
					}
				}
			}
			else
				$("#imgCake").remove();
		}
		removeOptionFromGroupPin(node.text);
		return true;
	}
	return false;
}

function lookforItemsGroup(opcion){

	for(let x=0;x<conf.tree[0].children.length;x++){
		//console.log("xxxxxxx "+($("#opcion1"+conf.tree[0].children[x].text.replace(/ /g,'')).text()));
		if($("#opcion1"+conf.tree[0].children[x].text.replace(/ /g,'')).text() && !opcion){
			return true;
		}
		else if(opcion){
			//alert("");
			console.log("pipoo xxx");
			if($("#opcion1"+opcion.replace(/ /g,'')).text())
				return true;
		}
	}
	return false;
}

function getOptionsCake(){
	arr=[];
	for(let x=1;x<=4;x++){
		//console.log($("#opcion"+x+"Cake").text()+" */*/*/ ");
		if($("#opcion"+x+"Cake").text())
			arr.push($("#opcion"+x+"Cake").text());
		/*else
			return arr;*/
	}
	return arr;
}

function removeToolTip(markerColor,colorCompare){

	for(let y=0;y<marker[colorCompare].length;y++){
		//console.log(""+markerColor.getLatLng() != ""+marker[colorCompare][y].getLatLng());
		if(""+markerColor.getLatLng()== ""+marker[colorCompare][y].getLatLng() && marker[colorCompare][y].getTooltip()){
			//console.log("borres --  "+marker[colorCompare][y].setTooltipContent("jajaja"));
			marker[colorCompare][y].unbindTooltip();
			break;
		}
	}
}

function selectingnPin(optionSelected){

			addPin(marker[optionSelected]);
			marker[optionSelected].forEach(function(value){
					value.bringToBack();
			});
}

function moveToFrontPin(pin){
	pin.forEach(function(value){
			value.bringToFront();
	});
}

function processesLocationService(res,p_posicion,radius,objFraccion){
	let arr=[];
	let colors="";

	res.forEach(function(value){
			arr.push(createPin([value.lat,value.lng],"black",100,""));
			arr.push(createPin([value.lat,value.lng],"green",radius*10,value.informacion,objFraccion));
	});
	return arr;
}


function getNextColorInfPop(number){

	if(!infPop.infPop[number].red)
		return "red";
	else if(!infPop.infPop[number].yellow)
		return "yellow";
	else if(!infPop.infPop[number].blue)
		return "blue";
	else if(!infPop.infPop[number].green)
		return "green";

}
function serviceLocations(nombre){
	switch(nombre) {
		case "packet loss":
      return [			{"lat":"-34.731260" ,"lng":"-58.386982" ,"informacion":" infomacion de packet loss", "number":"01"},{"lat":"-34.815797" ,"lng":"-58.282086" ,"informacion":" infomacion de packet loss", "number":"14"},{"lat":"-34.853765" ,"lng":"-58.889692" ,"informacion":" infomacion de packet loss", "number":"15"},{"lat":"-34.635943" ,"lng":"-58.376596" ,"informacion":" infomacion de packet loss", "number":"16"}];
		case "latencia por zonas":
			return [{"lat":"-34.731260" ,"lng":"-58.386982" ,"informacion":" informacion de latencia por zonas", "number":"02"},{"lat":"-34.815797" ,"lng":"-58.282086" ,"informacion":" informacion de latencia por zonas","number":"03"},{"lat":"-34.853765" ,"lng":"-58.889692" ,"informacion":" informacion de latencia por zonas","number":"04"},{"lat":"-34.635943" ,"lng":"-58.376596" ,"informacion":" informacion de latencia por zonas","number":"17"}];
		case "Opcion 3":
			return [{"lat":"-34.731260" ,"lng":"-58.386982","informacion":" informacion de Opcion 3 ","number":"05"},{"lat":"-34.815797" ,"lng":"-58.282086","informacion":" informacion de Opcion 3 ","number":"06"},{"lat":"-34.853765" ,"lng":"-58.889692","informacion":" informacion de Opcion 3 ","number":"18"},{"lat":"-34.635943" ,"lng":"-58.376596","informacion":" informacion de Opcion 3 ","number":"19"}];
		case "Opcion 5":
			return [{"lat":"-34.731260" ,"lng":"-58.386982" ,"informacion":" informacion de Opcion 5","number":"07"},{"lat":"-34.815797" ,"lng":"-58.282086" ,"informacion":" informacion de Opcion 5", "number":"08"},{"lat":"-34.853765" ,"lng":"-58.889692","informacion":" informacion de Opcion 5","number":"09"},{"lat":"-34.635943" ,"lng":"-58.376596" ,"informacion":" informacion de Opcion 5","number":"10"}];
		case "Opcion 4":
			return [{"lat":"-34.731260" ,"lng":"-58.386982","informacion":" informacion de Opcion 4","number":"11"},{"lat":"-34.815797" ,"lng":"-58.282086" ,"informacion":" informacion de Opcion 4", "number":"12"},{"lat":"-34.853765" ,"lng":"-58.889692","informacion":" informacion de Opcion 4", "number":"13"},{"lat":"-34.635943" ,"lng":"-58.376596","informacion":" informacion de Opcion 4", "number":"20"}];
	}
}

function createFraction (latlng,color,radius,text,cantidad){
	return L.semiCircle(latlng, {
    color: color,
    fillColor: color,
    fillOpacity: 0.5,
    radius: radius,
		startAngle: 0,
  	stopAngle: 360/cantidad
	}).bindPopup(text);
}

function createPin(latlng,color,radius,text,posicionFraccion){
	//let cad="";
	//let arr=["red","yellow","blue","green"];
	//let x=0
	//let porciones =getColorsInLeyend().length;
	///console.log((360/porciones)*(arr.indexOf(color)+1)+" lalalalala "+arr.indexOf(color));
	//alert(JSON.stringify(posicionFraccion));
	return (text) ?L.semiCircle(latlng, {
    color: color,
    fillColor: color,
    fillOpacity: 0.3,
    radius: radius*100,
		startAngle:Number(posicionFraccion.startAngle),
  	stopAngle: Number(posicionFraccion.stopAngle)
	}).bindPopup(text)/*.bindTooltip(cad)/*.openPopup()*/:L.circle(latlng, {
    color: color,
    fillColor: color,
    fillOpacity: 1,
    radius: radius
	});

}

function addPin(pins){


	pins.forEach(function (value){
			value.addTo(map);
			value.on('mouseover', function(event){
			  value.openPopup();
			});
			value.on('mouseout', function(event){
			  value.closePopup();
			});
	});




}

function existingInLeyend(nombre){
	//let colors = [];
	let infoDivs =$("#leyendacolores").children();
	for(let x=0; x<infoDivs.length;x++){
		if(infoDivs[x].outerHTML.indexOf(nombre)>-1){
			console.log(infoDivs[x].outerHTML.indexOf(nombre));
			return false;
		}
	}
	return nombre;
}

function getColorToRemoveInLeyend(nombre){
	let color=["red","yellow","blue","green"];
	let infoDivs =$("#leyendacolores").children();
	for(let x=0; x<infoDivs.length;x++){
		if(infoDivs[x].outerHTML.indexOf(nombre)>-1){
			for(let colors of color){
				if(infoDivs[x].outerHTML.indexOf(colors)>-1)
					return colors;
					//console.log("ssssss "+(infoDivs[x].outerHTML.indexOf(colors)));

			}

			return false;
		}
	}
	return false;
}

function removeFromMarker(nombre){
			let keys= ["uno","dos","tres","cuatro"];
			let fracciones = getJSONFracciones();
			if(keys.indexOf(nombre)<3){
			//	console.log("*** "+keys.indexOf(nombre));
				for(let x=3;x>=0;x--){

					if(marker[keys[x]]!=false){
						marker[nombre].forEach(function(value){
							value.remove();
						});
						marker[nombre]=marker[keys[x]];
						marker["name"+nombre]=marker["name"+keys[x]];
						marker[keys[x]]=[];
						marker["name"+keys[x]]="";


					//	console.log(x+"------- "+keys.indexOf(nombre));
						marker[nombre].forEach(function (value){
							if(value.getRadius()!=100){
								value.setStartAngle(Number(fracciones[x-1][keys[x-1]][0].startAngle));
								value.setStopAngle(Number(fracciones[x-1][keys[x-1]][0].stopAngle));
							}
						});
						for(let y=0;y<3;y++){
							if(marker[keys[y]]!=false){
								marker[keys[y]].forEach(function (value){
									if(value.getRadius()!=100){
									//	console.log(fracciones[x-1][keys[x-1]][y].stopAngle+"///// "+y);
										value.setStartAngle(Number(fracciones[x-1][keys[x-1]][y].startAngle));
										value.setStopAngle(Number(fracciones[x-1][keys[x-1]][y].stopAngle));
									}
								});
							}
							else
								break;
						}
						//console.log(fracciones[x-1][keys[x-1]][0].startAngle+" .... "+fracciones[x-1][keys[x-1]][0].stopAngle+" ... "+keys.indexOf(nombre));
						break;
					}
				}

			}
			else{
			//	console.log("cai en el else");
				marker[nombre].forEach(function(value){
					value.remove();
				})
				marker[nombre]=[];
				marker["name"+nombre]="";
				for(let y=0;y<3;y++){
					if(marker[keys[y]]!=false){
						marker[keys[y]].forEach(function (value){
							if(value.getRadius()!=100){
							//	console.log(fracciones[2][keys[2]][y].stopAngle+"///// "+y);
								value.setStartAngle(Number(fracciones[2][keys[2]][y].startAngle));
								value.setStopAngle(Number(fracciones[2][keys[2]][y].stopAngle));
							}
						});
					}
				}
			}

	}


	function addOneMarker(){
				let keys= ["uno","dos","tres","cuatro"];
				let fracciones = getJSONFracciones();

				//	console.log("*** "+keys.indexOf(nombre));
			/*	for(let x=0;x<4;x++){
					if(marker[keys[x]]!=false){
						marker[keys[x]].forEach(function(value){
							value.remove();
						});
					}
					else
					 break;
				}*/
				for(let y=3;y>=0;y--){
					if(marker[keys[y]]!=false){
						for(let x =y-1;x>=0;x--){
							marker[keys[x]].forEach(function (value){
								if(value.getRadius()!=100){
								//alert(keys[y]+" *** "+fracciones[y][keys[y]][y].startAngle+"  :()"+ fracciones[y][keys[y]][y].stopAngle);
								//	console.log(fracciones[x-1][keys[x-1]][y].stopAngle+"///// "+y);
									console.log(x +" *** "+y);
									console.log(fracciones[y][keys[y]][x].stopAngle +" ** "+marker["name"+keys[x]]);
									value.setStartAngle(Number(fracciones[y][keys[y]][x].startAngle));
									value.setStopAngle(Number(fracciones[y][keys[y]][x].stopAngle));
								}
							});
						}


						marker[keys[y]].forEach(function (value){
							if(value.getRadius()!=100){
							//alert(keys[y]+" *** "+fracciones[y][keys[y]][y].startAngle+"  :()"+ fracciones[y][keys[y]][y].stopAngle);
							//	console.log(fracciones[x-1][keys[x-1]][y].stopAngle+"///// "+y);
								value.setStartAngle(Number(fracciones[y][keys[y]][y].startAngle));
								value.setStopAngle(Number(fracciones[y][keys[y]][y].stopAngle));
							}
						});

						break;
					}
				//	else

				}


}

function getNextColorLeyenda(){
	let colors= getColorsInLeyend();
	let colorsList = new Set(["red","yellow","blue","green"]);

	if(colors==false)
		return "red";
	else if(colors.length==4)
		return false;
	else{
		colors.forEach(function (value){
			colorsList.delete(value);
		});
	}

	for (let item of colorsList) {
		return item;
	}
}

function getColorsInLeyend(){
	let colors = [];
	let infoDivs =$("#leyendacolores").children();
	for(let x=0; x<infoDivs.length;x++){
		colors.push(infoDivs[x].outerHTML.substring(65,200).split(":")[1].split(";")[0]);
	}
	return colors;
}

function chargeInitialElements(){
	$.getScript("../../conf/conf.js", function(a) {
		conf={
			tree,
			state,
			zoom
		};

		initTree();
		closeMenuToLounchCalender();
	});
}

function setFechaHora(fecha,hora){
	let cad = "";
	let dateFrom ="";
	let dateTo="";
	let aux="";
	let hourModified=false;

	if(typeof hora[0] =="number"){

		if(hora[0]>23){
			hora[0]-=24;
			dateFrom=fecha;
			$('#rangeHoras').slider("setValue",[hora[0]+24,hora[1]]);
			hourModified=true;
		}
		else {
			aux=fecha.split("/");
			dateFrom=fecha.split("/")[0];

			if((dateFrom-1)>9)
				dateFrom=(dateFrom-1)+"/"+aux[1]+"/"+aux[2];
			else
				dateFrom=0+""+(dateFrom-1)+"/"+aux[1]+"/"+aux[2];
		}

		if(hora[1]>23){
			hora[1]-=24;
			dateTo=fecha;
			if(hourModified)
				$('#rangeHoras').slider("setValue",[hora[0]+24,hora[1]+24]);
			else
				$('#rangeHoras').slider("setValue",[hora[0],hora[1]+24]);

		}
		else {
			aux=fecha.split("/");
			dateTo=fecha.split("/")[0];

			if((dateTo-1)>9)
				dateTo=(dateTo-1)+"/"+aux[1]+"/"+aux[2];
			else
				dateTo=0+""+(dateTo-1)+"/"+aux[1]+"/"+aux[2];
		}


		if((hora[0]+"").length==1)
			hora[0]=0+""+hora[0];

		if((hora[1]+"").length==1)
			hora[1]=0+""+hora[1];
	}

	cad ="<div id='contenidoFechaHora' class='form-group'>";
	cad+=	"<div class='form-inline'>  Fecha: <div id='fechaLeyenda' class='form-group'>"+fecha+"</div></div> " ;
	cad+=	"de las "+hora[0]+" Hrs "+dateFrom+" <br>";
	cad+=	"hasta las "+hora[1]+" Hrs "+dateTo;
	cad+="</div>";
	$("#contenidoFechaHora").remove();
	$(cad).appendTo("#fechaHora");

}

function addMapMark(){
  sliderBox();
	initSlider();
}
function sliderBox(){
	$('#time-range').css('z-index','9000');
	//appendTo(generateParagraph('','', 'Fecha: ', 'font-weight:bold; color:#EEE;'), 'sliderBox');
	appendTo(generateContainer('fecha','fecha'),'sliderBox' /*'p'*/);
	appendTo(generateContainer('sliders_step1', 'sliders_step1'), 'sliderBox');
	appendTo(generateContainer('', 'slider-range'), 'sliders_step1');
}
