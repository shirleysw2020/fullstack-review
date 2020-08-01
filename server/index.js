const db = require('../database')
const express = require('express');
const github = require('../helpers/github.js');
let app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

// req from client react
app.post('/repos', (req, res) => {
  // This route should take the github username provided (in req)
  // and get the repo information from the github API, then
  github.getReposByUsername(req.body.name, (err, githubResult) => {
    // console.log("server: got a post req!", req)
    if (err) {
      console.log(err, "server: fetching github api failed")
      res.status(500).send(err);
    } else {
      // save the repo information in the database
      // console.log("server: fetching github api success!", req.body)
      // console.log("res from github??", githubResult)
      // db.save(err, req.body)
      // db.insert(err, req.body)
      res.status(201).send(req.body)
    }
  })
});

app.get('/repos', (req, res) => {
  // This route should send back the top 25 repos

});

let port = 1128;
app.listen(port, () => {
  // console.log(`listening on port ${port}`);
});

// https://api.github.com