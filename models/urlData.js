const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const shortid = require('shortid');

const urlDataSchema = new Schema({
	longUrl: {
		type:String,
		required:true
	},
	
	shortUrl: {
    type:String,
    default:shortid.generate
	}
})

module.exports = mongoose.model('urlData', urlDataSchema);