import express from "express";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import User from '../models/User.js';
import { verifyToken } from '../middleWares/index.js'

const router = express.Router();
dotenv.config();

const sendOtp = async (email, code) => {

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
        html: `<b>Your verification code is <a href="#">${code}</a></b>`, // html body
    });

    return info.messageId;
};

router.put('/login', async (req, res) => {
    try {
        const { body: { email, password } } = req;

        const data = await User.findOne({
            email
        });

        if (!data) {
            res.send({ msg: 'email not found!' });
            return;
        };

        const isCorrect = data.comparePassword(password);

        if (!isCorrect) return res.send({ msg: 'Incorrect password' });

        const token = data.generateToken();

        data.tokens.push(token);

        await data.save();

        res.cookie('jwtoken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        });

        res.send({ msg: 'user found successfully', uid: data._id });

    } catch (err) {
        res.send({ msg: err.message });
    }

});

router.post('/signup', async (req, res) => {

    try {
        const data = await User.create({
            ...req.body
        });

        // generate a token

        const token = data.generateToken();

        data.tokens.push(token);

        await data.save();

        // ab token ko db mai save karana hai

        console.log(token);

        res.cookie('jwtoken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        });
        res.send({ msg: 'user added successfully', uid: data._id });

    } catch (err) {
        res.send({ msg: err.message });
    }
});

router.put('/logout', verifyToken, async (req, res) => {
    try {

        const { user: { _id: uid }, tokenForRemove } = req;

        await User.findByIdAndUpdate(uid, {
            $pull: {
                tokens: tokenForRemove
            }
        });

        res.clearCookie('jwtoken');
        res.send({ msg: 'user logout successfully' })
    } catch (err) {
        res.send({ msg: err.message });
    }

});

router.get('/checktoken', verifyToken, async (req, res) => {
    try {
        res.send({ msg: 'user find successfully', uid: req.user._id });

    } catch (err) {
        res.send({ msg: err.message });
    }
});

router.get('/sendemail/:email/:otp', async (req, res) => {

    try {
        const { params: { email, otp } } = req;

        const data = await User.findOne({
            email
        });

        if (!data) {
            res.send({ msg: 'Email not found', complete: false });
            return;
        };

        const messageId = await sendOtp(email, otp);

        res.send({ msg: 'Otp send successfully on email', messageId, complete: true });

    } catch (err) {
        res.send({ msg: err.message, complete: false });
    }
});

router.put('/updatepass/:email/:newPass', async (req, res) => {

    try {
        const { params: { email, newPass } } = req;

        const data = await User.findOne({
            email
        });

        data.password = newPass;

        await data.save()

        res.send({ msg: 'Password updated successfully', complete: true });


    } catch (err) {
        res.send({ msg: err.message, complete: false });
    }
});

router.delete('/remove/:id', async (req, res) => {

    try {
        await User.findByIdAndDelete(req.params.id);

        res.send({ msg: 'user deleted successfully' });
    } catch (err) {
        res.send({ msg: err.message });
    }

});

export default router;