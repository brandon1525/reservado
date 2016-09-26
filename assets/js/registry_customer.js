$(document).ready(function(){
  //console.log("registro cliente");
  $('#registry_customer').click(function(){
    $.ajax({
      url: "http://localhost:3000/user",
      method: "POST",
      data: {
        name: "Brandon A",
        last_name_p: "Rodríguez",
        last_name_m: "Martínez",
        phone: "9-16-63-69",
        sex: "Masculino",
        date_b: new Date(1994, 10-1, 05, 0, 0, 0, 0),
        type_user:  "cliente",
        user: "apocono@gmail.com",
        password: "pene"}
    }).done(function(json){
      console.log(json);
    });
  });
});
