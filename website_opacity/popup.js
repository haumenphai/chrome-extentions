const opacityBar = document.getElementById('opacity_bar');
const opacityValueE = document.getElementById('opacity_value');

// You cannot have a "popup" with an onclick event so cannot use 'chrome.action.onClicked.addListener' 
// onclick to icon of extension
opacityBar.value = 70;
opacityValueE.innerHTML = '70';
changeOpacity();


opacityBar.addEventListener('change', async () => {
    opacityValueE.innerHTML = opacityBar.value;
    changeOpacity();
});

// inject js to page
async function changeOpacity() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: executeChangeOpacity,
        args: [opacityBar.value / 100]
    });
}

// content scripts will be injected to the page
function executeChangeOpacity(opacity) {
    const opacityDIV = document.createElement('div');
    opacityDIV.id = 'div_opacity';
    opacityDIV.style.cssText = `
        position: fixed; top: 0; width: 100%; height: 100vh; z-index: 9999999999999; 
        background-color: black; opacity: ${opacity}; pointer-events:none;
    `;
    
    if (!document.getElementById('div_opacity')) {
        document.body.appendChild(opacityDIV);
    } else {
        document.getElementById('div_opacity').style.opacity = opacity;
    }
}
