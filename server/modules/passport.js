const passport = require("passport");
const FortyTwoStrategy = require("passport-42").Strategy;
require("dotenv").config();

const validate = async (profile) => {
    await new Promise((resolve, reject) => {
        if (profile._json.cursus_users.length < 2) {
            reject(profile._json.login);
        } else {
            resolve();
        }
    });
};

/*
accessToken : 받아온 인증 토큰
refreshToken : 토큰을 리프레시하여 새롭게 받아온 토큰
profile : Google에서 보내준 이용자의 프로필 정보
cb(err, obj) : session에 저장하는 함수
*/
const strategyCallback = (accessToken, refreshToken, profile, callback) => {
    validate(profile)
        .then(() => {
            callback(null, profile);
        })
        .catch((err) => {
            console.log(`\x1b[31m[${err}] 접근 할 수 없는 사용자 입니다.\x1b[0m`);
            callback(null, null);
        });
};

module.exports = () => {
    passport.use(
        new FortyTwoStrategy(
            {
                clientID: process.env.FT_UID,
                clientSecret: process.env.FT_SECRET,
                callbackURL: process.env.FT_RETURN_URL,
                profileFields: {
                    id: (obj) => String(obj.id),
                    username: "login",
                    displayName: "displayname",
                    "name.familyName": "last_name",
                    "name.givenName": "first_name",
                    profileUrl: "url",
                    "emails.0.value": "email",
                    "phoneNumbers.0.value": "phone",
                    "photos.0.value": "image_url",
                },
            },
            strategyCallback
        )
    );

    /*
    serializeUser 미들웨어는 전달받은 객체(정보)를 세션에 저장하는 역할을 한다. 그리고 저장한 객체를 deserializeUser 미들웨어로 전달한다.
     */
    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });

    /*
    deserializeUser 미들웨어는 서버로 들어오는 요청마다 세션 정보가 유효한 지를 검사하는 역할을 한다.
    제대로 된 정보가 들어왔으면 req.user 에 그 정보를 저장하고 요청마다 유저 정보를 넘겨준다. 다음의 코드처럼 작성한다.
     */
    passport.deserializeUser(function (obj, cb) {
        cb(null, obj);
    });
};
