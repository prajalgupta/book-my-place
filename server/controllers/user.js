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

export const BookProperty =  async(req, res, next) => {
    try{
        const userId = req.user.id;
        const {propertyId} =  req.body;

        const property = await properties.findById(propertyId);
        if(!property){
            return next(createError(404, "Property not found"));
        }
        const user = await User.findById(userId);
        if(!user){
            return next(createError(404, "user not found"));
        }

        if(!user.bookings.includes(propertyId)){
            user.bookings.push(propertyId);
            await user.save();
        }

        return res.status(200).json({message: "Property booked"});
    }catch(err){
        next(err);
    }
};

export const GetBookedProperty =  async(req, res, next) => {
    try{
        const userJWT = req.user;
        const user = await user.findById(userJWT.id).populate({
            path: "bookings",
            model: "Property",
        });
        const bookedProperty = user.purchased;
        return res.status(200).json(bookedProperty);
    }catch(err){
        next(err);
    }
};

export const AddToFavorites =  async(req, res, next) => {
    try{
        const { propertyId} = req.body;
        const userJWT = req.user;
        const user = await user.findById(userJWT.id);

        if(!user.favourites.includes(propertyId)){
            user.favourites.push(propertyId);
            await user.save();
        }
        return res
        .status(200)
        .json({message: "Property added to favorite sucessfully", user});
    }catch(err){
        next(err);
    }
};

export const RemoveFromFavorites =  async(req, res, next) => {
    try{
        const { propertyId} = req.body;
        const userJWT = req.user;
        const user = await user.findById(userJWT.id);
        user.favourites = user.favourites.filter((fav) => !fav.equals(propertyId));
        await user.save();
        return res
        .status(200)
        .json({message: "Property removed to favorite sucessfully", user});
    }catch(err){
        next(err);
    }
};

export const GetUserFavorites =  async(req, res, next) => {
    try{
        const userId = req.user.id;
        const user = await user.findById(userId).populate("favourites").exec();

        if(!user){
            return next(createError(404,"User not found"));
        }
        return res.status(200).json(user?.favourites);
    }catch(err){
        next(err);
    }
};