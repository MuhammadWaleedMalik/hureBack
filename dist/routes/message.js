"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_1 = require("../controllers/auth");
router.post('/send', auth_1.registerUser);
router.get('/get', auth_1.loginUser);
exports.default = router;
