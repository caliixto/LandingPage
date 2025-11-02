document.addEventListener("DOMContentLoaded", ()=>{
    let switcher = document.querySelector(".switcher");
    let light = document.querySelector(".switcher__icon-light");
    let dark = document.querySelector(".switcher__icon-dark");
    let logo_light = document.querySelector(".logo-light");
    let logo_dark = document.querySelector(".logo-dark");

    switcher.addEventListener("click", ()=>{
       let head =  document.head;

       let link = document.createElement("link");
       link.rel = "stylesheet";
       link.type = "text/css";
       link.href = "./assets/css/dark.css";
       link.id = "theme-dark";


       let theme_dark = document.querySelector("#theme-dark")
       if(theme_dark){
        head.removeChild(theme_dark);
        light.style.display= "block";
        dark.style.display = "none";
        logo_dark.style.display = "none";
        logo_light.style.display = "block";

       }else{
        head.appendChild(link);
        dark.style.display = "block";
        light.style.display = "none";
        logo_dark.style.display = "block";
        logo_light.style.display = "none";
       }

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")) {
            dark.style.display = "block";
            light.style.display = "none";
        }else {
            light.style.display = "block";
            dark.style.display = "none";
        }

    })
});