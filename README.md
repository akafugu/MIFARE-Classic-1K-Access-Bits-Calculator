MIFARE Classic 1K Access Bits Calculator is a simple html/javascript calculator for the Mifare Classic 1K access bits.

Widget was based on [this code](http://www.codeproject.com/Articles/81355/Chapter-Creating-Web-Widget-with-HTML-CSS-and-Ja)
The information on access bits is taken from [MF1S503x from NXP Seiconductors](http://www.nxp.com/documents/data_sheet/MF1S503x.pdf).

To use, simply clone the code and add this to a page:
```javascript
<script type='text/javascript'>
    wWidth = "800px"; 
    wHeight = "195px";
    document.write('<div id="myFirstWidget"></div>');
    document.write('<scr'+'ipt type="text/JavaScript" src="mifareWidget/WidgetCreate.js"></scr'+'ipt>');
</script>
```