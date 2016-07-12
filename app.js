console.log("Sanity Check: JS is working");

var github_endpoint = "https://api.github.com/users/";
var username;

$(document).ready(function (){
  $('#ghsubmit').on('click', function (e) {
    e.preventDefault();
    var username = $('#ghusername').val();
    console.log('search button clicked for ' + username);
    callGithubAPI();
  });

  function callGithubAPI(){
    $.ajax({
      method: "GET",
      url: github_endpoint + $('#ghusername').val(),
      success: displayGithubInfo,
      error: handleError
    });
  }

  function displayGithubInfo(json) {
    // else we have a user and we display their info
    console.log(json);
  }

  function handleError(xhr, status, errorThrown) {
    console.log("Error " + errorThrown);
    console.log("Status: " + status);
    console.log(xhr);
    if(errorThrown == "Not Found" ) {
      $('#ghinfo').append("<h2>No User Info Found</h2>");
    }
  }

});
