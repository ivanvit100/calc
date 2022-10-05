<template>
<div id="output" @dblclick="copyToClipboard">
	<div id="switch">
		<img v-if="dark" @click="light" src="@/assets/img/light.png" alt="switch" class="swh">
		<img v-else @click="light" src="@/assets/img/dark.png" alt="switch" class="swh" rel="preload">
	</div>
	<div id="mode">
		<img :class="{act: act}" @click="modeChange(true)" src="@/assets/img/calc.svg" alt="calculator" id="calcButton">
		<img :class="{act: !act}" @click="modeChange(false)" src="@/assets/img/usd.svg" alt="currecy" id="currencyButton">
	</div>
	<span id="find" class="blink">{{findText}}{{!mode ? mark1 : ""}}</span>
	<span id="ans">{{!mode && ansText == "" ? "0" : ansText}}{{!mode ? mark2 : ""}}</span>
</div>
</template>

<script>
export default{
	name: 'myOutput',
	props: ['findText', 'ansText', 'copyText', 'mark1', 'mark2', 'mode'],
	data(){
    	return{
    		dark: true,
    		act: true,
    	}
    },
	methods:{
		modeChange: function(m){
			/*Функция, переключающая режим работы приложения*/
			this.act = m;
			this.$emit('updateMode', {
				mode: m,
			});
		},
		copyToClipboard: function(){
			/*Функция вызывается при двойном клике на окно отображения примера.
			Предназначена для отключения встроенного поведения, копирования
			содержимого поля и отображения соответствующего сообщения пользователю.*/
			event.preventDefault();
			var input = document.createElement("input");
			input.classList.add("copyInput");
			input.value = this.copyText;
			document.querySelector("#container").appendChild(input);
			navigator.clipboard.writeText(this.copyText).then(() => {
        		console.log("[Navigator]: clipboard write '" + this.copyText + "' success")
    		}, () => {
    			document.querySelector("#copyInput").select();  
    			cs = document.execCommand('copy');
    			console.log("[Document]: clipboard write '" + cs + "'");
    		});
    		input.remove();
    		document.querySelector("#copy").style.bottom = "20px";
    		document.querySelector("#copy").style.opacity = 0.75;
    		setTimeout(function(){document.querySelector("#copy").style.opacity = 0}, 750);
    		setTimeout(function(){document.querySelector("#copy").style.bottom = "-200px"}, 1450);
    	},
    	light: function(){
    		/*Функция переключает тему сайта*/
    		document.querySelector("*").classList.toggle("light") ? this.dark = false : this.dark = true;
    	}
	}
}
</script>