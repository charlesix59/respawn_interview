
//=> [2, 3, '31', 5]

Array.prototype.flatMap = function (mapper) {
    return this.map(mapper).flat();
};

Array.prototype.flat = function () {
    return this.reduce((a, b) => a.concat(b), [])
};

res = [1, 2, [3], 4].flatMap((x) => x + 1);
console.log(res)