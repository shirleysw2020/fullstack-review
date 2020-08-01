const db = require('../database')
const express = require('express');
const app = express();
const github = require('../helpers/github.js');
const githubRes = require('../helpers/github.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos', (req, res) => {
  // This route should take the github username provided (in req)
  // and get the repo information from the github API, then
  github.getReposByUsername(req.body.name, (err, repoInfo) => {
    if (err) {
      console.log(err, "server: fetching github api failed")
      res.status(500).send(err);
    }
    // console.log("server: fetching github api success!", req.body)
    // console.log("res from github??", repoInfo)
    for (var repo of repoInfo) {
      var currentRepo = {
        full_name: repo.full_name,
        avatar_url: repo.owner.avatar_url,
        watchers: repo.watchers,
        forks_count: repo.forks_count
      }
      db.save(err, currentRepo);
    }
    res.status(201).send()
  });
});

app.get('/repos', (req, res) => {
  // This route should send back top 10 repos by "watchers" criteria
  if (err) {
    console.log(err, "server: failed response to clients get req")
    res.status(500).send();
  }
  var allRepos = db.find(err, req.body)
  // sor allRepos by watchers descending.. .sort(repos.watchers)
  res.status(200).send()

});

let port = 1128;
app.listen(port, () => {
  // console.log(`listening on port ${port}`);
});

// https://api.github.com