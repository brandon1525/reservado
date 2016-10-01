$(document).ready(function(){
  user_exist();
  set_bar_elements();
  $('#btn_collapse_menu').sideNav({
    menuWidth: 300, // Default is 240
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  });
  $('#btn_log_out').click(function(){

  });
});
$(document).off('click', '.link_content').on('click','.link_content',function(){
  $('#contenido').empty().load($(this).data('href'));
});
function user_exist() {
  if (localStorage.getItem("user_data") === null) {
    window.location="login.html";
  }
}
function set_bar_elements(){
  var user_data = JSON.parse(localStorage.getItem('user_data'));
  if(user_data.type_user==1){
    var business_data = JSON.parse(localStorage.getItem('business_data'));
  }
  $('#slide-out').find('.name').text(user_data.name);
  $('#slide-out').find('.email').text(user_data.user);
  $.when(charge_places()).done(function(json){
    if(json.success){
      console.log(json);
      $.each(json.places, function(index, value){
        var data_append = '<li class="no-padding">'+
          '<ul class="collapsible collapsible-accordion">'+
          '<li>'+
          '<a class="collapsible-header"> '+index+' <i class="material-icons">arrow_drop_down</i></a>'+
          '<div class="collapsible-body">'+
          '<ul>';
        $.each(value, function(index2, value2){
          data_append+='<li><a href="#!">'+value2.name+'</a></li>';
        });
        data_append+='</ul>'+
        '</div>'+
        '</li>'+
        '</ul>'+
        '</li>';
        $('#charge_places').append(data_append);
      });
    }else{
      Materialize.toast(json.msg, 3000, 'rounded red');
    }
    $('#charge_places .collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  });
}
function charge_places(){
  return $.ajax({
		url: "http://localhost:3000/places/grouped",
		method: "GET"
	});
}
