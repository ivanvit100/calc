/*Скрипт для обнаружения нажатий проекта "Калькулятор | ivanvit.ru"
Project: https://calc.ivanvit.ru

GitHub: https://github.com/ivanvit100
E-Mail: develope@ivanvit.ru */

//Смена темы
document.querySelector("#switch").onclick = function(){light()}
//Показать/скрыть блок дополнительных математических клавиш
document.querySelector("#more_hide").onclick = function(){more_hide()}
document.addEventListener('keydown', function(event){
	//Функция обнаружения нажатий клавиш физической клавиатуры
	if(event.key >= 0 && event.key <= 9){
		/*Числовые клавишы вызывают функцию numAdd()
		посредством имитации нажатия на соответствующую
		кнопку класса num*/
		el = document.querySelector(".num" + event.key);
	}
	else{
		/*Прочие клавиши перехватываются и направляются 
		по спецефичному ID*/
		switch(event.key){
			case '/':
			el = document.querySelector("#dl");
			break;
			case '*':
			el = document.querySelector("#mn");
			break;
			case '(':
			el = document.querySelector("#sc");
			break;
			case ')':
			el = document.querySelector("#sc2");
			break;
			default:
			/*Если клавиши кнопки с подобным event.key не существует,
			производится попытка вызвать нажатие на кнопку
			с соответствующим event.code (Enter, Backspace, Comma etc.)*/
			el = document.querySelector("." + event.code);
			break;
		}
	}
	try{
		/*Конструкция try catch применяется с целью избежать ошибок
		в консоли при нажатии на клавишу, не имеющую соответствующего ей
		элемента в интерфейсе, а также для идентификации такой клавиши.*/
		el.click();
		el.classList.add("hover");
		intervalID = setTimeout(function(){el.classList.remove("hover")}, 200);
	}catch(e){console.warn("Нет команды для клавиши: " + event.key + "/" + event.code)}
});