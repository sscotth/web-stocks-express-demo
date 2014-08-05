'use strict';

var express = require('express');
var morgan = require('morgan');
var request = require('request');

var app = express();
var logger = morgan();

app.use(logger);

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/stockquote/:symbol', function(req, res){
  var symbol = req.params.symbol.toUpperCase();
  var url = 'http://dev.markitondemand.com/Api/v2/Quote/json?symbol=' + symbol;

  request(url, function(err, response, body){
    var data = JSON.parse(body);
    res.render('stock', {companyName: data.Name, stockPrice: data.LastPrice});
  });
});

app.listen(3000, function(){
  console.log('Node listening on port 3000');
});
