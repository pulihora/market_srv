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
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const user_portfolio_1 = require("./routes/user-portfolio");
const mongo_helper_1 = require("./helpers/mongo.helper");
// rest of the code remains same
const app = express_1.default();
const PORT = 8000;
//options for cors midddleware
const options = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false,
};
//use cors middleware
app.use(cors_1.default(options));
//add your routes
//enable pre-flight
app.options('*', cors_1.default(options));
app.use(body_parser_1.json());
app.use(user_portfolio_1.userPortfoliosRouter);
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongo_helper_1.MongoHelper.connect(`mongodb+srv://mgnath:SXjE7gtPoB2vnrDz@portfoliorepo.qttpn.mongodb.net/sample_training?retryWrites=true&w=majority`);
        console.info(`Connected to Mongo!`);
    }
    catch (err) {
        console.error(`Unable to connect to Mongo!`, err);
    }
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
}));
