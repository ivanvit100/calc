<!--Компонент конвертера валют-->
<template>
<div id="converterKeyboard">
	<div id="currencyChange">
		<input type="text" id="in">
		<input type="text" id="out">
	</div>
	<div class="button num7" @click="numAdd('7')">7</div>
	<div class="button num8" @click="numAdd('8')">8</div>
	<div class="button num9" @click="numAdd('9')">9</div>
	<div class="button num4" @click="numAdd('4')">4</div>
	<div class="button num5" @click="numAdd('5')">5</div>
	<div class="button num6" @click="numAdd('6')">6</div>
	<div class="button num1" @click="numAdd('1')">1</div>
	<div class="button num2" @click="numAdd('2')">2</div>
	<div class="button num3" @click="numAdd('3')">3</div>
	<div class="button num0" @click="Zero()">0</div>
	<div class="button Period Comma NumpadDecimal" @click="Dot()">.</div>
	<div class="button Backspace" @click="Del()"><img src="@/assets/img/dl.png" alt="del" id="del"></div>
</div>
</template>

<script>
export default{
	name: 'myMain',
	props: ['findText', 'copyText', 'output', 'find', 'ent', 'fact', 'flag', 'total'],
	data(){
		return{
			val1: "USD", //Значение валюты: вход
			val2: "RUB", //Значение валюты: выход
			key: "9116ea120a47ab05aa695a9c3199d1437def2d53", //Ключ для обращения к API
			currency: ['RUB', 'USD', 'EUR', 'BRL', 'ISK', 'JPY', 'KZT', 'KGS', 'BYN', 'CAD', 'UAH', 'CNY'], //Список идентификаторов валют
			names: ['Рубль', 'Доллар', 'Евро', 'Реал', 'Крона', 'Иена', 'Тенге', 'Сом', 'Белорусский рубль', 'Канадский доллар', 'Гривна', 'Юань'], //Список именований валют
		}
	},
	computed:{
    	url: function(){
    		/*Переменная, хранящая URL, необходимый для доступа к API*/
    		return "https://api.getgeoapi.com/v2/currency/convert?api_key=" + this.key + "&from=" + this.val1 + "&to=" + this.val2 + "&amount=1&format=json"
    	}
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
				out: this.out
			});
		},
		updateTotal: function(total){
			/*Функция обновления курса выбранных валют*/
			console.log(total);
			this.$emit('updateT', {
				total: total,
			});
		},
	},
	mounted(){
    	this.$nextTick(function(){
    		let val = this.val2;
    		if(this.total == 0){
    			fetch(this.url)
    				.then(response => response.json())
    				.then(data => {
    					this.updateTotal(data['rates'][val]['rate']);
    				})
    				.catch(error => console.error(error));
    		}
    	})
	}
}
</script>