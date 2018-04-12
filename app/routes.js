// app/routes.js
var mongoose = require('mongoose');

//var io=require('socket.io').server;

module.exports = function(app, passport) {

  var User = require('../app/models/userSchema');
  var Complaint = require('../app/models/complaint');



app.get('/', function(req, res) {

    res.render('index.ejs',{
      message: req.flash('loginMessage')
    }); // load the index.ejs file
  });

  app.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login.ejs', {
      message: req.flash('loginMessage')
    });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

  app.get('/admin', function(req, res) {
    res.render('profile.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });



  app.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', {
      message: req.flash('signupMessage')
    });
  });

  app.get('/profileview', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('profileview.ejs', {
      user:req.user});
  });

  app.get('/my', isLoggedIn,function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('my.ejs', {
      user: req.user
    });
  });

  app.get('/visual', isLoggedIn,function(req, res) {

    // render the page and pass in any flash data if it exists
    res.redirect('/mycomplaints');
  });

  app.get('/deleteComplaint', isLoggedIn,function(req, res) {

    // render the page and pass in any flash data if it exists
    res.redirect('/profile');
  });



  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages

  }));

  app.post('/visual', function(req, res) {
    console.log("post");
    Complaint.findOne({
      complaint_id: req.body.complaint_id
    }, function(err, data) {
      res.render('visual.ejs', {
        user: req.user,
        complaint_id: req.body.complaint_id,
        device_no: data.device_no,
        device_type: data.device_type,
        description: data.description,
        status: data.status,
        time: data.time,
        date: data.date
      });
    })

  });


  app.post('/deleteComplaint', function(req, res) {
    console.log("delete");
    Complaint.findOneAndRemove({
      complaint_id: req.body.complaint_id
    }, function(err, data) {
      if(err)
      {
        throw err;
      }
      else {
        //res.redirect('/mycomplaints');
        User.findOneAndUpdate({
            "local.email": req.user.local.email
          }, {
            $pull: {
              "local.complaints": req.body.complaint_id
            }
          }, {
            safe: true
          },
          function(err) {
            console.log(err);
            if(err)
            {
              throw err;
            }
            else {
              res.redirect('/profile');
            }
          }
        );

      }
    })

  });






  app.get('/mycomplaints', function(req, res) {
  //auth = 0;
  var user = req.user;
  var complaints = [];
  var complaintID;
  if (user) {
    User.find({
      "local.email": user.local.email
    }, function(err, de) {
      if (err)
        console.log(err);
      complaintID = de[0].local.complaints;

      var ctr = 0;
      if (complaintID.length != 0) {
        complaintID.forEach(function(complaint_id) {
          Complaint.findOne({
            "complaint_id": complaint_id
          }, function(err, de) {
            if (err)
              console.log(err);
            complaints.push({
              "complaint_id": de.complaint_id,
              "device_type": de.device_type,
              "description": de.description,
              "date": de.time
            });
            ctr++;
            if (ctr == complaintID.length) {
              complaints.sort(function(a, b) {
                var nameA = a.description.toUpperCase(); // ignore upper and lowercase
                var nameB = b.description.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
              });
              res.render('complaints.ejs', {

                user: user,
                complaints: complaints
              });
            }
          });
        });
      } else {
        res.render('complaints.ejs', {
          user: user,
          complaints: complaints
        });

      }
    });

  }

});

app.get('/logout', function(req, res) {
    auth = 0;
    console.log(auth);
    req.logout();
    res.redirect('/');
  });



app.get('/newComplaint', isLoggedIn, function(req, res) {
  res.render('complaintForm.ejs', {
    user: req.user // get the user out of session and pass to template
  });
});

app.post('/newComplaint', function(req, res, next) {
  console.log(req.body);
    var complaint = new Complaint();
    complaint.complaint_id = new mongoose.mongo.ObjectID();
    User.findOneAndUpdate({
        "local.email": req.body.email
      }, {
        $push: {
          "local.complaints": complaint.complaint_id
        }
      }, {
        safe: true
      },
      function(err) {
        console.log(err);
      }
    );
    complaint.user_id= req.user.local.user_id
    complaint.description = req.body.description;
    complaint.bill_no = req.body.bill_no;
    complaint.date = req.body.date;
    complaint.address= req.body.address;
    complaint.number = req.body.number;
    complaint.device_type = req.body.device_type;
    complaint.device_no = req.body.device_no;
    //complaint.time = Date.now;
    complaint.save(function(err) {
      if (err) {
        throw err;
        console.log("HII");
      } else {
        var query = req.body.complaint_id;
        console.log("shkfhaskfasdhf:  " + query);

        res.redirect('/profile');
      }
    });


  });


  app.post('/edit', function(req, res, next) {
    console.log(req.body);
      User.findOneAndUpdate({
          "local.email": req.body.email
        }, {
          "local.username":req.body.username
        }, {
          safe: true
        },
        function(err) {
          //console.log(err);
          if(err)
          {
            throw err;
          }
          else {
            res.redirect('/profile');
          }
        }
      );

    });


}

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    auth = 1;
    console.log(auth);
    return next();
  }

  // if they aren't redirect them to the home page
  res.redirect('/');
}
