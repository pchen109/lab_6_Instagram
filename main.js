const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description: It's a milestone.
 *
 * Created Date: Oct 10, 2023
 * Author: Peter (Yu Yen) Chen
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "extracted");
const pathProcessed = path.join(__dirname, "grayscaled");
const AdmZip = require("adm-zip");
const zip = new AdmZip("./myfile.zip");

IOhandler.unzip(zipFilePath, "./unzipped")
    // .then((result) => {
    //     console.log(result);
    // })
    .then(() => zip.extractAllTo("./extracted", true))
    .then(() => IOhandler.readDir(pathUnzipped))
    .then((files) => {
        const promises = files.map((file) => IOhandler.grayScale(file, pathProcessed))
        Promise.all(promises)
        // files.forEach((file) => { IOhandler.grayScale(file, pathProcessed)})
    })
    // All promises are resolved before moving on to further processing
    .then(() => {console.log("all images are done")})
    .catch(err => console.log(err))
