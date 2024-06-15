"use client";
import connectDB from "@/db";
import Hotel from "@/models/hotel-model";

export default async function handler(req, res) {
    await connectDB();

    if (req.method === "GET") {


        try {
            const facilities = await Hotel.find({}).distinct('facilities.name');
            if (!facilities) {
                return res.status(404).json({ msg: "facilities not found" });
            }

            return res.status(200).json({ msg: "Facilities found", facilities });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Internal server error" });
        }
    } else {
        return res.status(405).json({ msg: "Method not allowed" });
    }
}
