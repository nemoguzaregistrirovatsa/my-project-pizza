$( document ).ready(function() {
  $.ajax({
    type: "GET",
    url: "/api/orders",
    data: {},
    success: function(data) {
      for (var key in data) {
        
        var status;
        if (data[key].active) status = "Active"
        else status = "Closed";
        
        var date = new Date(data[key].date);
        var minutes;
        if (date.getMinutes() < 10) minutes = "0" + date.getMinutes()
        else minutes = "" + date.getMinutes();
        var dateString =
          date.getMonth()
          + '/' + date.getDate() + '/'
          + date.getFullYear().toString().substr(2, 2)
          + ' ' + date.getHours() + ':'
          + minutes;
        
        var comment = "...";
        if (data[key].comment) comment = data[key].comment;
        
        var string = "";
        for (var pizza in data[key].pizzas) {
        string = string +
          '<div class="pizza-item-div">\
            <div class="image-item-wrapper-div">\
              <img class="image-item-img" src="' + data[key].pizzas[pizza][2] + '">\
              <div class="description-div">' + pizza + '</div>\
              <div class="price-div">' + data[key].pizzas[pizza][1] + '$</div>\
            </div>\
            <div class="right-wrapper-item-div">\
              <div class="right-left-wrapper-item-div"><div>x ' + data[key].pizzas[pizza][0] + '</div></div>\
              <div class="price-wrapper-item-div"><div>' + data[key].pizzas[pizza][0] * data[key].pizzas[pizza][1] + '$/<br>'
              + Math.floor(data[key].pizzas[pizza][0] * data[key].pizzas[pizza][1] * data[key].change) + '&#8364;</div></div>\
            </div>\
          </div>'
        };
          
        $("#orders-wrapper-div").append('\
            <div class="order-div">\
              \
              <div class="property-wrapper">\
                <div class="property-key-div">Status: </div>\
                <div class="property-div">' + status + '</div>\
              </div>\
              \
              <div class="property-wrapper">\
                <div class="property-key-div">Date: </div>\
                <div class="property-div">' + dateString + '</div>\
              </div>\
              \
              <div class="property-wrapper">\
                <div class="property-key-div">Name:</div>\
                <div class="property-div">' + data[key].name + '</div>\
              </div>\
              <div class="property-wrapper">\
                <div class="property-key-div">Surname:</div>\
                <div class="property-div">' + data[key].surname + '</div>\
              </div>\
              <div class="property-wrapper">\
                <div class="property-key-div">Phone:</div>\
                <div class="property-div">' + data[key].number + '</div>\
              </div>\
              <div class="property-wrapper">\
                <div class="property-key-div">Address:</div>\
                <div class="property-div">' + data[key].address + '</div>\
              </div>\
              <div class="property-wrapper">\
                <div class="property-key-div">Comment:</div>\
                <div class="property-div">"' + comment + '"</div>\
              </div>\
              <div class="property-wrapper">\
                <div class="property-key-div">Payment:</div>\
                <div class="property-div">' + data[key].payment + '</div>\
              </div>\
              '
              + string +
              '\
              <div class="total-order-div">\
                <div class="total-div">Total:</div>\
                <div class="total-price-div">' + data[key].total + '$/' + data[key].totalEuro + '&#8364;</div>\
              </div>\
              \
              <div class="total-order-div">\
                <div class="total-div">Delivery:</div>\
                <div class="total-price-div">' + data[key].delivery + '$/' + Math.floor(data[key].delivery * data[key].change) + '&#8364;</div>\
              </div>\
              \
            </div>')
      }

    }
  });


  
});