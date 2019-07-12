var ROT13 = function (string:string) {
    var charArr = string.split("");
    var encrypted = charArr.map(function (char, index) {
        return String.fromCharCode(char.charCodeAt(0) + 13);
    });
    return encrypted.join("");
};
// console.log(ROT13('ABC'))
module.exports = ROT13;
