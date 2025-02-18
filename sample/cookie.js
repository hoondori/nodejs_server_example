const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Set-cookie': 'name=roadbook'});
    console.log(req.headers.cookie);
    res.end('Cookie --> Header');
}).listen(8080, () => {
    console.log("Listening to 8080 port");
})
