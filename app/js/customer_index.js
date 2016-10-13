$(document).ready(function(){
  user_exist();
  set_title_nav_side();
  //set_bar_elements();
  $('#contenido').empty().load('customer_profile.html');
});
function set_bar_elements(){
  var user_data = JSON.parse(localStorage.getItem('user_data'));
  $.when(get_places_grouped()).done(function(json){
    if(json.success){
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
      accordion : false
    });
  });
}
