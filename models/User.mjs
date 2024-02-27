import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
    userName: {
        require: true,
        type: String
    },
    email: {
        require: true,
        unique: true,
        type: String
    },
    password: {
        require: true,
        type: String
    }
});

const User = model('users', userSchema);

export default User;