const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");

app.use(express.json());
dotenv.config();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "Delete"],
    credentials: true,
  })
);

//router api
const userRouter = require("./routers/user.router");

//call api
app.use("/api", userRouter);

//if we are here then the specified request is not found
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//all other requests are not implemented.
app.use((err, req, res, next) => {
  res.status(err.status || 501);
  res.json({
    error: {
      code: err.status || 501,
      message: err.message,
    },
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}! `);
});
