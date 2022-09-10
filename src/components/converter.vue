<!--Компонент конвертера валют-->
<template>
<div id="converterKeyboard">
	<div id="currencyChange">
		<select name="Из валюты" id="in">
			<option v-for="item in currency" value="{{item.name}}">{{item.fullname}}</option>
		</select>
		<select name="В валюту" id="out">
			<option v-for="item in currency" value="{{item.name}}">{{item.fullname}}</option>
		</select>
	</div>
	<div v-for="item in buttons" class="button num{{item}}" @click="numAdd(item)">{{item}}</div>
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
			buttons: ["7", "8", "9", "4", "5", "6", "1", "2", "3"], //Кнопки
		}
	},
	computed:{
    	url: function(){
    		/*Переменная, хранящая URL, необходимый для доступа к API*/
    		return "https://api.getgeoapi.com/v2/currency/convert?api_key=" + this.key + "&from=" + this.val1 + "&to=" + this.val2 + "&amount=1&format=json"
    	},
    	currency: function(){
    		/**/
    		return JSON.parse(curData)
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