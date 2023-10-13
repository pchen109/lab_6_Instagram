function fetchDataFromAPI1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data from API 1");
    }, 2000);
  });
}

function fetchDataFromAPI2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data from API 2");
    }, 1500);
  });
}

function fetchDataFromAPI3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data from API 3");
    }, 1000);
  });
}

// Assuming you want to fetch data from three different APIs and then do something with the results.

// fetchDataFromAPI1()
//   .then((result1) => {
//     console.log(result1);
//     return fetchDataFromAPI2();
//   })
//   .then((result2) => {
//     console.log(result2);
//     return fetchDataFromAPI3();
//   })
//   .then((result3) => {
//     console.log(result3);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

  const promises = [
    fetchDataFromAPI1(),
    fetchDataFromAPI2(),
    fetchDataFromAPI3(),
  ];
  
promises.forEach((promise, index) => {
  promise.then((result) => {
    console.log(`Promise ${index + 1} resolved: ${result}`);
  });
});


Promise.all(promises)
.then((results) => {
  // All promises have resolved, and the results are available in the same order as in the array.
  const [result1, result2, result3] = results;
  
  console.log(result1);
  console.log(result2);
  console.log(result3);
})
.catch((error) => {
  console.error(error);
});

console.log("check")