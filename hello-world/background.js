const black = '#000000';
const white = '#ffffff';
const color = black;
const vSwitch = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ vSwitch });
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
});

