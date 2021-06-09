//https://www.codegrepper.com/code-examples/javascript/mongoose+data+type+integer
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    first_name:{
        type:String,
        required:[true , 'First Name is required'],
        minlenght:[2 , 'First name must be greater than from 2 character.'],
        maxlenght:[15 , 'First name must be greater than from 15 character.']
    },
    last_name:{
        type:String,
        required:[true , 'Last Name is required'],
        minlenght:[2 , 'Last name must be greater than from 2 character.'],
        maxlenght:[15 , 'Last name must be greater than from 15 character.']
    },
    email:{
        type:String,
        required:[true , 'Last Name is required'],
        maxlenght:[150 , 'Last name must be greater than from 15 character.']
    },
    email:{
        type:String,
        required:[true , 'Email id is required'],
    },
    password:{
        type:String,
    }, 
},
{ timestamps: true }
);

const User = mongoose.model('users',userSchema);
module.exports = User;