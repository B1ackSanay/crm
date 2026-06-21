<template>
  <header class="main-header">
    <div class="header-left">
      <img src="../components/icons/logo.png" alt="">
      <button class="site-button">Перейти на сайт</button>
    </div>

    <div class="header-right">
      <div class="search-container">
        <input type="text" placeholder="Поиск" class="search-input" />
        <svg class="icon search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

      <button class="profile-button" aria-label="Профиль" :title="user?.login">
        <svg class="icon profile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </button>

      <button class="logout-button" @click="$emit('logout')">Выйти</button>
    </div>
  </header>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    default: null
  }
});

defineEmits(['logout']);
</script>

<style scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: #E0F2FE;
  border-bottom: 1px solid #e2e8f0;
  font-family: system-ui, -apple-system, sans-serif;
  border-radius: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo-container {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.logo-subtitle {
  font-size: 10px;
  color: #718096;
  text-transform: lowercase;
}

.logo-title {
  font-size: 20px;
  font-weight: 800;
  color: #1a202c;
  margin: 0;
  letter-spacing: 0.5px;
}

.site-button {
  background-color: #3182ce;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.site-button:hover {
  background-color: #2b6cb0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 6px 16px 6px 36px;
  font-size: 14px;
  width: 220px;
  outline: none;
  transition: all 0.2s;
}

.search-input:focus {
  background-color: #ffffff;
  border-color: #3182ce;
}

.icon {
  width: 18px;
  height: 18px;
  color: #4a5568;
}

.search-icon {
  position: absolute;
  left: 12px;
  pointer-events: none;
}

.profile-button {
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.profile-button:hover {
  background-color: #f7fafc;
}

.user-info {
  font-size: 13px;
  color: #4a5568;
  white-space: nowrap;
}

.logout-button {
  background-color: #edf2f7;
  color: #4a5568;
  border: none;
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background-color: #e2e8f0;
}
</style>