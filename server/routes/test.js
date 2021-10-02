const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

const User = require("../models/user");
const Test = require("../models/test");

const getToken = require("../api/token");
const getUserList = require("../api/userList");

router
    .get("/user_data", async (req, res) => {
        let total = 0;
        let error = 0;
        let user = "";
        const errUser = [];

        await getToken(false).then(async (token) => {
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
                            url: `${process.env.API_URL}/users/${users[i].dataValues.login}`,
                            headers: { Authorization: `Bearer ${token}` },
                        });

                        console.log(`📆 Today : ${new Date()}`);

                        await Test.create({
                            id: profile.data.id,
                            data: profile.data,
                        }).catch((err) => console.log(`What ?????`));

                        total++;
                        console.log(`🟢 User [ ${profile.data.login} ] is created !!!`);
                        console.log(`❌ Total : ${total} / ${users.length} ❌`);

                        console.log("\n===========================\n");
                    } else {
                        total++;
                        console.log(`📆 Today : ${new Date()}`);
                        console.log(`🟦 Already exists !!`);
                        console.log(`❌ Total : ${total} / ${users.length} ❌`);

                        console.log("\n===========================\n");
                    }
                } catch (e) {
                    error++;
                    total++;
                    console.log(`🟡 Error ( ${error} )`);
                    console.log(`❌ Total : ${total} / ${users.length} ❌`);
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
    })
    .get("/data_set", async (req, res) => {
        res.send("gogo");
        const users = await Test.findAll({});
        const cadet = [];
        const black = [];
        const pisciner = [];
        const staff = [];
        const notKr = [];
        const other = [];
        let flag = 1;
        let cnt = 0;

        users.forEach((data, index) => {
            const value = data.dataValues.data;
            const cursus = value.cursus_users;
            const today = new Date();
            let piscineDate = "";

            if ((today.getTime() - Date.parse(value.created_at)) / 86400000 < 93 && flag === 1) {
                if (Date.parse(value.created_at) <= 1630899498126) {
                    cnt++;
                }
                // console.log(Date.parse(value.created_at), value.login);
                // flag = 0;
            }

            if (value.email !== `${value.login}@student.42seoul.kr`) notKr.push(value.login);
            else if (value["staff?"] == true) staff.push(value.login);
            else if ((today.getTime() - Date.parse(value.created_at)) / 86400000 < 93)
                pisciner.push(value.login);
            else if (cursus.length > 1) {
                cursus.filter((data) => {
                    if (data.grade === "Learner" || data.grade === "Member") {
                        if (Date.parse(data.blackholed_at) < today.getTime()) {
                            // console.log(
                            //     Date.parse(data.blackholed_at) - today.getTime(),
                            //     data.grade,
                            //     value.login
                            // );
                            black.push(value.login);
                        } else {
                            // console.log(
                            //     Date.parse(data.blackholed_at) - today.getTime(),
                            //     data.grade,
                            //     value.login
                            // );
                            cadet.push(value.login);
                        }
                    }
                });
            } else other.push(value.login);
        });

        // console.log(pisciner);
        console.log("Pisciner: ", pisciner.length);
        // console.log(staff);
        console.log("Staff: ", staff.length);
        // console.log(cadet);
        console.log("Cadet: ", cadet.length);
        // console.log(black);
        console.log("Black: ", black.length);
        // console.log(notKr);
        console.log("NotKr: ", notKr.length);
        // console.log(other);
        console.log("Other: ", other.length);

        console.log(
            `Users: ${users.length}, Total: ${
                pisciner.length +
                staff.length +
                cadet.length +
                black.length +
                notKr.length +
                other.length
            }`
        );

        console.log(cnt);
    })
    .get("/campus_info", (req, res) => {
        getUserList();
    });

module.exports = router;
