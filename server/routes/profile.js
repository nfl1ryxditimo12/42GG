const express = require("express");
const router = express.Router();
const axios = require("axios");
const fd = require("fs");
require("dotenv").config();

const Profile = require("../models/profile");
const Project = require("../models/userProject");
const Campus = require("../models/campus");
const User = require("../models/user");

const tokenValid = require("../api/token");

const korDate = (time) => {
    return new Date(Date.parse(time) + 25200000);
};

router
    .get("/:id/api", (req, res) => {
        tokenValid().then(async (token) => {
            const readEnv = {};
            res.send(token);

            fd.readFile(".env", "utf8", (err, data) => {
                const array = data.toString().split("\n");
                array.map((data) => {
                    const splitStr = data.toString().split("=");
                    readEnv[splitStr[0]] = splitStr[1];
                });
                console.log(readEnv);
                const updateEnv = JSON.stringify(readEnv)
                    .replace(/{/g, "")
                    .replace(/}/g, "")
                    .replace(/"/g, "")
                    .replace(/,/g, "\n")
                    .replace(/:/g, "=")
                    .replace(/=\/\//g, "://");
                console.log(updateEnv);
                fd.writeFile(".env1", updateEnv, "utf8", (err) => {});
            });
            {
                /* 캠퍼스 정보 */
            }

            // const campus = await axios({
            //     method: "get",
            //     url: `${process.env.APIURL}/campus/seoul`,
            //     headers: { Authorization: `Bearer ${token}` },
            // });
            // console.log(campus.data);
            // await Campus.findOne().then(async (ret) => {
            //     if (ret === null) {
            //         await Campus.create({
            //             id: campus.data.id,
            //             userCount: campus.data.users_count,
            //         });
            //     }
            // });
        });
    })
    .get("/userlist", (req, res) => {
        let page = parseInt(process.env.CAMPUS_USERS / 30);

        if (process.env.CAMPUS_USERS - page >= 0.5) page++;

        tokenValid(true).then(async (token) => {
            let cnt = 1;

            for (let i = 1; i <= page; i++) {
                const profiles = await axios({
                    method: "get",
                    url: `${process.env.APIURL}/campus/${process.env.CAMPUS_ID}/users`,
                    headers: { Authorization: `Bearer ${token}` },
                    params: { page: i },
                });
                console.log(profiles.data.length);
                profiles.data.map(async (data) => {
                    if (
                        !data.login.includes("3b3-") &&
                        !data.login.includes("m-") &&
                        !data.login.includes("42")
                    ) {
                        await User.create({
                            id: data.id,
                            login: data.login,
                        }).catch((err) => console.log("Already exist !!"));

                        const user = await User.findOne({
                            where: { id: data.id },
                        });
                        console.log(
                            `User [ ${user.login} ] is created ( ${cnt} / ${process.env.CAMPUS_USERS} )`
                        );
                        cnt++;
                    }
                });
            }
            console.log("User list Done.");
        });
    })
    .get("/userinfo", async (req, res) => {
        let cnt = 0;
        let cadet = 0;
        let who = 0;
        let black = 0;
        let total = 0;
        let error = 0;
        const whoAreYou = [];

        const today = new Date();
        const time = today.getTime();

        tokenValid().then(async (token) => {
            const users = await User.findAll({});

            res.send("시작 시간: " + new Date());

            for (let i = 0; i < users.length; i++) {
                try {
                    console.log(`👉 ${users[i].dataValues.login} 👈`);
                    const profile = await axios({
                        method: "get",
                        url: `${process.env.APIURL}/users/${users[i].dataValues.login}`,
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    if (profile.data.cursus_users.length > 1) {
                        console.log(`Grade       :  ${profile.data.cursus_users[1].grade}`);
                        console.log(
                            `Blackholed  :  ${
                                Date.parse(profile.data.cursus_users[1].blackholed_at) - time
                            }`
                        );
                    }
                    console.log(new Date());
                    if (
                        profile.data.cursus_users.length === 2 &&
                        (profile.data.cursus_users[1].grade === "Learner" ||
                            profile.data.cursus_users[1].grade === "Member") &&
                        Date.parse(profile.data.cursus_users[1].blackholed_at) > time
                    ) {
                        const guild = ["Gun", "Gon", "Gam", "Lee"];

                        // const coalitions = await axios({
                        //     method: "get",
                        //     url: `${process.env.APIURL}/users/${user}/coalitions_users`,
                        //     headers: { Authorization: `Bearer ${token}` },
                        // });

                        await Profile.create({
                            id: profile.data.id,
                            login: profile.data.login,
                            name: profile.data.displayname,
                            email: profile.data.email,
                            correctionPoint: profile.data.correction_point,
                            wallet: profile.data.wallet,
                            coalition: "none", //guild[parseInt(coalitions.data.coalition_id) - 85],
                            coalitionScore: 0, //coalitions.data.score,
                            coalitionRank: 0, //coalitions.data.rank,
                            createdAt: korDate(profile.data.created_at),
                            updatedAt: korDate(profile.data.cursus_users[1].begin_at),
                            blackholedAt: korDate(profile.data.cursus_users[1].blackholed_at),
                        }).catch((err) => console.log(`Already exist User`));

                        cadet++;
                        total++;
                        console.log(`🟢 User [ ${profile.data.login} ] is created ( ${cadet} )`);
                        console.log(`❌ Total : ${total} ❌`);
                    } else {
                        if (
                            profile.data.cursus_users.length > 1 &&
                            profile.data.cursus_users[1].grade === "Learner"
                        ) {
                            if (Date.parse(profile.data.cursus_users[1].blackholed_at > time)) {
                                who++;
                                total++;
                                console.log(`Sorry... ( ${who} )`);
                                console.log(`❌ Total : ${total} ❌`);
                                whoAreYou.push(profile.data.login);
                                console.log(`👉 Who : ${whoAreYou}`);
                            } else {
                                black++;
                                total++;
                                console.log(
                                    `🌀 You've been absorbed by the Black Hole. ( ${black} )`
                                );
                                console.log(`❌ Total : ${total} ❌`);
                            }
                        } else {
                            cnt++;
                            total++;
                            console.log(`🔴 This user is not Cadet ( ${cnt} )`);
                            console.log(`❌ Total : ${total} ❌`);
                        }
                    }
                    console.log("\n===========================\n");
                    if (i === users.length) {
                        console.log(`Cadet: ${cadet}\nWho: ${who}\nNot: ${cnt}\nErr: ${error}`);
                        console.log(whoAreYou);
                        console.log("종료 시간 " + new Date());
                    }
                } catch (e) {
                    error++;
                    total++;
                    console.log(`🟡 Error ( ${error} )`);
                    console.log(`❌ Total : ${total} ❌`);
                }
            }
        });
    })
    .get("/data/check", async (req, res) => {
        const data = await Profile.findAll({ attributes: ["login"] });
        res.send(`카뎃 수 : ${data.length}`);
        const data1 = data.map((value) => {
            return value.dataValues.login;
        });
        console.log(data1);
        console.log(data1.indexOf("cpak"));
    })
    .get("/:id", async (req, res) => {
        const profile = await Profile.findAll({
            where: { login: req.params.id },
        });
    })
    .patch("/:id/update", (req, res) => {
        tokenValid().then((token) => {});
    });

module.exports = router;
