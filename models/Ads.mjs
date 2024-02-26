import mongoose from "mongoose";

const { Schema } = mongoose;

const AdsSchema = new Schema({
    title: String,
    description: {
        required: true,
        type: String
    },
    amount: Number
});

const Ads = mongoose.model('ads', AdsSchema);

export default Ads;