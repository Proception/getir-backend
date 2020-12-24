import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express';
import { notFound, catchAll } from './utils/index'
import Router from './routes/index'
import documentation from './documentation';

const app = express();
const PORT = process.env.PORT || 8000;

const swaggerUi = require("swagger-ui-express");

//Get environment configurations
dotenv.config();

//database connection
const mongoDBUrl: string = process.env.DB_CONNECTION_URL || '';
mongoose.connect(mongoDBUrl, { 
  useNewUrlParser: true ,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use( (req: Request,res: Response, next: NextFunction)=> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  next()
});

/**
 * @description handles all requests for /
 */
app.use('/api/v1/', Router);


app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(documentation, { explorer: true })
);

//Execute a not found error handler if route is not found
app.use(notFound)
app.use(catchAll)

app.listen(PORT, () => {
  console.log(`[server]: Getir Server is running at https://localhost:${PORT}`);
});

export default app;
