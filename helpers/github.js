const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (userName, callback) => {
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  // TODO - Use the axios module to request repos for a specific
  // user from the github API:   GET /users/username
  axios.get(options.url + '/users/' + userName + '/repos', options)
  .then((res) => {
    // this response has all the user data that we want to display for top 10!
    // console.log("github: got a response back:)", res.data)
    callback(null, res.data, userName);
  })
  .catch((err) => {
    console.log(err, "github: failed to query api")
    callback(err, null, null);
  })
}

module.exports.getReposByUsername = getReposByUsername;