const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, emailId, password } = req.body;

    if(validator.isEmpty(firstName)){
        throw new Error("First Name is compulsory");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is invalid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password");
    }
};

module.exports = {
    validateSignUpData
};