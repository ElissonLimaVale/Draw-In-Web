
// Variaveis globais
var color = document.getElementById("select-color").value;
var div = null;
var countWidth = document.getElementById("select-linha").value;
var size = ((window.innerWidth * 100) / 90) / countWidth;
var countHeight =  window.innerHeight / size ;
var multcolor = false;
var download = document.getElementById("download");
var img = new Image();

// methodods
window.addEventListener("resize", resizing);

window.addEventListener("mousedown", () => { 
	multcolor = true;
});
window.addEventListener("mouseup", () => { 
	multcolor = false;
});
document.getElementById("select-color").addEventListener("change", () => {
	color = document.getElementById("select-color").value;
});

document.getElementById("select-linha").addEventListener("change", (e) => {
	countWidth = document.getElementById("select-linha").value;
	countHeight =  1200 / size;
	inserir();
	resizing();
	init();
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
	document.querySelectorAll(".div").forEach((element) => {
		element.style = "background-color: #fff;width: "+ size +"px; height: "+ size +"px;"; 
	});
});
document.getElementById("more").addEventListener("click", () => {
	countHeight += 10;
	init();
});
document.getElementById("quad").addEventListener("click", () => {
	alert("Funcionalidade em desenvolvimento!");
})
document.getElementById("save").addEventListener("click", salvar);


function inserir() {
	for(let a = 0; a <= countHeight; a++){
		for(let b = 0; b <= countWidth; b++){
			div = document.createElement('div');
			div.className = "div";
			document.getElementById('corpo').appendChild(div);
		}
	}
}

function resizing () {
	size = ((window.innerWidth * 100) / 90) / countWidth;
	document.querySelectorAll('.div').forEach((element) => {
		element.style = "width: "+ size +"px; height: "+ size +"px;";
	});
}

function init(){
	inserir();
	document.querySelectorAll('.div').forEach((element) => {
		element.addEventListener("mousedown", (event) => {
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			colorir(event.path[0], true);
		});
		element.addEventListener("mouseover", (event) => {
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			colorir(event.path[0], multcolor);
		});
	});
	resizing();
}

function colorir(element, multitens){
	if(multitens){
		element.style = "background-color: "+ color +";width: "+ size +"px; height: "+ size +"px;"; 
	}
}

function resetmenu(){
	document.querySelectorAll(".all").forEach((element) => {
		element.style = "background-color: rgb(252, 252, 252);";
	});
}

function salvar() {
	html2canvas(document.querySelector("#corpo"), {
		"logging": true, //Habilita os logs
		"useCORS": true
	}).then(function(canvas) {
		img.onload = () => {
			img.onload = null;
			document.getElementById("image").appendChild(img);
		};
		canvas.style = "width: 100%; height: 100%;";
		img.src = canvas.toDataURL("image/png");
		document.getElementById("image").appendChild(img);

		download.href = img.src.replace("image/jpeg", "image/octet-stream");
		download.download = "drownImage.jpg";
	});
	document.getElementById("image").style = "top: 2vh";
}

init();


//cancelar download
document.getElementById("cancelar").addEventListener("click", () => {
	document.getElementById("image").style = "top: -1200px";
	img.src = "";
	download.href = "index.html";
});
//salvar 
document.getElementById("salvar").addEventListener("click", () => {
	download.click();
	document.getElementById("image").style = "top: -1200px";
	img.src = "";
	download.href = "index.html";
});
