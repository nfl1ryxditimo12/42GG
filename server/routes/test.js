const express = require("express");
const axios = require("axios");
const router = express.Router();
const fs = require("fs");
require("dotenv").config();

const getUserList = require("../api/userList");

const UserList = require("../models/userList");
const Cadet = require("../models/cadet");
const Blackhole = require("../models/blackhole");
const Other = require("../models/other");

const Dummy = require("../models/dummy");

const isExistUser = (cadet, blackhole, other, login) => {
    if (
        cadet.indexOf(login) !== -1 ||
        blackhole.indexOf(login) !== -1 ||
        other.indexOf(login) !== -1
    )
        return true;
    else return false;
};

const getPisciner = (data) => {
    // const createdAt =
};

const createUser = async (data) => {
    let userStatus = "";

    if (data.cursus_users.length > 1) {
        if (Date.parse(data.cursus_users[1].blackholed_at) < Date.parse(new Date())) {
            await Blackhole.create({
                id: data.id,
                login: data.login,
                name: data.displayname,
                email: data.email,
                wallet: data.wallet,
                correction_point: data.correction_point,
                pool: {
                    year: data.pool_year,
                    month: data.pool_month,
                },
                cursus: {
                    piscine: {
                        grade: "Pisciner",
                        level: data.cursus_users[0].level,
                        skills: data.cursus_users[0].skills,
                        begin_at: data.cursus_users[0].begin_at,
                        blackholed_at: data.cursus_users[0].blackholed_at,
                    },
                    cursus: {
                        grade: data.cursus_users[1].grade,
                        level: data.cursus_users[1].level,
                        skills: data.cursus_users[1].skills,
                        begin_at: data.cursus_users[1].begin_at,
                        blackholed_at: data.cursus_users[0].blackholed_at,
                    },
                },
                achievements: data.achievements,
                coalition: null,
                project: data.projects_users,
                createdAt: data.created_at,
                updatedAt: data.updated_at,
            }).then(() => (userStatus = "Blackhole"));
        } else {
            await Cadet.create({
                id: data.id,
                login: data.login,
                name: data.displayname,
                email: data.email,
                wallet: data.wallet,
                correction_point: data.correction_point,
                pool: {
                    year: data.pool_year,
                    month: data.pool_month,
                },
                cursus: {
                    piscine: {
                        grade: "Pisciner",
                        level: data.cursus_users[0].level,
                        skills: data.cursus_users[0].skills,
                        begin_at: data.cursus_users[0].begin_at,
                        blackholed_at: data.cursus_users[0].blackholed_at,
                    },
                    cursus: {
                        grade: data.cursus_users[1].grade,
                        level: data.cursus_users[1].level,
                        skills: data.cursus_users[1].skills,
                        begin_at: data.cursus_users[1].begin_at,
                        blackholed_at: data.cursus_users[0].blackholed_at,
                    },
                },
                achievements: data.achievements,
                coalition: null,
                createdAt: data.created_at,
                updatedAt: data.updated_at,
            }).then(() => (userStatus = "Cadet"));
        }
    } else {
        await Other.create({
            id: data.id,
            login: data.login,
            name: data.displayname,
            email: data.email,
            wallet: data.wallet,
            correction_point: data.correction_point,
            pool: {
                year: data.pool_year,
                month: data.pool_month,
            },
            cursus: {
                piscine: {
                    grade: "Pisciner",
                    level: data.cursus_users[0].level,
                    skills: data.cursus_users[0].skills,
                    begin_at: data.cursus_users[0].begin_at,
                    blackholed_at: data.cursus_users[0].blackholed_at,
                },
            },
            achievement: data.achievements,
            project: data.projects_users,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        }).then(() => (userStatus = "Other"));
    }

    await UserList.update(
        { status: userStatus },
        {
            where: { login: data.login },
        }
    );
};

router
    .get("/user_list", async (req, res) => {
        await getUserList();
    })
    .get("/user_profile", async (req, res) => {
        let total = 0;
        let error = 0;
        let user = "";
        const errUser = [];

        await getToken(true).then(async (token) => {
            const userList = await UserList.findAll({});
            const cadet = await Cadet.findAll({});
            const blackhole = await Blackhole.findAll({});
            const other = await Other.findAll({});

            const exist_cadet = cadet.map((value) => {
                return value.dataValues.login;
            });
            const exist_blackhole = blackhole.map((value) => {
                return value.dataValues.login;
            });
            const exist_other = other.map((value) => {
                return value.dataValues.login;
            });

            res.send(`시작 시간:  ${new Date()} 총 데이터:  ${userList.length}`);

            for (let i = 0; i < userList.length; i++) {
                user = userList[i].dataValues.login;

                try {
                    console.log(`👉 ${user} 👈`);

                    if (isExistUser(exist_cadet, exist_blackhole, exist_other, user) === false) {
                        const profile = await axios({
                            method: "get",
                            url: `${process.env.API_URL}/users/${user}`,
                            headers: { Authorization: `Bearer ${token}` },
                        });

                        console.log(`📆 Today : ${new Date()}`);

                        await createUser(profile.data);

                        total++;
                        console.log(`🟢 User [ ${profile.data.login} ] is created !!!`);
                        console.log(`❌ Total : ${total} / ${userList.length} ❌`);

                        console.log("\n===========================\n");
                    } else {
                        total++;
                        console.log(`📆 Today : ${new Date()}`);
                        console.log(`🔵 Already exists !!`);
                        console.log(`❌ Total : ${total} / ${userList.length} ❌`);

                        console.log("\n===========================\n");
                    }
                } catch (err) {
                    error++;
                    total++;
                    console.log(`🔴 \x1b[31m[${err}]\x1b[0m`);
                    console.log(`❌ Total : ${total} / ${userList.length} ❌`);
                    errUser.push(user);
                }
            }
        });

        let logData = `${new Date()} - total: ${total}, normal: ${
            total - error
        }, ERR_User: ${errUser.join(", ")}`;
        logData = logData.replace(/\n/g, "") + "\n";
        await fs.appendFile(
            "./server/log/42api_users.log",
            logData.replace(/\n/g, ""),
            "utf8",
            (err) => {}
        );
    })
    .get("/user_test", async (req, res) => {
        await Dummy.findAll({}).then((dummy) => {
            const other = [];

            dummy.map((value, index) => {
                const val = value.dataValues.data;
                const create = Date.parse(val.created_at);
                const update = Date.parse(val.updated_at);
                if ((update - create) / (1000 * 60 * 60 * 24) < 40) other.push(val.login);
            });

            console.log(other);
        });
    });

module.exports = router;
