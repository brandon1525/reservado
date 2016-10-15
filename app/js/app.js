$(document).ready(function(){
  $('#btn_log_out').click(function(){
    localStorage.removeItem('user_data');
    window.location="../index.html";
  });
  $('#btn_collapse_menu').sideNav({
    menuWidth: 300, // Default is 240
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  });
});
$(document).off('click', '.link_content').on('click','.link_content',function(){
  if($(this).data('href')){
    $('#contenido').empty().load($(this).data('href'));
  }
});
function user_exist() {
  if (localStorage.getItem("user_data") === null) {
    window.location="login.html";
  }
}
function set_title_nav_side(){
  var user_data = JSON.parse(localStorage.getItem('user_data'));
  console.log(user_data);
  $('#slide-out').find('.name').text(user_data.name);
  $('#slide-out').find('.email').text(user_data.user);
}
function get_places_grouped(){
  return $.ajax({
    url: "http://localhost:3000/places/grouped",
    method: "GET"
  });
}
