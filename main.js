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
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");
const unzipper = require("unzipper")
const fs = require("fs");


// const ts = zlib.reateGunzip();
// Step 1: Unzip myfile.zip
// fs.createReadStream(zipFile)
// .pipe(ts)


fs.createReadStream(zipFilePath)
    // the one below does .pipe(transformStream) 
    .pipe(unzipper.Extract({ path: "./unzipped"}));

// Read each png file...
// fs.createReadStream("png1.png")
// .on("data", (chunk) => console.log(chunk))

const PNG = require("pngjs").PNG;
const transformStream = new PNG({});

fs.createReadStream("in.png")
    .pipe(transformStream)
    .on("parsed", function () {
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

    this.pack().pipe(fs.createWriteStream("out.png"));
});


// Problem: running too fast
["imag1.png", "imag2.png", "imag3.png"].forEach(img => {
    grayScale(img);
})

// Problem: too slow
grayScale("img1.png")
.then(() => grayScale("img2.png"))
.then(() => grayScale("img3.png"))
.then(() => console.log("All images done!"))

// Promise ALL (google promise all)
[grayScale("img1.png"), grayScale("img2.png"), grayScale("img3.png")]
.then(() => console.log("..."))