$(document).ready(function(){
  console.log("registro cliente");
  $('#registry_customer').click(function(){
    $.ajax({
      url: "http://localhost:3000/user",
      method: "POST",
      data: {
      nombre: "Brandon A", apellido_p: "Rodríguez", apellido_m: "Martínez", telefono: "9-16-63-69",
      sexo: "Masculino", edad: new Date(1994, 10-1, 05, 0, 0, 0, 0), usuario: "juana@gmail.com", password: "pene"}
    }).done(function(json){
      console.log(json);
    });
  });
});
