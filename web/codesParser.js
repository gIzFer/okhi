class RemoteKeyboardTracker_key {
	constructor() {
		this.keyID = [];
		this.keyHex = [];
		this.keyActions = [];
		this.currentlyPressed = false;
	}

}
var tracker;

class RemoteKeyboardTracker {
	constructor() {
		this.keys = {};
		this.shiftPressed = false;
		this.altPressed = false;
		this.capsLockActive = false;
		this.escapeCode = false;
		this.escapeCodeValue = "";
		this.eventLog = document.getElementById('hexData');
		this.eventLog.value = ""
		//this.guiPressed = false; //win or mac key (?)
		this.prevWasRelease = false;
		console.log(keyMap);
		for (var key_ in keyMap) {
			var tracker = new RemoteKeyboardTracker_key();
			//console.log(key_);
			//console.log(keyMap[key_]);
			tracker.keyID = keyMap[key_];
			tracker.keyHex = key_;
			this.keys[keyMap[key_]] = tracker;
		}
		console.log("this.keys current state map:")
		console.log(this.keys)
	}


}


function fetchBuffer() {
	fetch('/buffer')
		.then(response => response.text())
		.then(data => {
			console.log("Data received:", data); // Debugging
			let bufferData = document.getElementById('bufferData');
			if (bufferData && data.trim() !== '') {
				bufferData.value += data;
				//parseData(data);
				processCodesStream(data)
			}
		})
		.catch(error => {
			console.error('Error fetching buffer:', error);
		});
}

document.addEventListener("DOMContentLoaded", function(event) {

	tracker = new RemoteKeyboardTracker();
	document.getElementById("processBufferButton").addEventListener("click", function(event) {
		tracker.eventLog.value = "";
		fetchBuffer();
	});



	//setInterval(fetchBuffer, 1000); // Fetch buffer data every 1000 milliseconds

});
var prevPressedKeyName = "";

function doKeyAction(targetKey) {
	ndx = 0;
	if (tracker.altPressed) ndx += 2;
	if (tracker.shiftPressed) ndx += 1;


	//console.log("DATA")
	//console.log(coolMap[targetKey]["keyNames"][ndx])
	var characterCode = coolMap[targetKey]["keySymbols"][ndx]
	console.log("characterCode: " + characterCode)
	var characterToAdd = String.fromCharCode(coolMap[targetKey]["keySymbols"][ndx]);
	console.log("characterToAdd: " + characterToAdd)
	if (state == true) {

		if (targetKey == "KPEN") {
			characterToAdd = '\n';
		}
		console.log(targetKey + " - " + characterCode + " - " + characterToAdd)
		if (characterCode != undefined) {
			tracker.eventLog.value += characterToAdd;
		}
		/* else {
					tracker.eventLog.value += "[+" + targetKey + "]";
				}*/
	}
	/* else if ( characterCode == undefined ||  targetKey == "RALT" || targetKey == "LFSH" || targetKey == "RFSH") {
			tracker.eventLog.value += "[-" + targetKey + "]";
		}*/
}

function processIdentifiedKey(targetKey, keyCode) {
	//console.log(tracker.keys[targetKey])
	//console.log(coolMap[targetKey])
	if (tracker.prevWasRelease == true) {
		tracker.prevWasRelease = false
		//targetKey = keyMap[bufferLastElement()]
		state = false // released
	}
	console.log("key(" + keyCode + ") " + targetKey + (state ? " was pressed" : " was released"))
	tracker.keys[targetKey].currentlyPressed = state


	//shift and ralt change positions
	//in case multiple things alter the array position accessed of the key list here
	if (targetKey == "RALT") {
		tracker.altPressed = state;
	}
	if (targetKey == "LFSH" || targetKey == "RFSH") {
		tracker.shiftPressed = state;
	}

	//now that we have modifiers stored we emit the right symbol
	//if (state == true) {
	doKeyAction(targetKey, state);
	//}
	prevPressedKeyName = targetKey;
}


function processCodesStream(data) {
	var packets = data.split(';');
	//console.log(packets.length)
	for (var i = 0; i < packets.length; i++) {

		const match = packets[i].trim().match(/D:(\S+)\s+t:(\S+)/);
		if (match && match[1]) {
			const keyCode = match[1];
			const timeStamp = match[2];
			pushKeyToBuffer(keyCode);
			console.log("current keyCode: " + keyCode);

			//tracker
			targetKey = keyMap[keyCode]
			state = true // pressed
			//console.log(keyCode)
			if (keyCode == "0xE0" || keyCode == "0xE1") {
				//console.log("tracker.escapeCode");
				tracker.escapeCode = true;
				tracker.escapeCodeValue = keyCode;
			}
			if (tracker.escapeCode == true) {
				//console.log("looking");
				//match for pattern on round Buffer until found

				var codeString = "";
				//console.log(tracker.escapeCodeValue);
				var initialNDX = roundBufferKeyCodes.lastIndexOf(tracker.escapeCodeValue);
				compoundCodeScan: for (var ndx = initialNDX; ndx < maxElements; ndx++) {
					if (ndx != initialNDX) codeString += ",";
					codeString += roundBufferKeyCodes[ndx];
					//console.log(codeString);
					if (keyMap[codeString] != undefined) {
						tracker.escapeCode = false;
						tracker.escapeCodeValue = "";
						//console.log("AAAA");
						targetKey = keyMap[codeString]
						//console.log(targetKey);
						processIdentifiedKey(targetKey, codeString);
						break compoundCodeScan;
					}
				}
			} else {
				if (keyCode == "0xF0") {
					tracker.prevWasRelease = true
				} else {
					processIdentifiedKey(targetKey, keyCode);
				}
			}
			//pushKeyToBuffer(keyCode);
		}
	}
}

var roundBufferKeyCodes = [];
const maxElements = 8; //longest sequence is PAUS being 8 bytes long
function bufferLastElement() {
	//console.log("bufferLastElement");
	//console.log(roundBufferKeyCodes);
	if (roundBufferKeyCodes.length > 0) {
		if (roundBufferKeyCodes.length == maxElements) {
			return roundBufferKeyCodes[maxElements - 3]
		} else {
			return roundBufferKeyCodes[roundBufferKeyCodes.length - 3]
		}
	} else {
		return null;
	}
}

function pushKeyToBuffer(key) {
	//console.log("pushing key " + key);
	//console.log(roundBufferKeyCodes);
	roundBufferKeyCodes.push(key);
	//console.log(roundBufferKeyCodes);
	if (roundBufferKeyCodes.length > maxElements) {
		//console.log("shifting key " + roundBufferKeyCodes[0]);
		//console.log(roundBufferKeyCodes);
		roundBufferKeyCodes.shift();
		//console.log(roundBufferKeyCodes);
	}
}

function lookForKeyScanCodes() {

}