const request = require('request');
var fs = require('fs');

// Helper function to do authenticated requests to the Github API
function githubRequest(endpoint, callback) {
  var requestData = {
    url: `https://api.github.com${endpoint}`,
    auth: {
      bearer: 'f0eb9a957c56d6f7fe52296038fe2be136fe5dfc'
    },
    headers: {
      'User-Agent': "request" // Github requires a user agent header. You can put anything here.
    }
  }

  request.get(requestData, callback) // The actual request. When the data is ready, `callback` is called.
}


// This gets the list of repo contributors and sends it to the `callback` function
function getRepoContributors(repoOwner, repoName, callback) {
  //console.log('getRepoContributors');
  // Notice that the callback for githubRequest takes three parameters. That's because
  // we're simply passing it to the `request` call itself (see function above).
  // Also note the "fat arrow" syntax.
  githubRequest(`/repos/${repoOwner}/${repoName}/contributors`, (err, response, body) => {
    var data = JSON.parse(body);

    console.log(data);

    data.forEach(function(contributor){
      callback(contributor.login, contributor.url)
    })
  });
};


// This is the function you'll write to download an image by URL
function downloadImageByURL(login, url) {
  request(url).pipe(fs.createWriteStream(`./download_images/${login}.png`));
  // fs.writeFileSync(`./download_images/${login}.png`, url, 'utf-8', function(err){
  //   if (err) {
  //     return console.error(err);
  //   }
  //   console.log(`Downloaded images for ${login}`);
  // });
};


// This is where the party actually starts!
getRepoContributors(process.argv[2], process.argv[3], downloadImageByURL);
