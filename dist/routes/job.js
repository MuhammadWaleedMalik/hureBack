"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const job_1 = require("../controllers/job");
const router = express_1.default.Router();
router.post('/add', job_1.addJob);
router.get('/get', job_1.getJobs);
router.get('/search', job_1.getFilteredJobs);
router.delete('/delete/:id', job_1.deleteJob);
exports.default = router;
