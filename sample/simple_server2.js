const http = require('http');
const fs = require('fs').promises;
const path = require('path');

http.createServer(async (req, res) => {

    if (req.url == '/') {
        try {
            const dirPath = path.join(__dirname, "/fs_test.html");  
            console.log(dirPath);
            const f = await fs.readFile(dirPath);
            res.writeHead(200, { 'content-type': 'text/html; charset=utf-8'});
            res.end(f);    
        } catch (err) {
            console.error(err);
            res.writeHead(500, { 'content-type': 'text/html; charset=utf-8'});
            res.end(err.message); 
        }
    } else {
        res.writeHead(500, { 'content-type': 'text/html; charset=utf-8'});
        res.end("Not allowed page");         
    }

}).listen(8080, () => {
    console.log("Current directory:", __dirname);
    console.log("Listening to 8080 port");
});
