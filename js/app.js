// formulario
document.getElementById('myform').addEventListener('submit', guardarSitio)

function guardarSitio(e){
    e.preventDefault()

    let sitio = document.getElementById('sitio').value
    let sitioUrl = document.getElementById('url').value

    if(!validarForm(sitio, sitioUrl)){
        return false
    }

    let marcador = {
        nombre: sitio,
        url: sitioUrl
    }

    // localstorage
    if(localStorage.getItem('marcadores') === null) {
        let marcadores =[]
        marcadores.push(marcador)
        localStorage.setItem('marcadores', JSON.stringify(marcadores))
    } else {
        let marcadores = JSON.parse(localStorage.getItem('marcadores'))
        marcadores.push(marcador)
        localStorage.setItem('marcadores', JSON.stringify(marcadores))
    }

    document.getElementById('myform').reset()

    mostrarMarcadores()
    
}

function borrarMarca(url){
    // obtenemos todos los marcadores
    let marcadores = JSON.parse(localStorage.getItem('marcadores'))

    for (var i = 0; i < marcadores.length; i++) {
        if(marcadores[i].url == url){
            marcadores.splice(i, 1)
        }        
    }
    
    localStorage.setItem('marcadores', JSON.stringify(marcadores))

    mostrarMarcadores()
    console.log(url)
}

function mostrarMarcadores(){
    let marcadores = JSON.parse(localStorage.getItem('marcadores'))
    let mostrarMar = document.getElementById('marcadores')

    //console.log(marcadores)

    mostrarMar.innerHTML = ''
    marcadores.forEach((marcador) => {
        let nombre = marcador.nombre
        let url = marcador.url

        console.log(url)

        mostrarMar.innerHTML += `
        <div class="col-sm-6">
            <div class="card w-100">
                <div class="card-body">
                    <h4 class="card-title">${nombre}</h4>
                    <a href="${url}" class="btn btn-info" target="_blank"><i class="fa fa-link" aria-hidden="true"></i> Visitar</a>
                    <a href="#" onclick="borrarMarca('${url}')" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i> Eliminar</a>
                </div>
            </div>
        </div>`
    }, this);
}

function validarForm(sitio, sitioUrl){
    if(!sitio || !sitioUrl){
        alert('Por favor complete el formulario')
        return false
    }

    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    let regex = new RegExp(expression)

    if(!sitioUrl.match(regex)){
        alert('Por favor ingrese una URL valida')
        return false
    }

    return true
    
}