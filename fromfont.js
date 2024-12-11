
// first function before there are any canvases 
function createGlyphCanvas(glyph, size) {
    const canvasId = 'c' + glyph.index;
    const canvasClass = 'glyphCanvas'
    const html = '<div class="wrapper" style="width:' + size + 'px"><canvas id="'+ canvasId + '" class="' + canvasClass + '" ></canvas></div>';
    const glyphsDiv = document.getElementById('glyphs');
    const wrap = document.createElement('div');
    wrap.classList.add('glyphwrap')
    wrap.innerHTML = html;
    glyphsDiv.appendChild(wrap);
    const canvas = document.getElementById(canvasId);
    canvas.style.width = size + "px";
    canvas.style.height = 100 + "px";
    var ctx = canvas.getContext('2d');
    var scale = window.devicePixelRatio;
    canvas.width = size * scale;
    canvas.height = 100 * scale;
    ctx.scale(scale,scale);
    return ctx;
}

// function to call after canvases are already made to delete previous canvases
function createGlyphCanvasNew(glyph, size) {
    const canvasId = 'c' + glyph.index;
    if(document.getElementById(canvasId)){
        document.getElementById(canvasId).parentNode.parentNode.remove(); }
    const canvasClass = 'glyphCanvas'
    const html = '<div class="wrapper" style="width:' + size + 'px"><canvas id="'+ canvasId + '" class="' + canvasClass + '" ></canvas></div>';
    const glyphsDiv = document.getElementById('glyphs');
    const wrap = document.createElement('div');
    wrap.classList.add('glyphwrap')
    wrap.innerHTML = html;
    glyphsDiv.appendChild(wrap);
    const canvas = document.getElementById(canvasId);
    canvas.style.width = size + "px";
    canvas.style.height = 100 + "px";
    var ctx = canvas.getContext('2d');
    var scale = window.devicePixelRatio;
    canvas.width = size * scale;
    canvas.height = 100 * scale;
    ctx.scale(scale,scale);
    return ctx;
}

// document.getElementById("inputfontbutton").addEventListener('click', () => {
//     document.querySelector('input[type="file"]').click();
// })
let buf;
let font;

// -------------------------------------------
// first function called once at the beginning
async function main(){

    // const buf = await fetch('assets/CraftworkGrotesk-SemiBold.otf')
    // buf = await fetch('assets/CraftworkGrotesk-SemiBold.otf')
    // font = opentype.parse(await buf.arrayBuffer())

    // let credit = document.getElementById("fontCredit");
    // credit.innerHTML = "<h3>Current font:</h3> Craftwork Grotesk Semibold"

    // let upload = document.getElementById("uploadedfile");
    // upload.innerHTML = "no file chosen";

    var value = slider.value;

    for (let j=0; j<font.glyphs.length; j++){
        glyph = font.glyphs.get(j);
        const path = glyph.toPathData();

        let subStringArr = []
        let tempStr =''

        for (let i = 0; i < path.length; i++) {

            if(path[i] === 'C' || path[i] === 'M' || path[i] === 'L' || path[i] === 'Q' || path[i] === '-' ||  path[i] === ' '){
   
                if(tempStr.length > 0){
                    subStringArr += Math.floor(Math.random() * value)  + parseInt(tempStr)
                }
                subStringArr += path[i] 
                tempStr = ''

            } else if (path[i] === 'Z'){
                subStringArr += tempStr
                subStringArr += path[i]  

            } else {
                tempStr += path[i]

            }
        }
            
        const newPath = opentype.Path.fromSVG(subStringArr)

        var newGlyph = new opentype.Glyph({
            index: glyph.index,
            name: glyph.name,
            unicode: glyph.unicode,
            advanceWidth: glyph.advanceWidth,
            path: newPath
        });

        allglyphs.push(newGlyph)



        const ctx = createGlyphCanvas(newGlyph, 120);
        const x = 20;
        const y = 80;
        const fontSize = 72;
        
        ctx.clearRect(0,0,120,120);

        newGlyph.draw(ctx, x, y, fontSize);
        // newGlyph.drawPoints(ctx, x, y, fontSize);
        //glyph.drawMetrics(ctx, x, y, fontSize);

        }
        drawText(arrayId);
}

let currentfont;


async function changeFont(typeface){
    currentfont = typeface;

    switch(typeface){
        case "Craftwork": buf = await fetch('assets/CraftworkGrotesk-SemiBold.otf'); break;
        case "Avara": buf = await fetch('assets/Avara-BoldItalic.otf'); break;
        case "Garamondt": buf = await fetch('assets/Garamondt-Regular.otf'); break;
        case "Louise": buf = await fetch('assets/Louise-Regular.otf'); break;
        case "FT88": buf = await fetch('assets/FT88-School.otf'); break;
        case "Goozette": buf = await fetch('assets/Goozette.otf'); break;
        default: buf = await fetch('assets/CraftworkGrotesk-SemiBold.otf'); break;
    }

    font = opentype.parse(await buf.arrayBuffer())
    redoMain();
}



// call first render of fonts
// loadFonts();
changeFont("Avara");
// main();




// ---------------------------------------------------------------------
// second function called on change of slider - removes the old canvases 
var slider = document.getElementById("myRange");
var removeButton = document.getElementById("removeButton");


// var fontInput
let allglyphs = []

async function redoMain(){

    const glyphdivs = document.querySelectorAll('.glyphCanvas');
    glyphdivs.forEach(glyphdiv => { glyphdiv.parentNode.parentNode.remove(); })
 
    allglyphs.length = 0;
    // fontInput = document.getElementById("inputFont").files;
    // var fontFile = document.getElementById("inputFont").files[0];
    // console.log(fontFile);
    // let credit = document.getElementById("fontCredit");
    // let upload = document.getElementById("uploadedfile");
    
    // const buf = await fetch('assets/CraftworkGrotesk-SemiBold.otf')
    // if (fontInput.length > 0){
    //      font = opentype.parse(await fontFile.arrayBuffer())
    //      if(font.names.macintosh.fontFamily["en"] && font.names.macintosh.fontSubfamily["en"]){
    //      credit.innerHTML = "<h3>Current font:</h3> " + font.names.macintosh.fontFamily["en"] + " " + font.names.macintosh.fontSubfamily["en"]; }
    //      else{ credit.innerHTML = "<h3>Current font:</h3> " + fontFile.name }
    //      upload.innerHTML = "File: " + fontFile.name
    // } else{
    // let buf;
    // switch(typeface){
    //     case "craftwork": buf = craftwork; break;
    //     case "avara": buf = avara; break;
    //     case "garamondt": buf = garamondt; break;
    //     case "louise": buf = louise; break;
    //     case "ft88": buf = ft88; break;
    //     case "goozette": buf = goozette; break;
    //     default: buf = craftwork; break;
    // }
        //  const buf = await fetch('assets/CraftworkGrotesk-SemiBold.otf')
    // font = opentype.parse(await buf.arrayBuffer())
    //      credit.innerHTML = "<h3>Current font:</h3> Craftwork Grotesk Semibold"
    //      upload.innerHTML = "no file chosen";
    //     } 

    var value = slider.value;

    for (let j=0; j<font.glyphs.length; j++){
        glyph = font.glyphs.get(j);

        const path = glyph.toPathData()

        let subStringArr = []
        let tempStr =''

        for (let i = 0; i < path.length; i++) {

            if(path[i] === 'C' || path[i] === 'M' || path[i] === 'L' || path[i] === 'Q' || path[i] === '-' ||  path[i] === ' '){
   
                if(tempStr.length > 0){
                    subStringArr += Math.floor(Math.random() * value)  + parseInt(tempStr)
                }
                subStringArr += path[i] 
                tempStr = ''

            } else if (path[i] === 'Z'){
                subStringArr += tempStr
                subStringArr += path[i]  

            } else {
                tempStr += path[i]

            }
        }
            
        // const newPath = opentype.Path.fromSVG(subStringArr)
        const newPath = new opentype.Path.fromSVG(subStringArr);
        // newPath.strokeWidth = 20;
        // console.log(newPath)

        var newGlyph = new opentype.Glyph({
            index: glyph.index,
            name: glyph.name,
            unicode: glyph.unicode,
            advanceWidth: glyph.advanceWidth,
            path: newPath
        });

        // console.log(newGlyph.getPath())

        allglyphs.push(newGlyph)
        // try {
        const ctx = createGlyphCanvasNew(newGlyph, 120);
        const x = 20;
        const y = 80;
        const fontSize = 72;

        
        ctx.clearRect(0,0,120,120);
  
        newGlyph.draw(ctx, x, y, fontSize);
 
        }

        drawText(arrayId)
}

// listen for change in slider and call second function
slider.addEventListener("change", redoMain, false);
// removeButton.addEventListener("click", redoMain, false);
// document.getElementById("inputFont").addEventListener("change", redoMain, false);


// slider.addEventListener("change", drawText, false);

// --------------------------------------------------------
// compile glyphs into 1 font and download with unique name
function downloadFont(){
    var currentDate = new Date();

    const randomFont = new opentype.Font({
            familyName: 'Generated' +currentDate.getDate()
                                    +(currentDate.getMonth()+1)
                                    +currentDate.getFullYear()
                                    +currentDate.getHours()
                                    +currentDate.getMinutes()
                                    +currentDate.getSeconds(),
            styleName: 'Random',
            unitsPerEm: 1000,
            ascender: 800,
            descender: -200,
            glyphs: allglyphs
        })

    // console.log(randomFont);
    randomFont.download();

}

// async function removeFont(){
//     document.getElementById("inputFont").value="";
//     redoMain();
// }

// typewriter
var typewriter = document.getElementById('typewriter');
var typectx = typewriter.getContext('2d');

var textArray = ["The quick brown fox jumps over the lazy dog", 
                 "Pack my box with five dozen liquor jugs", 
                 "The five boxing wizards jump quickly",
                 "Junk MTV quiz graced by fox whelps",
                 "My ex pub quiz crowd gave joyful thanks",
                 "Vexed nymphs go for a quick waltz job",
                 "Sphinx of black quartz, judge my vow",
                 "Sex prof. gives back no quiz with mild joy",
                 "Go, lazy fat vixen; be shrewd, jump quick",
                 "Quick fox jumps nightly above wizard"]
var arrayId = Math.round(Math.random()*(textArray.length-1));

var gPreviewText = textArray[arrayId]
var printpath;

async function drawText (ai) { 

    

    const writeFont = new opentype.Font({
        familyName: 'Write-generated',
        styleName: 'Print',
        unitsPerEm: 1000,
        ascender: 800,
        descender: -200,
        glyphs: allglyphs
    })

    var unicodes_present = [];

    console.log(writeFont.glyphs.glyphs)
    for(let [key, value] of Object.entries(writeFont.glyphs.glyphs)){
        unicodes_present.push(value.unicode)
    }

    let filteredText = [];

    for(let char of gPreviewText){
        const unicode = char.charCodeAt(0)
        if(!unicodes_present.includes(unicode)){
            filteredText.push('-')
        }else{
            filteredText.push(char)
        }
        // console.log(unicode)
        // const match = writeFont.glyphs.flatMap(item => item.glyphs).filter(item => item.unicode == unicode)
        // // const match = writeFont.glyphs.glyphs.find(unicode == unicode)
        // // const match = writeFont.glyphs.filter(glyph => glyph.unicode == unicode)
        // console.log(match)
    }

    var c = typewriter;
    var r = c.getBoundingClientRect();
    var scale = window.devicePixelRatio;
    c.width = r.width * scale;
    c.height = r.height * scale;
    var prectx = c.getContext('2d');
    // prectx.fillStyle = "white";
    // prectx.fillRect(0,0, c.width, c.height);
    // prectx.fillStyle = "black"
    prectx.scale(scale, scale);
    
    // writeFont.draw(prectx, gPreviewText, 10, 50, 40, {kerning: false}); 
    writeFont.draw(prectx, filteredText, 10, 50, 40, {kerning: false}); 

    // printpath = writeFont.getPath(gPreviewText, 10, 50, 40, {kerning: false});
    printpath = writeFont.getPath(filteredText, 10, 50, 40, {kerning: false});

    pathdata = printpath.toPathData({optimize: true, flipY: false})
    // console.log(pathdata);
}
window.onresize = drawText;


async function changePreviewText(e){
    gPreviewText = e.target.value;
    if(e.target.value < 1){ gPreviewText = textArray[Math.round(Math.random()*(textArray.length-1))]}
    drawText();
}

function printText(){

    var date = new Date();
    var currentdate = date.getTime()
    // svg = printpath.toSVG({flipY: false});
    var canvas = document.getElementById("typewriter");
    var img = canvas.toDataURL("image/png");
    var downloadLink = document.createElement("a");
    downloadLink.href = img;
    downloadLink.download = `demoday_odditype_${currentdate}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);


    svg = printpath.toSVG({flipY: false});
    // console.log(svg);

    // var textCanvas = document.getElementById("typewriter");
    // var url = textCanvas.toDataURL();

    var windowContent = '<!DOCTYPE html>';
    windowContent += '<html>'
    windowContent += '<head><title>Print canvas</title></head>';
    windowContent += '<body style="margin: 0;">'
    windowContent += '<svg width="1800" height="200" style="transform-origin: bottom left; transform: rotate(90.000001deg) translate(-230px, 625px) scale(5);">' + svg + '</svg>'
    // windowContent += '<img src="' + url + '" style="transform-origin: bottom left; transform: rotate(90.000001deg) translate(-80px, 0) scale(2.5); image-rendering: pixelated">';
    windowContent += '</body>';
    windowContent += '</html>';
    var printWin = window.open('','','width=300,height=auto');
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    printWin.focus();
    printWin.print();
    setTimeout(() => { 
        printWin.close(); 
        document.getElementById("preview-text").value = '';
        gPreviewText = textArray[Math.round(Math.random()*(textArray.length-1))]
        drawText();
    }, 10);
    //printJS({printable:'typewriter', type:'html', maxWidth: 4000});

}

function saveText(){
    var date = new Date();
    var currentdate = date.getTime()
    // svg = printpath.toSVG({flipY: false});
    var canvas = document.getElementById("typewriter");
    var img = canvas.toDataURL("image/png");
    var downloadLink = document.createElement("a");
    downloadLink.href = img;
    downloadLink.download = `demoday_odditype_${currentdate}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    
}

document.getElementById('preview-text').addEventListener('input', changePreviewText)
// drawText()

function initEmailJS(){
    emailjs.init({publicKey: "P_eRVj_sUmO6pSvk6"})
}

initEmailJS();

document.getElementById("email-button").addEventListener("click", function(){
    document.getElementById("email-popup").style.transform = "translate(-50%, -50%) scale(1)"
})
document.getElementById("cancel-email").addEventListener("click", function(){
    document.getElementById("email-popup").style.transform = "translate(-50%, -50%) scale(0)"
})

document.getElementById("email-form").addEventListener("submit", async function(event){
    event.preventDefault();

    var email = document.getElementById("email-input").value;
    var fontname = document.getElementById("fontname-input").value;

    if(email.length > 0){
    var currentDate = new Date();

    if(fontname.length == 0){
        fontname = `Odditype - ${currentDate.getDate()}${(currentDate.getMonth()+1)}${currentDate.getFullYear()} ${currentfont}`
    }else{
        fontname = `${fontname} - odditype`
    }


    const randomFont = new opentype.Font({
            // familyName: 'Odditype - ' +currentDate.getDate()
            //                         +(currentDate.getMonth()+1)
            //                         +currentDate.getFullYear()
            //             + " " + currentfont,
            familyName: fontname,
            styleName: `${currentfont} Shuffled`,
            unitsPerEm: 1000,
            ascender: 800,
            descender: -200,
            glyphs: allglyphs
        })

        console.log(randomFont)

    var blob = new Blob([randomFont.toArrayBuffer()])
    // var font_url = URL.createObjectURL(new Blob([randomFont.toArrayBuffer()]), {type: "font/opentype"})
    
    var fontfile = await blobToBase(blob)

    console.log("send email")

    emailjs.send("service_hotmail", "template_font", {
        user_email: email,
        font_name: fontname,
        font_file: fontfile},
        (response) => {console.log("SUCCESS", response.status, response.text)},
        (error) => {console.log("FAILED...", error)}
    )
    document.getElementById("email-input").value = "";
    document.getElementById("email-popup").style.transform = "translate(-50%, -50%) scale(0)"
    }
})

const blobToBase = blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
        reader.onloadend = () => {
            resolve(reader.result)
        }
    })
}