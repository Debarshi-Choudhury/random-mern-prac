const router = require('express').Router();

const authCheck = (req,res,next)=>{
	if(!req.user){
		//if user is not logged in
		res.redirect('/auth/login');
	}else{
		next(); //this is done in middleware to go to the next middleware
	}
};

router.get('/', authCheck,(req,res)=>{
	// res.send('you are logged in, this is your profile - '+req.user.userName);
	res.render('profile',{user:req.user});
});

module.exports = router;