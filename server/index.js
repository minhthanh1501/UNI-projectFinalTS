const express = require("express");
require("dotenv").config();

const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const initRoutes = require("./routes");
const cookieParser = require("cookie-parser");

const app = express();
// app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: process.env.URL_CLIENT,
    methods: ["POST", "PUT", "GET", "DELETE"],
  })
);
app.use(cookieParser());

const port = process.env.PORT || 9999;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();
initRoutes(app);

app.listen(port, () => {
  console.log("Server is running on the port " + port);
});

// const express = require("express");
// require("dotenv").config();

// const cors = require("cors");
// const dbConnect = require("./config/dbconnect");
// const initRoutes = require("./routes");
// const cookieParser = require("cookie-parser");

// const app = express();
// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.URL_CLIENT,
//     methods: ["POST", "PUT", "GET", "DELETE"],
//   })
// );

// app.use(cookieParser);
// const port = process.env.PORT || 9999;
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// dbConnect();
// initRoutes(app);

// app.listen(port, () => {
//   console.log("Server is running on the port " + port);
// });
//
