let btnChangeColor = document.getElementById("btnChangeColor");

chrome.storage.sync.get("color", ({ color }) => {
    btnChangeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
btnChangeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
    });
});


// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {

    chrome.storage.sync.get("vSwitch", ({ vSwitch }) => {
        vSwitch = !vSwitch;
        chrome.storage.sync.set({ vSwitch });

        const black = '#212121'
        const white = '#ffffff'
        var texts = getTextElement()

        if (vSwitch) {
            document.body.style.backgroundColor = black;
            texts.forEach(element => {
                element.style.color = white
            });
        } else {
            document.body.style.backgroundColor = white
            texts.forEach(element => {
                element.style.color = black
            });
        }

        function getTextElement() {
            let p = Object.values(document.querySelectorAll('p')) 
            let li = Object.values(document.querySelectorAll('li'))
            let i = Object.values(document.querySelectorAll('i'))
            let b = Object.values(document.querySelectorAll('b'))
            let h1 = Object.values(document.querySelectorAll('h1'))
            let h2 = Object.values(document.querySelectorAll('h2'))
            let h3 = Object.values(document.querySelectorAll('h3'))
            let h4 = Object.values(document.querySelectorAll('h4'))
            let h5 = Object.values(document.querySelectorAll('h5'))
            let h6 = Object.values(document.querySelectorAll('h6'))
        
            return p.concat(li).concat(i).concat(b).concat(h1).concat(h2).concat(h3).concat(h4).concat(h5).concat(h6)
        }
        
    });

}

