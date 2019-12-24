const mongoose = require('mongoose');
const github = require('../helpers/github.js')
mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connection established");
});


let repoSchema = mongoose.Schema({
  id: Number, // Repo ID
  name: String, // Repo Name (toyproblems)
  owner: {
    login: String, // Username
    id: Number, // User ID
    avatar_url: String, // User Avatar link
    html_url: String, // Normal URL to the profile
    repos_url: String // API URL to repos
  },
  html_url: String, // Normal URL to the repo
  description: String, // Repo description
  url: String, // API URL to the repo
  forks_count: Number // Number of forks
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (username, callback) => {

  Repo.find({"owner.login" : username})
  .then((result) => {
    console.log(result)
    if (result.length === 0) {
      console.log("username doesn't exist")
      github.getReposByUsername(username, async (err, res) => {
        var count = 0;
        var elems = JSON.parse(res.body);
        elems.map( (elem, i) => {
          var repo = new Repo({
            id: elem.id, // Repo ID
            name: elem.name, // Repo Name (toyproblems)
            owner: {
              login: username, // Username
              id: elem.owner.id, // User ID
              avatar_url: elem.owner.avatar_url, // User Avatar link
              html_url: elem.owner.html_url, // Normal URL to the profile
              repos_url: elem.owner.repos_url // API URL to repos
            },
            html_url: elem.html_url, // Normal URL to the repo
            description: elem.description, // Repo description
            url: elem.url, // API URL to the repo
            forks_count: elem.forks_count // Number of forks
          })
          repo.save((err) => {
            if (err) {
              console.log("error")
            } else {
              console.log("successfully added")
            }
          })
          .then(() => {
            count++;
            if (count === elems.length) {
              Repo.find().sort({"forks_count": -1}).limit(25)
              .then((finalList) => {
                console.log("adding")
                callback(null, finalList)
              })
            }
          })
        })
      })
    } else {
      console.log("username exists")
      Repo.find().sort({"forks_count": -1}).limit(25)
      .then((finalList) => {
       console.log('final output')
       callback(null, finalList)
     })

    }
  })

}

module.exports.save = save;
