// Formula:
// (weight(kg) / (height(cm) / 100)^2) * 703
export const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / Math.pow(height / 100, 2)) * 703;

  if (bmi <= 18.4) {
    return `Underweight (Unhealthy weight)`;
  } else if (bmi > 18.4 || bmi < 25) {
    return `Normal (Healthy weight)`;
  } else if (bmi >= 40) {
    return `Obese (Unhealthy weight)`;
  }

  return '';
};

console.log(calculateBmi(180, 74));
