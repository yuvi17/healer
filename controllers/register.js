module.exports.controller = function(app){

	var mongoose = require('mongoose'); // to include the mongoose 

	var doctor = mongoose.model('Doctor'); // to include the blog model

	var patient = mongoose.model('Patient');

	app.post('/register/create',function (request, response){
			var userType = request.body.userType;
			var email    = request.body.email;
			var name     = {firstName : request.body.firstName , lastName : request.body.lastName}
			//console.log(request.body.userType);

			if(userType=='doctor')
			{
				doctor.findOne({'email' : email}, function (error, result){  
					if (error)
					{
						console.log(error);
						//response.render('index.jade',{});
						//response.send({"errorMessage":error,"userMessage":"Something is not correct"});
					}
					else if(result!=null)
					{
						console.log(result);
						response.render('index.jade',{err:"Email Already Registered"});
					}
					else 
					{
						var newDoctor  = new doctor(
							{
								email    : email,
								password : request.body.password,
								name     : name
								
							});
						newDoctor.save(function (err){

							if(err){
								console.log(err+"Error to save doctor");
								//res.send({error:true,'errorMessage':err,'userMessage':'Sorry some error occured'});
								
							}
							else{
								//res.send(newBlog);
								response.render('Succes.jade', { type:true, name: name});

							}


						});
					}
				});
				//console.log("Reached Doctor");
				
			}
			else
			{
				patient.findOne({'email' : email}, function (error, result){  // parenthesis will contain the where conditions
					if (error)
					{
						response.send({"errorMessage":error,"userMessage":"Something is not correct"});
					}
					else if (result)
					{
						response.redirect('index.jade',{err:"Email Already Registered"});
					}
					else
					{
						var newPatient  = new patient(
							{
								email    : email,
								password : request.body.password,
								name     : name
								
							});
						newPatient.save(function (err){

							if(err){
								console.log(err+"Error in Saving patient");
								//response.send({error:true,'errorMessage':err,'userMessage':'Sorry some error occured'});
								
							}
							else{
								//res.send(newBlog);
								response.render('Succes.jade', { type:false, name: name});

							}


						});
					}
				});
				//conole.log("In patient");
				

			}
	});

	app.get('/all',function (request,response){
		doctor.find({}, function (error, result){  // parenthesis will contain the where conditions
					if (error)
					{
						console.log(error);
						//response.render('index.jade',{});
						//response.send({"errorMessage":error,"userMessage":"Something is not correct"});
					}
					else if(result)
					{
						response.send(result);
					}
				});
	})
	
}