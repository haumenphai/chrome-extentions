let btnSaveSetting = document.getElementById("btnSaveSetting")
let langInSelect = document.getElementById("langIn")
let langOutSelect = document.getElementById("langOut")
let btnSwitchLanguage = document.getElementById("btnSwitchLanguage")

btnSwitchLanguage.addEventListener("click", async () => {
    if (langInSelect.value != 'auto') {
        let t = langInSelect.value
        langInSelect.value = langOutSelect.value
        langOutSelect.value = t   
    }
})

chrome.storage.local.get(['langIn', 'langOut'], (values) => {
    langInSelect.value = values.langIn
    langOutSelect.value = values.langOut
});

btnSaveSetting.addEventListener("click", async () => {
    btnSaveSetting.innerText = langInSelect.value + ' - ' + langOutSelect.value
    chrome.storage.local.set({'langIn': langInSelect.value, 'langOut': langOutSelect.value}, () => {});
})