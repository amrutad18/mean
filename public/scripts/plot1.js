$(document).ready(function() {
      var field = document.getElementById("field");
      var sendButton = document.getElementById("send");
      var ctx = document.getElementById("myChart").getContext("2d");
      var i=0,j=0;
      var month=[];
      var data = {
        labels: [0,0,0,0,0],
        datasets: [{
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [0,0,0,0,0]
        }, {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [0,0,0,0,0]
        }]
      };
      var options = {
        hover: {
          mode: 'nearest',
          intersect: true
        },
        animation: false,
        //Boolean - If we want to override with a hard coded scale
        scaleOverride: true,
        //** Required if scaleOverride is true **
        //Number - The number of steps in a hard coded scale
        scaleSteps: 10,
        //Number - The value jump in the hard coded scale
        scaleStepWidth: 10,
        //Number - The scale starting value
        scaleStartValue: 0
      };

      //var myLineChart = new Chart(ctx).Line(data, options);

      /*setInterval(function() {
        setData(data.datasets[0].data);
        setData(data.datasets[1].data);
        setLabels(data.labels);

        var myLineChart = new Chart(ctx).Line(data, options);
 }, 1000);*/

      function setLabels(labels) {

       // var nextMonthIndex = months.indexOf(labels[labels.length - 1]) + 1;
        //var nextMonthName = months[nextMonthIndex] != undefined ? months[nextMonthIndex] : "January";
        labels.push(month[i]);
        i++;
        labels.shift();
      }

      function setData(data) {
        //data.push(Math.floor(Math.random() * 100) + 1);

        if(data.length!=0)
        data.shift();
      }

      function convertMonthNameToNumber(monthName) {
        var myDate = new Date(monthName + " 1, 2016");
        var monthDigit = myDate.getMonth();
        return isNaN(monthDigit) ? 0 : (monthDigit + 1);
      }


      var socket = io.connect('http://localhost:3000');
      socket.on('message',function(dataMsg){
        console.log(dataMsg['message']);
        data.datasets[1].data.push(dataMsg['message']*10);

        month.push(j++);
        setData(data.datasets[0].data);
        setData(data.datasets[1].data);
        setLabels(data.labels);
        var myLineChart = new Chart(ctx).Line(data, options);
      })
      sendButton.onclick = function() {
        var text = field.value;
        socket.emit('send', { message: text });
      };




});
