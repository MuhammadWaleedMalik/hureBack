"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DashboardSchema = new mongoose_1.Schema({
    Hero: { type: String, default: '' },
    AboutUs: { type: String, default: '' },
    coreDescription: { type: String, default: '' },
    hiredescription: { type: String, default: '' },
    namedescription: { type: String, default: '' },
    conectdescription: { type: String, default: '' }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Dashboard', DashboardSchema);
