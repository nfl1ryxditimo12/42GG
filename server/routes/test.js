const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

const User = require("../models/user");
const Test = require("../models/test");

const tokenValid = require("../api/token");

router
    .get("/user_data", async (req, res) => {
        let total = 0;
        let error = 0;
        let user = "";
        const errUser = [];

        await tokenValid(false).then(async (token) => {
            const users = await User.findAll({});
            const tests = await Test.findAll({});

            const data1 = tests.map((value) => {
                return value.dataValues.data.login;
            });
            console.log(data1);
            res.send(`시작 시간:  ${new Date()}
        총 데이터:  2054
        존재 데이터: ${data1.length}`);

            for (let i = 0; i < users.length; i++) {
                user = users[i].dataValues.login;

                try {
                    console.log(`👉 ${users[i].dataValues.login} 👈`);

                    if (data1.indexOf(users[i].dataValues.login) === -1) {
                        const profile = await axios({
                            method: "get",
                            url: `${process.env.APIURL}/users/${users[i].dataValues.login}`,
                            headers: { Authorization: `Bearer ${token}` },
                        });

                        console.log(`📆 Today : ${new Date()}`);

                        await Test.create({
                            id: profile.data.id,
                            data: profile.data,
                        }).catch((err) => console.log(`What ?????`));

                        total++;
                        console.log(`🟢 User [ ${profile.data.login} ] is created !!!`);
                        console.log(`❌ Total : ${total} / 2054 ❌`);

                        console.log("\n===========================\n");
                    } else {
                        total++;
                        console.log(`📆 Today : ${new Date()}`);
                        console.log(`🟦 Already exists !!`);
                        console.log(`❌ Total : ${total} / 2054 ❌`);

                        console.log("\n===========================\n");
                    }
                } catch (e) {
                    error++;
                    total++;
                    console.log(`🟡 Error ( ${error} )`);
                    console.log(`❌ Total : ${total} / 2054 ❌`);
                    errUser.push(user);
                }
            }
        });

        const logData = `${new Date()} - total: ${total}, normal: ${
            total - error
        }, ERR_User: ${errUser.join(", ")}`;
        await fs.writeFile(
            "./server/log/42api_users.log",
            logData.replace(/\n/g, ""),
            "utf8",
            (err) => {}
        );
    })
    .get("/view", async (req, res) => {
        const data = await Test.findAll({ where: { id: 85274 } });
        res.send(data[0].dataValues);
    });

module.exports = router;
