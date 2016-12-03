$(document).ready(function(){
  user_exist();
  var business_data = JSON.parse(localStorage.getItem('business_data'));
  console.log(business_data);
  $.when(status_payment(business_data)).done(function(json){
    console.log(json);
    if(json.success){
      if(json.state){
        set_title_nav_side();
        $('#contenido').empty().load('business_profile.html');
      }else{
        $('#aviso_de_pago').show();
      }
    }else{
      Materialize.toast("Error", 5000, 'rounded red accent-2');
    }
  });


  var socket = io.connect('httos://192.168.57.100:4433',{'name': business_data._id});
  socket.emit('Administrador_conectado', business_data._id);

  socket.on('notification_reservation', function(data){
    update_indicators();
    Materialize.toast("Nueva reservación", 5000, 'rounded green accent-4');
  });

  socket.on('recibido',function(data){
    if(data){
      console.log("socket establecido con exito");
    }
  });
});
function status_payment(business_data) {
  return $.ajax({
    url: "httos://192.168.57.100:3000/place/"+business_data._id+"/status_payment",
    method: "GET"
  });
}
function get_reservations_month(place, current_month, last_month){
  return $.ajax({
    url: "httos://192.168.57.100:3000/reservations/place/month",
    method: "POST",
    data: {
      place: place, current_month: current_month, last_month: last_month
    }
  });
}
function update_indicators(){
  var business_data = JSON.parse(localStorage.getItem('business_data'));
  var date = new Date(), y = date.getFullYear(), m = date.getMonth();
  var firstDay = new Date(y, m, 1);
  var lastDay = new Date(y, m + 1, 0);

  $.when(get_reservations_month(business_data._id, lastDay, firstDay)).done(function(json){
    if(json.success){
      var reservations_month = 0;
      var people_reservation = 0;
      $.each(json.reservations,function(index, reservations_day){
        reservations_month += reservations_day.length;
        $.each(reservations_day,function(index, reservation){
          people_reservation+=reservation.no_people;
        });
      });
      if($('#indicator_reservations').length==1){
        $('#indicator_reservations').text(reservations_month +" reservaciones este mes");
        $('#indicator_people_reservation').text(parseFloat((people_reservation/reservations_month).toFixed(1))+" personas por reservación este mes");
      }
      if(json.reservations.length!=0){
        Materialize.toast(json.msg, 3000, 'rounded green accent-4');
      }
    }else{
      Materialize.toast(json.msg, 5000, 'rounded red accent-2');
    }
  });
}
