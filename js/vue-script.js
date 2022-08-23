/*Экземпляр Vue проекта "Калькулятор | ivanvit.ru"
Project: https://calc.ivanvit.ru

GitHub: https://github.com/ivanvit100
E-Mail: develope@ivanvit.ru */

stop = "";

var prim = new Vue({
	el:'#container',
  data:{
    findText: '0',
    ansText: '',
    src: './img/light.png',
    showOne: true,
    width: 0,
    find: '',
    output: '',
  },
  computed:{
    show: function(){
      /*Переменная, отвечающая за отображение элемента #common.
      True - если область просмотра больше 700px или #more_hide
      в режиме toCommon.*/
      return this.width >= 700 || this.showOne ? true : false
    },
    pc: function(){
      /*Переменная, отвечающая за отображение элемента #more.
      True - если область просмотра больше 700px или #more_hide
      в режиме toMore.*/
      return this.width >= 700 || !(this.showOne) ? true : false
    }
  },
  methods:{
    copyToClipboard: function(){
      /*Функция вызывается при двойном клике на окно отображения примера.
      Предназначена для отключения встроенного поведения, копирования
      содержимого поля и отображения соответствующего сообщения пользователю.*/
      event.preventDefault();
      input = document.createElement("input");
      input.classList.add("copyInput");
      input.value = this.findText;
      document.querySelector("#container").appendChild(input);
      navigator.clipboard.writeText(this.findText).then(() => {
        console.log("[Navigator]: clipboard write '" + this.findText + "' success")
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
    resize: function(){
      /*Функция, обновляющая вывод и значение переменной width
      при изменении ширины экрана.*/
      this.width = window.innerWidth;
      this.outputGo();
    },
    outputGo: function(){
      /*Функция выводит на экран не более чем count символов (ширина области ответа,
      поделённая на фиксированное значение ширины наибольшего символа - 45)
      При этом, выводятся count последних, если на экране пример,
      и count первых - если ответ.*/
      count = parseInt(document.querySelector("#find").clientWidth/45);
      if(this.output.slice(-1) == "…" && this.output.length > count){this.findText = this.output.substring(0, count - 2) + "…"}
      else{this.output.length > count ? this.findText = this.output.slice(-count) : this.findText = this.output}
      this.output.length == 0 ? this.findText =  "0" : this.findText = this.findText
      this.ansGo();
      this.blink();
    },
    ansGo: function(){
      /*Функция выводит предварительный ответ в специальную область на
      экране. Ответ рассчитывается при помощи функции eval().
      Проверки на случай длинных ответов, а также Infinity и NaN.
      Issue: исправить "неверные" ответы
      Пример: 0.3 - 0.2 = 0.0999...*/
      if(this.find.length == 0){this.ansText =  ""}
      try{
        count = parseInt(document.querySelector("#find").clientWidth/45) + 3;
        eval(this.find).toString().length > count ? stop = eval(this.find).toString().substring(0, count - 1) : stop = eval(this.find);
        [Infinity, NaN].includes(stop) ? this.ansText = "Error" : this.ansText = stop;
      }catch(e){
        count = parseInt(document.querySelector("#find").clientWidth/45);
        if(ent && this.output.length > count){
          ent = false;
          this.output = this.output + "…";
          this.outputGo();
          this.output = "";
        }else{console.warn("Ошибка!")}
      }
    },
    blink: function(){
      /*Функция, реализующая "торможение" анимации "моргания курсора"
      при нажатии кнопок посредством временного удаления класса элемента.*/
      document.querySelector("#find").classList.remove("blink");
      intervalID = setTimeout(function(){document.querySelector("#find").classList.add("blink")}, 200);
    }
  },
  created(){
    /*Метод, предназначенный для отслеживания изменения ширины экрана.*/
    window.addEventListener('resize', this.resize);
    this.resize();
    document.querySelector("#find").classList.add("blink");
  }
});