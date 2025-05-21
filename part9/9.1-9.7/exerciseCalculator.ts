export interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const parseArguments = (args: string[]): { target: number; exercises: number[] } => {
  const inputs = args.slice(2).map(Number);

  if (inputs.length < 2) {
    throw new Error('Not enough arguments. Please provide target and at least one day of exercise.');
  }

  if (inputs.some(isNaN)) {
    throw new Error('Provided values must all be numbers.');
  }

  const target = inputs.pop()!;
  const exercises = inputs;

  return { target, exercises };
};


export const calculateExercises = (exercises: number[], target: number): Result => {
    const periodLength = exercises.length;

    const trainingDays = exercises.filter(day => day > 0).length;

    const totalTime = exercises.reduce((sum, time) => sum + time, 0);

    const average = totalTime / periodLength;

    let rating: number;
    let ratingDescription: string;

    const ratio = average / target;

    if (ratio > 0.66) {
        rating = 3;
        ratingDescription = "You did great";
    } else if (ratio > 0.33) {
        rating = 2;
        ratingDescription = "You did okay";
    } else {
        rating = 1;
        ratingDescription = "You did bad";
    }

    return {
        periodLength,
        trainingDays,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average
    };  
};

try {
  const { target, exercises } = parseArguments(process.argv);
  const result = calculateExercises(exercises, target);
  console.log(result);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Error:', error.message);
  } else {
    console.error('An unknown error occurred.');
  }
}