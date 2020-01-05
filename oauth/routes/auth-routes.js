const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login',(req,res)=>{
	res.render('login',{user:req.user});
});

//auth logout
router.get('/logout',(req,res)=>{
	//handle with passport
	// res.send('logging out');
	req.logout();
	res.redirect('/');
});

//auth with google
router.get('/google',passport.authenticate('google',{
	scope:['profile','email']
}));

//callback route for google to redirect to 
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
	// console.log('you reached the google callback uri');
	// res.send(req.user);
	res.redirect('/profile/');
});


//auth with facebook
router.get('/facebook',
	passport.authenticate('facebook',{ scope : ['email'] })
);


//callback route for facebook to redirect to 
router.get('/facebook/redirect',
	passport.authenticate('facebook', { failureRedirect: '/login' }),(req, res)=>{
	// console.log('you reached the facebook callback uri');
	res.redirect('/profile/');
});


module.exports = router;