import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {

    try {
        const {username, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json(user);

    } catch (err) {
        res.status(500).json(err);
        
    }
};


export const login = async (req, res) => {
    try {
        const { email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json('Password incorrect');
        }

        const token = jwt.sign(
            { id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token, user});
    } catch (err) {
        res.status(500).json(err);
        
    }
}