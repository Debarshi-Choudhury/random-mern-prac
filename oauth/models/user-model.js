const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
	userName: String,
	email: {
		type: String,
		required: true,
		trim: true
	},

	thumbnail:String,
	gender: String,

	//this can be any id, google, facebook or linkedin ; this will be unique
	accountId: {
		type: String,
		required: true,
		index: { unique: true },
		trim: true
	},
	provider: String
});

const User = mongoose.model('user',userSchema);

module.exports = User;
