/* require */
var TodoJadeObj = require("../views/todo.jade");
var todoHtml = TodoJadeObj();

document.getElementById("todo-wrapper").innerHTML = todoHtml;

require('../css/style.css');
require('../css/todo.css');

var Vue = require('vue');

/* todo */
var vm = new Vue({
  el: '#todos',
  data: {
      inputTodoName: "",
      todos: []
  },
  methods: {
      addTodo: function(){
        this.todos.push( { name: this.inputTodoName } );
        this.inputTodoName = "";
      }
  }
});
