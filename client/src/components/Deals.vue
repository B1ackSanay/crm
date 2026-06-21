<template>
  <div class="deals-page">
    <h1 class="page-title">Сделки</h1>

    <div class="table-container">
      <table class="deals-table">
        <thead>
          <tr>
            <th @click="sortBy('id')">
              ID <span class="sort-icon" :class="{ active: sortKey === 'id' }">{{ sortKey === 'id' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('title')">
              Название <span class="sort-icon" :class="{ active: sortKey === 'title' }">{{ sortKey === 'title' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('amount')">
              Сумма <span class="sort-icon" :class="{ active: sortKey === 'amount' }">{{ sortKey === 'amount' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('status')">
              Статус <span class="sort-icon" :class="{ active: sortKey === 'status' }">{{ sortKey === 'status' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('stage')">
              Этап <span class="sort-icon" :class="{ active: sortKey === 'stage' }">{{ sortKey === 'stage' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('manager')">
              Ответственный <span class="sort-icon" :class="{ active: sortKey === 'manager' }">{{ sortKey === 'manager' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('created_at')">
              Дата создания <span class="sort-icon" :class="{ active: sortKey === 'created_at' }">{{ sortKey === 'created_at' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('closed_at')">
              Дата закрытия <span class="sort-icon" :class="{ active: sortKey === 'closed_at' }">{{ sortKey === 'closed_at' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="deal in sortedDeals" :key="deal.id">
            <td class="cell-id">{{ deal.id }}</td>
            <td class="cell-title">{{ deal.title }}</td>
            <td class="cell-amount">{{ deal.amount }}</td>
            <td class="cell-status">{{ deal.status }}</td>
            <td class="cell-stage">{{ deal.stage }}</td>
            <td class="cell-manager">{{ deal.manager }}</td>
            <td class="cell-date">{{ deal.created_at }}</td>
            <td class="cell-date">{{ deal.closed_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Разнообразные данные для демонстрации
const deals = ref([
  { 
    id: 101, 
    title: 'Разработка интернет-магазина', 
    amount: 2500000, 
    status: 'Активна', 
    stage: 'Переговоры', 
    manager: 'Иванов А.А.', 
    created_at: '15.01.2026', 
    closed_at: '15.03.2026' 
  },
  { 
    id: 87, 
    title: 'Мобильное приложение для банка', 
    amount: 4500000, 
    status: 'Завершена', 
    stage: 'Завершена', 
    manager: 'Петрова Е.В.', 
    created_at: '10.12.2025', 
    closed_at: '28.02.2026' 
  },
  { 
    id: 234, 
    title: 'Сайт для букмекерской конторы', 
    amount: 0, 
    status: 'Отклонена', 
    stage: 'Отказ', 
    manager: 'Соснихин Н.С.', 
    created_at: '05.03.2026', 
    closed_at: '06.03.2026' 
  },
  { 
    id: 56, 
    title: 'CRM система для автосалона', 
    amount: 1800000, 
    status: 'Активна', 
    stage: 'Разработка', 
    manager: 'Козлов Д.И.', 
    created_at: '20.02.2026', 
    closed_at: '20.05.2026' 
  },
  { 
    id: 312, 
    title: 'Мобильное приложение для доставки', 
    amount: 3200000, 
    status: 'Завершена', 
    stage: 'Завершена', 
    manager: 'Иванов А.А.', 
    created_at: '01.11.2025', 
    closed_at: '15.01.2026' 
  },
  { 
    id: 45, 
    title: 'Сайт для стоматологической клиники', 
    amount: 750000, 
    status: 'Активна', 
    stage: 'Сбор требований', 
    manager: 'Смирнова О.Н.', 
    created_at: '01.03.2026', 
    closed_at: '01.05.2026' 
  },
  { 
    id: 189, 
    title: 'Система автоматизации склада', 
    amount: 5300000, 
    status: 'Завершена', 
    stage: 'Завершена', 
    manager: 'Петрова Е.В.', 
    created_at: '15.09.2025', 
    closed_at: '20.12.2025' 
  },
  { 
    id: 73, 
    title: 'Разработка чат-бота для интернет-магазина', 
    amount: 450000, 
    status: 'Активна', 
    stage: 'Тестирование', 
    manager: 'Козлов Д.И.', 
    created_at: '10.02.2026', 
    closed_at: '10.04.2026' 
  },
  { 
    id: 402, 
    title: 'Портал для государственной организации', 
    amount: 8200000, 
    status: 'Приостановлена', 
    stage: 'Согласование', 
    manager: 'Соснихин Н.С.', 
    created_at: '01.12.2025', 
    closed_at: '01.06.2026' 
  },
  { 
    id: 28, 
    title: 'Сайт для ресторанной сети', 
    amount: 1200000, 
    status: 'Активна', 
    stage: 'Дизайн', 
    manager: 'Смирнова О.Н.', 
    created_at: '25.02.2026', 
    closed_at: '25.04.2026' 
  },
  { 
    id: 156, 
    title: 'Система управления проектами', 
    amount: 2900000, 
    status: 'Завершена', 
    stage: 'Завершена', 
    manager: 'Иванов А.А.', 
    created_at: '01.08.2025', 
    closed_at: '30.11.2025' 
  },
  { 
    id: 67, 
    title: 'Мобильное приложение для фитнес-клуба', 
    amount: 980000, 
    status: 'Активна', 
    stage: 'Разработка', 
    manager: 'Козлов Д.И.', 
    created_at: '15.03.2026', 
    closed_at: '15.06.2026' 
  },
  { 
    id: 243, 
    title: 'Сайт для агентства недвижимости', 
    amount: 850000, 
    status: 'Отклонена', 
    stage: 'Отказ', 
    manager: 'Петрова Е.В.', 
    created_at: '01.02.2026', 
    closed_at: '02.02.2026' 
  },
  { 
    id: 19, 
    title: 'Интернет-магазин для букмекерской конторы', 
    amount: 0, 
    status: 'Завершена', 
    stage: 'Завершена', 
    manager: 'Соснихин Н.С.', 
    created_at: '01.01.2026', 
    closed_at: '01.01.2026' 
  },
  { 
    id: 504, 
    title: 'Облачная платформа для образования', 
    amount: 6700000, 
    status: 'Активна', 
    stage: 'Проектирование', 
    manager: 'Иванов А.А.', 
    created_at: '05.01.2026', 
    closed_at: '05.07.2026' 
  },
  { 
    id: 38, 
    title: 'Система для онлайн-бронирования отелей', 
    amount: 2100000, 
    status: 'Завершена', 
    stage: 'Завершена', 
    manager: 'Смирнова О.Н.', 
    created_at: '15.10.2025', 
    closed_at: '15.02.2026' 
  },
  { 
    id: 92, 
    title: 'Мобильное приложение для такси', 
    amount: 1500000, 
    status: 'Активна', 
    stage: 'Тестирование', 
    manager: 'Козлов Д.И.', 
    created_at: '20.01.2026', 
    closed_at: '20.04.2026' 
  },
  { 
    id: 178, 
    title: 'Сайт для юридической компании', 
    amount: 520000, 
    status: 'Приостановлена', 
    stage: 'Сбор требований', 
    manager: 'Петрова Е.В.', 
    created_at: '10.03.2026', 
    closed_at: '10.05.2026' 
  },
  { 
    id: 5, 
    title: 'Платформа для интернет-торговли', 
    amount: 9500000, 
    status: 'Активна', 
    stage: 'Переговоры', 
    manager: 'Соснихин Н.С.', 
    created_at: '01.12.2025', 
    closed_at: '01.08.2026' 
  }
])

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
const sortedDeals = computed(() => {
  if (!sortKey.value) return deals.value

  const sorted = [...deals.value].sort((a, b) => {
    let aVal = a[sortKey.value]
    let bVal = b[sortKey.value]

    // Для числовых полей
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return aVal - bVal
    }

    // Для полей с датами
    if (sortKey.value === 'created_at' || sortKey.value === 'closed_at') {
      return parseDate(aVal) - parseDate(bVal)
    }

    // Для строковых полей (регистронезависимое сравнение)
    return String(aVal).localeCompare(String(bVal), 'ru', { sensitivity: 'base' })
  })

  return sortOrder.value === 'asc' ? sorted : sorted.reverse()
})
</script>

<style scoped>
.deals-page {
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

.table-container {
  width: 100%;
  overflow-x: auto;
}

.deals-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;
  color: #1a202c;
  table-layout: fixed;
}

.deals-table th:nth-child(1) { width: 50px; }
.deals-table th:nth-child(2) { width: 250px; }
.deals-table th:nth-child(3) { width: 90px; }
.deals-table th:nth-child(4) { width: 110px; }
.deals-table th:nth-child(5) { width: 110px; }
.deals-table th:nth-child(6) { width: 150px; }
.deals-table th:nth-child(7) { width: 130px; }
.deals-table th:nth-child(8) { width: 130px; }

.deals-table th {
  font-weight: 600;
  color: #1a202c;
  padding: 12px 8px;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s ease;
}

.deals-table th:hover {
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

.deals-table td {
  padding: 14px 8px;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.cell-id {
  color: #718096;
}

.cell-amount {
  padding-left: 16px;
}

.cell-title, .cell-manager {
  text-overflow: ellipsis;
  overflow: hidden;
}

</style>