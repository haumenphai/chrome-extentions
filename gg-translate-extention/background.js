var left = 500
var langIn = 'auto'
var langOut = 'VI'


chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'upupup123',
        title: 'Translate in new window',
        type: 'normal',
        contexts: ['selection'],
    })
    chrome.storage.local.set({'langIn': langIn, 'langOut': langOut})
})


chrome.windows.getCurrent((window) => {
    left = window.width / 4
    // langOut = navigator.language.substring(0,2).toUpperCase()
    // chrome.storage.local.set({'langOut': langOut})
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log('click context menu')
    chrome.storage.local.get(['window_id'], (values) => chrome.windows.remove(values.window_id))

    chrome.storage.local.get(['langIn', 'langOut'], (values) => {
        langIn = values.langIn.toLowerCase()
        langOut = values.langOut.toLowerCase()

        chrome.windows.create({
            url: 'https://translate.google.com/?hl=' + langOut + '&sl=' + langIn + '&tl=' + langOut + '&text=' + info.selectionText + '&op=translate',
            focused: true,
            height: 600,
            width: 1000,
            left: left
        }, (window) => chrome.storage.local.set({   'window_id': window.id}))
    });  
})
