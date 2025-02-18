const express = require('express');
const app = express()

app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/index2.html');
})

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), " port listening");
});
