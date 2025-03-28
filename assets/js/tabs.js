// Selecciona todos los elementos <h3> dentro de la clase "tabs"
// Estos representan las pestañas del sistema de navegación por pestañas
let tabs = document.querySelectorAll(".tabs h3");

// Selecciona todos los divs dentro de la clase "tab-content"
// Cada div representa el contenido correspondiente a una pestaña
let tabContents = document.querySelectorAll(".tab-content div");

// Recorre todas las pestañas y les añade un evento de "click"
tabs.forEach( (tab, index) => {
            tab.addEventListener("click", () => {
                // Elimina la clase "active" de todos los contenidos de las pestañas
                tabContents.forEach(content => {
                    content.classList.remove("active");
                });

                // Elimina la clase "active" de todas las pestañas
                tabs.forEach( (tab) => {
                    tab.classList.remove("active");
                });

                // Añade la clase "active" al contenido correspondiente a la pestaña clicada
                tabContents[index].classList.add("active");
                
                // Añade la clase "active" a la pestaña que ha sido clicada
                tabs[index].classList.add("active");
            });
        });