require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");

const checkForSession = require("./middlewares/checkForSession");

const authCtrl = require("./controllers/auth_controller");
const cartCtrl = require("./controllers/cart_controller");
const swagCtrl = require("./controllers/swag_controller");
const searchCtrl = require("./controllers/search_controller");

const port = process.env.SERVER_PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(
 session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
  })
);

app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

app.post("/api/login", authCtrl.login);
app.post("/api/signout", authCtrl.signout);
app.post("/api/register", authCtrl.register);
app.get("/api/user", authCtrl.getUser);

app.get("/api/swag", swagCtrl.read);

app.post("/api/cart", cartCtrl.add);
app.delete("/api/cart", cartCtrl.delete);
app.post("/api/cart/checkout", cartCtrl.checkout);

app.get("/api/search", searchCtrl.search);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
