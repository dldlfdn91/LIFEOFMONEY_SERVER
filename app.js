const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

const dbConnect = require("./config");

const index = require("./routes/index");
const auth = require("./routes/auth");
const event = require("./routes/event");
const recipients = require("./routes/recipients");

const app = express();
dbConnect();

app.use(logger("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_ADDRESS,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/auth", auth);
app.use("/event", event);
app.use("/recipients", recipients);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
