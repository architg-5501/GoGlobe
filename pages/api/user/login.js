import connectDB from "@/db";
import User from "@/models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method === "POST") {
        await connectDB();
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "All Fields Required" });
        }

        const emailExists = await User.findOne({ email });

        if (!emailExists) {
            return res.status(400).json({ msg: "Email not Registered" });
        }

        const passwordMatched = await bcrypt.compare(password, emailExists.password);

        if (!passwordMatched) {
            return res.status(400).json({ msg: "INvalid Email or Password" });
        }

        const token = jwt.sign({ token: emailExists._id }, "Code_AJ", { expiresIn: "30d" });
        return res.status(201).json({ msg: "login successfully", token });

    }
}