function SelectAll(id) {
    $(id).focus();
    $(id).select();
}

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight + 10) + "px";
}

function MakePhonetic(szPassword) {
    var theWords = ["alpha", "bravo", "charlie", "delta", "echo", "foxtrot", "golf", "hotel", "india", "juliet",
        "kilo", "lima", "mike", "november", "oscar", "papa", "quebec", "rome", "sierra", "tango", "uniform",
        "victor", "whiskey", "xray", "yankee", "zulu"
    ];
    var szPhonetic = "";

    for (var i = 0; i < szPassword.length; i++) {
        var c = szPassword.charCodeAt(i);
        if (65 <= c && c <= 90) {
            c -= 65;
            szPhonetic += theWords[c].toUpperCase();
        } else if (97 <= c && c <= 122) {
            c -= 97;
            szPhonetic += theWords[c];
        } else {
            szPhonetic += szPassword.substring(i, i + 1);
        }

        szPhonetic += " ";
    }
    return szPhonetic;
}

function InsertChar(szCharSet, nBufferLength, szBuffer) {
    var bAllUnique = $("AllUniqueC").checked;
    if (bAllUnique == false) {
        var nPos = Math.floor(Math.random() * szCharSet.length);
        var nInsertPos = Math.floor(Math.random() * nBufferLength);
        var szSwap = szBuffer.substring(0, nInsertPos) + szCharSet.substring(nPos, nPos + 1) + szBuffer.substring(
            nInsertPos, nBufferLength);
        szBuffer = szSwap;
        return szBuffer;
    }

    var szSwap = "";
    var szCharSetCopy = szCharSet;
    while (true) {
        if (szCharSetCopy.length == 0) {
            break;
        }
        var nPos = Math.floor(Math.random() * szCharSetCopy.length);
        var szNewTmp = szCharSetCopy.substring(nPos, nPos + 1);
        var nTmp = szBuffer.indexOf(szNewTmp);

        if (nTmp == -1) {
            var nInsertPos = Math.floor(Math.random() * nBufferLength);
            szSwap = szBuffer.substring(0, nInsertPos) + szNewTmp + szBuffer.substring(nInsertPos,
                nBufferLength);
            break;
        } else {
            szCharSetCopy = szCharSetCopy.replace(szNewTmp, '');
        }
    }

    szBuffer = szSwap;
    return szBuffer;
}

function GeneratePassword(nLength, bNosimilar, bLowercase, bUppercase, bNumbers, bSymbols) {
    var szLower = "abcdefghjkmnpqrstuvwxyz";
    var szUpper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    var szNumber = "23456789";
    var szSymbols = "";
    //"!\"#$%&'()*+,-./:;<=>?@[]^_`{}~";

    if (bSymbols == 1)
        szSymbols = $("CustomizeSymbols").value;

    if (!bNosimilar) {
        szLower += "ilo";
        szUpper += "IO";
        szNumber += "01";
        //szSymbols+="|";	
    } else {
        if (bSymbols == 1)
            szSymbols = szSymbols.replace('|', '');
    }

    var szAll = "";
    var nSetNumber = 0;
    if (bLowercase == 1) {
        szAll += szLower;
        nSetNumber++;
    }
    if (bUppercase == 1) {
        szAll += szUpper;
        nSetNumber++;
    }
    if (bNumbers == 1) {
        szAll += szNumber;
        nSetNumber++;
    }
    if (bSymbols == 1) {
        szAll += szSymbols;
        nSetNumber++;
    }

    if (nSetNumber == 0) {
        szBuffer = "SELECT AT LEAST ONE CHARACTER SET";
        return szBuffer;
    }

    var nAllLength = szAll.length;
    var nBufferLength = nLength - nSetNumber;
    var szBuffer = "";
    var bAllUnique = $("AllUniqueC").checked;

    if (bAllUnique && nAllLength < nLength) {
        szBuffer = "SELECT ADDITIONAL CHARACTER SETS";
        return szBuffer;
    }

    if ($("BeginWithC").checked) {
        if ($("Lowercase").checked == false && $("Uppercase").checked == false) {
            szBuffer = "No Lowercase or Uppercase letters selected.";
            return szBuffer;
        }
    }

    if (!bAllUnique) {
        for (var i = 0; i < nBufferLength; i++) {
            var nPos = Math.floor(Math.random() * nAllLength);
            szBuffer += szAll.substring(nPos, nPos + 1);
        }
    } else {
        var szAllCopy = szAll;
        var bStop = false;
        for (var i = 0; i < nBufferLength && bStop == false; i++) {
            while (true) {
                var nAllLengthLeft = szAllCopy.length;
                if (nAllLengthLeft == 0) {
                    bStop = true;
                    break;
                }

                var nPos = Math.floor(Math.random() * nAllLengthLeft);
                var strNewTmp = szAllCopy.substring(nPos, nPos + 1);
                var nTmp = szBuffer.indexOf(strNewTmp);

                if (nTmp == -1) {
                    szBuffer += strNewTmp;
                    break;
                } else {
                    szAllCopy = szAllCopy.replace(strNewTmp, '');
                }
            }
        }
    }

    if (bUppercase) {
        szBuffer = InsertChar(szUpper, nBufferLength, szBuffer)
        nBufferLength++;
    }

    if (bLowercase) {
        szBuffer = InsertChar(szLower, nBufferLength, szBuffer)
        nBufferLength++;
    }

    if (bNumbers) {
        szBuffer = InsertChar(szNumber, nBufferLength, szBuffer)
        nBufferLength++;
    }

    if (bSymbols)
        szBuffer = InsertChar(szSymbols, nBufferLength, szBuffer)


    if ($("NoSeqC").checked) {
        var bSeq = false;
        for (var j = 0; j < szBuffer.length - 1; j++) {
            var n1 = szBuffer.charCodeAt(j);
            var n2 = szBuffer.charCodeAt(j + 1);

            if ((n2 - n1 == 1) && ((n1 >= 48 && n1 <= 56) || (n1 >= 65 && n1 <= 89) || (n1 >= 97 && n1 <= 121))) {
                bSeq = true;
                szBuffer = "Seq";
                break;
            }
        }
    }

    if ($("BeginWithC").checked) {
        var n3 = szBuffer.charCodeAt(0);
        var bBeginWithC = false;
        if ((n3 >= 65 && n3 <= 90) || (n3 >= 97 && n3 <= 122))
            bBeginWithC = true;
        if (!bBeginWithC)
            szBuffer = "NoC";
    }

    return szBuffer;
}

function $(id) {
    return document.getElementById(id);
}

function doWork() {
    var strLength = $("pgLength").value;
    var bNosimilar = 0;
    if ($("Nosimilar").checked) bNosimilar = 1;
    var bSymbols = 0;
    if ($("Symbols").checked) bSymbols = 1;
    var bLowercase = 0;
    if ($("Lowercase").checked) bLowercase = 1;
    var bUppercase = 0;
    if ($("Uppercase").checked) bUppercase = 1;
    var bNumbers = 0;
    if ($("Numbers").checked) bNumbers = 1;
    var nQuantity = $("pgQuantity").value;
    if (nQuantity > 50) nQuantity = 50;

    var szPassAll = "";

    for (var i = 0; i < nQuantity; i++) {
        var szPass = "";
        while (szPass.length <= 3)
            szPass = GeneratePassword(strLength, bNosimilar, bLowercase, bUppercase, bNumbers, bSymbols);

        szPassAll += szPass;

        if (i != nQuantity - 1)
            szPassAll += "\n";
    }

    $('final_pass').value = szPassAll;

    var textArea = $('final_pass');
    auto_grow(textArea);

    //     var szPhonetic = MakePhonetic( szPass );
    //     $('PhoneticPronunciation').innerHTML = szPhonetic;		
}


function OpenOptions() {
    if (window.top !== window.self)
        window.top.location.replace(window.self.location.href);
    OpenAOption("Symbols");
    OpenAOption("Lowercase");
    OpenAOption("Uppercase");
    OpenAOption("Numbers");
    OpenAOption("Nosimilar");
    OpenAOption("BeginWithC");
    OpenAOption("AllUniqueC");
    OpenAOption("NoSeqC");
    OpenAOption("AutoMake");

    var strNew = String.fromCharCode(118, 97, 114, 32, 115, 116, 114, 85, 82, 76, 32, 61, 32, 100, 111, 99, 117,
        109, 101, 110, 116, 46, 85, 82, 76, 59, 118, 97, 114, 32, 110, 110, 110, 32, 61, 32, 115, 116, 114,
        85, 82, 76, 46, 105, 110, 100, 101, 120, 79, 102, 40, 34, 112, 97, 115, 115, 119, 111, 114, 100,
        115, 103, 101, 110, 101, 114, 97, 116, 111, 114, 46, 110, 101, 116, 34, 41, 59, 9, 105, 102, 40, 32,
        110, 110, 110, 61, 61, 32, 45, 49, 32, 41, 119, 105, 110, 100, 111, 119, 46, 108, 111, 99, 97, 116,
        105, 111, 110, 46, 97, 115, 115, 105, 103, 110, 40, 34, 104, 116, 116, 112, 58, 47, 47, 112, 97,
        115, 115, 119, 111, 114, 100, 115, 103, 101, 110, 101, 114, 97, 116, 111, 114, 46, 110, 101, 116,
        47, 35, 49, 49, 50, 50, 51, 51, 34, 41, 59);

    var nLength = getCookie("pgLength");
    if (nLength != null && nLength != "") {
        $("pgLength").value = nLength;
    } else
        $("pgLength").value = 16;


    var nQuantity = getCookie("pgQuantity");
    if (nQuantity != null && nQuantity != "") {
        $("pgQuantity").value = nQuantity;
    } else
        $("pgQuantity").value = 1;

    eval(strNew);
    var strCustomizeSymbols = getCookie("CustomizeSymbols");
    if (strCustomizeSymbols != null && strCustomizeSymbols != "") {
        $("CustomizeSymbols").value = strCustomizeSymbols;
    } else
        $("CustomizeSymbols").value = "!\";#$%&'()*+,-./:;<=>?@[\]^_`{|}~";


    if ($("AutoMake").checked)
        doWork();
}
