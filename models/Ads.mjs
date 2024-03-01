import mongoose from "mongoose";

const { Schema } = mongoose;

const AdsSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    category: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: Number
    },
    discountPercentage: {
        required: true,
        type: Number
    },
    firstname: {
        required: true,
        type: String
    },
    lastname: {
        required: true,
        type: String
    },
    images: {
        required: true,
        type: Array
    },
    latitude: {
        required: true,
        type: String
    },
    longitude: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: String
    },
    productId: {
        required: true,
        type: String
    },
    rating: {
        required: true,
        type: Number
    },
    thumbnail: {
        required: true,
        type: String
    },
    userId: {
        required: true,
        type: String
    },
    userImg: String
});

const Ads = mongoose.model('ads', AdsSchema);

export default Ads;