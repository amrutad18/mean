function timeOut(milli){
  setTimeout(function() {
    console.log("Timer");
    console.log('inside myFunc')
    //var socket = io.connect('http://localhost:3000');
    io.on('connection', function(socket) {
      //console.log("user connected " + socket.id + ' ' + socket.request.connection.remoteAddress);
      //On socket.on it connects via mqtt, before publishing the switch value(on/off) to the
      //device, the state of the device is stored in the database so that the next time the user logs in it shows the last state
      socket.on('switch', function(data) {
        socket.emit('switch', {
          "device_id": device_id,
          "state": !state
        });
      });
    });
    flag = 1;
    res.redirect('/timerOff?device_id=' + doc.device_id);
  }, milli);

}
