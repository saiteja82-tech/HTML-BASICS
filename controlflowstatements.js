let age = 18;
if(age > 18){
    console.log("You are a minor.");
}
else if (age >=18 && age < 65){
    console.log("You are an adult.");
}
else{
    console.log("You are a senior citizen.");
}
console.log("/n");

//Example of switch statement
let day=3;
switch (day){
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("wendsday");
        break;
    case 4:
        console.log("Thursday");
        break;
    case 5:
        console.log("Friday");
        break;
    case 6:
        console.log("saturday");
        break;
    case 7:
        console.log("sunday");
        break;
    default:
        console.log("Invalid day:");
    
}