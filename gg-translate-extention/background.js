chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'upupup123',
        title: 'Translate A-V',
        type: 'normal',
        contexts: ['selection'],
    })
})


chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log('click context menu')
    chrome.storage.local.get(['window_id'], (values) => chrome.windows.remove(values.window_id))  

    langin = 'auto'
    langout = 'vi'

    chrome.windows.create({
        url: 'https://translate.google.com/?hl='+langout+'&sl='+langin+'&tl='+langout+'&text=' + info.selectionText + '&op=translate',
        focused: true,
        height: 500 
    }, (window) => chrome.storage.local.set({'window_id': window.id}))
})