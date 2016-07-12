console.log("Sanity Check: JS is working");

var github_endpoint = "https://api.github.com/users/";
var username;
var fullname;

$(document).ready(function (){
  $('#ghsubmit').on('click', function (e) {
    e.preventDefault();
    var username = $('#ghusername').val();
    console.log('search button clicked for ' + username);
  });

});
