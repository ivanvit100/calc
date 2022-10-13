<!--Компонент конвертера валют-->
<template>
<div id="converterKeyboard">
	<div id="currencyChange" class="move">
		<select v-model="val1" id="in">
			<option disabled value="" selected>Конвертировать из</option>
			<option v-for="item in currency" v-bind:value="item.name">{{item.fullname}}, {{item.mark}}</option>
		</select>
		<img @click="swap" src="@/assets/img/doubleArrow.svg" alt="swap" id="doubleArrow" rel="preload">
		<select v-model="val2" id="out">
			<option disabled value="" selected>Конвертировать в</option>
			<option v-for="item in currency" v-bind:value="item.name">{{item.fullname}}, {{item.mark}}</option>
		</select>
	</div>
	<!--<div v-for="item in buttons" class="button" :class="item" @click="numAdd(item.slice(-1))">{{item.slice(-1)}}</div>
	<div class="button num0" @click="Zero()">0</div>
	<div class="button Period Comma NumpadDecimal" @click="Dot()">.</div>
	<div class="button Backspace" @click="Del()"><img src="@/assets/img/dl.png" alt="del" id="del"></div>-->
</div>
</template>

<script>
import myMain from './Main.vue';
export default{
	name: 'converter',
	components: {myMain},
	props: ['findText', 'output', 'find', 'ent', 'fact', 'total', 'val1', 'val2', 'mark1', 'mark2'],
	data(){
		return{
			key: "9116ea120a47ab05aa695a9c3199d1437def2d53", //Ключ для обращения к API
		}
	},
	computed:{
    	url: function(){
    		/*Переменная, хранящая URL, необходимый для доступа к API*/
    		return "https://api.getgeoapi.com/v2/currency/convert?api_key=" + this.key + "&from=" + this.val1 + "&to=" + this.val2 + "&amount=1&format=json"
    	},
    	currency: function(){
    		/*Получение валют*/
    		return curData
    	}
   	},
   	watch:{
   		val1(newVal, oldVal){
   			let sel = document.querySelector("#in");
   			if(oldVal != this.val2 || oldVal == ""){this.mark1 = sel.options[sel.selectedIndex].text.slice(-1)}
   			if(newVal != oldVal && this.val2 != 0){this.apiGo()}
   			this.updateVal();
   		},
   		val2(newVal, oldVal){
   			let sel = document.querySelector("#out");
   			if(oldVal != this.val1 || oldVal == ""){this.mark2 = sel.options[sel.selectedIndex].text.slice(-1)}
   			if(newVal != oldVal && this.val1 != 0){this.apiGo()}
   			this.updateVal();
   		},
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
		updateTotal: function(total){
			/*Функция обновления курса выбранных валют*/
			this.$emit('updateT', {
				total: total,
			});
			this.updateParent();
		},
		updateVal: function(){
			/*Функция обновления выбранных валют*/
			this.$emit('updateVal', {
				val1: this.val1,
				val2: this.val2,
				mark1: this.mark1,
				mark2: this.mark2,
			});
		},
		apiGo: function(){
    		fetch(this.url)
    			.then(response => response.json())
    			.then(data => {
    				this.updateTotal(data['rates'][this.val2]['rate']);
    			})
    			.catch(error => console.warn("[apiGo]: Ошибка!"));
		},
		swap: function(){
			/*Функция, меняющая конвертируемые валюты местами*/
			[this.val1, this.val2] = [this.val2, this.val1];
			[this.mark1, this.mark2] = [this.mark2, this.mark1];
			let doubleArrow = document.querySelector("#doubleArrow");
			doubleArrow.style.transform == "rotate(0deg)" ? doubleArrow.style.transform = "rotate(360deg)" : doubleArrow.style.transform = "rotate(0deg)";
			this.apiGo();
		},
	},
	mounted(){
		document.querySelector("#doubleArrow").style.transform = "rotate(0deg)";
    	this.$nextTick(function(){
    		this.find = this.fact = "";
    		this.ent = false;
    		this.output = "0";
    		this.updateParent();
    	})
	},
	beforeDestroy(){
		this.find = this.fact = "";
    	this.ent = false;
    	this.output = "0";
    	this.updateParent();
	}
}
</script>