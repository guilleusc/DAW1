/**
 * Función principal que carga la plantilla de jugadores desde un archivo XML
 * y los muestra en una tabla HTML
 */
function cargarPlantilla() 
{
    // 1. OBTENER DATOS INICIALES
    // Busca el nombre del equipo en el atributo data-equipo del body.
    const equipo = document.body.dataset.equipo;

    // Obtiene la referencia a la tabla donde se mostrarán los jugadores
    const tabla = document.getElementById("tabla-plantilla");

    // 2. VALIDACIONES INICIALES
    // Verifica que exista el equipo y la tabla antes de continuar
    if (!equipo || !tabla) 
    {
        console.warn("Equipo o tabla no definidos");
        return;
    }

    // 3. CONFIGURAR LA PETICIÓN AJAX
    // Crea un nuevo objeto XMLHttpRequest para hacer la petición al servidor
    const xhttp = new XMLHttpRequest();

    // Define qué hacer cuando cambie el estado de la petición.
    xhttp.onreadystatechange = function () {
        // 4. PROCESAR RESPUESTA CUANDO ESTÉ COMPLETA (readyState 4) Y EXITOSA (status 200)
        if (this.readyState === 4 && this.status === 200) 
        {
            // Obtiene el XML parseado desde la respuesta.
            const xmlDoc = this.responseXML;

            // Obtiene todos los elementos <equipo> del XML.
            const equipos = xmlDoc.getElementsByTagName("equipo");

            // 5. BUSCAR EL EQUIPO ESPECÍFICO.
            let equipoEncontrado = null;

            // Recorre todos los equipos hasta encontrar el que coincide.
            for (let i = 0; i < equipos.length; i++) 
            {
                if (equipos[i].getAttribute("nombre") === equipo) 
                {
                    equipoEncontrado = equipos[i];
                    break;
                }
            }

            // Si no encontró el equipo, muestra advertencia y termina
            if (!equipoEncontrado) 
            {
                console.warn("No se encontró el equipo en el XML");
                return;
            }

            // 6. PROCESAR JUGADORES DEL EQUIPO
            // Obtiene todos los jugadores del equipo encontrado
            const jugadores = equipoEncontrado.getElementsByTagName("jugador");

            // Recorre cada jugador para crear filas en la tabla,
            for (let i = 0; i < jugadores.length; i++) 
            {
                // Extrae los datos del jugador (posición, nombre y número).
                const jugador = jugadores[i];
                const posicion = jugador.getElementsByTagName("posicion")[0].textContent;
                const nombre = jugador.getElementsByTagName("nombre")[0].textContent;
                const numero = jugador.getElementsByTagName("numero")[0].textContent;

                // 7. CREAR FILA DE TABLA
                // Crea un nuevo elemento <tr> (fila de tabla)
                const fila = document.createElement("tr");

                // Asigna el HTML interno con los datos del jugador.
                fila.innerHTML = `
                    <td>${posicion}</td>
                    <td>${nombre}</td>
                    <td>${numero}</td>
                `;

                // Agrega la fila a la tabla.
                tabla.appendChild(fila);
            }
        }
    };

    // 8. CONFIGURAR Y ENVIAR PETICIÓN
    // Prepara la petición GET al archivo XML.
    xhttp.open("GET", "../data/xml/plantillas.xml", true);

    // Envía la petición al servidor.
    xhttp.send();
}

// Cargar automáticamente al abrir la página
cargarPlantilla();