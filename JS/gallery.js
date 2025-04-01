let page_desc = {
    "Page1": [ "AGM 65D", "AGM 65E (laser)", "An F-18C armed with Maverick", 
        "Maveric seeker", "Maveric under the wing" ,"A - 10 firing a Maverick missile" ]
}

let page_tittles = {
    "Page1": [ "AGM 65D", "AGM 65E (laser)", "An F-18C armed with Maverick",
         "Maveric seeker", "Maveric under the wing" ,"A - 10 firing a Maverick missile"] 
}

let current_index = 1
let current_faded = 1 // true -> second

document.addEventListener('DOMContentLoaded', () => {
   
    document.querySelector("#gallery_scripted_second_img").addEventListener('click', open_photo_on_clikc);

    document.querySelector("#gallery_btn_right").addEventListener('click', () => {
        switch_photo(false);
    })
    document.querySelector("#gallery_btn_left").addEventListener('click', () => {
        switch_photo(true);
    })
});

function open_photo_on_clikc(e) {
    if (current_faded == 1) {
        open(document.getElementById("gallery_scripted_first_img").src);
    }
    else {  
        open(e.target.src);
    }
    
}

function switch_photo(next) {
    if ( next ) {
        current_index++;
    }
    else {
        current_index--;
    }
    
    if (current_index > 6) {
        current_index = 1
    }
    else if (current_index <= 0 ) {
        current_index = 6
    }

    let current_page = "Page"+document.URL[document.URL.length-6];
    let path = "Photos/"+current_page+"/Gallery/photo"+current_index+".png";

    let title = document.querySelector('.gallery_scripted h4')
    let desc = document.querySelector('.gallery_scripted p')
    
    title.textContent = page_tittles[current_page][current_index-1]
    desc.textContent = page_desc[current_page][current_index-1]

    load_photo(path);
}

function load_photo(path) {
    let img1 = document.getElementById("gallery_scripted_first_img");
    let img2 = document.getElementById("gallery_scripted_second_img");

    let images = [img1,img2];

    images[current_faded].src = path;

    images[Math.abs(current_faded - 1)].style.animation = "fadeOut 0.25s linear 1 forwards";
    images[current_faded].style.animation = "fadeIn 0.25s linear 1 forwards";

    current_faded = Math.abs(current_faded - 1);
}
