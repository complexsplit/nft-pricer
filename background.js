chrome.action.onClicked.addListener(function(tab) {
    console.log("Click");
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['addDetails.js']
    });
});