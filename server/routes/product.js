const express = require('express');
const multer = require('multer');
const router = express.Router();
const { Product } = require('../models/Product')
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


router.post('/',(req, res) => {
 
    //받아 온 정보들을 DB에 넣어준다.
    const product = new Product(req.body)
    product.save((err)=>{
        if(err) return res.status(400).json({success:false,err})
        return res.status(200).json({success:true})
    })

});


router.post('/products',(req, res) => {
 
    // product collection 에 들어 있는 모든 상품 정보를 가져오기
    let limit =req.body.limit ? parseInt(req.body.limit) : 20; //있으면 int로 바꾸고 없으면 20
    let skip=req.body.skip ? parseInt(req.body.skip) : 0;

    let findArgs ={};

    for(let key in req.body.filters){
        if (req.body.filters[key].length>0){
            findArgs[key]=req.body.filters[key]
        }
    }

    console.log('findArgs',findArgs)

    Product.find(findArgs)
    .populate("writer") // 이 사람에 대한 모든 정보 가져옴
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo)=>{
        if(err) return res.status(400).json({success:false,err})

        return res.status(200).json({success:true,productInfo,
        PostSize:productInfo.length
    })
    })
});
  
  

module.exports = router;