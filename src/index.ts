import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { userPortfoliosRouter } from './routes/user-portfolio';
import { MongoHelper } from './helpers/mongo.helper';
// rest of the code remains same
const app = express();
const PORT = process.env.PORT || 8000;

//options for cors midddleware
const options: cors.CorsOptions = {
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
app.use(cors(options));

//add your routes

//enable pre-flight
app.options('*', cors(options));

app.use(json());
app.use(userPortfoliosRouter);
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, async () => {
  try {
   
    await MongoHelper.connect(`mongodb+srv://mgnath:SXjE7gtPoB2vnrDz@portfoliorepo.qttpn.mongodb.net/sample_training?retryWrites=true&w=majority`);
    console.info(`Connected to Mongo!`);
  } catch (err) {
    console.error(`Unable to connect to Mongo!`, err);
  }
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});