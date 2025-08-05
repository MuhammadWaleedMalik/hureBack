"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboard_1 = require("../controllers/dashboard");
const router = express_1.default.Router();
router.get('/total-users', dashboard_1.getTotalUserCount);
router.get('/clinics', dashboard_1.getAllClinics);
router.get('/users', dashboard_1.getAllUsers);
router.get('/latest-users', dashboard_1.getLatestThreeUsers);
router.post('/upsert-main-components', dashboard_1.upsertMainComponents);
router.get('/main-components', dashboard_1.getMainComponents);
exports.default = router;
