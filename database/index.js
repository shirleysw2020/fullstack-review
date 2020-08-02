const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');  // fetcher is database
// conencting mongoose orm to mongo
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("admin: database connected!"));

let repoSchema = mongoose.Schema({
  username: String,
  full_name: String,
  avatar_url: String,
  watchers: Number,
  forks_count: Number,
  repos_url: String
});
// compile schema into Model - a class in which we construct documents
// each documnent will be an instance of Repo!
let Repo = mongoose.model('Repo', repoSchema);

let save = (err, repoInfo) => {
  // if repo name already exist, dont add. console.log user alreayd exits
  var repo = new Repo(repoInfo);
  repo.save((err, repoInfo) => {
    if (err) return console.error(err, 'failed to save new repo :(');
    console.log('success saving repo!', repoInfo);
  });
}

// find a existing repo
let find = (callback) => {
  Repo.find((err, repos) => {
    if (err) {
      console.error(err, "failed to save new doc T T");
      callback(err, repos);
    } else {
      callback(null, repos);
    }
  });
}
// console.log('see all repo!!', Repo.find({name: 'fetcher'}))


module.exports.save = save;
module.exports.find = find;

