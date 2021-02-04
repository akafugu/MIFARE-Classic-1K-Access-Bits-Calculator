﻿
document.write('<link rel="stylesheet" type="text/css" href="mifareWidget/style.css">');

var myElement = document.getElementById('mifareWidget');
var JavaScriptCode = document.createElement("script");
JavaScriptCode.setAttribute('type', 'text/javascript');
JavaScriptCode.setAttribute("src", 'mifareWidget/data.js');
document.getElementById('mifareWidget').appendChild(JavaScriptCode);

var bitfieldTable = [0x0,0x2,0x1,0x3,0x4,0x6,0x5,0x7]

function update() {
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

	wHTML += ('<a href="#" onclick="manualValue();return false">Enter Access Bits value</a>');

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

    document.getElementById('mifareWidget').innerHTML = wHTML;
}

function manualValue() {
	var str = prompt("Formats supported:\n\"0xff 0x07 0x80 0x00\"\n\"ff 07 80 00\"\n\"ff078000\"\nUser byte is optional and will be ignored.\n\nEnter value:");
	str = str.replace(/0x/ig,"").replace(/\s+/g,"");

	if(!str.match(/^([0-9a-f]{2}){3,4}$/i)) {
		alert("Invalid value entered.");
		return;
	}

	var bytes = str.match(/.{2}/g).map(v => parseInt(v, 16));

	var c1_i = bytes[0] >> 0 & 0xf;
	var c2_i = bytes[0] >> 4 & 0xf;
	var c3_i = bytes[1] >> 0 & 0xf;
	var c1_r = bytes[1] >> 4 & 0xf;
	var c2_r = bytes[2] >> 0 & 0xf;
	var c3_r = bytes[2] >> 4 & 0xf;

	if( (~c1_i & 0xf) != c1_r ||
		(~c2_i & 0xf) != c2_r ||
		(~c3_i & 0xf) != c3_r) {
		if(!confirm("The inverted bits don't match. Continue?")) {
			return;
		}
	}

	access0 = (c1_r >> 0 & 1) << 0 | (c2_r >> 0 & 1) << 1 | (c3_r >> 0 & 1) << 2;
	access1 = (c1_r >> 1 & 1) << 0 | (c2_r >> 1 & 1) << 1 | (c3_r >> 1 & 1) << 2;
	access2 = (c1_r >> 2 & 1) << 0 | (c2_r >> 2 & 1) << 1 | (c3_r >> 2 & 1) << 2;
	access3 = (c1_r >> 3 & 1) << 0 | (c2_r >> 3 & 1) << 1 | (c3_r >> 3 & 1) << 2;

	document.getElementsByName("access0")[ bitfieldTable.indexOf(access0) ].checked = true;
	document.getElementsByName("access1")[ bitfieldTable.indexOf(access1) ].checked = true;
	document.getElementsByName("access2")[ bitfieldTable.indexOf(access2) ].checked = true;
	document.getElementsByName("access3")[ bitfieldTable.indexOf(access3) ].checked = true;
	update();
}
