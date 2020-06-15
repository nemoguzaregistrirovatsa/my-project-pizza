$(document).ready(function() {

  $.ajax({
    type: "GET",
    url: "/api/login",
    data: {},
    success: function(data) {
      if (data) {
        var timer;
        
        $("#main-nav").html("<i class='fa fa-user'></i>");
        $("#main-nav>.fa").css({"font-size": "48px", "color": "hsla(30, 100%, 100%, 0.99)", "margin": "20px 20px"});
        $("#main-nav>.fa").hover(function(e) {
          $(e.target).css({"cursor": "pointer"});
        });
        
        $("#main-nav").append(
          "<div id='user-wrapper-div'>\
            <a id='user-orders-button-a' href='/orders'>Orders</a>\
            <a id='log-out-button-a' href='/logout'>Log out</a>\
          </div>"
        );
        
        if (data == "master") {
          $("<a id='orders-button-a' href='/allorders'>Pizzas</a>").insertBefore("#main-nav>.fa");
        }
        
        $("#main-nav>.fa").click(function(e) {
          $("#user-orders-button-a").animate({"opacity": "1", "z-index": "1"}, 250);
          $("#log-out-button-a").animate({"opacity": "1", "z-index": "1"}, 250);
          timer = setTimeout(function() {
            $("#user-orders-button-a").animate({"opacity": "0", "z-index": "-1"}, 250);
            $("#log-out-button-a").animate({"opacity": "0", "z-index": "-1"}, 250);
          }, 2000);
        });
        
        $("#user-orders-button-a").hover(function() {
          clearTimeout(timer);
        }, function() {
          timer = setTimeout(function() {
            $("#user-orders-button-a").animate({"opacity": "0", "z-index": "-1"}, 250);
            $("#log-out-button-a").animate({"opacity": "0", "z-index": "-1"}, 250);
          }, 200);
        });
        
        $("#log-out-button-a").hover(function() {
          clearTimeout(timer);
        }, function() {
          timer = setTimeout(function() {
            $("#user-orders-button-a").animate({"opacity": "0", "z-index": "-1"}, 250);
            $("#log-out-button-a").animate({"opacity": "0", "z-index": "-1"}, 250);
          }, 200);
        });
        
      } else {
        $("#log-in-button-a").css({"opacity": "1", "z-index": "1"});
      }
    }
  });

});