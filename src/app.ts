import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import axios from 'axios';

const app: Application = express();

const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'Hi!' });
});

app.post('/', async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({});
});

app.listen(5000, () => console.log('Server running on port 5000'));
