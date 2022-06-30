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
  document.querySelectorAll("#description-text").forEach(b => b.style.fontSize = (2*1.8)*(value/100)+"rem")
  document.querySelectorAll(".metadata-snippet-container-one-line").forEach(b => b.style.fontSize = (2*1.8)*(value/100)+"rem")
  document.querySelectorAll(".metadata-snippet-container").forEach(b => b.style.fontSize = (2*1.8)*(value/100)+"rem")
}
function setDescVisible(value) {
  document.querySelectorAll("#description-text").forEach(b => b.style.visibility = value) 
  document.querySelectorAll(".metadata-snippet-container-one-line").forEach(b => b.style.visibility = value) 
  document.querySelectorAll(".metadata-snippet-container").forEach(b => b.style.visibility = value)
  
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

document.querySelector('button').onclick = async () =>{
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: appendComments
  });
}


function appendComments(){
  const commentSelector = document.querySelectorAll("#contents > ytd-comment-thread-renderer")
  const bodies = document.querySelectorAll("#author-thumbnail")
  const comments = []

  for (let i = 1; i < bodies.length; i++) {
    const body = bodies[i];
    body.children[0].style = "display: flex;flex-direction: column;justify-content: space-evenly;align-items: center;"
    const e = document.createElement("button")
    e.style.height = "30px"
    e.style.width = "30px"
    e.style.margin = "5px"
    body.append(e)
    e.onclick = function(){
      const authorPicture = body.children[0].children[0].children[0].src
      if(e.style.background == 'green'){
        var url = new URL(authorPicture);
        url.searchParams.append('useless',0)
        url.searchParams.append('index', comments.length);
        for (let i = 0; i < comments.length; i++) {
          const comment = comments[i];
          url.searchParams.set(i, JSON.stringify(comment));
          
        }
        window.location.href = url
        document.body.appendChild(body)
        return
      }
      const authorName = body.parentElement.children[1].children[0].children[1].children[0].innerText
      const age = body.parentElement.children[1].children[0].children[1].children[3].innerText
      const content = body.parentElement.children[1].children[1].innerText
      const noLikes = body.parentElement.children[1].children[2].children[0].children[3].innerText
      comments.push({
        authorName,authorPicture,age,content,noLikes
      })
      console.log(comments)
      /* chrome.storage.sync.get("comments", function(result) {
        let comments = result.comments
        if(comments === undefined || comments === null)
        comments = []
        
        chrome.storage.sync.set({ comments});
      })*/
      
      e.style.background = 'green'
      
    }
  }
  
  
}

