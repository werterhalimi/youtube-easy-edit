chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'open-options') {
        chrome.tabs.create({ 'url': 'chrome-extension://' + chrome.runtime.id+'/empty.html' });
    }
  });