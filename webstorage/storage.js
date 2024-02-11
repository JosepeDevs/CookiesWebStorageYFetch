document.addEventListener('DOMContentLoaded', function() {//cuando todo esté cargadito, se haya tomado su café mañanero y esté dispuesto a escuchar...
    var formulario = document.getElementById('formulario');
   
    var deleteCarButton = document.getElementById('deleteCar');
    var nextCarButton = document.getElementById('nextCar');
    var prevCarButton = document.getElementById('prevCar');
    var listarDiv = document.getElementById('listar');
    var cocheActualH2 = document.getElementById('cocheActual');
    var datosCocheActualDiv = document.getElementById('datosCocheActual');

    
    deleteCarButton.addEventListener('click', function(event) {
        const matriculaABorrar = cocheActualH2.innerHTML
        for (let i =  0; i < localStorage.length; i++) {//accederemos a las llaves por indice
            const key = localStorage.key(i);//guardamos temporalmente la llave
            const jsonString = localStorage.getItem(key);//accedemos al valor con la llave
            const obj = JSON.parse(jsonString);//pasamos el texto json a objeto

            if (obj.hasOwnProperty('matricula') && obj['matricula'] == matriculaABorrar) {
                // Encontramos el objeto que coincide con la matricula buscada
                // Eliminamos el objeto del LocalStorage
                localStorage.removeItem(key);
                break; // Salimos del bucle ya que hemos encontrado y eliminado el objeto
            }
        }

    })

    nextCarButton.addEventListener('click', function(event) {

            // Retrieve
            document.getElementById("result").innerHTML = localStorage.getItem("lastname");// Store
            localStorage.setItem("lastname", "Smith");

    })

    prevCarButton.addEventListener('click', function(event) {

            // Retrieve
            document.getElementById("result").innerHTML = localStorage.getItem("lastname");// Store
            localStorage.setItem("lastname", "Smith");

    })
    
    // Asegúrate de que el formulario existe antes de intentar agregar un controlador de eventos
    if (formulario) {
        // controlador de eventos para el submit del formulario
        formulario.addEventListener('submit', function(event) {

            event.preventDefault(); //evita que se recargue la pagina , no mandar formulario
            listarDiv.innerHTML +="<table><tr><th>matricula</th><th>color</th><th>marca</th>";
            for (let i =  0; i < localStorage.length; i++) {
                const llave = localStorage.key(i);//cogemos cada llave 
                const objetoJSON = localStorage.getItem(llave);//accedemos al item por llave
                const objeto = JSON.parse(objetoJSON);
                listarDiv.innerHTML +=`<tr>`
                for(let atributo in objeto) {
                    if(objeto.hasOwnProperty(atributo)) {
                        listarDiv.innerHTML +=`<td> ${objeto[atributo]}</td>`;
                        if(atributo == "matricula"){
                            cocheActualH2.innerHTML = objeto[atributo];
                        }
                    }
                }
                listarDiv.innerHTML +=`</tr>`
                if(i==0){
                    datosCocheActualDiv.innerHTML +=`<tr>`
                    for(let atributo in objeto) {
                        if(objeto.hasOwnProperty(atributo)) {
                            listarDiv.innerHTML +=`<td> ${objeto[atributo]}</td>`;
                            if(atributo == "matricula"){
                                cocheActualH2.innerHTML = objeto[atributo];
                            }
                        }
                    }
                    datosCocheActualDiv.innerHTML +=`</tr>`
                }
            }
            listarDiv.innerHTML +="</table>";

            // Obtenemos lo que hay en los inputs
            var matriculaInput = document.getElementById('matricula');
            var colorInput = document.getElementById('color');
            var marcaInput = document.getElementById('marca');

            let matricula =  matriculaInput.innerHTML;
            let color =  colorInput.innerHTML;
            let marca =  marcaInput.innerHTML;

            let car = {
                matricula: matricula,
                color: color,
                marca: marca
            };
            
            
            
            // Store
            localStorage.setItem("coche", car);//se convertirá a json automaticamente para guardarlo
            
        })
    }
})