<template>
<div id="more">
	<div class="moreButton" id="equals" @click="operatorAdd('=', '==')">=</div>
	<div class="moreButton" id="n_equals" @click="operatorAdd('≠', '!=')">≠</div>
	<div class="moreButton" id="m_eqals" @click="operatorAdd('≤', '<=')">≤</div>
	<div class="moreButton" id="b_eqals" @click="operatorAdd('≥', '>=')">≥</div>
	<div class="moreButton" id="less" @click="operatorAdd('<', '<')"><</div>
	<div class="moreButton" id="mr" @click="operatorAdd('>', '>')">></div>
	<div class="moreButton KeyP" id="pi" @click="cnstAdd('π', Math.PI)">π</div>
	<div class="moreButton KeyE" id="eps" @click="cnstAdd('e', Math.E)">e</div>
	<div class="moreButton" id="sin" @click="cnstAdd('sin(', 'Math.sin(')">sin</div>
	<div class="moreButton" id="cos" @click="cnstAdd('cos(', 'Math.cos(')">cos</div>
	<div class="moreButton" id="tg" @click="cnstAdd('tan(', 'Math.tan(')">tan</div>
	<div class="moreButton" id="ctg" @click="cnstAdd('ctn(', '1/Math.tan(')">ctn</div>
	<div class="moreButton" id="sqare" @click="cnstAdd('√(', 'Math.sqrt(')">√</div>
	<div class="moreButton" id="deg" @click="operatorAdd('^', '**')">xʸ</div>
	<div class="moreButton" id="pr" @click="fAdd()">x!</div>
	<div class="moreButton" id="log" @click="cnstAdd('log(', 'Math.log10(')">log</div>
	<div class="moreButton" id="ln" @click="cnstAdd('ln(', 'Math.log(')">ln</div>
</div>
</template>

<script>
export default{
	name: 'more',
	props: ['output', 'find', 'ent', 'fact'],
	computed:{
		last: function(){
			return this.output.slice(-1)
		},
		last1: function(){
			return this.find.slice(-1)
		}
	},
	methods:{
		updateParent: function(){
			/*Функция обновления родитльских данных вывода.*/
			this.$emit('update', {
				output: this.output,
				find: this.find,
				ent: this.ent,
				fact: this.fact,
			});
		},
		operatorAdd: function(operator, func){
			/*Функция, вызывающая метод operatorAdd.*/
			this.$emit('opAdd', {
				operator: operator,
				func: func
			});
		},
		cnstAdd: function(p, f){
			/*Функция получает на вход константу и её вычисляемый аналог в JS.
			Подстановка происходит, если последний символ - не число.*/
			if(this.last == "^"){this.find = this.find.substring(0, this.find.length - 1)}
			if(["=", ">", "<", "-", "+", "/", "*", "", "("].includes(this.last1) && this.last1 != ""){
				this.output += p;
    			this.find += f;
    			this.fact = "";
    			this.updateParent();
			}
			else if(this.output == "" || this.output == "0"){
				this.output = p;
				this.find = f;
				this.fact = "";
				this.updateParent();
			}
		},
		newNum: function(){
			/*Вспомогательная функция, извлекающая число для вычисления факториала,
			в случае если переменная fact пуста.*/
			let n = 0;
			let nm = "";
			while(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(this.output.substring(this.output.length - 1 - n, this.output.length - n))){
				nm = this.output.substring(this.output.length - 1 - n, this.output.length - n) + nm;
				n += 1;
			}
			return nm;
		},
		fAdd: function(){
			/*Функция проверяет возможность вычисления факториала и вызывает 
			функцию factorial(n) в случае успеха.*/
			if(this.output == ""){
				this.output = this.findText;
				let nm = this.newNum();
				if(nm != "0"){this.fact = nm}
				if(this.output.substring(0, 1) == "-"){this.find = "-"}
			}
			if(this.fact == "" && ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(this.output.slice(-1))){this.fact = this.newNum()}
			if(this.fact.indexOf(".") == -1 && this.last != "." && this.last != "!"){
				this.output += "!";
				this.find = this.find.substring(0, this.find.length - this.fact.length) + String(this.factorial(this.fact));
				this.fact = "";
			}
			this.updateParent();
		},
		factorial: function(n){
			/*Рекурсивная функция вычисления факториала, получает на вход
			число n, для которого высчитывается факториал.*/
			try{return (n != 1) ? n * this.factorial(n - 1) : 1}	
			catch(e){return "Error"}
		}
	},
	mounted(){
		var config = {
        	duration: 300,
      	};
      	//Эффект волн при нажатии
      	Waves.attach('#output', ['waves-block', 'waves-classic']);
     	Waves.attach('.moreButton', ['waves-block', 'waves-classic']);
      	Waves.init(config);
	}
}
</script>