document.querySelector("#switch").onclick = function(){light()}
document.querySelector("#more_hide").onclick = function(){more_hide()}
document.addEventListener('keydown', function(event){
	if(event.key >= 0 && event.key <= 9){
		el = document.querySelector(".num" + event.key);
	}
	else{
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
			el = document.querySelector("." + event.code);
			break;
		}
	}
	try{
		el.click();
		el.classList.add("hover");
		intervalID = setTimeout(function(){el.classList.remove("hover")}, 200);
	}catch(e){console.warn("Нет команды для клавиши: " + event.key + "/" + event.code)}
});

curs.ondblclick = function(){
	event.preventDefault();
	curs.focus();  
	document.execCommand('copy');
	copy.seen = true;
	setTimeout(function(){copy.seen = false}, 1450);
}