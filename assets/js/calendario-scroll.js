$(document).ready(function () {
    // Obtiene la fecha actual en formato YYYY-MM-DD
    let hoy = new Date().toISOString().split("T")[0];
    
    // Variables para almacenar la jornada más cercana
    let $jornadaCercana = null; // Guardará el elemento jQuery
    let distanciaAlMasCercano = Infinity; // Inicializa con valor infinito para comparación

    // Recorre cada elemento con clase "jornada"
    $(".jornada").each(function () {
        // Obtiene la fecha del atributo data-fecha
        let jornadaFecha = $(this).data("fecha");
        let jornadaDate = new Date(jornadaFecha);
        
        // Calcula la diferencia absoluta de tiempo (ms) con la fecha actual
        let diferencia = Math.abs(new Date(hoy) - jornadaDate);

        // Actualiza la jornada más cercana si encuentra una diferencia menor
        if (diferencia < distanciaAlMasCercano) {
            distanciaAlMasCercano = diferencia;
            $jornadaCercana = $(this); // Almacena el elemento como objeto jQuery
        }
    });

    // Si encontró una jornada cercana, hace scroll suave hasta ella
    if ($jornadaCercana) {
        $('html, body').animate({
            scrollTop: $jornadaCercana.offset().top - ($(window).height() / 2) // Centrado vertical
        }, 800); // Duración de 800ms (0.8 segundos)
    }
});

