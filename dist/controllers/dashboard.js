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
exports.getMainComponents = exports.getLatestThreeUsers = exports.getAllUsers = exports.getAllClinics = exports.getTotalUserCount = exports.upsertMainComponents = void 0;
const Dashboard_1 = __importDefault(require("../models/Dashboard"));
const User_1 = __importDefault(require("../models/User"));
const updateDashboardSection = (dashboard, section, content) => {
    switch (section) {
        case 'Hero':
            dashboard.Hero = content;
            break;
        case 'AboutUs':
            dashboard.AboutUs = content;
            break;
        case 'coreDescription':
            dashboard.coreDescription = content;
            break;
        case 'hiredescription':
            dashboard.hiredescription = content;
            break;
        case 'namedescription':
            dashboard.namedescription = content;
            break;
        case 'conectdescription':
            dashboard.conectdescription = content;
            break;
        default:
            throw new Error(`Invalid section: ${section}`);
    }
};
const upsertMainComponents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updates = req.body;
        if (!updates || typeof updates !== 'object') {
            return res.status(400).json({ error: "Request body must be an object with section updates" });
        }
        const validSections = [
            'Hero',
            'AboutUs',
            'coreDescription',
            'hiredescription',
            'namedescription',
            'conectdescription'
        ];
        let dashboard = (yield Dashboard_1.default.findOne()) || new Dashboard_1.default({});
        for (const [section, content] of Object.entries(updates)) {
            if (validSections.includes(section)) {
                updateDashboardSection(dashboard, section, content);
            }
        }
        yield dashboard.save();
        return res.json({
            success: true,
            message: "Sections updated successfully",
            updatedSections: updates
        });
    }
    catch (error) {
        console.error('Error updating sections:', error);
        return res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to update content sections"
        });
    }
});
exports.upsertMainComponents = upsertMainComponents;
const getTotalUserCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield User_1.default.countDocuments();
        res.json({ totalUsers: count });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get user count" });
    }
});
exports.getTotalUserCount = getTotalUserCount;
const getAllClinics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clinics = yield User_1.default.find({ role: "Clinic" });
        res.json({ clinics });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get clinics" });
    }
});
exports.getAllClinics = getAllClinics;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({ role: "user" });
        res.json({ users });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get users" });
    }
});
exports.getAllUsers = getAllUsers;
const getLatestThreeUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find().sort({ createdAt: -1 }).limit(3);
        res.json({ latestUsers: users });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get latest users" });
    }
});
exports.getLatestThreeUsers = getLatestThreeUsers;
const getMainComponents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dashboard = yield Dashboard_1.default.findOne();
        const defaultSections = {
            Hero: '',
            AboutUs: '',
            coreDescription: '',
            hiredescription: '',
            namedescription: '',
            conectdescription: '',
            _id: '',
            __v: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        if (!dashboard) {
            return res.json(defaultSections);
        }
        res.json({
            Hero: dashboard.Hero || '',
            AboutUs: dashboard.AboutUs || '',
            coreDescription: dashboard.coreDescription || '',
            hiredescription: dashboard.hiredescription || '',
            namedescription: dashboard.namedescription || '',
            conectdescription: dashboard.conectdescription || ''
        });
    }
    catch (error) {
        console.error('Error getting sections:', error);
        res.status(500).json({
            success: false,
            error: "Failed to get content sections"
        });
    }
});
exports.getMainComponents = getMainComponents;
