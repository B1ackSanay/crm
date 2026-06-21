<template>
  <div class="login-screen">
    <h2>Вход в CRM</h2>
    <input type="text" v-model="login" placeholder="Логин">
    <input type="password" v-model="password" placeholder="Пароль">
    <button @click="handleLogin">Войти</button>
    <span class="login-error">{{ error }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const login = ref('');
const password = ref('');
const error = ref('');

const emit = defineEmits(['login-success']);

async function handleLogin() {
  error.value = '';

  if (!login.value || !password.value) {
    error.value = 'Введите логин и пароль';
    return;
  }

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: login.value, password: password.value }),
    });

    const data = await res.json();

    if (!res.ok) {
      error.value = data.error || 'Ошибка входа';
      return;
    }

    emit('login-success', data);
  } catch (e) {
    error.value = 'Не удалось подключиться к серверу';
  }
}
</script>

<style scoped>
.login-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 8px;
}
.login-screen input { padding: 6px; font-size: 16px; }
.login-screen button { padding: 6px 16px; font-size: 16px; cursor: pointer; }
.login-error { color: red; }
</style>