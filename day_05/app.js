// Secretly, they aren't even JS.
// Generally speaking, these functions call down to the engine (V8) and ask C++ (in this case) to do something later.

// Function is the first argument, how long till its called the second argument.
// setTimeout(() => {}, 1000);

const intervalId = setInterval(() => {
  console.log('Hi!');
}, 100);

setTimeout(() => {
  clearInterval(intervalId);
}, 2000);

// clearInterval
// clearTimeout

// Both take the id returned from an interval or a timeout that is running currently.
