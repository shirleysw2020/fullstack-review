const mongoose = require('mongoose');
// connect server to db server
mongoose.connect('mongodb://localhost/fetcher');  // fetcher is database
// conencting mongoose orm to mongo
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("admin: database connected!");
})
// create a database; TODO: your schema here!
let repoSchema = mongoose.Schema({
  id: String,
  name: String,
  url: String,  //repos url
  avatar_url: String,
  forks: Number,
  open_issues: Number,
  watchers: Number
});
// compiling schema into Model - a class in which we construct documents, // each documnent will be an instance Repo!
let Repo = mongoose.model('Repo', repoSchema);

// we will call model.save to save a new repo
let save = (err, newDoc/* TODO */) => {
  // This function should save repo/repos to MongoDB
  // var currentRepo = new Repo({newRepoKey: newRepoValues});
  var currentDoc = new Repo(newDoc);
  console.log(currentDoc, 'new repo confirmed: its input search term:D')
  currentDoc.save((err, currentDoc) => {
    if (err) return console.error(err, 'failed to save new doc :(');
    console.log('success saving repo!', currentDoc);
  });
}
// find a existing repo
let find = (err, existingDoc) => {
  Repo.find((err, existingDoc) => {
    if (err) {console.error(err, "failed to save new doc T T")};
    console.log(existingDoc);
  })
}

// let insert = (err, newDoc) => {
//   // var currentDoc = new Repo(newDoc);
//   Repo.insert((err, newDoc) => {
//     if (err) {console.error(err, "failed to insert new doc T T")}
//     console.log("success inserting new doc!")
//   });
// }
// db.collections.update({}, {}, {upsert: true})
module.exports.save = save;
// repo1 is a new instance of our schema
// const repo1 = new Repo({ name: 'junlinsw' });
// console.log(repo1.name); // 'junlinsw'
module.exports.find = find;
