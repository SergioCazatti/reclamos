    jQuery(document).ready(function($) {
        const filtro = "";
        armarTabla(filtro);
    });			
    
    accionesTabla();
    
    function accionesTabla(){

        const inputBuscar = document.getElementById('strBuscar');

/* 			const btnEliminarFiltro = document.getElementById('btnEliminarFiltro');
        btnEliminarFiltro.addEventListener('click', (e) => {
            pintarTienda("");
        }) */


        inputBuscar.addEventListener("keydown", (e) => {
            if (event.key === 'Enter') {
                armarTabla(inputBuscar.value);
            }
            
        })
    } 

    
    
    const loadInfo = async (url) => {
        const response = await fetch(url);
        const pr = await response.json();
        return pr;		
    }
    
    async function armarTabla(filtro) {

        const url = 'http://localhost:59832/api/reclamos';
        const clientes = await loadInfo(url);
        if (filtro != ""){
            const clientesFiltrados = clientes.filter(cliente => cliente.nombre.includes(filtro));	
            recorrerArrayClientes(clientesFiltrados)
        }
        else{
            recorrerArrayClientes(clientes);
        }
    }

    function recorrerArrayClientes(clientesARecorrer){
        const tabla = document.getElementById("tablaCliente");
        tabla.innerHTML = "";
        const divTabla = document.createElement("table");
        divTabla.classList.add("table", "table-hover");
        divTabla.innerHTML = `
                                <thead>
                                    <tr>
                                        <th class="serial">Paso</th>
                                        <th class="avatar">Foto</th>
                                        <th>Número</th>
                                        <th>Nombre</th>
                                        <th>Fecha/Hora</th>
                                    </tr>
                                </thead>
                                <tbody id="divTBody">`;
        tabla.appendChild(divTabla);
        

        clientesARecorrer.forEach((p)=>{
            dibujaTablaClientes(p);
        });


    
   

    }
    
    function dibujaTablaClientes(p){
        console.log(p);
        const tBody = document.getElementById("divTBody");
        const newDivTBody = document.createElement("tr");
        const imgFoto = (p.foto == "") ? "images/avatar/nn.jpg" : "images/avatar/" + p.foto;
        // const imgPath = "";
        // if (p.foto == ""){
        //     imgPath = "images/avatar/nn.jpg";
        // }else{
        //     imgPath = "images/avatar/" + p.foto;
        // }
        
        newDivTBody.innerHTML = `
                                        <td class="serial">${p.codigo}</td>
                                        // <td class="avatar">
                                        //     <div class="round-img">
                                        //         <a href="#"><img class="rounded-circle" src=${imgFoto} alt=""></a>
                                        //     </div>
                                        // </td>
                                        <td><span class="name">${p.codigoCliente}</span> </td>
                                        <td><span class="product">${p.nombre}</span> </td>
                                        <td><span class="count">${p.documento}</span></td>
                                        <td><span class="count">${p.domicilio}</span></td>
                                        <td><span class="count">${p.telefono}</span></td>
                                        <td><span class="count">${p.descripcionReclamo}</span></td>
                                        <td>
                                            <button id="payment-button" type="submit" class="btn btn-sm btn-info btn-block">
                                                <i class="fa fa-pencil fa-lg"></i>&nbsp;
                                                <span id="payment-button-amount">	</span>
                                                <span id="payment-button-sending" style="display:none;"></span>
                                            </button>
                                            <!--<span class="badge badge-complete">Complete</span> -->
                                        </td>
                                `;
        tBody.appendChild(newDivTBody);
    }
    
    

