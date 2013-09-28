'use strict';

/* Services */

var module = angular.module('nsApp.services', []).
value('version', '0.1').
value('name', 'Globo Newsource');


angular.module('nsApp.services.user', []).factory('User', ['$http', function ($http)
{
	var User = {};
	User.login = function(username, pass, callback)
	{	
		$http.post('/a/sessions', {username : username, pass : pass}).success(function (data)
		{
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					callback(data);
				}
			} else{
				callback({});
			}
		});
	};

	User.logged = function(token, callback)
	{	
		console.log('/a/sessions/'+token+'?token='+token)
		$http.get('/a/sessions/'+token+'?token='+token).success(function (data)	{
			
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					console.log('data', data)
					callback(data);
				}
			} else{
				data.token = null;
				callback(data);
			}
			
		}).error(function (error){
			callback(error);
		})
	};

	User.company_name = function(token, callback){
		$http.get('/a/companies?token='+token).success(function(data){
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					console.log('company_name', data)
					callback(data);
				}
			}else{
				callback({});
			}
		});
	}

	User.getOne = function(params, callback) {
		$http.get('/a/user?token='+params.token).success(function(user){
			console.log('user services', user)
			callback(user);
		});
	}

	User.logout = function(token, callback)
	{
		$http.delete('/a/sessions/'+token+'?token='+token).success(function (data)
		{
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					console.log('data', data)
					callback(data);
				}
			} 
		});
	};


	User.get = function(callback){
		$http.get('/a/users').success(function(user){
			callback(user);
		});
	}

	User.add = function(user, callback){
		$http.post('/a/users', user).success(function(user){
			if (user.error === undefined) {
				if (typeof callback == 'function') {
					callback(user);
				}
			}else{
				alert("Já existe um usuário cadastrado");
			}
		});
	}

	User.set = function(params, callback){
		//params.token = ',mnsfsadfAGJF98HJ7VCGH7J'
		//params.user = {id, name, email ...}

		$http.post('/a/users/'+params.user.id+'?token='+params.token, params.user).success(function(user){
			callback(user);
		});
	}
	
	return User;
}]);


angular.module('nsApp.services.company', []).factory('Company', ['$http', function ($http)
{
	var Company = {};

	Company.add = function(params, callback){
		// params = {company :{}, user : {}}
		$http.post('/a/companies', params).success(function(data){
			callback(data);
		});
	}
	
	return Company;
}]);


angular.module('nsApp.services.content', []).factory('Content', ['$http', function ($http)
{
	// área_id  = { HARDNEWS : 19378, ARCHIVE : 19379, COMPILATIONS : 19380}
	var Content = {};
	Content.get = function(params, callback)
	{

		if(typeof(params) == 'object'){
			params = utils.serialize(params);
		}
		if(params == ''){
			callback({});
			return;
		}
		console.log('parametros', '/a/contents?'+params)
		$http.get('/a/contents?'+params).success(function (data)
		{
			console.log('data',data)
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					callback(data);
				}
			} 
		});
	};

	Content.getById = function(id, callback)
	{
		$http.get('/a/contents/'+id).success(function (data)
		{
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					callback(data);
				}
			} 
		});
	};

	
	return Content;
}]);


angular.module('nsApp.services.requestcontent', []).factory('RequestContent', ['$http', function ($http)
{
  var RequestContent = {};
  
  RequestContent.set = function(params, callback){
    $http.post('/a/requestcontent?token='+params.token, params.request).success(function(request){
			if (request.error === undefined) {
				if (typeof callback == 'function') {
					callback(request);
				}
			} 
		});
  }
  
  RequestContent.sendMail = function(params){
    $http.post('/a/sendmail?token='+params.token, params).success(function(mail){
      if(mail.error === undefined){
        console.log(mail);
      }
    });
  }
	
	return RequestContent;
}]);


angular.module('nsApp.services.category', []).factory('Category', ['$http', function ($http)
{
	var Category = {};
	Category.get = function(callback)
	{
		var categories  = []

		$http.get('/a/config.json').success(function(config){
			categories = 
			[
				{ id : config.sambavideos.categories.hardnews_id, name : 'Hard News', label:'hard_news'},
				{ id : config.sambavideos.categories.archive_id, name : 'Archive', label:'archive'},
				{ id : config.sambavideos.categories.compilations_id, name : 'Compilations', label:'compilations'},
			];
			callback(categories);
		});
		
	};

	
	return Category;
}]);



angular.module('nsApp.services.subcategory', []).factory('SubCategory', ['$http', function ($http)
{
	var SubCategory = {};
	
	SubCategory.get = function(params, callback)
	{	
		params = utils.serialize(params);
		
		$http.get('/a/subcategories?'+params).success(function (data)
		{
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					callback(data);
				}
			} 
		});
	};

	
	return SubCategory;
}]);

angular.module('nsApp.services.purchase', []).factory('Purchase', ['$http', function ($http)
{
	var Purchase = {};
	Purchase.cart = [];
	Purchase.addCart = function(params, callback){
		//Purchase.cart.push(content);

		$http.post('/a/shoppingcart?token='+params.token, {content_id : params.content_id}).success(function (data)
		{
			if (typeof callback == 'function') {
				callback(data);
			}
		});
	}

	Purchase.getCart = function(params, callback){

		if(typeof(params) == 'object'){
			params = utils.serialize(params);
		}else{
			return [];
		}

		$http.get('/a/shoppingcart?'+params).success(function (data)
		{

			if (data.error === undefined) {
				if (typeof callback == 'function') {
					callback(data);
				}
			} 
		});
	}

	Purchase.removeCart = function(params, callback){
		
		$http.delete('/a/shoppingcart/'+params.cart_id+'?token='+params.token).success(function (data)
		{
			if (typeof callback == 'function') {
				console.log(data);
				callback(data);
			}
		});
	}

	Purchase.checkout = function(params, callback){
		
		$http.post('/a/shoppingcart/checkout?token='+params.token).success(function (data)
		{
			if (typeof callback == 'function') {
				console.log(data);
				callback(data);
			}
		});
	}

	Purchase.purchaseds = function(params, callback){
		
		if(typeof(params) == 'object'){
			params = utils.serialize(params);
		}

		$http.get('/a/purchased?'+params).success(function (data)
		{
			if (typeof callback == 'function') {
				console.log(data);
				callback(data);
			}
		});
	}
	
	return Purchase;
}]);


angular.module('nsApp.services.billing', []).factory('Billing', ['$http', function ($http)
{
	var Billing = {};
	Billing.get = function(callback)
	{

		$http.get('/a/billings').success(function(Billing){
			callback(Billing);
		});
		
	};

	Billing.getTypes = function(callback)
	{

		$http.get('/a/billingtypes').success(function(Billing){
			callback(Billing);
		});
		
	};

	
	return Billing;
}]);


angular.module('nsApp.services.config', []).factory('Config', ['$http', function ($http)
{
	var Config = {};
	Config.get = function(callback)
	{

		$http.get('/a/config.json').success(function(config){
			callback(config);
		});
		
	};

	
	return Config;
}]);


angular.module('nsApp.services.accountrecovery', []).factory('AccountRecovery', ['$http', function ($http)
{
	var AccountRecovery = {};
	AccountRecovery.getuser = function(token, callback)
	{
		$http.get('/a/recoveryaccount/'+token).success(function(data){
			callback(data);
		});
	};

	AccountRecovery.generatetoken = function(email, callback)
	{
		$http.post('/a/recoveryaccount', {email : email}).success(function(data){
			callback(data);
		});
		
	};

	AccountRecovery.redefine = function(params, callback)
	{
		$http.put('/a/recoveryaccount', params).success(function(data){
			callback(data);
		});
		
	};
	
	return AccountRecovery;
}]);
