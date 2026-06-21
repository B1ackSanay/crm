<template>
  <div class="deals-page">
    <h1 class="page-title">Сделки</h1>

    <div class="table-container">
      <table class="deals-table">
        <thead>
          <tr>
            <th>ID <span class="sort-icon">↓</span></th>
            <th>Название <span class="sort-icon">↓</span></th>
            <th>Сумма <span class="sort-icon">↓</span></th>
            <th>Статус <span class="sort-icon">↓</span></th>
            <th>Этап <span class="sort-icon">↓</span></th>
            <th>Ответственный <span class="sort-icon">↓</span></th>
            <th>Дата создания <span class="sort-icon">↓</span></th>
            <th>Дата закрытия <span class="sort-icon">↓</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="deal in deals" :key="deal.id">
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
import { ref } from 'vue'

// Массив данных, полностью соответствующий вашему скриншоту
const deals = ref([
  { id: 19, title: 'Сайт для букмекерской конторы', amount: 0, status: 'Завершена', stage: 'Завершена', manager: 'Соснихин Н.С.', created_at: '01.01.2026', closed_at: '01.01.2026' },
  { id: 18, title: 'Сайт для букмекерской конторы', amount: 0, status: 'Завершена', stage: 'Завершена', manager: 'Соснихин Н.С.', created_at: '01.01.2026', closed_at: '01.01.2026' },
  { id: 17, title: 'Сайт для букмекерской конторы', amount: 0, status: 'Завершена', stage: 'Завершена', manager: 'Соснихин Н.С.', created_at: '01.01.2026', closed_at: '01.01.2026' },
  { id: 16, title: 'Сайт для букмекерской конторы', amount: 0, status: 'Завершена', stage: 'Завершена', manager: 'Соснихин Н.С.', created_at: '01.01.2026', closed_at: '01.01.2026' },
  { id: 15, title: 'Сайт для букмекерской конторы', amount: 0, status: 'Завершена', stage: 'Завершена', manager: 'Соснихин Н.С.', created_at: '01.01.2026', closed_at: '01.01.2026' },
  { id: 14, title: 'Сайт для букмекерской конторы', amount: 0, status: 'Завершена', stage: 'Завершена', manager: 'Соснихин Н.С.', created_at: '01.01.2026', closed_at: '01.01.2026' },
  { id: 13, title: 'Сайт для букмекерской конторы', amount: 0, status: 'Завершена', stage: 'Завершена', manager: 'Соснихин Н.С.', created_at: '01.01.2026', closed_at: '01.01.2026' },
  { id: 12, title: 'Сайт для букмекерской конторы', amount: 0, status: 'Завершена', stage: 'Завершена', manager: 'Соснихин Н.С.', created_at: '01.01.2026', closed_at: '01.01.2026' },
  { id: 11, title: 'Сайт для букмекерской конторы', amount: 0, status: 'Завершена', stage: 'Завершена', manager: 'Соснихин Н.С.', created_at: '01.01.2026', closed_at: '01.01.2026' },
  { id: 10, title: 'Сайт для букмекерской конторы', amount: 0, status: 'Завершена', stage: 'Завершена', manager: 'Соснихин Н.С.', created_at: '01.01.2026', closed_at: '01.01.2026' },
  { id: 9, title: 'Сайт для букмекерской конторы', amount: 0, status: 'Завершена', stage: 'Завершена', manager: 'Соснихин Н.С.', created_at: '01.01.2026', closed_at: '01.01.2026' },
  { id: 8, title: 'Сайт для букмекерской конторы', amount: 0, status: 'Завершена', stage: 'Завершена', manager: 'Соснихин Н.С.', created_at: '01.01.2026', closed_at: '01.01.2026' },
  { id: 7, title: 'Сайт для букмекерской конторы', amount: 0, status: 'Завершена', stage: 'Завершена', manager: 'Соснихин Н.С.', created_at: '01.01.2026', closed_at: '01.01.2026' },
  { id: 6, title: 'Сайт для букмекерской конторы', amount: 0, status: 'Завершена', stage: 'Завершена', manager: 'Соснихин Н.С.', created_at: '01.01.2026', closed_at: '01.01.2026' },
  { id: 5, title: 'Сайт для букмекерской конторы', amount: 0, status: 'Завершена', stage: 'Завершена', manager: 'Соснихин Н.С.', created_at: '01.01.2026', closed_at: '01.01.2026' },
  { id: 4, title: 'Сайт для букмекерской конторы', amount: 0, status: 'Завершена', stage: 'Завершена', manager: 'Соснихин Н.С.', created_at: '01.01.2026', closed_at: '01.01.2026' },
  { id: 3, title: 'Сайт для букмекерской конторы', amount: 0, status: 'Завершена', stage: 'Завершена', manager: 'Соснихин Н.С.', created_at: '01.01.2026', closed_at: '01.01.2026' },
  { id: 2, title: 'Сайт для букмекерской конторы', amount: 0, status: 'Завершена', stage: 'Завершена', manager: 'Соснихин Н.С.', created_at: '01.01.2026', closed_at: '01.01.2026' },
  { id: 1, title: 'Сайт для букмекерской конторы', amount: 0, status: 'Завершена', stage: 'Завершена', manager: 'Соснихин Н.С.', created_at: '01.01.2026', closed_at: '01.01.2026' }
])
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

/* Контейнер таблицы с горизонтальным скроллом для адаптивности */
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

.deals-table th {
  width: fit-content;
}

/* Дата закрытия */

.deals-table th {
  font-weight: 600;
  color: #1a202c;
  padding: 12px 8px;
  white-space: nowrap;
}

.sort-icon {
  display: inline-block;
  margin-left: 4px;
  color: #1a202c;
  font-size: 11px;
}

.deals-table td {
  padding: 14px 8px;
  vertical-align: middle;
  white-space: nowrap;
  /* Сохраняет строки целостными */
  text-overflow: ellipsis;
  overflow: hidden;
}

/* Специфичные стили для ячеек */
.cell-id {
  color: #718096;
}

.cell-amount {
  padding-left: 16px;
  /* Небольшой отступ для центрирования под заголовком */
}

.cell-title,
.cell-manager {
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
