require('dotenv').config();
var express = require('express');

var port = process.env.PORT || 3000;

var app = express();


require('./backend/config/express.js')(app);

app.listen({port: port, bind: '0.0.0.0'}, () => {
  console.log("Backend is on port "+ port);
});



app.use(express.static('./frontend'));
app.get('*', (req, res, next) => {
  res.sendFile('index.html', {root: './frontend'});
});
