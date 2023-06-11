jQuery(document).ready(function($) {
    if (validar()==false){
        location.href='error500.html';
    };
    const filtro = "";
    armarTarjetas(filtro);
});			

let idUsuario = sessionStorage.getItem('p2'); // id de usuario
const urlBase = "http://localhost:2000/";
accionesTarjetas();

function validar(){
    // const parametroLeido = window.location.search;
    // const urlParams = new URLSearchParams(parametroLeido);
    // var p = urlParams.get('p');
    const parametroLocal = sessionStorage.getItem('p1');
    if (parametroLocal){
        return true;
    }else{
        return false;
    }

}


function accionesTarjetas(){
    const inputBuscar = document.getElementById('strBuscar');
    inputBuscar.addEventListener("keydown", (e) => {
        // e.preventDefault();
        if (event.key === 'Enter') {
            armarTarjetas(inputBuscar.value);
        }
    })
} 

const modalEnviarNovedad = (codigo) => {
    const modalNovedad = document.getElementById('modalNovedades');
    modalNovedad.innerHTML = "";
    const pantallaModal = document.createElement('div');
    pantallaModal.innerHTML = `
    <div class="modal fade" id="pantallaModal" tabindex="-1" role="dialog" aria-labelledby="novedadesmodalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="novedadesmodalLabel">NOVEDADES</h5>
                    <span>Reclamo: # </span><span id="codigoReclamo">${codigo}</span>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                          <textarea id="textoNovedad" class="form-control" rows="10"></textarea>
                        </div>
                      </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Volver</button>
                    <button type="button" id="enviarNovedad" class="btn btn-primary" data-dismiss="modal">Enviar</button>
                </div>
            </div>
        </div>
    </div>`;

    modalNovedad.appendChild(pantallaModal);
    $("#pantallaModal").modal("show");
    const botonEnviarNovedad = document.getElementById('enviarNovedad');
    botonEnviarNovedad.addEventListener("click", () => {
        const textoNovedad = document.getElementById('textoNovedad');
        actualizarNovedad(codigo, textoNovedad.value);
        console.log('antes de armar tarjetas')
        armarTarjetas("");
    });
}

const actualizarNovedad = async (codigoReclamo, textoNovedad) => {
    const api = "api/Reclamos";
    const url = urlBase + api;
    const data = {"codigoReclamo": codigoReclamo, "mensaje": textoNovedad, "idUsuario": idUsuario};
    const metodo = "POST";
    const respuesta = await loadInfo(url, metodo, data);
    console.log(respuesta);
}

const loadInfo = async (url, metodo, data) => {
    const response = await fetch(url,{
        method: metodo,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const pr = await response.json();
    return pr;		
}

async function armarTarjetas(filtro) {
    const api = "api/Reclamos";
    const url = urlBase + api
    const metodo = "GET";
    const clientes = await loadInfo(url, metodo);
    if (filtro != ""){
        const clientesFiltrados = clientes.filter(cliente => cliente.nombre.includes(filtro));	
        recorrerArrayClientes(clientesFiltrados)
    }
    else{
        recorrerArrayClientes(clientes);
    }
}

function recorrerArrayClientes(clientesARecorrer){
    const tarjeta = document.getElementById("tarjetas");
    tarjeta.innerHTML = "";

    clientesARecorrer.forEach((p)=>{
        console.log(p);
        const newDivTarjeta = document.createElement("div");
        newDivTarjeta.classList.add("col-md-4", "mb-");

        newDivTarjeta.innerHTML = `
                    <div class="card">
                        <div class="card-header">
                            <h6>#: <span id="codigoReclamo">${p.codigo}</span></h6>
                            <strong class="card-title">${p.nombre}<small><span class="badge badge-danger float-right mt-1">${p.fechaReclamo}</span></small></strong>
                            <label class="fs-6">${p.domicilio}</label>
                        </div>
                        <div class="card-body">
                            <p class="card-text">${p.descripcionReclamo}</p>
                        </div>
                        <div class="card-footer">
                            <div class="row d-flex justify-content-between">
                                <div class="fa-hover">
                                    <button id="boton${p.codigo}" class="btn btn-primary mb-1" data-toggle="modal" >
                                        <i class="fa fa-comments-o m-2"></i>
                                        Novedades...
                                    </button>                                    
                                </div>
                                <div class="fa-hover">
                                    <a href="#"><i class="fa fa-bolt m-2"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>`;
        tarjeta.appendChild(newDivTarjeta);

        const boton = document.getElementById(`boton${p.codigo}`);
        boton.addEventListener("click", () => {
          modalEnviarNovedad(p.codigo);
        });
    });

    const cantidadNotificaciones = document.getElementById("cantidadNoti");
    cantidadNotificaciones.textContent = clientesARecorrer.length;

    const pathImagen = "./images/avatar/" + sessionStorage.getItem("imagen");
    const avatar = document.getElementById("imgAvatar");
    avatar.innerHTML="";
    const newImagenAvatar = document.createElement("div");
    newImagenAvatar.innerHTML= ` 
    <a href="#" class="dropdown-toggle active" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img class="user-avatar rounded-circle" src="${pathImagen}" alt="User Avatar"></img>                    
    </a>         
    <div class="user-menu dropdown-menu">
        <a class="nav-link" href="index.html"><i class="fa fa-power-off"></i>Logout</a>
    </div>          
    `;  
    avatar.appendChild(newImagenAvatar);
}



