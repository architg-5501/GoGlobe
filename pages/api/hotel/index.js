import connectDB from "@/db";
import Hotel from "@/models/hotel-model";

export default async function handler(req, res) {
    await connectDB();

    if (req.method === "POST") {
        try {
            console.log("Request Body:", req.body);
            const newHotel = new Hotel(req.body);
            const result = await newHotel.save();
            return res.status(201).json({ msg: 'Hotel added!', result });
        } catch (error) {
            console.error("Error saving hotel:", error);
            return res.status(500).json({ msg: 'Error adding hotel', error: error.message });
        }
    }

    if (req.method === "GET") {
        try {

            let location = req.query.city;
            console.log(location);
            if (location) {
                let hotels = await Hotel.find({ location });
                console.log(hotels.length);
                if (hotels.length > 0) {
                    return res.status(200).json({ "msg": "Hotels founded", hotels });
                }

                hotels = await Hotel.find({});
                return res.status(200).json({ "msg": "Hotels not founded of the particular location", hotels });
            }
        } catch (error) {
            console.error("Error saving hotel:", error);
            return res.status(500).json({ msg: 'Error adding hotel', error: error.message });
        }
    }



}

