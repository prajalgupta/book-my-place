import User from "../models/user.js";
import properties from "../models/properties.js"
import {createError} from "../error.js"
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

export const SignUp =  async(req, res, next) => {
    try{
        const {email, password, name} = req.body;

        const existinguser = await User.findOne({email}).exec();
        if(existinguser){
            return next(createError(409, "Email is already i use"));
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        const createdUser = await user.save();
        const token = jwt.sign({id: createdUser._id}, process.env.JWT,{expiresIn : "9999 years",});
        return res.status(201).json({token, user});
        
    }catch(err){
        next(err);
    }
};

export const SignIn =  async(req, res, next) => {
    try{
        const {email, password, name} = req.body;
        const user = await User.findOne({email}).exec();
        if(!user){
            return next(createError(409, "user not found"));
        }
        const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
        if(!isPasswordCorrect){
            return next(createError (403, "Incorrect password"));
        }
        const token = jwt.sign({id: createdUser._id}, process.env.JWT,{expiresIn : "9999 years",});
        return res.status(201).json({token, user});
    }catch(err){
        next(err);
    }
};