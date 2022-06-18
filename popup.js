const titleRange = document.querySelector("#titleRange")
const titleCheck = document.querySelector("#titleCheck")

titleRange.oninput =  async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setTitleSize,
    args: [titleRange.value]
  });
}

titleCheck.oninput =  async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setTitleVisible,
    args: [(titleCheck.checked) ? "visible" : "hidden"]
  });
}


function setTitleSize(value) {
    document.querySelectorAll("#video-title").forEach(b => b.style.fontSize = (2*1.8)*(value/100)+"rem")
 
}
function setTitleVisible(value) {
    document.querySelectorAll("#video-title").forEach(b => b.style.visibility = value) 
}


const descRange = document.querySelector("#descRange")
const descCheck = document.querySelector("#descCheck")

descRange.oninput =  async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setDescSize,
    args: [descRange.value]
  });
}

descCheck.oninput =  async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setDescVisible,
    args: [(descCheck.checked) ? "visible" : "hidden"]
  });
}


function setDescSize(value) {
    document.querySelectorAll(".metadata-snippet-container-one-line").forEach(b => b.style.fontSize = (2*1.8)*(value/100)+"rem")
 
}
function setDescVisible(value) {
    document.querySelectorAll(".metadata-snippet-container-one-line").forEach(b => b.style.visibility = value) 
}

const chapCheck = document.querySelector("#chapCheck")

chapCheck.oninput =  async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setChapVisible,
    args: [(chapCheck.checked) ? "visible" : "hidden"]
  });
}



function setChapVisible(value) {
    document.querySelectorAll("#expandable-metadata").forEach(b => b.style.visibility = value) 
}


