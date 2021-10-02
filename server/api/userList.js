const axios = require("axios");
const User = require("../models/user");
const getToken = require("./token");
const getCampusInfo = require("./campus");

exports = getUserList = () => {
    getToken(true)
        .then((token) => {
            getCampusInfo(token).then(async () => {
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
                                    !data.login.includes("42")
                                ) {
                                    await User.create({
                                        id: data.id,
                                        login: data.login,
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
            });
        })
        .catch((err) => {
            console.log(err);
            console.log(
                "\x1b[31m[UserList] - 42API를 통한 유저 리스트 호출에 실패하였습니다.\x1b[0m"
            );
        });
};
