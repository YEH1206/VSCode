/* 프로토타입 체이닝을 활용한 상속 */
function create_object(o) {
  function F() {}
  F.prototype = o;
  return new F(); // o를 부모로 하는 F 객체 반환
}

var person = {
  name: "yeh",
  getName: function () {
    return this.name;
  },
  setName: function (value) {
    this.name = value;
  },
};

console.log("\n프로토타입 체이닝을 활용한 상속");
var student = create_object(person);
console.dir(student);

/* 자식 객체의 프로퍼티 확장 */
// 직접 프로퍼티를 추가해도 되지만 코드가 지저분해짐
console.log("\n자식 객체의 프로퍼티 확장");
student.setAge = function (age) {
  this.age = age;
};
student.getAge = function () {
  return this.age;
};
console.dir(student);

// 모듈화(jQuery)
jQuery.extend = jQuery.fn.extend = function (obj, prop) {
  // prop 파라미터가 없으면 this 객체에 obj의 프로퍼티를 활용
  if (!prop) {
    prop = obj;
    obj = this;
  }

  // obj 객체에 prop의 프로퍼티를 복사
  for (var i in prop) obj[i] = prop[i]; // 얕은 복사
  return obj;
};

// extend() 실습
console.log("\nextend() 실습");
function extend(obj, prop) {
  if (!prop) {
    prop = obj;
    obj = this;
  }
  for (var i in prop) {
    obj[i] = prop[i];
  }
  return obj;
}

var extended_person = create_object(person);
console.log("extend 전:", extended_person);
var added = {
  setLocation: function (location) {
    this.location = location;
  },
  getLocation: function () {
    return this.location;
  },
};
extend(extended_person, added);
console.log("extend 후:", extended_person);

var another_added = {
  setGender: function (value) {
    this.gender = value;
  },
  getGender: function () {
    return this.gender;
  },
};
