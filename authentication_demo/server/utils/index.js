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

module.exports = {
  parseCookie,
  hash,
  salt,
  saltAndHash,
}
