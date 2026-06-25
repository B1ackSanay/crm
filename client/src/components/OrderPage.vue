<template>
  <div class="orders-page">
    <h1 class="page-title">Заявки</h1>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-period">Сегодня</div>
        <div class="stat-value">{{ stats.today }}</div>
        <div class="stat-footer text-gray">заявок за сегодня</div>
      </div>
      <div class="stat-card">
        <div class="stat-period">За 7 дней</div>
        <div class="stat-value">{{ stats.week }}</div>
        <div class="stat-footer text-gray">заявок за неделю</div>
      </div>
      <div class="stat-card">
        <div class="stat-period">За 30 дней</div>
        <div class="stat-value">{{ stats.month }}</div>
        <div class="stat-footer text-gray">заявок за месяц</div>
      </div>
      <div class="stat-card">
        <div class="stat-period">Конверсия</div>
        <div class="stat-value">{{ stats.conversion }}%</div>
        <div class="stat-footer text-gray">закрытых заявок</div>
      </div>
    </div>

    <div class="filters-bar">
      <input
        v-model="search"
        type="text"
        class="filter-input filter-search"
        placeholder="Поиск по имени, телефону, email..."
      />
      <select v-model="filterStatus" class="filter-input">
        <option value="">Все статусы</option>
        <option value="новая">Новая</option>
        <option value="в работе">В работе</option>
        <option value="закрыта">Закрыта</option>
      </select>
      <input
        v-model="filterCompany"
        type="text"
        class="filter-input"
        placeholder="Компания..."
      />
      <input
        v-model="filterDateFrom"
        type="date"
        class="filter-input"
        title="Дата от"
      />
      <input
        v-model="filterDateTo"
        type="date"
        class="filter-input"
        title="Дата до"
      />
      <button v-if="hasFilters" class="filter-reset" @click="resetFilters">Сбросить</button>
    </div>

    <div class="table-container">
      <table class="orders-table">
        <thead>
          <tr>
            <th @click="sortBy('id')">ID <span class="sort-icon" :class="{ active: sortKey === 'id' }">{{ sortKey === 'id' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span></th>
            <th @click="sortBy('name')">Имя <span class="sort-icon" :class="{ active: sortKey === 'name' }">{{ sortKey === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span></th>
            <th @click="sortBy('phone')">Телефон <span class="sort-icon" :class="{ active: sortKey === 'phone' }">{{ sortKey === 'phone' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span></th>
            <th @click="sortBy('email')">Email <span class="sort-icon" :class="{ active: sortKey === 'email' }">{{ sortKey === 'email' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span></th>
            <th @click="sortBy('company')">Компания <span class="sort-icon" :class="{ active: sortKey === 'company' }">{{ sortKey === 'company' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span></th>
            <th @click="sortBy('created_at')">Дата <span class="sort-icon" :class="{ active: sortKey === 'created_at' }">{{ sortKey === 'created_at' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span></th>
            <th @click="sortBy('time')">Время <span class="sort-icon" :class="{ active: sortKey === 'time' }">{{ sortKey === 'time' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span></th>
            <th @click="sortBy('message')">Комментарий <span class="sort-icon" :class="{ active: sortKey === 'message' }">{{ sortKey === 'message' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span></th>
            <th @click="sortBy('status')">Статус <span class="sort-icon" :class="{ active: sortKey === 'status' }">{{ sortKey === 'status' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredAndSorted.length === 0">
            <td colspan="10" class="no-results">Ничего не найдено</td>
          </tr>
          <tr v-for="order in filteredAndSorted" :key="order.id">
            <td class="cell-id">{{ order.id }}</td>
            <td>{{ order.name }}</td>
            <td class="cell-phone">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              {{ order.phone }}
            </td>
            <td class="cell-email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              {{ order.email }}
            </td>
            <td>{{ order.company }}</td>
            <td>{{ order.created_at }}</td>
            <td class="cell-time">{{ order.time }}</td>
            <td class="cell-message">{{ order.message || '—' }}</td>
            <td>
              <select v-model="order.status" @change="updateStatus(order)" class="status-select">
                <option value="новая">Новая</option>
                <option value="в работе">В работе</option>
                <option value="закрыта">Закрыта</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const orders = ref([])

async function loadOrders() {
  const res = await fetch('/api/orders')
  orders.value = await res.json()
}

onMounted(loadOrders)

const search = ref('')
const filterStatus = ref('')
const filterCompany = ref('')
const filterDateFrom = ref('')
const filterDateTo = ref('')

const sortKey = ref(null)
const sortOrder = ref('asc')

const hasFilters = computed(() =>
  search.value || filterStatus.value || filterCompany.value || filterDateFrom.value || filterDateTo.value
)

function resetFilters() {
  search.value = ''
  filterStatus.value = ''
  filterCompany.value = ''
  filterDateFrom.value = ''
  filterDateTo.value = ''
}

const parseDate = (str) => {
  if (!str) return new Date(0)
  const [day, month, year] = str.split('.').map(Number)
  return new Date(year, month - 1, day)
}

const today = new Date()
today.setHours(0, 0, 0, 0)

const stats = computed(() => {
  const total = orders.value.length
  const closed = orders.value.filter(o => o.status === 'закрыта').length

  const todayCount = orders.value.filter(o => {
    const d = parseDate(o.created_at)
    return d >= today
  }).length

  const weekAgo = new Date(today)
  weekAgo.setDate(weekAgo.getDate() - 7)
  const weekCount = orders.value.filter(o => parseDate(o.created_at) >= weekAgo).length

  const monthAgo = new Date(today)
  monthAgo.setDate(monthAgo.getDate() - 30)
  const monthCount = orders.value.filter(o => parseDate(o.created_at) >= monthAgo).length

  const conversion = total > 0 ? Math.round((closed / total) * 100) : 0

  return { today: todayCount, week: weekCount, month: monthCount, conversion }
})

const filteredAndSorted = computed(() => {
  let result = orders.value

  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(o =>
      o.name?.toLowerCase().includes(q) ||
      o.phone?.toLowerCase().includes(q) ||
      o.email?.toLowerCase().includes(q)
    )
  }

  if (filterStatus.value) {
    result = result.filter(o => o.status === filterStatus.value)
  }

  if (filterCompany.value) {
    const q = filterCompany.value.toLowerCase()
    result = result.filter(o => o.company?.toLowerCase().includes(q))
  }

  if (filterDateFrom.value) {
    const from = new Date(filterDateFrom.value)
    result = result.filter(o => parseDate(o.created_at) >= from)
  }

  if (filterDateTo.value) {
    const to = new Date(filterDateTo.value)
    result = result.filter(o => parseDate(o.created_at) <= to)
  }

  if (!sortKey.value) return result

  const sorted = [...result].sort((a, b) => {
    let aVal = a[sortKey.value]
    let bVal = b[sortKey.value]

    if (typeof aVal === 'number' && typeof bVal === 'number') return aVal - bVal
    if (sortKey.value === 'created_at') return parseDate(aVal) - parseDate(bVal)
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal, 'ru', { sensitivity: 'base' })
    }
    return 0
  })

  return sortOrder.value === 'asc' ? sorted : sorted.reverse()
})

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

async function updateStatus(order) {
  try {
    const res = await fetch(`/api/orders/${order.id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: order.status })
    })
    if (!res.ok) throw new Error()
  } catch (e) {
    alert('Не удалось обновить статус')
    await loadOrders()
  }
}
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
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

.filters-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filter-input {
  height: 34px;
  padding: 0 12px;
  font-size: 13px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  background-color: #ffffff;
  color: #1a202c;
  transition: border-color 0.15s;
}

.filter-input:focus {
  border-color: #3182ce;
}

.filter-search {
  width: 260px;
}

.filter-reset {
  height: 34px;
  padding: 0 14px;
  font-size: 13px;
  background-color: #edf2f7;
  color: #4a5568;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.15s;
}

.filter-reset:hover {
  background-color: #e2e8f0;
}

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
  cursor: pointer;
  user-select: none;
}

.orders-table th:hover {
  background-color: #f7fafc;
}

.sort-icon {
  display: inline-block;
  margin-left: 4px;
  color: #a0aec0;
  font-size: 11px;
}

.sort-icon.active {
  color: #3182ce;
  font-weight: 700;
}

.orders-table td {
  padding: 14px 8px;
  vertical-align: middle;
}

.cell-id {
  color: #718096;
}

.cell-phone, .cell-email {
  white-space: nowrap;
}

.cell-phone svg, .cell-email svg {
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
  width: 14px;
  height: 14px;
  color: #4a5568;
}

.cell-time {
  color: #718096;
  white-space: nowrap;
}

.orders-table th:last-child {
  text-align: center;
}

.cell-message {
  max-width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #4a5568;
}

.status-select {
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  font-size: 12px;
  background-color: white;
  cursor: pointer;
  outline: none;
}

.status-select:focus {
  border-color: #3182ce;
}

.no-results {
  text-align: center;
  color: #718096;
  padding: 32px;
}
</style>