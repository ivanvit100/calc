webpackJsonp([1],[,,,,,function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0__components_Output_vue__=__webpack_require__(6),__WEBPACK_IMPORTED_MODULE_1__components_Main_vue__=__webpack_require__(23),__WEBPACK_IMPORTED_MODULE_2__components_More_vue__=__webpack_require__(40),__WEBPACK_IMPORTED_MODULE_3__components_converter_vue__=__webpack_require__(42);__webpack_exports__.a={name:"App",components:{myOutput:__WEBPACK_IMPORTED_MODULE_0__components_Output_vue__.a,myMain:__WEBPACK_IMPORTED_MODULE_1__components_Main_vue__.a,more:__WEBPACK_IMPORTED_MODULE_2__components_More_vue__.a,converter:__WEBPACK_IMPORTED_MODULE_3__components_converter_vue__.a},data:function(){return{showOne:!0,width:0,findText:"0",ansText:"",output:"",find:"",classSwitch:!0,ent:!1,copyText:"0",count:0,flag:!0,fact:"",mode:!0}},computed:{arrow:function(){return this.width<700},show:function(){return!this.arrow||this.showOne},pc:function(){return!this.arrow||!this.showOne}},methods:{update:function(t){this.output=t.output,this.find=t.find,this.copyText=t.copyText,this.ent=t.ent,this.fact=t.fact,this.flag=t.flag,t.out||this.outputGo()},opAdd:function(t){this.$refs.main.operatorAdd(t.operator,t.func)},resize:function(){try{this.width=document.querySelector("#container").clientWidth,this.count=parseInt(document.querySelector("#find").clientWidth/45),this.width>=700?document.querySelector("#container").classList.add("pc"):document.querySelector("#container").classList.remove("pc"),this.outputGo()}catch(t){console.warn("[resize]: Ошибка!")}},blink:function(){document.querySelector("#find").classList.remove("blink"),setTimeout(function(){document.querySelector("#find").classList.add("blink")},200)},outputGo:function(){"…"==this.output.slice(-1)&&this.output.length>parseInt(document.querySelector("#find").clientWidth/45)?this.findText=this.output.substring(0,parseInt(document.querySelector("#find").clientWidth/45))+"…":this.output.length>parseInt(document.querySelector("#find").clientWidth/45)?this.findText=this.output.slice(-parseInt(document.querySelector("#find").clientWidth/45)):this.findText=this.output,0==this.output.length?this.findText="0":this.findText=this.findText,""!=this.output&&"…"!=this.output.slice(-1)?this.copyText=this.output:this.copyText=this.copyText,this.ansGo()},ansGo:function ansGo(){0==this.find.length&&(this.ansText="");try{eval(this.find).toString().length>this.count+3?stop=eval(this.find).toString().substring(0,this.count+2):stop=eval(this.find),[1/0,NaN].includes(stop)?this.ansText="Error":this.ansText=stop}catch(t){this.ent&&this.output.length>this.count?(this.ent=!1,this.output=this.output+"…",this.outputGo(),this.output=""):console.warn("[ansGo]: Ошибка!")}this.blink()},moreHide:function(){this.classSwitch=!this.classSwitch,this.showOne=!this.showOne}},mounted:function(){this.$nextTick(function(){window.addEventListener("resize",this.resize),this.width=document.querySelector("#container").clientWidth,this.count=parseInt(document.querySelector("#find").clientWidth/45),this.width>=700?document.querySelector("#container").classList.add("pc"):document.querySelector("#container").classList.remove("pc");var t={duration:300};Waves.attach("#output",["waves-block","waves-classic"]),Waves.init(t),document.oncontextmenu=function(){return!1}})}}},function(t,i,n){"use strict";var s=n(7),e=n(20),u=n(0),o=u(s.a,e.a,!1,null,null,null);i.a=o.exports},function(t,i,n){"use strict";i.a={name:"myOutput",props:["findText","ansText","copyText"],data:function(){return{dark:!0}},methods:{copyToClipboard:function(){var t=this;event.preventDefault();var i=document.createElement("input");i.classList.add("copyInput"),i.value=this.copyText,document.querySelector("#container").appendChild(i),navigator.clipboard.writeText(this.copyText).then(function(){console.log("[Navigator]: clipboard write '"+t.copyText+"' success")},function(){document.querySelector("#copyInput").select(),cs=document.execCommand("copy"),console.log("[Document]: clipboard write '"+cs+"'")}),i.remove(),document.querySelector("#copy").style.bottom="20px",document.querySelector("#copy").style.opacity=.75,setTimeout(function(){document.querySelector("#copy").style.opacity=0},750),setTimeout(function(){document.querySelector("#copy").style.bottom="-200px"},1450)},light:function(){document.querySelector("*").classList.toggle("light")?this.dark=!1:this.dark=!0}}}},function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_is_integer__=__webpack_require__(9),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_is_integer___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_is_integer__);__webpack_exports__.a={name:"myMain",props:["findText","copyText","output","find","ent","fact","flag"],data:function(){return{chk:!1,out:!1}},computed:{last:function(){return this.find.slice(-1)},last4:function(){return this.output.slice(-4)}},methods:{updateParent:function(){this.$emit("updateP",{output:this.output,find:this.find,copyText:this.copyText,ent:this.ent,fact:this.fact,flag:this.flag,out:this.out})},numAdd:function(t){")"==this.find.slice(-1)||["e","π","!"].includes(this.output.slice(-1))||("0"==this.output&&(this.output=this.find=""),this.output+=t,this.find+=t,this.fact+=t,this.out=!1,this.updateParent())},Zero:function Zero(){try{this.chk=__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_is_integer___default()(eval(this.output.slice(-1)))}catch(t){this.chk=!1}this.chk||"."==this.output.slice(-1)?this.numAdd("0"):["e","π"].includes(this.output.slice(-1))||")"==this.output.slice(-1)?console.warn("[Zero]: Ошибка"):(this.output+="0.",this.find+="0.",this.fact+="0.",this.flag=this.out=!1,this.updateParent())},Dot:function Dot(){try{this.chk=__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_is_integer___default()(eval(this.last))}catch(t){this.chk=!1}this.flag&&this.chk&&!["e","π"].includes(this.output.slice(-1))?(this.operatorAdd(".","."),this.fact+="."):this.flag&&")"!=this.output.slice(-1)&&!["e","π"].includes(this.output.slice(-1))&&(this.output+="0.",this.find+="0.",this.fact+="0.",this.out=!1,this.updateParent()),this.flag=!1},operatorAdd:function operatorAdd(operator,func){try{this.chk=__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_is_integer___default()(eval(this.last))}catch(t){this.chk=!1}this.chk||")"==this.last?(this.output+=operator,this.find+=func):""==this.find&&"0"==this.findText&&"-"==operator?this.find=this.output="-":""!=this.find||"0"!=this.findText&&"false"!=this.findText&&"true"!=this.findText?""==this.find?(this.output=this.findText+operator,this.find=this.findText+func):"="==this.last?(this.output=this.output.substring(0,this.output.length-1)+operator,this.find=this.find.substring(0,this.find.length-2)+func):"("==this.last?console.warn("[operatorAdd]: Ошибка!"):!["+","-","*","^","/","."].includes(this.last)||"."==operator&&this.flag?(this.output+=operator,this.find+=func):["+","-","*","^","/","."].includes(this.last)&&"-"!=this.findText?(this.output=this.output.substring(0,this.output.length-1)+operator,this.find=this.find.substring(0,this.find.length-1)+func):["+","-","*","^","/","."].includes(this.last)&&(this.output="0"+operator,this.find="0"+func):(this.output="0"+operator,this.find="0"+func),this.flag="."!=operator,"."!=func&&(this.fact=""),this.out=!1,this.updateParent()},scAdd:function scAdd(input){try{this.chk=__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_is_integer___default()(eval(this.last))}catch(t){this.chk=!1}"("!=input||this.chk||[".",")"].includes(this.last)||(this.output+=input,this.find+=input),")"==input&&(this.chk||")"==this.last)&&"."!=this.last&&this.output.split("(").length-1>this.output.split(")").length-1&&(this.output+=input,this.find+=input),this.out=!1,this.updateParent(),this.fact="",this.flag=!0},Clear:function(){this.find=this.fact="",this.flag=!0,this.copy=this.output="0",this.out=!1,this.updateParent()},Ok:function Ok(){""==this.find&&0!=document.querySelector("#ans").innerText||("Error"!=document.querySelector("#ans").innerText?this.output=String(eval(this.find)):this.output="",this.find="",this.ent=this.flag=!0,this.out=!1,this.updateParent(),this.out=!0,this.ent=!1,this.fact=this.output="",this.updateParent())},findDEL:function(){for(console.log("TEST");["0","1","2","3","4","5","6","7","8","9"].includes(this.find.slice(-1));)this.find=this.find.substring(0,this.find.length-1)},Del:function(){if(this.flag=!0,["!"].includes(this.output.slice(-1))){this.findDEL(),"e+"==this.find.slice(-2)&&(this.find=this.find.substring(0,this.find.length-2),this.findDEL(),"."==this.last&&(this.find=this.find.substring(0,this.find.length-1),this.findDEL()));var t=0,i="";for(this.output=this.output.substring(0,this.output.length-1);["0","1","2","3","4","5","6","7","8","9"].includes(this.output.substring(this.output.length-1-t,this.output.length-t));)i=this.output.substring(this.output.length-1-t,this.output.length-t)+i,t+=1;this.output=this.output+"!",this.find+=i,this.fact=i}else"π"==this.output.slice(-1)||"e"==this.output.slice(-1)?this.find=this.find.substring(0,this.find.length-17):this.last in["0","1","2","3","4","5","6","7","8","9","."]?(this.flag=!1,this.find=this.find.substring(0,this.find.length-1),this.fact=this.fact.substring(0,this.fact.length-1)):"="==this.last?this.find=this.find.substring(0,this.find.length-2):["sin(","cos(","tan("].includes(this.last4)?(this.find=this.find.substring(0,this.find.length-9),this.output=this.output.substring(0,this.output.length-3)):["log("].includes(this.last4)?(this.find=this.find.substring(0,this.find.length-11),this.output=this.output.substring(0,this.output.length-3)):["ln("].includes(this.output.slice(-3))?(this.find=this.find.substring(0,this.find.length-9),this.output=this.output.substring(0,this.output.length-2)):["ctn("].includes(this.output.slice(-4))?(this.find=this.find.substring(0,this.find.length-4),this.output=this.output.substring(0,this.output.length-3)):["√("].includes(this.output.slice(-2))?(this.find=this.find.substring(0,this.find.length-10),this.output=this.output.substring(0,this.output.length-1)):["^"].includes(this.output.slice(-1))?this.find=this.find.substring(0,this.find.length-2):this.find=this.find.substring(0,this.find.length-1);"0."==this.output.slice(-2)&&(this.find=this.find.substring(0,this.find.length-1),this.output=this.output.substring(0,this.output.length-1)),this.output=this.output.substring(0,this.output.length-1),this.out=!1,this.updateParent()}}}},,,,,function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_is_integer__=__webpack_require__(9),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_is_integer___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_is_integer__);__webpack_exports__.a={name:"more",props:["copyText","output","find","ent","fact","flag"],computed:{last:function(){return this.output.slice(-1)}},methods:{updateParent:function(){this.$emit("updateP",{output:this.output,find:this.find,copyText:this.copyText,ent:this.ent,fact:this.fact,flag:this.flag})},operatorAdd:function(t,i){this.$emit("opAdd",{operator:t,func:i})},cnstAdd:function(t,i){["=",">","<","-","+","/","*","","("].includes(this.last)?(this.output+=t,this.find+=i,this.fact="",this.updateParent()):""==this.find&&(this.output=t,this.find=i,this.fact="",this.updateParent())},ctn:function(t){return 1/Math.tan(t)},newNum:function(){for(var t=0,i="";["0","1","2","3","4","5","6","7","8","9","."].includes(this.output.substring(this.output.length-1-t,this.output.length-t));)i=this.output.substring(this.output.length-1-t,this.output.length-t)+i,t+=1;return i},fAdd:function fAdd(){if(""==this.output){this.output=this.findText;var nm=this.newNum();"0"!=nm&&(this.fact=nm),"-"==this.output.substring(0,1)&&(this.find="-")}""==this.fact&&["0","1","2","3","4","5","6","7","8","9"].includes(this.output.slice(-1))&&(this.fact=this.newNum()),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_is_integer___default()(eval(this.fact))&&(this.output+="!",this.find=this.find.substring(0,this.find.length-this.length)+String(this.factorial(this.fact)),this.fact=""),this.updateParent()},factorial:function(t){try{return 1!=t?t*this.factorial(t-1):1}catch(t){return"Error"}}},mounted:function(){var t={duration:300};Waves.attach("#output",["waves-block","waves-classic"]),Waves.attach(".moreButton",["waves-block","waves-classic"]),Waves.init(t)}}},function(t,i,n){"use strict";i.a={name:"myMain",props:["findText","copyText","output","find","ent","fact","flag"],data:function(){return{val1:"rub",val2:"dol"}},methods:{updateParent:function(){this.$emit("updateP",{output:this.output,find:this.find,copyText:this.copyText,ent:this.ent,fact:this.fact,flag:this.flag,out:this.out})}}}},function(t,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=n(4),e=n(19),u=(n(6),n(46));n(48),n(50),s.a.config.productionTip=!1,stop="",new s.a({el:"#app",router:u.a,components:{App:e.a},template:"<App/>"})},,,,function(t,i,n){"use strict";var s=n(5),e=n(44),u=n(0),o=u(s.a,e.a,!1,null,null,null);i.a=o.exports},function(t,i,n){"use strict";var s=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{attrs:{id:"output"},on:{dblclick:t.copyToClipboard}},[s("div",{attrs:{id:"switch"}},[t.dark?s("img",{staticClass:"swh",attrs:{src:n(21),alt:"switch"},on:{click:t.light}}):s("img",{staticClass:"swh",attrs:{src:n(22),alt:"switch"},on:{click:t.light}})]),t._v(" "),s("span",{staticClass:"blink",attrs:{id:"find"}},[t._v(t._s(t.findText))]),t._v(" "),s("span",{attrs:{id:"ans"}},[t._v(t._s(t.ansText))])])},e=[],u={render:s,staticRenderFns:e};i.a=u},function(t,i,n){t.exports=n.p+"static/img/light.858912c.png"},function(t,i,n){t.exports=n.p+"static/img/dark.2e77d42.png"},function(t,i,n){"use strict";var s=n(8),e=n(38),u=n(0),o=u(s.a,e.a,!1,null,null,null);i.a=o.exports},,,,,,,,,,,,,,,function(t,i,n){"use strict";var s=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{attrs:{id:"common"}},[s("div",{staticClass:"button orange KeyC",on:{click:function(i){return t.Clear()}}},[t._v("C")]),t._v(" "),s("div",{staticClass:"button orange",attrs:{id:"sc"},on:{click:function(i){return t.scAdd("(")}}},[t._v("(")]),t._v(" "),s("div",{staticClass:"button orange",attrs:{id:"sc2"},on:{click:function(i){t.scAdd(")")}}},[t._v(")")]),t._v(" "),s("div",{staticClass:"button orange",attrs:{id:"dl"},on:{click:function(i){return t.operatorAdd("÷","/")}}},[t._v("÷")]),t._v(" "),s("div",{staticClass:"button num7",on:{click:function(i){return t.numAdd("7")}}},[t._v("7")]),t._v(" "),s("div",{staticClass:"button num8",on:{click:function(i){return t.numAdd("8")}}},[t._v("8")]),t._v(" "),s("div",{staticClass:"button num9",on:{click:function(i){return t.numAdd("9")}}},[t._v("9")]),t._v(" "),s("div",{staticClass:"button orange",attrs:{id:"mn"},on:{click:function(i){return t.operatorAdd("×","*")}}},[t._v("×")]),t._v(" "),s("div",{staticClass:"button num4",on:{click:function(i){return t.numAdd("4")}}},[t._v("4")]),t._v(" "),s("div",{staticClass:"button num5",on:{click:function(i){return t.numAdd("5")}}},[t._v("5")]),t._v(" "),s("div",{staticClass:"button num6",on:{click:function(i){return t.numAdd("6")}}},[t._v("6")]),t._v(" "),s("div",{staticClass:"button orange Minus NumpadSubtract",on:{click:function(i){return t.operatorAdd("-","-")}}},[t._v("–")]),t._v(" "),s("div",{staticClass:"button num1",on:{click:function(i){return t.numAdd("1")}}},[t._v("1")]),t._v(" "),s("div",{staticClass:"button num2",on:{click:function(i){return t.numAdd("2")}}},[t._v("2")]),t._v(" "),s("div",{staticClass:"button num3",on:{click:function(i){return t.numAdd("3")}}},[t._v("3")]),t._v(" "),s("div",{staticClass:"button orange NumpadAdd Equal",attrs:{id:"plus"},on:{click:function(i){return t.operatorAdd("+","+")}}},[t._v("+")]),t._v(" "),s("div",{staticClass:"button num0",on:{click:function(i){return t.Zero()}}},[t._v("0")]),t._v(" "),s("div",{staticClass:"button Period Comma NumpadDecimal",on:{click:function(i){return t.Dot()}}},[t._v(".")]),t._v(" "),s("div",{staticClass:"button Backspace",on:{click:function(i){return t.Del()}}},[s("img",{attrs:{src:n(39),alt:"del",id:"del"}})]),t._v(" "),s("div",{staticClass:"button Enter NumpadEnter",on:{click:function(i){return t.Ok()}}},[t._v("=")])])},e=[],u={render:s,staticRenderFns:e};i.a=u},function(t,i,n){t.exports=n.p+"static/img/dl.33f0c6a.png"},function(t,i,n){"use strict";var s=n(13),e=n(41),u=n(0),o=u(s.a,e.a,!1,null,null,null);i.a=o.exports},function(t,i,n){"use strict";var s=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{attrs:{id:"more"}},[n("div",{staticClass:"moreButton",attrs:{id:"equals"},on:{click:function(i){return t.operatorAdd("=","==")}}},[t._v("=")]),t._v(" "),n("div",{staticClass:"moreButton",attrs:{id:"n_equals"},on:{click:function(i){return t.operatorAdd("≠","!=")}}},[t._v("≠")]),t._v(" "),n("div",{staticClass:"moreButton",attrs:{id:"m_eqals"},on:{click:function(i){return t.operatorAdd("≤","<=")}}},[t._v("≤")]),t._v(" "),n("div",{staticClass:"moreButton",attrs:{id:"b_eqals"},on:{click:function(i){return t.operatorAdd("≥",">=")}}},[t._v("≥")]),t._v(" "),n("div",{staticClass:"moreButton",attrs:{id:"less"},on:{click:function(i){return t.operatorAdd("<","<")}}},[t._v("<")]),t._v(" "),n("div",{staticClass:"moreButton",attrs:{id:"mr"},on:{click:function(i){return t.operatorAdd(">",">")}}},[t._v(">")]),t._v(" "),n("div",{staticClass:"moreButton KeyP",attrs:{id:"pi"},on:{click:function(i){return t.cnstAdd("π",Math.PI)}}},[t._v("π")]),t._v(" "),n("div",{staticClass:"moreButton KeyE",attrs:{id:"eps"},on:{click:function(i){return t.cnstAdd("e",Math.E)}}},[t._v("e")]),t._v(" "),n("div",{staticClass:"moreButton",attrs:{id:"sin"},on:{click:function(i){return t.cnstAdd("sin(","Math.sin(")}}},[t._v("sin")]),t._v(" "),n("div",{staticClass:"moreButton",attrs:{id:"cos"},on:{click:function(i){return t.cnstAdd("cos(","Math.cos(")}}},[t._v("cos")]),t._v(" "),n("div",{staticClass:"moreButton",attrs:{id:"tg"},on:{click:function(i){return t.cnstAdd("tan(","Math.tan(")}}},[t._v("tan")]),t._v(" "),n("div",{staticClass:"moreButton",attrs:{id:"ctg"},on:{click:function(i){return t.cnstAdd("ctn(","ctn(")}}},[t._v("ctn")]),t._v(" "),n("div",{staticClass:"moreButton",attrs:{id:"sqare"},on:{click:function(i){return t.cnstAdd("√(","Math.sqrt(")}}},[t._v("√")]),t._v(" "),n("div",{staticClass:"moreButton",attrs:{id:"deg"},on:{click:function(i){return t.operatorAdd("^","**")}}},[t._v("xʸ")]),t._v(" "),n("div",{staticClass:"moreButton",attrs:{id:"pr"},on:{click:function(i){return t.fAdd()}}},[t._v("x!")]),t._v(" "),n("div",{staticClass:"moreButton",attrs:{id:"log"},on:{click:function(i){return t.cnstAdd("log(","Math.log10(")}}},[t._v("log")]),t._v(" "),n("div",{staticClass:"moreButton",attrs:{id:"ln"},on:{click:function(i){return t.cnstAdd("ln(","Math.log(")}}},[t._v("ln")])])},e=[],u={render:s,staticRenderFns:e};i.a=u},function(t,i,n){"use strict";var s=n(14),e=n(43),u=n(0),o=u(s.a,e.a,!1,null,null,null);i.a=o.exports},function(t,i,n){"use strict";var s=function(){var t=this,i=t.$createElement;return(t._self._c||i)("div")},e=[],u={render:s,staticRenderFns:e};i.a=u},function(t,i,n){"use strict";var s=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{attrs:{id:"container"}},[s("my-output",{attrs:{findText:t.findText,ansText:t.ansText,copyText:t.copyText}}),t._v(" "),t.mode?s("div",{attrs:{id:"calc"}},[t.arrow?s("div",{attrs:{id:"more_hide"},on:{click:t.moreHide}},[s("img",{class:{toCommon:t.classSwitch,toMore:!t.classSwitch},attrs:{src:n(45),alt:"open",id:"arrow"}})]):t._e(),t._v(" "),s("my-main",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],ref:"main",attrs:{output:t.output,findText:t.findText,find:t.find,copyText:t.copyText,fact:t.fact,flag:t.flag,ent:t.ent},on:{updateP:t.update}}),t._v(" "),t.pc?s("more",{attrs:{output:t.output,find:t.find,copyText:t.copyText,fact:t.fact,flag:t.flag,ent:t.ent},on:{updateP:t.update,opAdd:t.opAdd}}):t._e()],1):s("converter",{attrs:{output:t.output,findText:t.findText,find:t.find,copyText:t.copyText,fact:t.fact,flag:t.flag,ent:t.ent},on:{updateP:t.update}}),t._v(" "),s("div",{attrs:{id:"copy"}},[t._v("Скопировано")])],1)},e=[],u={render:s,staticRenderFns:e};i.a=u},function(t,i,n){t.exports=n.p+"static/img/arrow.1e2bc00.png"},function(t,i,n){"use strict";var s=n(4),e=n(47);s.a.use(e.a),i.a=new e.a({mode:"history"})},,function(t,i){},,function(t,i){}],[15]);
//# sourceMappingURL=app.317f9dec396fb43f883e.js.map