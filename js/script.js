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

//Функции кнопок
function blink(){
	curs.classList.remove("blink");
	intervalID = setTimeout(function(){curs.classList.add("blink");}, 1000);
}
function outRes(ln){
	if(ln > 7){prim.text = output.slice(-7)}else{prim.text = output}
	if(ln == 0){prim.text = "0"}
	try{ans.text = eval(find)}catch(err){console.log("Ошибка!")}
	blink();
}
function outAns(){
	if(eval(find).toString().length > 12){ans.text = eval(find).toString().substring(0, 11)}
	else{ans.text = eval(find)}
}
function numAdd(num){
	last = find.slice(-1);
	if(last != ")"){
		output += num;
   		find += num;
    	outRes(output.length);
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
	}else if(output == ""){
		output = prim.text + operator;
		find = prim.text + func;
	}else if(last != "("){
		output = output.substring(0, output.length - 1) + operator;
		find = find.substring(0, find.length - 1) + func;
	}
	outRes(output.length);
}
function scAdd(input){
	last = find.slice(-1);
	try{f = Number.isInteger(eval(last))}
	catch(e){f = false}
	if((input == "(") && !(f)){
		output += input;
		find += input;
		outRes(output.length);
	}
	if((input == ")") && (f || last == ")") && (output.split("(").length - 1 > output.split(")").length - 1)){
		output += input;
		find += input;
		outRes(output.length);
	}
	flag = true;
}
function Zero(){
	try{chk = Number.isInteger(eval(output.slice(-1)))}
	catch(c){chk = false}
	if(chk || output.slice(-1) == "."){numAdd("0")}
	else{
		output += "0."; 
		find += "0.";
		flag = false;
		outRes(output.length);
		outAns();
	}
}
function Dot(){
	last = find.slice(-1);
	try{chk = Number.isInteger(eval(last))}
	catch(c){chk = false}
	if(flag && chk){operatorAdd(".", ".")}
	else if(flag){
		output += "0."; 
		find += "0.";
		outRes(output.length);
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
}
function Ok(){
	try{
		output = ans.text;
		output = output.substring(0, 7);
		prim.text = output;
	}
	catch(e){prim.text = ans.text}
	ans.text = "";
	output = "";
	find = "";
	flag = true;
}
function Del(){
	last = find.slice(-1);
	try{
		if(Number.isInteger(eval(last))){
			output = output.substring(0, output.length - 1);
			find = find.substring(0, find.length - 1);
			outAns();
		}
	}catch(c){
		flag = true;
		output = output.substring(0, output.length - 1);
		find = find.substring(0, find.length - 1);
	}
	outRes(output.length);
}

function light(){
	com = document.querySelector("#common");
	for(var i = 1; i <= 40; i += 2){
		com.childNodes[i].classList.toggle("light");
	}
	document.querySelector("#output").classList.toggle("light");
	com.classList.toggle("light");
}