import { defineStore } from 'pinia';
import axios from 'axios';

const sv_url = 'http://localhost:3000/todos';

export const useTodos = defineStore('todos', {
  state: () => ({
    todos: []
  }),
  getters: {

  },
  actions: {
    storeTodos(payload) {
      const index = this.todos.findIndex(todo => todo.id === payload.id);

      if (index >= 0) {
        return this.todos.splice(index, 1, payload);
      }

      this.todos.push(payload);
    },

    async getTodos() {
      const response = await axios.get(sv_url);
      this.todos = response.data;
    },

    async addTodo(data) {
      await axios.post(sv_url, data).then((response) => {
        this.storeTodos(response.data);
      });
    },

    async updateTodo({ id, data }) {
      await axios.put(`${sv_url}/${id}`, data).then((response) => {
        this.storeTodos(response.data);
      })
    },

    async deleteTodo(id) {
      await axios.delete(`${sv_url}/${id}`).then(() => {
        const index = this.todos.findIndex(todo => todo.id === id);

        if (index >= 0) {
          return this.todos.splice(index, 1);
        }
      })
    }
  }
})