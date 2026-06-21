<template>
  <div class="app-layout">
    <LoginScreen v-if="!user" @login-success="handleLoginSuccess" />

    <template v-else>
      <Header :user="user" @navigate="handleNavigate" @logout="handleLogout" />

      <div class="app-body">
        <Sidebar :pages="pages" @navigate="handleNavigate" />
        
        <main class="page-content">
          <component v-if="currentComponent" :is="currentComponent" />
          <p v-else>Нет доступных разделов</p>
        </main>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, shallowRef, onMounted } from 'vue';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import LoginScreen from './components/LoginScreen.vue';
import Calls from './components/Calls.vue';
import Deals from './components/Deals.vue';
import OrderPage from './components/OrderPage.vue';
import Roles from './components/Roles.vue';
import Schedule from './components/Schedule.vue';

const user = ref(null);
const pages = ref([]);
const currentComponent = shallowRef(null);

const componentMap = {
  'Заявки': OrderPage,
  'Расписание': Schedule,
  'Роли и права': Roles,
  'Конфигурация': Roles,
  'Сделки': Deals,
  'Звонки': Calls
};

function setDefaultPage(pagesList) {
  const firstPage = pagesList[0];
  currentComponent.value = firstPage ? componentMap[firstPage] : null;
}

const handleNavigate = (page) => {
  const component = componentMap[page];
  if (component) {
    currentComponent.value = component;
  }
};

const handleLoginSuccess = (data) => {
  user.value = data.user;
  pages.value = data.pages || [];
  setDefaultPage(pages.value);
};

async function handleLogout() {
  await fetch('/api/logout', { method: 'POST' });
  user.value = null;
  pages.value = [];
  currentComponent.value = null;
}

onMounted(async () => {
  const res = await fetch('/api/session');
  const data = await res.json();
  user.value = data.user;
  pages.value = data.pages || [];
  if (user.value) setDefaultPage(pages.value);
});
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