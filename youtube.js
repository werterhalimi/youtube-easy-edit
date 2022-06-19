/*const items = document.querySelectorAll("#items")
const panel = items[items.length-1]
const element = panel.children[0].cloneNode(true)
panel.append(element)
const thumbnails = document.querySelectorAll("#thumbnail") 
for (let i = 0; i < thumbnails.length; i++) {
    const thumbnail = thumbnails[i]
    thumbnail.onmouseover = () => {
        thumbnail.getElementsByClassName.visibility = "hidden"
    }
}

*/

const details = document.querySelectorAll("#details")
for (let i = 0; i < details.length; i++) {
    const detail = details[i]
    const e = document.createElement("button")
    e.style.height = "30px"
    e.style.width = "30px"
    e.style.marginTop = "60px"  

    e.onclick = function(){
        const content = detail.children[1].children[1].children[0].children[1]
        const thumbnail = detail.parentElement.children[0].children[0].children[1].children[0].getAttribute("src")
        const title = detail.children[1].children[0].textContent
        const metaData = content.children[0].textContent+" • "+content.children[1].textContent
        chrome.storage.sync.set({ thumbnail,title,metaData });
        chrome.runtime.sendMessage('open-options');
        }    
    detail.append(e)

}