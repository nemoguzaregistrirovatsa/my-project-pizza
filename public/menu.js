$( document ).ready(function() {
  
  // window.onerror = function(e) {
  //   alert(e.message, e.filename, e.lineno)
  // };

  var cart = false;

  $(".pizza-wrapper-div").hover(function (e) {
    $($($(e.target).parent().children()[5])).children().stop(true, true).animate({"opacity": "1", "overflow": "visible", "z-index": 3}, 250);
    $($(e.target).parent().children()[0]).stop(true, true).animate({"opacity": "1", "overflow": "visible"}, 250);
  }, function (e) {
    $(".add-wrapper-div").children().stop(true, true).animate({"opacity": "0", "z-index": 0}, 50);
    $(".window").stop(true, true).animate({"opacity": "0"}, 50);
  });

  $(".plus-button-div").click(function (e) {
    var count = $($(e.target).parent().children()[1]).text();
    if (count < 9) {
      count++;
      $($(e.target).parent().children()[1]).text(count);
    }
  });

  $(".minus-button-div").click(function (e) {
    var count = $($(e.target).parent().children()[1]).text();
    if (count > 1) {
      count--;
      $($(e.target).parent().children()[1]).text(count);
    };
  });

  $(".add-button-div").click(function (e) {
    cart = true;
    
    var pizza = $($(e.target).parent().parent().children()[3]).text();
    var count = $($(e.target).parent().children()[1]).text();
    var price = $($(e.target).parent().parent().children()[1]).text().substr(0, 2);
    var image = $($($(e.target).parent().parent().children()[2]).children()[0]).attr("src");
    
    $.ajax({
      type: "POST",
      url: "/menu",
      data: {pizza: pizza, count: count, price: price, image: image},
      success: function(data) {
        $("#cart-i").animate({"opacity": "1", "right": "20px"}, 50)
          .animate({"right": "15px", "bottom": "20px"}, 50)
          .animate({"right": "10px", "bottom": "15px"}, 50)
          .animate({"right": "15px", "bottom": "10px"}, 50)
          .animate({"right": "20px", "bottom": "15px"}, 50)
          .animate({"right": "15px", "bottom": "15px"}, 50);
        $("#cart-a").attr({"href": "/cart"});
      }
    });
    
  });

  $("#cart-i").hover(function (e) {
    if (cart) {
      $(e.target).css({"cursor": "pointer"});
    };
  });
  
  $.ajax({
    type: "GET",
    url: "/api/cart",
    data: {},
    success: function(data) {
      if (Object.keys(data.pizzas).length) {
        cart = true;
        $("#cart-i").animate({"opacity": "1", "right": "20px"}, 50)
          .animate({"right": "15px", "bottom": "20px"}, 50)
          .animate({"right": "10px", "bottom": "15px"}, 50)
          .animate({"right": "15px", "bottom": "10px"}, 50)
          .animate({"right": "20px", "bottom": "15px"}, 50)
          .animate({"right": "15px", "bottom": "15px"}, 50);
        $("#cart-a").attr({"href": "/cart"});
      }
    }
  });
  
});