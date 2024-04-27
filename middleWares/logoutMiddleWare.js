import dotenv from "dotenv";
import jwt, { decode } from "jsonwebtoken";
import User from "../models/User.js";

dotenv.config();

const logoutMiddleWare = async (req, res, next) => {

    try {
        const token = req.headers?.authentication.slice(7);

        const secret = process.env.jwt_Secret;

        const decoded = jwt.verify(token, secret);

        if (!decoded) return res.status(400).send({ msg: "Invalid token!" });

        const user = await User.findOne({
            tokens: token,
            _id: decoded._id
        });

        if (!user) return res.status(400).send({ msg: "Invalid token!" });

        req.uid = decoded._id;
        req.token = token;

        next();
    } catch (err) {
        res.status(400).send({ msg: err })
    }

};

export { logoutMiddleWare };