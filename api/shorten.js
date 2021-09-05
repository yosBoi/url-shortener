const express = require('express');
const router = express.Router();
const shortid = require('shortid');


const validUrl = require('valid-url');

//importing urlData model
const urlData = require('../models/urlData.js')


router.post('/', async (req, res) => {
  
  if(!validUrl.isUri(req.body.longUrl)){
    return res.json({
      shortLink:"invalid URL"
    })
  }

  if(req.body.urlType == "random"){
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
        longUrl:`${req.body.longUrl}`,
        shortUrl:`${shortid.generate()}`
      })

      newUrlData.save()
      .then(item => res.json({
        shortLink:`${req.hostname}/go/${item.shortUrl}`,     //or req.origin
        preExist:false
      })); 
    }
  }

  else if(req.body.urlType == "custom"){

    let checkShortUrl = await urlData.findOne({"shortUrl": req.body.shortUrl});

    //if already taken
    if(checkShortUrl){
      res.json({
        shortLink: "Short URL already taken",
        preExist:true
      });
    }

    else{
      const newUrlData = new urlData({
        longUrl:`${req.body.longUrl}`,
        shortUrl:`${req.body.shortUrl}`
      })

      newUrlData.save()
      .then(item => res.json({
        shortLink:`${req.hostname}/go/${item.shortUrl}`,     //or req.origin
        preExist: false
      }));
    }
  }

  
})



module.exports = router;