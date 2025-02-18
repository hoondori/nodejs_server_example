const express = require('express');
const request = require('request');
const morgan = require('morgan'); // logging

const client_id = '3vGieiANWZ7u105o6Wtc';
const client_secret = 'your_password';
const secretKey = 'secret@1234';

const app = express();

// port set
app.set('port', process.env.PORT || 8080);

// setup middlewares
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing
app.get('/naver/news', (req, res) => {
    const api_url = 'https://openapi.naver.com/v1/search/news?query='
        + encodeURI('코스피');
    const option = {};
    const options = {
        url: api_url,
        qs: option,
        headers: {
            'X-Naver-Client-Id': client_id,
            'X-Naver-Client-Secret': client_secret
        },
    };
    console.log(api_url);

    request.get(options, (error, response, body) => {
        console.log(response);
        if(!error && response.statusCode == 200) {
            let newsItem = JSON.parse(body).items;
            // item - title, link, description, pubDate

            const newsJson = {
                title: [],
                link: [],
                description: [],
                pubDate: []
            }

            for (let i = 0; i < newsItem.length; i++) {
                newsJson.title.push(newsItem[i].title.replace(/(<([^>]+)>)|&quot;|&apos;/ig, ""));
                newsJson.link.push(newsItem[i].link);
                newsJson.description.push(newsItem[i].description.replace(/(<([^>]+)>)|&quot;|&apos;/ig, ""));
                newsJson.pubDate.push(newsItem[i].pubDate);
            }

            res.json(newsJson)
        } else {
            res.status(response.statusCode).end();
            console.log('error' + response.statusCode);
        }
    });
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), " port listening");
});
