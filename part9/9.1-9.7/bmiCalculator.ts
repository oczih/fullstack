

const parseArguments = (args: string[]): { height: number; weight: number } => {
  const inputs = args.slice(2).map(Number);

  if (inputs.length !== 2) {
     throw new Error('Please provide exactly two numbers: height (cm) and weight (kg).');
  }

  if (inputs.some(isNaN)) {
    throw new Error('Provided values must all be numbers.');
  }

  const [height, weight] = inputs;
  return { height, weight };
};


export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) ** 2);
    let result: string;

    if(bmi < 16) {
        result = "Underweight (Severe thinness)";
    } else if(bmi < 17) {
        result = "Underweight (Moderate thinness)";
    } else if(bmi < 18.5) {
        result = "Underweight (Mild thinness)";
    } else if(bmi < 25) {
        result = "Normal range";
    } else if(bmi < 30) {
        result = "Overweight (Pre-obesity)";
    } else if(bmi < 35) {
        result = "Obesity (Class I)";
    } else if(bmi < 40) {
        result = "Obesity (Class II)";
    } else {
        result = "Obesity (Class III)";
    }

    return result;
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    const result = calculateBmi(height, weight);
    console.log(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('An unknown error occurred.');
    }
  }
}


