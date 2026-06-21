<template>
  <div class="app-layout">
    <!-- Если не авторизован — показываем экран входа -->
    <LoginScreen v-if="!isAuthenticated" @login-success="handleLoginSuccess" />

    <!-- Если авторизован — показываем основное приложение -->
    <template v-else>
      <Header @navigate="handleNavigate" />

      <div class="app-body">
        <Sidebar @navigate="handleNavigate" />
        
        <main class="page-content">
          <component :is="currentComponent" />
        </main>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, shallowRef } from 'vue';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import LoginScreen from './components/LoginScreen.vue';
import Calls from './components/Calls.vue';
import Deals from './components/Deals.vue';
import OrderPage from './components/OrderPage.vue';
import Roles from './components/Roles.vue';
import Schedule from './components/Schedule.vue';

// Состояние авторизации
const isAuthenticated = ref(false);

const componentMap = {
  'Заявки': OrderPage,
  'Расписание': Schedule,
  'Роли и права': Roles,
  'Конфигурация': Roles,
  'Сделки': Deals,
  'Звонки': Calls
};

// По умолчанию показываем компонент Заявки (OrderPage)
const currentComponent = shallowRef(OrderPage);

const handleNavigate = (page) => {
  const component = componentMap[page];
  if (component) {
    currentComponent.value = component;
  }
};

// Обработчик успешного входа
const handleLoginSuccess = (data) => {
  isAuthenticated.value = true;
  console.log('Успешный вход:', data);
};
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #f4f7f6;
    font-family: system-ui, -apple-system, sans-serif;
    min-height: 100vh;
  }

  .app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: 100%;
  }

  .app-body {
    display: flex;
    flex: 1;
    min-height: 0;
    height: calc(100vh - 70px);
  }

  .page-content {
    flex: 1;
    padding: 24px;
    box-sizing: border-box;
    overflow-y: auto;
  }
</style>