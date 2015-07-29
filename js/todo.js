/* require */
var TodoJadeObj = require("../views/todo.jade");
var todoHtml = TodoJadeObj();

document.getElementById("todo-wrapper").innerHTML = todoHtml;

require('../css/style.css');
require('../css/todo.css');

var Vue = require('vue');

var vm = new Vue({
  el: '#el',
  data: {
      inputTodo: "",
      outputTodo: ""
  },
  methods: {
      addTodo: function(){
        this.outputTodo = this.inputTodo;
      }
  }
});
