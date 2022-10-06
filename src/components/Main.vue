<!--Компонент основной клавиатуры калькулятора-->
<template>
<div id="common">
	<div class="button orange KeyC" @click="Clear()">C</div>
	<div class="button orange" id="sc" @click="scAdd('(')">(</div>
	<div class="button orange" id="sc2" @click="scAdd(')')">)</div>
	<div class="button orange" id="dl" @click="operatorAdd('÷', '/')">÷</div>
	<div class="button num7" @click="numAdd('7')">7</div>
	<div class="button num8" @click="numAdd('8')">8</div>
	<div class="button num9" @click="numAdd('9')">9</div>
	<div class="button orange" id="mn" @click="operatorAdd('×', '*')">×</div>
	<div class="button num4" @click="numAdd('4')">4</div>
	<div class="button num5" @click="numAdd('5')">5</div>
	<div class="button num6" @click="numAdd('6')">6</div>
	<div class="button orange Minus NumpadSubtract" @click="operatorAdd('-', '-')">–</div>
	<div class="button num1" @click="numAdd('1')">1</div>
	<div class="button num2" @click="numAdd('2')">2</div>
	<div class="button num3" @click="numAdd('3')">3</div>
	<div class="button orange NumpadAdd Equal" id="plus" @click="operatorAdd('+', '+')">+</div>
	<div class="button num0" @click="Zero()">0</div>
	<div class="button Period Comma NumpadDecimal" @click="Dot()">.</div>
	<div class="button Backspace" @click="Del()"><img src="@/assets/img/dl.svg" alt="del" id="del"></div>
	<div class="button Enter NumpadEnter" @click="Ok()">=</div>
</div>
</template>

<script>
export default{
	name: 'myMain',
	props: ['findText', 'output', 'find', 'ent', 'fact', 'fix'],
	data(){
		return{
			chk: false, //Вспомогательная переменная
			out: false, //Выводить ли ответ
			TestNum: 0, //Вспомогательная переменная
			newTestNum: "", //Вспомогательная переменная
		}
	},
	computed:{
		last: function(){
			return this.find.toString().slice(-1)
		},
		last4: function(){
			return this.output.slice(-4)
		}
	},
	methods:{
		updateParent: function(){
			/*Функция обновленя родитльских данных вывода.*/
			this.$emit('update', {
				output: this.output,
				find: this.find,
				ent: this.ent,
				fact: this.fact,
				out: this.out
			});
		},
		deleteTest: function(){
			/*Вспомогательная функция, удаляющая последствия работы
			функции newTest в том случае, если данная вставка мешает
			корректной работе приложения в дальнейшем.*/
			if(this.find.toString().slice(-1) == ")" && this.find.toString().slice(-1) != this.output.toString().slice(-1)){
				this.TestNum = this.find;
				this.newTestNum = "";
				while(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ")", "("].includes(this.TestNum.slice(-1))){
					this.newTestNum = this.TestNum.slice(-1) + this.newTestNum;
					this.TestNum = this.TestNum.substring(0, this.TestNum.length - 1);
				}
				if(this.TestNum.slice(-2) == "(-"){
					this.newTestNum = "(-" + this.newTestNum
				}
				if(this.newTestNum.substring(0, 1) == "("){
					this.find = this.find.substring(0, this.find.length - this.newTestNum.length - 2);
					this.updateParent();
				}
			}
		},
		newNum: function(){
			/*Вспомогательная функция, извлекающая число для проверки
			на возможность добавить вчисло плавующую точку.*/
			let n = 0;
			let nm = "";
			while(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(this.output.substring(this.output.length - 1 - n, this.output.length - n))){
				nm = this.output.substring(this.output.length - 1 - n, this.output.length - n) + nm;
				n += 1;
			}
			return nm;
		},

		//Функции кнопок
		numAdd: function(num){
			/*Функция вывода чисел на экран*/
			this.chk = this.find;
			this.deleteTest();
			this.chk = this.chk == this.find;
			if(!this.chk){
				this.find += this.output.slice(-1)
			}
			if(this.find.toString().slice(-1) != ")" && !(["e", "π", "!"].includes(this.output.slice(-1)))){
				if(this.output == "0"){
					this.output = this.find = "";
				}
				this.output += num;
   				this.find += num;
   				this.fact += num
    			this.out = false; 
    			this.updateParent();
			}
		},
		Zero: function(){
			/*Функция обрабатывает число "0" и запускает функцию numAdd().
			Если последний символ не "." или число, то после нуля дописывается ".".*/
			this.chk = this.find;
			this.deleteTest();
			this.chk = this.chk == this.find;
			if(!this.chk){
				this.find += this.output.slice(-1)
			}
			this.chk = this.newNum();
			this.chk = this.chk.toString().indexOf(".") >= 0;
			if(this.chk || ["0", "9", "8", "7", "6", "5", "4", "3", "2", "1", "."].includes(this.last)){this.numAdd("0")}
			else if(["e", "π"].includes(this.output.slice(-1)) || this.output.slice(-1) == ")"){console.warn("[Zero]: Ошибка")}
			else{
				this.find == "" ? this.output = "0." : this.output += "0.";
				this.find += "0.";
				this.fact += "0.";
				this.out = false;
				this.updateParent();
			}
		},
		Dot: function(){
			/*Функция добавляет в выражение плавающую точку.
			Если точка - первый символ числа, на экран выводится "0.".*/
			this.chk = this.find;
			this.deleteTest();
			this.chk = this.chk == this.find;
			if(!this.chk){
				this.find += this.output.slice(-1)
			}
			let f = parseInt(this.last, 10);
			this.chk = this.newNum();
			console.log(this.chk);
			this.chk = this.chk.toString().indexOf(".") >= 0;
			if(!this.chk && !Number.isNaN(f)){
				this.operatorAdd(".", ".");
				this.fact += ".";
			}
			else if(!this.chk && this.find == "" && this.output == "0"){
				this.output += ".";
				this.find += "0.";
				this.fact += ".";
				this.output;
			}
			else if(!this.chk && (this.output.slice(-1) != ")") && !(["e", "π"].includes(this.output.slice(-1)))){
				this.output += "0."; 
				this.find += "0.";
				this.fact += "0.";
				this.out = false; 
			}
			this.fact.indexOf(".") == -1;
			this.updateParent();
		},
		operatorAdd: function(operator, func){
			/*Функция получает на вход математический оператор, выводимый на экран,
			и его вычисляемый аналог для подстановки в find.*/
			if(this.output.slice(-1) == "^"){this.find = this.find.substring(0, this.find.length - 1)}
			if(func == "**"){
				this.chk = this.find;
				this.deleteTest();
				if(this.chk != this.find){this.find += this.output.slice(-1)}
			}
			try{this.chk = Number.isInteger(eval(this.last))}catch(c){this.chk = false}
			/*Оператор выводится на экран, если перед ним стояло число,
			в противном случае оператор может заменять собой
			предыдущий.*/
			if(this.chk || this.last == ")"){
				this.output += operator;
    			this.find += func;
    		}else if(this.find == "" && this.findText == "0" && operator == "-"){
    			this.find = this.output = "-";
    		}else if(this.find == "" && (this.findText == "0" || this.findText == "false" || this.findText == "true")){
    			this.output = "0" + operator;
    			this.find = "0" + func;
    		}else if(this.find == ""){
    			this.output = this.findText + operator;
    			this.find = this.findText + func;
    		}else if(this.last == "="){
				this.output = this.output.substring(0, this.output.length - 1) + operator;
				this.find = this.find.substring(0, this.find.length - 2) + func;
			}else if(this.last == "("){
				console.warn("[operatorAdd]: Ошибка!")
			}else if(!(["+", "-", "*", "^", "/", "."].includes(this.last)) || (operator == "." && this.newNum().toString().indexOf(".") == -1)){
    			this.output += operator;
    			this.find += func;
    		}else if(["+", "-", "*", "^", "/", "."].includes(this.last) && this.findText != "-"){
    			this.output = this.output.substring(0, this.output.length - 1) + operator;
				this.find = this.find.substring(0, this.find.length - 1) + func;
    		}else if(["+", "-", "*", "^", "/", "."].includes(this.last)){
    			this.output = "0" + operator;
    			this.find = "0" + func;
    		}else if(func == "**"){
    			this.output += operator;
    			this.find += func;
    		}
    		if(func != "."){this.fact = ""}
			this.out = false;
    		this.updateParent();
		},
		scAdd: function(input){
			/*Функция получает на вход символ скобки "(" или ")"*/
			try{this.chk = Number.isInteger(eval(this.last))}
			catch(e){this.chk = false}
			/*Скобка ставится, если последний символ равен входному 
			или является числом.
			Закрывающих скобок не может быть больше, чем открывающих.*/
			if((input == "(") && !(this.chk) && !([".", ")"].includes(this.last))){
				this.find == "" ? this.output = input : this.output += input;
				this.find += input;
			}
			if((input == ")") && (this.chk || this.last == ")") && (this.last != ".") && (this.output.split("(").length - 1 > this.output.split(")").length - 1)){
				this.output += input;
				this.find += input;
			}
			this.out = false; 
			this.updateParent();
			this.fact = "";
		},
		Clear: function(){
			/*Очистка экрана*/
			this.find = this.fact = "";
			this.copy = this.output = "0";
			this.out = false; 
			this.updateParent();
		},
		Ok: function(){
			/*Вывод на экран ответа из дополнительной строки, очистка*/
			if(this.find != "" || document.querySelector("#ans").innerText == "false"){
				if(document.querySelector("#ans").innerText != "Error"){this.output = String(eval(this.find))}
				else if(this.find == ""){
					console.warn("[Ok]: Ошибка!")
				}else{this.output = ""}
				this.find = "";
				this.ent = true;
				this.out = false; 
				this.updateParent();
				this.out = true;
				this.ent = false;
				this.fact = this.output = "";
				this.updateParent();
			}
		},
		findDEL: function(){
			/*Вспомогательная функция для функции Del(),
			осуществляющая удаление элементов сложных чисел в поле ответа.*/
			while(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(this.find.toString().slice(-1))){
				this.find = this.find.substring(0, this.find.length - 1);
			}
		},
		Del: function(){
			/*Issue: требуется рефакторинг*/
			this.chk = this.find;
			this.deleteTest();
			this.chk = this.chk == this.find;
			if(["!"].includes(this.output.slice(-1))){
				/*Если удаляется факториал: 
				1. Удаляется его числовое значениеиз переменной find 
				(в том числе большие числа вида a.b...e+... ,
				где e - константа, a и b - целые числа).
				2. Последовательной проверкой каждого символа строки ввода
				(справа налево) на принадлежность его к массиву целых чисел 
				находится и вносится в переменную значение исходного числа.
				3.Обновляются все связанные переменные.*/
				this.findDEL();
				if(this.find.toString().slice(-2) == "e+"){
					this.find = this.find.substring(0, this.find.length - 2);
					this.findDEL();
					if(this.last == "."){
						this.find = this.find.substring(0, this.find.length - 1);
						this.findDEL();
					}
				}
				let n = 0;
				let nm = "";
				this.output = this.output.substring(0, this.output.length - 1);
				while(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(this.output.substring(this.output.length - 1 - n, this.output.length - n))){
					nm = this.output.substring(this.output.length - 1 - n, this.output.length - n) + nm;
					n += 1;
				}
				this.output = this.output + "!";
				this.find += nm;
				this.fact = nm;
			/*В последующих условиях удаляется необходимое количество символов
			из переменных find и output в соответствии с удаляемой функцией.*/
			}else if(!this.chk){
				console.log("[deleteTest]: Success!");
			}else if(this.output.slice(-1) == "π" || this.output.slice(-1) == "e"){
				this.find = this.find.substring(0, this.find.length - 17);
			}else if(this.last in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]){
				this.find = this.find.substring(0, this.find.length - 1);
				this.fact = this.fact.substring(0, this.fact.length - 1);
			}else if(this.last == "="){
				this.find = this.find.substring(0, this.find.length - 2);
			}else if(["1/Math.tan("].includes(this.find.toString().slice(-11))){
				this.find = this.find.substring(0, this.find.length - 11);
				this.output = this.output.substring(0, this.output.length - 3);
			}else if(["sin(", "cos(", "tan("].includes(this.last4)){
				this.find = this.find.substring(0, this.find.length - 9);
				this.output = this.output.substring(0, this.output.length - 3);
			}else if(["log("].includes(this.last4)){
				this.find = this.find.substring(0, this.find.length - 11);
				this.output = this.output.substring(0, this.output.length - 3);
			}else if(["ln("].includes(this.output.slice(-3))){
				this.find = this.find.substring(0, this.find.length - 9);
				this.output = this.output.substring(0, this.output.length - 2);
			}else if(["√("].includes(this.output.slice(-2))){
				this.find = this.find.substring(0, this.find.length - 10);
				this.output = this.output.substring(0, this.output.length - 1);
			}else if(["^"].includes(this.output.slice(-1))){
				this.find = this.find.substring(0, this.find.length - 2);
			}else{
				this.find = this.find.substring(0, this.find.length - 1);
			}
			if(this.output.slice(-2) == "0."){
				this.find = this.find.substring(0, this.find.length - 1);
				this.output = this.output.substring(0, this.output.length - 1);
			}
			this.output = this.output.substring(0, this.output.length - 1);
			this.out = false; 
			this.fact = "";
			this.updateParent();
		},
	},
}
</script>