
const url= "https://jsonplaceholder.typicode.com/albums" //devuelve una tabla de titulos asociados a un usuario, cada entrada es un row
const url2= "https://dummyjson.com/users" //devuelve una tabla de titulos asociados a un usuario, cada entrada es un row
const url3= "https://jsonplaceholder.typicode.com/photos" //devuelve una tabla de titulos asociados a un usuario, cada entrada es un row
const tituloAbuscar= "quos omnis officia"
const age= "29"
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
    const idEncontrado  = objetoEncontrado.userId;
    return idEncontrado
    })
    .then(idEncontrado => {
        const idABuscar=idEncontrado
        fetch(url2)
            .then(response => {
                return response.json();//convertir de JSON a  objetos de JS
            })
            .then(data2=>{
                const arrayUsuarios = data2.users; 
                let usuarioEncontrado = false;
                for(let i=0;i<arrayUsuarios.length;i++){
                    if( arrayUsuarios[i].id == idABuscar){
                        usuarioEncontrado = arrayUsuarios[i];
                        break
                    }
                }
                if (usuarioEncontrado == false) {
                    console.log("no se encontró usuario con id "+idABuscar+" en los datos proporcionados...");
                } else { 
                    console.log('Usuario encontrado con id= '+idABuscar+" y "+" con edad "+usuarioEncontrado.age);
                }
                return usuarioEncontrado;
            })
            .then(data3 => {
                const usuario=data3
                const idABuscar2 = usuario.age
                fetch(url3)
                    .then(response => {
                        return response.json();//convertir de JSON a  objetos de JS
                    })
                    .then(data3=>{
                        const arrayAlbums = data3
                        let albumEncontrado = false
                        for(let i=0;i<arrayAlbums.length;i++){
                            if( arrayAlbums[i].id == idABuscar2){
                                albumEncontrado = arrayAlbums[i];
                                break
                            }
                        }
                        if (albumEncontrado == false) {
                            console.log("no se encontró album con id "+idABuscar2+" en los datos proporcionados...");
                        } else { 
                            console.log('Album encontrado con id= '+idABuscar2+" y "+" con url "+albumEncontrado.url);
                        }
                        const enlace=albumEncontrado.url
                        return enlace;
                    })
                    .then(response=>{
                        const imagenDiv=document.getElementById("imagen")
                        imagenDiv.innerHTML="<h2>Imagen</h2><img src='"+response +"'></img>"
                    })
            })
    })        
.catch(error => {
    console.error("hubo algún problema:", error);
})
