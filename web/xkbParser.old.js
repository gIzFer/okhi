//with the chosen language and layout we have to create a map with letters (symbols) and actions so that we can parse through the bytes stream from the keyboard
//https://wiki.archlinux.org/title/X_keyboard_extension


//thankfully as incoming files are formatted consistently parser can be done poorly and quickly which is nice as Im unsure if its currently worth do a proper one. Still in proof of concept stage
//sooo... not a good parser :P

//recursive function dubidu (danger danger)
async function parseToMap(xbdConfigText, textSection, keysMap_ = {}) {
	//first we gotta locate and extract the xkb_symbols with the textSection name;
	var splitByLines = xbdConfigText.split("\n");
	//console.log(splitByLines);


	var parserStage = 0;

	//parser has 3 stages
	//stage 0 looking for target textSection
	//stage 1 found, so adding key lines to map[]
	//stage 2 block closed so return
	for (var i = 0; i < splitByLines.length; i++) {


		//stage 0
		if (parserStage == 0 && splitByLines[i].indexOf("xkb_symbols") !== -1) {
			var name = splitByLines[i].split("\"")[1]; //we split by "\"" as the name is always in quotes. since name goes right after xkb_symbols which is the first thing in the line we can say fuck it and select element number 1 as name
			//console.log(name);
			if (name == textSection) {
				console.log("YAY WE ARE HAPPY");
				parserStage++;
			}
		}

		//parse includes, ex: include "latin(type4)" or include "latin"
		//if it has () it can be on another file, if it doesnt its in same file
		if (parserStage == 1 && splitByLines[i].indexOf("include") !== -1) {
			var includeTarget = splitByLines[i].split("\"")[1];
			//console.log("INCLUDE: " + includeTarget)
			if (splitByLines[i].indexOf("(") !== -1) {
				var includeTarget_file = includeTarget.split("(")[0];
				console.log(includeTarget_file);
				var includeTarget_textSection = includeTarget.substring(includeTarget.indexOf("(") + 1, includeTarget.lastIndexOf(")"));


				console.log(includeTarget_textSection);
				console.log("a_jumping to: " + includeTarget_file + " " + includeTarget_textSection)
				await generateMap(includeTarget_file, includeTarget_textSection, keysMap_)
				console.log("a_back from jump to: " + includeTarget_file + " " + includeTarget_textSection)


			} else {
				console.log("b_jumping to: " + includeTarget + " basic")
				await generateMap(includeTarget, "basic", keysMap_)
				console.log("b_back from jump to: " + includeTarget + " basic")
			}

		}




		//stage 1
		if (parserStage == 1 && splitByLines[i].match(/key\s+</)) {
			var keyName = splitByLines[i].substring(splitByLines[i].indexOf("<") + 1, splitByLines[i].lastIndexOf(">"));
			console.log(keyName);
			keysMap_[keyName] = splitByLines[i];


		}

		//watch out for this and take cover, once again thankful for well formatted documents
		if (parserStage == 1 && splitByLines[i] === "};") {
			//console.log(keysMap_)
			return keysMap_;
		}

	}
}


async function generateMap(language, layout, keysMap = {}) {
	console.log(language);
	console.log(layout);

	console.log("generateMap(" + language + ", " + layout + ")")
	var requestedFileText = await fetch("/data/symbols/" + language);
	//console.log(requestedFileText)
	var responseText = await requestedFileText.text();
	//console.log(responseText)
	var map = await parseToMap(responseText, layout, keysMap)

	console.log("done?")
	console.log(map)
	return map;



}