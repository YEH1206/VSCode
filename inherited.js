/* 프로토타입 체니닝을 활용한 상속 */
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

// 모듈화
jQuery.extend = jQuery.fn.extend = function (obj, prop) {
  if (!prop) {
    prop = obj;
    obj = this;
  }
  for (var i in prop) obj[i] = prop[i];
  return obj;
};
