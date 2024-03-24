/* 정보 은닉 */
console.log("\n캡슐화를 활용한 정보 은닉");
var Person = function (arg) {
  var name = arg ? arg : "default_name"; // private 멤버
  this.getName = function () {
    // public 메서드
    return name;
  };
  this.setName = function (value) {
    // public 메서드
    name = value;
  };
};

var me = new Person("yeh");
console.dir(me);
console.log("외부에서 getName() 메서드 호출가능:", me.getName());
console.log("외부에서 name 멤버 접근 불가능:", me.name);

/* 유의사항: private 멤버가 참조타입이면 얕은 복사가 이루어짐 */
console.log("\nprivate 멤버가 참조타입이면 얕은 복사가 이루어짐");
var ArrCreate = function () {
  var arr = [1, 2, 3];
  return {
    getArr: function () {
      return arr;
    },
  };
};

var obj = ArrCreate();
var arr = obj.getArr(); // 얕은 복사
arr.push(5);
console.log("수정된 private 멤버:", obj.getArr());

/* 코드 리팩토링 case1: 메서드가 담겨있는 객체를 반환 */
console.log("\n리팩토링 case1: 메서드가 담겨있는 객체를 반환");
console.log("[Problem] 메서드 중복 생성");
var Person = function (arg) {
  var name = arg ? arg : "default_name"; // private 멤버
  return {
    getName: function () {
      return name;
    },
    setName: function (value) {
      name = value;
    },
  };
};

var another = new Person();
console.dir(another);

// 코드 리팩토링 case2: Person 타입 객체를 반환
console.log("\n리팩토링 case2: 프로토타입을 활용하여 상속 구현");
var Person = (function (arg) {
  var name = arg ? arg : "default_name"; // private 멤버

  var Func = function () {};
  Func.prototype = {
    getName: function () {
      return name;
    },
    setName: function (value) {
      name = value;
    },
  };

  return Func;
})();

var other = new Person();
console.dir(other);
