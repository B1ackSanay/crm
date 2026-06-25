<template>
  <div class="schedule-page">
    <h1 class="page-title">Расписание</h1>

    <!-- Карточки аналитики -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-period">Часов сегодня</div>
        <div class="stat-value">7 ч</div>
        <div class="stat-footer text-gray">Рабочий день</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-period">Часов на неделе</div>
        <div class="stat-value">34 ч</div>
        <div class="stat-footer text-gray">Пн-Вс</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-period">За 30 дней</div>
        <div class="stat-value">136 ч</div>
        <div class="stat-footer text-gray">Текущий месяц</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-period">Активных предприятий</div>
        <div class="stat-value">2 рабочих дня</div>
        <div class="stat-footer text-gray">1 в будущем</div>
      </div>
    </div>

    <!-- Календарь + плитка событий -->
    <div class="schedule-content">
      <div class="calendar-container">
        <!-- Заголовок -->
        <div class="calendar-header">
          <h2 class="current-month">{{ formattedMonthYear }}</h2>
          <div class="calendar-nav">
            <button class="nav-btn" @click="prevMonth" title="Предыдущий месяц">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
            </button>
            <button class="nav-btn" @click="nextMonth" title="Следующий месяц">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <button class="add-event-btn" @click="openModal">+ Событие</button>
          </div>
        </div>

        <!-- Календарная сетка -->
        <div class="calendar-grid">
          <div v-for="day in weekDays" :key="day" class="weekday-label">{{ day }}</div>
          <div 
            v-for="(day, index) in calendarDays" 
            :key="index"
            :class="[
              'calendar-cell',
              day.isCurrentMonth ? (day.isWeekend ? 'cell-weekend' : 'cell-work') : 'cell-other-month',
              day.isToday ? 'cell-current' : '',
              day.hasEvent ? 'cell-has-event' : ''
            ]"
          >
            {{ day.number }}
          </div>
        </div>
      </div>

      <!-- Плитка событий -->
      <div class="events-sidebar">
        <div class="stat-card events-card">
          <div class="stat-period">Ближайшие события</div>
          <div v-if="upcomingEvents.length === 0" class="stat-value" style="font-size: 16px; font-weight: 400; color: #718096;">
            Нет событий
          </div>
          <ul v-else class="events-list">
            <li v-for="event in upcomingEvents" :key="event.id" class="event-item">
              <span class="event-date">{{ formatDate(event.date) }}</span>
              <span class="event-time" v-if="event.time">{{ event.time }}</span>
              <span class="event-title">{{ event.title }}</span>
              <button class="event-delete" @click="removeEvent(event.id)" title="Удалить событие">✕</button>
            </li>
          </ul>
          <div class="stat-footer text-gray">Текущий месяц</div>
        </div>
      </div>
    </div>

    <!-- Модальное окно -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h3 class="modal-title">Новое событие</h3>
        <form @submit.prevent="addEvent">
          <div class="form-group">
            <label>Название</label>
            <input v-model="newEvent.title" type="text" required />
          </div>
          <div class="form-group">
            <label>Дата</label>
            <input v-model="newEvent.date" type="date" required />
          </div>
          <div class="form-group">
            <label>Время (необязательно)</label>
            <input v-model="newEvent.time" type="time" />
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="closeModal">Отмена</button>
            <button type="submit" class="btn-save">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const currentDate = ref(new Date())
const today = new Date()
const monthsRu = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]

// === УПРАВЛЕНИЕ СОБЫТИЯМИ ===
const events = ref([])
const showModal = ref(false)
const newEvent = ref({
  title: '',
  date: '',
  time: ''
})

// Загрузка из localStorage (имитация чтения из JSON-файла)
const loadEvents = () => {
  const stored = localStorage.getItem('schedule_events')
  if (stored) {
    try {
      events.value = JSON.parse(stored)
    } catch (e) {
      events.value = []
    }
  }
}

// Сохранение в localStorage (имитация записи в JSON-файл)
const saveEvents = () => {
  localStorage.setItem('schedule_events', JSON.stringify(events.value))
  // Здесь можно добавить реальный запрос на сервер, например:
  // fetch('/api/events', { method: 'POST', body: JSON.stringify(events.value) })
}

// Автосохранение при изменении списка
watch(events, () => {
  saveEvents()
}, { deep: true })

onMounted(() => {
  loadEvents()
})

const openModal = () => {
  newEvent.value = { title: '', date: '', time: '' }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const addEvent = () => {
  if (!newEvent.value.title || !newEvent.value.date) return
  events.value.push({
    id: Date.now(),
    title: newEvent.value.title,
    date: newEvent.value.date,
    time: newEvent.value.time || ''
  })
  closeModal()
}

const removeEvent = (id) => {
  events.value = events.value.filter(ev => ev.id !== id)
}

// События текущего месяца, отсортированные по дате
const upcomingEvents = computed(() => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()

  return events.value
    .filter(ev => {
      const d = new Date(ev.date)
      return d.getFullYear() === currentYear && d.getMonth() === currentMonth
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5)
})

const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return `${d.getDate()} ${monthsRu[d.getMonth()].slice(0, 3)}`
}

// === КАЛЕНДАРЬ ===
const formattedMonthYear = computed(() => {
  const month = monthsRu[currentDate.value.getMonth()]
  const year = currentDate.value.getFullYear()
  return `${month} ${year}`
})

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  let startDayOfWeek = firstDayOfMonth.getDay() - 1
  if (startDayOfWeek === -1) startDayOfWeek = 6

  const totalDaysInMonth = new Date(year, month + 1, 0).getDate()
  const totalDaysInPrevMonth = new Date(year, month, 0).getDate()

  // Множество дат с событиями
  const eventDates = new Set(events.value.map(ev => ev.date))

  const days = []

  // Дни прошлого месяца
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const dayNum = totalDaysInPrevMonth - i
    const dateObj = new Date(year, month - 1, dayNum)
    const dateStr = dateObj.toISOString().slice(0,10)
    days.push({
      number: dayNum,
      isCurrentMonth: false,
      isToday: false,
      hasEvent: eventDates.has(dateStr)
    })
  }

  // Дни текущего месяца
  for (let i = 1; i <= totalDaysInMonth; i++) {
    const checkDate = new Date(year, month, i)
    const dayOfWeek = checkDate.getDay()
    const isWeekend = dayOfWeek === 6 || dayOfWeek === 0
    const isToday = i === today.getDate() && 
                    month === today.getMonth() && 
                    year === today.getFullYear()
    const dateStr = checkDate.toISOString().slice(0,10)
    days.push({
      number: i,
      isCurrentMonth: true,
      isWeekend,
      isToday,
      hasEvent: eventDates.has(dateStr)
    })
  }

  // Дни следующего месяца
  const totalCells = Math.ceil(days.length / 7) * 7
  const nextMonthCellsNeeded = totalCells - days.length
  for (let i = 1; i <= nextMonthCellsNeeded; i++) {
    const dateObj = new Date(year, month + 1, i)
    const dateStr = dateObj.toISOString().slice(0,10)
    days.push({
      number: i,
      isCurrentMonth: false,
      isToday: false,
      hasEvent: eventDates.has(dateStr)
    })
  }

  return days
})
</script>

<style scoped>
/* Существующие стили (без изменений) */
.schedule-page {
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
  min-height: 84px;
  justify-content: space-between;
}

.stat-period {
  font-size: 13px;
  color: #4a5568;
}

.stat-value {
  font-size: 22px;
  font-weight: 700;
  color: #1a202c;
  line-height: 1.2;
}

.stat-footer {
  font-size: 11px;
}

.text-gray {
  color: #718096;
}

/* Контейнер календаря + плитки */
.schedule-content {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

/* Календарь – фиксированная ширина 480px (прежний размер) */
.calendar-container {
  width: 480px;
  flex-shrink: 0;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  align-items: center;
}

.current-month {
  font-size: 22px;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}

.calendar-nav {
  display: flex;
  gap: 4px;
  align-items: center;
}

.nav-btn {
  background: none;
  border: none;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #1a202c;
  border-radius: 6px;
  transition: background-color 0.15s ease;
  padding: 0;
}

.nav-btn:hover {
  background-color: #edf2f7;
}

.nav-btn svg {
  width: 16px;
  height: 16px;
}

.add-event-btn {
  background: #1a202c;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  height: 28px;
  line-height: 1;
  white-space: nowrap;
  margin-left: 8px;
}

.add-event-btn:hover {
  background: #2d3748;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.weekday-label {
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #1a202c;
  padding-bottom: 8px;
}

.calendar-cell {
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
  color: #1a202c;
  border-radius: 6px;
  border: 1px solid #cbd5e0;
  background-color: #ffffff;
  user-select: none;
  box-sizing: border-box;
  position: relative;
  transition: background 0.15s;
}

.cell-work {
  background-color: #ebf8ff;
  border-color: #cbd5e0;
}

.cell-weekend {
  background-color: #ffffff;
  border-color: #cbd5e0;
}

.cell-other-month {
  background-color: #e2e8f0;
  border-color: #cbd5e0;
  color: #718096;
}

.cell-current {
  border: 2px solid #1a202c !important;
  font-weight: 700;
}

/* Выделение дней с событиями – цветовой фон вместо точки */
.cell-has-event {
  background-color: #bee3f8 !important; /* нежный голубой, хорошо сочетается с общей палитрой */
  border-color: #90cdf4;
  font-weight: 600;
}

/* Для дней других месяцев с событием тоже делаем выделение, но чуть бледнее */
.cell-other-month.cell-has-event {
  background-color: #d2e6f0 !important;
  border-color: #b0c4d9;
  color: #2d3748;
}

/* Плитка событий */
.events-sidebar {
  flex: 1;
  min-width: 200px;
}

.events-card {
  background-color: #ebf8ff;
  min-height: 84px;
  height: 100%;
}

.events-list {
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.event-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
  font-size: 14px;
  line-height: 1.4;
  padding-right: 4px;
}

.event-date {
  font-weight: 600;
  color: #2b6cb0;
}

.event-time {
  color: #4a5568;
  font-size: 13px;
}

.event-title {
  color: #1a202c;
  font-weight: 500;
  flex: 1;
}

.event-delete {
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  font-size: 14px;
  padding: 0 2px;
  transition: color 0.15s;
  line-height: 1;
}

.event-delete:hover {
  color: #e53e3e;
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 24px 28px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
}

.modal-title {
  margin: 0 0 16px 0;
  font-size: 20px;
  font-weight: 600;
  color: #1a202c;
}

.form-group {
  margin-bottom: 14px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 4px;
}

.form-group input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 2px rgba(49,130,206,0.2);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.modal-actions button {
  padding: 6px 18px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-cancel {
  background: #e2e8f0;
  color: #2d3748;
}

.btn-cancel:hover {
  background: #cbd5e0;
}

.btn-save {
  background: #1a202c;
  color: white;
}

.btn-save:hover {
  background: #2d3748;
}
</style>