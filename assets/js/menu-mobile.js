document.addEventListener("DOMContentLoaded", (event) =>{

    //seleccionamos los dos elementos principales

    let mobile_btn = document.querySelector(".navbar__mobile-btn");
    let mobile_menu = document.querySelector(".menu-mobile");

    //Funcion mostrar y ocultar menu

    const showHiddenMneu = ()=>{
        let show = document.querySelector(".menu-mobile--show");

        if(show){
           mobile_menu.classList.remove("menu-mobile--show");
        }else{
           mobile_menu.classList.add("menu-mobile--show"); 
        }
    };

    //Al dar click al boton del menus mostrar el menu de navegacion responsive

    mobile_btn.addEventListener("click", showHiddenMneu);

    //Al redimensionar la pantalla ocultar el menu si es necesario

    window.addEventListener("resize", ()=>{
        let window__width = parseInt(document.body.clientWidth);

        if(window__width >= 1000){
             mobile_menu.classList.remove("menu-mobile--show");
        }
    });

    //Poder cerrar el menu con el boton X

    let = btn__close = document.querySelector(".menu-mobile__close");

    btn__close.addEventListener("click", showHiddenMneu);


    //Desplegar submenu

    let menu_item = document.querySelectorAll(".menu-mobile__item");

    menu_item.forEach(item => {
       item.addEventListener("click", (event)=>{

         event.preventDefault();
        let submenu = item.lastElementChild;
        

        if(submenu.className == "menu-mobile__submenu-mobile"){
            if(submenu.style.display === "block"){
                submenu.style.display = "none"
            }else{
                submenu.style.display = "block"
            }
        }

       });
    })

});