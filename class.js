/* 클래스의 인스턴스를 생성하는 코드와 유사한 구조 */
console.log("\n클래스의 인스턴스 생성하는 코드와 유사한 구조");
function Person(arg) {
  this.name = arg;

  this.getName = function () {
    return this.name;
  };

  this.setName = function (value) {
    this.name = value;
  };
}

var me = new Person("yeh");
console.log(me);

var you = new Person("anonymous");
console.log(you);

// 문제점: 각 객체가 setName(), getName() 함수를 따로 생성 -> 메모리 낭비
// 해결: 프로토타입 활용

/* 프로토타입을 활용한 객체지향 프로그래밍 */
console.log("\n프로토타입을 활용하여 프로퍼티 중복문제 해결");
function OptimizedPerson(arg) {
  this.name = arg;
}

OptimizedPerson.prototype.getName = function () {
  return this.name;
};

OptimizedPerson.prototype.setName = function (value) {
  this.name = value;
};

var optimizedMe = new OptimizedPerson("yeh");
var optimizedYou = new OptimizedPerson("anonymous");
console.log(optimizedMe);
console.log(optimizedYou);

/* 프로토타입에 임의의 프로퍼티를 추가할 수 있게 해주는 코드 */
console.log("\n프로토타입에 임의의 프로퍼티를 추가할 수 있게 해주는 코드");
Function.prototype.method = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
};

function modulePerson(arg) {
  this.name = arg;
}

console.log(new modulePerson("not yet"));

modulePerson.method("setName", function (value) {
  this.name = value;
});

modulePerson.method("getName", function () {
  return this.name;
});

var moduleMe = new modulePerson("yeh");
var moduleYou = new modulePerson("anonymous");
console.log(moduleMe);
console.log(moduleYou);
