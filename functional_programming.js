/* 함수형 프로그래밍 */
console.log("\n함수형 프로그래밍");
var f1 = function (input) {
  var result;
  result = 1;
  return result;
};

var f2 = function (input) {
  var result;
  result = 2;
  return result;
};

var f3 = function (input) {
  var result;
  result = 3;
  return result;
};

var get_encrypted = function (func) {
  var str = "yeh";
  return function () {
    return func.call(null, str);
  };
};

var encrypted_value = get_encrypted(f1)();
console.log(encrypted_value);
var encrypted_value = get_encrypted(f2)();
console.log(encrypted_value);
var encrypted_value = get_encrypted(f3)();
console.log(encrypted_value);

/* 예제: 배열 원소의 합과 곱 구하기 */
console.log("\n배열 원소의 합과 곱 구하기");
function reduce(func, arr, memo) {
  var len = arr.length,
    i = 0,
    accum = memo;

  for (; i < len; i++) {
    accum = func(accum, arr[i]);
  }

  return accum;
}

var arr = [1, 2, 3, 4];
var sum = function (x, y) {
  return x + y;
};
var multiply = function (x, y) {
  return x * y;
};

var result_sum = reduce(sum, arr, 0);
console.log("합:", result_sum);

var result_multiply = reduce(multiply, arr, 1);
console.log("곱:", result_multiply);
