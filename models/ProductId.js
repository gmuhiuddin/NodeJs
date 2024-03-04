import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productIdSchema = new Schema({
    productId: {
        require: true,
        unique: true,
        type: Number
    }
});

const ProductId = model('productids', productIdSchema);

export default ProductId;