var express = require("express")
var app = express()
var handlebars = require("express3-handlebars")
  .create({
    defaultLayout:"main"})
app.engine("handlebars", handlebars.engine)
app.set("view engine", "handlebars")
/*     helpers: {
      section: function(name, options){
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      }
    }
});*/

// app.use(bodyParser.urlencoded({ extends: true }))
app.set("port", process.env.PORT || 3000)

//app.use(express.static(path.join(__dirname + '/public'));
app.use(express.static(__dirname + "/public"))
app.use(require('body-parser')())

// partials
app.use(function(req, res, next){
  if(!res.locals.partials) res.locals.partials = {}
  // res.locals.partials.menu;
  next()
})

// Mocha testing with Chai
app.use(function(req, res, next){
  res.locals.showTests = app.get("env") !== "production" &&
  req.query.test === "1"
  next()
})

// routes
var fortunes = require("./lib/fortunes")
app.get("/", function(req, res){
  res.render("home", {
    fortune: fortunes.getFortune(),
    pageTestScript: "/qa/tests-home.js"
  })
})

app.post("/quote", function(req, res){
  console.log('Form (from querystring): ' +
    req.query.form)
  console.log('CSRF token (from hidden form field): ' +
    req.body._csrf)
  console.log('Name (from visible form field): ' +
    req.body.name)
  console.log('Quote (from visible form field): ' +
    req.body.quote)
  console.log('From (from visible form field): ' +
    req.body.from)
  res.redirect(303, '/thank-you');
})

app.get("/forum", function(req, res){
  res.render("forum", {
    pageTestScript: "/qa/tests-quotes.js"
  })
})

app.get("/quotes", function(req, res){
  res.render("quotes", {
    pageTestScript: "/qa/tests-quotes.js"
  })
})

app.get("/about", function(req, res){
  res.render("about", {
    pageTestScript: "/qa/tests-about.js"
  })
})

app.get("/other", function(req, res){
  res.render("other", {
    pageTestScript: "/qa/tests-about.js"
  })
})

app.get("/contact", function(req, res){
  res.render("contact", {
    pageTestScript: "/qa/tests-about.js"
  })
})

app.use(function(req, res, next){
  res.type("text/plain")
  res.status(404)
  res.send("404 - Not Found")
})
  
app.use(function(err, req, res, next){
  console.error(err.stack)
  res.type("text/plain")
  res.status(500)
  res.send("500 - Server Error")
})

app.listen(app.get("port"), function(){
  console.log( "Express started on http://localhost:" +
      app.get("port") + " Ctrl-C to terminate" )
})

// modif