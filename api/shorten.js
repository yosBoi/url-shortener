const express = require('express');
const router = express.Router();

const validUrl = require('valid-url');

//importing urlData model
const urlData = require('../models/urlData.js')


router.post('/', async (req, res) => {
  
  if(!validUrl.isUri(req.body.longUrl)){
    return res.json({
      shortLink:"invalid URL"
    })
  }

  //checking if short version for given url already exists in db
  let checkUrl = await urlData.findOne({"longUrl": req.body.longUrl});
  
  //if already exists, send that one
  if(checkUrl){
    res.json({
      shortLink:`${req.hostname}/go/${checkUrl.shortUrl}`,
      preExist:true
    });
  }

  //if doesnt exist already, make it
  else{
    const newUrlData = new urlData({
    longUrl:`${req.body.longUrl}`
    })

    newUrlData.save()
    .then(item => res.json({
      shortLink:`${req.hostname}/go/${item.shortUrl}`,     //or req.origin
      preExist:false
    })); 
  }
})



module.exports = router;