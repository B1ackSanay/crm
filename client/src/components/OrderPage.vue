<template>
  <div class="orders-page">
    <h1 class="page-title">Заявки</h1>

    <!-- 1. Карточки аналитики (Статистика) -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-period">Сегодня</div>
        <div class="stat-value">12</div>
        <div class="stat-footer text-gray">+3 к прошлому периоду</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-period">За 7 дней</div>
        <div class="stat-value">48</div>
        <div class="stat-footer text-gray">+8 к прошлому периоду</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-period">За 30 дней</div>
        <div class="stat-value">156</div>
        <div class="stat-footer text-gray">+24 к прошлому периоду</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-period">Конверсия</div>
        <div class="stat-value">32%</div>
        <div class="stat-footer text-gray">+5% к прошлому периоду</div>
      </div>
    </div>

    <!-- 2. Таблица заявок -->
    <div class="table-container">
      <table class="orders-table">
        <thead>
          <tr>
            <th @click="sortBy('id')">
              ID <span class="sort-icon" :class="{ active: sortKey === 'id' }">{{ sortKey === 'id' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('name')">
              Имя <span class="sort-icon" :class="{ active: sortKey === 'name' }">{{ sortKey === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('phone')">
              Телефон <span class="sort-icon" :class="{ active: sortKey === 'phone' }">{{ sortKey === 'phone' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('email')">
              Email <span class="sort-icon" :class="{ active: sortKey === 'email' }">{{ sortKey === 'email' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('company')">
              Компания <span class="sort-icon" :class="{ active: sortKey === 'company' }">{{ sortKey === 'company' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('created_at')">
              Дата создания <span class="sort-icon" :class="{ active: sortKey === 'created_at' }">{{ sortKey === 'created_at' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('deal')">
              Сделка <span class="sort-icon" :class="{ active: sortKey === 'deal' }">{{ sortKey === 'deal' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in sortedOrders" :key="order.id">
            <td class="cell-id">{{ order.id }}</td>
            <td>{{ order.name }}</td>
            <td class="cell-phone">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              {{ order.phone }}
            </td>
            <td class="cell-email">
              <svg class="icon icon-email" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              {{ order.email }}
            </td>
            <td>{{ order.company }}</td>
            <td>
              <div class="date-time-wrapper">
                <span class="date-cell">{{ order.created_at }}</span>
              </div>
            </td>
            <td class="cell-deal">{{ order.deal }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const orders = ref([])
onMounted(async () => {
  const res = await fetch('/api/orders')
  orders.value = await res.json()
})

// Состояние сортировки
const sortKey = ref(null)
const sortOrder = ref('asc')

// Функция сортировки
const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

// Функция для парсинга даты из формата DD.MM.YYYY
const parseDate = (str) => {
  if (!str) return new Date(0)
  const [day, month, year] = str.split('.').map(Number)
  return new Date(year, month - 1, day)
}

// Вычисляемое свойство с отсортированными данными
const sortedOrders = computed(() => {
  if (!sortKey.value) return orders.value

  const sorted = [...orders.value].sort((a, b) => {
    let aVal = a[sortKey.value]
    let bVal = b[sortKey.value]

    // Для числовых полей (id, deal)
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return aVal - bVal
    }

    // Для полей с датами
    if (sortKey.value === 'created_at') {
      return parseDate(aVal) - parseDate(bVal)
    }

    // Для строковых полей (регистронезависимое сравнение)
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal, 'ru', { sensitivity: 'base' })
    }

    return 0
  })

  return sortOrder.value === 'asc' ? sorted : sorted.reverse()
})
</script>

<style scoped>
.orders-page {
  width: 100%;
  font-family: system-ui, -apple-system, sans-serif;
  box-sizing: border-box;
}

.page-title {
  font-size: 26px;
  font-weight: 700;
  color: #1a202c;
  margin-top: 0;
  margin-bottom: 24px;
}

/* Сетка карточек аналитики */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  background-color: #ebf8ff;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-period {
  font-size: 13px;
  color: #4a5568;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
  line-height: 1;
}

.stat-footer {
  font-size: 11px;
}

.text-gray {
  color: #718096;
}

/* Стили таблицы */
.table-container {
  width: 100%;
  overflow-x: auto;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;
  color: #1a202c;
  table-layout: fixed;
}

.orders-table th:nth-child(1) { width: 60px; }
.orders-table th:nth-child(2) { width: 100px; }
.orders-table th:nth-child(3) { width: 170px; }
.orders-table th:nth-child(4) { width: 180px; }
.orders-table th:nth-child(5) { width: 160px; }
.orders-table th:nth-child(6) { width: 130px; }
.orders-table th:nth-child(7) { width: 80px; }

.orders-table th {
  font-weight: 600;
  color: #1a202c;
  padding: 12px 8px;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s ease;
}

.orders-table th:hover {
  background-color: #f7fafc;
}

.sort-icon {
  display: inline-block;
  margin-left: 4px;
  color: #a0aec0;
  font-size: 11px;
  transition: all 0.2s ease;
}

.sort-icon.active {
  color: #3182ce;
  font-weight: 700;
}

.orders-table td {
  padding: 14px 8px;
  vertical-align: middle;
  word-break: break-word;
}

.cell-id {
  color: #718096;
}

.cell-phone, .cell-email {
  line-height: 1;
}

.cell-phone svg, .cell-email svg {
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
  width: 14px;
  height: 14px;
  color: #4a5568;
}

.date-time-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.time-cell {
  font-size: 12px;
}

.cell-deal {
  text-align: center;
}

.orders-table th:last-child {
  text-align: center;
}

</style>