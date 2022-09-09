<template>
<div id="container">
  <button @click="mode = !mode"></button>
  <my-output :findText="findText" :ansText="ansText" :copyText="copyText"></my-output>
  <div id="calc" v-if="mode">
    <div id="more_hide" @click="moreHide" v-if="arrow"><img src="./assets/img/arrow.png" alt="open" id="arrow" :class="{toCommon: classSwitch, toMore: !(classSwitch)}"></div>
    <my-main v-show="show" @updateP="update" :output="output" :findText="findText" :find="find" :copyText="copyText" :fact="fact" :flag="flag" :ent="ent" ref="main"></my-main>
    <more v-if="pc" @updateP="update" @opAdd="opAdd" :output="output" :find="find" :copyText="copyText" :fact="fact" :flag="flag" :ent="ent"></more>
  </div>
  <converter v-else @updateP="update" :output="output" :findText="findText" :find="find" :copyText="copyText" :fact="fact" :flag="flag" :ent="ent"></converter>
  <div id="copy">Скопировано</div>
</div>
</template>

<script>
/*Импорт компонентов.*/
import myOutput from './components/Output.vue';
import myMain from './components/Main.vue';
import more from './components/More.vue';
import converter from './components/converter.vue';
export default{
  name: 'App',
  components: {myOutput, myMain, more, converter},
  data(){
    return{
      showOne: true, //Переключатель элементов
      width: 0, //Ширина окна вывода
      findText: '0', //Вывод примера на экран
      ansText: '', //Вывод предварительного ответа
      output: '', //Хранилище примера
      find: '', //Хранилище ответа
      classSwitch: true, //Переключатель темы
      ent: false, //Была ли вызвана функция Ok()
      copyText: '0', //Копируемый текст
      count: 0, //Количество символов, выодимых на экран
      flag: true, //Целое ли число
      fact: '', //Число для вычисления факториала
      mode: true, //Режим работы приложения
    }
  },
  computed:{
    arrow: function(){
      /*Переменная, отвечающая за отображение блока #more_hide
      на экранах, больших 700px.*/
      return this.width < 700
    },
    show: function(){
      /*Переменная, отвечающая за отображение элемента #common.
      True - если область просмотра больше 700px или #more_hide
      в режиме toCommon.*/
      return !(this.arrow) || this.showOne
    },
    pc: function(){
      /*Переменная, отвечающая за отображение элемента #more.
      True - если область просмотра больше 700px или #more_hide
      в режиме toMore.*/
      return !(this.arrow) || !(this.showOne)
    }
  },
  methods:{
    update: function(data){
      /*Функция, вызываемая дочерним компонентом my-main.
      Получает на вход переменные дочернего компонента,
      обновляет значени локальных переменных, после чего
      вызывает метод,обновляющий значения на экране.*/
      this.output = data.output;
      this.find = data.find;
      this.copyText = data.copyText;
      this.ent = data.ent;
      this.fact = data.fact;
      this.flag = data.flag;
      if(!data.out){this.outputGo()}
    },
    opAdd: function(data){
      /*Функция вызова метода operatorAdd из других компонентов*/
      this.$refs.main.operatorAdd(data.operator, data.func);
    },
    resize: function(){
      /*Функция, обновляющая вывод и значение переменной width
      при изменении ширины экрана.*/
      try{
        this.width = document.querySelector("#container").clientWidth;
        this.count = parseInt(document.querySelector("#find").clientWidth/45);
        this.width >= 700 ? document.querySelector("#container").classList.add("pc") : document.querySelector("#container").classList.remove("pc");
        this.outputGo();
      }catch(e){
        console.warn("[resize]: Ошибка!")
      }  
    },
    blink: function(){
      /*Функция, реализующая "торможение" анимации "моргания курсора"
      при нажатии кнопок посредством временного удаления класса элемента.*/
      document.querySelector("#find").classList.remove("blink");
      setTimeout(function(){document.querySelector("#find").classList.add("blink")}, 200);
    },
    outputGo: function(){
      /*Функция выводит на экран не более чем this.count символов (ширина области ответа,
      поделённая на фиксированное значение ширины наибольшего символа - 45)
      При этом, выводятся this.count последних, если на экране пример,
      и this.count первых - если ответ.*/
      if(this.output.slice(-1) == "…" && this.output.length > parseInt(document.querySelector("#find").clientWidth/45)){this.findText = this.output.substring(0, parseInt(document.querySelector("#find").clientWidth/45)) + "…"}
      else{this.output.length > parseInt(document.querySelector("#find").clientWidth/45) ? this.findText = this.output.slice(-parseInt(document.querySelector("#find").clientWidth/45)) : this.findText = this.output}
      this.output.length == 0 ? this.findText =  "0" : this.findText = this.findText;
      this.output != '' && this.output.slice(-1) != "…" ? this.copyText = this.output : this.copyText = this.copyText;
      this.ansGo();
    },
    ansGo: function(){
      /*Функция выводит предварительный ответ в специальную область на
      экране. Ответ рассчитывается при помощи функции eval().
      Проверки на случай длинных ответов, а также Infinity и NaN.
      Issue: исправить "неверные" ответы
      Пример: 0.3 - 0.2 = 0.0999...*/
      if(this.find.length == 0){this.ansText =  ""}
      try{
        eval(this.find).toString().length > this.count + 3 ? stop = eval(this.find).toString().substring(0, this.count + 2) : stop = eval(this.find);
        [Infinity, NaN].includes(stop) ? this.ansText = "Error" : this.ansText = stop;
      }catch(e){
        if(this.ent && this.output.length > this.count){
          this.ent = false;
          this.output = this.output + "…";
          this.outputGo();
          this.output = "";
        }else{console.warn("[ansGo]: Ошибка!")}
      }
      this.blink();
    },
    moreHide: function(){
      /*Функция переключения статуса страницы,
      необходима для отображения дополнительных
      математических клавиш в мобильной версии приложения.*/
      this.classSwitch = !(this.classSwitch);
      this.showOne = !(this.showOne);
    },
  },
  mounted(){
    /*Метод, предназначенный для отслеживания изменения ширины экрана.*/
    this.$nextTick(function(){
      window.addEventListener('resize', this.resize);
      this.width = document.querySelector("#container").clientWidth;
      this.count = parseInt(document.querySelector("#find").clientWidth/45);
      this.width >= 700 ? document.querySelector("#container").classList.add("pc") : document.querySelector("#container").classList.remove("pc");
      var config = {
        duration: 300,
      };
      //Эффект волн при нажатии
      Waves.attach('#output', ['waves-block', 'waves-classic']);
      Waves.init(config);
      //Отключение контекстного меню
      document.oncontextmenu = function(){return false};
    })
  }
}
</script>
