$(document).ready(function () {
    let hoy = new Date().toISOString().split("T")[0]; // Obtiene YYYY-MM-DD
    let jornadaCercana = null;
    let distanciaAlMasCercano = Infinity;

    $(".jornada").each(function () {
        let jornadaFecha = $(this).data("fecha"); // Lee el atributo data-fecha
        let jornadaDate = new Date(jornadaFecha);
        let diferencia = Math.abs(new Date(hoy) - jornadaDate);

        if (diferencia < distanciaAlMasCercano) {
            distanciaAlMasCercano = diferencia;
            jornadaCercana = this;
        }
    });

    // Hacer scroll a la jornada más cercana
    if (jornadaCercana) {
        jornadaCercana.scrollIntoView({ behavior: "smooth", block: "center" });
    }
});

