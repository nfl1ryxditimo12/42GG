const axios = require("axios");
const UserList = require("../models");
const getToken = require("./token");
const getCampusInfo = require("./campus");

exports = getUserList = async (status = false) => {
    const page =
        process.env.CAMPUS_USERS / 30 - parseInt(process.env.CAMPUS_USERS / 30) >= 0.5
            ? parseInt(process.env.CAMPUS_USERS / 30) + 1
            : parseInt(process.env.CAMPUS_USERS / 30);

    const errPage = [];
    let cnt = 0;

    for (let i = 1; i <= page; i++) {
        await axios({
            method: "get",
            url: `${process.env.API_URL}/campus/${process.env.CAMPUS_ID}/users`,
            headers: { Authorization: `Bearer ${token}` },
            params: { page: i },
        })
            .then((users) => {
                console.log(users.data.length);
                users.data.map(async (data) => {
                    if (
                        !data.login.includes("3b3-") &&
                        !data.login.includes("m-") &&
                        !data.login.includes("42") &&
                        !(data["staff?"] === true) &&
                        !data.email.includes("@student.42seoul.kr")
                    ) {
                        await UserList.create({
                            id: data.id,
                            login: data.login,
                            status: null,
                        })
                            .then(() => {
                                cnt++;
                                console.log(
                                    `[ ${data.login} ] - 생성되었습니다. ( ${cnt} / ${process.env.CAMPUS_USERS} )`
                                );
                            })
                            .catch((err) => {
                                cnt++;
                                console.log(
                                    `[ ${data.login} ] - \x1b[31m이미 존재하는 유저입니다.\x1b[0m ( ${cnt} / ${process.env.CAMPUS_USERS} )`
                                );
                            });
                    } else {
                        cnt++;
                        console.log(
                            `[ ${data.login} ] - \x1b[31m삭제되거나 교육생이 아닙니다.\x1b[0m ( ${cnt} / ${process.env.CAMPUS_USERS} )`
                        );
                    }
                });
            })
            .catch((err) => {
                console.log(
                    `\x1b[31m[${err.response.status}] - ${err.response.statusText}\x1b[0m { page: ${i} }`
                );
                errPage.push(i);
            });
    }
    console.log(`Page \x1b[31m${errPage}\x1b[0m ERROR`);
};
