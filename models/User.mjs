import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

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

userSchema.pre("save", function (next) {
    const user = this;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;

    next();
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const User = model('users', userSchema);

export default User;