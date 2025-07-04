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
exports.deleteApplication = exports.getAllApplications = exports.applyForJob = void 0;
const JobApplication_1 = __importDefault(require("../models/JobApplication"));
const applyForJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jobId, fullName, email, phoneNumber, coverLetter, resumeUrl } = req.body;
        const newApplication = yield JobApplication_1.default.create({
            jobId,
            fullName,
            email,
            phoneNumber,
            coverLetter,
            resumeUrl,
        });
        res.status(201).json({ success: true, data: newApplication });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});
exports.applyForJob = applyForJob;
const getAllApplications = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applications = yield JobApplication_1.default.find()
            .populate('jobId', 'title type location')
            .sort({ appliedAt: -1 });
        res.status(200).json({ success: true, data: applications });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.getAllApplications = getAllApplications;
const deleteApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield JobApplication_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }
        res.status(200).json({ success: true, message: 'Application deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.deleteApplication = deleteApplication;
