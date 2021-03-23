
// Variaveis globais
let color = document.getElementById("select-color").value,
	defaultColor = "rgb(255, 255, 255);",
	countWidth = document.getElementById("select-linha").value,
	size = window.innerWidth / countWidth,
	countHeight =  window.innerHeight / (size - 1),
	elements = null,
	multElement = false,
	download = document.getElementById("download"),
	img = new Image(),
	evento = window.innerWidth > 700 ? "mousedown": "touchmove";


function main() {
	inserir();
	resizing();
}

function inserir() {
	let loop = countHeight * countWidth;
	for(let b = 1; b <= loop; b++){
		elements = document.createElement('element');
		elements.className = "element";

		elements.addEventListener("mousedown", (event) => {
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			colorir(event.path[0], true);
		}, false);

		elements.addEventListener("mouseover", (event) => {
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			colorir(event.path[0], multElement);
		}, false);
		document.getElementById('corpo').appendChild(elements);
	}
}

function resizing () {
	size = window.innerWidth / countWidth;
	countHeight = window.innerHeight / (size - 1);
	document.getElementById("corpo").style = "width:" + window.innerWidth +"px";
	document.getElementById("corpo").style = "height:" + window.innerHeight +"px";
	
	document.getElementById("corpo").addEventListener(evento, (event) => { 
		multElement = true;
	}, false);
	document.getElementById("corpo").addEventListener("mouseup", () => { 
		multElement = false;
	}, false);
	
	
	document.querySelectorAll('.element').forEach((element) => {
		element.style = "width: "+ size + "px;height: "+ size+"px;background-color:"+ defaultColor;
	});
	
}
function colorir(element, multitens){
	if(multitens){
		element.style = "border: none;margin: 0px;background-color: "+ color +";width: "+ size +"px; height: "+ size +"px;"; 
	}
}

function resetmenu(){
	document.querySelectorAll(".all").forEach((element) => {
		element.style = "background-color: rgb(252, 252, 252);";
	});
}

function salvar() {
	LoadShow();
	html2canvas(document.querySelector("#corpo"), {
		"logging": true, //Habilita os logs
		"useCORS": true
	}).then(function(canvas) {
		img.onload = () => {
			onload = null;
			document.getElementById("image").appendChild(img);
			LoadHide();
		};
		img.style = "width: 100%; height: 100%;";
		img.src = canvas.toDataURL("image/png");
		download.href = canvas.toDataURL("image/octet-stream");
		download.download = "DrawnImage.png";
	});
	document.getElementById("image").style = "top: 2vh;";
	document.getElementById("save-buttons").hidden = false;
}

//cancelar download
document.getElementById("cancelar").addEventListener("click", () => {
	document.getElementById("image").style = "top: -1200px";
	document.getElementById("save-buttons").hidden = true;
});
//salvar 
document.getElementById("salvar").addEventListener("click", () => {
	window.open(img,"_blank");
	
	document.getElementById("image").style = "top: -1200px";
	document.getElementById("save-buttons").hidden = true;
});




//Fecha o menu 
document.getElementById("hidden-menu").addEventListener("click", () => {
	document.querySelectorAll(".item-menu").forEach((element) => {
		element.hidden = !element.hidden;
	});
});

//Métodos do menu
document.getElementById("save-buttons").hidden = true;

// methodods
window.addEventListener("resize", resizing);

document.getElementById("select-color").addEventListener("change", () => {
	color = document.getElementById("select-color").value;
});

document.getElementById("select-linha").addEventListener("change", (e) => {
	countWidth = document.getElementById("select-linha").value;
	main();
});

document.getElementById("add").addEventListener("click", (e) => {
	color = document.getElementById("select-color").value;
	resetmenu();
	e.path[0].style = "background-color: rgb(201, 201, 201);";
});

document.getElementById("dell").addEventListener("click", (e) => {
	color = "#fff";
	resetmenu();
	e.path[0].style = "background-color: rgb(201, 201, 201);";
});

document.getElementById("delleteall").addEventListener("click", (e) => {
	document.querySelectorAll(".element").forEach((element) => {
		element.style = "border: none;margin: 0px;background-color: #fff;width: "+ size +"px; height: "+ size +"px;"; 
	});
});
document.getElementById("more").addEventListener("click", () => {
	countHeight += 10;
	main();
});
document.getElementById("quad").addEventListener("click", () => {
	alert("Funcionalidade em desenvolvimento!");
})
document.getElementById("save").addEventListener("click", salvar);


// mover menu;
let positionX = 10;
let positionY = 10;
let menu = document.getElementById("menu");
let move = false;

function movestart(e){
	move = true;
	positionX = e.pageX - menu.offsetLeft;
	positionY = e.pageY - menu.offsetTop;
	menu.addEventListener("mousemove", movemenu, false);
	menu.addEventListener("mouseup", stopmenu);
}
function movemenu(e){
	if(move){
		menu.style.left = (e.pageX - positionX) + "px";
		menu.style.top = (e.pageY - positionY) + "px";
	}
}
function stopmenu(e){
	move = false;
	
}
menu.addEventListener("mousedown", movestart);
menu.addEventListener("mouseout", stopmenu);

function LoadShow() {
	document.getElementById("load-area").hidden = false;
}
function LoadHide() {
	document.getElementById("load-area").hidden = true;
}
main();
