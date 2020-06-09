const http = require('http');
const fs = require('fs');
const path = require('path');

const readFile = (p) => {
  const resolvedPath = path.join(__dirname, './data', p);

  return new Promise((res, rej) => {
    fs.readFile(resolvedPath, (err, data) => {
      if (err) {
        console.error(err);
        rej(`Error reading file at path: ${resolvedPath}`);
      } else {
        res(data.toString());
      }
    });
  });
}

const serverRun = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  readFile(req.url)
    .then(data => {
      res.write(JSON.stringify({
        beavers: data
          .split('\n')
          .filter(name => !!name),
      }));
      res.end();
    })
    .catch(err => {
      res.write(JSON.stringify({
        error: err,
      }));
      res.end();
    })
};

const server = http.createServer(serverRun);

server.listen(3000);
