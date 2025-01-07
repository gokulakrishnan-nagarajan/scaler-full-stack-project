const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../../db/models/users");
const authMiddleware = require("../../middlewares/authentication");
const { NOTIFICATION_TYPE } = require("../../constants/notification");

const router = express.Router();

// Create user

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            res.send({
                success: true,
                message: "User already registered. Please login.",
                type: NOTIFICATION_TYPE.INFO,
            });
        } else {
            const salt = bcrypt.genSaltSync();
            const hashedPassword = bcrypt.hashSync(password, salt);

            req.body.password = hashedPassword;

            const newUser = new UserModel(req.body);

            await newUser.save();

            res.send({
                success: true,
                message: "User successfully registered. Please login.",
                type: NOTIFICATION_TYPE.SUCCESS,
            });
        }
    } catch (err) {
        console.log("Error", err);

        res.status(400).send({
            success: false,
            message: "User registration failed. Please try again.",
            type: NOTIFICATION_TYPE.ERROR,
        });
    }
});

// Login user

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            res.status(400).send({
                success: false,
                message: "User not found. Please register.",
                type: NOTIFICATION_TYPE.WARNING,
            });
        } else {
            const isPasswordSame = bcrypt.compareSync(password, user.password);

            if (isPasswordSame) {
                const jwtToken = jwt.sign(
                    { userId: user._id },
                    process.env.jwtKey,
                    {
                        expiresIn: "1d",
                    }
                );

                res.send({
                    success: true,
                    message: "Logged in successfully",
                    type: NOTIFICATION_TYPE.SUCCESS,
                    token: jwtToken,
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: "Incorrect password",
                    type: NOTIFICATION_TYPE.ERROR,
                });
            }
        }
    } catch (err) {
        console.log("Error", err);

        res.status(400).send({
            success: false,
            message: "Log in failed. Please try again.",
            type: NOTIFICATION_TYPE.ERROR,
        });
    }
});

// Get user details

router.get("/details", authMiddleware, async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userId).select(
            "name email -_id"
        );

        res.send({
            success: true,
            message: "User details fetched successfully",
            type: NOTIFICATION_TYPE.SUCCESS,
            data: user,
        });
    } catch (err) {
        console.log("Error", err);

        res.status(400).send({
            success: false,
            message: "User details fetch failed",
            type: NOTIFICATION_TYPE.ERROR,
        });
    }
});

module.exports = router;
