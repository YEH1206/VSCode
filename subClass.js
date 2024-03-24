/* subClass: 상속받을 클래스에 넣을 변수 및 메서드를 파라미터로 받아, 부모 함수를 상속받는 자식 클래스를 만든다. */
// p. 196 활용예제 구현이 잘 안 됨
// 6.4.1.7 클로저 적용하면 person 생성자 함수 호출 안 되고,
// 6.4.2 모듈화 안 됨
function subClass(obj) {
  var parent = this === window ? Function : this;

  var F = function () {};

  var child = function () {
    var _parent = child.parent;

    if (_parent && _parent !== Function) {
      console.log("이건 호출이 되는데");
      _parent.apply(this, arguments);
    }

    if (child.prototype._init) {
      child.prototype._init.apply(this, arguments);
    }
  };

  F.prototype = parent.prototype;
  child.prototype = new F();
  child.prototype.constructor = child;
  child.parent = parent;
  child.subClass = arguments.callee;

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      child.prototype[i] = obj[i];
    }
  }

  return child;
}

// var subClass = (function () {
//   var parent = this === window ? Function : this;

//   var F = function () {};

//   var subClass = function (obj) {
//     var child = function () {
//       var _parent = child.parent;

//       if (_parent && _parent !== Function) {
//         console.log("이건 왜 호출이 안되지");
//         _parent.apply(this, arguments);
//       }

//       if (child.prototype._init) {
//         child.prototype._init.apply(this, arguments);
//       }
//     };

//     F.prototype = parent.prototype;
//     child.prototype = new F();
//     child.prototype.constructor = child;
//     child.parent = parent;
//     child.subClass = arguments.callee;

//     for (var i in obj) {
//       if (obj.hasOwnProperty(i)) {
//         child.prototype[i] = obj[i];
//       }
//     }

//     return child;
//   };

//   return subClass;
// })();

// 활용
var person_obj = {
  _init: function () {
    console.log("person init");
  },
  getName: function () {
    return this._name;
  },
  setName: function (value) {
    this._name = value;
  },
};

var student_obj = {
  _init: function () {
    console.log("student init");
  },
  setGrade: function (value) {
    this._grade = value;
  },
  getGrade: function () {
    return this._grade;
  },
};

console.log("\nsubClass 예제");
console.log("1st subClass");
var Person = subClass(person_obj);
var person = new Person();
person.setName("yeh");
console.dir(person);

console.log("\n2nd subClass");
var Student = Person.subClass(student_obj);
var student = new Student();
student.setGrade("freshman");
console.dir(student);
