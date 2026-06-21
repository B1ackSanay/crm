<template>
  <div class="calls-page">
    <h1 class="page-title">Звонки</h1>

    <div class="table-container">
      <table class="calls-table">
        <thead>
          <tr>
            <th>ID <span class="sort-icon">↓</span></th>
            <th>Дата <span class="sort-icon">↓</span></th>
            <th>Время <span class="sort-icon">↓</span></th>
            <th>Номер <span class="sort-icon">↓</span></th>
            <th>Комментарий <span class="sort-icon">↓</span></th>
            <th>Результат <span class="sort-icon">↓</span></th>
            <th>Клиент <span class="sort-icon">↓</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="call in calls" :key="call.id">
            <td class="cell-id">{{ call.id }}</td>
            <td>{{ call.date }}</td>
            <td class="text-gray">{{ call.time }}</td>
            <td class="cell-phone">
              <svg class="phone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              {{ call.phone }}
            </td>
            <td class="cell-comment text-gray">{{ call.comment }}</td>
            <td :class="['cell-result', call.result === 'Безуспешно' ? 'text-error' : '']">
              {{ call.result }}
            </td>
            <td>{{ call.client }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Демонстрационный массив данных в соответствии с макетом
const calls = ref([
  { id: 19, date: '01.01.2026', time: '00:00', phone: '+7 (910) 101-36-08', comment: 'Очень важный комментарий', result: 'Успешно', client: 'Дмитрий' },
  { id: 18, date: '01.01.2026', time: '00:00', phone: '+7 (910) 101-36-08', comment: 'Очень важный комментарий', result: 'Успешно', client: 'Дмитрий' },
  { id: 17, date: '01.01.2026', time: '00:00', phone: '+7 (910) 101-36-08', comment: 'Очень важный комментарий', result: 'Успешно', client: 'Дмитрий' },
  { id: 16, date: '01.01.2026', time: '00:00', phone: '+7 (910) 101-36-08', comment: 'Очень важный комментарий', result: 'Успешно', client: 'Дмитрий' },
  { id: 15, date: '01.01.2026', time: '00:00', phone: '+7 (910) 101-36-08', comment: 'Очень важный комментарий', result: 'Успешно', client: 'Дмитрий' },
  { id: 14, date: '01.01.2026', time: '00:00', phone: '+7 (910) 101-36-08', comment: 'Очень важный комментарий', result: 'Успешно', client: 'Дмитрий' },
  { id: 13, date: '01.01.2026', time: '00:00', phone: '+7 (910) 101-36-08', comment: 'Очень важный комментарий', result: 'Успешно', client: 'Дмитрий' },
  { id: 12, date: '01.01.2026', time: '00:00', phone: '+7 (910) 101-36-08', comment: 'Очень важный комментарий', result: 'Успешно', client: 'Дмитрий' },
  { id: 11, date: '01.01.2026', time: '00:00', phone: '+7 (910) 101-36-08', comment: 'Очень важный комментарий', result: 'Успешно', client: 'Дмитрий' },
  { id: 10, date: '01.01.2026', time: '00:00', phone: '+7 (910) 101-36-08', comment: 'Очень важный комментарий', result: 'Успешно', client: 'Дмитрий' },
  { id: 9,  date: '01.01.2026', time: '00:00', phone: '+7 (910) 101-36-08', comment: 'Очень важный комментарий', result: 'Успешно', client: 'Дмитрий' },
  { id: 8,  date: '01.01.2026', time: '00:00', phone: '+7 (910) 101-36-08', comment: 'Очень важный комментарий', result: 'Успешно', client: 'Дмитрий' },
  { id: 7,  date: '01.01.2026', time: '00:00', phone: '+7 (910) 101-36-08', comment: 'Очень важный комментарий', result: 'Успешно', client: 'Дмитрий' },
  { id: 6,  date: '01.01.2026', time: '00:00', phone: '+7 (910) 101-36-08', comment: 'Очень важный комментарий', result: 'Успешно', client: 'Дмитрий' },
  { id: 5,  date: '01.01.2026', time: '00:00', phone: '+7 (910) 101-36-08', comment: 'Очень важный комментарий', result: 'Успешно', client: 'Дмитрий' },
  { id: 4,  date: '01.01.2026', time: '00:00', phone: '+7 (910) 101-36-08', comment: 'Очень важный комментарий', result: 'Успешно', client: 'Дмитрий' },
  { id: 3,  date: '01.01.2026', time: '00:00', phone: '+7 (910) 101-36-08', comment: 'Очень важный комментарий', result: 'Успешно', client: 'Дмитрий' },
  { id: 2,  date: '01.01.2026', time: '00:00', phone: '+7 (910) 101-36-08', comment: 'Очень важный комментарий', result: 'Успешно', client: 'Дмитрий' },
  { id: 1,  date: '01.01.2026', time: '00:00', phone: '+7 (910) 101-36-08', comment: 'Очень важный комментарий', result: 'Безуспешно', client: 'Дмитрий' }
])
</script>

<style scoped>
    .calls-page {
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

    .calls-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 13px;
    color: #1a202c;
    table-layout: fixed;
    }

    /* Пропорциональная ширина колонок для сохранения ровной сетки */
    .calls-table th:nth-child(1) { width: 50px; }  /* ID */
    .calls-table th:nth-child(2) { width: 100px; } /* Дата */
    .calls-table th:nth-child(3) { width: 80px; }  /* Время */
    .calls-table th:nth-child(4) { width: 180px; } /* Номер */
    .calls-table th:nth-child(5) { width: 220px; } /* Комментарий */
    .calls-table th:nth-child(6) { width: 120px; } /* Результат */
    .calls-table th:nth-child(7) { width: 100px; } /* Клиент */

    .calls-table th {
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

    .calls-table td {
    padding: 14px 8px;
    vertical-align: middle;
    }

    .calls-table td:not(.cell-comment) {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    }

    .cell-comment {
    font-size: 11px;
    color: #718096;
    white-space: normal; 
    word-break: break-word;   
    max-width: 220px;       
    }

    .cell-id {
    color: #718096;
    }

    .text-gray {
    color: #718096;
    }

    .cell-phone {
    line-height: 1;
    }

    .phone-icon {
    display: inline-block;
    vertical-align: middle;
    margin-right: 8px;
    width: 14px;
    height: 14px;
    color: #4a5568;
    }

    .text-error {
    color: #e53e3e; 
    }
</style>
