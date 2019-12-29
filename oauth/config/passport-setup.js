const passport = require('passport');
const keys = require('./keys');

const GoogleStrategy = require('passport-google-oauth20');

passport.use(new GoogleStrategy({
			//options for the google strategy
			callbackURL:'/auth/google/redirect',
			clientID:keys.google.clientID,
			clientSecret:keys.google.clientSecret,

		},()=>{
		//passport callback function 
	})
)