let a = 10;
let b = 5;
console.log("Arithmetic Operators:");
console.log("a =", a,", b =",b);
let sum = a + b;
let difference = a - b;
let quotient = a / b;
let remainder = a % b;
let exponent = a ** b;
console.log("Arithmetic Operators:");
console.log("Sum:",sum);
console.log("Difference:",difference);
console.log("Quotient:",quotient);
console.log("Remainder:",remainder);
console.log("Exponent:",exponent);
console.log("/n");

//2. Assignment Operators

let x = 10;
x += 5;
x -= 3;
x *= 2;
x /= 4;
x %= 3;
console.log("Assignment Operators:");
console.log("x after assignment:",x);
console.log("/n");

//3. Comparison Operators

let isEqual =(a==b);
let isStrictEqual =(a===b);
let isNotEqual =(a!=b);
let isStrictEqualNotEqual =(a!==b);
let isGreaterThan =(a>b);
let isLessThan =(a<b);
let isGreaterThanOrEqual =(a>=b);
let isLessThanOrEqual =(a<=b);
console.log("Is Equal:",isEqual);
console.log("Is Strict Equal:",isStrictEqual);
console.log("Is Not Equal:",isNotEqual);
console.log("Is Strict Equal Not Equal:",isStrictEqualNotEqual);
console.log("Is Greater Than:",isGreaterThan);
console.log("Is Less Than:",isLessThan);
console.log("Is Greater Than Or Equal:",isGreaterThanOrEqual);
console.log("Is Less Than Or Equal",isLessThanOrEqual); 
console.log("/n");

//4. Logical Operators
let andOperator =(a>0 && b>0);
let orOperator =(a>0||b<0);
let notOperator=!(a<b);
console.log("Logical Operators:",andOperator);
console.log("AND Operator:",orOperator);
console.log("OR Operator:",notOperator);
console.log("NOT Operator:",notOperator);
console.log("/n");

//5. Bitwise Operators
let bitwiseAnd = a&b;
let bitwiseOr = a|b;
let bitwiseXor = a^b;
let bitwisenNot =~a;
let leftShift = a<<1;
let rightshift =a>>1;
console.log("Bitwise Operators:");
console.log("BitwiseAnd",bitwiseAnd);
console.log("BitwiseOr",bitwiseOr);
console.log("BitwiseXor",bitwiseXor);
console.log("BitwisenNot",bitwisenNot);
console.log("LeftShift",leftShift);
console.log("Rightshift",leftShift);
console.log("/n");

//6. Ternary Operator
let age=18;
let eligibility =(age>=18)? "Eligibility to vote":"Not eligible to vote";
console.log("Ternary Operator:");
console.log("Eligibility:",eligibility);
console.log("/n");


//7.Typesof Operator
let variableType=typeof a;
console.log("Typeof Operator:");
console.log("Type of varible 'a':",variableType);
console.log("/n");



