const mongoose = require('mongoose');
// connect server to db server
mongoose.connect('mongodb://localhost/fetcher');  // fetcher is database
// conencting mongoose orm to mongo
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("admin: database connected!");
})
// create a database;
let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: String,
  name: String,
  url: String,  //repos url
  avatar_url: String,
  forks: Number,
  open_issues: Number,
  watchers: Number
});
// compiling our schema into a Model - a class in which we construct documents, each documnent will be a Repo!
let Repo = mongoose.model('Repo', repoSchema);

// repo1 is a new instance of our schema
// const repo1 = new Repo({ name: 'junlinsw' });
// console.log(repo1.name); // 'junlinsw'

// second argument shoud be a new instance of Repo?
// we will call model.save to save a new repo
let save = (err, newRepo/* TODO */) => {
  // TODO: Your code here
  // This function should save repo/repos to MongoDB
  Repo.save((err, newRepo) => {
    if (err) return console.error(err);
    console.log('success saving repo!');
  });
}
// find a existing repo
let find = (err, existingRepo) => {
  Repo.find((err, existingRepo) => {
    if (err) return console.error(err, "failed to save repo T T");
    console.log(existingRepo);
  })
}

module.exports.save = save;
module.exports.find = find;