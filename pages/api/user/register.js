import connectDB from "@/db";
import User from "@/models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method === "POST") {
        await connectDB();
        const { name, email, password } = req.body;
        console.log(name);
        console.log(email);
        console.log(password);
        if (!name || !password || !email) {
            return res.status(400).json({ msg: "all fields are mandatory!!" });
        }
        const emailExists = await User.findOne({ email: email });//or you can write {email}
        if (emailExists) {
            return res.status(400).json({ msg: "User is already registered by this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
        })

        const result = await newUser.save();
        const token = jwt.sign({ token: result._id }, "Code_AJ", { expiresIn: "30d" });
        return res.status(201).json({ msg: "Registered Successfully", token, user: result });

    }
    else
        return res.json({ msg: "server running" });
}