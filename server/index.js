const express = require("express");
const bodyParser = require("body-parser");
const helper = require("../helpers/github");
const db = require("../database/index");
let app = express();

app.use(express.static(__dirname + "/../client/dist"));
app.use(bodyParser.json());

app.post("/repos", function (req, res) {
  var username = req.body.username;
  console.log("here");
  db.findRepos(username)
    .then((data) => {
      if (data.length === 0) {
        console.log("not in the db");
        return data;
      }
      console.log("throwing something");
      throw data;
      // return new Promise((resolve, reject) => {
      //   if (data.length === 0) {
      //     resolve(data);
      //   } else {
      //     res.send(data);
      //   }
      // });
    })
    .then((data) => {
      return helper.getReposByUsername(username);
    })
    .then((repos) => {
      if (!repos) {
        throw [];
      }
      return db.saveAll(repos);
    })
    .then((repos) => {
      res.send(repos);
    })
    .catch((data) => {
      res.send(data);
    });
});

app.get("/repos", function (req, res) {
  db.findAll()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log("err get data ", err);
      res.send([]);
    });
});

let port = 3030;

app.listen(port, function () {
  console.log(`listening on port http://localhost:${port}`);
});
