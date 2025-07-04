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
exports.deleteJob = exports.getFilteredJobs = exports.getJobs = exports.addJob = void 0;
const Job_1 = __importDefault(require("../models/Job"));
const addJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job = yield Job_1.default.create(req.body);
        res.status(201).json({ success: true, data: job });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});
exports.addJob = addJob;
const getJobs = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield Job_1.default.find().sort({ postedAt: -1 });
        res.status(200).json({ success: true, data: jobs });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.getJobs = getJobs;
const getFilteredJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, type, location } = req.query;
        const filter = {};
        if (title)
            filter.title = { $regex: title, $options: 'i' };
        if (type)
            filter.type = type;
        if (location)
            filter.location = { $regex: location, $options: 'i' };
        const jobs = yield Job_1.default.find(filter).sort({ postedAt: -1 });
        res.status(200).json({ success: true, data: jobs });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.getFilteredJobs = getFilteredJobs;
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job = yield Job_1.default.findByIdAndDelete(req.params.id);
        if (!job)
            return res.status(404).json({ success: false, message: 'Job not found' });
        res.status(200).json({ success: true, message: 'Job deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.deleteJob = deleteJob;
