
const ROT13 = (string)=>{
    const charArr = string.split("")
    const encrypted = charArr.map((char, index)=>{
        return String.fromCharCode(char.charCodeAt(0)+13)
    })
return encrypted.join("")
}

// console.log(ROT13('ABC'))

module.exports = ROT13