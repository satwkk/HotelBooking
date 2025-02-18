import User from "../models/User.js";
import hashUtils from "../utils/hash.js";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: await hashUtils.hashPassword(req.body.password),
        });
        await newUser.save();
        res.status(201).send("User has been created.");
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        // Find the user in database
        const user = await User.findOne({username: req.body.username});
        if (!user) return next(createError(404, "user not found"));

        // Check if password is correct
        const isPasswordCorrect = await hashUtils.comparePassword(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "Invalid credentials."));

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);

        const { password, isAdmin, ...otherDetails } = user._doc;
        
        res
        .cookie("access_token", token, {httpOnly: true})
        .status(200)
        .send({...otherDetails});

    } catch (err) {
        next(err);
    }
};