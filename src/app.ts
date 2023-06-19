import express, { Application } from 'express'
import { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './app/routes';
import httpStatus from 'http-status';

const app:Application = express()

app.use(cors());
const port = 3000
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes

app.use('/api/v1/', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('wellcome to the pciu server!')
})

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'Not Found',
      errorMessages: [
        {
          path: req.originalUrl,
          message: 'API Not Found',
        },
      ],
    });
    next();
  });

export default app