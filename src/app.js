const express = require("express");
const handlebars = require("express-handlebars");
const router = require("./router/views.router.js");
const { Server } = require("socket.io");

//express
const app = express();
const PORT = process.env.PORT || 8080;

app.use("/static", express.static("./src/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.get("/health", (req, res) => {
  res.send("OK");
});

const httpServer = app.listen(PORT, (req, res) => {
  console.log(`Server running at port: ${PORT}`);
});

//socket.io
const io = new Server(httpServer);

const messages = [];
io.on("connection", (socket) => {
  socket.on("new", (user) => console.log(`${user} joined`));

  socket.on("message", (data) => {
    messages.push(data);
    io.emit("logs", messages);
  });
});
