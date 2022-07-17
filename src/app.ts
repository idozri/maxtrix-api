import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import axios from 'axios';
import getMostLikelyNationality from './getMostLikelyNationality';
import getMostLikelyGender from './getMostLikelyGender';

const app: Application = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get('/whoami', async (req: Request, res: Response, next: NextFunction) => {
  const name: string = req.query.name as string;

  if (!name) {
    return res.status(400).json({ err: 'Please provide a name to guess.' });
  }

  try {
    const mostLikelyNationality = await getMostLikelyNationality(name);
    const mostLikelyGender = await getMostLikelyGender(name);

    res.status(200).json({
      nationality: mostLikelyNationality,
      gender: mostLikelyGender,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
