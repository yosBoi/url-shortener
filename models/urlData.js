const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const urlDataSchema = new Schema({
	longUrl: {
		type:String,
		required:true
	},
	
	shortUrl: {
    	type:String,
    	required:true
	}
})

module.exports = mongoose.model('urlData', urlDataSchema);