$(document).ready(function(){
  user_exist();
  set_title_nav_side();
  $('#contenido').empty().load('business_profile.html');
  var business_data = JSON.parse(localStorage.getItem('business_data'));
  console.log(business_data);
  var socket = io.connect('http://localhost:8080',{'name': business_data._id});
  socket.emit('Administrador_conectado', business_data._id);

  socket.on('notification_reservation', function(data){
    Materialize.toast("Nueva reservación", 5000, 'rounded green accent-4');
  });

  socket.on('recibido',function(data){
    if(data){
      console.log("socket establecido con exito");
    }
  });
});
