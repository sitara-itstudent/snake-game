// let display = document.querySelector(".display");
// let btns = document.querySelectorAll("button");
// let calValue;
// let operator;
// function calculation(){
//       if (value == "=") {
//             else if (operator == "+") {
//                 calValue = Number(calValue) + Number(display.innerText);
//             } else if (operator == "-") {
//                 calValue = Number(calValue) - Number(display.innerText);
//             } else if (operator == "*") {
//                 calValue = Number(calValue) * Number(display.innerText);
//             } else if (operator == "%") {
//                 calValue = Number(calValue) % Number(display.innerText);
//             } else if (operator == "/") {
//                 calValue = Number(calValue) / Number(display.innerText);
//             }
//             display.innerText = calValue;
//             calValue = undefined;
//         }
// }

// for (let btn of btns) {
//     btn.addEventListener("click", function () {
//         let value = this.innerText.trim();

//         if (value == "AC") {
//             display.innerText = "";
//             calValue = undefined;

//         } else if (value == "DEL") {
//             display.innerText = display.innerText.slice(0, display.innerText.length - 1);

//         } else if (value == "+") {
//             if (calValue == undefined) //pehli baar + dabaya - sirf set kar   
//             {
//                 calValue = Number(display.innerText);
//             } else {
//                 calValue = Number(calValue) + Number(display.innerText);
//             }
//             display.innerText = "";
//             operator = "+";

//         } else if (value == "-") {
//             if (calValue == undefined) {
//                 calValue = Number(display.innerText);
//             } else {
//                 calValue = Number(calValue) - Number(display.innerText);
//             }
//             display.innerText = "";
//             operator = "-";

//         } else if (value == "*") {
//             if (calValue == undefined) {
//                 calValue = Number(display.innerText);
//             } else {
//                 calValue = Number(calValue) * Number(display.innerText);
//             }
//             display.innerText = "";
//             operator = "*";

//         } else if (value == "%") {
//             if (calValue == undefined) {
//                 calValue = Number(display.innerText);
//             } else {
//                 calValue = Number(calValue) % Number(display.innerText);
//             }
//             display.innerText = "";
//             operator = "%";

//         } else if (value == "/") {              // <- YAHAN FIX: value == "/" (pehle operator == "/" tha)
//             if (calValue == undefined) {
//                 calValue = Number(display.innerText);
//             } else {
//                 calValue = Number(calValue) / Number(display.innerText);
//             }
//             display.innerText = "";
//             operator = "/";

//         } else if (value == "=") {
//             if (operator == "+") {
//                 calValue = Number(calValue) + Number(display.innerText);
//             } else if (operator == "-") {
//                 calValue = Number(calValue) - Number(display.innerText);
//             } else if (operator == "*") {
//                 calValue = Number(calValue) * Number(display.innerText);
//             } else if (operator == "%") {
//                 calValue = Number(calValue) % Number(display.innerText);
//             } else if (operator == "/") {
//                 calValue = Number(calValue) / Number(display.innerText);
//             }
//             display.innerText = calValue;
//             calValue = undefined;

//         } else {
//             display.append(value);
//         }
//     });
// }
  
  
  
  
  
  
  
  
  
  
  
  
  

let display = document.querySelector(".display");
let btns = document.querySelectorAll("button");
let calValue;
let operator;

// Ye function SIRF "operator" check karta hai, "value" nahi
function calculate() {
    if (operator == "+") {
        calValue = Number(calValue) + Number(display.innerText);
    } else if (operator == "-") {
        calValue = Number(calValue) - Number(display.innerText);
    } else if (operator == "*") {
        calValue = Number(calValue) * Number(display.innerText);
    } else if (operator == "%") {
        calValue = Number(calValue) % Number(display.innerText);
    } else if (operator == "/") {
        calValue = Number(calValue) / Number(display.innerText);
    }
}

for (let btn of btns) {
    btn.addEventListener("click", function () {
        let value = this.innerText.trim();

        if (value == "AC") {
            display.innerText = "";
            calValue = undefined;
            operator = undefined;

        } else if (value == "DEL") {
            display.innerText = display.innerText.slice(0, display.innerText.length - 1);

        } else if (value == "+" || value == "-" || value == "*" || value == "%" || value == "/") {
            if (calValue == undefined) {
                // pehli baar operator dabaya - sirf set karo
                calValue = Number(display.innerText);
            } else {
                // pehle se pending operator tha - use calculate() se complete karo
                calculate();
            }
            display.innerText = "";
            operator = value;   // naya operator store karo agli baar ke liye

        } else if (value == "=") {
            calculate();
            display.innerText = calValue;
            calValue = undefined;
            operator = undefined;

        } else {
            display.append(value);
        }
    });
}