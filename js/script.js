/*Основной скрипт проекта "Калькулятор | ivanvit.ru"
Project: https://calc.ivanvit.ru

GitHub: https://github.com/ivanvit100
E-Mail: develope@ivanvit.ru */

"Use strict"

/*output хранит отображающийся пример, 
find содержит вычисляемое выражение, значение которого
выводится на экран в поле ответов,
flag используется для постановки плавающей точки,
fact - последнее целое число в формате строки (необходимо
для вычисления факториала).*/
fact = "";
flag = true;
ent = false;
curs = document.querySelector("#find");

//Регистрация service-worker
if ('serviceWorker' in navigator){
	navigator.serviceWorker.register('/service.js', {
		scope: '/'
	});
}

//Эффект волн при нажатии
var config = {
	duration: 300,
};
Waves.attach('#output', ['waves-block', 'waves-classic']);
Waves.attach('.moreButton', ['waves-block', 'waves-classic']);
Waves.init(config);

//Отключение контекстного меню
document.oncontextmenu = function(){return false};

//Функции кнопок
function numAdd(num){
	/*Функция вывода чисел на экран*/
	last = prim.find.slice(-1);
	out = prim.output.slice(-1);
	if(last != ")" && !(["e", "π", "!"].includes(out))){
		if(prim.output == "0"){
			prim.output = prim.find = "";
		}
		prim.output += num;
   		prim.find += num;
   		fact += num
    	prim.outputGo();
	}
}
function operatorAdd(operator, func){
	/*Функция получает на вход математический оператор, выводимый на экран,
	и его вычисляемый аналог для подстановки в find*/
	last = prim.find.slice(-1);
	flag = true;
	try{f = Number.isInteger(eval(last))}catch(c){f = false}
	/*Оператор выводится на экран, если перед ним стояло число,
	в противном случае оператор может заменять собой
	предыдущий.
	Issue: требуется рефакторинг*/
	if(f || last == ")"){
		prim.output += operator;
    	prim.find += func;
    }else if(operator == "-" && !(["+", "-", "*", "^", "/", "."].includes(last))){
    	prim.output += operator;
    	prim.find += func;
	}else if(prim.output == "" && prim.findText != "true" && prim.findText!= "false" && !(prim.findText.slice(-1) == ".")){
		prim.output = prim.findText + operator;
		prim.find = prim.findText + func;
	}else if(prim.output == ""){
		prim.output = "0" + operator;
		prim.find = "0" + func;
	}else if(["="].includes(last)){
		prim.output = prim.output.substring(0, prim.output.length - 1) + operator;
		prim.find = prim.find.substring(0, prim.find.length - 2) + func;
	}else if(last == "("){
		console.warn("Ошибка")
	}else{
		prim.output = prim.output.substring(0, prim.output.length - 1) + operator;
		prim.find = prim.find.substring(0, prim.find.length - 1) + func;
	}
	if(func != "."){fact = ""}
	prim.outputGo();
}
function scAdd(input){
	/*Функция получает на вход символ скобки "(" или ")"*/
	last = prim.find.slice(-1);
	try{f = Number.isInteger(eval(last))}
	catch(e){f = false}
	/*Скобка ставится, если последний символ равен входному 
	или является числом.
	Закрывающих скобок не может быть больше, чем открывающих.*/
	if((input == "(") && !(f) && (last != ".")){
		prim.output += input;
		prim.find += input;
	}
	if((input == ")") && (f || last == ")") && (last != ".") && (prim.output.split("(").length - 1 > prim.output.split(")").length - 1)){
		prim.output += input;
		prim.find += input;
	}
	prim.outputGo();
	fact = "";
	flag = true;
}
function Zero(){
	/*Функция обрабатывает число "0" и запускает функцию numAdd().
	Если последний символ не "." или число, то после нуля дописывается "."*/
	try{chk = Number.isInteger(eval(prim.output.slice(-1)))}
	catch(c){chk = false}
	if(chk || prim.output.slice(-1) == "."){numAdd("0")}
	else if(["e", "π"].includes(prim.output.slice(-1)) || prim.output.slice(-1) == ")"){console.warn("Ошибка")}
	else{
		prim.output += "0."; 
		prim.find += "0.";
		fact += "0.";
		flag = false;
		prim.outputGo();
	}
}
function Dot(){
	/*Функция добавляет в выражение плавающую точку.
	Если точка - первый символ числа, на экран выводится "0."*/
	last = prim.find.slice(-1);
	try{chk = Number.isInteger(eval(last))}
	catch(c){chk = false}
	if(flag && chk && !(["e", "π"].includes(prim.output.slice(-1)))){
		operatorAdd(".", ".");
		fact += ".";
	}
	else if(flag && (prim.output.slice(-1) != ")") && !(["e", "π"].includes(prim.output.slice(-1)))){
		prim.output += "0."; 
		prim.find += "0.";
		fact += "0.";
		prim.outputGo();	
	}
	flag = false;
}
function Clear(){
	/*Очистка экрана*/
	prim.output = prim.find = fact = "";
	flag = true;
	prim.outputGo();
}
function Ok(){
	/*Вывод на экран ответа из дополнительной строки, очистка*/
	if(prim.ansText != "" || prim.ansText == false){
		if(prim.ansText != "Error"){prim.output = String(prim.ansText)}
		else{prim.output = ""}
		prim.find = "";
		ent = true;
		prim.outputGo();
		flag = true;
		fact = prim.output = "";
	}
}
function findDEl(){
	/*Вспомогательная функция для функции Del(),
	осуществляющая удаление элементов сложных чисел в поле ответа.*/
	while(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(prim.find.slice(-1))){
		prim.find = prim.find.substring(0, prim.find.length - 1);
	}
}
function Del(){
	/*Issue: требуется рефакторинг*/
	last = prim.find.slice(-1);
	last4 = prim.output.slice(-4);
	flag = true;
	if(["!"].includes(prim.output.slice(-1))){
		/*Если удаляется факториал: 
		1. Удаляется его числовое значениеиз переменной find 
		(в том числе большие числа вида a.b...e+... ,
		где e - константа, a и b - целые числа).
		2. Последовательной проверкой каждого символа строки ввода
		(справа налево) на принадлежность его к массиву целых чисел 
		находится и вносится в переменную значение исходного числа.
		3.Обновляются все связанные переменные.*/
		findDEl();
		if(prim.find.slice(-2) == "e+"){
			prim.find = prim.find.substring(0, prim.find.length - 2);
			findDEl();
			if(prim.find.slice(-1) == "."){
				prim.find = prim.find.substring(0, prim.find.length - 1);
				findDEl();
			}
		}
		n = 0;
		nm = "";
		prim.output = prim.output.substring(0, prim.output.length - 1);
		while(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(prim.output.substring(prim.output.length - 1 - n, prim.output.length - n))){
			nm = prim.output.substring(prim.output.length - 1 - n, prim.output.length - n) + nm;
			n += 1;
		}
		prim.output = prim.output + "!";
		prim.find += nm;
		fact = nm;
	/*В последующих условиях удаляется необходимое количество символов
	из переменных find и output в соответствии с удаляемой функцией.
	Также обновляется значение переменной flag.*/
	}else if(prim.output.slice(-1) == "π" || prim.output.slice(-1) == "e"){
		prim.find = prim.find.substring(0, prim.find.length - 17);
	}else if(last in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]){
		flag = false;
		prim.find = prim.find.substring(0, prim.find.length - 1);
		fact = fact.substring(0, fact.length - 1);
	}else if(last == "="){
		prim.find = prim.find.substring(0, prim.find.length - 2);
	}else if(["sin(", "cos(", "tan("].includes(last4)){
		prim.find = prim.find.substring(0, prim.find.length - 9);
		prim.output = prim.output.substring(0, prim.output.length - 3);
	}else if(["log("].includes(last4)){
		prim.find = prim.find.substring(0, prim.find.length - 11);
		prim.output = prim.output.substring(0, prim.output.length - 3);
	}else if(["ln("].includes(prim.output.slice(-3))){
		prim.find = prim.find.substring(0, prim.find.length - 9);
		prim.output = prim.output.substring(0, prim.output.length - 2);
	}else if(["ctn("].includes(prim.output.slice(-4))){
		prim.find = prim.find.substring(0, prim.find.length - 4);
		prim.output = prim.output.substring(0, prim.output.length - 3);
	}else if(["√("].includes(prim.output.slice(-2))){
		prim.find = prim.find.substring(0, prim.find.length - 10);
		prim.output = prim.output.substring(0, prim.output.length - 1);
	}else if(["^"].includes(prim.output.slice(-1))){
		prim.find = prim.find.substring(0, prim.find.length - 2);
	}else{
		prim.find = prim.find.substring(0, prim.find.length - 1);
	}
	if(prim.output.slice(-2) == "0."){
		prim.find = prim.find.substring(0, prim.find.length - 1);
		prim.output = prim.output.substring(0, prim.output.length - 1);
	}
	prim.output = prim.output.substring(0, prim.output.length - 1);
	prim.outputGo();
}
function cnstAdd(p, f){
	/*Функция получает на вход константу и её вычисляемый аналог в JS.
	Подстановка происходит, если последний символ - не число.*/
	last = prim.find.slice(-1);
	if(["=", ">", "<", "-", "+", "/", "*", "", "("].includes(last)){
		prim.output += p;
    	prim.find += f;
    	prim.outputGo();
	}
	fact = "";
}
function newNum(){
	/*Вспомогательная функция, извлекающая число для вычисления факториала,
	в случае если переменная fact пуста*/
	n = 0;
	nm = "";
	while(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(prim.output.substring(prim.output.length - 1 - n, prim.output.length - n))){
		nm = prim.output.substring(prim.output.length - 1 - n, prim.output.length - n) + nm;
		n += 1;
	}
	return nm;
}
function fAdd(){
	/*Функция проверяет возможность вычисления факториала и вызывает 
	функцию factorial(n) в случае успеха.*/
	if(prim.output == ""){
		prim.output = prim.findText;
		nm = newNum();
		if(nm != "0"){fact = nm}
		if(prim.output.substring(0, 1) == "-"){prim.find = "-"}
	}
	if(fact == "" && ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(prim.output.slice(-1))){fact = newNum()}
	if(Number.isInteger(eval(fact))){
		prim.output += "!";
		prim.find = prim.find.substring(0, prim.find.length - fact.length) + String(factorial(fact));
		fact = "";
	}
	prim.outputGo();
}

function light(){
	/*Функция переключает тему сайта, смена иконки по
	логическому значению пременной f.*/
	document.querySelector("*").classList.toggle("light") ? prim.src = "./img/dark.png" : prim.src = "./img/light.png"
}

function ctn(x){return 1/Math.tan(x)}//Вычисление котангенса

function factorial(n){
	/*Рекурсивная функция вычисления факториала, получает на вход
	число n, для которого высчитывается факториал.*/
	try{return (n != 1) ? n * factorial(n - 1) : 1}	
	catch(e){return "Error"}
}

function more_hide(){
	/*Функция переключения статуса страницы,
	необходима для отображения дополнительных
	математических клавиш в мобильной версии сайта.*/
	cmn = document.querySelector("#arrow").classList.toggle("toMore");
	document.querySelector("#arrow").classList.toggle("toCommon");
}