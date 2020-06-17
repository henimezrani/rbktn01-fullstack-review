const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/github-fetcher", { useMongoClient: true }, (err, db) => {
  if (err) throw err;
  console.log("db successfully connected");
});

mongoose.connection
  .once("open", () => {
    console.log("the connection was made");
  })
  .on("error", (error) => {
    console.log("faild to connect to database");
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

let Repo = mongoose.model("Repo", repoSchema);

let save = (repo) => {
  return new Promise((resolve, reject) => {
    var data = new Repo(repo);
    data.save((err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

let saveAll = (repos) => {
  return new Promise((resolve, reject) => {
    Repo.insertMany(repos, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

let findRepos = (userName) => {
  return Repo.find({ "owner.login": userName }).sort({ forks_count: -1 }).limit(25);
};

module.exports.save = save;
module.exports.saveAll = saveAll;
module.exports.findRepos = findRepos;
