

$(document).ready(function() {

  function plotGraph(chname,value){
  var degrees = 180 - value,
       radius = .5;
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
       pathX = String(x),
       space = ' ',
       pathY = String(y),
       pathEnd = ' Z';
  var path = mainPath.concat(pathX,space,pathY,pathEnd);

  var layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000'
        }
      }],
    title: chname,
    //height: 500,
   // width: 500,
    autosize: true,
    xaxis: {zeroline:false, showticklabels:false,fixedrange:true,
               showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,fixedrange:true,
               showgrid: false, range: [-1, 1]}
  };

  var data = [{ type: 'scatter',
     x: [0], y:[0],
      marker: {size: 28, color:'850000'},
      showlegend: false,
      name: 'speed',
      text: value,
      hoverinfo: 'text+name'},
    { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
    rotation: 90,
    text: ['', '', '', '',
              '', '', ''],
    textinfo: 'text',
    textposition:'inside',
    marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                           'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                           'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                           'rgba(255, 255, 255, 0)']},
    labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
  }];
  Plotly.newPlot(chname, data, layout,{displayModeBar: false});

  }

  plotGraph(gType,0);
      var field = document.getElementById("field");
      var sendButton = document.getElementById("send");

      var socket = io.connect('http://localhost:3000');
      socket.on('message',function(dataMsg){
        console.log(dataMsg['type']);
        console.log(dataMsg['value']);
        //plotGraph("temperature",dataMsg['message']);
        //plotGraph("humidity",dataMsg['message']);
        //plotGraph("bleh",dataMsg['message']);
        plotGraph(dataMsg['type'],dataMsg['value']);
      });


      sendButton.onclick = function() {
        var text = field.value;
        socket.emit('send', { message: text });
      };

});
