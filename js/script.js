"Use strict"

//Регистрация service-worker
if ('serviceWorker' in navigator){
	navigator.serviceWorker.register('/service.js', {
		scope: '/'
	});
}

output = "";
find = "";
flag = true;
curs = document.querySelector("#find");
fact = "";

document.oncontextmenu = function(){return false};

//Функции кнопок
function blink(){
	curs.classList.remove("blink");
	intervalID = setTimeout(function(){curs.classList.add("blink")}, 200);
}
function outRes(ln, f){
	count = parseInt(document.querySelector("#find").clientWidth/45);
	if(ln > count && f){prim.text = output.substring(0, count - 3) + "..."}
	else if(ln > count){prim.text = output.slice(-count)}else{prim.text = output}
	if(ln == 0){prim.text = "0"}
	try{ans.text = eval(find)}catch(err){console.warn("Ошибка!")}
	blink();
}
function outAns(){
	try{
		count = parseInt(document.querySelector("#find").clientWidth/45) + 3;
		if(eval(find).toString().length > count){ans.text = eval(find).toString().substring(0, count - 1)}
		else{ans.text = eval(find)}
		if([Infinity, NaN].includes(ans.text)){ans.text = "Error"}
	}catch(e){console.warn("Ошибка!")}
}
function numAdd(num){
	last = find.slice(-1);
	out = output.slice(-1);
	if(last != ")" && !(["e", "π"].includes(out))){
		if(output == "0"){
			output = "";
			find = "";
		}
		output += num;
   		find += num;
   		fact += num
    	outRes(output.length, false);
    	outAns();
	}
}
function operatorAdd(operator, func){
	last = find.slice(-1);
	flag = true;
	try{f = Number.isInteger(eval(last))}catch(c){f = false}
	if(f || last == ")"){
		output += operator;
    	find += func;
	}else if(output == "" && prim.text != "true" && prim.text != "false"){
		output = prim.text + operator;
		find = prim.text + func;
	}else if(output == ""){
		output = "0" + operator;
		find = "0" + func;
	}else if(["="].includes(last)){
		output = output.substring(0, output.length - 1) + operator;
		find = find.substring(0, find.length - 2) + func;
	}else if(last == "("){
		console.warn("Ошибка")
	}else{
		output = output.substring(0, output.length - 1) + operator;
		find = find.substring(0, find.length - 1) + func;
	}
	if(func != "."){fact = ""}
	outRes(output.length, false);
}
function scAdd(input){
	last = find.slice(-1);
	try{f = Number.isInteger(eval(last))}
	catch(e){f = false}
	if((input == "(") && !(f)){
		output += input;
		find += input;
		outRes(output.length, false);
	}
	if((input == ")") && (f || last == ")") && (output.split("(").length - 1 > output.split(")").length - 1)){
		output += input;
		find += input;
		outRes(output.length, false);
	}
	fact = "";
	flag = true;
}
function Zero(){
	try{chk = Number.isInteger(eval(output.slice(-1)))}
	catch(c){chk = false}
	if(chk || output.slice(-1) == "."){numAdd("0")}
	else if(["e", "π"].includes(output.slice(-1))){console.warn("Ошибка")}
	else{
		output += "0."; 
		find += "0.";
		fact += "0.";
		flag = false;
		outRes(output.length, false);
		outAns();
	}
}
function Dot(){
	last = find.slice(-1);
	try{chk = Number.isInteger(eval(last))}
	catch(c){chk = false}
	if(flag && chk && !(["e", "π"].includes(output.slice(-1)))){
		operatorAdd(".", ".");
		fact += ".";
	}
	else if(flag && !(["e", "π"].includes(output.slice(-1)))){
		output += "0."; 
		find += "0.";
		fact += "0.";
		outRes(output.length, false);
    	outAns();		
	}
	flag = false;
}
function Clear(){
	prim.text = "0";
	ans.text = "";
	output = "";
	find = "";
	flag = true;
	fact = "";
}
function Ok(){
	if(ans.text != ""){
		if(ans.text != "Error"){output = String(ans.text)}
		else{output = ""}
		outRes(output.length, true)
		ans.text = "";
		output = "";
		find = "";
		flag = true;
	}
}
function findDEl(){
	while(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(find.slice(-1))){
		find = find.substring(0, find.length - 1);
	}
}
function Del(){
	last = find.slice(-1);
	last4 = output.slice(-4);
	flag = true;
	if(["!"].includes(output.slice(-1))){
		findDEl();
		if(find.slice(-2) == "e+"){
			find = find.substring(0, find.length - 2);
			findDEl();
			if(find.slice(-1) == "."){
				find = find.substring(0, find.length - 1);
				findDEl();
			}
		}
		n = 0;
		nm = "";
		output = output.substring(0, output.length - 1);
		while(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(output.substring(output.length - 1 - n, output.length - n))){
			nm = output.substring(output.length - 1 - n, output.length - n) + nm;
			n += 1;
		}
		output = output + "!";
		find += nm;
	}else if(output.slice(-1) == "π" || output.slice(-1) == "e"){
		find = find.substring(0, find.length - 17);
	}else if(last in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]){
		flag = false;
		find = find.substring(0, find.length - 1);
		outAns();
	}else if(last == "="){
		find = find.substring(0, find.length - 2);
	}else if(["sin(", "cos(", "tan("].includes(last4)){
		find = find.substring(0, find.length - 9);
		output = output.substring(0, output.length - 3);
	}else if(["log("].includes(last4)){
		find = find.substring(0, find.length - 11);
		output = output.substring(0, output.length - 3);
	}else if(["ln("].includes(output.slice(-3))){
		find = find.substring(0, find.length - 9);
		output = output.substring(0, output.length - 2);
	}else if(["ctn("].includes(output.slice(-4))){
		find = find.substring(0, find.length - 4);
		output = output.substring(0, output.length - 3);
	}else if(["√("].includes(output.slice(-2))){
		find = find.substring(0, find.length - 10);
		output = output.substring(0, output.length - 1);
	}else if(["^"].includes(output.slice(-1))){
		find = find.substring(0, find.length - 2);
	}else{
		find = find.substring(0, find.length - 1);
	}
	output = output.substring(0, output.length - 1);
	outRes(output.length, false);
	outAns();
}
function cnstAdd(p, f){
	last = find.slice(-1);
	if(["=", ">", "<", "-", "+", "/", "*", "", "("].includes(last)){
		output += p;
    	find += f;
    	outRes(output.length, false);
	}
	fact = "";
}
function fAdd(){
	if(Number.isInteger(eval(fact))){
		output += "!";
		find = find.substring(0, find.length - fact.length) + String(factorial(fact));
	}
	fact = "";
	outRes(output.length);
	outAns();
}

//Theme
function light(){
	f = document.querySelector("*").classList.toggle("light");
	if(f){swh.src = "./img/dark.png"}
	else{swh.src = "./img/light.png"}
}

function ctn(x){return 1/Math.tan(x)}
function factorial(n){
	try{return (n != 1) ? n * factorial(n - 1) : 1}	
	catch(e){return "Error"}
}

function more_hide(){
	status = document.querySelector("*").classList.toggle("status");
}