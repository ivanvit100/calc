output = "";
find = "";
ints = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
flag = true;
curs = document.querySelector("#find");
function blink(){
	curs.classList.remove("blink");
	intervalID = setTimeout(function(){curs.classList.add("blink");}, 1000);
}
function outRes(ln){
	if(ln > 7){prim.text = output.slice(-7)}else{prim.text = output}
	try{ans.text = eval(find)}catch(err){console.log("Ошибка!")}
	blink();
}
function outAns(){
	if(eval(find).toString().length > 12){ans.text = eval(find).toString().substring(0, 11)}
	else{ans.text = eval(find)}
}
function numAdd(num){
	output += num;
    find += num;
    outRes(output.length);
    outAns();
}
function operatorAdd(operator, func){
	last = find.slice(-1);
	flag = true;
	if(last in ints || last == ")"){
		output += operator;
    	find += func;
    	outRes(output.length);
	}
	if(output == ""){
		output = prim.text + operator;
		find = prim.text + func;
		outRes(output.length);
	}
}
function scAdd(input){
	last = find.slice(-1);
	if((input == "(") && !(last in ints)){
		output += input;
		find += input;
		outRes(output.length);
	}
	if((input == ")") && (last in ints || last == ")") && (output.split("(").length - 1 > output.split(")").length - 1)){
		output += input;
		find += input;
		outRes(output.length);
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
document.querySelector("#plus").onclick = function(){operatorAdd("+", "+")}
document.querySelector("#min").onclick = function(){operatorAdd("-", "-")}
document.querySelector("#mn").onclick = function(){operatorAdd("×", "*")}
document.querySelector("#dl").onclick = function(){operatorAdd("÷", "/")}
document.querySelector("#sc").onclick = function(){scAdd("(")}
document.querySelector("#sc2").onclick = function(){scAdd(")")}
document.querySelector("#zero").onclick = function(){
	if(output != "" && output.slice(-1) in ints){numAdd("0")}
	else{
		output += "0."; 
		find += "0.";
		outRes(output.length);
    	outAns();
	}
}
document.querySelector("#dot").onclick = function(){
	last = find.slice(-1);
	if(flag && last in ints){operatorAdd(".", ".")}
	else if(flag && !(last in ints)){
		output += "0."; 
		find += "0.";
		outRes(output.length);
    	outAns();
	}
	flag = false;
}
document.querySelector("#C").onclick = function(){
	prim.text = "0";
	ans.text = "";
	output = "";
	find = "";
}
document.querySelector("#ok").onclick = function(){
	try{prim.text = ans.text.substring(0, 7)}catch(e){prim.text = ans.text}
	ans.text = "";
	output = "";
	find = "";
}