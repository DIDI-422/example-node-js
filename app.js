const express = require("express");
const dbConnect = require("./config/dbConnect");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const path = require("node:path");

const app = express();

const port = 3000;

// 전역폴더 설정,누구나 접근할 수 있는 >> css, js, image 파일을 넣어두는 폴더
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

dbConnect();
// cookie: 쿠키를 사용하기 위해 cookie-parser 미들웨어를 등록
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/loginRoutes"));
app.use("/contacts", require("./routes/contactRoutes"));

app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 실행 중`);
});
