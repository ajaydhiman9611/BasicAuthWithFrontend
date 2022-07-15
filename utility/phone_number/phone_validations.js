var PNT               = require('google-libphonenumber').PhoneNumberType;
var PNF = require('google-libphonenumber').PhoneNumberFormat;
var phoneUtil         = require('google-libphonenumber').PhoneNumberUtil.getInstance();
var CountryCodes      = require('./country_codes.js');

var INDIAN_MOBILE_NUMBER_REGEX = /^[6789]\d{9}$/;

exports.checkCountryCode = function(country_code){
	if(!country_code){
		return false;
	}
	if(isNaN(country_code)) {
		return false;
	}
	if(CountryCodes[country_code] == 'undefined'){
		return false;
	}
	return true;
}

exports.checkIndian = function(phone_number, country_code){
	if(country_code != "91"){
		return false;
	}
	if(isNaN(phone_number)) {
		return false;
	}
  return INDIAN_MOBILE_NUMBER_REGEX.test(phone_number);
};

exports.checkGeneric = function(phone_number, country_code){
	if(!country_code || !phone_number){
		return false;
	}
	if(isNaN(phone_number) || isNaN(country_code)) {
		return false;
	}
	if(CountryCodes[country_code] == 'undefined'){
		return false;
	}
	var parsedInput;
	try{
		parsedInput = phoneUtil.parseAndKeepRawInput(phone_number, CountryCodes[country_code]);
		var numType = phoneUtil.getNumberType(parsedInput);
		if(numType == PNT.MOBILE || numType == PNT.FIXED_LINE_OR_MOBILE){
			return true;
		}
		return false;
	} catch(e){
		console.log(e);
		console.log('phone_number : '+phone_number+' , country_code : '+country_code);
		return false;
	}
};

exports.checkPhoneNumber = function(phone_number, country_code){
	if(!country_code || !phone_number){
		return { 
			status : false
		};
	}
	if(isNaN(phone_number) || isNaN(country_code)) {
		return { 
			status : false
		};
	}
	if(country_code == "91"){
		return {
			status : INDIAN_MOBILE_NUMBER_REGEX.test(phone_number),
			ccode  : country_code,
			num    : phone_number
		};
	}
	if(CountryCodes[country_code] == 'undefined'){
		return { 
			status : false
		};
	}
	if(country_code == "64"){
		return {
			status : true,
			ccode  : country_code,
			num    : phone_number
		};
	}
	var parsedInput;
	try{
		parsedInput = phoneUtil.parse(phone_number, CountryCodes[country_code]);
		var numType = phoneUtil.getNumberType(parsedInput);
		if(numType == PNT.MOBILE || numType == PNT.FIXED_LINE_OR_MOBILE){
			return {
				status : true,
				ccode  : parsedInput.values_["1"],
				num    : parsedInput.values_["2"]
			};
		}
		return { 
			status : false
		};
	} catch(e){
		console.log(e);
		console.log('phone_number : '+phone_number+' , country_code : '+country_code);
		return { 
			status : false
		};
	}
};
