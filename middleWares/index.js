import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

dotenv.config();

const verifyToken = async (req, res, next) => {

    try {
        const token = req.cookies?.token;

        if (!token) return res.status(400).send({ msg: "Invalid token!" });

        const secret = process.env.jwt_Secret;

        const decoded = jwt.verify(token, secret);

        if (!decoded) return res.status(400).send({ msg: "Invalid token!" });

        const user = await User.findOne({
            tokens: token,
            _id: decoded._id
        });

        if (!user) return res.status(400).send({ msg: "Invalid token!" });

        req.user = user;
        req.tokenForRemove = token;

        next();

    } catch ({ message }) {
        res.send({ msg: "Invalid token!" })
    }

};

// const checkTokenMiddleWare = async (req, res, next) => {

//     try {
//         const token = req.cookies?.token;

//         if (!token) return res.status(400).send({ msg: "Invalid token!" });

//         const secret = process.env.jwt_Secret;

//         const decoded = jwt.verify(token, secret);

//         if (!decoded) return res.status(400).send({ msg: "Invalid token!" });

//         const data = await User.findOne({
//             tokens: token,
//             _id: decoded._id
//         });

//         if (!data) return res.status(400).send({ msg: "Invalid token!" });

//         req.uid = data._id;

//         next();
//     } catch (err) {
//         res.status(400).send({ msg: "Invalid token!" })
//     }

// };

const authForApiMiddleWare = async (req, res, next) => {

    try {
        const token = req.headers?.authentication.slice(7);

        const apiAuths = process.env.api_auths;

        const authentic = apiAuths.includes(token);

        if (!authentic) return res.status(400).send({ msg: "Invalid token!" });

        next();
    } catch (err) {
        res.status(400).send({ msg: "Invalid token!" })
    }

};

export { verifyToken, authForApiMiddleWare };