const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path"),
  { pipeline } = require('stream');

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */

const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(pathIn);
    const unzip = unzipper.Extract({ path: pathOut })
    // Use resolve reject here in errorHandler.
    const errorHandler = (err) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve();
      }
    }
    pipeline(readStream, unzip, errorHandler)
  })
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */

const readDir = (dir) => {
  let pngFilePaths = [];
  return new Promise((resolve, reject) => {
    fs.readdir(dir,  (err, files) => {
      if (err) {reject(err)};
      files.forEach((file) => {
        if (path.extname(file) === '.png') {
          const filePath = path.join(dir, file);
          pngFilePaths.push(filePath)
          // pngFilePaths.push(file)
        }
      })
      resolve(pngFilePaths);
    })
  })
}


/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */


function processImage(data) {
  for (var y = 0; y < data.height; y++) {
    for (var x = 0; x < data.width; x++) {
      var idx = (data.width * y + x) << 2;

      // Invert color
      data.data[idx] = 255 - data.data[idx];
      data.data[idx + 1] = 255 - data.data[idx + 1];
      data.data[idx + 2] = 255 - data.data[idx + 2];

      // Reduce opacity
      data.data[idx + 3] = data.data[idx + 3] >> 1;
    }
  }
}

const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(pathIn);
    // Provides the platform-specific path segment separator:
    const fileName = path.basename(pathIn);
    const filePath = path.join(pathOut, `grey_${fileName}`)
    const writeStream = fs.createWriteStream(filePath);
    const png = new PNG({ filterType: 4});

    // Use resolve reject here in errorHandler.
    const errorHandler = (err) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve();
      }
    }

    png.on("parsed", function () {
      // call the processImage function inside "parse"
      processImage(this);

      // Continue with the pipeline
      this.pack().pipe(writeStream)
    })
    
    // NEED COMMA AT THEN END!!! IDK WHY
    pipeline(readStream, png, errorHandler,)
  })
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
