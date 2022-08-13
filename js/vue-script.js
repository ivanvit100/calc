/* Cкрипт определения объектов Vue проекта "Калькулятор | ivanvit.ru"
Project: https://calc.ivanvit.ru

GitHub: https://github.com/ivanvit100
E-Mail: develope@ivanvit.ru */

stop = "";

var prim = new Vue({
	el:'#output',
  data:{
    findText: '0',
    ansText: '',
    src: './img/light.png',
  },
  computed:{
  	text:{
      get: function(){return this.findText},
      set: function(){
        /*Функция выводит на экран не более чем count символов (ширина области ответа,
        поделённая на фиксированное значение ширины наибольшего символа - 45)
        При этом, выводятся count последних, если на экране пример,
        и count первых - если ответ.*/
        blink();
        count = parseInt(document.querySelector("#find").clientWidth/45);
        if(output.slice(-1) == "…" && output.length > count){this.findText = output.substring(0, count - 2) + "…"}
        else if(output.length > count){this.findText = output.slice(-count)}else{this.findText = output}
        if(output.length == 0){this.findText =  "0"}
        this.all = '';
      },
    },
    all:{
      get: function(){return this.ansText},
      set: function(){
        /*Функция выводит предварительный ответ в специальную область на
        экране. Ответ рассчитывается при помощи функции eval().
        Проверки на случай длинных ответов, а также Infinity и NaN.
        Issue: исправить "неверные" ответы
        Пример: 0.3 - 0.2 = 0.0999...*/
        if(find.length == 0){this.ansText =  ""}
        try{
          count = parseInt(document.querySelector("#find").clientWidth/45) + 3;
          if(eval(find).toString().length > count){stop = eval(find).toString().substring(0, count - 1)}
          else{stop = eval(find)}
          if([Infinity, NaN].includes(stop)){this.ansText = "Error"}
          else{this.ansText = stop}
        }catch(e){
          count = parseInt(document.querySelector("#find").clientWidth/45);
          if(ent && output.length > count){
            ent = false;
            console.log(find);
            output = output + "…";
            prim.text = '';
            output = "";
          }else{console.warn("Ошибка!")}
        }
      },
    }
  },
});

var copy = new Vue({
  el: '#copy',
  data: {
    seen: false
  },
});