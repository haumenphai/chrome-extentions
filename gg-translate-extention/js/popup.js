let btnSaveSetting = document.getElementById("btnSaveSetting")
let langInSelect = document.getElementById("langIn")
let langOutSelect = document.getElementById("langOut")

chrome.storage.local.get(['langIn', 'langOut'], (values) => {
    langInSelect.value = values.langIn
    langOutSelect.value = values.langOut
});

btnSaveSetting.addEventListener("click", async () => {
    btnSaveSetting.innerText = langInSelect.value + ' - ' + langOutSelect.value
    chrome.storage.local.set({'langIn': langInSelect.value, 'langOut': langOutSelect.value}, () => {});
})