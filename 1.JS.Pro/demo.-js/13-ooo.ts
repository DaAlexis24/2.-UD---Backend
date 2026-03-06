const fuTS = function (arg: number[]) {
  //   if (!Array.isArray(arg)) return;
  return arg.map((item) => item * 2);
};

// console.log(fu([1, "Pepe", 3]));
// console.log(fu(null));
console.log(fuTS([1, 2, 3]));
