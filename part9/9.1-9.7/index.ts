import express from 'express';
const app = express();
app.use(express.json());
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(weight) || isNaN(height)) {
      res.status(400).send({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight);

  const bmiData = {
      weight, 
      height, 
      bmi
  };
  res.status(200).send(bmiData);
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body = req.body;

  const dailyExercises: number[] = body.daily_exercises;

  const target: number = body.target;

  if(!target || !dailyExercises){
      res.status(400).send({ error: 'parameters missing' })
  }

  if(isNaN(target) || dailyExercises.some(isNaN)){
      res.status(400).send({ error: 'malformatted parameters' })
  }

  try{
      const result = calculateExercises(dailyExercises, target);

      res.send(result).status(200);
  }catch(error){
      if(error instanceof Error){
         res.status(400).send({ error: error.message })
      }

      res.status(400).send({ error: 'something went wrong' });
  }
      
})
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});