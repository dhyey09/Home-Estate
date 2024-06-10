import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'

export const updateUser = async (req, res, next) => {
    if (req.user.id != req.params.id) return next(errorHandler(401, "You can only update your details"));
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 14)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
            }
        }, { new: true })
        const { password, ...rest } = updatedUser._doc
        res.status(200).json(rest);
    }
    catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id != req.params.id) return next(errorHandler(401, "You can only delete your own account!"));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account Deleted!").clearCookie('access_token');
        res.status(200).json(listings)
    } catch (error) {
        next(error)
    }
}

export const getUserListings = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You can only view your own listings!"));
    try {
        const listings = await Listing.find({ user: req.params.id })
        console.log(listings)
        res.status(200).json(listings)
    } catch (error) {
        next(error)
    }
}