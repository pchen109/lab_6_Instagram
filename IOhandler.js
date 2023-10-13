/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const unzipper = require("unzipper"),
  // fs = require("fs/promises"),
  // { createReadStream, createWriteStream } = require("fs"),
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

// METHOD I : USING PIPE
// const unzip = (pathIn, pathOut) => {
//   return new Promise((resolve, reject) => {
//     fs.createReadStream(pathIn)
//     .on("error", reject)
//     .pipe(unzipper.Extract({ path: pathOut}))
//     .on("error", reject)
//     .on("end", resolve)
//   })
// };


// METHOD II: Using PIPELINE
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(pathIn);
    const unzip = unzipper.Extract({ path: pathOut })
    const errorHandler = (err) => {
      if (err) { console.log(err); }
    }
    pipeline(readStream, unzip, errorHandler)
    resolve(pathOut)
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



const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(pathIn);
    // Provides the platform-specific path segment separator:
    const pathElements = pathIn.split(path.sep);
    // console.log(pathElements)
    const fileName = pathElements[pathElements.length - 1];
    const filePath = path.join(pathOut, `grey_${fileName}`)
    const writeStream = fs.createWriteStream(filePath);
    const png = new PNG({ filterType: 4});

    readStream
    .pipe(png)
    .on('parsed', function () {
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
    
            // invert color
            this.data[idx] = 255 - this.data[idx];
            this.data[idx + 1] = 255 - this.data[idx + 1];
            this.data[idx + 2] = 255 - this.data[idx + 2];
    
            // and reduce opacity
            this.data[idx + 3] = this.data[idx + 3] >> 1;
          }
        }
        this.pack().pipe(writeStream);
      })
  })
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
