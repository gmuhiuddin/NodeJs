import express from "express";
import verificationCode from "../models/VarificationCode.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ msg: "Successfully" })
});

router.put('/send-verification-code', async (req, res) => {

    try {
        const { body: { email } } = req;

        const verificationCodeDoc = await verificationCode.findOne({
            email
        });

        const code = verificationCodeDoc.generateCode();
        const nowTime = new Date().getTime();

        if (verificationCodeDoc) {
            verificationCodeDoc.code = code;
            verificationCodeDoc.expiryTime = nowTime + 300000;
            verificationCodeDoc.verified = false;
            await verificationCodeDoc.save();

            await verificationCodeDoc.sendVerificationCode();
        } else {
            const verificationCodeDoc = await verificationCode.create({
                email, code, expiryTime: nowTime + 300000
            });

            await verificationCodeDoc.sendVerificationCode();
        };


        res.send({ msg: 'Otp send successfully on email', complete: true });

    } catch (err) {
        res.send({ msg: err.message, complete: false });
    }
});

router.put('/verify-verification-code', async (req, res) => {
    ``

    try {
        const { body: { email, code } } = req;

        const verificationCodeDoc = await verificationCode.findOne({
            email, code
        });

        if (!verificationCodeDoc) return res.send({ msg: 'Invalid Otp!', complete: false });

        const isExpire = verificationCodeDoc.expiryTime < new Date().getTime();

        if (isExpire) return res.send({ msg: 'Otp expired!', complete: false });

        verificationCodeDoc.verified = true;
        await verificationCodeDoc.save();

        res.send({ msg: 'User verified successfully', complete: true });

    } catch (err) {
        res.send({ msg: err.message, complete: false });
    }
});

export default router;