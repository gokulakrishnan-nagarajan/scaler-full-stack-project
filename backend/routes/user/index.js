const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../../db/models/users");
const authMiddleware = require("../../middlewares/authentication");

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
            });
        }
    } catch (err) {
        console.log("Error", err);

        res.status(400).send({
            success: false,
            message: "User registration failed. Please try again.",
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
                    message: "Logged in successfully.",
                    token: jwtToken,
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: "Incorrect password.",
                });
            }
        }
    } catch (err) {
        console.log("Error", err);

        res.status(400).send({
            success: false,
            message: "Log in failed. Please try again.",
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
            data: user,
        });
    } catch (err) {
        console.log("Error", err);

        res.status(400).send({
            success: false,
            message: "User details fetch failed.",
        });
    }
});

module.exports = router;
