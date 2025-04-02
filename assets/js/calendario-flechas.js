// Seleccionamos todas las celdas con la clase "marcador"
let marcadores = document.querySelectorAll(".marcador");

// A cada celda le añadimos un listener y le ponemos el cursor tipo "puntero"
for(let marcador of marcadores){
    anhadirListeners(marcador);
    marcador.style.cursor = "pointer"; // Cambia el cursor al estilo "mano"
}

// Crear la flecha (que se va a añadir y quitar en los eventos)
const flecha = document.createElement("span");
flecha.textContent = "▾"; // Flecha inicial hacia abajo
flecha.style.position = "absolute";
flecha.style.top = "20%";
flecha.style.right = "5%";
flecha.setAttribute("class", "flecha");

// Función que añade todos los listeners necesarios a cada celda
function anhadirListeners(td) {

    // Evento al hacer click en la celda
    td.addEventListener('click', function(e) {
      
      const rect = this.parentNode.nextElementSibling; // Selecciona la fila siguiente

      // Si la fila ya está activa, la cerramos
      if(rect.getAttribute("id") === "activo"){
        flecha.textContent = "▾"; // Cambia la flecha hacia abajo
        let celda = rect.getElementsByTagName("td")[0]; // Obtiene la celda interna
        rect.removeChild(celda); // Elimina la celda
        rect.removeAttribute("id"); // Quita el "id" para desactivar

      } else {
        // Cerramos cualquier otro desplegable activo antes de abrir uno nuevo
        let activo = document.getElementById("activo");
        if(activo != null){
          let celda = activo.getElementsByTagName("td")[0];
          flecha.textContent = "▾"; // Resetea la flecha
          activo.removeChild(celda);
          activo.removeAttribute("id");
        }

        // Ahora activamos el desplegable actual
        rect.setAttribute("id", "activo");
        flecha.textContent = "▴"; // Flecha hacia arriba
        // Insertamos una celda que ocupa las 3 columnas de la tabla
        rect.innerHTML = "<td colspan=\"3\">Aquí irían los goles<br>sdghsdfg</td>";
      }
    });

    // Evento cuando el ratón entra en la celda
    td.addEventListener("mouseover", function(){
      // Solo muestra flecha hacia abajo si no está desplegado
      if(td.parentNode.nextElementSibling.getAttribute("id") !== "activo"){
        flecha.textContent = "▾";
      }
      // Insertar flecha en la celda
      td.appendChild(flecha);
      // Cambiar color del texto al pasar el ratón
      td.style.color = "red";
    });

    // Evento cuando el ratón sale de la celda
    td.addEventListener("mouseout", function(){
      flecha.textContent = "▴"; // Cambia la flecha hacia arriba cuando sale el ratón
      td.removeChild(flecha); // Quita la flecha
      td.style.color = "black"; // Restablece el color original del texto
    });
}