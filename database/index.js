const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');  // fetcher is database
// conencting mongoose orm to mongo
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("admin: database connected!"));

let repoSchema = mongoose.Schema({
  full_name: String,
  avatar_url: String,
  watchers: Number,
  forks_count: Number
});
// compile schema into Model - a class in which we construct documents
// each documnent will be an instance of Repo!
let Repo = mongoose.model('Repo', repoSchema);

let save = (err, repoInfo) => {
  // if repo name already exist, dont add. console.log user alreayd exits
  var repo = new Repo(repoInfo);
  // currentDoc.update({name: newDoc.name},{name: newDoc.name},{upsert: true})
  repo.save((err, repoInfo) => {
    if (err) return console.error(err, 'failed to save new repo :(');
    console.log('success saving repo!', repoInfo);
  });
}

// find a existing repo
let find = (err, repoInfo) => {
  Repo.find((err, repoInfo) => {
    if (err) {console.error(err, "failed to save new doc T T")};
    console.log(repoInfo);
  })
}

// let insert = (err, newDoc) => {
//   var currentDoc = new Repo(newDoc);
//   currentDoc.insert((err, currentDoc) => {
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
// module.exports.insert = insert;
