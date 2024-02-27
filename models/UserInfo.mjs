import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userInfoSchema = new Schema({
    firstname: {
        require: true,
        type: String
    },
    lastname: {
        require: true,
        type: String
    },
    userEmail: {
        require: true,
        type: String
    },
    userImg: String,
    cartsIdForBasket: {
        require: true,
        type: Array
    },
});

const UserInfo = model('userinfos', userInfoSchema);

export default UserInfo;