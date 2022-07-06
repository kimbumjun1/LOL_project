const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Post, Hashtag } = require("../models");
const { isLoggedIn } = require("./middlewares");
const { nextTick } = require("process");

const router = express.Router();

//업로드 폴더 만들어줌
try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
//img는 upload폴더에 들어있는대, 요청주소는 img가 된다.
//요청과 실제파일주소가 다름 -> 이런역할을 해주는게 app.js에있는 express.static이다
router.post("/img", isLoggedIn, upload.single("img"), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  try {

    
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
    //정규표현식 -> 처음에#으로시작해서 []안 ^부정 \s 띄어쓰기 -> 띄어쓰기랑#이 아닌애들 모두(g)를 골라라
    const hashtags = req.body.content.match(/#[^\s#]*/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag => {
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          })
        }),
      );
      console.log(result);
      await post.addHashtags(result.map(r => r[0]));
    }
     
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
