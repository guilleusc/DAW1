// Selecciona todas las etiquetas con la clase "jornada"
const jornadas = document.querySelectorAll(".jornada");

// Itera sobre cada elemento y llama a la función cargarJornada
jornadas.forEach(jornada => {
    cargarJornada(jornada);
});

function cargarJornada(jornada) {
    fetch("../data/json/jornada1.json") // Carga el JSON desde un archivo externo
        .then(r => r.json()) // Convierte la respuesta a JSON
        .then(jsonObj => {
            // Iteramos sobre cada partido, asumiendo que el orden del JSON coincide con el de la tabla
            jsonObj.partidos.forEach((partido, indice) => {
                // Seleccionamos la fila del partido usando la clase "partidoN"
                let partidoFila = jornada.querySelector("tr.partido" + (indice + 1));
                // Asumimos que cada fila tiene tres celdas (<td>)
                let celdas = partidoFila.getElementsByTagName("td");
                celdas[0].textContent = partido.equipo1;
                celdas[1].textContent = partido.resultado;
                celdas[2].textContent = partido.equipo2;

                // La fila inmediatamente siguiente es la destinada a los goles.
                let filaGoles = partidoFila.nextElementSibling;
                let celdaFilaGoles = filaGoles.firstElementChild;
                // Si el partido tiene goles, los insertamos; si no, dejamos la fila vacía
                if (partido.goles.length > 0) {
                    let listaGoles1 = "";
                    let listaGoles2 = "";
                    partido.goles.forEach(gol => {
                        if (gol.equipo == partido.equipo1) {
                            listaGoles1 += "⚽" + gol.minuto + "'" + " - " + gol.jugador + "</br>";
                        } else {
                            listaGoles2 += gol.jugador + " - " + gol.minuto + "'" + "⚽" + "</br>";
                        }
                    });
                    // Rellenamos la etiqueta <p> con los goles correspondientes
                    celdaFilaGoles.firstElementChild.innerHTML = listaGoles1; // Primera <p>
                    celdaFilaGoles.firstElementChild.nextElementSibling.innerHTML = listaGoles2; // Segunda <p>
                } else {
                    // Si no hay goles
                    celdaFilaGoles.innerHTML = "🚫";
                }
                // Empezamos con los desplegables escondidos
                filaGoles.style.display = "none";
            });
        })
        .catch(error => console.error("Error cargando el JSON:", error));
}

    

    ////// GESTION DE FLECHAS
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
        //rect.removeChild(celda); // Elimina la celda
        rect.style.display = "none";
        rect.removeAttribute("id"); // Quita el "id" para desactivar

      } else {
        // Cerramos cualquier otro desplegable activo antes de abrir uno nuevo
        let activo = document.getElementById("activo");
        if(activo != null){
          let celda = activo.getElementsByTagName("td")[0];
          flecha.textContent = "▾"; // Resetea la flecha
          activo.style.display = "none";
          activo.removeAttribute("id");
        }

        // Ahora activamos el desplegable actual
        rect.setAttribute("id", "activo");
        flecha.textContent = "▴"; // Flecha hacia arriba
        
        // Hacemos parecer el desplegable
        rect.style.display = "table-row";
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


