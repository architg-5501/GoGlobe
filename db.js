import mongoose from "mongoose";
const URI = "mongodb+srv://<username>:<password>@archit.rrghorm.mongodb.net/OYO?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("DB Connected...");
};

export default connectDB;
