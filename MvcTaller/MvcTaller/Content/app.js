/***Declaración de Arreglo***/
var Clientes = new Array();

/***Declaración de Nuevo Cliente***/
var newClient = new Object();


/*******FUNCIÓN loadClient****************/
function loadClients(callback, listaClientes)  //Cargar Clientes desde documento JSON
{
    /*$.ajax({
        url: "/MvcTaller/GetClients",
        context: document.body
    }).done(function (data) {
        console.log(data);
        listaClientes = JSON.parse(data);  //Convierte una cadena de la notación de objetos JavaScript (JSON) en un objeto.	
        callback(listaClientes);
    });*/

    $.getJSON("/MvcTaller/GetClients", function (listaClientes) {
        callback(listaClientes);               
    });
}

/*******FUNCIÓN addClient****************/
function addClient(clientToLoad, miListaClientes) {
    var number = /\d{9}/;
    var email = /[0-z]\@[0-z]/;
    var email1 = /\Wcom/;
    var name = " ";
    var okNumber = number.exec(clientToLoad.tel);
    var okEmail = email.exec(clientToLoad.email);
    var okEmail1 = email1.test(clientToLoad.email);
    if (okEmail && okEmail1 && okNumber && (name != clientToLoad.name)) {
        miListaClientes.push(clientToLoad);
        mostrarClientes(miListaClientes);
        configurarEventos(miListaClientes);
    }
    else {
        throw new Error("Campos inválidos");
    }
}


/*******FUNCIÓN printClient****************/
function printClients(listaClientes) {
    for (var i = 0; i < listaClientes.length; i++) {
        console.log(listaClientes[i].id);
        console.log(listaClientes[i].name);
        console.log(listaClientes[i].email);
        console.log(listaClientes[i].tel);
        console.log(listaClientes[i].descripcion);
        console.log("--");
    }
}


/*******FUNCIÓN mostrarClientes****************/
function mostrarClientes(listaClientes) {
    var papa = $(".panellista");
    papa.html("");
    for (var i = 0; i < listaClientes.length; i++) {
        var cliente = $("<div>");
        var nombre = $("<div>");
        var email = $("<div>");
        nombre.text(listaClientes[i].name);
        email.text(listaClientes[i].email);
        cliente.addClass("itemCliente");
        jQuery.data(cliente[0], "idCliente", listaClientes[i].id);
        papa.append(cliente);
        cliente.append(nombre);
        cliente.append(email);
        if (i % 2 == 0) {
            cliente.css("backgroundColor", "#C5CAE8");
        } else {
            cliente.css("backgroundColor", "#A6B5BF");
        }
    }
}


function mostrarDetalles(idCliente, listaClientes) {
    var detalles = $(".paneldetalles");
    for (i = 0; i < listaClientes.length; i++) {
        var id = $(".id");
        var name = $(".name");
        var email = $(".email");
        var tel = $(".tel");
        var descripcion = $(".descripcion");
        if (listaClientes[i].id == idCliente) {
            id.text(listaClientes[i].id);
            name.text(listaClientes[i].name);
            email.text(listaClientes[i].email);
            tel.text(listaClientes[i].tel);
            descripcion.text(listaClientes[i].descripcion);
        }
    }
}


function configurarEventos(listaClientes) {
    $(".itemCliente").click(function () {
        var id = jQuery.data(this, "idCliente");
        mostrarDetalles(id, listaClientes);
    });
};


/*******FUNCIÓN crearCliente****************/
function crearCliente() {
    $("#Boton").click(function () {
        newClient.name = document.getElementById("texto2").value;
        newClient.email = document.getElementById("texto3").value;
        newClient.tel = document.getElementById("texto4").value;
        try {
            addClient(newClient, Clientes);
        }
        catch (e) {
            alert(e);
        }
    });
};


$(document).ready(function () {
    console.log("Cargando");
    loadClients(function (miListaClientes) {
        printClients(miListaClientes);
        Clientes = miListaClientes;
        console.log("Finalizado");
        mostrarClientes(miListaClientes);
        configurarEventos(miListaClientes);
        crearCliente();
    });
});

