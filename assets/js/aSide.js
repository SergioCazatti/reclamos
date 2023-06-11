//función que renderiza el menú de opciones
function menu(){
	const divMenu = document.getElementById("menu");
	divMenu.innerHTML=" ";
	const menu = document.createElement("div");

	menu.innerHTML = `
            <div id="main-menu" class="main-menu collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li class="active">
                        <a href="index.html"><i class="menu-icon fa fa-laptop"></i>Panel de Control </a>
                    </li>
                    <li class="menu-title">CLIENTES</li><!-- /.menu-title -->
                    <li class="menu-item-has-children dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-th"></i>Reclamos</a>
                        <ul class="sub-menu children dropdown-menu">
                            <li><i class="menu-icon fa fa-th"></i><a href="card-reclamos.html">Cards</a></li>
                            <li><i class="menu-icon fa fa-th"></i><a href="forms-advanced.html">Informe</a></li>
                        </ul>
                    </li>                    
                </ul>
            </div><!-- /.navbar-collapse -->
	`;
	divMenu.appendChild(menu);
	
}

menu();