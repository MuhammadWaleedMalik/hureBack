"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const application_1 = require("../controllers/application");
const router = express_1.default.Router();
router.post('/apply', application_1.applyForJob);
router.get('/get', application_1.getAllApplications);
router.delete('/delete/:id', application_1.deleteApplication);
exports.default = router;
