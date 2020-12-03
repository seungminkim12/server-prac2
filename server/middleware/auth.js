const { User } = require("../models/user");

let auth = (req, res, next) => {
  //인증 처리 하는곳

  // 클라이언트 쿠키에서 토큰 가져옴
  let token = req.cookies.x_auth;
  //토큰 복호화 후 유저 찾음
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    //index.js에서 쓸수 있게 넣어줌
    req.token = token;
    req.user = user;
    //middleware 에서 다음으로 넘어갈수있게
    next();
  });
};

module.exports = { auth };
