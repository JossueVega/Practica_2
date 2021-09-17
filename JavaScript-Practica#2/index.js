const firebaseConfig = {
    apiKey: "AIzaSyBYcz37BsGhDgLFTqDbSF56X5w_ynWsXEA",
    authDomain: "practica1-js.firebaseapp.com",
    databaseURL: "https://practica1-js-default-rtdb.firebaseio.com",
    projectId: "practica1-js",
    storageBucket: "practica1-js.appspot.com",
    messagingSenderId: "98263035779",
    appId: "1:98263035779:web:d29fe69022d4752fa910b6",
    measurementId: "G-94RVHH5SW6"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
    document.getElementById("Input5").value='';
    document.getElementById("Input6").value='';
    document.getElementById("Input7").value='seleccionar';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var apellido = document.getElementById("Input3").value;
    var departamento = document.getElementById("Input4").value;
    var telefono = document.getElementById("Input5").value;
    var rfc = document.getElementById("Input6").value;
    var sueldo = document.getElementById("Input7").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var empleados = {
            id, //matricula:id
            nombre,
            apellido,
            departamento,
            telefono,
            rfc,
            sueldo,

        }

        //console.log(alumno);

        firebase.database().ref('Negocios/' + id).update(empleados).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Negocios');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(empleados){
    
    if(empleados!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = empleados.id;
        cell2.innerHTML = empleados.nombre; 
        cell3.innerHTML = empleados.apellido;
        cell4.innerHTML = empleados.departamento; 
        cell5.innerHTML = empleados.telefono;
        cell6.innerHTML = empleados.rfc;
        cell7.innerHTML = empleados.sueldo;
        cell8.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${empleados.id})">Eliminar</button>`;
        cell9.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+empleados.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Negocios/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Negocios/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(empleados){
    if(empleados!=null)
    {
        document.getElementById("Input1").value=empleados.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=empleados.nombre;
        document.getElementById("Input3").value=empleados.apellido;
        document.getElementById("Input4").value=empleados.departamento;
        document.getElementById("Input5").value=empleados.telefono;
        document.getElementById("Input6").value=empleados.rfc;
        document.getElementById("Input7").value=empleados.sueldo;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input8").value;

    var ref = firebase.database().ref("Negocios");
    ref.orderByChild("departamento").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}

/**function readQ(){
    document.getElementById("Table2").innerHTML='';
    var e = document.getElementById("Input9").value;

    var ref = firebase.database().ref("Negocios");
    ref.orderByChild("sueldo").equalTo(e).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}
*/
function printRowQ(empleados){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = empleados.id;
    cell2.innerHTML = empleados.nombre; 
    cell3.innerHTML = empleados.apellido;
    cell4.innerHTML = empleados.departamento; 
    cell5.innerHTML = empleados.telefono;
    cell6.innerHTML = empleados.rfc;
    cell7.innerHTML = empleados.sueldo;
   
}