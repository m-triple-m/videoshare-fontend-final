function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get("x-forwarded-proto") !== "https") {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
}
const express = require("express");
const app = express();
app.use(requireHTTPS);
const path = require("path");

app.use(express.static(path.join(__dirname, "/dist/frontend")));

app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: path.join(__dirname, "/dist/frontend") });
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log("server started on " + port));
