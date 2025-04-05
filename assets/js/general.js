const botonMovil = document.querySelector(".boton-movil");
const menuUl = document.querySelector(".cabecera nav ul"); // Selecciona el <ul> dentro del <nav>

botonMovil.addEventListener('click', function() {
    if (menuUl.style.display === 'flex') {
        menuUl.style.display = 'none'; // Oculta el menú
    } else {
        menuUl.style.display = 'flex'; // Muestra el menú
    }
});