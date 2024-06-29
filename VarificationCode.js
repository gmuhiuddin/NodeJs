import mongoose from "mongoose";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config()

const { Schema, model } = mongoose;

const veriCodeSchema = new Schema({
    email: {
        required: true,
        unique: true,
        type: String
    },
    code: {
        required: true,
        type: Number,
        minlenght: 6
    },
    verified: {
        default: false,
        type: Boolean
    },
    expiryTime: {
        required: true,
        type: Number
    }
});

veriCodeSchema.methods.sendVerificationCode = async function () {

    const { email, code } = this;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.Smtp_User_Name,
            pass: process.env.Smtp_Password,
        },
    });

    const info = await transporter.sendMail({
        from: '"OLX-clone-verification-department" <olx.clone.veri.email>',
        to: email,
        subject: "Verification code", // Subject line
        text: `Your verification code is ${code}`, // plain text body
    });

    return info.messageId;
};

veriCodeSchema.methods.generateCode = function () {
    const code = Math.floor(100000 + Math.random() * 899999);
    
    return code;
};

const verificationCode = model('veriCode', veriCodeSchema);

export default verificationCode;