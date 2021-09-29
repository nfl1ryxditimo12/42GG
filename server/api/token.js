const axios = require("axios");
const Token = require("../models/token");

module.exports = tokenValid = (status = false) => {
    return new Promise(async (resolve, reject) => {
        const today = new Date();
        const time = today.getTime();
        let users = await Token.findOne({});

        if (
            users === null ||
            users.createdAt + users.expiresIn - 200000 <= time ||
            status === true
        ) {
            const token = await axios({
                method: "post",
                url: process.env.TOKENURL,
                params: {
                    grant_type: "client_credentials",
                    client_id: process.env.UID,
                    client_secret: process.env.SECRET,
                },
            });
            console.log("created " + parseInt(token.data.created_at) * 1000);
            console.log("nowtime " + time);
            if (users === null && status === false) {
                await Token.create({
                    accessToken: token.data.access_token,
                    expiresIn: parseInt(token.data.expires_in) * 1000,
                    createdAt: parseInt(token.data.created_at) * 1000,
                });
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
                );
            }
        }
        users = await Token.findOne({});
        resolve(users.accessToken);
    });
};
