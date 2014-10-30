var util     = require('util')
var OAuth    = require('oauth').OAuth;
var fs       = require("fs");
var baseURL = "https://api.xero.com";

var chai        = require('chai'),
    assert      = chai.assert,
    expect      = chai.expect;


var CONSUMER_KEY = 'PXQ2RCRJBCZYSDHKDLEFO5CNITMDPW';
var CONSUMER_SECRET = 'PZMXSPV9P7CGY4X8X6J1FZTQIQMPI2';

var consumer_token      = CONSUMER_KEY;
var consumer_secret     = CONSUMER_SECRET;
var access_token        = consumer_token;
var access_token_secret = consumer_secret;
 
describe('Xero Test Suite', function(){

	this.timeout(30000);
	
	it('USERS - Check Status OK using GET',function(done) {
		fs.readFile("certs/privatekey.pem", "utf8", function(e, rsaPrivateKey) {
		    if (e) {
			util.puts(e);
			return;
		    }
		 
		    var oa = new OAuth(
			baseURL + "/oauth/RequestToken",
			baseURL + "/oauth/AccessToken",
			consumer_token,
			rsaPrivateKey,
			"1.0",
			null,
			"RSA-SHA1"
		    )
		 
		    var url = baseURL + "/api.xro/2.0/Users";
		 
		    oa.getProtectedResource(url, "GET", access_token, access_token_secret, function (error, data, response) {
				if(error){
					util.puts(error);
				}
				util.puts(data);
				expect(data).to.contain("<Status>OK</Status>");
				expect(data).to.contain("<EmailAddress>gprieto707@hotmail.com</EmailAddress>");
				
				done();	
		    });
		});
	});	


	it('USERS - Check error when CONSUMER KEY is missing',function(done) {
		fs.readFile("certs/privatekey.pem", "utf8", function(e, rsaPrivateKey) {
		    if (e) {
			util.puts(e);
			return;
		    }
		 
		    var oa = new OAuth(
			baseURL + "/oauth/RequestToken",
			baseURL + "/oauth/AccessToken",
			consumer_token,
			rsaPrivateKey,
			"1.0",
			null,
			"RSA-SHA1"
		    )
		 
		    var url = baseURL + "/api.xro/2.0/Users";
		 
		    oa.getProtectedResource(url, "GET", '', access_token_secret, function (error, data, response) {
				if(error){
					util.puts(error);
				}
				util.puts(data);
				expect(data).to.not.contain("<Status>OK</Status>");
				done();	
		    });
		});
	});	


	it('USERS - Check error when selected Feature is not defined' ,function(done) {
		fs.readFile("certs/privatekey.pem", "utf8", function(e, rsaPrivateKey) {
		    if (e) {
			util.puts(e);
			return;
		    }
		 
		    var oa = new OAuth(
			baseURL + "/oauth/RequestToken",
			baseURL + "/oauth/AccessToken",
			consumer_token,
			rsaPrivateKey,
			"1.0",
			null,
			"RSA-SHA1"
		    )
		 
		    var url = baseURL + "/api.xro/2.0/NotExist";
		 
		    oa.getProtectedResource(url, "GET", access_token , access_token_secret , function (error, data, response) {
				if(error){
					util.puts(error);
				}
				util.puts(data);
				expect(data).to.not.contain("<Status>OK</Status>");
				done();	
		    });
		});
	});	


});