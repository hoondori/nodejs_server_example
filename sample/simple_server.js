const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8'});
    res.write('<h1> hello </h1>');
    res.end('<p>end</p>')
}).listen(8000, () => {
    console.log("Listening to 8080 port");
})


