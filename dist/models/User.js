"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        enum: ['user', 'Clinic'],
        default: 'user'
    },
    designation: {
        type: String,
        max: 255,
        default: ''
    },
    description: {
        type: String,
        max: 1024,
        default: ''
    },
    address: {
        type: String,
        max: 512,
        default: ''
    },
    phone: {
        type: String,
        max: 15,
        default: ''
    },
    skills: {
        type: [String],
        default: []
    }
});
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
