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
для вычисления факториала)
prim.text - объект Vue, содержащий выводимый на экран текст,
ans.text выводит промежуточный ответ посредством Vue*/
output = find = fact = "";
flag = true;
curs = document.querySelector("#find");

//Регистрация service-worker
if ('serviceWorker' in navigator){
	navigator.serviceWorker.register('/service.js', {
		scope: '/'
	});
}

//Отключение контекстного меню
document.oncontextmenu = function(){return false};

function blink(){
	/*Функция, реализующая "торможение" анимацию "моргания курсора"
	посредством временного удаления класса элемента.*/
	curs.classList.remove("blink");
	intervalID = setTimeout(function(){curs.classList.add("blink")}, 200);
}

//Вывод на экран
function outRes(ln, f){
	/*Функция получет на вход значение длины строки и
	логическую переменную, где true - на экран выводится финальный ответ,
	false - на экран необходимо вывести последние count символов примера.*/
	count = parseInt(document.querySelector("#find").clientWidth/45);
	/*На экран выводится не более чем count символов (ширина области ответа,
	поделённая на фиксированное значение ширины наибольшего символа - 45).
	f == true => на экране первые count символов, иначе count последних.*/
	if(ln > count && f){prim.text = output.substring(0, count - 3) + "..."}
	else if(ln > count){prim.text = output.slice(-count)}else{prim.text = output}
	if(ln == 0){prim.text = "0"}
	try{ans.text = eval(find)}catch(err){console.warn("Ошибка!")}
	blink();
}
function outAns(){
	/*Функция выводит предварительный ответ в специальную область на
	экране. Ответ рассчитывается при помощи функции eval().
	Issue: исправить "неверные" ответы
	Пример: 0.3 - 0.2 = 0.0999...*/
	try{
		count = parseInt(document.querySelector("#find").clientWidth/45) + 3;
		if(eval(find).toString().length > count){ans.text = eval(find).toString().substring(0, count - 1)}
		else{ans.text = eval(find)}
		if([Infinity, NaN].includes(ans.text)){ans.text = "Error"}
	}catch(e){console.warn("Ошибка!")}
}

//Функции кнопок
function numAdd(num){
	/*Функция вывода чисел на экран*/
	last = find.slice(-1);
	out = output.slice(-1);
	if(last != ")" && !(["e", "π", "!"].includes(out))){
		if(output == "0"){
			output = find = "";
		}
		output += num;
   		find += num;
   		fact += num
    	outRes(output.length, false);
    	outAns();
	}
}
function operatorAdd(operator, func){
	/*Функция получает на вход математический оператор, выводимый на экран,
	и его вычисляемый аналог для подстановки в find*/
	last = find.slice(-1);
	flag = true;
	try{f = Number.isInteger(eval(last))}catch(c){f = false}
	/*Оператор выводится на экран, если перед ним стояло число,
	в противном случае оператор может заменять собой
	предыдущий.
	Issue: требуется рефакторинг*/
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
	/*Функция получает на вход символ скобки "(" или ")"*/
	last = find.slice(-1);
	try{f = Number.isInteger(eval(last))}
	catch(e){f = false}
	/*Скобка ставится, если последний символ равен входному 
	или является числом.
	Закрывающих скобок не может быть больше, чем открывающих.*/
	if((input == "(") && !(f) && (last != ".")){
		output += input;
		find += input;
		outRes(output.length, false);
	}
	if((input == ")") && (f || last == ")") && (last != ".") && (output.split("(").length - 1 > output.split(")").length - 1)){
		output += input;
		find += input;
		outRes(output.length, false);
	}
	fact = "";
	flag = true;
}
function Zero(){
	/*Функция обрабатывает число "0" и запускает функцию numAdd().
	Если последний символ не "." или число, то после нуля дописывается "."*/
	try{chk = Number.isInteger(eval(output.slice(-1)))}
	catch(c){chk = false}
	if(chk || output.slice(-1) == "."){numAdd("0")}
	else if(["e", "π"].includes(output.slice(-1)) || output.slice(-1) == ")"){console.warn("Ошибка")}
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
	/*Функция добавляет в выражение плавающую точку.
	Если точка - первый символ числа, на экран выводится "0."*/
	last = find.slice(-1);
	try{chk = Number.isInteger(eval(last))}
	catch(c){chk = false}
	if(flag && chk && !(["e", "π"].includes(output.slice(-1)))){
		operatorAdd(".", ".");
		fact += ".";
	}
	else if(flag && (output.slice(-1) != ")") && !(["e", "π"].includes(output.slice(-1)))){
		output += "0."; 
		find += "0.";
		fact += "0.";
		outRes(output.length, false);
    	outAns();		
	}
	flag = false;
}
function Clear(){
	/*Очистка экрана*/
	prim.text = "0";
	ans.text = output = find = fact = "";
	flag = true;
}
function Ok(){
	/*Вывод на экран ответа из дополнительной строки, очистка*/
	if(ans.text != ""){
		if(ans.text != "Error"){output = String(ans.text)}
		else{output = ""}
		outRes(output.length, true)
		ans.text = find = output = "";
		flag = true;
	}
}
function findDEl(){
	/*Вспомогательная функция для функции Del(),
	осуществляющая удаление элементов сложных чисел в поле ответа.*/
	while(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(find.slice(-1))){
		find = find.substring(0, find.length - 1);
	}
}
function Del(){
	/*Issue: требуется рефакторинг*/
	last = find.slice(-1);
	last4 = output.slice(-4);
	flag = true;
	if(["!"].includes(output.slice(-1))){
		/*Если удаляется факториал: 
		1. Удаляется его числовое значениеиз переменной find 
		(в том числе большие числа вида a.b...e+... ,
		где e - константа, a и b - целые числа).
		2. Последовательной проверкой каждого символа строки ввода
		(справа налево) на принадлежность его к массиву целых чисел 
		находится и вносится в переменную значение исходного числа.*/
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
		fact = nm;
	/*В последующих условиях удаляется необходимое количество символов
	из переменных find и output в соответствии с удаляемой функцией.
	Также обновляется значение переменной flag.*/
	}else if(output.slice(-1) == "π" || output.slice(-1) == "e"){
		find = find.substring(0, find.length - 17);
	}else if(last in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]){
		flag = false;
		find = find.substring(0, find.length - 1);
		fact = fact.substring(0, fact.length - 1);
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
	if(output.slice(-2) == "0."){
		find = find.substring(0, find.length - 1);
		output = output.substring(0, output.length - 1);
	}
	output = output.substring(0, output.length - 1);
	outRes(output.length, false);
	outAns();
}
function cnstAdd(p, f){
	/*Функция получает на вход константу и её вычисляемый аналог в JS.
	Подстановка происходит, если последний символ - не число.*/
	last = find.slice(-1);
	if(["=", ">", "<", "-", "+", "/", "*", "", "("].includes(last)){
		output += p;
    	find += f;
    	outRes(output.length, false);
	}
	fact = "";
}
function newNum(){
	/*Вспомогательная функция, извлекающая число для вычисления факториала,
	в случае если переменная fact пуста*/
	n = 0;
	nm = "";
	while(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(output.substring(output.length - 1 - n, output.length - n))){
		nm = output.substring(output.length - 1 - n, output.length - n) + nm;
		n += 1;
	}
	return nm;
}
function fAdd(){
	/*Функция проверяет возможность вычисления факториала и вызывает 
	функцию factorial(n) в случае успеха.*/
	if(output == ""){
		output = prim.text;
		nm = newNum();
		if(nm != "0"){fact = nm}
		if(output.substring(0, 1) == "-"){find = "-"}
	}
	if(fact == "" && ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(output.slice(-1))){fact = newNum()}
	if(Number.isInteger(eval(fact))){
		output += "!";
		find = find.substring(0, find.length - fact.length) + String(factorial(fact));
		fact = "";
	}
	outRes(output.length);
	outAns();
}

function light(){
	/*Функция переключает тему сайта, смена иконки по
	логическому значению пременной f.*/
	f = document.querySelector("*").classList.toggle("light");
	if(f){swh.src = "./img/dark.png"}
	else{swh.src = "./img/light.png"}
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
	status = document.querySelector("*").classList.toggle("status");
	cmn = document.querySelector("#arrow").classList.toggle("toMore");
	document.querySelector("#arrow").classList.toggle("toCommon");
}