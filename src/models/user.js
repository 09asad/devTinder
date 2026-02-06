const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        minLengt: 4,
        maxLength: 50,
        required: true
    },
    lastName : {
        type: String
    },
    emailId : {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address:" + value);
            }
        },
    },
    password : {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error(value +" is not a strong password! Please enter a strong password");
            }
        },
    },
    age : {
        type: Number,
        min: 18
    },
    gender : {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    isActive : {
        type: Boolean
    },
    photoURL:{
        type: String,
        default: "http://defaultprofileimage.jpg"
    },
    about:{
        type: String,
        default: "This is a default about of the user!"
    },
    skills:{
        type: [String]
    }
},
{
    timestamps : true
});

userSchema.methods.getJWT = async function(){
    const user = this;

    const token = await jwt.sign({ _id : user._id }, "DEV@Tinder$698",{          // jwt.sign( payload, secretKey)
        expiresIn: '7d',
    });

    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;