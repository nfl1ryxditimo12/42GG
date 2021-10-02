const axios = require("axios");
const fs = require("fs");

exports = getCampusInfo = async (token) => {
    const readEnv = {};

    await axios({
        method: "get",
        url: `${process.env.API_URL}/campus/seoul`,
        headers: { Authorization: `Bearer ${token}` },
    })
        .then(async (campus) => {
            await fs.readFile(".env", "utf8", (err, data) => {
                if (err) {
                    console.log(err);
                    console.log("\x1b[31m[Campus] - 환경변수를 불러오는데 실패하였습니다.\x1b[0m");
                } else {
                    const array = data.toString().split("\n");
                    array.map((data) => {
                        const splitStr = data.toString().split("=");
                        readEnv[splitStr[0]] = splitStr[1];
                    });

                    readEnv.CAMPUS_USERS = campus.data.users_count;

                    const updateEnv = JSON.stringify(readEnv)
                        .replace(/{/g, "")
                        .replace(/}/g, "")
                        .replace(/"/g, "")
                        .replace(/,/g, "\n")
                        .replace(/:/g, "=")
                        .replace(/=\/\//g, "://");

                    fs.writeFile(".env", updateEnv, "utf8", (err) => {
                        if (err) {
                            console.log(err);
                            console.log(
                                "\x1b[31m[Campus] - 환경변수를 저장하는데 실패하였습니다.\x1b[0m"
                            );
                        } else console.log("\x1b[31m캠퍼스 정보 업데이트 성공\x1b[0m");
                    });
                }
            });
        })
        .catch((err) => {
            console.log(err);
            console.log("[Campus] - 42API를 통한 캠퍼스 정보 호출에 실패하였습니다.");
        });
};
