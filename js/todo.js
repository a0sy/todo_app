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
    clearCompleted: false
  },
  watch: {
    "todos": {
      handler: function () {
        var result = this.todos.some(function(element) {
          return (element.completed);
        });
        this.clearCompleted = result;
      },
      deep: true
    }
  },
  computed: {
    lefts: function() {
      return this.todos.filter(function(element) {
        return (!element.completed);
      }).length;
    }
  },
  methods: {
    addTodo: function() {
      this.todos.push( { hide: false, completed: false, name: this.inputTodoName } );
      this.inputTodoName = "";
    },
    allComplete: function() {
      var allCompleted = false;
      /* 全て完了済みかチェック */
      allCompleted = this.todos.every(function(element){ return (element.completed === true) });

      /* 全て完了済みだった場合, 全て未完了にする / 未完了がある場合は全て完了にする */
      for (i = 0; i < this.todos.length; i++) {
        this.todos[i].completed = !allCompleted;
      }
    },
    clearComplete: function() {
      this.todos = this.todos.filter(function(element) {
        return (!element.completed);
      });
    },
    delTodo: function(index) {
      this.todos.splice(index, 1);
    },
    showAll: function() {
      for (i = 0; i < this.todos.length; i++) {
        this.todos[i].hide = false
      }
    },
    showActive: function() {
      for (i = 0; i < this.todos.length; i++) {
        if (this.todos[i].completed === true) {
          this.todos[i].hide = true;
        }
      }
    }
  }
});
