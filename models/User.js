const mongoose=require("mongoose")
const roleName= require("./enums/role")
const userActive= require("./enums/userActive")

const userSchema = new mongoose.Schema(
    {
        firstname:{
            type: String,
            required: true
        },
        
        lastname:{
            type: String,
            required: true
        },
        
        email:{
            type: String,
            required: true
        },
        
        password:{
            type: String,
            required: true
        },
        role: {
            type :String,
            enum :roleName,
            default: roleName.CLIENT  //default value for client if not specified
        },
        
        isActive: {
            type :String,
            enum :userActive,
            default: userActive.INACTIVE  //default value for inactive if not specified
        },
        verificationCode: {
            type: String
        }

    },{
        timestamps:true
    }
) 

module.exports  = mongoose.model("User",userSchema)