var calculateBmi = function (height, weight) {
    return weight / Math.pow((height / 100), 2);
};
console.log(calculateBmi(180, 74));
