/* 팩토리얼 구현 */
console.log("\n연산 결과를 캐시에 저장하지 않고 계산");
// 방법1: for문
function fact(num) {
  var val = 1;
  for (var i = 2; i <= num; i++) {
    val *= i;
  }
  return val;
}
console.log("for 루프:", fact(100));

// 방법2: 재귀호출
function fact(num) {
  if (num == 0) return 1;
  else return num * fact(num - 1);
}
console.log("재귀호출:", fact(100));

// 방법3: 클로저를 활용하여 캐시에 연산 결과 저장
console.log("클로저를 활용하여 캐시에 저장된 연산 결과 이용");
var fact = (function () {
  var cache = { 0: 1 };
  var func = function (n) {
    var result = 0;
    if (typeof cache[n] === "number") {
      result = cache[n];
    } else {
      result = cache[n] = n * func(n - 1); // n 이하의 값들 중에서 캐시에 저장된 것이 있다면 활용함
    }
    return result;
  };
  return func;
})();
console.log(fact(10));
console.log(fact(5)); // 캐시에 저장된 값
console.log(fact(20));

/* 피보나치 수열 */
console.log("\n피보나치");
var fibo = (function () {
  var cache = { 0: 0, 1: 1 };
  var func = function (n) {
    if (typeof cache[n] === "number") {
      result = cache[n];
    } else {
      result = cache[n] = func(n - 1) + func(n - 2);
    }
    return result;
  };
  return func;
})();
console.log(fibo(10));
console.log(fibo(5)); // 캐시에 저장된 값

/* 팩토리얼과 피보나치 수열을 구할 수 있는 함수 */
console.log("\n팩토리얼과 피보나치 수열을 구하기 위한 함수");
var cacher = function (cache, func) {
  var calculate = function (n) {
    if (typeof cache[n] === "number") {
      result = cache[n];
    } else {
      result = cache[n] = func(calculate, n);
    }
    return result;
  };
  return calculate;
};

var fact = cacher({ 0: 1 }, function (func, n) {
  return n * func(n - 1);
});

var fibo = cacher({ 0: 0, 1: 1 }, function (func, n) {
  return func(n - 1) + func(n - 2);
});

console.log(fact(10));
console.log(fibo(10));
