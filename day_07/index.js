// Promises - Which are really cool.

// We call the sort of function that setTimeout calls, a callback.
// setTimeout(() => {
//   console.log('Oh, its been a second!');
// }, 1000);

// Some "call back" situations.
// I call Deanna, and Deanna doesnt answer. What do I know?
// Deanna doesnt like me is one situation.
// Deanna is not available.
// Her phones dead.
// Shes trying to call you at the same time.
// She'll call me back.

// We've defined kind of a couple of scenarios that we can summarize:

// Theres: shes busy, and she'll get back to us
// Theres: she wont get back to us for whatever her reasons.
// Theres: the unexpected: her phone is dead, broken, or her numbers changed.

// What the heck are callbacks?

/*
Callbacks are a fun name for a complicated process. Sometimes in computer programming we introduce "uncertainty" - software hates this. To handle this, the agreement between humans and our eventual machine overlords, is that we must explain what to do in either situation.

The computer doesn't know what to do. So we have to say: if its successful do this, if it fails do that.
 */

// const fs = require('fs');
// const path = require('path');
//
// // Callbacks, actually expect failure.
//
// const desiredFile = path.join(__dirname, './non-existent-file.txt');
// const newFilePath = path.join(__dirname, './new-file.txt');
//
// fs.readFile(desiredFile, (err, data) => {
//   if (err) {
//     console.error(err);
//   } else {
//     const fileData = data.toString();
//
//     fs.exists(newFilePath, (exists) => {
//       if (!exists) {
//         fs.writeFile(
//           newFilePath,
//           `The read file was full of this text: ${fileData}`,
//           (err, data) => {
//             if (err) {
//               console.error(err);
//             } else {
//               console.log('Success writing data!');
//             }
//           });
//       } else {
//         console.log('This file already exists! Cannot write here.');
//       }
//     })
//   }
// });


// We're in CALLBACK HELL.

// Back, to promises.
// Promises are a solution to callback hell. If you didn't like what you just saw, that makes sense, because we've decided not to do that anymore.

// const fs = require('fs');
// const path = require('path');
//
// const desiredFile = path.join(__dirname, './non-existent-file.txt');
// const newFilePath = path.join(__dirname, './new-file3.txt');
//
// const readFile = (filePath) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, (err, data) => {
//       if (err) reject(err);
//       else resolve(data.toString());
//     });
//   });
// }
//
// const exists = (filePath) => {
//   return new Promise((resolve, reject) => {
//     fs.exists(filePath, (fileExists) => {
//       if (fileExists) reject(false);
//       else resolve(true);
//     });
//   });
// }
//
// const writeFile = (filePath, fileData) => {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(filePath, fileData, (err) => {
//       if (err) reject(err);
//       else resolve(true);
//     });
//   });
// }
//
// let fileData;
//
// readFile(desiredFile)
//   .then(data => {
//     fileData = data;
//
//     return exists(newFilePath);
//   })
//   .then((existsAnswer) => {
//     return writeFile(newFilePath, `The read data was: ${fileData}`);
//   })
//   .then((writeAnswer) => {
//     console.log('Successfully wrote data.');
//   })
//   .catch(e => {
//     console.error('There was a problem somewhere along the way of reading, writing, and making sure something existed.', e);
//   });

// this sucks.
// let count = 0;
//
// console.time('Time these counters');
// setTimeout(() => {
//   if (Math.random() > .5) {
//     count = 1;
//   }
// }, 1000);
//
// setTimeout(() => {
//   if (count === 1) {
//     console.log('Yay!');
//   } else {
//     console.log('Oh no 😞', count);
//   }
// }, 1001)
// console.timeEnd('Time these counters');

// Lets make it better!
// let count = 0;
//
// const delay = (time) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, time);
//   });
// }
//
// delay(1000) // Returning Promise 1
//   .then((promResult) => { // Receives the result of that promise
//     console.log(promResult);
//
//     if (Math.random() > .5) {
//       count = 1;
//     } else {
//       throw new Error('this sucks!');
//     }
//   })
//   .then(() => { // Receives the result of the previous .then
//     if (count === 1) console.log('Yay! 🍻');
//     else console.log('Boo! 😭');
//   })
//   .catch(e => {
//     console.error(e);
//   });

// Uncertainty on the internet is everywhere.
// window.fetch('http://strangers-things.herokuapp.com/api/posts')
//   .then(res => {
//     return res.json();
//   })
//   .then(res => {
//     const app = document.getElementById('app');
//
//     app.innerHTML = `<code>${JSON.stringify(res.data)}</code>`;
//   })
//   .catch(e => {
//     console.error('Fetch Error: ', e);
//   });

// Promises
// Promises are a class in JS that allow us to control uncertainty. They "promise" us one of two outcomes: Things either are successful or they are a failure. There is no inbetween for a promise.

// Promises are only as good as their defintion. Developers must define what "success" is by calling "resolve" and they must define what failure is by calling "reject". You make promises true.
