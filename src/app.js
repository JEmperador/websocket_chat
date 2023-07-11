const express = require("express");
const handlebars = require("express-handlebars")
const router = require("./router/views.router.js")
const {Server} = require("socket.io")

//express
const app = express();
const port = 8080;

app.use("/static", express.static("./src/public"));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/", router)

//handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", "./src/views")
app.set("view engine", "handlebars")

app.get("/health", (req, res) => {
    res.send("OK")
})

//socket.io
const httpServer = app.listen(port, (req, res) => {
  console.log(`Server running at port: ${port}`);
});
