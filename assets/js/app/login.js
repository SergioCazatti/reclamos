window.addEventListener('load', () => {

    sessionStorage.clear();

    let boton = document.getElementById('validar');
    let email = document.getElementById('inputEmail');
    let password = document.getElementById('inputPassword');
    let alerta = document.getElementById('alerta');


    async function data(){
        const data = {"email": email.value, "clave": password.value};
        //const url = 'https://www.gowyreclamos.somee.com/api/Usuario'; 
        const url = 'https://localhost:44329/api/Usuario';
        await fetch(url,{
            'method': 'POST',
            'mode': 'cors',
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': JSON.stringify(data),
        })
        .then(response => response.json())
        .then(datoss => {
            if (datoss.activo === true){
                const login = guardarEnStore(datoss.eMail + datoss.password, datoss.nombreUsuario, datoss.pathImagen, datoss.idUsuario);
                location.href='card-reclamos.html';
            }else{
                mostrarAlerta();
            }
         
        });
    }


    boton.addEventListener('click', (e) => {
        e.preventDefault();
        const result = data();
    })


    function guardarEnStore(dato, nombreUsuario, pathImagen, idUsuario){
        const encriptado = encriptar256(dato);
        sessionStorage.setItem('p1', encriptado);
        sessionStorage.setItem('nombre', nombreUsuario);
        sessionStorage.setItem('imagen', pathImagen);
        sessionStorage.setItem('p2', idUsuario);
        return encriptado;
    }

    function encriptar256(dato){
        var hash = sha256(dato);
        return hash;
    }

    function mostrarAlerta(){
        alerta.innerHTML= `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Los datos son incorrectos !</strong> Intente nuevamente.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
    }
});



