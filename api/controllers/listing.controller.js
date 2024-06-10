import Listing from '../models/listing.model.js'
import path from 'path';

export const createListing = async (req, res, next) => {
    try {
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
