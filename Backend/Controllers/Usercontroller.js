const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/User');
const Organization = require('../Models/Organization');

const router = express.Router();

// LOGIN ✅
const userlogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({
            id: user._id,
            user_id: user.user_id,
            role: user.role,
            org_id: user.org_id,
            org_name: user.org_name
        }, process.env.JWT_SECRET);

        res.json({
            token,
            user_id: user.user_id,
            username: user.username,
            role: user.role,
            org_id: user.org_id,
            org_name: user.org_name
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Login failed' });
    }
};

// REGISTER ✅
const userregister =  async (req, res) => {
    try {
        const { user_id, username, password, role, org_id, org_name } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'Username already exists' });

        // Create or find organization
        let org = await Organization.findOne({ org_id });
        if (!org) {
            org = new Organization({ org_id, org_name });
            await org.save();
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            user_id,
            username,
            passwordHash,
            role,
            org_id: org.org_id,
            org_name: org.org_name
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Registration failed' });
    }
};

module.exports = {
    userlogin,
    userregister
};
