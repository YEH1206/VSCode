/* 클래스 기반의 상속 */
// 자식 클래스의 prototype이 부모 클래스의 인스턴스를 참조하는 방식 -> 독립성 결여
console.log("\n클래스 기반의 상속");
console.log(
  "자식 클래스의 prototype이 부모 클래스의 인스턴스를 참조하는 방식 -> 독립성 결여"
);
function Person(arg) {
  this.name = arg;
}

Person.prototype.setName = function (value) {
  this.name = value;
};

Person.prototype.getName = function () {
  return this.name;
};

var me = new Person("yeh");
console.log(me);

function Student(arg) {
  Person.apply(this, arguments);
  Person.call(this, arg);
}
Student.prototype = me;

var you = new Student("zzoon");
console.log(you);

// 자식클래스와 부모클래스 사이에 인스턴스가 아닌 중재자를 생성
console.log("\n자식클래스와 부모클래스 사이에 인스턴스가 아닌 중재자를 생성");
Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
};

Person.method("setGender", function (value) {
  this.gender = value;
});

Person.method("getGender", function () {
  return this.gender;
});

function Friend() {}

function F() {}
F.prototype = Person.prototype;
Friend.prototype = new F();
Friend.prototype.constructor = Friend;
Friend.super = Person.prototype;

var friend = new Friend();
console.log(friend);

// 즉시실행함수와 클로저를 활용하여 상속 관계 최적화
console.log("\n즉시실행함수와 클로저를 활용하여 상속관계 유틸화");
function Target() {}

var inherit = (function (Parent, Child) {
  var F = function () {};
  return function () {
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.super = Parent.prototype;
  };
})(Person, Target);

inherit();
var child = new Target();
console.dir(child);
