const parseCookie = (cookieStr) => {
  if (!cookieStr) {
    return {};
  }

  return cookieStr
    .split(';')
    .map(s => s.trim())
    .map(s => s.split('='))
    .reduce((cookieObj, [key, val]) => {
      return {
        ...cookieObj,
        [key]: val,
      }
    }, {});
}

// We are going to convert a string, into another string.
const hash = (str) => {
  let hashedStr = '';

  for (let i = 0; i < str.length; ++i) {
    hashedStr += str.charCodeAt(i) * 420;
  }

  return hashedStr;
}

const salt = (str) => {
  return str + process.env.SALT;
}

const saltAndHash = (str) => {
  return hash(salt(str));
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

    // console.log(cache);

    return curCacheLocation.value;
  }
}

module.exports = {
  parseCookie,
  hash,
  salt,
  saltAndHash,
  asyncMemoize,
}
