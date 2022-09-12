<!--Компонент конвертера валют-->
<template>
<div id="converterKeyboard">
	<div id="currencyChange">
		<select v-model="val1" id="in">
			<option disabled value="" selected>Конвертировать из</option>
			<option v-for="item in currency" v-bind:value="item.name">{{item.fullname}}</option>
		</select>
		<img @click="swap" src="@/assets/img/doubleArrow.png" alt="swap" id="doubleArrow">
		<select v-model="val2" id="out">
			<option disabled value="" selected>Конвертировать в</option>
			<option v-for="item in currency" v-bind:value="item.name">{{item.fullname}}</option>
		</select>
	</div>
	<my-main @updateP="updateP" :output="output" :findText="findText" :find="find" :copyText="copyText" :fact="fact" :flag="flag" :ent="ent" ref="main" style="margin: auto; grid-column: 1/4;"></my-main>
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
	props: ['findText', 'copyText', 'output', 'find', 'ent', 'fact', 'flag', 'total'],
	data(){
		return{
			val1: 0, //Значение валюты: вход
			val2: 0, //Значение валюты: выход
			key: "9116ea120a47ab05aa695a9c3199d1437def2d53", //Ключ для обращения к API
			buttons: ["num7", "num8", "num9", "num4", "num5", "num6", "num1", "num2", "num3"], //Кнопки
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
   			if(newVal != oldVal && this.val2 != 0){
   				this.apiGo()
   			}
   		},
   		val2(newVal, oldVal){
   			if(newVal != oldVal && this.val1 != 0){
   				this.apiGo()
   			}
   		},
   	},
	methods:{
		updateParent: function(){
			/*Функция обновления родитльских данных вывода.*/
			this.$emit('updateP', {
				output: this.output,
				find: this.find,
				copyText: this.copyText,
				ent: this.ent,
				fact: this.fact,
				flag: this.flag,
			});
		},
		updateP: function(data){
			this.output = data.ouput;
			this.ent = data.ent;
			this.flag = data.flag;
			this.fact = data.fact;
			try{
				this.find = eval(data.find) * this.total;
				this.copyText = this.find;
			}catch(e){console.log("[converterFromMain]: Ошибка!")}
			this.updateParent();
		},
		updateTotal: function(total){
			/*Функция обновления курса выбранных валют*/
			this.$emit('updateT', {
				total: total,
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
			let change = this.val1;
			this.val1 = this.val2;
			this.val2 = change;
			let doubleArrow = document.querySelector("#doubleArrow");
			for(var i = 1; i <= 360; i++){
				setInterval(function(){
					doubleArrow.style.transform = "rotate(" + i + "deg)";
				}, 20)
			}
		},
	}
}
</script>