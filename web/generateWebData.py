#!/usr/bin/env python3
#https://superuser.com/questions/1460984/how-to-get-a-list-of-valid-x11-names-for-characters

#pip install beautifulsoup4 lxml
from bs4 import BeautifulSoup
import json

listOfSupportedLayouts = ["es.basic", "us.basic", "us.intl"]




class keyMapGenerator:
    keyMap = {}

    def getFile(self, filePath):
        f = open(filePath, "r")
        fileContents = f.read()
        f.close()
        return fileContents

    def get_xkb_symbol_blockStartPos(self, file, matchingStr):
        blockStartPos = file.find(matchingStr)
        return blockStartPos + file[blockStartPos:].find("{")

    def get_xkb_symbol_blockEndPos(self, file, startPos):
        #find end of block
        levelCounter = 0
        for i, letter in enumerate(file[startPos:]):
            if(letter == '{'):
                levelCounter+=1
            if(letter == '}'):
                levelCounter-=1
            if(levelCounter == 0):
                return startPos + i + 1

    def get_xkb_symbol_block(self, file, name):
        begin_pos = self.get_xkb_symbol_blockStartPos(file, "\"{}\"".format(name))
        end_pos = self.get_xkb_symbol_blockEndPos(file, begin_pos)
        return file[begin_pos:end_pos]

    def get_xkb_symbol(self, language, layout):
        file = self.getFile("xkeyboard-config/symbols/{}".format(language))
        xkb_symbol_block = self.get_xkb_symbol_block(file, layout)
        self.parseBlock(language, layout, xkb_symbol_block)
        return


    def parseBlock(self, language, blockName, block):
        #print(block)
        blockLines = block.split('\n')
        for i, line in enumerate(blockLines):
            lineSplit = line.split()
            #print(lineSplit)
            if(len(lineSplit) >= 2):
                if(lineSplit[0] == "include"):
                    #print("inc")
                    targetFile = language
                    targetBlock = ""

                    if(lineSplit[1].find("(") != -1):
                        targetFile = lineSplit[1][1:lineSplit[1].find("(")]
                        targetBlock = lineSplit[1][lineSplit[1].find("(") + 1:lineSplit[1].find(")")]
                    else:
                        targetFile = lineSplit[1][1:-1]
                        targetBlock = "basic"
                        #print("AAAAA")
                        #print(targetBlock)
                    #print(targetFile)
                    #print(targetBlock)
                    target = self.get_xkb_symbol(targetFile, targetBlock)

                if(lineSplit[0] == "key"):
                    keyID = lineSplit[1][lineSplit[1].find('<') + 1:lineSplit[1].find('>')]
                    #print(keyID)
                    self.keyMap[keyID] = {}
                    self.keyMap[keyID]["keyNames"] = self.parseKeyBlock(self.getKeyBlock(block, keyID))
                    #print(self.keyMap[keyID]["keyNames"])



    def parseKeyBlock(self, keyBlock):
        #print(keyBlock)
        symbolsStr = "symbols["
        symbolsStrPos = keyBlock.find(symbolsStr)
        if(symbolsStrPos != -1):
            #print(keyBlock[keyBlock.find(symbolsStr) + len(symbolsStr):])
            startPos = symbolsStrPos + len(symbolsStr) + keyBlock[symbolsStrPos + len(symbolsStr):].find("]") + 1
            keyBlock = keyBlock[startPos:]

        keyContent = keyBlock[keyBlock.find('[') + 1:keyBlock.find(']')]
        keyContent = keyContent.split(',')
        keyContent = [s.strip() for s in keyContent]
        return keyContent


    def getKeyBlock(self, file, key):
        begin_pos = self.get_xkb_symbol_blockStartPos(file, "<{}>".format(key))
        end_pos = self.get_xkb_symbol_blockEndPos(file, begin_pos)
        return file[begin_pos:end_pos]


    def getSymbolUnicode(self, symbolName):
        symbolsFile = self.getFile("keysymdef.h").split('\n')
        targetKeyName = "XK_{}".format(symbolName)
        #print(targetKeyName)
        for line in symbolsFile:
            splitLine = line.split()
            if(len(splitLine) > 1 and splitLine[1] == targetKeyName):
                #print(splitLine)
                return splitLine[2]

    def getSymbols(self):
        #hideous and slow incoming
        for key in self.keyMap:
            #print("key")
            #print(key)
            self.keyMap[key]["keySymbols"] = []
            for i, keySymbol in enumerate(self.keyMap[key]["keyNames"]):
                #print(keySymbol)
                #print(self.keyMap[key])
                #print(self.keyMap[key])
                #print(self.keyMap[key])
                self.keyMap[key]["keySymbols"].append(self.getSymbolUnicode(keySymbol))

    def generateLayoutFile(self, lang, layout, destPath):
        self.get_xkb_symbol("pc", "pc105")
        self.get_xkb_symbol(lang, layout)
        self.getSymbols()
        path = "{}/{}.{}.js".format(destPath, lang, layout)
        jsonDump = json.dumps(self.keyMap, indent='\t')
        #needs <script>var layout = {};</script> before including all the layouts
        jsonDump = "layouts[\"{}.{}\"] = ".format(lang, layout) + jsonDump
        #print(path)
        #print(jsonDump)
        f = open(path, "w")
        f.write(jsonDump)
        f.close()

def generateLayoutsDescs(layoutsList, destPath):
    f = open("xkeyboard-config/rules/base.xml", "r")
    data = f.read()
    f.close()
    Bs_data = BeautifulSoup(data, "xml")

    #b_name = Bs_data.find_all("model").find_all("configItem")

    layoutsDescs = {}
    breakLoopFlag = False
    layouts_xml = Bs_data.find_all('layout')
    for layout in listOfSupportedLayouts:
        layoutSplit = layout.split('.')
        for layout_xml in layouts_xml:
            if(layout_xml.configItem.find("name").text == layoutSplit[0]):
                #print(layout_xml.configItem.find("name").text)
                if(layoutSplit[1] == "basic"):
                    layoutsDescs[layout] = layout_xml.configItem.description.text
                    break;
                else:
                    for variant in layout_xml.variantList.find_all('variant'):
                        if(variant.configItem.find("name").text == layoutSplit[1]):
                            layoutsDescs[layout] = variant.configItem.find("description").text
                            #print(variant.configItem.description.text)
                            breakLoopFlag = True
                            break;
                if breakLoopFlag:
                    breakLoopFlag = False
                    break
    #print(layoutsDescs)
    path = "{}/layoutsDescs.js".format(destPath)
    jsonDump = json.dumps(layoutsDescs, indent='\t')
    jsonDump = "const layoutsDescs = " + jsonDump
    #print(path)
    #print(jsonDump)
    f = open(path, "w")
    f.write(jsonDump)
    f.close()


generateLayoutsDescs(listOfSupportedLayouts, "data")
print("ADD THIS")
print("<script>var layouts = {};</script>")
for layout in listOfSupportedLayouts:
    print("<script type=\"text/javascript\" src=\"data/{}.js\"></script>".format(layout))
    layoutSplit = layout.split('.')
    #print(layoutSplit)
    gen = keyMapGenerator()
    gen.generateLayoutFile(layoutSplit[0], layoutSplit[1], "data")











