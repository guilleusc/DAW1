// Definimos una clase ES6 para manejar la funcionalidad de las pestañas.
class Pestañas 
{
    // Constructor de la clase que recibe los selectores de las pestañas y sus contenidos.
    constructor(selectorPestañas, selectorContenido) 
    {
        // Seleccionamos todas las pestañas utilizando el selector pasado al constructor.
        this.pestañas = document.querySelectorAll(selectorPestañas);  

        // Seleccionamos todo el contenido de las pestañas utilizando el selector correspondiente.
        this.contenidoPestañas = document.querySelectorAll(selectorContenido);  
    }

    // Método para inicializar los eventos de click en las pestañas.
    init() 
    {
        // Recorremos todas las pestañas usando forEach.
        // El índice es simplemente la posición de la pestaña en la lista.
        this.pestañas.forEach((pestaña, índice) => {

            // Añadimos un "listener" de click a cada pestaña.
            // Cada vez que el usuario haga clic en una pestaña, se ejecuta el método 'cambiarPestaña()'.
            pestaña.addEventListener("click", () => this.cambiarPestaña(índice));
        });
    }

    // Método para cambiar entre pestañas
    cambiarPestaña(índice) 
    {
        // Primero, eliminamos la clase "active" de todos los contenidos de las pestañas.
        // Esto oculta todo el contenido que no pertenece a la pestaña seleccionada.
        this.contenidoPestañas.forEach(contenido => contenido.classList.remove("active"));
        
        // Eliminamos la clase "active" de todas las pestañas para que ninguna quede resaltada.
        this.pestañas.forEach(pestaña => pestaña.classList.remove("active"));

        // Ahora, añadimos la clase "active" al contenido de la pestaña seleccionada.
        // Esto muestra el contenido de la pestaña activa.
        this.contenidoPestañas[índice].classList.add("active");
        
        // También añadimos la clase "active" a la pestaña que el usuario ha clicado.
        // Esto resalta visualmente la pestaña activa.
        this.pestañas[índice].classList.add("active");
    }
}

// Instanciamos la clase Pestañas y pasamos los selectores de las pestañas y sus contenidos.

// Creamos una instancia de la clase Pestañas y le pasamos los selectores correspondientes
// a las pestañas (".tabs h3") y a los contenidos de las pestañas (".tab-content div").
const misPestañas = new Pestañas(".tabs h3", ".tab-content div");

// Llamamos al método init() para inicializar los eventos y funcionalidades.
misPestañas.init();