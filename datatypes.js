// primitive data types
let number=42;//number
let string="hello,wrold!"
let boolean=true;//boolean
let underfinedVar;//undefined //(not aasigned a value)
let nullVar=null;
let symbolVar=Symbol("unique");
let bigintVar=BigInt(123456789012345678901234567890);
let objectVar={ key:"value"};
let arrayVar=[1,2,3,4,5];
let functionVar=function(){return "i am a function";}

let object2={
    name:"saiteja",
    age:30,
    isEmployed:true,
    hobbies:["reading","gaming","coding"],
}
// output the data types
console.log("Data Types in javascript:");
console.log("number:",number);
console.log("string:",string);
console.log("Boolean:",boolean);
console.log("Undefined:",underfinedVar);
console.log("Null:",nullVar);
console.log("Symbol",symbolVar);
console.log("BigInt:",bigintVar);
console.log("object:",objectVar);
