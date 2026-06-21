<template>
  <LoginScreen v-if="!user" @login-success="onLogin" />

  <div v-else class="app-layout">
    <Header :user="user" @logout="onLogout" />
    <div class="app-body">
      <Sidebar :pages="pages" @navigate="handleNavigate" />
      <main class="page-content">
        <component v-if="currentComponent" :is="currentComponent" />
        <p v-else>Нет доступных разделов</p>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef, onMounted } from 'vue';
import LoginScreen from './components/LoginScreen.vue';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import Calls from './components/Calls.vue';
import Deals from './components/Deals.vue';
import OrderPage from './components/OrderPage.vue';
import Roles from './components/Roles.vue';
import Schedule from './components/Schedule.vue';

const componentMap = {
  'Заявки': OrderPage,
  'Расписание': Schedule,
  'Роли и права': Roles,
  'Конфигурация': Roles,
  'Сделки': Deals,
  'Звонки': Calls
};

const user = ref(null);
const pages = ref([]);
const currentComponent = shallowRef(null);

function setDefaultPage(pagesList) {
  const firstPage = pagesList[0];
  currentComponent.value = firstPage ? componentMap[firstPage] : null;
}

function handleNavigate(page) {
  const component = componentMap[page];
  if (component) currentComponent.value = component;
}

function onLogin(data) {
  user.value = data.user;
  pages.value = data.pages || [];
  setDefaultPage(pages.value);
}

async function onLogout() {
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

<style scoped>
.app-body {
  margin-top: 13px;
  display: flex;
}

.page-content {
  padding: 0 50px;
}
</style>