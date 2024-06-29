import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config()

const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: {
        require: true,
        unique: true,
        type: String
    },
    password: {
        require: true,
        type: String,
        minlenght: 6
    },
    tokens: {
        default: [],
        type: []
    }
});

userSchema.pre("save", function (next) {
    const user = this;

    if(this.isModified('password')){
        const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;
    };

    next();
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function () {
    const jwtSecret = process.env.jwt_Secret;
    
    return jwt.sign({ _id: this._id }, jwtSecret);
};

const User = model('users', userSchema);

export default User;