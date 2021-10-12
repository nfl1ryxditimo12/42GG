const express = require("express");
const cors = require("cors");

const { sequelize } = require("./models");

const app = express();

const test = require("./routes/test");

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

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/v0/test", test);

const port = 5000;
app.listen(port, () => console.log(`Port ${port} is running ...`));
