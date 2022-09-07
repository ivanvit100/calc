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
			val1: "rub", //Значение валюты: вход
			val2: "dol", //Значение валюты: выход
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
	}
}
</script>