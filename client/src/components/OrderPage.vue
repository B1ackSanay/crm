<template>
  <div class="orders-page">
    <h1 class="page-title">Заявки</h1>

    <!-- 1. Карточки аналитики (Статистика) -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-period">Сегодня</div>
        <div class="stat-value">0</div>
        <div class="stat-footer text-gray">Нет данных за прошлый период</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-period">Сегодня</div>
        <div class="stat-value">0</div>
        <div class="stat-footer text-gray">Нет данных за прошлый период</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-period">За 7 дней</div>
        <div class="stat-value">0</div>
        <div class="stat-footer text-gray">-0 к прошлому периоду</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-period">За 30 дней</div>
        <div class="stat-value">0</div>
        <div class="stat-footer text-gray">+0 к прошлому периоду</div>
      </div>
    </div>

    <!-- 2. Таблица заявок -->
    <div class="table-container">
      <table class="orders-table">
        <thead>
          <tr>
            <th>ID <span class="sort-icon">↓</span></th>
            <th>Имя <span class="sort-icon">↓</span></th>
            <th>Телефон <span class="sort-icon">↓</span></th>
            <th>Email <span class="sort-icon">↓</span></th>
            <th>Компания <span class="sort-icon">↓</span></th>
            <th>Дата создания <span class="sort-icon">↓</span></th>
            <th>Сделка <span class="sort-icon">↓</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
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
                <span class="date-cell">{{ order.date }}</span>
                <span class="time-cell text-gray">{{ order.time }}</span>
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
import { ref } from 'vue'

const orders = ref([
  { id: 14, name: 'Дмитрий', phone: '+7 (904) 063-26-07', email: 'example@email.com', company: 'ООО "СОФТАРТ"', date: '01.01.2026', time: '00:00', deal: 1 },
  { id: 13, name: 'Дмитрий', phone: '+7 (904) 063-26-07', email: 'example@email.com', company: 'ООО "СОФТАРТ"', date: '01.01.2026', time: '00:00', deal: 1 },
  { id: 12, name: 'Дмитрий', phone: '+7 (904) 063-26-07', email: 'example@email.com', company: 'ООО "СОФТАРТ"', date: '01.01.2026', time: '00:00', deal: 1 },
  { id: 11, name: 'Дмитрий', phone: '+7 (904) 063-26-07', email: 'example@email.com', company: 'ООО "СОФТАРТ"', date: '01.01.2026', time: '00:00', deal: 1 },
  { id: 10, name: 'Дмитрий', phone: '+7 (904) 063-26-07', email: 'example@email.com', company: 'ООО "СОФТАРТ"', date: '01.01.2026', time: '00:00', deal: 1 },
  { id: 9,  name: 'Дмитрий', phone: '+7 (904) 063-26-07', email: 'example@email.com', company: 'ООО "СОФТАРТ"', date: '01.01.2026', time: '00:00', deal: 1 },
  { id: 8,  name: 'Дмитрий', phone: '+7 (904) 063-26-07', email: 'example@email.com', company: 'ООО "СОФТАРТ"', date: '01.01.2026', time: '00:00', deal: 1 },
  { id: 7,  name: 'Дмитрий', phone: '+7 (904) 063-26-07', email: 'example@email.com', company: 'ООО "СОФТАРТ"', date: '01.01.2026', time: '00:00', deal: 1 },
  { id: 6,  name: 'Дмитрий', phone: '+7 (904) 063-26-07', email: 'example@email.com', company: 'ООО "СОФТАРТ"', date: '01.01.2026', time: '00:00', deal: 1 },
  { id: 5,  name: 'Дмитрий', phone: '+7 (904) 063-26-07', email: 'example@email.com', company: 'ООО "СОФТАРТ"', date: '01.01.2026', time: '00:00', deal: 1 },
  { id: 4,  name: 'Дмитрий', phone: '+7 (904) 063-26-07', email: 'example@email.com', company: 'ООО "СОФТАРТ"', date: '01.01.2026', time: '00:00', deal: 1 },
  { id: 3,  name: 'Дмитрий', phone: '+7 (904) 063-26-07', email: 'example@email.com', company: 'ООО "СОФТАРТ"', date: '01.01.2026', time: '00:00', deal: 1 },
  { id: 2,  name: 'Дмитрий', phone: '+7 (904) 063-26-07', email: 'example@email.com', company: 'ООО "СОФТАРТ"', date: '01.01.2026', time: '00:00', deal: 1 },
  { id: 1,  name: 'Дмитрий', phone: '+7 (904) 063-26-07', email: 'example@email.com', company: 'ООО "СОФТАРТ"', date: '01.01.2026', time: '00:00', deal: 1 }
])
</script>

<style scoped>
.orders-page {
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
}

.orders-table th {
  font-weight: 600;
  color: #1a202c;
  padding: 12px 8px;
  white-space: nowrap;
}

.sort-icon {
  display: inline-block;
  margin-left: 4px;
  color: #a0aec0;
  font-size: 11px;
}

.orders-table td {
  padding: 14px 8px;
  vertical-align: middle;
  word-break: break-word; /* Предотвращаем вылезание текста */
}

/* Стилизация иконок внутри ячеек */
.cell-id {
  color: #718096;
}

/* Центрируем иконку и текст БЕЗ разрушения самой ячейки таблицы */
.cell-phone, .cell-email {
  white-space: nowrap;
}

/* Создаем мини-флекс обертку вокруг содержимого, а не самой ячейки */
.cell-phone, .cell-email {
  /* Заменяем display: flex у td на инлайн-флекс центрирование текста */
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

