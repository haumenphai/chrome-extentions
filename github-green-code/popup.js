const btnChangeColor = document.getElementById('btn-change-color');


btnChangeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
    });
});

function setPageBackgroundColor() {
    const codeView = document.getElementsByClassName("Box-body p-0")[0]
    chrome.storage.sync.get("vSwitch", ({ vSwitch }) => {
        if (vSwitch) {
            // '#E6FFEC'
            codeView.style.backgroundColor = '#E6FFEC';
        } else {
            codeView.style.backgroundColor = 'white';
        }

        vSwitch = !vSwitch;
        chrome.storage.sync.set({ vSwitch });
    });
}
