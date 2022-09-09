<!--Компонент конвертера валют-->
<template>
<div>
</div>
</template>

<script>
export default{
	name: 'myMain',
	props: ['findText', 'copyText', 'output', 'find', 'ent', 'fact', 'flag'],
	data(){
		return{
			val1: "RUB", //Значение валюты: вход
			val2: "USD", //Значение валюты: выход
			key: "{key}", //Ключ для обращения к API
			url: "https://api.getgeoapi.com/v2/currency/list?api_key=${this.key}&format=json", //URL API
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
	},
	mounted(){
    	this.$nextTick(function(){
    		console.log(this.url);
    		fetch(this.url)
    			.then(response => response.json())
    			.then(data => console.log(data));
    	})
	}
}
</script>