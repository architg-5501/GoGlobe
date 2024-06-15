"use client";
import connectDB from "@/db";
import Hotel from "@/models/hotel-model";

export default async function handler(req, res) {
    await connectDB();
    console.log("request granted");
    if (req.method === "GET") {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ msg: "Hotel ID is required" });
        }

        try {
            const hotel = await Hotel.findById(id);
            console.log("this is the hotel ->", hotel);
            if (!hotel) {
                return res.status(404).json({ msg: "Hotel not found" });
            }

            return res.status(200).json({ msg: "Hotel found", hotel });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Internal server error" });
        }
    } else {
        return res.status(405).json({ msg: "Method not allowed" });
    }
}
