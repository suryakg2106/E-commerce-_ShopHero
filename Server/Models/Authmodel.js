import mongoose from 'mongoose'
import bcrypt from "bcrypt"

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})


UserSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next();
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})
 UserSchema.methods.matchPassword=async function(plainPassword){
    return bcrypt.compare(plainPassword,this.password)
 }



export const User = mongoose.model('User',UserSchema)