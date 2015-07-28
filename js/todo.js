/* require */
var html = require('../todo.html')
document.getElementById("todo-wrapper").innerHTML = html;

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
