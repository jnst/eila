function TzCtrl($scope) {
  // initial display
  $scope.hello = function() {
    return "Hello, World";
  };
  $scope.now = function(offset) {
    return moment().utc().add('hours', offset).format('YYYY-MM-DD HH:mm:ss');
  }

  // dynamic calculate for JST
  $scope.inputJst = '';
  $scope.resultJst = '';
  $scope.convertToPdt = function() {
    var hour = $scope.inputJst;
    if (hour && (0 <= hour) && (hour <= 23)) {
      $scope.resultJst = moment().hours(hour).add('hours', -16).format('MM/DD H時')
    } else {
      $scope.resultJst = '';
    }
  }
  
  // daynamic calculate for PDT
  $scope.inputPdt = '';
  $scope.resultPdt = '';
  $scope.convertToJst = function() {
    var hour = $scope.inputPdt;
    if (hour && (0 <= hour) && (hour <= 23)) {
      $scope.resultPdt = moment().hours(hour).add('hours', 16).format('MM/DD H時')
    } else {
      $scope.resultPdt = '';
    }
  }
}

function realtime() {
  setInterval(function() {
    var els = $('.realtime');
    for (var i = 0;i < els.length; i++) {
      var el = $(els[i]);
      var dateString = el.html();
      if (dateString) {
        var next = moment(dateString, 'YYYY-MM-DD HH:mm:ss').add('seconds', 1).format('YYYY-MM-DD HH:mm:ss');
        el.html(next);
      }
    };
  }, 1000);
}

$(function() {
  $('[rel=popover]').popover({html: true});
  realtime();
});
