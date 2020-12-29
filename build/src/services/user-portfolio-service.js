"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPortfolioService = void 0;
const mongo_helper_1 = require("../helpers/mongo.helper");
const getCollection = () => {
    return mongo_helper_1.MongoHelper.client.db('sample_weatherdata').collection('data');
};
class UserPortfolioService {
    constructor() { }
    getUserPortfolios(uid) {
        const collection = getCollection();
        // return {uid:uid, portfolios :[]};
    }
}
exports.UserPortfolioService = UserPortfolioService;
