const passport = require('passport');
const keys = require('./keys');
const User = require('../models/user-model');

const GoogleStrategy = require('passport-google-oauth20');

passport.serializeUser((user,done)=>{
	done(null,user.id);
});

passport.deserializeUser((id,done)=>{
	User.findById(id).then((user)=>{
		done(null,user);
	});
});

passport.use(new GoogleStrategy({
			//options for the google strategy
			callbackURL:'/auth/google/redirect',
			clientID:keys.google.clientID,
			clientSecret:keys.google.clientSecret,

		},(accessToken,refreshToken,profile,done)=>{
		//passport callback function
		console.log('passport callback function fired');
		console.log(profile);

		let emailExists = false;
		if(profile.emails){
			if(profile.emails[0]){
				if(profile.emails[0].value)
					emailExists=true;
			}
		}


		User.findOne({accountId: profile.id, provider: 'google'}).then((result)=>{
			if(result){
				if(!result.email || result.email == 'temporary_email'){
					result.email = (emailExists?profile.emails[0].value:'temporary_email');

				}
				if(!result.gender){
					result.gender=profile.gender;
				}
				if(!result.thumbnail){
					result.thumbnail=profile._json.picture;
				}
				result.save().then((currentUser)=>{
					console.log('Current user is: '+currentUser);
					done(null, currentUser);
				}).catch((err)=>{
					console.log('Some error occurred in updating current user!');
				});
			}else{
				new User({
					userName: profile.displayName,
					email: (emailExists?profile.emails[0].value:'temporary_email'),
					thumbnail: profile._json.picture,
					gender: profile.gender,
					accountId: profile.id,
					provider: 'google'
				}).save().then((newUser)=>{
					console.log('New user created:'+newUser);
					done(null, newUser);
				}).catch((err)=>{
					console.log('Some error occurred in saving new user!');
				});
			}
		}).catch((err)=>{
			console.log('Some error occurred in finding user!');
		});


				

	})
)