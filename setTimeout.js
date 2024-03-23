/* 클로저 활용3: setTimeout로 넘겨지는 함수에 파라미터 추가 */
function callLater(obj, a, b) {
  return function () {
    obj["sum"] = a + b;
    console.log(obj["sum"]);
  };
}

var sumObj = {
  sum: 0,
};

var func = callLater(sumObj, 10, 20);

setTimeout(func, 500);

/* 클로저 주의사항1: 클로저를 호출할 때마다 동일한 자유변수를 참조함 -> 클로저의 실행결과가 누적됨 */
function outerFunc(argNum) {
  var num = argNum;
  return function (x) {
    num += x;
    console.log("num: " + num);
  };
}
var exam = outerFunc(40);
exam(5);
exam(-10);

/* 클로저 주의사항2: 서로 다른 클로저가 동일한 자유변수를 참조함 -> 클로저의 실행결과가 중첩됨 */
function func_cautious() {
  var x = 1;
  return {
    func1: function () {
      console.log(++x);
    },
    func2: function () {
      console.log(-x);
    },
  };
}
var exam = func_cautious();
exam.func1();
exam.func2();

/* 클로저 주의사항3: 루프 안에서 함수가 실행되는 시점에 유의해야 함 */
// for문 실행 -> setTimeout 함수 등록 -> for문 종료 -> setTimeout 함수 실행 => i = 4, 4, 4
// Notice. 10초 뒤에 로그가 거의 동시에 찍힘
for (var i = 1; i <= 3; i++) {
  console.log("for문: " + i);
  setTimeout(function () {
    console.log("for문 안의 setTimeout: " + i);
  }, 3000);
}

// for문 실행 -> setTimeout 클로저가 자유변수 index 참조 -> for문 종료 -> setTimeout 클로저 실행 => i = 1, 2, 3
// Notice. 10초 뒤에 클로저 함수가 거의 동시에 실행됨
for (var i = 1; i <= 3; i++) {
  (function (index) {
    setTimeout(function () {
      console.log("즉시실행함수: " + index);
    }, 3000);
  })(i);
}
