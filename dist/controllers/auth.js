"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, designation = '', description = '', address = '', phone = '', skills = [], role = 'user' } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email and password are required' });
    }
    try {
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const user = new User_1.default({
            name,
            email,
            password: hashedPassword,
            designation,
            description,
            address,
            phone,
            skills: Array.isArray(skills) ? skills : [skills].filter(Boolean),
            role
        });
        yield user.save();
        res.status(201).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error during registration' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET);
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                designation: user.designation || 'User'
            }
        });
    }
    catch (err) {
        console.error('Login error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
});
exports.loginUser = loginUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find()
            .select('-password -__v')
            .lean();
        const sanitizedUsers = users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            designation: user.designation || '',
            address: user.address || '',
            phone: user.phone || '',
            skills: user.skills || [],
            description: user.description || '',
        }));
        res.status(200).json({
            success: true,
            count: users.length,
            users: sanitizedUsers
        });
    }
    catch (err) {
        console.error('Get users error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching users'
        });
    }
});
exports.getAllUsers = getAllUsers;
