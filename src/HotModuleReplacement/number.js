function number() {
	var div = document.createElement('div');
	div.setAttribute('id', 'number');
	//改变此处模块代码
	div.innerHTML = 321;
	document.body.appendChild(div);
}

export default number;