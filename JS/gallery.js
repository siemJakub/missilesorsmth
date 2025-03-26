const fs = require("FileSystem")

page_tittles = {}
page_src = {}
page_desc = ["Maveric seeker", "Maveric under the wing", "AGM 65D", "AGM 65E (laser)"]

document.addEventListener('DOMContentLoaded', () => {
   
    current_page = "Page"+document.URL[document.URL.length-5]

    for (let i = 0; i < 5; i++) {
        page_src[i] = "Photos/"+current_page+"/Gallery"
      }

});