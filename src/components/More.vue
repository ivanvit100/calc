<template>
<div id="more">
	<div class="moreButton" id="equals" onclick="operatorAdd('=', '==')">=</div>
	<div class="moreButton" id="n_equals" onclick="operatorAdd('≠', '!=')">≠</div>
	<div class="moreButton" id="m_eqals" onclick="operatorAdd('≤', '<=')">≤</div>
	<div class="moreButton" id="b_eqals" onclick="operatorAdd('≥', '>=')">≥</div>
	<div class="moreButton" id="less" onclick="operatorAdd('<', '<')"><</div>
	<div class="moreButton" id="mr" onclick="operatorAdd('>', '>')">></div>
	<div class="moreButton KeyP" id="pi" onclick="cnstAdd('π', Math.PI)">π</div>
	<div class="moreButton KeyE" id="eps" onclick="cnstAdd('e', Math.E)">e</div>
	<div class="moreButton" id="sin" onclick="cnstAdd('sin(', 'Math.sin(')">sin</div>
	<div class="moreButton" id="cos" onclick="cnstAdd('cos(', 'Math.cos(')">cos</div>
	<div class="moreButton" id="tg" onclick="cnstAdd('tan(', 'Math.tan(')">tan</div>
	<div class="moreButton" id="ctg" onclick="cnstAdd('ctn(', 'ctn(')">ctn</div>
	<div class="moreButton" id="sqare" onclick="cnstAdd('√(', 'Math.sqrt(')">√</div>
	<div class="moreButton" id="deg" onclick="operatorAdd('^', '**')">xʸ</div>
	<div class="moreButton" id="pr" onclick="fAdd()">x!</div>
	<div class="moreButton" id="log" onclick="cnstAdd('log(', 'Math.log10(')">log</div>
	<div class="moreButton" id="ln" onclick="cnstAdd('ln(', 'Math.log(')">ln</div>
</div>
</template>

<script>
export default{
	name: 'more'
}
</script>