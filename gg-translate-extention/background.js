chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'upupup123',
        title: 'Translate in new window',
        type: 'normal',
        contexts: ['selection'],
    })
})

var left = 500
chrome.windows.getCurrent((window) => {
    left = window.width / 4
    // todo: 
    var language = window.navigator.userLanguage || window.navigator.language;
})

var langIn = 'auto'
var langOut = 'vi'


chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log('click context menu')
    chrome.storage.local.get(['window_id'], (values) => chrome.windows.remove(values.window_id))

    chrome.storage.local.get(['langIn', 'langOut'], (values) => {
        langIn = values.langIn
        langOut = values.langOut

        chrome.windows.create({
            url: 'https://translate.google.com/?hl=' + langOut + '&sl=' + langIn + '&tl=' + langOut + '&text=' + info.selectionText + '&op=translate',
            focused: true,
            height: 500,
            width: 1000,
            left: left
        }, (window) => chrome.storage.local.set({ 'window_id': window.id }))
    });  
})