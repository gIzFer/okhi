keyPressed(keyCode) {
	console.log(`Key pressed: ${keyCode}`); // Debugging

	if (keyCode === '<LSHIFT>' || keyCode === '<RSHIFT>') {
		this.shiftPressed = true;
		return;
	}
	if (keyCode === '<CAPS>') {
		this.capsLockActive = !this.capsLockActive;
		return;
	}

	const key = this.getKeyRepresentation(keyCode);
	if (key) {
		this.updateEventLog(key);
	}
	this.keys[keyCode] = true;
}

keyReleased(keyCode) {
	console.log(`Key released: ${keyCode}`); // Debugging

	if (keyCode === '<LSHIFT>' || keyCode === '<RSHIFT>') {
		this.shiftPressed = false;
		return;
	}

	this.keys[keyCode] = false;
}

getKeyRepresentation(keyCode) {
	let key = keyCode;
	if (key.length === 1) {
		if (this.shiftPressed && key === '2') {
			key = '@';
		} else if (this.capsLockActive && this.shiftPressed) {
			key = key.toLowerCase();
		} else if (this.capsLockActive || this.shiftPressed) {
			key = key.toUpperCase();
		} else {
			key = key.toLowerCase();
		}
	}
	return key;
}