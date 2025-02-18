const express = require('express');
const morgan = require('morgan'); // logging
const cookieParser = require('cookie-parser'); // collect cookie
const session = require('express-session'); // collect session
const app = express();

const secretKey = 'secret@1234';

// port set
app.set('port', process.env.PORT || 8080);

// setup middlewares
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookieParser(secretKey));
app.use(session({
    secret: secretKey,
    resave: false,    // 새로운 요청시 세션에 변동 사항이 없어도 다시 저장할지 여부
    saveUninitialized: true, // 세션에 저장할 내용이 없어도 저장할지 여부 
    cookie: {
        // 세션 쿠키
        httpOnly: true,
    }
    // name: 'connect.sid' // default name
}));
app.use(express.json());

// routing
app.get('/', (req, res) => {
    if (req.session.name) {
        const output = `
            <h2> 로그인한 사용자 </h2> <br>
            <p> ${req.session.name} 님 안녕하세요 </p><br>
        `
        res.send(output);
    } else {
        const output = `
            <h2> 로그하지 않은 사용자!!! </h2> <br>
            <p> 로그인해주세요 </p><br>        
        `
        res.send(output);        
    }
});

app.get("/login", (req, res) => {
    console.log(req.session);
    req.session.name = "roadbook";
    res.end('Login OK');
});

app.get("/logout", (req, res) => {
    res.clearCookie('connect.sid'); // 세션 쿠키 삭제
    res.end('Logout OK');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), " port listening");
});
