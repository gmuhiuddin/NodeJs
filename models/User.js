import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

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

userSchema.methods.updatePassword = async function (password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
};

const User = model('users', userSchema);

export default User;