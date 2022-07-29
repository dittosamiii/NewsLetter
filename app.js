const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
  // res.sendFile(__dirname + "")
})

app.post("/", function(req, res) {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [ {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fname,
        LNAME: lname
      }
    }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/8cce8c2a6b";

  const options = {
    method: "POST",
    auth: "login:df3ff86b04b99e8b37c75a28ae31d255-us11"
  }

  const request = https.request(url, options, function(response) {
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  });

request.write(jsonData);
request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT ||3000, function() {
  console.log("Server is running.")
})

// api key
// df3ff86b04b99e8b37c75a28ae31d255-us10

// list // IDEA:
// 8cce8c2a6b
