const vSwitch = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ vSwitch });
});
