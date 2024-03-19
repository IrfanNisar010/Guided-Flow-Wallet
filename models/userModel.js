const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");


const userSchema = new mongoose.Schema ({
    _id: {
        type: String,
        default: uuidv4 
    },

    FirstName: {
        type:String,
        required:true
    },
    LastName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique: true 
    },
    password: {
        type:String,
        required:true
    },
    is_admin: {
        type:Number,
        required:true
    },
    is_verified: {
        type:Number,
        default:1
    },
    registrationDate: {
        type: Date,
        default: Date.now,
        toJSON: { 
            virtuals: true, 
            transform: function(doc, ret) {
                ret.registrationDate = ret.registrationDate.toDateString(); 
                return ret;
            }
        }
    }    
});

module.exports = mongoose.model('User',userSchema)