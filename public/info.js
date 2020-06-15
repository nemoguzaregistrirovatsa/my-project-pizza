$( document ).ready(function() {
  
  var change = 0;
  
  $.ajax({
    type: "GET",
    url: "https://api.exchangeratesapi.io/latest",
    data: {},
    async: false,
    success: function(data) {
      if (data.rates.USD > 0) change = 1 / data.rates.USD;
    }
  });
  
  $()

  $("#first-delivery-div").click(function (e) {
      $($(e.target).children()[0]).attr({"checked": true});
    
      $(e.target).css({"background-color": "hsla(0, 0%, 10%, 0.99)", "color": "white"});
      $($(e.target).parent().children()[1]).css({"background-color": "hsla(0, 0%, 10%, 0)", "color": "black"});
      $($(e.target).parent().children()[2]).css({"background-color": "hsla(0, 0%, 10%, 0)", "color": "black"});
      $($(e.target).parent().children()[3]).css({"background-color": "hsla(0, 0%, 10%, 0)", "color": "black"});
      $("#delivery-div").html("Delivery: " + 0 + "$/" + "<br>" + Math.floor(0 * change) + "&#8364;");
    });

  $("#second-delivery-div").click(function (e) {
      $($(e.target).children()[0]).attr({"checked": true});
    
      $(e.target).css({"background-color": "hsla(0, 0%, 10%, 0.99)", "color": "white"});
      $($(e.target).parent().children()[0]).css({"background-color": "hsla(0, 0%, 10%, 0)", "color": "black"});
      $($(e.target).parent().children()[2]).css({"background-color": "hsla(0, 0%, 10%, 0)", "color": "black"});
      $($(e.target).parent().children()[3]).css({"background-color": "hsla(0, 0%, 10%, 0)", "color": "black"});
      $("#delivery-div").html("Delivery: " + 20 + "$/" + "<br>" + Math.floor(20 * change) + "&#8364;");
    });

  $("#third-delivery-div").click(function (e) {
      $($(e.target).children()[0]).attr({"checked": true});
    
      $(e.target).css({"background-color": "hsla(0, 0%, 10%, 0.99)", "color": "white"});
      $($(e.target).parent().children()[1]).css({"background-color": "hsla(0, 0%, 10%, 0)", "color": "black"});
      $($(e.target).parent().children()[0]).css({"background-color": "hsla(0, 0%, 10%, 0)", "color": "black"});
      $($(e.target).parent().children()[3]).css({"background-color": "hsla(0, 0%, 10%, 0)", "color": "black"});
      $("#delivery-div").html("Delivery: " + 40 + "$/" + "<br>" + Math.floor(40 * change) + "&#8364;");
    });

  $("#forth-delivery-div").click(function (e) {
      $($(e.target).children()[0]).attr({"checked": true});
    
      $(e.target).css({"background-color": "hsla(0, 0%, 10%, 0.99)", "color": "white"});
      $($(e.target).parent().children()[1]).css({"background-color": "hsla(0, 0%, 10%, 0)", "color": "black"});
      $($(e.target).parent().children()[2]).css({"background-color": "hsla(0, 0%, 10%, 0)", "color": "black"});
      $($(e.target).parent().children()[0]).css({"background-color": "hsla(0, 0%, 10%, 0)", "color": "black"});
      $("#delivery-div").html("Delivery: " + 60 + "$/" + "<br>" + Math.floor(60 * change) + "&#8364;");
    });
  


  $("#cash-payment-div").click(function (e) {
      $($(e.target).children()[0]).attr({"checked": true});
    
      $(e.target).css({"background-color": "hsla(0, 0%, 10%, 0.99)", "color": "white"});
      $($(e.target).parent().children()[1]).css({"background-color": "hsla(0, 0%, 10%, 0)", "color": "black"});
    });

  $("#card-payment-div").click(function (e) {
      $($(e.target).children()[0]).attr({"checked": true});
    
      $(e.target).css({"background-color": "hsla(0, 0%, 10%, 0.99)", "color": "white"});
      $($(e.target).parent().children()[0]).css({"background-color": "hsla(0, 0%, 10%, 0)", "color": "black"});
    });
  
  
  
  $('#info-form').submit(function(e){
    $.ajax({
      type: "POST",
      url: "/info",
      data: $(this).serialize(),
      success: function()
      {
        $("#form-wrapper").html("<div id='poster-div'>Your order is being prepared!</div>");
        $("#order-button-input").css({"display": "none"});
        $("#back-button-a").attr({"href": "/"});
        $("#back-button-a").text("Home");
        $("#back-button-a").css({"background-color": "hsla(30, 100%, 55%, 0.9)", "color": "white"});
      }
    });
    e.preventDefault();
  });
  
});