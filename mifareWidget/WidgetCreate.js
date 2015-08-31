
document.write('<link rel="stylesheet" type="text/css" href="mifareWidget/style.css">');

var myElement = document.getElementById('myFirstWidget');
var JavaScriptCode = document.createElement("script");
JavaScriptCode.setAttribute('type', 'text/javascript');
JavaScriptCode.setAttribute("src", 'mifareWidget/data.js');
document.getElementById('myFirstWidget').appendChild(JavaScriptCode);

function update() {
	var bitfieldTable = [0x0,0x2,0x1,0x3,0x4,0x6,0x5,0x7]

	var radios = document.getElementsByName("access0")
	var access0 = 0;

	for (var i = 0, length = radios.length; i < length; i++) {
	    if (radios[i].checked) {
	        access0 = bitfieldTable[i];
	        break;
	    }
	}
    var radios = document.getElementsByName("access1")
	var access1 = 0;

	for (var i = 0, length = radios.length; i < length; i++) {
	    if (radios[i].checked) {
	        access1 = bitfieldTable[i];
	        break;
	    }
	}
	var radios = document.getElementsByName("access2")
	var access2 = 0;

	for (var i = 0, length = radios.length; i < length; i++) {
	    if (radios[i].checked) {
	        access2 = bitfieldTable[i];
	        break;
	    }
	}
	var radios = document.getElementsByName("access3")
	var access3 = 0;

	for (var i = 0, length = radios.length; i < length; i++) {
	    if (radios[i].checked) {
	        access3 = bitfieldTable[i];
	        break;
	    }
	}

	var byte0 = ((~access3 & 0x2) << 6) | ((~access2 & 0x2) << 5) | ((~access1 & 0x2) << 4) | ((~access0 & 0x2) << 3) |
	((~access3 & 0x1) << 3) | ((~access2 & 0x1) << 2) | ((~access1 & 0x1) << 1) | ((~access0 & 0x1) << 0);
	var byte1 = ((access3 & 0x1) << 7) | ((access2 & 0x1) << 6) | ((access1 & 0x1) << 5) | ((access0 & 0x1) << 4) |
	((~access3 & 0x4) << 1) | ((~access2 & 0x4) << 0) | ((~access1 & 0x4) >> 1) | ((~access0 & 0x4) >>2);
	var byte2 =  ((access3 & 0x4) << 5) | ((access2 & 0x4) << 4) | ((access1 & 0x4) << 3) | ((access0 & 0x4) << 2) |
	((access3 & 0x2) << 2) | ((access2 & 0x2) << 1) | ((access1 & 0x2)) | ((access0 & 0x2) >> 1);
	document.getElementById('byte0').innerHTML = '0x' + ('0' + byte0.toString(16).toUpperCase()).slice(-2);
	document.getElementById('byte1').innerHTML = '0x' + ('0' + byte1.toString(16).toUpperCase()).slice(-2);
	document.getElementById('byte2').innerHTML = '0x' + ('0' + byte2.toString(16).toUpperCase()).slice(-2);
}

function WidgetCallback(JSONobject) {
    var wData = JSONobject[0];
    var wHTML = "";

    wHTML += ('<center><div id="MyWidget" style="width:' + wWidth + ';Height:' + wHeight + ';" >');
    wHTML += ('<p><table border="1"><tbody><tr><th>Byte Number</th>');
    for (var k = 0; k < 16; k++) {
    	wHTML += ('<td>' + k + '</td>');
    }
    wHTML += ('</tr>');
    wHTML += ('<tr><th>Description</th><td colspan="6">KEY A</td><td colspan="4">Access Bits</td><td colspan="6">KEY B (optional)</td>');
    wHTML += ('<tr><th></th><td colspan="6"></td><td><div id="byte0">0xFF</div></td><td><div id="byte1">0x07</div></td><td><div id="byte2">0x80</div></td><td>USER</td><td colspan="6"></td>');
    wHTML += ('</tbody></table></p>');

    for (var k = 0; k < 3; k++) {
	    wHTML += ('<p><table border="1"><caption>Access conditions for data block ' + k + '</caption>' +
	'<thead>' +
	'<tr><th colspan="4">Access bits</th><th colspan="4">Access condition for</th><th rowspan="2">Application</th></tr>' +
	'<tr><th></th><th>C1<sub>' + k + '</sub></th><th>C2<sub>' + k + '</sub></th><th>C3<sub>' + k + '</sub></th><th>read</th><th>write</th><th>increment</th><th>decrement, transfer, restore</th></tr>' +
	'</thead>' +
	'<tbody>');
	    for (var i = 0; i < wData.datasector.data.length; i++) {
	    	if (i === 1 || i === 2 || i === 5) {
				wHTML += ('<tr class="greyline">');
			} else {
				wHTML += ('<tr>');
			}
			wHTML += ('<td><input type="radio" onclick="update();" id="radio' + i + '" class="radio1" name="access' + k + '"');
			if (i === 0) {
				wHTML += (' checked ');
			}
			wHTML += ('/></td>');
			for (var j = 0; j < wData.datasector.data[i].length; j++) {
				wHTML += ('<td>' + wData.datasector.data[i][j] + '</td>');
			}
			wHTML += ('</tr>');
		}
	    wHTML += ('</tbody></table>' + wData.datasector.note +'</p>');
	}

	wHTML += ('<table border="1"><caption>Access conditions for the sector trailer</caption>' +
	'<thead>' +
	'<tr><th colspan="4" rowspan="2">Access bits</th><th colspan="6">Access condition for</th><th rowspan="3">Remark</th></tr>' +
	'<tr><th colspan="2">KEYA</th><th colspan="2">Access bits</th><th colspan="2">KEYB</th></tr>' +
	'<tr><th></th><th>C1<sub>3</sub></th><th>C2<sub>3</sub></th><th>C3<sub>3</sub></th><th>read</th><th>write</th><th>read</th><th>write</th><th>read</th><th>write</th></tr>' +
	'</thead>' +
	'<tbody>');

	for (var i = 0; i < wData.sectortrailer.data.length; i++) {
		if (i === 0 || i === 1 || i === 4) {
			wHTML += ('<tr style="background-color: #ccc;">');
		} else {
			wHTML += ('<tr>');
		}
		wHTML += ('<td><input type="radio" onclick="update();" id="radio' + i + '" class="radio1" name="' + wData.sectortrailer.id + '"');
		if (i === 4) {
			wHTML += (' checked ');
		}
		wHTML += ('/></td>');
		for (var j = 0; j < wData.sectortrailer.data[i].length; j++) {
			wHTML += ('<td>' + wData.sectortrailer.data[i][j] + '</td>');
		}
		wHTML += ('</tr>');
	}
	    wHTML += ('</tbody>' +
	'</table>' + wData.sectortrailer.note);

    wHTML += ('<p>' + wData.copyright + '</p></div></center>');

    document.getElementById('myFirstWidget').innerHTML = wHTML;
}
