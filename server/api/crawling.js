const puppeteer = require("puppeteer");

const browser = await puppeteer.launch();
const page = await browser.newPage();
const login = "seonkim";
const password = "비밀";

await page.goto("https://signin.intra.42.fr/users/sign_in");

await page.evaluate(
    (id, pw) => {
        document.querySelector('input[name="user[login]"]').value = id;
        document.querySelector('input[name="user[password]"]').value = pw;
    },
    login,
    password
);

await page.click('input[name="commit"]');

// await page.waitForTimeout(500);

if (page.url() === "https://signin.intra.42.fr/users/sign_in") {
    console.log("로그인 실패");
} else {
    console.log("여기부터 크롤링");
    const user = ["seonkim", "hyeojung", "seungsle"];
    for (let i = 0; i < 3; i++) {
        console.log(`${i + 1}번째 크롤링`);
        await page.goto(`https://profile.intra.42.fr/users/${user[i]}`);
        // console.log("페이지 이동");
        const crawl = await page.$(
            "body > div.page > div.page-content.page-content-fluid > div > div.container-item.full-width.profile-item.profile-on-users > div > div.profile-left-box > div.user-primary > div > div.user-infos-sub.margin-top-10 > div:nth-child(5) > span.user-grade-value"
        );
        // console.log("크롤링 했음");
        const grade = await page.evaluate((element) => {
            return element.textContent;
        }, crawl);
        console.log(grade);
    }
}

await browser.close();
