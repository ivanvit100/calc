<template>
<div id="container">
  <my-output @updateMode="updateMode" :findText="findText" :ansText="ansText" :copyText="copyText"></my-output>
  <div id="calc" v-if="mode">
    <div id="more_hide" @click="moreHide" v-if="arrow"><img src="./assets/img/arrow.png" alt="open" id="arrow" :class="{toCommon: classSwitch, toMore: !(classSwitch)}"></div>
    <my-main v-bind="config" :findText="findText" @update="update" ref="main"></my-main>
    <more v-if="pc" v-bind="config" @update="update" @opAdd="opAdd"></more>
  </div>
  <div v-else id="convCont">
    <converter v-bind="config" @update="update" @updateVal="updateVal" @updateT="updateTotal" :findText="findText" :total="total" :val1="val1" :val2="val2"></converter>
    <my-main v-bind="config" :findText="findText" @update="update" ref="main"></my-main>
    <more v-if="pc" v-bind="config" @update="update" @opAdd="opAdd"></more>
  </div>
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
      classSwitch: true, //Переключатель темы
      count: 0, //Количество символов, выодимых на экран
      mode: true, //Режим работы приложения
      total: 0, //Курс выбранных валют
      val1: "", //Валюта: вход
      val2: "", //Валюта: выход
      config: {
        output: '', //Хранилище примера
        find: '', //Хранилище ответа
        copyText: '0', //Копируемый текст
        ent: false, //Была ли вызвана функция Ok()
        flag: true, //Целое ли число
        fact: '', //Число для вычисления факториала
      },
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
    },
  },
  methods:{
    update: function(data){
      /*Функция, вызываемая дочерним компонентом my-main.
      Получает на вход переменные дочернего компонента,
      обновляет значени локальных переменных, после чего
      вызывает метод,обновляющий значения на экране.*/
      this.config.output = data.output;
      this.config.find = data.find;
      this.config.copyText = data.copyText;
      this.config.ent = data.ent;
      this.config.fact = data.fact;
      this.config.flag = data.flag;
      if(!data.out){this.outputGo()}
    },
    updateTotal: function(data){
      /*Функция обновления курса валют*/
      this.total = data.total;
    },
    updateVal: function(data){
      /*Функция обновления значений валют для двусторонней связи*/
      this.val1 = data.val1;
      this.val2 = data.val2;
    },
    updateMode: function(data){
      /*Функция, переключающая режим работы приложения*/
      this.mode = data.mode;
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
      if(this.config.output.slice(-1) == "…" && this.config.output.length > parseInt(document.querySelector("#find").clientWidth/45)){this.findText = this.config.output.substring(0, parseInt(document.querySelector("#find").clientWidth/45)) + "…"}
      else{this.config.output.length > parseInt(document.querySelector("#find").clientWidth/45) ? this.findText = this.config.output.slice(-parseInt(document.querySelector("#find").clientWidth/45)) : this.findText = this.config.output}
      this.config.output.length == 0 ? this.findText =  "0" : this.findText = this.findText;
      this.config.output != '' && this.config.output.slice(-1) != "…" ? this.config.copyText = this.config.output : this.config.copyText = this.config.copyText;
      this.ansGo();
    },
    ansGo: function(){
      /*Функция выводит предварительный ответ в специальную область на
      экране. Ответ рассчитывается при помощи функции eval().
      Проверки на случай длинных ответов, а также Infinity и NaN.
      Issue: исправить "неверные" ответы
      Пример: 0.3 - 0.2 = 0.0999...*/
      if(this.config.find.length == 0){this.ansText =  ""}
      try{
        eval(this.config.find).toString().length > this.count + 3 ? stop = eval(this.config.find).toString().substring(0, this.count + 2) : stop = eval(this.config.find);
        [Infinity, NaN].includes(stop) ? this.ansText = "Error" : this.ansText = stop;
        if(this.total != 0 && !this.mode){
          this.config.copyText = this.ansText = this.ansText * this.total;
        }
      }catch(e){
        if(this.config.ent && this.config.output.length > this.count){
          this.config.ent = false;
          this.config.output = this.config.output + "…";
          this.outputGo();
          this.config.output = "";
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
