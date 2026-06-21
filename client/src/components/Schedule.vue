<template>
  <div class="schedule-page">
    <h1 class="page-title">Расписание</h1>

    <!-- 1. Карточки аналитики -->
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

    <!-- 2. Секция календаря -->
    <div class="calendar-container">
      
      <!-- Заголовок с динамическим названием и стрелочками управления -->
      <div class="calendar-header">
        <h2 class="current-month">{{ formattedMonthYear }}</h2>
        <div class="calendar-nav">
          <button class="nav-btn" @click="prevMonth" title="Предыдущий месяц">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
          </button>
          <button class="nav-btn" @click="nextMonth" title="Следующий месяц">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
        </div>
      </div>

      <!-- Календарная сетка -->
      <div class="calendar-grid">
        <!-- Дни недели -->
        <div v-for="day in weekDays" :key="day" class="weekday-label">{{ day }}</div>

        <!-- Динамические ячейки дней -->
        <div 
          v-for="(day, index) in calendarDays" 
          :key="index"
          :class="[
            'calendar-cell',
            day.isCurrentMonth ? (day.isWeekend ? 'cell-weekend' : 'cell-work') : 'cell-other-month',
            day.isToday ? 'cell-current' : ''
          ]"
        >
          {{ day.number }}
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

// Храним текущую просматриваемую дату (по умолчанию — сегодняшний день)
const currentDate = ref(new Date())

// Сегодняшняя дата компьютера для жесткого сравнения (чтобы рамка не смещалась при перелистывании месяцев)
const today = new Date()

// Название месяцев на русском для вывода в шапку
const monthsRu = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]

// Вычисляемое свойство для красивого заголовка, например: "Июнь 2026"
const formattedMonthYear = computed(() => {
  const month = monthsRu[currentDate.value.getMonth()]
  const year = currentDate.value.getFullYear()
  return `${month} ${year}`
})

// Функции перелистывания месяцев
const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

// Главный генератор сетки календаря
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()

  // 1. Первый день текущего месяца и его день недели
  const firstDayOfMonth = new Date(year, month, 1)
  // Корректируем индекс дня недели под европейский стандарт (Пн = 0, Вс = 6)
  let startDayOfWeek = firstDayOfMonth.getDay() - 1
  if (startDayOfWeek === -1) startDayOfWeek = 6

  // 2. Количество дней в текущем месяце
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate()

  // 3. Количество дней в предыдущем месяце (для заполнения хвоста в начале)
  const totalDaysInPrevMonth = new Date(year, month, 0).getDate()

  const days = []

  // Заполняем серые дни прошлого месяца в начале сетки
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    days.push({
      number: totalDaysInPrevMonth - i,
      isCurrentMonth: false,
      isToday: false
    })
  }

  // Заполняем активные дни текущего месяца
  for (let i = 1; i <= totalDaysInMonth; i++) {
    const checkDate = new Date(year, month, i)
    const dayOfWeek = checkDate.getDay()
    
    // Определяем выходной ли день (Суббота = 6, Воскресенье = 0)
    const isWeekend = dayOfWeek === 6 || dayOfWeek === 0

    // Проверяем, совпадает ли день с реальным «сегодня»
    const isToday = i === today.getDate() && 
                    month === today.getMonth() && 
                    year === today.getFullYear()

    days.push({
      number: i,
      isCurrentMonth: true,
      isWeekend,
      isToday
    })
  }

  // Заполняем серые дни следующего месяца до полной сетки (кратной 7)
  const totalCells = Math.ceil(days.length / 7) * 7
  const nextMonthCellsNeeded = totalCells - days.length
  for (let i = 1; i <= nextMonthCellsNeeded; i++) {
    days.push({
      number: i,
      isCurrentMonth: false,
      isToday: false
    })
  }

  return days
})
</script>

<style scoped>
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

/* Сетка карточек */
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

/* Календарь */
.calendar-container {
  max-width: 480px;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
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
}

/* Рабочие будни текущего месяца (нежно-голубые) */
.cell-work {
  background-color: #ebf8ff;
  border-color: #cbd5e0;
}

/* Выходные текущего месяца (белые, как 6 и 7 число в макете) */
.cell-weekend {
  background-color: #ffffff;
  border-color: #cbd5e0;
}

/* Дни прошлых/будущих месяцев (серые) */
.cell-other-month {
  background-color: #e2e8f0;
  border-color: #cbd5e0;
  color: #718096;
}

/* Стилизация СЕГОДНЯШНЕГО числа (жирная обводка из макета) */
.cell-current {
  border: 2px solid #1a202c !important; /* Принудительно задаем толстую черную рамку */
  font-weight: 700;
}
</style>
