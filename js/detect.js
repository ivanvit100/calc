document.querySelector(".num1").onclick = function(){numAdd("1")}
document.querySelector(".num2").onclick = function(){numAdd("2")}
document.querySelector(".num3").onclick = function(){numAdd("3")}
document.querySelector(".num4").onclick = function(){numAdd("4")}
document.querySelector(".num5").onclick = function(){numAdd("5")}
document.querySelector(".num6").onclick = function(){numAdd("6")}
document.querySelector(".num7").onclick = function(){numAdd("7")}
document.querySelector(".num8").onclick = function(){numAdd("8")}
document.querySelector(".num9").onclick = function(){numAdd("9")}
document.querySelector(".num0").onclick = function(){Zero()}
document.querySelector("#plus").onclick = function(){operatorAdd("+", "+")}
document.querySelector(".Minus").onclick = function(){operatorAdd("-", "-")}
document.querySelector("#mn").onclick = function(){operatorAdd("×", "*")}
document.querySelector("#dl").onclick = function(){operatorAdd("÷", "/")}
document.querySelector("#sc").onclick = function(){scAdd("(")}
document.querySelector("#sc2").onclick = function(){scAdd(")")}
document.querySelector(".Period").onclick = function(){Dot()}
document.querySelector(".KeyC").onclick = function(){Clear()}
document.querySelector(".Enter").onclick = function(){Ok()}
document.querySelector(".Backspace").onclick = function(){Del()}
document.querySelector("#switch").onclick = function(){light()}
document.addEventListener('keydown', function(event){
	if(event.key >= 0 && event.key <= 9){
		el = document.querySelector(".num" + event.key);
	}
	else{
		switch(event.key){
			case '/':
			el = document.querySelector("#dl");
			break;
			case '*':
			el = document.querySelector("#mn");
			break;
			case '(':
			el = document.querySelector("#sc");
			break;
			case ')':
			el = document.querySelector("#sc2");
			break;
			default:
			el = document.querySelector("." + event.code);
			break;
		}
	}
	el.click();
	el.classList.add("hover");
	intervalID = setTimeout(function(){el.classList.remove("hover")}, 200);
});