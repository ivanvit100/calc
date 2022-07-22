output = "";
find = "";
ints = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
outputElement = document.querySelector("#output");
document.querySelector("#one").onclick = function(){
    output += "1";
    find += "1";
    prim.text = output;
    ans.text = eval(find);
}
document.querySelector("#two").onclick = function(){
    output += "2";
    find += "2";
    prim.text = output;
    ans.text = eval(find);
}
document.querySelector("#three").onclick = function(){
    output += "3";
    find += "3";
    prim.text = output;
    ans.text = eval(find);
}
document.querySelector("#four").onclick = function(){
    output += "4";
    find += "4";
    prim.text = output;
    ans.text = eval(find);
}
document.querySelector("#five").onclick = function(){
    output += "5";
    find += "5";
    prim.text = output;
    ans.text = eval(find);
}
document.querySelector("#six").onclick = function(){
    output += "6";
    find += "6";
    prim.text = output;
    ans.text = eval(find);
}
document.querySelector("#seven").onclick = function(){
    output += "7";
    find += "7";
    prim.text = output;
    ans.text = eval(find);
}
document.querySelector("#eight").onclick = function(){
    output += "8";
    find += "8";
    prim.text = output;
    ans.text = eval(find);
}
document.querySelector("#nine").onclick = function(){
    output += "9";
    find += "9";
    prim.text = output;
    ans.text = eval(find);
}
document.querySelector("#plus").onclick = function(){
	last = find.slice(-1);
	if(last in ints){
		output += "+";
    	find += "+";
    	prim.text = output;
    	output = "";
	}
}