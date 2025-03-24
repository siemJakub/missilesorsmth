function clock(){
    let ctime = new Date();
    let clock = document.getElementById("clock");
    clock.textContent = fillZero(ctime.getHours()) + ":" + fillZero(ctime.getMinutes()) + ":" + fillZero(ctime.getSeconds())
}

function fillZero(timeVar) {
    if ( timeVar < 10 ) {
        console.log("0" + timeVar.toString())
        return "0" + timeVar.toString()
        
    }
    else {
        return timeVar.toString()
    }
}

window.global_rec_on = false

function toggle_rec() {
    window.global_rec_on = !window.global_rec_on
}

document.addEventListener('DOMContentLoaded', () => {

    let event = null
    let alpha = 1.0

    document.body.addEventListener('mousemove', (e) => {
        let canvas = document.querySelector('canvas');
        if(window.global_rec_on) {
            canvas.style.display = 'block'
            event = e
            canvas.style.top = `${e.clientY-50}px`;
            canvas.style.left = `${e.clientX-50}px`;

            let elements = document.elementsFromPoint(e.clientX, e.clientY);
            for ( i of elements ) {
                
                if( i.tagName == 'BUTTON' || i.tagName == 'A' || i.tagName == 'EFRAME' ) {
                    alpha = 0.25
                    
                    break
                }
                else {
                    alpha = 1
                }
            }
        }
        else {
            canvas.style.display = 'none'
       }
    }) 
    
    document.body.addEventListener('click', (e) => {
        if ( event != null ) {
            let elements = document.elementsFromPoint(event.clientX, event.clientY);
            for ( i of elements ) {
                if (i.id != "canvasRec") {
                
                i.click()
                
                }
            }   
        }
        
    })

    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');

    function frame() {
         
        clock()
        canvas.style.opacity = alpha.toString();
        let time = Date.now();
        ctx.globalAlpha = 0.5;
        ctx.fillStyle ="rgba("+(time / 10 % 255)+","+(time / 5 % 255)+","+(time / 2 % 255)+",0.8)";
        
        ctx.fillRect(0, 0, 100, 100);

        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
});