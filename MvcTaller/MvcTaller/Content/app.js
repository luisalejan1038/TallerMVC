/***Declaración de Arreglo***/
var Clientes = new Array();



/*********EJECUCIÓN DEL PROGRAMA***********/
$(document).ready(function () {
    console.log("Cargando");
    loadClients(function (miListaClientes) {
        printClients(miListaClientes);
        Clientes = miListaClientes;
        console.log("Finalizado");
        mostrarClientes(miListaClientes);
        configurarBotonRemCliente(miListaClientes);
        configurarEventos(miListaClientes);
        configurarBotonCliente();
        configurarBotonActCliente();
    });
});




/*******FUNCIÓN loadClient****************/
function loadClients(callback, listaClientes)  //Cargar Clientes desde documento JSON
{
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



/*******FUNCIÓN mostrarDetalles****************/
function mostrarDetalles(idCliente, listaClientes) {
    var detalles = $(".paneldetalles");
    for (i = 0; i < listaClientes.length; i++) {
        var id = $("#texto6");
        var name = $("#texto7");
        var email = $("#texto8");
        var tel = $("#texto9");
        var descripcion = $("#texto10");
        if (listaClientes[i].id == idCliente) {
            id.val(listaClientes[i].id);
            name.val(listaClientes[i].name);
            email.val(listaClientes[i].email);
            tel.val(listaClientes[i].tel);
            descripcion.val(listaClientes[i].descripcion);
        }
    }
}

/************* Función configurarBotonActCliente**************/
function configurarBotonActCliente() {
    var URL = "/MvcTaller/UpdateClient"; //Controlador-Acción
    $("#btnActualizarCliente").click(function () {
        var updateClient = new Object();
        updateClient.id = document.getElementById("texto6").value;
        updateClient.name = document.getElementById("texto7").value;
        updateClient.email = document.getElementById("texto8").value;
        updateClient.tel = document.getElementById("texto9").value;
        updateClient.descripcion = document.getElementById("texto10").value;
        try {
            updateCliente(updateClient, Clientes);
            $.post(URL, updateClient, function (data) {
                console.log("Datos Cargando");
            }).fail(function () {
                alert("error");
            });
        }
        catch (e) {
            alert(e);
        }
    });
};


/*******FUNCIÓN updateCliente****************/
function updateCliente(clientToUpdate, miListaClientes) {
    var number = /\d{9}/;
    var email = /[0-z]\@[0-z]/;
    var email1 = /\Wcom/;
    var name = " ";
    var okNumber = number.exec(clientToUpdate.tel);
    var okEmail = email.exec(clientToUpdate.email);
    var okEmail1 = email1.test(clientToUpdate.email);
    if (okEmail && okEmail1 && okNumber && (name != clientToUpdate.name)) {
        for(i = 0; i < miListaClientes.length; i++){
            if (miListaClientes[i].id == clientToUpdate.id) {
                miListaClientes[i].name = clientToUpdate.name;
                miListaClientes[i].tel = clientToUpdate.tel;
                miListaClientes[i].email = clientToUpdate.email;
                miListaClientes[i].descripcion = clientToUpdate.descripcion;
                mostrarClientes(miListaClientes);
                configurarEventos(miListaClientes)
            }
        }                
    }
    else {
        throw new Error("Campos inválidos");
    }
}


function configurarEventos(listaClientes) {
    $(".itemCliente").click(function () {
        var id = jQuery.data(this, "idCliente");
        mostrarDetalles(id, listaClientes);
    });
};


/*******FUNCIÓN configurarBotonCliente****************/
function configurarBotonCliente() {
    var URL = "/MvcTaller/AddClient"; //Controlador-Acción
    $("#btnCrearCliente").click(function () {
        var newClient = new Object();
        newClient.id = document.getElementById("texto1").value;
        newClient.name = document.getElementById("texto2").value;
        newClient.email = document.getElementById("texto3").value;
        newClient.tel = document.getElementById("texto4").value;
        newClient.descripcion = document.getElementById("texto5").value;
        try {
            addClient(newClient, Clientes);
            $.post(URL, newClient, function (data) {
                console.log("Datos Cargando");
            }).fail(function () {
                alert("error");
            });

        }
        catch (e) {
            alert(e);
        }
    });
};


/*******FUNCIÓN configurarBotonRemCliente***********/
function configurarBotonRemCliente(listaClientes) {
    $("#icon-remove").click(function () {
        var removeClient = new Object();
        removeClient.id = document.getElementById("texto6").value;
        $(this).closest(".itemcliente").remove();
        $(this).closest(".itemcliente").slideUp();
        removeClient(listaClientes, removeClient);
    });
};


/*****************FUNCIÓN removeClient*****************/
function removeClient(listaClientes, removeCliente) {
    for (i = 0; i < listaClientes.lengt; i++) {
        if (listaClientes[i].id == removeClient.id) {
            listaClientes[i].splice(removeClient.id)
        }
    }
    try {
        removeClient(listaClientes);
        $.post(URL, listaClientes, function (data) {
            console.log("Datos Cargando");
        }).fail(function () {
            alert("error");
        });

    }
    catch (e) {
        alert(e);
    }
}



