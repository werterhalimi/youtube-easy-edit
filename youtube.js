const details = document.querySelectorAll("#details")
for (let i = 0; i < details.length; i++) {
    const detail = details[i]
    const e = document.createElement("button")
    e.style.height = "30px"
    e.style.width = "30px"
    e.style.marginTop = "60px"  

    e.onclick = function(){
        const content = detail.children[1].children[1].children[0].children[1]
        const thumbnail = detail.children[1].children[0].children[1].getAttribute('href').split('=')[1]
        const title = detail.children[1].children[0].textContent
        const metaData = content.children[0].textContent+" • "+content.children[1].textContent
        chrome.storage.sync.set({ thumbnail,title,metaData });
        chrome.runtime.sendMessage('open-options');
        }    
    detail.append(e)

}


