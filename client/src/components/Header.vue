<template>
  <header class="main-header">
    <!-- Левая часть: Логотип и кнопка -->
    <div class="header-left">
      <img src="../components/icons/logo.png" alt="">
      <button class="site-button">Перейти на сайт</button>
    </div>

    <!-- Правая часть: Поиск и профиль -->
    <div class="header-right">
      <div class="search-container">
        <input 
          type="text" 
          placeholder="Поиск" 
          class="search-input"
          v-model="searchQuery"
          @input="handleSearch"
          @focus="handleFocus"
          @blur="handleBlur"
          ref="searchInput"
        />
        <svg class="icon search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        
        <!-- Выпадающий список результатов поиска -->
        <div v-if="showResults && filteredItems.length > 0" class="search-results">
          <div 
            v-for="item in filteredItems" 
            :key="item.path"
            class="search-result-item"
            @mousedown.prevent="navigateTo(item.path)"
          >
            <span class="result-icon">
              <img :src="item.icon" alt="" class="result-icon-img" />
            </span>
            <span class="result-label">{{ item.label }}</span>
            <span class="result-category">{{ item.category }}</span>
          </div>
        </div>
        
        <!-- Сообщение, если ничего не найдено -->
        <div v-if="showResults && searchQuery.length >= 1 && filteredItems.length === 0" class="search-results no-results">
          <div class="search-result-item">
            <span class="result-label">Ничего не найдено</span>
          </div>
        </div>
      </div>
      
      <button class="profile-button" aria-label="Профиль">
        <svg class="icon profile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'

// Определяем emits для навигации
const emit = defineEmits(['navigate'])

// Состояние поиска
const searchQuery = ref('')
const showResults = ref(false)
const searchInput = ref(null)

// Список всех пунктов меню для поиска с иконками из Sidebar
const menuItems = [
  { 
    label: 'Заявки', 
    path: 'Заявки', 
    icon: './icons/user.svg', 
    category: 'Маркетинг' 
  },
  { 
    label: 'Расписание', 
    path: 'Расписание', 
    icon: './icons/calendar.svg', 
    category: 'Маркетинг' 
  },
  { 
    label: 'Роли и права', 
    path: 'Роли и права', 
    icon: './icons/settings.svg', 
    category: 'Админка' 
  },
  { 
    label: 'Конфигурация', 
    path: 'Конфигурация', 
    icon: './icons/settings.svg', 
    category: 'Админка' 
  },
  { 
    label: 'Сделки', 
    path: 'Сделки', 
    icon: './icons/settings.svg', 
    category: 'Прочее' 
  },
  { 
    label: 'Звонки', 
    path: 'Звонки', 
    icon: './icons/call.svg', 
    category: 'Прочее' 
  }
]

// Функция для проверки совпадения по началу слова
const matchesQuery = (text, query) => {
  if (!text || !query) return false
  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  
  // Проверяем, начинается ли текст с запроса
  if (lowerText.startsWith(lowerQuery)) return true
  
  // Проверяем каждое слово в тексте
  const words = lowerText.split(' ')
  for (const word of words) {
    if (word.startsWith(lowerQuery)) return true
  }
  
  return false
}

// Фильтрация элементов по поисковому запросу (с 1 символа)
const filteredItems = computed(() => {
  if (!searchQuery.value || searchQuery.value.length < 1) return []
  
  const query = searchQuery.value.trim()
  
  return menuItems.filter(item => 
    matchesQuery(item.label, query) ||
    matchesQuery(item.category, query)
  )
})

// Обработчик ввода
const handleSearch = () => {
  if (searchQuery.value.length >= 1) {
    showResults.value = true
  } else {
    showResults.value = false
  }
}

// Обработчик фокуса
const handleFocus = () => {
  if (searchQuery.value.length >= 1 && filteredItems.value.length > 0) {
    showResults.value = true
  }
}

// Навигация к выбранному пункту
const navigateTo = (path) => {
  if (path) {
    emit('navigate', path)
    searchQuery.value = ''
    showResults.value = false
  }
}

// Обработчик потери фокуса (с задержкой для клика по результату)
const handleBlur = () => {
  setTimeout(() => {
    showResults.value = false
  }, 200)
}
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
    position: relative;
    }

    /* Левая часть */
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

    /* Правая часть */
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
    width: 300px;
    }

    /* Иконки */
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

    /* Стили для результатов поиска */
    .search-results {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
    min-width: 280px;
    }

    .search-results.no-results {
    padding: 12px 16px;
    }

    .search-result-item {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    cursor: pointer;
    transition: background-color 0.15s;
    gap: 12px;
    }

    .search-result-item:hover {
    background-color: #f7fafc;
    }

    .result-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    }

    .result-icon-img {
    width: 16px;
    height: 16px;
    filter: invert(29%) sepia(8%) saturate(0%) hue-rotate(180deg) brightness(94%) contrast(85%);
    }

    .result-label {
    font-size: 14px;
    font-weight: 500;
    color: #1a202c;
    flex: 1;
    }

    .result-category {
    font-size: 12px;
    color: #718096;
    flex-shrink: 0;
    padding: 2px 12px;
    background: #f7fafc;
    border-radius: 12px;
    font-weight: 500;
    }

    /* Стилизация скролла */
    .search-results::-webkit-scrollbar {
    width: 6px;
    }

    .search-results::-webkit-scrollbar-track {
    background: #f7fafc;
    border-radius: 12px;
    }

    .search-results::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 12px;
    }

    .search-results::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
    }

    /* Адаптивность */
    @media (max-width: 768px) {
    .search-input {
      width: 140px;
    }
    
    .search-input:focus {
      width: 180px;
    }
    
    .search-results {
      min-width: 240px;
      right: -60px;
    }
    }
</style>