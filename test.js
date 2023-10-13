const fs = require('fs');
const PNG = require('pngjs').PNG;

const readPNG = (filePath) => {
  return new Promise((resolve, reject) => {
    const png = new PNG();
    fs.createReadStream(filePath)
      .pipe(png)
      .on('parsed', function () {
        resolve(png);
      })
      .on('error', function (error) {
        reject(error);
      });
  });
};

// Usage example
readPNG('./unzipped/in.png')
  .then((png) => {
    // Process the PNG data here
  })
  .catch((error) => {
    console.error('Error reading PNG: ', error);
  });
