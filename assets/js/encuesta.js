// Variable global para controlar si ya se votó
var votoRealizado = false;

/**
     * FUNCIÓN: mostrarEncuesta(tarjeta)
     * Controla la visualización de la encuesta al hacer clic en la tarjeta
     * @param {HTMLElement} tarjeta - Elemento HTML de la tarjeta clickeada
*/
function mostrarEncuesta(tarjeta) 
{
    // Obtenemos el contenedor de la encuesta dentro de la tarjeta
    var encuesta = tarjeta.querySelector('.contenedor-encuesta');
    
    // Alternamos la visibilidad de la encuesta
    if (encuesta.style.display === 'block') 
    {
        encuesta.style.display = 'none';
    } 
    else 
    {
        encuesta.style.display = 'block';
    }
}

/**
 * FUNCIÓN: votar(opcion, idEncuesta)
 * Maneja la selección de una opción en la encuesta con sistema de voto único
 * 
 * @param {HTMLElement} opcion - Elemento HTML de la opción seleccionada
 * @param {string} idEncuesta - ID del contenedor de la encuesta
 * @returns {boolean} false - Previene la propagación del evento (evita que se ejecute el
 *                           evento click en elementos padres y cancela comportamientos
 *                           por defecto). Equivale a llamar tanto:
 *                           event.preventDefault() como event.stopPropagation()
 * 
 * @example
 * // En HTML:
 * // <div onclick="votar(this, 'encuesta1')">Opción</div>
 */
function votar(opcion, idEncuesta) 
{

    // Verificar si ya se votó
    if (votoRealizado) 
    {
        alert("¡Ya has realizado tu voto! Solo se permite votar una vez.");
        return false;
    }

    // Obtenemos todas las opciones de esta encuesta
    var opciones = document.querySelectorAll('#' + idEncuesta + ' .opcion-encuesta');
    
    // Quitamos el resaltado de todas las opciones
    for (var i = 0; i < opciones.length; i++) 
    {
        opciones[i].style.fontWeight = 'normal';
        opciones[i].style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        opciones[i].style.color = 'white';
    }
    
    opcion.style.backgroundColor = 'rgba(100, 100, 100, 0.3)'; /* Fondo gris */
    opcion.style.color = '#ffffff'; /* Texto blanco */
    opcion.style.border = '1px solid #aaaaaa'; /* Borde gris claro */

    // Marcamos que ya se votó
    votoRealizado = true;
    
    // Mostramos feedback al usuario
    setTimeout(function() 
    {
        alert('¡Gracias por votar! Has seleccionado: ' + opcion.textContent);
    }, 300);
    
    return false; // Evitamos que el evento se propague
}

/**
 * LISTENER: Clic en cualquier parte del documento
 * Cierra la encuesta si se hace clic fuera de ella
 */
document.addEventListener('click', function(e) 
{
    var tarjeta = document.querySelector('.tarjeta-encuesta');
    var encuesta = tarjeta.querySelector('.contenedor-encuesta');
    
    // Si el clic no fue en la tarjeta ni en sus elementos hijos
    if (!e.target.closest('.tarjeta-encuesta') && encuesta.style.display === 'block') 
    {
        encuesta.style.display = 'none';
    }
});