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
exports.userPortfoliosRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const mongo_helper_1 = require("../helpers/mongo.helper");
const { v4: uuidv4 } = require('uuid');
const getCollection = () => {
    return mongo_helper_1.MongoHelper.client.db('portfolios').collection('user_portfolios');
};
const router = express_1.default.Router();
exports.userPortfoliosRouter = router;
router.get('/api/user-porfolios/:uid', (req, resp) => {
    const collection = getCollection();
    const result = collection.find({ "g_uid": req.params.uid }).toArray((err, items) => {
        if (err) {
            resp.status(500);
            resp.end();
            console.error('Caught error', err);
        }
        else {
            // items = items.map((item) => { return { id: item._id, p_name : item.p_name}; });
            resp.json(items);
        }
    });
});
router.get('/api/user-porfolios/:uid/:pid', (req, resp) => {
    const collection = getCollection();
    const result = collection.find({ "g_uid": req.params.uid, "_id": new mongodb_1.ObjectId(req.params.pid) }).toArray((err, items) => {
        if (err) {
            resp.status(500);
            resp.end();
            console.error('Caught error', err);
        }
        else {
            resp.json(items);
        }
    });
});
router.put('/api/user-porfolios/:uid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = getCollection();
    const doc = { g_uid: req.params.uid, p_name: req.body.portfolioName, transactions: [] };
    const result = yield collection.insertOne(doc);
    return res.json(result.ops);
}));
router.put('/api/user-porfolios/:uid/:pid/addtrans', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('adding transaction');
    const collection = getCollection();
    const result = collection.updateOne({
        g_uid: req.params.uid,
        _id: new mongodb_1.ObjectId(req.params.pid)
    }, {
        $push: {
            transactions: {
                "tid": uuidv4(),
                "symbol": req.body.symbol,
                "qty": req.body.qty,
                "unit_cost": req.body.unit_cost,
                "t_type": req.body.t_type,
                "t_date": req.body.t_date
            }
        }
    }).then((obj) => {
        console.log('Updated - ' + obj);
        res.send('modified ' + obj.result.nModified + ' records');
    })
        .catch((err) => {
        console.log('Error: ' + err);
    });
}));
router.delete('/api/user-porfolios/:uid/:pid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = getCollection();
    const query = { "_id": new mongodb_1.ObjectId(req.params.pid) };
    const result = yield collection.deleteOne(query);
    if (result.deletedCount === 1) {
        return res.json("Successfully deleted one document.");
    }
    else {
        return res.json("No documents matched the query. Deleted 0 documents.");
    }
}));
