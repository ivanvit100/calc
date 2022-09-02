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
	<div class="button Backspace" @click="Del()"><img src="@/assets/img/dl.png" alt="del" id="del"></div>
	<div class="button Enter NumpadEnter" @click="Ok()">=</div>
</div>
</template>

<script>
export default{
	name: 'myMain',
	data(){
		return{
      		find: '', //Хранилище ответа
			output: '', //Хранилище примера
			fact: "", //Число для вычисления факториала
			copy: "0", //Копируемый текст
			flag: true, //Была ли добавлена плавающая точка
			ent: false, //Был ли нажат Enter
			chk: false, //Вспомогательная переменная
		}
	},
	computed:{
		last: function(){
			return this.find.slice(-1)
		}
	},
	methods:{
		updateParent: function(){
			/*Функция обновления родитльских данных вывода.*/
			this.$emit('updateP', {
				prim: this.output,
				ans: this.find,
				copy: this.copy,
				ent: this.ent
			});
		},

		//Функции кнопок
		numAdd: function(num){
			/*Функция вывода чисел на экран*/
			if(this.find.slice(-1) != ")" && !(["e", "π", "!"].includes(this.output.slice(-1)))){
				if(this.output == "0"){
					this.output = this.find = "";
				}
				this.output += num;
   				this.find += num;
   				this.fact += num
    			this.updateParent();
			}
		},
		Zero: function(){
			/*Функция обрабатывает число "0" и запускает функцию numAdd().
			Если последний символ не "." или число, то после нуля дописывается "."*/
			try{this.chk = Number.isInteger(eval(this.output.slice(-1)))}
			catch(c){this.chk = false}
			if(this.chk || this.output.slice(-1) == "."){this.numAdd("0")}
			else if(["e", "π"].includes(this.output.slice(-1)) || this.output.slice(-1) == ")"){console.warn("[Zero]: Ошибка")}
			else{
				this.output += "0."; 
				this.find += "0.";
				this.fact += "0.";
				this.flag = false;
				this.updateParent();
			}
		},
		Dot: function(){
			/*Функция добавляет в выражение плавающую точку.
			Если точка - первый символ числа, на экран выводится "0."*/
			try{this.chk = Number.isInteger(eval(this.last))}
			catch(c){this.chk = false}
			if(this.flag && this.chk && !(["e", "π"].includes(this.output.slice(-1)))){
				this.operatorAdd(".", ".");
				this.fact += ".";
			}
			else if(this.flag && (this.output.slice(-1) != ")") && !(["e", "π"].includes(this.output.slice(-1)))){
				this.output += "0."; 
				this.find += "0.";
				this.fact += "0.";
				this.updateParent();
			}
			this.flag = false;
		},
		operatorAdd: function(operator, func){
			/*Функция получает на вход математический оператор, выводимый на экран,
			и его вычисляемый аналог для подстановки в find*/
			this.flag = true;
			try{this.chk = Number.isInteger(eval(this.last))}catch(c){this.chk = false}
			/*Оператор выводится на экран, если перед ним стояло число,
			в противном случае оператор может заменять собой
			предыдущий.
			Issue: требуется рефакторинг*/
			if(this.chk || this.last == ")"){
				this.output += operator;
    			this.find += func;
    		}else if(operator == "-" && !(["+", "-", "*", "^", "/", "."].includes(this.last))){
    			this.output += operator;
    			this.find += func;
			}else if(this.output == "" && this.findText != "true" && this.findText!= "false" && !(this.findText.slice(-1) == ".")){
				this.output = this.findText + operator;
				this.find = this.findText + func;
			}else if(this.output == ""){
				this.output = "0" + operator;
				this.find = "0" + func;
			}else if(["="].includes(this.last)){
				this.output = this.output.substring(0, this.output.length - 1) + operator;
				this.find = this.find.substring(0, this.find.length - 2) + func;
			}else if(this.last == "("){
				console.warn("[operatorAdd]: Ошибка!")
			}else{
				this.output = this.output.substring(0, this.output.length - 1) + operator;
				this.find = this.find.substring(0, this.find.length - 1) + func;
			}
			if(func != "."){this.fact = ""}
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
				this.output += input;
				this.find += input;
			}
			if((input == ")") && (this.chk || this.last == ")") && (this.last != ".") && (this.output.split("(").length - 1 > this.output.split(")").length - 1)){
				this.output += input;
				this.find += input;
			}
			this.updateParent();
			this.fact = "";
			this.flag = true;
		},
		Clear: function(){
			/*Очистка экрана*/
			this.output = this.find = this.fact = "";
			this.flag = true;
			this.copy = "0";
			this.updateParent();
		},
		Ok: function(){
			/*Вывод на экран ответа из дополнительной строки, очистка*/
			if(this.find != "" || this.find == false){
				if(this.find != "Error"){this.output = String(eval(this.find))}
				else{this.output = ""}
				this.find = "";
				this.ent = this.flag = true;
				this.updateParent();
				this.fact = this.output = "";
			}
		},
	}
}
</script>