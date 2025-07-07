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
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const connect_1 = require("./db/connect");
const not_found_1 = require("./middleware/not-found");
const error_handler_1 = require("./middleware/error-handler");
const auth_1 = __importDefault(require("./routes/auth"));
const protected_1 = __importDefault(require("./routes/protected"));
const application_1 = __importDefault(require("./routes/application"));
const connect_2 = __importDefault(require("./routes/connect"));
const job_1 = __importDefault(require("./routes/job"));
const dicussion_1 = __importDefault(require("./routes/dicussion"));
const event_1 = __importDefault(require("./routes/event"));
const message_1 = __importDefault(require("./routes/message"));
const free_1 = __importDefault(require("./routes/free"));
const help_1 = __importDefault(require("./routes/help"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
app.use((0, morgan_1.default)('dev'));
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/api/user', auth_1.default);
app.use('/api/protected', protected_1.default);
app.use('/api/application', application_1.default);
app.use('/api/job', job_1.default);
app.use('/api/dicussion', dicussion_1.default);
app.use('/api/event', event_1.default);
app.use('/api/message', message_1.default);
app.use('/api/connect', connect_2.default);
app.use('/api/free', free_1.default);
app.use('/api/help', help_1.default);
app.use(not_found_1.notFound);
app.use(error_handler_1.errorHandlerMiddleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield (0, connect_1.connectDB)(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server listening on port ${port} and  ${result}...`));
    }
    catch (err) {
        console.log(err);
    }
});
start();
