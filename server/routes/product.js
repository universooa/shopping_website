const express = require('express');
const multer = require('multer');
const router = express.Router();

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage: storage }).single('file')


router.post('/image',(req, res) => {
  //가져온 이미지를 저장을 해주면 된다.
  upload(req, res, err =>{
    console.log("fff",req.file);
    if(err){
      return res.json({success: false, err})
    }
    return res.json({success: true, filePath:res.req.file.path , fileName: res.req.file.filename})
  })
});

module.exports = router;