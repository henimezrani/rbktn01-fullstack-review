const express = require('express');
const bodyParser = require('body-parser');
const save = require('../database/index.js');
let app = express();


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/repos', function (req, res) {
  var username = req.body.term;
  save.save(username, (err, finalResult) => {
    console.log(finalResult.length)
    res.status(201).send(finalResult)
  })
});

app.get('/repos', function (req, res) {
  save.save("", (err, finalResult) => {
    console.log(finalResult.length)
    res.status(201).send(finalResult)
  })
});


let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

