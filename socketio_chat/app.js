const http = require("http");
const express = require("express");

// expres + http를 같이 쓰는 이유는?
const app = express();
const server = http.Server(app);

const io = require("socket.io")(server);

let users = [];

server.listen(8080, () => {
  console.log("listen to 8080");
})

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

// client와의 소켓 연결 후..
io.on("connection", (socket) => {
  let name = "";

  // user에게 현재 접속된 user 목록 전체를 넘긴다(화면에 랜더링)
  socket.on("has connected", (username) => {
    name = username; // 현 socket에 연계된 username을 cache로 기억
    users.push(username);
    // 모든 소켓에 user 목록을 전송한다. (멀티 채팅)
    io.emit("has connected", { username: username, usersList: users});
  });

  // 현 사용자가 목록에서 제거된 user 목록을 보낸다. 
  socket.on("has disconnected", () => {
    users.splice(users.indexOf(name), 1); // user 목록에서 삭제 
    io.emt("has connected", { username: username, usersList: users });
  });

  socket.on("new message", (data) => {
    io.emit("new message", data);   // 모든 소켓에 메세지를 보낸다. (멀티 채팅)
  });
});



