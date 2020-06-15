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
  })
  
  
  $.ajax({
    type: "GET",
    url: "/api/cart",
    data: {},
    async: false,
    success: function(data) {

      var pizzas;
      var total = 0;
      var totalEuro = 0;

      for (var key in data.pizzas) {

        pizzas = data.pizzas;
        total = total + data.pizzas[key][0] * data.pizzas[key][1];
        totalEuro = totalEuro + Math.floor(data.pizzas[key][0] * data.pizzas[key][1] * change);

        $("#pizzas-wrapper-div").append(
          '<div class="cart-item-div">\
              <div class="del-button-item-div">\
                <i class="fa fa-times-circle"></i>\
              </div>\
              <div class="image-item-wrapper-div">\
                <img class="image-item-img" src="' + data.pizzas[key][2] + '">\
              </div>\
              <div class="right-wrapper-item-div">\
                <div class="description-wrapper-item-div">\
                  <div>' + key + '</div>\
                </div>\
                <div class="add-wrapper-item-div">\
                  <div class="total-price-item-div">' + data.pizzas[key][0] * data.pizzas[key][1] + '$/<br>' + Math.floor(data.pizzas[key][0] * data.pizzas[key][1] * change) + '&#8364;</div>\
                  <div class="buttons-wrapper-item-div">\
                    <div class="minus-button-item-div">-</div>\
                    <div class="count-item-div">' + data.pizzas[key][0] + '</div>\
                    <div class="plus-button-item-div">+</div>\
                  </div>\
                </div>\
              </div>\
            </div>'
          )
        }

        $("#total-div").html("Total: " + total + "$/" + "<br>" + totalEuro + "&#8364;");

        $(".plus-button-item-div").click(function (e) {
            var pizza = $($($($(e.target).parent().parent().parent().parent().children()[2]).children()[0]).children()[0]).text();
            if (pizzas[pizza][0] < 9) {
              totalEuro = totalEuro - Math.floor(pizzas[pizza][0] * pizzas[pizza][1] * change);
              pizzas[pizza][0]++;
              total = total + pizzas[pizza][1] * 1;
              totalEuro = totalEuro + Math.floor(pizzas[pizza][0] * pizzas[pizza][1] * change);
              $($(e.target).parent().children()[1]).text(pizzas[pizza][0]);
              $($(e.target).parent().parent().children()[0]).html(pizzas[pizza][0] * pizzas[pizza][1] + "$/" + "<br>" + Math.floor(pizzas[pizza][0] * pizzas[pizza][1] * change) + "&#8364;");
              $("#total-div").html("Total: " + total + "$/" + "<br>" + totalEuro + "&#8364;");
            }

            $.ajax({
              type: "POST",
              url: "/cart",
              data: {total: total, totalEuro: totalEuro, pizzas: pizzas, change: change},
              success: function(data) {
              }
            });

          });

        $(".minus-button-item-div").click(function (e) {
            var pizza = $($($($(e.target).parent().parent().parent().parent().children()[2]).children()[0]).children()[0]).text();
            if (pizzas[pizza][0] > 1) {
              totalEuro = totalEuro - Math.floor(pizzas[pizza][0] * pizzas[pizza][1] * change);
              pizzas[pizza][0]--;
              total = total - pizzas[pizza][1] * 1;
              totalEuro = totalEuro + Math.floor(pizzas[pizza][0] * pizzas[pizza][1] * change);
              $($(e.target).parent().children()[1]).text(pizzas[pizza][0]);
              $($(e.target).parent().parent().children()[0]).html(pizzas[pizza][0] * pizzas[pizza][1] + "$/" + "<br>" + Math.floor(pizzas[pizza][0] * pizzas[pizza][1] * change) + "&#8364;");
              $("#total-div").html("Total: " + total + "$/" + "<br>" + totalEuro + "&#8364;");
            }

            $.ajax({
              type: "POST",
              url: "/cart",
              data: {total: total, totalEuro: totalEuro, pizzas: pizzas, change: change},
              success: function(data) {
              }
            });

          });

        $(".del-button-item-div>.fa").click(function (e) {
            var pizza = $($($($(e.target).parent().parent().children()[2]).children()[0]).children()[0]).text();
            total = total - pizzas[pizza][0] * pizzas[pizza][1];
            totalEuro = totalEuro - Math.floor(pizzas[pizza][0] * pizzas[pizza][1] * change);
            delete pizzas[pizza];
            $($(e.target).parent().parent()).remove();
            $("#total-div").html("Total: " + total + "$/" + "<br>" + totalEuro + "&#8364;");

            $.ajax({
              type: "POST",
              url: "/cart",
              data: {total: total, totalEuro: totalEuro, pizzas: pizzas, change: change},
              success: function(data) {
              }
            });

          });

        $("#order-button-a").click(function (e) {

            $.ajax({
              type: "POST",
              url: "/cart",
              data: {total: total, totalEuro: totalEuro, pizzas: pizzas, change: change},
              success: function(data) {
              }
            });

            $(e.target).attr({"href": "/info"});

          });

        }
      });
  
});