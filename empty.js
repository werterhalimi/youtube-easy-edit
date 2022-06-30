const canvas = document.querySelector("body > canvas")
const preview = document.querySelector('#preview')
let state = 0      

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

function drawThumbnail(){ 
    chrome.storage.sync.get(['metaData',"thumbnail","title"], function(result) {
        var ctx = canvas.getContext('2d');  
        const img = new Image;
        const topPadding = parseInt(document.querySelector("#top").value)
        const sidePadding = parseInt(document.querySelector("#side").value)
        img.src = "https://img.youtube.com/vi/"+result.thumbnail+"/hqdefault.jpg";
        
        img.onload = function(){
            
            canvas.width = img.width+sidePadding*2;
            canvas.height = 100+img.height+topPadding*2;
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "black"
            ctx.drawImage(img,sidePadding,topPadding); 
            ctx.font = "normal 900 24px Unknown, sans-serif";
            
            const text = result.title.split(" ")
            const lines = []
            let current = text[0]
            for (let i = 1; i < text.length; i++) {
                const width = ctx.measureText(current).width
                const nextWord = ctx.measureText(text[i]).width
                if (width + nextWord < img.width)
                current =current +" "+ text[i]
                else{
                    lines.push(current)
                    current = text[i]
                }
            }
            lines.push(current)
            lines.push(result.metaData)
            let height = img.height+topPadding+24
            for (let i = 0; i < lines.length-1; i++) {
                const line = lines[i]
                ctx.fillText(line, sidePadding, height);
                height+=30
            }
            height+=20
            ctx.font = "normal 500 20px Unknown, sans-serif";
            ctx.fillStyle = "#898989"
            ctx.fillText(lines[lines.length-1], sidePadding, height);
            
        };
    });
    
}




document.querySelector("#side").oninput = draw

document.querySelector("#top").oninput = draw

document.querySelector('#switch').onclick = function(){
    const content = document.querySelector('#switch')
    if (state == 0){
        state = 1
        content.textContent = 'Switch thumbnail'
    }else{
        state = 0
        content.textContent = 'Switch comment'
    }
    draw()
}

document.querySelector('#download').onclick = function click(){
    chrome.storage.sync.get("title", function(result) {
        downloadURI(canvas.toDataURL(),result.title+'.png')
        
    })
    
}

drawThumbnail()