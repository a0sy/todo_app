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
  created: function() {
    for (i = 0; i < localStorage.length; i++) {
      this.todos.push(JSON.parse(localStorage.getItem(i.toString())));
    }
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
      var todoData = { hide: false, completed: false, name: this.inputTodoName };
      var lsIndex = this.todos.length;

      // save vue obj
      this.todos.push(todoData);
      // save local storage
      localStorage.setItem(lsIndex.toString(), JSON.stringify(todoData));
      // reset textbox
      this.inputTodoName = "";
    },
    allComplete: function() {
      var allCompleted = false;
      // 全て完了済みかチェック
      allCompleted = this.todos.every(function(element){ return (element.completed === true) });

      // 全て完了済みだった場合, 全て未完了にする. 未完了がある場合は全て完了にする
      for (i = 0; i < this.todos.length; i++) {
        this.todos[i].completed = !allCompleted;
      }
    },
    clearComplete: function() {
      this.todos = this.todos.filter(function(element) {
        return (!element.completed);
      });
      this.sync();
    },
    delTodo: function(index) {
      this.todos.splice(index, 1);
      this.sync();
    },
    showAll: function() {
      for (i = 0; i < this.todos.length; i++) {
        this.todos[i].hide = false
      }
    },
    showActive: function() {
      this.showAll();
      for (i = 0; i < this.todos.length; i++) {
        if (this.todos[i].completed === true) {
          this.todos[i].hide = true;
        }
      }
    },
    showComplete: function() {
      this.showAll();
      for (i = 0; i < this.todos.length; i++) {
        if (this.todos[i].completed === false) {
          this.todos[i].hide = true;
        }
      }
    },
    // clear localStorage
    clearStorage: function() {
      for(key in localStorage) {
        delete localStorage[key];
      }
    },
    // todo => localStorage
    sync: function() {
      this.clearStorage();
      for (i = 0; i < this.todos.length; i++) {
        localStorage.setItem(i.toString(), JSON.stringify(this.todos[i]));
      }
    }
  }
});
