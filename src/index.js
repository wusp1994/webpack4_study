import "@babel/polyfill"

import moon from "./monn.jpg"
import style from './index.scss'

const img2= new Image()
img2.src = moon
//样式只会对当前生效
console.log(style,"==========style")
img2.classList.add(style.imgBox)
let root = document.querySelector("#root")
root.append(img2)

import { index as appendImg} from './appendImg'
appendImg()

// conoele.log("hello")
console.log("hello111")
// var Header = require('./header.js');
// var Sidebar = require('./sidebar.js');
// var Content = require('./content.js');
//
// new Header();
// new Sidebar();
// new Content();

let arr = [];
for(let i = 1;i<10000;i++){
 arr.push(i);
}

let time1 = new Date().getTime()
for(let i in arr){
  if(i%2 == 0){
  
  }
}
let time2 = new Date().getTime()
console.log(time2-time1)

// var btn = document.createElement('button');
// btn.innerHTML = '新增';
// document.body.appendChild(btn);

// btn.onclick = function() {
// 	var div = document.createElement('div');
// 	div.innerHTML = 'item';
// 	document.body.appendChild(div);
// }

import counter from './HotModuleReplacement/counter';
import number from './HotModuleReplacement/number';

counter();
number();

/**
 * @description HMR （HotModuleReplacement）的效果
 * 只要number模块发生变化就重新执行number，模块变化不刷新页面更新，且其他模块不会重置.
 * vue 以及reactJs 中的loader已经自带
 */
if(module.hot) {
  module.hot.accept('./HotModuleReplacement/number', () => {
    document.body.removeChild(document.getElementById('number'));
    number();
  })
}


import { testPolyfill } from './es6_Babel/es6'
testPolyfill()