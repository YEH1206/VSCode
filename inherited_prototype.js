/* 프로토타입 체이닝을 활용한 상속 */
function create_object(o) {
  function F() {}
  F.prototype = o;
  return new F(); // o를 부모로 하는 객체 반환
}

var Person = {
  name: "yeh",
  getName: function () {
    return this.name;
  },
  setName: function (value) {
    this.name = value;
  },
};

var me = create_object(Person);
me.setName("yeh");
console.log(me);

/* 자식 객체의 프로퍼티 확장 */
// 직접 프로퍼티를 추가해도 되지만 코드가 지저분해짐
me.setBirth = function (num) {
  this.Birth = num;
};
me.setBirth(1992);
me.getBirth = function () {
  return this.Birth;
};

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

// extend() 예제
function extend(obj, prop) {
  if (!prop) {
    prop = obj;
    obj = this;
  }
  console.log("------------");
  console.log(obj);
  console.log(prop);
  for (var i in prop) {
    console.log(obj[i], prop[i]);
    obj[i] = prop[i];
  }

  return obj;
}

var student = create_object(me);
var added = {
  setLocation: function (location) {
    this.location = location;
  },
  getLocation: function () {
    return this.location;
  },
};

var another_added = {
  setGender: function (value) {
    this.gender = value;
  },
  getGender: function () {
    return this.gender;
  },
};

console.log("\nextend 예제");
console.log(student);
extend(student, added);
student.setLocation("seoul");
console.log(student);
extend(student, another_added);
console.log(student);
