
// // Streams
// const readStream = fs.createReadStream("in.png");
// const writeStream = fs.createWriteStream("out.png");
// const pngStream = new PNG().on("parsed", function() {
//   const modifiedImage = handleGrayscale();
//   modifiedImage.pack()
// });

// // Connect the streams
// readStream
//   .on("error", (err) => console.log(err))
//   .pipe(pngStream)
//   .on("error", (err) => console.log(err))
//   .pipe(writeStream)
//   .on("error", (err) => console.log(err))

// pipeline(readStream, writeStream, pngStream)



// const readDir = (dir) => {
//   return new Promise((resolve, reject) => {
//     fs.readdir(dir, (err, files) => {
//       if (err) {
//         console.log(`Directory names: ${dir} created.`)
//       }
//       const pngFiles = files.filter((file) => path.extname(file) === `.png`)
//       const pngFilePaths = pngFiles.map((file) => path.join(directoryPath, file));
//       resolve(pngFilePaths)
//     })
//   })
// };

//   return new Promise((resolve, reject) => {
//     let pngFilePaths = [];
//     fs.readdir(dir, (err, files) => {
//       if (err) {
//         console.log(`Directory names: ${dir} created.`)
//         reject(err)
//       }
//       files.forEach((file) => {
//         if (path.extname(file) === '.png') {
//           const filePath = path.join(dir, file);
//           pngFilePaths.push(filePath);
//           pngFilePaths.puhs("a")
//         }
//       });
//       resolve(pngFilePaths)
//     })
// })}

// const readDir = (dir) => {
//   return new Promise((resolve, reject) => {
//     let pngFilePaths = [];
//     fs.readdir(dir, (err, files) => {
//       if (err) {
//         console.error(`Error reading directory: ${dir}`);
//         reject(err);
//       } else {
//         // files.forEach((file) => {
//         //   if (path.extname(file) === '.png') {
//         //     const filePath = path.join(dir, file);
//         //     pngFilePaths.push(filePath);
//         //   }
//         // });
//       }
//       pngFilePaths.push("a")
//     })
//     resolve(pngFilePaths)
//     // .then(() => resolve(pngFilePaths)) // Resolve the promise here, inside the fs.readdir callback
//   });
// }