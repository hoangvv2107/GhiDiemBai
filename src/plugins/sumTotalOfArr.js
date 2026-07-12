export const sumTotalOfArr = (arr) => {
  let sum = 0;
  arr.forEach((inner) => {
    sum += inner;
  });
  return sum;
};
