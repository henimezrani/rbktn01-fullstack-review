const request = require("request");
const config = require("../config.js");

let getReposByUsername = (username) => {
  return new Promise(function (resolve, reject) {
    let options = {
      url: `https://api.github.com/users/${username}/repos`,
      headers: {
        "User-Agent": "request",
        Authorization: `token ${config.TOKEN}`
      }
    };

    request(options, function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        var array = JSON.parse(body);
        var result = [];
        for (var i = 0; i < array.length; i++) {
          var obj = {};
          obj.username = username;

          obj.name = array[i].name;
          obj.owner = {
            login: array[i].owner.login,
            id: array[i].owner.id,
            avatar_url: array[i].owner.avatar_url,
            html_url: array[i].owner.html_url,
            repos_url: array[i].owner.repos_url
          };
          obj.html_url = array[i].html_url;
          obj.description = array[i].description;
          obj.url = array[i].url;
          obj.forks_count = array[i].forks_count;
          result.push(obj);
        }
        resolve(result);
      }
    });
  });
};

module.exports.getReposByUsername = getReposByUsername;
