document.title = "JavaScript";
document.getElementById("header").innerHTML = "Hello world!";
document.getElementById("p").style.color = "orange";
document.body.style.backgroundColor="lightblue";
document.getElementsByClassName("a")[0].innerHTML = "";
document.getElementsByClassName("a")[0].style.color="red";
document.getElementsByClassName("a")[1].style.color="blue";
document.getElementsByClassName("a")[2].style.color="darkblue";
let c=document.getElementsByClassName("b");
c[0].style.color="blue";
let elements = document.querySelectorAll(".ab");
elements[0].style.color = "Red";
elements[1].style.color = "Green";
elements[2].style.color = "Blue";
elements[3].style.color = "orange";
//Function to toggle background color
// function ChangeBackground() {
//     document.body.style.backgroundColor="yellow";
    // alert("Background color changed to red!");
//}
function ChangeBackground(){
    if(document.body.style.backgroundColor==="lightblue"){
        document.body.style.backgroundColor="green";
    }else{
        document.body.style.backgroundColor="yellow";
    }
}
function Changetext(){
    document.getElementById("clg").innerHTML="IIT-HYD,NIT";
    document.getElementById("clg").style.backgroundColor="coral";
    document.getElementById("clg").style.backgroundColor="pink";
    document.getElementById("clg").style.fontSize="30px";
    document.getElementById("clg").style.textAlign="center";
}