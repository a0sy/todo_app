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
      todos: [],
      allCompleted: false
  },
  methods: {
      addTodo: function(){
        this.todos.push( { completed: false, name: this.inputTodoName } );
        this.inputTodoName = "";
      },
      allComplete: function() {
        /* 全て完了済みかチェック */
        this.allCompleted = this.todos.every(function(element){ return (element.completed === true) });

        /* 全て完了済みだった場合, 全て未完了にする / 未完了がある場合は全て完了にする */
        if (this.allCompleted === true) {
          for (i = 0; i < this.todos.length; i++) {
            this.todos[i].completed = false;
          }
        } else {
          for (i = 0; i < this.todos.length; i++) {
            this.todos[i].completed = true;
          }
        }
      }
  }
});
