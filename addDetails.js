/***********
 * Import Gmoot data
 ***********/
var gmootData = [];
try {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "chrome-extension://" + chrome.runtime.id + "/gmootData.json", false);
  xmlHttp.send(null);
  gmootData = xmlHttp.responseText;
  gmootData = JSON.parse(gmootData).data;
} catch(e) {
  console.log(e);
}

/***********
 * Import Gmoot Unique Item data
 ***********/
 var gmootUniqueItemData = [];
 try {
   var xmlHttp = new XMLHttpRequest();
   xmlHttp.open("GET", "chrome-extension://" + chrome.runtime.id + "/gmootUniqueItemData.json", false);
   xmlHttp.send(null);
   gmootUniqueItemData = xmlHttp.responseText;
   gmootUniqueItemData = JSON.parse(gmootUniqueItemData);
 } catch(e) {
   console.log(e);
 }

 var uniqueArmor = [];
 var uniqueHeadwear = [];
 var uniqueFootwear = [];
 var uniqueWeapon = [];

 if (gmootUniqueItemData != null) {
   uniqueArmor = gmootUniqueItemData.uniqueArmor;
   uniqueHeadwear = gmootUniqueItemData.uniqueHeadwear;
   uniqueFootwear = gmootUniqueItemData.uniqueFootwear;
   uniqueWeapon = gmootUniqueItemData.uniqueWeapon;
 }

/***********
 * Set Gmoot Styles
 ***********/
 if (typeof gmootOneOfOneStyles == 'undefined') {
  let gmootOneOfOneStyles = '.gmootMultipleOneOfOnes {-webkit-animation: glow 1s ease-in-out infinite alternate;-moz-animation: glow 1s ease-in-out infinite alternate;animation: glow 1s ease-in-out infinite alternate;}@-webkit-keyframes glow {from {box-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 15px #700, 0 0 20px #700, 0 0 25px #700, 0 0 30px #700, 0 0 35px #700;}to {box-shadow: 0 0 10px #000, 0 0 15px #A00, 0 0 20px #A00, 0 0 25px #A00, 0 0 30px #A00, 0 0 35px #A00, 0 0 40px #A00;}}.gmootSingleOneOfOne {-webkit-animation: glow2 1s ease-in-out infinite alternate;-moz-animation: glow2 1s ease-in-out infinite alternate;animation: glow2 1s ease-in-out infinite alternate;}@-webkit-keyframes glow2 {from {box-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 15px #770, 0 0 20px #770, 0 0 25px #770, 0 0 30px #770, 0 0 35px #770;}to {box-shadow: 0 0 10px #000, 0 0 15px #AA0, 0 0 20px #AA0, 0 0 25px #AA0, 0 0 30px #AA0, 0 0 35px #AA0, 0 0 40px #AA0;}}';
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

  head.appendChild(style);

  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = gmootOneOfOneStyles;
  } else {
    style.appendChild(document.createTextNode(gmootOneOfOneStyles));
  }
}

var loadAllData = function() {

  /***********
   * Clear existing UI elements
   ***********/
  if (typeof gmootMarketHelpers != 'undefined') { gmootMarketHelpers = null; }
  
  var gmootMarketHelpers = document.getElementsByClassName('gmootMarketHelper');
  while (gmootMarketHelpers.length > 0) {
    gmootMarketHelpers[0].parentNode.removeChild(gmootMarketHelpers[0]);
  }
  

  /***********
    * Selectors for different marketplaces [DE,ME]
    ***********/
  var selectors = ['p.text-color-main-secondary','h6.mb-0'];
  
  selectors.forEach(selectorString => {
  
    document.querySelectorAll(selectorString).forEach(e => {
  
     
      /***********
        * Gmoot
        ***********/
      if (e.textContent.toLowerCase().indexOf('gmoot') > -1) {
        
        var gmootDetailElement = document.createElement('p');
        gmootDetailElement.classList.add('gmootMarketHelper');
        var bagNumber = e.textContent.replace(/\D/g, '');
      
        if (bagNumber != null && bagNumber != '') {
          for (let i = 0; i < gmootData.length; i++) {
    
            if (gmootData[i]['#'] == bagNumber) {
              gmootDetailElement.textContent = 'Rank: ' + gmootData[i]['Ranking'];
  
              let oneOfOnes = "";
              let oneOfOneEmojis = "";
    
              if (uniqueArmor.indexOf(gmootData[i]['armor']) > -1) {
                oneOfOnes += "A";
                oneOfOneEmojis += "🛡️";
              }
    
              if (uniqueFootwear.indexOf(gmootData[i]['footwear']) > -1) {
                oneOfOnes += "F";
                oneOfOneEmojis += "👟";
              }
    
              if (uniqueHeadwear.indexOf(gmootData[i]['headwear']) > -1) {
                oneOfOnes += "H";
                oneOfOneEmojis += "🧢";
              }
    
              if (uniqueWeapon.indexOf(gmootData[i]['weapon']) > -1) {
                oneOfOnes += "W";
                oneOfOneEmojis += "🗡️";
              }
    
              try {
                if (oneOfOnes.length == 1) {
                  e.closest('li').classList.add("gmootSingleOneOfOne");
                } else if (oneOfOnes.length > 1) {
                  e.closest('li').classList.add("gmootMultipleOneOfOnes");
                }
              } catch (e) {
                console.log("Magic Eden tsk tsk");
              }
              
    
              if (oneOfOnes.length > 0) {
                gmootDetailElement.textContent += ". 1/1: " + oneOfOneEmojis;
              }
    
              if (gmootData[i]['Ranking'] < 500) {
                e.style.color = "orange";
              } else if (gmootData[i]['Ranking'] < 1000) {
                e.style.color = "purple";
              } else if (gmootData[i]['Ranking'] < 2500) {
                e.style.color = "blue";
              } else if (gmootData[i]['Ranking'] < 4000) {
                e.style.color = "green";
              } else {
                e.style.color = "grey";
              }
            }
          }
        e.parentNode.insertBefore(gmootDetailElement, e.nextSibling);
        }
      }
    });
  
  });

}

/***********
* Run on click and then loop every 2 sec
***********/
loadAllData();
setInterval(loadAllData, 2000);