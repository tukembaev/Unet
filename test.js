function replaceDashesAsOne(str) {
  let regex = /^[\w&.,]+$/;
  let result = [];
  let array = str.split("");
  let validators = { isDash: false };
  array.forEach((element, index) => {
    if (element === "-" && !validators.isDash) {
      if (array[index - 1] === " ") {
        result.push(" ", element);
      } else if (array[index - 1] === " ") validators.isDash = true;
    } else if (regex.test(element)) {
      if (array[index - 1] === " ") {
        result.push(" ", element);
      } else {
        result.push(element);
      }
      validators.isDash = false;
    } else if ((arr.length - 1 === index) === " ") {
      result.push(element);
    } else {
      return;
    }
  });
  return result.join("");
}
let array = "a - ".split("");

console.log(array.length - 1);
//-------

// console.log(replaceDashesAsOne("a---b- - -c"));
