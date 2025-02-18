import User from '../models/User.js';
import hashUtil from '../utils/hash.js'

export const updateUser = async (req, res, next) => {
    try {
        const { password, ...rest } = req.body;
        const hash = await hashUtil.hashPassword(password);

        const updatedModel = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: {...rest}, password: hash },
            { new: true }
        );
        res.status(200).json(updatedModel);
    } catch (err) {
        next(err);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(
            req.params.id
        );
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        res.status(200).json("User deleted: " + req.params.id);
    } catch (err) {
        next(err);
    }
};
