const express = require('express');
const zod = require('zod');
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('./authmiddleware.js');
const { JWT_SECRET } = require('../config.js');
const router = express.Router();

router.use(express.json());

const newUserSchema = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string()
});
const signinUserSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
});
const updateBody = zod.object({
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    password: zod.string().optional()
});


router.put("/", authMiddleware, async (req, res) => {              //put is generally used for updating database
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({ message: "Error while updating information" });
    }
    const user = await User.updateOne({ _id: req.userId }, req.body);
    res.json({ message: "User updated successfully" });
});

router.post("/signup", async (req, res) => {
    const { success } = newUserSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ error: "Email already taken / Incorrect inputs" });
    }
    
    const userexists = await User.findOne({ username: req.body.username });
    if (userexists) {
        return res.status(400).json({ error: "Email already taken" });
    }
    
    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstname,
        lastName: req.body.lastname
    });
    const newUserId = newUser._id;
    
    //creating new account for the user
    await Account.create({
        userId: newUserId,
        balance: 1 + Math.random() * 10000
    });

    const token = jwt.sign({ userId: newUserId }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token
    })
});

router.post("/signin", async (req, res) => {
    const { success } = signinUserSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({ error: "Incorrect inputs" });
    }

    const user = await User.findOne({ username: req.body.username });
    if (req.body.password !== user.password) {
        return res.status(411).json({ error: "Incorrect password" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    return res.status(200).json({
        message: "User signed in successfully",
        token
    });
});

//for search queries
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const user = await User.find({
        $or: [{
            firstName: { $regex: filter }
        }, {
            lastName: { $regex: filter }
        }]
    })

    res.json({
        user: user.map((user) => {
            return {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }
        })
    })

});

module.exports = router;