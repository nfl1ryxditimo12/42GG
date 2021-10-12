const axios = require("axios");
const getToken = require("./token");
const fs = require("fs");
require("dotenv").config();

const User = require("../models/user");
const Test = require("../models/test");

module.exports = getProfile = () => {
    let total = 0;
    let error = 0;
    const errUser = {
        database: [],
        server: [],
    };

    getToken(false).then(async (token) => {
        const users = await User.findAll({});
        const tests = await Test.findAll({});

        const exist = tests.map((value) => {
            return value.dataValues.data.login;
        });

        res.send(`시작 시간:  ${new Date()}
        총 데이터:  ${users.length}
        존재 데이터: ${exist.length}`);

        for (let i = 0; i < users.length; i++) {
            const user = users[i].dataValues.login;

            console.log(`👉 ${user} 👈`);

            if (exist.indexOf(user) === -1) {
                await axios({
                    method: "get",
                    url: `${process.env.API_URL}/users/${user}`,
                    headers: { Authorization: `Bearer ${token}` },
                })
                    .then((value) => {
                        const cursus = value.cursus_users;

                        if (value["staff?"] == true) staff.push(user);
                        else if (value.email !== `${user}@student.42seoul.kr`) notKr.push(user);
                        else if ((today.getTime() - Date.parse(value.created_at)) / 86400000 < 93)
                            pisciner.push(user);
                        else if (cursus.length > 1) {
                            cursus.filter((data) => {
                                if (data.grade === "Learner" || data.grade === "Member") {
                                    if (Date.parse(data.blackholed_at) < today.getTime()) {
                                        // console.log(
                                        //     Date.parse(data.blackholed_at) - today.getTime(),
                                        //     data.grade,
                                        //     user
                                        // );
                                        black.push(user);
                                    } else {
                                        // console.log(
                                        //     Date.parse(data.blackholed_at) - today.getTime(),
                                        //     data.grade,
                                        //     user
                                        // );
                                        cadet.push(user);
                                    }
                                }
                            });
                        } else other.push(user);

                        await Test.create({
                            id: value.data.id,
                            data: value.data,
                        })
                            .then(() => {
                                total++;
                                console.log(`📆 Today : ${new Date()}`);
                                console.log(`🟢 [ ${user} ] - 유저 정보를 추가하였습니다.`);
                                console.log(`❌ Total : ${total} / ${users.length} ❌`);
                                console.log("\n===========================\n");
                            })
                            .catch(() => {
                                total++;
                                errUser.database.push(user);
                                console.log(`📆 Today : ${new Date()}`);
                                console.log(`🔴 [ ${user} ] - 유저 정보 추가에 실패하였습니다.`);
                                console.log(`❌ Total : ${total} / ${users.length} ❌`);
                                console.log("\n===========================\n");
                            });
                    })
                    .catch((err) => {
                        error++;
                        total++;
                        errUser.server.push(user);
                        console.log(`📆 Today : ${new Date()}`);
                        console.log(
                            `🔴 [ ${user} ] - (${err.response.status}) ${err.response.statusText}`
                        );
                        console.log(`❌ Total : ${total} / ${users.length} ❌`);
                        console.log("\n===========================\n");
                    });
            } else {
                total++;
                console.log(`📆 Today : ${new Date()}`);
                console.log(`🔵 [ ${user} ] - 유저 정보가 이미 존재합니다.`);
                console.log(`❌ Total : ${total} / ${users.length} ❌`);
                console.log("\n===========================\n");
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
};
