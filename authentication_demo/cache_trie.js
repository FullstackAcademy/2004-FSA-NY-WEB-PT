const delay = (time) => new Promise((res) => {
  setTimeout(() => res(), time);
});

const anExpensiveFunction = async (someNum, multiplier) => {
  await delay(3000);

  return someNum * multiplier;
}

const asyncMemoize = (func) => {
  const cache = {};

  return async (...args) => {
    let curCacheLocation = cache;

    for (let i = 0; i < args.length; ++i) {
      const curArg = args[i];
      const finalArg = i === args.length - 1;

      const curTrieLevel = curCacheLocation[curArg];

      if (!curTrieLevel) {
        if (finalArg) {
          curCacheLocation[curArg] = {
            value: await func(...args),
          }
        } else {
          curCacheLocation[curArg] = {
            value: null,
          }
        }
      }

      curCacheLocation = curCacheLocation[curArg];
    }

    console.log(cache);

    return curCacheLocation.value;
  }
}

const memoizedExpensiveFunc = asyncMemoize(anExpensiveFunction);

const run = async () => {
  console.time('Expensive Run');
  const resultOne = await memoizedExpensiveFunc(2, 2);
  console.log('Result Non-Memoed: ', resultOne);
  console.timeEnd('Expensive Run');

  console.time('Memoed Run');
  const resultTwo = await memoizedExpensiveFunc(2, 2);
  console.log('Result Memoed: ', resultTwo);
  console.timeEnd('Memoed Run');
}

run();

// addThreeNums(1, 2, 3);
//
// // Trie
// const cache = {
//   1: {
//     value: null,
//     2: {
//       value: null,
//       3: {
//         value: 6,
//       },
//     },
//   },
// }
