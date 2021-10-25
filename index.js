var http = require('http');
var request = require('request')
var express = require('express');

var app = express();

app.use(express.json());

app.get('/getTimeStories',function(req, res, next){
  var latestNews =[];
  request("https://time.com", function(err,apiResp, body ){
    var latestSection = (body.split("homepage-module latest")[1]).split("</section>")[0]  
    // var titleText = /<a.*<\/a>/g;
    // var titles = latestSection.match(titleText);    
    var titles = latestSection.split("</a>");
    console.log("getTime stories", titles);
    for(var i = 0; i< titles.length - 1; i++){
      var title=titles[i].split("<a href=")[1];
      console.log("tt", title)
      var link = "https://time.com" + (title.split(">")[0]);
      var header = title.split("/>")[1];
      latestNews.push({link, title: header});
    }
    res.send(latestNews)
  })
});

app.set('port', 8000);

var server = http.createServer(app);

server.listen(8000);