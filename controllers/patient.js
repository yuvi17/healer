// this is the controller for patient functions
module.exports.controller = function(app){

	var mongoose = require('mongoose'); // to include the mongoose 

	var days = mongoose.model('Days'); // to include Days model

	app.get('/patient/search', function (request, response){

		if(request.session.loggedIn){
			response.render('search.jade',{message:null});   // open the selection page
		}
		else
		{
			response.redirect('/login/form');
		}
	});

	app.get('/patient/logout', function (req,res) {
		req.session.destroy();
		res.render('login.jade',{err:null}); 
	})

	app.post('/patient/find', function (request, response){
		var date = request.body.date;   // get date via post from user

		days.findOne({"date":date},function (error, result){
			if(error)
			{
				console.log(error+"Happened while checking");
			}
			else if(result!=null)  // if records exist for that day send it to user for display
			{	
				//response.send(result);
				response.render('showDoctors.jade',{result:result});
			}
			else
			{

				response.render('search.jade',{message:"No Doctors Found for "+date+". Try another date"});
			}
		});
	});
}