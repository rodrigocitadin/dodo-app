<script setup>
import TodoItem from '@/components/TodoItem.vue';

import { useTodos } from '@/stores/todos.js';

const todos = useTodos();
</script>

<template>
  <div class="space-y-2">
    <TodoItem v-for="todo in todos.$state.todos" :key="todo.id" :todo="todo" />
  </div>
</template>