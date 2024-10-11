import { getActiveTabURL } from "./utils.js";

const onPlay = async e => {
  const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
  const activeTab = await getActiveTabURL();

  chrome.tabs.sendMessage(activeTab.id, {
    type: "PLAY",
    value: bookmarkTime,
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  const queryParameters = activeTab.url.split("?")[1];
  const urlParameters = new URLSearchParams(queryParameters);

  const currentVideo = urlParameters.get("v");

  if (activeTab.url.includes("pump.fun/")) {
    // Inject the script to click the button
    alert("Yessir")
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      func: () => {
        const button = document.querySelector('.p-2.text-center.rounded.bg-gray-800.text-grey-600');
        if (button) {
          button.click();
        } else {
          console.log("Button not found on the page.");
        }
      }
    });

    chrome.storage.sync.get([currentVideo], (data) => {
      const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];
      viewBookmarks(currentVideoBookmarks);
    });
  } else {
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML = '<div class="title">This is not a pump.fun page!!!!.</div>';
  }
});
