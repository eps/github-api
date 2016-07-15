console.log("Sanity Check: JS is working");

$(document).ready(function (){

  $('#ghusername').on('submit', function (e) {
    e.preventDefault();

    var username = $('#ghuserdname').val();
    var requri   = 'https://api.github.com/users/'+username;
    var repouri  = 'https://api.github.com/users/'+username+'/repos';
    var fullname;
    callGithubAPI();

    console.log('search button clicked for ' + username );

    function callGithubAPI(){
      $.ajax({
        method: "GET",
        url: requri,
        success: displayGithubInfo,
        error: handleError
      });
    }

    function callGithubRepo(){
      $.ajax({
        method: "GET",
        url: repouri,
        success: displayGithubRepo,
        error: handleError
      });
    }

    function displayGithubInfo(json) {

      var fullname   = json.name;
      var username   = json.login;
      var aviurl     = json.avatar_url;
      var profileurl = json.html_url;
      var location   = json.location;
      var followersnum = json.followers;
      var followingnum = json.following;
      var reposnum     = json.public_repos;

      if (fullname !== null) {
        console.log('name is not null, current name is:', fullname);
      } else {
       fullname = json.login;
       console.log('new fullname', json.login);
      }

      var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
      outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a></div>';
      outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div>';
      outhtml = outhtml + '<div class="repolist clearfix">';

      var repositories;
        $.getJSON(repouri, function(json){
          console.log('show me json length', json.length);
          repositories = json;
          displayGithubRepo();
        });

      function displayGithubRepo() {
        if(repositories.length === 0) {
          outhtml = outhtml + '<p>No repos!</p></div>';
        }
        else {
          outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
          $.each(repositories, function(index) {
            outhtml = outhtml + '<div class="btn btn-sm btn-default"><li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li></div>';
          });
          outhtml = outhtml + '</ul></div>';
        }
        $('#ghinfo').html(outhtml);
      }
    }
  });
});

  function handleError(xhr, status, errorThrown) {
    console.log("Error " + errorThrown);
    console.log("Status: " + status);
    console.log(xhr);
    if (errorThrown === "Not Found") {
      $('#ghinfo').html("<strong>Not a valid user found</strong>");
    }
  }
