// This is a school project. 
// The images do not belong to me and were used for scientific purposes only

let page_desc = {
    "page1": [ "desc - 1", "desc - 2", "desc - 3", 
        "desc - 4", "desc - 5" ,"desc - 6" ],
    "page2": [ "desc - 1", "desc - 2", "desc - 3", 
        "desc - 4", "desc - 5" ,"desc - 6" ],
    "page3": [ "desc - 1", "desc - 2", "desc - 3", 
        "desc - 4", "desc - 5" ,"desc - 6" ],
    "page4": [ "desc - 1", "desc - 2", "desc - 3", 
        "desc - 4", "desc - 5" ,"desc - 6" ],
    "page5": [ "desc - 1", "desc - 2", "desc - 3", 
        "desc - 4", "desc - 5" ,"desc - 6" ],
};

let page_tittles = {
    "page1": [ "AGM 65D", "AGM 65E (laser)", "An F-18C armed with Maverick",
        "Maveric seeker", "Maveric under the wing" ,"A - 10 firing a Maverick missile"],
    "page2": ["F-14 carrying AMRAAM", "AIM-120 first kill", "Training version of AIM-120 (blue rings)", 
        "AIM-120 in F22 weapons bay", "AIM-120 carried by F-18", "AIM-120 scheme"],
    "page3": ["AGM-88E", "AGM-88G", "AGM-88 fired by F-18", 
        "AGM-88 under F-16", "AGM-88 scheme", "AGM-88 under the wing"],
    "page4": ["Submarine launch of BGM-109", "BGM-109 scheme", "Vertical launch of BGM-109", 
        "Current Tomahawk operators", "A view from a plane on a cruising BGM-109", "BGM-109 just before the impact"],
    "page5": ["Hellfire seeker", "AGM-114 under the wing of MQ-9 drone", "Current Hellfire operators", 
        "AH-1z firing hellfire", "AH-64 with hellfires", "A F-18C armed with Maverick"],
};

let current_index = 1;
let current_faded = 1;

document.addEventListener('DOMContentLoaded', () => {
   
    document.querySelector("#gallery_scripted_second_img").addEventListener('click', open_photo_on_clikc);

    document.querySelector("#gallery_btn_right").addEventListener('click', () => {
        switch_photo(false);
    })
    document.querySelector("#gallery_btn_left").addEventListener('click', () => {
        switch_photo(true);
    })
    switch_photo(false);
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
        current_index = 1;
    }
    else if (current_index <= 0 ) {
        current_index = 6;
    }

    window.last_time = Date.now();

    let current_page = "page"+document.URL[document.URL.length-6];
    let path = "photos/"+current_page+"/gallery/photo"+current_index+".png";

    let title = document.querySelector('.gallery_scripted h4');
    let desc = document.querySelector('.gallery_scripted p');
    
    load_photo(path);

    title.textContent = page_tittles[current_page][current_index-1];
    desc.textContent = page_desc[current_page][current_index-1];
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
