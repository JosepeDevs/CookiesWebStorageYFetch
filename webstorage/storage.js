var indiceCocheAMostrar

// Intenta obtener el array de coches de localStorage y lo parsea a formato JSON; si no existe, usa un array vacío
let cochesArray = localStorage.getItem('coches') ? JSON.parse(localStorage.getItem('coches')) : [];

document.addEventListener('DOMContentLoaded', function() {//cuando todo esté cargadito, se haya tomado su café mañanero y esté dispuesto a escuchar...
    var formulario = document.getElementById('formulario');

    var deleteCarButton = document.getElementById('deleteCar');
    var nextCarButton = document.getElementById('nextCar');
    var prevCarButton = document.getElementById('prevCar');
    var guardarCoche = document.getElementById('guardarCoche');
    var listarDiv = document.getElementById('listar');
    var cocheActualH2 = document.getElementById('cocheActual');
    var datosCocheActualDiv = document.getElementById('datosCocheActual');
    
    function Coche(matricula, color, marca) {
        this.matricula = matricula;
        this.color = color;
        this.marca = marca;
    }
    
    /**     crea una tabla y pone el titulo del coche cuya información se está "tableando"
     * @param {Array} cochesArray 
     * @param {number} indiceCocheAMostrar Debe ser un número
     */
    function printTablaConCoche(cochesArray,indiceCocheAMostrar ){
        cocheActualH2.innerHTML = cochesArray[indiceCocheAMostrar].matricula
        datosCocheActual.innerHTML +="<table>";
        datosCocheActualDiv.innerHTML +=`<tr>`
        datosCocheActualDiv.innerHTML +=`<td>`
        datosCocheActualDiv.innerHTML += cochesArray[indiceCocheAMostrar].matricula
            datosCocheActualDiv.innerHTML +=`</td>`
        datosCocheActualDiv.innerHTML +=`<td>`
        datosCocheActualDiv.innerHTML += cochesArray[indiceCocheAMostrar].color
            datosCocheActualDiv.innerHTML +=`</td>`
        datosCocheActualDiv.innerHTML +=`<td>`
        datosCocheActualDiv.innerHTML += cochesArray[indiceCocheAMostrar].marca
            datosCocheActualDiv.innerHTML +=`</td>`
        datosCocheActualDiv.innerHTML +=`</tr>`
        datosCocheActual.innerHTML +="</table>";
    }
    
    deleteCarButton.addEventListener('click', function(event) {
        const matriculaABorrar = cocheActualH2.innerHTML
        //findIndex es como forEach , para cada elemento del array hará el callback, cojera cada coche, hará la comprobación (en este caso con la funcion flecha) en la
        //que se comprueba si la matricula coincide con la que se quiere borrar.
        const indiceObjetivo = cochesArray.findIndex(coche => coche.matricula === matriculaABorrar); 
        if (indiceObjetivo !== -1) {//devuelve -1 si no encuentra lo buscado en el array
            //para no dejar el hueco vacio cuando nos cargemos el elemento del array hacemos splice, desde el indice de indiceObjetivo hasta 1 elemento siguiente 
            //podría cargarme varios coches seguidos si quisiera, para eso sirve el segundo argumento
            cochesArray.splice(indiceObjetivo, 1);
            // me lo cargo para checkear boxes y haber usado todos los métodos, pero realmente creo que si hiciera el setitem
            //se actualizaria (como la key es la misma sobreescribiría los datos, realmente borrarlo es un poco overkikll, pero de nuevo, hay que probar todos los métodos)
            localStorage.removeItem("arrayCoches");
            localStorage.setItem("arrayCoches", JSON.stringify(cochesArray));
        }
    })

    nextCarButton.addEventListener('click', function(event) {
        if(indiceCocheAMostrar == cochesArray.length-1){
            indiceCocheAMostrar = -1 //si entra aquí es que al sumar 1 al índice nos iríamos fuera de los límites del array, lo reiniciamos.
        } else if(indiceCocheAMostrar === null){
            indiceCocheAMostrar = 0 //si no existe, empezamos por el principio, como toda buena casa
        } else {
            indiceCocheAMostrar += 1 // si no está al final y ya existe, cada vez que llamemos esta función aumentaremos en 1 el indice del array a mostrar
        }
        printTablaConCoche(cochesArray, indiceCocheAMostrar );
    })

    prevCarButton.addEventListener('click', function(event) {
        if(indiceCocheAMostrar == 0){
            indiceCocheAMostrar = cochesArray.length-1 //si entra aquí es que al restar 1 al índice nos iríamos fuera de los límites del array, que dé la vuelta.
        } else if(indiceCocheAMostrar === null){
            indiceCocheAMostrar = 0 //si no existe, empezamos por el principio, como toda buena casa
        } else {
            indiceCocheAMostrar += -1 // si no está al principio y ya existe, cada vez que llamemos esta función reducirems en 1 el indice del array a mostrar
        }
        printTablaConCoche(cochesArray, indiceCocheAMostrar );
    })

    guardarCoche.addEventListener('click', function submit(event) {
        event.preventDefault(); //evita que se recargue la pagina , no mandar formulario
        // Obtenemos lo que hay en los inputs
        var matriculaInput = document.getElementById('matricula');
        var colorInput = document.getElementById('color');
        var marcaInput = document.getElementById('marca');

        let matricula =  matriculaInput.innerHTML;
        let color =  colorInput.innerHTML;
        let marca =  marcaInput.innerHTML;
        var miCoche = new Coche(matricula, color, marca)
        
        cochesArray.push(miCoche);
        localStorage.setItem("arrayCoches", JSON.stringify(cochesArray));

        matriculaInput.innerHTML = ""
        colorInput.innerHTML = ""
        marcaInput.innerHTML = ""
        
        listarDiv.innerHTML +=`<table>`
        cochesArray.forEach(addCocheATabla);//para cada objeto vamos a hacer un callback
        listarDiv.innerHTML +=`</table>`
        function addCocheATabla(coche){

            listarDiv.innerHTML +=`<tr>`
                listarDiv.innerHTML +=`<td>`
                    listarDiv.innerHTML += coche.matricula
                listarDiv.innerHTML +=`</td>`
                listarDiv.innerHTML +=`<td>`
                    listarDiv.innerHTML += coche.color
                listarDiv.innerHTML +=`</td>`
                listarDiv.innerHTML +=`<td>`
                    listarDiv.innerHTML += coche.marca
                listarDiv.innerHTML +=`</td>`
            listarDiv.innerHTML +=`<tr>`
        }
    })
})