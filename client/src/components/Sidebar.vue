<template>
  <aside class="sidebar-custom">
    <div class="sidebar-content">
      <nav class="nav-menu">
        <!-- Маркетинг -->
        <div class="nav-item" @click="toggleMenu('marketing')">
          <span>Маркетинг</span>
          <img src="./icons/arrow1.svg" alt="" class="arrow-icon" :class="{ rotated: activeMenus.includes('marketing') }" />
        </div>
        <div v-if="activeMenus.includes('marketing')" class="sub-menu">
          <div class="sub-item" @click="$emit('navigate', 'Заявки')">
            <img src="./icons/user.svg" alt="" class="sub-icon" />
            <span>Заявки</span>
          </div>
          <div class="sub-item" @click="$emit('navigate', 'Расписание')">
            <img src="./icons/calendar.svg" alt="" class="sub-icon" />
            <span>Расписание</span>
          </div>
        </div>

        <!-- Админка -->
        <div class="nav-item" @click="toggleMenu('admin')">
          <span>Админка</span>
          <img src="./icons/arrow1.svg" alt="" class="arrow-icon" :class="{ rotated: activeMenus.includes('admin') }" />
        </div>
        <div v-if="activeMenus.includes('admin')" class="sub-menu">
          <div class="sub-item" @click="$emit('navigate', 'Роли и права')">
            <img src="./icons/settings.svg" alt="" class="sub-icon" />
            <span>Роли и права</span>
          </div>
          <div class="sub-item" @click="$emit('navigate', 'Конфигурация')">
            <img src="./icons/settings.svg" alt="" class="sub-icon" />
            <span>Конфигурация</span>
          </div>
        </div>

        <!-- Прочее -->
        <div class="nav-item" @click="toggleMenu('other')">
          <span>Прочее</span>
          <img src="./icons/arrow1.svg" alt="" class="arrow-icon" :class="{ rotated: activeMenus.includes('other') }" />
        </div>
        <div v-if="activeMenus.includes('other')" class="sub-menu">
          <div class="sub-item" @click="$emit('navigate', 'Сделки')">
            <img src="./icons/settings.svg" alt="" class="sub-icon" />
            <span>Сделки</span>
          </div>
          <div class="sub-item" @click="$emit('navigate', 'Звонки')">
            <img src="./icons/call.svg" alt="" class="sub-icon" />
            <span>Звонки</span>
          </div>
        </div>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['navigate']);

const activeMenus = ref([]);

const toggleMenu = (menu) => {
  const index = activeMenus.value.indexOf(menu);
  if (index > -1) {
    activeMenus.value.splice(index, 1);
  } else {
    activeMenus.value.push(menu);
  }
};
</script>

<style scoped>
.sidebar-custom {
  width: 260px;
  min-width: 260px;
  background-color: #ffffff;
  border-radius: 30px;
  margin-left: 10px;
  margin-top: 13px;
  margin-bottom: 10px;
  padding: 0;
  box-sizing: border-box;
  flex-shrink: 0;
  align-self: stretch;
  height: auto;
  min-height: calc(100vh - 13px - 10px - 56px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16.5px 0 0 10px;
  /* Добавляем отступ снизу для скролла */
  padding-bottom: 20px;
}

/* Запрещаем выделение текста во всем сайдбаре */
.sidebar-custom,
.sidebar-custom * {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* Убираем синий фон при клике на мобильных устройствах */
.sidebar-custom {
  -webkit-tap-highlight-color: transparent;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  /* Растягиваем меню на всю высоту */
  flex: 1;
}

.nav-item {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 15px;
  cursor: pointer;
}

.arrow-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  transform: scaleX(-1);
  transition: transform 0.3s ease;
  filter: invert(29%) sepia(8%) saturate(0%) hue-rotate(180deg) brightness(94%) contrast(85%);
}

.arrow-icon.rotated {
  transform: scaleX(-1) rotate(180deg);
}

.sub-menu {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 10px;
}

.sub-item {
  font-size: 16px;
  color: #4a5568;
  padding: 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1;
}

.sub-item:hover {
  color: #3182ce;
}

.sub-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  display: inline-block;
  filter: invert(29%) sepia(8%) saturate(0%) hue-rotate(180deg) brightness(94%) contrast(85%);
}

/* Стилизация скролла для сайдбара */
.sidebar-custom::-webkit-scrollbar {
  width: 4px;
}

.sidebar-custom::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-custom::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 10px;
}

.sidebar-custom::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>