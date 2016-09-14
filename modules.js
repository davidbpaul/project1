module.exports = downloadImageByURL;
const request = require('request');
var fs = require('fs');
// This is the function you'll write to download an image by URL
function downloadImageByURL(login, url) {
  (request(url).pipe(fs.createWriteStream(`./download_images/${login}.png`));
  // });
};