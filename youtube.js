if (window.location.href.includes('yt3.ggpht.com')){
    const comments = []
    const params = new URLSearchParams(window.location.href)
    for (let index = 0; index < parseInt(params.get('index')); index++) {
        const element = JSON.parse(params.get(index));
        comments.push(element)
        
    }
    document.body.style = 'background: lightgray;'
    const root = document.createElement('div')
    root.style = "margin: auto;display: flex;    flex-direction: row-reverse;    justify-content: space-around;    align-items: center;"
    let index = 0
    
    
    const nextButton = document.createElement('button')
    nextButton.textContent = '〉'
    nextButton.style = "background: transparent;    border: none;    font-size: 60px;    color: gray;    margin: 25px;"
    nextButton.onclick = function(){
        index += 1
        drawComment(index)
    }
    const prevButton = document.createElement('button')
    prevButton.textContent = '〈'
    prevButton.style = "background: transparent;    border: none;    font-size: 60px;    color: gray;    margin: 25px;"

    prevButton.onclick = function(){
        if(index > 0) index -= 1
        drawComment(index)
    }

    const sideBoard = document.createElement('div')
    sideBoard.style = 'display: flex;flex-direction: column;align-items: center;'

    const topPaddingRangeLabel = document.createElement('h3')
    topPaddingRangeLabel.textContent = "Top Padding"
    sideBoard.append(topPaddingRangeLabel)

    const topPaddingRange = document.createElement('input')
    topPaddingRange.setAttribute('type','range')
    topPaddingRange.oninput = function(){
        drawComment(index)
    }
    sideBoard.append(topPaddingRange)
    
    const sidePaddingRangeLabel = document.createElement('h3')
    sidePaddingRangeLabel.textContent = "Side Padding"
    sideBoard.append(sidePaddingRangeLabel)
    const sidePaddingRange = document.createElement('input')
    sidePaddingRange.setAttribute('type','range')
    sidePaddingRange.oninput = function(){
        drawComment(index)
    }
    sideBoard.append(sidePaddingRange)

    const downloadButton = document.createElement('button')
    downloadButton.style = '    margin: 20px;    font-size: large;    border: none;    border-radius: 5px;    padding: 10px;'
    downloadButton.textContent = 'Download '+ comments.length
    downloadButton.onclick = function(){
        for (let j = 0; j < comments.length; j++) {
            drawComment(j,true)
            
        }
    }
    sideBoard.append(downloadButton)

    root.append(sideBoard)
    document.body.children[0].remove()
    document.body.append(root)
    const canvas = document.createElement('canvas')
    root.append(nextButton)
    root.append(canvas)
    root.append(prevButton)
    
    function drawComment(i,download){
        console.log(i, index)
        if(index == comments.length){
            i = 0
            index = 0
        } 
        
        const comment = comments[i]
        var ctx = canvas.getContext('2d');  
        
        const topPadding = parseInt(topPaddingRange.value)
        const sidePadding = parseInt(sidePaddingRange.value)
        const textWitdh = 600
        
        
        var img = new Image;
        
        img.onload = function(){
            
            canvas.width = img.width+textWitdh+sidePadding*2;
            canvas.height = img.height+topPadding*2;
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "black"
            ctx.save()
            ctx.beginPath()
            ctx.arc(sidePadding+img.width/2, topPadding+img.height/2, img.width/2, 0, Math.PI * 2, false)
            ctx.strokeStyle = 'transparent'
            ctx.stroke()
            ctx.clip()
            ctx.drawImage(img, sidePadding,topPadding)
            ctx.restore()
            
            ctx.font = "normal 550 12px Unknown, Arial";
            
            ctx.fillText(comment.authorName,sidePadding+img.width+10,topPadding+10)
            const authorNameWidth = ctx.measureText(comment.authorName).width
            ctx.fillStyle = '#606079'
            ctx.font = "normal 400 10px Unknown, Arial";
            ctx.fillText(comment.age,sidePadding+img.width+15+authorNameWidth,topPadding+9)
            
            ctx.fillStyle = 'black'
            ctx.font = "normal 500 14px Unknown, Arial";
            const text = comment.content.split(" ")
            const lines = []
            let current = text[0]
            for (let i = 1; i < text.length; i++) {
                const width = ctx.measureText(current).width
                const nextWord = ctx.measureText(text[i]).width
                if (width + nextWord < textWitdh)
                current=current +" "+ text[i]
                else{
                    lines.push(current)
                    current = text[i]
                }
            }
            lines.push(current)
            let height = img.height/2+5+topPadding
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i]
                ctx.fillText(line, sidePadding+img.width+10, height);
                height+=17
            }
            console.log(lines.length*14)
            ctx.fillStyle = "black"
            ctx.lineWidth = 0.1;
            const p = new Path2D("M12.42,14A1.54,1.54,0,0,0,14,12.87l1-4.24C15.12,7.76,15,7,14,7H10l1.48-3.54A1.17,1.17,0,0,0,10.24,2a1.49,1.49,0,0,0-1.08.46L5,7H1v7ZM9.89,3.14A.48.48,0,0,1,10.24,3a.29.29,0,0,1,.23.09S9,6.61,9,6.61L8.46,8H14c0,.08-1,4.65-1,4.65a.58.58,0,0,1-.58.35H6V7.39ZM2,8H5v5H2Z")
            ctx.translate(sidePadding+img.width+10,height)
            ctx.stroke(p)
            ctx.fill(p) 
            if(comment.noLikes !== '' || comment.noLikes == 0){
                ctx.font = "normal 450 12px Unknown, Arial";
                ctx.fillStyle = '#606060'
                ctx.fillText(comment.noLikes,20,11)
            }
            
            
            const d = new Path2D("M3.54,2A1.55,1.55,0,0,0,2,3.13L1,7.37C.83,8.24,1,9,2,9H6L4.52,12.54A1.17,1.17,0,0,0,5.71,14a1.49,1.49,0,0,0,1.09-.46L11,9h4V2ZM6.07,12.86a.51.51,0,0,1-.36.14.28.28,0,0,1-.22-.09l0-.05L6.92,9.39,7.5,8H2a1.5,1.5,0,0,1,0-.41L3,3.35A.58.58,0,0,1,3.54,3H10V8.61ZM14,8H11l0-5h3Z")
            ctx.translate(50,0)
            ctx.stroke(d)
            ctx.fill(d) 
            if(download)
            downloadURI(canvas.toDataURL(),i)
        };
        img.src = comment.authorPicture;
        
    }
    
    
    function downloadURI(uri, name) {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        delete link;
    }
    
    drawComment(index)
    
    
}
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
        chrome.storage.sync.set({ thumbnail,title,metaData});
        chrome.runtime.sendMessage('open-options');
    }    
    detail.append(e)
    
}


