function clock(){
    let ctime = new Date();
    let clock = document.getElementById("clock");
    clock.textContent = fillZero(ctime.getHours()) + ":" + fillZero(ctime.getMinutes()) + ":" + fillZero(ctime.getSeconds())
}

function fillZero(timeVar) {
    if ( timeVar < 10 ) {
      
        return "0" + timeVar.toString()
        
    }
    else {
        return timeVar.toString()
    }
}

window.global_rec_on = false
window.hover_elements = []
//localstorage

function toggle_rec() {
    window.global_rec_on = !window.global_rec_on
}

function element_hover(element) {
    switch (element.tagName) {
        case 'BUTTON':
            if (element.parentElement.className == "gallery_display" ) {
                element.style.opacity = "0.7" 
            }
            break;

        case 'IMG': 
            if ( element.parentElement.parentElement.parentElement != null && element.parentElement.parentElement.parentElement.className == 'gallery-flex') {
                element.style.transform = 'scale(1.10)'
            }

            if ( element.parentElement.parentElement.tagName == 'NAV') {
                element.parentElement.style.backgroundColor = "#E5E1DA";
                element.style.filter = "brightness(0)";
                element.parentElement.children[1].style.color = "#737373" //napis
            }

            if ( element.parentElement.parentElement.parentElement.className == 'mainPageBody') {
                element.parentElement.parentElement.style.transform = 'scale(1.02)';
            }
        case 'P' :
            if (element.parentElement.parentElement.tagName == 'NAV') {
                element.parentElement.style.backgroundColor = "#E5E1DA"
                element.parentElement.children[0].style.filter = "brightness(0)";
                element.style.color = "#737373"
            }

            break;

        default:

    }
}

function element_hover_off(element) {

    if (element == null) {return}

    

    switch (element.tagName) {
        case 'BUTTON':
            if (element.parentElement.className != null && element.parentElement.className == "gallery_display" ) {
                element.attributeStyleMap.clear() 
            }
            break;

        case 'IMG': 
            if ( element.parentElement.parentElement.parentElement != null 
              && element.parentElement.parentElement.parentElement.className == 'gallery-flex') {
                
                element.attributeStyleMap.clear()
            }

            if ( element.parentElement.parentElement.tagName != null 
              && element.parentElement.parentElement.tagName == 'NAV') {

                element.parentElement.attributeStyleMap.clear()
                element.attributeStyleMap.clear()
                element.parentElement.children[1].attributeStyleMap.clear()
            }

            if ( element.parentElement.parentElement.parentElement.className != null 
              && element.parentElement.parentElement.parentElement.className == 'mainPageBody') {

                element.parentElement.parentElement.attributeStyleMap.clear()
            }

        default:
    }
}

function add_to_list(element) {
    if (!window.hover_elements.includes(element) ) {
        window.hover_elements.push(element);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    let event = null
    let alpha = 1.0
    let hover_element = null
    let allowed_elements = ['BUTTON', 'A', 'IFRAME', 'IMG', 'P']

    document.body.addEventListener('mousemove', (e) =>  {
        event = e

        if(window.global_rec_on) {
            let elements = document.elementsFromPoint(event.clientX, event.clientY);
            
            if( allowed_elements.includes(elements[1].tagName) ) {
                alpha = 0.25;
                element_hover(elements[1]); 
            }
            else {
                alpha = 1;
            }

            if (hover_element != elements[1]) {
                element_hover_off(hover_element);
            }
            hover_element = elements[1];
        }
    });

    document.body.addEventListener('mouseleave', (e) => {

        // if(window.global_rec_on) {

        //     let elements = document.elementsFromPoint(event.clientX, event.clientY);
        //     if( i.tagName == 'BUTTON' || i.tagName == 'A' || i.tagName == 'EFRAME' || i.tagName == 'IMG' ) {
        //         console.log('leave')
        //         element_hover_off(elements[1])
        //         //alpha = 1   
        //     }
        // }
    }) 

    document.body.addEventListener('click', (e) => {
        if ( event != null && window.global_rec_on == true && e.target.tagName == 'CANVAS'  ) {
            let elements = document.elementsFromPoint(event.clientX, event.clientY);
            
            elements[1].click();
        }
    }) 

    document.querySelector("#btn_toggle").addEventListener('click', (e) => {   
        toggle_rec();
    })

    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');

    function frame() {
        clock()
       
        if(window.global_rec_on) {
           
            let time = Date.now();
            canvas.style.top = `${event.clientY-50}px`;
            canvas.style.left = `${event.clientX-50}px`;
            canvas.style.opacity = alpha.toString();

            ctx.globalAlpha = 0.5;
            ctx.fillStyle ="rgba("+(time / 10 % 255)+","+(time / 5 % 255)+","+(time / 2 % 255)+",0.8)";
        
            ctx.fillRect(0, 0, 100, 100);
            canvas.style.display = 'block'        
        }
        else {
            canvas.style.display = 'none'
        }

        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
});