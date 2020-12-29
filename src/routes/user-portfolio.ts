import express, { Request, Response } from 'express';
import { Collection, ObjectId } from 'mongodb';
import { MongoHelper } from '../helpers/mongo.helper';
import { UserPortfolioService } from '../services/user-portfolio-service';
const { v4: uuidv4 } = require('uuid');

const getCollection = () => {
    return MongoHelper.client.db('portfolios').collection('user_portfolios');
}
const router = express.Router();

router.get('/api/user-porfolios/:uid',
    (req: Request, resp: Response) => {
        const collection: any = getCollection();
        const result = collection.find({ "g_uid": req.params.uid }).toArray((err: any, items: any[]) => {
            if (err) {
                resp.status(500);
                resp.end();
                console.error('Caught error', err);
            } else {
                // items = items.map((item) => { return { id: item._id, p_name : item.p_name}; });
                resp.json(items);
            }
        });
    });
router.get('/api/user-porfolios/:uid/:pid',
    (req: Request, resp: Response) => {
        const collection: any = getCollection();
        const result = collection.find({ "g_uid": req.params.uid, "_id": new ObjectId(req.params.pid) }).toArray((err: any, items: any[]) => {
            if (err) {
                resp.status(500);
                resp.end();
                console.error('Caught error', err);
            } else {
                resp.json(items);
            }
        });
    });
router.put('/api/user-porfolios/:uid',
    async (req: Request, res: Response) => {
        const collection: Collection<any> = getCollection();
        const doc = { g_uid: req.params.uid, p_name: req.body.portfolioName, transactions: [] };
        const result = await collection.insertOne(doc);
        return res.json(result.ops);
    });
router.put('/api/user-porfolios/:uid/:pid/addtrans',
    async (req: Request, res: Response) => {
        console.log('adding transaction');
        const collection: Collection<any> = getCollection();
        const result = collection.updateOne(
            {
                g_uid: req.params.uid,
                _id: new ObjectId(req.params.pid)
            },
            {
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
                res.send('modified ' + obj.result.nModified + ' records')
            })
            .catch((err) => {
                console.log('Error: ' + err);
            });
    });
router.delete('/api/user-porfolios/:uid/:pid',
    async (req: Request, res: Response) => {
        const collection: Collection<any> = getCollection();
        const query = { "_id": new ObjectId(req.params.pid) };
        const result = await collection.deleteOne(query);
        if (result.deletedCount === 1) {
            return res.json("Successfully deleted one document.");
        } else {
            return res.json("No documents matched the query. Deleted 0 documents.");
        }
    });

export { router as userPortfoliosRouter }
