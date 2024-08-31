var coolMap = {};

var listOfSupportedLayouts = ["es.basic", "us.basic", "us.intl"]

var baseXML;

//https://stackoverflow.com/questions/3364493/how-do-i-clear-all-options-in-a-dropdown-box
function removeOptions(selectElement) {
	var i, L = selectElement.options.length - 1;
	for (i = L; i >= 0; i--) {
		selectElement.remove(i);
	}
}


function getMap(layout, keysMap = {}) {
	console.log(layout)
	console.log(layouts[layout])
	coolMap = layouts[layout];
}



document.addEventListener("DOMContentLoaded", function(event) {
	document.addEventListener("DOMContentLoaded", function() {
		function getFirmVersion() {
			fetch('/ver')
				.then(response => response.text())
				.then(version => {
					document.getElementById('fwversion').textContent = "Firmware v"
					document.getElementById('fwversion').textContent += version;
				})
				.catch(error => {
					console.error('Error al obtener la versión, reintentando en 4 segundos...', error);
					setTimeout(obtenerVersion, 4000);
				});
		}

		getFirmVersion();
	});



	var keyboardLangSelect = document.getElementById("keyboardLayout")
	removeOptions(keyboardLangSelect)
	//add blank option to force user to click, this way we can signal an on change to process data
	var chooseOpt = document.createElement('option');
	chooseOpt.value = "none";
	chooseOpt.innerHTML = "Choose";
	keyboardLangSelect.appendChild(chooseOpt);
	for (var i = 0; i < listOfSupportedLayouts.length; i++) {

		var opt = document.createElement('option');
		opt.value = listOfSupportedLayouts[i];
		opt.innerHTML = layoutsDescs[listOfSupportedLayouts[i]];
		keyboardLangSelect.appendChild(opt);
	}

	document.getElementById("keyboardLayout").addEventListener("change", function(event) {
		var value = event.target.options[event.target.selectedIndex].value
		getMap(value, coolMap);
	});





});