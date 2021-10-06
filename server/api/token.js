const axios = require("axios");
const Token = require("../models/token");

exports = getToken = (status = false) => {
    return new Promise(async (resolve, reject) => {
        try {
            const today = new Date();
            const time = today.getTime();
            const tokenStat = await Token.findOne({});
            const tokenValue = tokenStat.dataValues;
            if (
                tokenStat === null ||
                tokenValue.createdAt + tokenValue.expiresIn - 200000 <= time ||
                status === true
            ) {
                const token = await axios({
                    method: "post",
                    url: process.env.TOKEN_URL,
                    params: {
                        grant_type: "client_credentials",
                        client_id: process.env.UID,
                        client_secret: process.env.SECRET,
                    },
                });

                if (tokenValue === null && status === false) {
                    await Token.create({
                        accessToken: token.data.access_token,
                        expiresIn: parseInt(token.data.expires_in) * 1000,
                        createdAt: parseInt(token.data.created_at) * 1000,
                    }).then(() => console.log("\x1b[31m토큰이 생성되었습니다.\x1b[m"));
                } else {
                    await Token.update(
                        {
                            accessToken: token.data.access_token,
                            expiresIn: parseInt(token.data.expires_in) * 1000,
                            createdAt: parseInt(token.data.created_at) * 1000,
                        },
                        {
                            where: { id: 1 },
                        }
                    ).then(() => console.log("\x1b[31m토큰 정보가 업데이트 되었습니다.\x1b[m"));
                }
            } else {
                const leftToken =
                    tokenValue.createdAt + tokenValue.expiresIn - Date.parse(new Date());
                console.log(
                    `토큰 소멸까지 \x1b[31m${
                        leftToken / 1000 / 60 / 60 >= 1
                            ? `${parseInt(leftToken / 1000 / 60 / 60) % 60}시간 `
                            : ""
                    }${parseInt(leftToken / 1000 / 60) % 60}분 ${
                        parseInt(leftToken / 1000) % 60
                    }초\x1b[0m 남았습니다.`
                );
            }
            const tokenAfterStatus = await Token.findOne({});
            resolve(tokenAfterStatus.accessToken);
        } catch (err) {
            console.log(err);
            console.log("\x1b[31m[Token] - 42API 토큰 발행에 실패하였습니다.\x1b[m");
        }
    });
};
