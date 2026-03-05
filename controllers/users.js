const User = require('../models/user');

// signup get
module.exports.renderSignupForm = (req,res)=>{
    res.render('user/signup.ejs');
};

// signup Post
module.exports.signUpPost = async(req,res,next)=>{
   try{
     let {username,password,email} = req.body;
    const newUser = new User({
        email : email,
        username : username,
    });

    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser);
    req.logIn(registeredUser,(err)=>{    // automatically login when signup is completed. and it is of possport method
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to the wonderlust!");
    res.redirect("/listings");
    })
    
   }catch(e){
    req.flash("error",e.message);
    res.redirect('/signup');
   }
};

// login get
module.exports.renderLoginForm = (req,res)=>{
    res.render('user/login.ejs');
}

// login post
module.exports.loginPost = async(req,res)=>{
  req.flash("success","Welcome back to Wonderlust");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
}

//logout
module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{    // logout us provided by the passport
        if(err){
            return next(err);  // call the error handling middleware not normal middleware
        }
        req.flash('success','You are logged out!');
        res.redirect('/listings');
    })
}