WidgetCallback([
   {
       "sectortrailer": { 
       		"id" : "access3",
       		"data" : [
       		["0", "0", "0", "never", "key A", "key A", "never", "key A", "key A", "Key B may be read<sup>[1]</sup>"],
       		["0", "1", "0", "never", "never", "key A", "never", "key A", "never", "Key B may be read<sup>[1]</sup>"],
       		["1", "0", "0", "never", "key B", "key A|B", "never", "never", "key B"],
       		["1", "1", "0", "never", "never", "key A|B", "never", "never", "never"],
       		["0", "0", "1", "never", "key A", "key A", "key A", "key A", "key A", "Key B may be read, transport configuration<sup>[1]</sup>"],
       		["0", "1", "1", "never", "key B", "key A|B", "key B", "never", "key B"],
       		["1", "0", "1", "never", "never", "key A|B", "key B", "never", "never"],
       		["1", "1", "1", "never", "never", "key A|B", "never", "never", "never"]
       		],
       		"note" : "<sup>[1]</sup> for this access condition key B is readable and may be used for data"
   	   },
       "datasector": { 
       		"data" : [
       		["0", "0", "0", "key A|B<sup>1</sup>", "key A|B<sup>1</sup>", "key A|B<sup>1</sup>", "key A|B<sup>1</sup>", "transport configuration"],
       		["0", "1", "0", "key A|B<sup>1</sup>", "never", "never", "never", "read/write block"],
       		["1", "0", "0", "key A|B<sup>1</sup>", "key B<sup>1</sup>", "never", "never", "read/write block"],
       		["1", "1", "0", "key A|B<sup>1</sup>", "key B<sup>1</sup>", "key B<sup>1</sup>", "key A|B1", "value block"],
       		["0", "0", "1", "key A|B<sup>1</sup>", "never", "never", "key A|B<sup>1</sup>", "value block"],
       		["0", "1", "1", "key B<sup>1</sup>", "key B<sup>1</sup>", "never", "never", "read/write block"],
       		["1", "0", "1", "key B<sup>1</sup>", "never", "never", "never", "read/write block"],
       		["1", "1", "1", "never", "never", "never", "never", "read/write block"]
       		],
       		"note" : "<sup>1</sup> if Key B may be read in the corresponding Sector Trailer it cannot serve for authentication (all grey marked lines in last table). As a consequences, if the reader authenticates any block of a sector which uses the grey marked access conditions and using key B, the card will refuse any subsequent memory access after authentication."
   	   },
   	   "copyright" : "HTMLified by <a href=\"http://akafugu.jp\">Akafugu Corporation</a>.<br/>The information is taken from <a href=\"http://www.nxp.com/documents/data_sheet/MF1S503x.pdf\">MF1S503x</a> from NXP Semiconductors." 
   }
]);
