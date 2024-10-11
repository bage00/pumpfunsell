chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  console.log(tab.url)
  // Only run the script when the page has completely loaded
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes("pump.fun")) {
    // Send a message to the content script to click the button
    chrome.tabs.sendMessage(tabId, {
      type: "CLICK_BUTTON"
    });
  }
});
