const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const mongoose = require("mongoose");
const http = require("http");
const fs = require("fs");
var socket = require("./socket");
const path = require("path");

// const options = {
//   key: fs.readFileSync('./.security/key.pem'),
//   cert: fs.readFileSync('./.security/cert.pem')
// };

const port = process.env.PORT || 4001;
var cors = require("cors");

app.use(cors());

//app use
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json()); // handle json data
app.use(bodyParser.urlencoded({ extended: true })); // handle URL-encoded data
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/api/uploads/:filename", function (req, res) {
  const file = `${__dirname}/uploads/${req.params.filename}`;
  res.download(file); // Set disposition and send it.
});
app.use("/assets", express.static(path.join(__dirname, path.join("uploads"))));

app.use("/api", require("./routes/index.js"));
//React Code integration
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

//socket work
// const server = http.createServer(app);

const server = http.createServer(app).listen(port);
socket.configure(server);

//database Development
var configDB = require("./config/database");
mongoose.connect(configDB.uri, { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "Database connection failed:"));
db.once("open", function (callback) {
  console.log(
    "Database :: Interview :: connection established successfully. on PORT",
    port
  );
});

// const io = socketIo(server);
// let interval;

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   getApiAndEmit(socket)
//   // if (interval) {
//   //   clearInterval(interval);
//   // }
//   // interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     // clearInterval(interval);
//   });
// });

// const getApiAndEmit = socket => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);

// };

// mongoose.connect(configDB.EvenNodeDB, { useNewUrlParser: true }, function (err, db) {
//   if (err) {
//     console.log(err);
//     db.on('error', console.error.bind(console, 'Database connection failed:'));
//   }
//   else {
//     var db = mongoose.connection;
//     console.log("Database :: connection established successfully.");
//   }
// })

// const expressServer = app.listen(port, () => console.log(`Listening on port ${port}`));

// io.listen(expressServer)
// if (process.env.NODE_ENV === 'production') {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, 'client/build')));

//   // Handle React routing, return all requests to React app
//   app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// }
