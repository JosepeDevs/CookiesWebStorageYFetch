
document.addEventListener('DOMContentLoaded', function() {//cuando todo esté cargadito, se haya tomado su café mañanero y esté dispuesto a escuchar...
    var formulario = document.getElementById('formulario');
    var erroresDiv = document.getElementById('errores');
    var eliminarButton = document.getElementById('borrar');
    var crearButton = document.getElementById('crear');
    var listarButton = document.getElementById('listar');
    eliminarButton.addEventListener('click', function(event) {
        deleteCookie('otracookie');
    })
    crearButton.addEventListener('click', function(event) {
        setCookie('otracookie',"hola",365);//esto solo me hizo falta ejecutarlo 1 vez, para testear si había más de una cookie
    })
    listarButton.addEventListener('click', function(event) {
        var listarDiv = document.getElementById("lista");
        listarDiv.innerHTML="<p>"+ document.cookie +"</p>"
    })
    
    // Asegúrate de que el formulario existe antes de intentar agregar un controlador de eventos
    if (formulario) {
        // controlador de eventos para el submit del formulario
        formulario.addEventListener('submit', function(event) {
            // Previene la acción predeterminada del formulario
            event.preventDefault();

            // Obtenemos lo que hay en los inputs
            var nombreInput = document.getElementById("nombre");
            var apellidosInput = document.getElementById("apellidos");
            var edadInput = document.getElementById("edad");
            var nifInput = document.getElementById("nif");
            var emailInput = document.getElementById("email");
            var provinciaInput = document.getElementById("provincia");
            var fechaInput = document.getElementById("fecha");
            var telefonoInput = document.getElementById("telefono");
            var horaInput = document.getElementById("hora");

            let existenErrores=null;
            //quitamos espacios al principio o final y miramos su valor, asumimos todos los campos son required
            if(nombreInput.value.trim() === "") {
                nombreInput.focus();
                existenErrores = true;
            } else if(apellidosInput.value.trim() === "") {
                apellidosInput.focus();
                existenErrores = true;
            } else if(edadInput.value.trim() === "") {
                edadInput.focus();
                existenErrores = true;
            } else if(nifInput.value.trim() === "") {
                nifInput.focus();
                existenErrores = true;
            } else if(emailInput.value.trim() === "") {
                emailInput.focus();
                existenErrores = true;
            } else if(provinciaInput.value == 0) {
                provinciaInput.focus();
                existenErrores = true;
            } else if(fechaInput.value.trim() === "") {
                fechaInput.focus();
                existenErrores = true;
            } else if(telefonoInput.value.trim() === "") {
                telefonoInput.focus();
                existenErrores = true;
            } else if(horaInput.value.trim() === "") {
                horaInput.focus();
                existenErrores = true;
            } else{
                //solo entramos aquí si en todos los campos hay algo (vamos, lo mismo que poner required en el html)
                existenErrores = false;
            }

            if(existenErrores){
                existenErrores=false
                erroresDiv.innerHTML="<h3> Existen errores: No pueden haber campos vacios </h3>";
                aumentarIntentos()
            } else{
                erroresDiv.innerHTML="<h3> Todo OK, enviando formulario a continuación...tan rápido que puede que no se llegue a visualizar este mensaje </h3>";
                deleteCookie('intentos');
                formulario.submit();
            }
        });
    } else {
        console.error('No se pudo encontrar el formulario con el ID "formulario".');
    }
});

/**
* Incrementa el número de intentos registrados en una cookie y campo id="intentos"
*
* Esta función verifica la existencia de una cookie específica que almacena el número de intentos.
* Si la cookie no existe, la función crea una nueva cookie con un valor inicial de 0.
* Si la cookie ya existe, incrementa el valor almacenado en 1 y actualiza la cookie.
* En caso de obtener un valor no numérico, muestra un mensaje de error
* @return {void}
 */
function aumentarIntentos(){

    var intentos = document.getElementById("intentos")
    valorCookie= getValorCookie('intentos') 
    if(valorCookie === false){
        //si no existe la cookie, entonces la creamos
        setCookie('intentos', 1, 365)
        intentos.innerHTML="<h3>Número de intentos: 1</h3>";
        console.log("no existe la cookie");
    } else{
        //si existe la cookie entonces ...
        console.log("sí existe la cookie y vale="+valorCookie);
        if(isNaN(parseInt(valorCookie))){
            console.log("no se pudo extraer un numero como valor");
            intentos.innerHTML="es posible que se haya intentado extraer un valor no valido para los intentos de la cookie";
        } else{
            let intentosActuales= (parseInt(valorCookie))+1
            console.log("intentos actuales="+intentosActuales);
            deleteCookie('intentos');
            setCookie('intentos', intentosActuales , 365)
            intentos.innerHTML="<h3> Número de intentos:"+intentosActuales+"</h3>";
        }
    }
}

/**
 * busca una cookie por nombre
 * @param {string} nombre busca el nombre de una cookie (SIN el signo =)
 * @returns {bool|string}  - devuelve un string con el contenido de la cookie (nombre, valor, fechaEX) o false si no hay coincidencias
 */
function getValorCookie(nombre){
    let nombreCookie = nombre + "="; // lo que vamos a buscar
   // console.log("Cookie sin decodificar=" + document.cookie); // Muestra las cookies sin decodificar
    let decodedCookie = decodeURIComponent(document.cookie); // Decodifica las cookies
    console.log("cookie decodificada=" + decodedCookie); // Muestra las cookies decodificadas, para entender porque es importante hacer el decode
    valor=decodedCookie.substring(document.cookie.indexOf("=")+1,document.cookie.lenght);
    valor=parseInt(valor);
    console.log("valor="+valor);//dará NaN si hay más de una cookie
    if (!isNaN(valor)){
        //si la cookie está sola aparece como "indice=valor" NO aparece punto y coma, si ese es el caso, habrémos llegado hasta aquí
        return valor
    } else{
        //si hay más de 1 cookie, estas están separadas por ;
    let cookieArray = decodedCookie.split(";"); // Divide las cookies decodificadas en un array
    
    for (let i = 0; i < cookieArray.length; i++) { // Recorre con un for las cookies en el array 
        let miCookie = cookieArray[i]; // guardamos la cookie  actual en una variable
        while (miCookie.charAt(0) == ' ') { // Elimina espacios en blanco al inicio de la cookie
            miCookie = miCookie.substring(1); // Nos saltamos el primer caracter (que es un espacio) y  creamos un substring sin el espcio incial
        }//cuando ya no hayan espacios al principio, sale del bucle
        if (miCookie.indexOf(nombreCookie) == 0) { //si está en posicion 0 estamos mirando la cookie cuyo nombre nos llega como parametro 
            let valorCookie = miCookie.substring(miCookie.indexOf("=")+1, miCookie.length)//vamos a coger la posición siguente donde está el igual, así cogeremos el valor
            valorCookie = parseInt(valorCookie)
            console.log("vamos a devolver en getCookie: "+valorCookie);
            return valorCookie  // Retorna el valor de la cookie encontrada, empieza donde se encontró la primera coincidencia
                               //llega hasta donde la cookie acaba (ya está separada/splitted, no cogeremos cookies de despues)
        }
    }
    return false;
    }
}


/**
 * Establece una cookie en el navegador del usuario.
 *
 * @param {string} nombre El nombre de la cookie.
 * @param {string} valor El valor de la cookie.
 * @param {number} diasParaExpirar Número de días hasta que la cookie debe expirar.
 * @return {void} no hace return
 */
function setCookie(nombre,valor,diasParaExpirar){
    let fechaExpiracion = new Date();//sacamos la fecha de hoy
    fechaExpiracion.setTime( fechaExpiracion.getTime() + diasParaExpirar*24*60*60*1000  )//pasar días que llegan por parámetro a milisegundos, sumarlo a hoy = fechaExpiracion
    let textoFechaExpiracion = fechaExpiracion.toUTCString() //hay que pasar a texto  plano para guardarlo en un cookie
    console.log("cookie setteada: "+ nombre + "=" + valor + "; expires =" + textoFechaExpiracion+ "; path=/")//para ver que estamos guardadndo
    document.cookie = nombre + "=" + valor + "; expires =" + textoFechaExpiracion+ ";" + "path=/" //ponemos la cookie con el objeto document, el papito del DOM
}

/**
 * @return {void} borra la cookie
 * @param {string} nombre nombre de la cookie a eliminar 
 */
function deleteCookie(nombre){
    document.cookie = nombre + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    console.log("cookie borrada");
}
