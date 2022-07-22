output = "";
find = "";
ints = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
outputElement = document.querySelector("#output");
function numAdd(num){
	output += num;
    find += num;
    prim.text = output;
    ans.text = eval(find);
}
function operatorAdd(operator){
	last = find.slice(-1);
	if(last in ints){
		output += operator;
    	find += operator;
    	prim.text = output;
    	output = "";
	}
}
document.querySelector("#one").onclick = function(){numAdd("1")}
document.querySelector("#two").onclick = function(){numAdd("2")}
document.querySelector("#three").onclick = function(){numAdd("3")}
document.querySelector("#four").onclick = function(){numAdd("4")}
document.querySelector("#five").onclick = function(){numAdd("5")}
document.querySelector("#six").onclick = function(){numAdd("6")}
document.querySelector("#seven").onclick = function(){numAdd("7")}
document.querySelector("#eight").onclick = function(){numAdd("8")}
document.querySelector("#nine").onclick = function(){numAdd("9")}
document.querySelector("#plus").onclick = function(){operatorAdd("+")}
document.querySelector("#min").onclick = function(){operatorAdd("-")}
document.querySelector("#mn").onclick = function(){operatorAdd("*")}
document.querySelector("#dl").onclick = function(){operatorAdd("/")}
document.querySelector("#C").onclick = function(){
	prim.text = "0";
	ans.text = "";
	output = "";
	find = "";
}
document.querySelector("#ok").onclick = function(){
	prim.text = ans.text;
	ans.text = "";
	output = "";
	find = "";
}