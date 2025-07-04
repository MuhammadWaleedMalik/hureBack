"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_1 = require("../controllers/auth");
router.post('/register', auth_1.registerUser);
router.post('/login', auth_1.loginUser);
router.get('/get', auth_1.getAllUsers);
exports.default = router;
