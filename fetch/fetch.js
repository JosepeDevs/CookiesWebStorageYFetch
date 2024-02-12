
const url= "https://jsonplaceholder.typicode.com/albums" //devuelve una tabla de titulos asociados a un usuario, cada entrada es un row
const url2= "https://dummyjson.com/users" //devuelve una tabla de titulos asociados a un usuario, cada entrada es un row
const url3= "https://jsonplaceholder.typicode.com/photos" //devuelve una tabla de titulos asociados a un usuario, cada entrada es un row
const tituloAbuscar= "quos omnis officia"
const idABuscar= "quos omnis officia"
const age= "quos omnis officia"
const idComoAge= age
//resultado una url
fetch(url)
  .then(response => {
    return response.json();//convertir de JSON a  objetos de JS
  })
  .then(data1 => {//data es lo returned del then previo
    const arrayObjetos = data1; //lo metemos en un array
    let objetoEncontrado = false
    for(let i=0;i<arrayObjetos.length;i++){
        if( arrayObjetos[i].title == tituloAbuscar){
            objetoEncontrado = arrayObjetos[i];
            break
        }
    }

    if (objetoEncontrado == false) {
        console.log("no se encontró"+tituloAbuscar+"en los datos proporcionados");
    } else {
        console.log('Objeto encontrado con titulo='+tituloAbuscar+" : ", objetoEncontrado);
    }
    const idEncontrado  = objetoEncontrado.id;
    return fetch(url2);
    })
    .then(response => {
        return response.json();//convertir de JSON a  objetos de JS
    })
    .then(data2 => {//data es lo returned del then previo
        const arrayUsuarios = data2; //lo metemos en un array
        let userEncontrado = false
        for(let i=0;i<arrayUsuarios.length;i++){
            if( arrayObjetos[i].id == idABuscar){
                userEncontrado = arrayUsuarios[i];
                break
            }
        }

        if (userEncontrado == false) {
            console.log("no se encontró"+idABuscar+"en los datos proporcionados");
        } else {
            console.log('Objeto encontrado con id='+idABuscar+" : ", userEncontrado);
        }
        const ageEncontrada  = userEncontrado.age;
        return fetch(url3);
    })
    .then(response => {
        return response.json();//convertir de JSON a  objetos de JS
    })
    .then(data3 => {//data es lo returned del then previo
        const arrayImagenes = data3; //lo metemos en un array
        let imagenEncontrada = false
        for(let i=0;i<arrayImagenes.length;i++){
            if( arrayImagenes[i].id == ageEncontrada){
                imagenEncontrada = arrayImagenes[i];
                break
            }
        }

        if (imagenEncontrada == false) {
            console.log("no se encontró ID="+ageEncontrada+"en los datos proporcionados");
        } else {
            console.log('Objeto encontrado con id='+ageEncontrada+" : ", imagenEncontrada);
        }
        const urlImagen  = imagenEncontrada.url;
        const imagenDiv=document.getElementById("Imagen")
        imagenDiv.innerHTML="<i>"+urlImagen+"</i>"
    })
    .catch(error => {
        console.error("hubo algún problema:", error);
    });