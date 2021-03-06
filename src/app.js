const path = require("path");
const express = require("express");
const http = require("http");
const PORT = process.env.PORT || 3000;
//shocket io library import
const shocketio = require("socket.io");

const app = express();

//Serving static files
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

//Serving index html file
app.get("/", (req, res) => {
  res.render("index");
});

//creating new server and passing app
const server = http.createServer(app);
const io = shocketio(server);

//all the logic of socket is here
//io.on is the main method of all to make connection
io.on("connection", (socket) => {
  console.log("user is connected");
  /*
  tips:-
  -->servers emit then from frontend we have to use socket.on method
  -->but when frontend emit we have to user secket.on method on server
*/

  //Server emit
  socket.emit("welcome", "welcome to the chat");

  //defense code when browser emit
  socket.on("msg", (arg) => {
    io.emit("msg", arg);
  });
});

//listing server on port 3000
server.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
