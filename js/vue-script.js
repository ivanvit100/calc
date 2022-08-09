/* Cкрипт определения объектов Vue проекта "Калькулятор | ivanvit.ru"
Project: https://calc.ivanvit.ru

GitHub: https://github.com/ivanvit100
E-Mail: develope@ivanvit.ru */

var ans = new Vue({
	el:'#ans',
  data:{
  	text: '',
  }
});
var prim = new Vue({
	el:'#find',
  data:{
  	text: '0',
  }
});
var swh = new Vue({
	el:'#swh',
  data:{
  	src: './img/light.png',
  }
});
var copy = new Vue({
  el: '#copy',
  data: {
    seen: false
  },
});