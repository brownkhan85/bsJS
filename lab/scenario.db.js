var invoker = require('./invoker'),
asyncQuery = function(q, p, cb){
	console.log('QUERY', q);
	console.log('PARAM', p);
	if (!q || !q.length) cb('error code : ERR101', null);
	else cb(null, [
		{name:'Hika Maeng', age:25},
		{name:'pekuid', age:25},
		{name:'Seonki Paik', age:20},
		{name:'Keiichi Sato', age:24}
	]);
};

var query = 'SELECT * FROM USER WHERE group=?',
param = ['projectBS'];

//일반적인 시나리오
invoker(
	'err', function(err){
		console.log(err);
	},
	'a', function( q, p ){
		asyncQuery(q,p, function(err, result){
			if(err) invoker.a_err(err);
			else invoker.b( query, param );
		});
	},
	'a_err', function(err){
		console.log('Query error');
		invoker.err(err);
	},
	'b', function( q, p ){
		asyncQuery( q, p, function(err, result){
			if(err) invoker.b_err(null, q1,p1);
			else console.log(result);
		});
	},
	'b_err', function(){
		//....
		invoke.err();
	}
);

invoker.a(query, param);
invoker.a(null, param);