// View
var ExchangeView = Backbone.View.extend({
  el: '.input-group',
  events: {
    'keyup #unix': 'updateFromUnix',
    'keyup #iso': 'updateFromIso'
  },
  updateFromUnix: function(e) {
    var time = +$('#unix').val();
    if (isNaN(time)) return;
    $('#iso').val(new Date(time).toISOString());
  },
  updateFromIso: function(e) {
    var time = $('#iso').val();
    if (typeof time !== 'string') return;
    $('#unix').val(Date.parse(time));
  }
});

// Execute
$(document).ready(function() {
  new ExchangeView();
});
