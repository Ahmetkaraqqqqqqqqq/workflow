'use strict';

/* Services */

var module = angular.module('admin_nsApp.services', []).
value('version', '0.1').
value('name', 'Arrange');


angular.module('admin_nsApp.services.user', []).factory('User', ['$http', function ($http)
{
	var User = {};

	User.getAll = function(callback){
		$http.get('/aa/users').success(function(users){
			if (typeof callback == 'function') {
				callback(users);
			};
		});
	};

	User.getCompanies = function(callback){
		$http.get('/aa/companies').success(function(companies){
			if (typeof callback == 'function') {
				callback(companies)
			};
		});
	}

	User.addUser = function(params, callback){
		$http.post('/aa/users', params).success(function(user){
			if (user.error === undefined) {
				if (typeof callback == 'function') {
					callback(user);
				}
			}else{
				alert(user.error);
			}
		});
	}

	User.getUser = function(id, callback){
		$http.get('/aa/users/'+id).success(function(user){
			if (user.error === undefined) {
				if (typeof callback == 'function') {

					console.log('service: ======= ', user)
					callback(user);
				}
			}
		});
	}

	User.editUser = function(params, body, callback){

		$http.put('/aa/users/'+params.id, params).success(function(data){
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					console.log('data', data)
					callback(data);
				}
			} 
		});
	}

	User.deleteUser = function(user, callback){

		$http.delete('/aa/users/'+user.id).success(function (data)
		{
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					console.log('data', data)
					callback(data);
				}
			} 
		});
	}
	
	return User;
}]);

angular.module('admin_nsApp.services.company', []).factory('Company', ['$http', function ($http)
{
	var Company = {};

	Company.get = function(callback){
		$http.get('/aa/companies').success(function(companies){
			if (typeof callback == 'function') {
				callback(companies)
			};
		});
	}

	Company.getCompany = function(id, callback){
		$http.get('/aa/companies?id='+id).success(function(company){
			if (company.error === undefined) {
				if (typeof callback == 'function') {
					callback(company);
				}
			}
		});
	}

	Company.add = function(params, callback){
		$http.post('/aa/companies', params).success(function(company){
			if (company.error === undefined) {
				if (typeof callback == 'function') {
					callback(company);
				}
			}else{
				alert("Já existe uma empresa cadastrada");
			} 
		});
	}

	Company.delete = function(params, callback){
		$http.delete('/aa/companies/'+params.id).success(function (data)
		{
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					console.log('data', data)
					callback(data);
				}
			} 
		});
	}

	Company.set = function(params, callback){
		console.log('service param', params);
		$http.put('/aa/companies/'+params.id, params).success(function(data){
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					console.log('data', data)
					callback(data);
				}
			} 
		});
	}

	Company.getGroups = function(callback){
		$http.get('/aa/groups').success(function(groups){
			if (typeof callback == 'function') {
				callback(groups);
			}
		});
	}
	
	/* SUB CATEGORIES */

	Company.getSubcategories = function(company_id, callback){

		$http.get('/aa/companies/subcategories?company_id=' + company_id).success(function(content){
			if (typeof callback == 'function') {
				callback(content);
			};
		});
	};
	
	Company.setSubcategories = function(params, callback){
		$http.post('/aa/companies/subcategories', params).success(function(data){
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					callback(data);
				}
			} 
		});
	}

	return Company;
}]);

angular.module('admin_nsApp.services.group', []).factory('Group', ['$http', function ($http)
{
	var Group = {};

	Group.getAll = function(callback){
		$http.get('/aa/groups').success(function(groups){
			if (typeof callback == 'function') {
				callback(groups)
			};
		});
	}


	Group.get = function(id, callback){
		$http.get('/aa/groups?id='+id).success(function(groups){
			if (typeof callback == 'function') {
				callback(groups)
			};
		});
	}

	Group.addGroup = function(params, callback){
		$http.post('/aa/groups', params).success(function(group){
			if (group.error === undefined) {
				if (typeof callback == 'function') {
					callback(group);
				}
			} 
		});
	}

	Group.edit = function(body, callback){

		$http.put('/aa/groups/'+body.id, body).success(function(data){
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					console.log('data', data)
					callback(data);
				}
			} 
		});
	}

	Group.deleteGroup = function(params, callback){
		$http.delete('/aa/groups/'+params.id).success(function (data)
		{
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					console.log('data', data)
					callback(data);
				}
			} 
		});
	}

	/* SUB CATEGORIES */

	Group.getSubcategories = function(group_id, callback){

		$http.get('/aa/groups/subcategories?group_id=' + group_id).success(function(content){
			if (typeof callback == 'function') {
				callback(content);
			};
		});
	};
	
	Group.setSubcategories = function(params, callback){
		$http.post('/aa/groups/subcategories', params).success(function(data){
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					callback(data);
				}
			} 
		});
	}
	
	return Group;
}]);

angular.module('admin_nsApp.services.content', []).factory('Content', ['$http', function ($http)
{
	var Content = {};

	Content.get = function(params, callback){

		params = utils.serialize(params);
		
		$http.get('/aa/contents?' + params).success(function(content){
			if (typeof callback == 'function') {
				/* arredondando o aspect para baixo pra poder fazer o teste no front */
				content[0].aspect = Math.floor(content[0].aspect); 
				callback(content);
			};
		});
	};

	Content.set = function(content, params, callback){

		params = utils.serialize(params);

		$http.post('/aa/contents?'+params, content).success(function(data){
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					callback(data);
				}
			}else{
				callback({'error:':'Error'})
			}
		}).error(function(err){
			console.log('error',err);
			callback({'error:':err})
		});
	}

	/* SUB CATEGORIES */

	Content.getSubcategories = function(content_id, callback){

		$http.get('/aa/contents/subcategories?content_id=' + content_id).success(function(content){
			if (typeof callback == 'function') {
				callback(content);
			};
		});
	};
	
	Content.setSubcategories = function(params, callback){
		$http.post('/aa/contents/subcategories', params).success(function(data){
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					callback(data);
				}
			} 
		});
	}

	/* SECURITY GROUPS */

	Content.setSecurityGroup = function(params, callback){
		$http.post('/aa/contents/securitygroupies', params).success(function(data){
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					callback(data);
				}
			} 
		});
	}

	Content.getSecurityGroup = function(content_id, callback){

		$http.get('/aa/contents/securitygroupies?content_id=' + content_id).success(function(content){
			if (typeof callback == 'function') {
				callback(content);
			};
		});
	};
	return Content;
}]);

angular.module('admin_nsApp.services.subcategory', []).factory('Subcategory', ['$http', function ($http)
{
	var Subcategory = {};

	Subcategory.get = function(params, callback){
		var route = '/aa/subcategories';

		if(params.id){
			route += '/'+params.id;
			delete params.id;
		}
		
		if(params){
			params = utils.serialize(params);	
		}else{
			params = ''
		}

		$http.get(route+'?'+params).success(function (data){
			if (typeof callback == 'function') {
				callback(data);
			};
		});
	};

	Subcategory.delete = function(params, callback){
		$http.delete('/aa/subcategories/'+params.id).success(function (data)
		{
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					console.log('data', data)
					callback(data);
				}
			} 
		});
	}

	Subcategory.save = function(params, callback){

		$http.post('/aa/subcategories', params).success(function(data){
			if (data) {
				if (typeof callback == 'function') {
					callback(data);
				}
			} 
		});
	}

	/* SECURITY GROUPS */

	Subcategory.setSecurityGroup = function(params, callback){
		$http.post('/aa/subcategories/securitygroupies', params).success(function(data){
			if (data.error === undefined) {
				if (typeof callback == 'function') {
					callback(data);
				}
			} 
		});
	}

	Subcategory.getSecurityGroup = function(subcategory_id, callback){

		$http.get('/aa/subcategories/securitygroupies?content_id=' + subcategory_id).success(function(data){
			if (typeof callback == 'function') {
				callback(data);
			};
		});
	};
	
	return Subcategory;
}]);


angular.module('admin_nsApp.services.requestcontent', []).factory('RequestContent', ['$http', function ($http)
{
	var RequestContent = {};

	RequestContent.get = function(params, callback){
		var route = '/aa/requestcontents';

		if(params.id){
			route += '/'+params.id;
			delete params.id;
		}
		
		if(params){
			params = utils.serialize(params);	
		}else{
			params = ''
		}

		$http.get(route+'?'+params).success(function (data){
      console.log(data)
			if (typeof callback == 'function') {
				callback(data);
			};
		});
	};
	
	return RequestContent;
}]);


angular.module('admin_nsApp.services.securitygroups', []).factory('SecurityGroups', ['$http', function ($http)
{
	var SecurityGroups = {};

	SecurityGroups.get = function(params, callback){

		params = utils.serialize(params);
		
		$http.get('/aa/securitygroups?' + params).success(function(SecurityGroups){
			if (typeof callback == 'function') {
				callback(SecurityGroups);
			};
		});
	};

	SecurityGroups.set = function(params, callback){
		$http.post('/aa/securitygroups	', params).success(function(user){
			if (user.error === undefined) {
				if (typeof callback == 'function') {
					callback(user);
				}
			} 
		});
	}
	
	return SecurityGroups;
}]);


angular.module('admin_nsApp.services.config', []).factory('Config', ['$http', function ($http)
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