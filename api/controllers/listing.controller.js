import Listing from '../models/listing.model.js'
import path from 'path';
import fs from 'fs';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
    try {
        console.log(req.body)
        console.log(req.files)
        const images = req.files.map(file => ({
            file: path.relative('api', file.path),
            filename: file.originalname,
            contentType: file.mimetype
        }));
        const listing = await Listing.create({
            "title": req.body.title,
            "description": req.body.description,
            "address": req.body.address,
            "city": req.body.city,
            "state": req.body.state,
            "price": req.body.price,
            "brokerage": req.body.brokerage,
            "bathrooms": req.body.bathrooms,
            "bedrooms": req.body.bedrooms,
            "furnished": req.body.furnished,
            "parking": req.body.parking,
            "type": req.body.type,
            "available": true,
            "listedFor": req.body.listedFor,
            "user": req.body.user,
            "images": images
        });
        return res.status(201).json({ message: "Property Listed Successfully", data: listing });
    } catch (error) {
        console.log(error);
        next(error);
    }
}


export const updateListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id)
        if (!listing) {
            return next(errorHandler(404, "Property not found"));
        }
        if (req.user.id != listing.user) {
            return next(errorHandler(401, "You can only update your own listings!"));
        }
        listing.images.forEach((image) => {
            const imagePath = path.join('api', image.file);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    return next(errorHandler(500, "Error Updating Property Try again"))
                }
            });
        });
        const images = req.files.map(file => ({
            file: path.relative('api', file.path),
            filename: file.originalname,
            contentType: file.mimetype
        }));
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                price: req.body.price,
                brokerage: req.body.brokerage,
                bathrooms: req.body.bathrooms,
                bedrooms: req.body.bedrooms,
                furnished: req.body.furnished,
                parking: req.body.parking,
                type: req.body.type,
                available: req.body.available,
                listedFor: req.body.listedFor,
                user: req.body.user[0],
                images: images
            }
        },
            { new: true });
        return res.status(200).json({ message: "Property Updated Successfully",data:updatedListing });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const deleteListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id)
        if (!listing) {
            return next(errorHandler(404, "Property not found"));
        }
        if (req.user.id != listing.user) {
            return next(errorHandler(401, "You can only delete your own listings!"));
        }
        listing.images.forEach((image) => {
            const imagePath = path.join('api', image.file);
            fs.unlink(imagePath, async (err) => {
                if (err) {
                    return next(errorHandler(500, "Error Deleting Property Try again"))
                }
            });
        });
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("Property Deleted");
    } catch (error) {
        next(error)
    }
}

export const getListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, "Property not found"));
        }
        res.status(200).json(listing);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);

    }
}
