import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';


const signUp = async (req, res, next) => {
    const { username, email, phone, password1 } = req.body;
    const hashedPassword = bcryptjs.hashSync(password1, 14);
    const newUser = new User({ username, email, phone, password:hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({ 'message': "User Created Successfully" });
    }
    catch (error) {
        next(error);
    }

}

export { signUp }