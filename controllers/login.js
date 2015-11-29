module.exports.controller = function(app){

	var mongoose = require('mongoose'); // to include the mongoose 

	var doctor = mongoose.model('Doctor'); // to include the blog model

	var patient = mongoose.model('Patient');

	app.get('/login/form',function (request, response){
		response.render('login.jade',{err:null});    // to load the login form
	});

	app.get('/logout', function (request,response){       // function to logout
			request.session.destroy();						// session is destroyed
			response.redirect('/login/form')      // redirect to login page.

	});

	app.post('/login/check', function (request, response){
			var userType = request.body.userType;    // get the type of user
			var email    = request.body.email;		// get the email of user

			console.log(email);

			if(userType=="doctor")
			{	
				doctor.findOne({"email" : email}, function (error , result){    // check if email exists
					//console.log(result);
					if(error)
					{
						console.log(error);
					}
					else if(result!=null)
					{
						if(result.password!=request.body.password)
						{
							response.render('login.jade',{error:"Wrong Password, Try Again"});  // if passwords don't match
						}
						else
						{
							request.session.email=email;
							request.session.loggedIn=true;
							request.session.name= result.name;
							response.render('welcomeDoctor.jade',{result:result});
						}
					}
					else
					{
						response.render('login.jade',{error:"Invalid Email"}); // if email doesn't exist, report to user
					}

				});
			}
			else
			{
				patient.findOne({"email" : email}, function (error , result){
					if(error)
					{
						console.log(error);
					}
					else if(result==null)
					{
						response.render('login.jade',{err:"Invalid Email"});
					}
					else
					{
						if(result.password!=request.body.password)
						{
							response.render('login.jade',{err:"Wrong Password, Try Again"});
						}
						else
						{
							request.session.email=email;
							request.session.loggedIn=true;
							request.session.name= result.name;
							response.render('welcomePatient.jade',{result:result});
						}
					}

				});
			}
	});
}