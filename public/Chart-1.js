$(document).ready(function() {

        var ctx = document.getElementById("myChart").getContext("2d");
        var i=0,j=0;
        var month=[];
        var data = {
          labels: [0,0,0,0,0],
          datasets: [/*{
            label: "My First dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [0,0,0,0,0]
          },*/{
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(120,170,200,3)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [0,0,0,0,0,0]
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
        socket.on(device_id,function(dataMsg){
          console.log(dataMsg['device_id']);
          data.datasets[0].data.push(dataMsg['value']);

          month.push(j++);
          setData(data.datasets[0].data);
          //setData(data.datasets[1].data);
          setLabels(data.labels);
          var myLineChart = new Chart(ctx).Line(data, options);
        })







  var gauge = new RadialGauge({
    renderTo: 'canvas-id',
    width: 300,
    height: 300,
    units: "",
    minValue: 0,
    startAngle: 90,
    ticksAngle: 180,
    valueBox: false,
    maxValue: 220,
    majorTicks: [
      "0",
      "20",
      "40",
      "60",
      "80",
      "100",
      "120",
      "140",
      "160",
      "180",
      "200",
      "220"
    ],
    minorTicks: 2,
    strokeTicks: true,
    highlights: [{
      "from": 160,
      "to": 220,
      "color": "rgba(200, 50, 50, .75)"
    }],
    colorPlate: "#ccc",
    borderShadowWidth: 0,
    borders: false,
    //data-units:device_name ,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: false,
    animationDuration: 0,
    animationRule: "linear"
  }).draw();



  var socket1 = io.connect('http://localhost:3000');
  console.log(device_id);
  socket1.on(device_id, function(dataMsg) {
    console.log(dataMsg['device_id']);
    console.log(dataMsg['value']);
    if (dataMsg['device_id'] == device_id) {
      gauge.value = dataMsg['value'];
    }
  });


});
