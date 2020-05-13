class Axios {
  get(url) {
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        return {
          data,
        };
      });
  }
}

window.axios = new Axios();

