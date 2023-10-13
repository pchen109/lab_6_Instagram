const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "extracted");
const pathProcessed = path.join(__dirname, "grayscaled");

function fetchDataFromAPI3() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Data from API 3");
      }, 1000);
    });
  }

IOhandler.unzip(zipFilePath, "./unzipped")
    .then((result) => {
        console.log(result);
    })
    .then(() => IOhandler.readDir(pathUnzipped))
    .then((files) => {
        const promises = files.map((file) => IOhandler.grayScale(file, pathProcessed))
        Promise.all(promises)
        files.forEach((file) => { IOhandler.grayScale(file, pathProcessed)})
    })
    // All promises are resolved before moving on to further processing
    .then(() => {console.log("all images are done")})
    .catch(err => console.log(err))
