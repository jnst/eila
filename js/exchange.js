// Model
var Exchange = Backbone.Model.extend({
  urlRoot: 'http://rate-exchange.appspot.com/currency',
  parse: function(res) {
    this.to = res.to;
    this.from = res.from;
    this.rate = res.rate;
    return res;
  },
  calcBySrc: function(price) {
    var convertedPrice = price * this.rate * 10000;
    return Math.round(convertedPrice) / 10000;
  },
  calcByDest: function(price) {
    var convertedPrice = (price * 10000) / this.rate;
    return Math.round(convertedPrice) / 10000;
  }
});

// View
var ExchangeView = Backbone.View.extend({
  el: '.input-group',
  events: {
    'keyup #exchange-usd': 'updateByUSD',
    'keyup #exchange-jpy': 'updateByJPY'
  },
  updateByUSD: function(e) {
    var price = +$('#exchange-usd').val();
    if (isNaN(price) || price === 0) return;
    var result = this.model.calcBySrc(price);
    $('#exchange-jpy').val(result);
  },
  updateByJPY: function(e) {
    var price = +$('#exchange-jpy').val();
    if (isNaN(price) || price === 0) return;
    var result = this.model.calcByDest(price);
    $('#exchange-usd').val(result);
  }
});

// Execute
$(document).ready(function() {
  var exchange = new Exchange();
  var exchangeView = new ExchangeView({
    model: exchange
  });
  exchange.fetch({
    dataType: 'jsonp',
    data: {
      from: 'USD',
      to: 'JPY',
      q: 1
    },
    jsonp: 'callback',
    success: function(json){}
  });
});
