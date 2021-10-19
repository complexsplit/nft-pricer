1. Looking at current extension, Market Boy. https://chrome.google.com/webstore/detail/market-boy/hojgdpdkilmbfncmlcacakhljdnhmobg?hl=en
2. Decompile the extension https://robwu.nl/crxviewer/ and feed it the above URL

Notes:
- Extension does not do any dynamic loading of ranking data. Instead, static JSON files are included with the extension. If rankings change, a new verison of the extension has to be published.
- All of the work happens in addDetails.js. 
  - Lines 1-179 load the JSON files into objects.
  - Lines 182-256 zero out any previous modifications to the page.
  - Lines 261-589 determine what market page you are on and then insert new child elements, with proper matching style.
  - Lines 590-594 do the work on click, and continue doing it every 2 seconds.
  
Can we do a dynamic call to another web page? For instance, on line 7 of addDetails.js can we do an XMLHttpRequest to a real URL? 
