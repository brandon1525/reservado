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
    url: "https://192.168.57.100:3000/places/grouped",
    method: "GET"
  });
}
function update_profile(user_data){
  return $.ajax({
    url: "https://192.168.57.100:3000/user/"+user_data.id+"",
    method: "PUT",
    data: {
      name: user_data.name, last_name_p: user_data.last_name_p, last_name_m: user_data.last_name_m, phone: user_data.phone,
      sex: user_data.sex, date_b: user_data.date_b, user: user_data.user, password: user_data.password
    }
  });
}
