const bcrypt = require('bcryptjs');
const config = require('./configs');


exports.createPassword = function( password ) { 
    // will return hashed password
    return bcrypt.hashSync(password , config.PASSWORD_HASH_ROUNDS);
}


exports.comparePassword = function( value1 , value2) { 
    // will return true or false for result
    return bcrypt.compareSync(value1 , value2);
}


exports.isPasswordStrong = function(password) { 
    // min 8 character length , one special symbol , one letter and one number required;
    // const compareExpression = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    // minimum 8 character without whitespace.
    const compareExpression = /^[^-\s]{8,20}$/;
    
    return compareExpression.test(password);
}