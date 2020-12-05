const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const config = require("./config/key");

const { auth } = require("./middleware/auth");
const { User } = require("./models/user");

//application/x-www-form-urlencoded 분석
app.use(bodyParser.urlencoded({ extended: true }));

//application/json 분석
app.use(bodyParser.json());

app.use(cookieParser());

//DB연동
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hello world! 월드"));

app.get("/api/hello", (req, res) => {
  res.send("HHHHHHEEEEELLLOOOOO");
});

//회원가입
app.post("/api/users/register", (req, res) => {
  //회원 가입 할때 필요한 정보들을 Client 에서 가져오면 DB에 저장

  //req.body -> json 형식으로 데이터 받아옴 (body.parser가 해줌)
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

//로그인
app.post("/api/users/login", (req, res) => {
  //요청된 이메일 DB에 있는지 확인
  //mongoDB에서 제공하는 method
  User.findOne({ email: req.body.email }, (err, user) => {
    console.log(req.body.email);
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "해당 되는 이메일이 없습니다.",
      });
    }
    //요청된 이메일 패스워드 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 맞지않습니다.",
        });

      //비밀번호 맞으면 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //토큰 생성 후 저장 쿠키에
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user.email });
      });
    });
  });
});

//인증
//auth - middleware 콜백 가기전 중간에서 해줌
app.get("/api/users/auth", auth, (req, res) => {
  // 미들웨어 넘어서 여기까지 오면 auth true라는 것
  res.status(200).json({
    ...req.user,
    isAuth: true,
  });
});

//logout
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    console.log("req.body.id : ", req.user._id);
    if (err) return res.json({ success: false, err });
    console.log("user : ", user);
    return res.status(200).send({
      success: true,
      email: user.email,
      token: user.token,
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
