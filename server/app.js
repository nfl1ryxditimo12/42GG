const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cookie = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./modules/passport");
require("dotenv").config();

const { sequelize } = require("./models");

const app = express();

const main = require("./routes/main");
const error = require("./routes/error");
const login = require("./routes/login");
// const test = require("./routes/test");

const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true,
};

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("데이터베이스 연결 성공");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(
    session({
        httpOnly: true,
        resave: false,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    })
);

passportConfig();

app.use(cookie());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

// passport.initialize() -> 요청(req)객체에 passport 설정합니다.
app.use(passport.initialize());
// passport.session 미들웨어는 req.session 객체 passport 정보를 저장합니다.
app.use(passport.session());

app.use("/error", error);
app.use("/login", login);
app.use("/", main);
// app.use("/v0/test", test);

const port = 5000;
app.listen(port, () => console.log(`Port ${port} is running ...`));
