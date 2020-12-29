import { MongoHelper } from "../helpers/mongo.helper";

const getCollection = () => {
    return MongoHelper.client.db('sample_weatherdata').collection('data');
}
export class UserPortfolioService {
    constructor() {}
    public getUserPortfolios(uid: string): any {
        const collection: any = getCollection();
        
        // return {uid:uid, portfolios :[]};
    }


}