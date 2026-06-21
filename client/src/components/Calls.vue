<template>
  <div class="calls-page">
    <h1 class="page-title">Звонки</h1>

    <div class="table-container">
      <table class="calls-table">
        <thead>
          <tr>
            <th @click="sortBy('id')">
              ID <span class="sort-icon" :class="{ active: sortKey === 'id' }">{{ sortKey === 'id' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('date')">
              Дата <span class="sort-icon" :class="{ active: sortKey === 'date' }">{{ sortKey === 'date' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('time')">
              Время <span class="sort-icon" :class="{ active: sortKey === 'time' }">{{ sortKey === 'time' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('phone')">
              Номер <span class="sort-icon" :class="{ active: sortKey === 'phone' }">{{ sortKey === 'phone' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('comment')">
              Комментарий <span class="sort-icon" :class="{ active: sortKey === 'comment' }">{{ sortKey === 'comment' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('result')">
              Результат <span class="sort-icon" :class="{ active: sortKey === 'result' }">{{ sortKey === 'result' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('client')">
              Клиент <span class="sort-icon" :class="{ active: sortKey === 'client' }">{{ sortKey === 'client' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="call in sortedCalls" :key="call.id">
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
            <td :class="['cell-result', call.result === 'Безуспешно' ? 'text-error' : 'text-success']">
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
import { ref, computed } from 'vue'

const calls = ref([
  { id: 234, date: '15.03.2026', time: '14:30', phone: '+7 (916) 234-56-78', comment: 'Обсуждение условий контракта', result: 'Успешно', client: 'Александр' },
  { id: 89, date: '15.03.2026', time: '11:15', phone: '+7 (903) 123-45-67', comment: 'Уточнение требований по проекту', result: 'Успешно', client: 'Мария' },
  { id: 402, date: '14.03.2026', time: '16:45', phone: '+7 (912) 888-99-00', comment: 'Отказ от сотрудничества', result: 'Безуспешно', client: 'Сергей' },
  { id: 156, date: '14.03.2026', time: '10:00', phone: '+7 (917) 111-22-33', comment: 'Согласование сроков', result: 'Успешно', client: 'Игорь' },
  { id: 67, date: '13.03.2026', time: '15:20', phone: '+7 (905) 444-55-66', comment: 'Вопросы по технической части', result: 'Успешно', client: 'Светлана' },
  { id: 312, date: '13.03.2026', time: '09:30', phone: '+7 (909) 987-65-43', comment: 'Перенос встречи', result: 'Безуспешно', client: 'Елена' },
  { id: 45, date: '12.03.2026', time: '13:45', phone: '+7 (904) 063-26-07', comment: 'Обсуждение бюджета', result: 'Успешно', client: 'Дмитрий' },
  { id: 189, date: '12.03.2026', time: '08:50', phone: '+7 (910) 777-88-99', comment: 'Подтверждение оплаты', result: 'Успешно', client: 'Павел' },
  { id: 73, date: '11.03.2026', time: '17:10', phone: '+7 (908) 555-66-77', comment: 'Дополнительные вопросы', result: 'Успешно', client: 'Анна' },
  { id: 504, date: '11.03.2026', time: '12:25', phone: '+7 (915) 777-66-55', comment: 'Смена ответственного лица', result: 'Безуспешно', client: 'Наталья' },
  { id: 28, date: '10.03.2026', time: '14:00', phone: '+7 (906) 222-33-44', comment: 'Согласование договора', result: 'Успешно', client: 'Ольга' },
  { id: 61, date: '10.03.2026', time: '09:15', phone: '+7 (911) 333-44-55', comment: 'Обсуждение этапов разработки', result: 'Успешно', client: 'Михаил' },
  { id: 99, date: '09.03.2026', time: '16:30', phone: '+7 (914) 666-77-88', comment: 'Перенос дедлайна', result: 'Безуспешно', client: 'Татьяна' },
  { id: 243, date: '09.03.2026', time: '11:40', phone: '+7 (913) 999-00-11', comment: 'Нет ответа, перезвонить позже', result: 'Безуспешно', client: 'Виктор' },
  { id: 92, date: '08.03.2026', time: '13:55', phone: '+7 (916) 555-44-33', comment: 'Договор отправлен на подпись', result: 'Успешно', client: 'Екатерина' },
  { id: 38, date: '08.03.2026', time: '10:20', phone: '+7 (907) 444-33-22', comment: 'Обсуждение деталей проекта', result: 'Успешно', client: 'Андрей' },
  { id: 178, date: '07.03.2026', time: '15:10', phone: '+7 (918) 333-22-11', comment: 'Запрос дополнительной документации', result: 'Успешно', client: 'Роман' },
  { id: 5, date: '07.03.2026', time: '08:45', phone: '+7 (905) 111-00-99', comment: 'Утверждение сметы', result: 'Успешно', client: 'Ирина' }
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

// Функция для парсинга времени из формата HH:MM
const parseTime = (str) => {
  if (!str) return 0
  const [hours, minutes] = str.split(':').map(Number)
  return hours * 60 + minutes
}

// Вычисляемое свойство с отсортированными данными
const sortedCalls = computed(() => {
  if (!sortKey.value) return calls.value

  const sorted = [...calls.value].sort((a, b) => {
    let aVal = a[sortKey.value]
    let bVal = b[sortKey.value]

    // Для числовых полей (id)
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return aVal - bVal
    }

    // Для полей с датами
    if (sortKey.value === 'date') {
      return parseDate(aVal) - parseDate(bVal)
    }

    // Для полей с временем
    if (sortKey.value === 'time') {
      return parseTime(aVal) - parseTime(bVal)
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

.calls-table th:nth-child(1) { width: 50px; }
.calls-table th:nth-child(2) { width: 100px; }
.calls-table th:nth-child(3) { width: 80px; }
.calls-table th:nth-child(4) { width: 180px; }
.calls-table th:nth-child(5) { width: 220px; }
.calls-table th:nth-child(6) { width: 120px; }
.calls-table th:nth-child(7) { width: 100px; }

.calls-table th {
  font-weight: 600;
  color: #1a202c;
  padding: 12px 8px;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s ease;
}

.calls-table th:hover {
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

.text-success {
  color: #38a169;
}

.cell-result.text-success {
  font-weight: 600;
}

</style>