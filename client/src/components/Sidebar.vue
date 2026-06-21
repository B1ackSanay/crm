<template>
  <aside class="sidebar-custom">
    <div class="sidebar-content">
      <nav class="nav-menu">
        <template v-if="pages.includes('Заявки') || pages.includes('Расписание')">
          <div class="nav-item" @click="toggleMenu('marketing')">
            <span>Маркетинг</span>
            <img src="./icons/arrow1.svg" alt="" class="arrow-icon" :class="{ rotated: activeMenus.includes('marketing') }" />
          </div>
          <div v-if="activeMenus.includes('marketing')" class="sub-menu">
            <div v-if="pages.includes('Заявки')" class="sub-item" @click="$emit('navigate', 'Заявки')">
              <img src="./icons/user.svg" alt="" class="sub-icon" />
              <span>Заявки</span>
            </div>
            <div v-if="pages.includes('Расписание')" class="sub-item" @click="$emit('navigate', 'Расписание')">
              <img src="./icons/calendar.svg" alt="" class="sub-icon" />
              <span>Расписание</span>
            </div>
          </div>
        </template>

        <template v-if="pages.includes('Роли и права') || pages.includes('Конфигурация')">
          <div class="nav-item" @click="toggleMenu('admin')">
            <span>Админка</span>
            <img src="./icons/arrow1.svg" alt="" class="arrow-icon" :class="{ rotated: activeMenus.includes('admin') }" />
          </div>
          <div v-if="activeMenus.includes('admin')" class="sub-menu">
            <div v-if="pages.includes('Роли и права')" class="sub-item" @click="$emit('navigate', 'Роли и права')">
              <img src="./icons/settings.svg" alt="" class="sub-icon" />
              <span>Роли и права</span>
            </div>
            <div v-if="pages.includes('Конфигурация')" class="sub-item" @click="$emit('navigate', 'Конфигурация')">
              <img src="./icons/settings.svg" alt="" class="sub-icon" />
              <span>Конфигурация</span>
            </div>
          </div>
        </template>

        <template v-if="pages.includes('Сделки') || pages.includes('Звонки')">
          <div class="nav-item" @click="toggleMenu('other')">
            <span>Прочее</span>
            <img src="./icons/arrow1.svg" alt="" class="arrow-icon" :class="{ rotated: activeMenus.includes('other') }" />
          </div>
          <div v-if="activeMenus.includes('other')" class="sub-menu">
            <div v-if="pages.includes('Сделки')" class="sub-item" @click="$emit('navigate', 'Сделки')">
              <img src="./icons/settings.svg" alt="" class="sub-icon" />
              <span>Сделки</span>
            </div>
            <div v-if="pages.includes('Звонки')" class="sub-item" @click="$emit('navigate', 'Звонки')">
              <img src="./icons/call.svg" alt="" class="sub-icon" />
              <span>Звонки</span>
            </div>
          </div>
        </template>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  pages: {
    type: Array,
    default: () => []
  }
});

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
  width: 200px;
  height: auto;
  background-color: #ffffff;
  border-radius: 30px;
  padding: 0;
  box-sizing: border-box;
  flex-shrink: 0;
  overflow-y: auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  padding: 16px 10px 0 10px;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
</style>