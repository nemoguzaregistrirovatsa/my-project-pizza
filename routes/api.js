"use strict"

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var passport    = require('passport');
var LocalStrategy = require('passport-local');

module.exports = function (app) {
  
  mongoose.connect(process.env.DB, { useNewUrlParser: true });

  const SchemaUser = new mongoose.Schema({
      user: String,
      password: String,
      created_on: String
    });
  const ModelUser = mongoose.model('UserModel', SchemaUser);
  
  const SchemaOrder = new mongoose.Schema({
      userID: String,
      pizzas: {},
      total: Number,
      totalEuro: Number,
      change: Number,
      date: Number,
      name: String,
      surname: String,
      number: String,
      delivery: Number,
      address: String,
      comment: String,
      payment: String,
      on_create: Boolean,
      active: Boolean
    });
  const ModelOrder = mongoose.model('OrderModel', SchemaOrder);
  
  
  
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
     done(null, user._id);
   });

  passport.deserializeUser((id, done) => {
    ModelUser.findOne(
      {_id: id},
      (err, data) => {
        done(null, data);
      }
    );
  });
  
  passport.use(new LocalStrategy(
    function(username, password, done) {
      ModelUser.findOne({user: username}, function (err, data) {
        if (err) { return done(err); };
        if (!data) { return done(null, false); };
        if (!bcrypt.compareSync(password, data.password)) { return done(null, false); };
        return done(null, data);
      });
    }
  ));
  
  
  
  app.route("/")
  
    .get((req, res) => {
      res.sendFile(process.cwd() + "/views/index.html");
    });  
  
  app.route("/login")
  
    .get((req, res) => {
      if (req.isAuthenticated()) {
        res.redirect("/");
      } else {
        res.sendFile(process.cwd() + "/views/login.html");
      };
    })
  
    .post(passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
      res.redirect("/");
    });
  
  app.route("/logout")
  
    .get((req, res) => {
      req.logout();
      res.redirect("/");
    });
  
  app.route("/signup")
  
    .get((req, res) => {
      if (req.isAuthenticated()) {
        res.redirect("/");
      } else {
        res.sendFile(process.cwd() + "/views/signup.html");
      };
    })
  
    .post((req, res) => {
      ModelUser.findOne({user: req.body.username}, (err, data) => {
        if (err) {
          console.log('Error reading database!');
        } else {
          if (data){
            console.log('Username exists!')
            res.redirect('/signup');
          } else {
            var user = new ModelUser({
              user: req.body.username,
              password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
              created_on: Date.now().toString()
            });
            user.save((err) => {
              if (err) console.log('Error saving to database!')
              else {
                console.log('Success saving to database!');
                res.redirect('/login');
              };
            });
          };
        };
      });
    });
  
  app.route("/menu")
  
    .get((req, res) => {
      res.sendFile(process.cwd() + "/views/menu.html");
    })
  
    .post((req, res) => {
      
      var userID = "";
      if (req.isAuthenticated()) userID = req.user._id
      else userID = req.sessionID;
    
      ModelOrder.findOne({userID: userID, on_create: true}, (err, data) => {

        if (err) {
          console.log('Error reading database!');
        } else {

          if (data){

            if (!data.pizzas[req.body.pizza]) {
              data.pizzas[req.body.pizza] = [0, req.body.price, req.body.image];
            };
            data.pizzas[req.body.pizza][0] = (data.pizzas[req.body.pizza][0] * 1 + req.body.count * 1);
            if (data.pizzas[req.body.pizza][0] > 9) data.pizzas[req.body.pizza][0] = 9;
            data.date = Date.now();

            data.markModified("pizzas");
            data.save(err => {
              if (err) console.log('Error saving to database!')
              else {
                console.log('Successful saving to database!');
                res.send();
              }
            });
          } else {
            var order = new ModelOrder({
              pizzas: {},
              userID: userID,
              on_create: true,
              date: Date.now()
            });
            order.pizzas[req.body.pizza] = [req.body.count, req.body.price, req.body.image];
            order.save(err => {
              if (err) console.log('Error saving to database!')
              else {
                console.log('Successful saving to database!');
                res.send();
              };
            });
          };
        };
      });
        
    });
  
  app.route("/cart")
  
    .get((req, res) => {
      
      var userID = "";
      if (req.isAuthenticated()) userID = req.user._id
      else userID = req.sessionID;
    
      ModelOrder.findOne({userID: userID, on_create: true}, (err, data) => {
        
        if (err) {
          console.log('Error reading database!');
        } else {
          if (!data) res.redirect("/")
          else res.sendFile(process.cwd() + "/views/cart.html");
        };
      });
      
    })
  
    .post((req, res) => {
      
      var userID = "";
      if (req.isAuthenticated()) userID = req.user._id
      else userID = req.sessionID;
    
      ModelOrder.findOne({userID: userID, on_create: true}, (err, data) => {

        if (err) {
          console.log('Error reading database!');
        } else {
          
          if (req.body.total > 0) {
            data.pizzas = req.body.pizzas;
            data.total = req.body.total;
            data.totalEuro = req.body.totalEuro;
            data.change = req.body.change;
            data.date = Date.now();
            data.markModified("pizzas");
            data.save(err => {
              if (err) console.log('Error saving to database!')
              else {
                console.log('Successful saving to database!');
                res.send();
              }
            });
          } else {
            data.remove(err => {
              if (err) console.log('Error saving to database!')
              else {
                console.log('Successful saving to database!');
                res.send();
              };
            });
          }
          
        };
      });
        
    });
  
  app.route("/info")
  
    .get((req, res) => {
      
      var userID = "";
      if (req.isAuthenticated()) userID = req.user._id
      else userID = req.sessionID;
    
      ModelOrder.findOne({userID: userID, on_create: true}, (err, data) => {
        
        if (err) {
          console.log('Error reading database!');
        } else {
          if (!data) res.redirect("/")
          else res.sendFile(process.cwd() + "/views/info.html");
        };
      });
    
    })
  
    .post((req, res) => {
      
      var userID = "";
      if (req.isAuthenticated()) userID = req.user._id
      else userID = req.sessionID;
      
      ModelOrder.findOne({userID: userID, on_create: true}, (err, data) => {

        if (err) {
          console.log('Error reading database!');
        } else {
          data.name = req.body.name;
          data.surname = req.body.surname;
          data.number = req.body.number;
          data.delivery = req.body.delivery;
          data.address = req.body.address;
          data.comment = req.body.comment;
          data.payment = req.body.payment;
          data.date = Date.now();
          data.on_create = false;
          data.active = true;
          data.save(err => {
            if (err) console.log('Error saving to database!')
            else {
              console.log('Successful saving to database!');
              res.send();
            }
          });
        };
      });
    });
  
  app.route("/orders")
  
    .get((req, res) => {
      
      if (req.isAuthenticated()) {
        res.sendFile(process.cwd() + "/views/orders.html");
      } else {
        res.redirect("/");
      }

    });
  
  app.route("/allorders")
  
    .get((req, res) => {
      if (req.isAuthenticated() && req.user.user == "master") {
        res.sendFile(process.cwd() + "/views/allorders.html");
      } else {
        res.redirect("/");
      }
    })
  
  .post((req, res) => {
    ModelOrder.findOne({_id: req.body._id}, (err, data) => {

        if (err) {
          console.log('Error reading database!');
        } else {
          if (!data) res.send(false)
          else {
            data.active = false;
            data.save(err => {
              if (err) console.log('Error saving to database!')
              else {
                console.log('Successful saving to database!');
                res.send(true);
              }
            })
          }
        }

    })
  });
  
  app.route("/api/login")
  
    .get((req, res) => {
      
      if (req.isAuthenticated()) res.send(req.user.user)
      else res.send();
    });
  
  app.route("/api/cart")
  
    .get((req, res) => {
      
      var userID = "";
      if (req.isAuthenticated()) userID = req.user._id
      else userID = req.sessionID;
    
      ModelOrder.findOne({userID: userID, on_create: true}, (err, data) => {
        
        if (err) {
          console.log('Error reading database!');
        } else {
          res.send(data);
        };
      });
    
    });
  
  app.route("/api/orders")
  
    .get((req, res) => {
      
      if (req.isAuthenticated()) {
    
        ModelOrder.find({userID: req.user._id, on_create: false}).sort({date: -1}).exec((err, data) => {

          if (err) {
            console.log('Error reading database!');
          } else {
            res.send(data);
          };
        });
        
      }
    
    });
  
  app.route("/api/allorders")
  
    .get((req, res) => {
      
      if (req.isAuthenticated() && req.user.user == "master") {
    
        ModelOrder.find({on_create: false}).sort({active: -1, date: -1}).exec((err, data) => {

          if (err) {
            console.log('Error reading database!');
          } else {
            res.send(data);
          };
        });
        
      }
    
    });
  
};