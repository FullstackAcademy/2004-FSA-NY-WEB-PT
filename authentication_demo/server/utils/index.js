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

module.exports = {
  parseCookie,
}
