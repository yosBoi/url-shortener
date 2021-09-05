const express = require('express');
const urlData = require('./models/urlData');
const path = require('path');
const mongoose = require('mongoose');

if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}

const db = process.env.MONGO_URI      /*set env variable on server*/

//connect to db
mongoose.connect(db, {
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(() => console.log('mongo connected'))
.catch((err) => console.log(err));


const app = express();

//middleware to parse json data
app.use(express.json());

//routes
app.use('/api/shorten', require('./api/shorten'));

//redirection function
app.get('/go/:shortUrl', async (req, res) => {
  let urlRecord = await urlData.findOne({"shortUrl":req.params.shortUrl});

  if(!urlRecord){
    res.status(404).send('Not found');
    console.log("not found")
  }

  else{
    res.redirect(urlRecord.longUrl);
  }
})


app.use(express.static(path.join(__dirname, 'static')));

app.listen(process.env.PORT || 5000);