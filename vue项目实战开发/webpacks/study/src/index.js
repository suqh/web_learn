import $ from 'jquery'
import './css/1.css'
import './css/2.less'
import './css/3.scss'

$(function() {
    $('li:odd').css('backgroundColor', 'red')
    $('li:even').css('backgroundColor', 'skyblue')
})

class Person {
    static info = 'aaa'
}

console.log(Person.info);



//-------------------
import Vue from 'vue'
// 导入单文件组件
import App from './components/App.vue'

const vm = new Vue({
    el: '#app',
    render: h => h(App)
})