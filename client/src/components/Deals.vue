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
            <th @click="sortBy('order_id')">
              Заявка <span class="sort-icon" :class="{ active: sortKey === 'order_id' }">{{ sortKey === 'order_id' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('title')">
              Название <span class="sort-icon" :class="{ active: sortKey === 'title' }">{{ sortKey === 'title' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('client')">
              Клиент <span class="sort-icon" :class="{ active: sortKey === 'client' }">{{ sortKey === 'client' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('phone')">
              Телефон <span class="sort-icon" :class="{ active: sortKey === 'phone' }">{{ sortKey === 'phone' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
            <th @click="sortBy('email')">
              Email <span class="sort-icon" :class="{ active: sortKey === 'email' }">{{ sortKey === 'email' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
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
          <tr v-if="deals.length === 0">
            <td colspan="12" class="no-results">Нет сделок</td>
          </tr>
          <tr v-for="deal in sortedDeals" :key="deal.id">
            <td class="cell-id">{{ deal.id }}</td>
            <td class="cell-order-id">
              <span v-if="deal.order_id" class="order-link">#{{ deal.order_id }}</span>
              <span v-else class="text-gray">—</span>
            </td>
            <td class="cell-title">{{ deal.title }}</td>
            <td>{{ deal.client }}</td>
            <td class="cell-phone">{{ deal.phone }}</td>
            <td class="cell-email">{{ deal.email }}</td>
            <td class="cell-amount">{{ deal.amount || 0 }} ₽</td>
            <td>
              <span :class="['status-badge', deal.status === 'Завершена' ? 'status-closed' : 'status-active']">
                {{ deal.status }}
              </span>
            </td>
            <td>
              <span :class="['stage-badge', 
                deal.stage === 'Новая' ? 'stage-new' : 
                deal.stage === 'В работе' ? 'stage-work' : 
                'stage-closed']">
                {{ deal.stage }}
              </span>
            </td>
            <td>{{ deal.manager }}</td>
            <td class="cell-date">{{ deal.created_at }}</td>
            <td class="cell-date">{{ deal.closed_at || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const deals = ref([])

onMounted(async () => {
  const res = await fetch('/api/deals')
  deals.value = await res.json()
})

const sortKey = ref(null)
const sortOrder = ref('asc')

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const parseDate = (str) => {
  if (!str) return new Date(0)
  const [day, month, year] = str.split('.').map(Number)
  return new Date(year, month - 1, day)
}

const sortedDeals = computed(() => {
  if (!sortKey.value) return deals.value

  const sorted = [...deals.value].sort((a, b) => {
    let aVal = a[sortKey.value]
    let bVal = b[sortKey.value]

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return aVal - bVal
    }

    if (sortKey.value === 'created_at' || sortKey.value === 'closed_at') {
      return parseDate(aVal) - parseDate(bVal)
    }

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
.deals-table th:nth-child(2) { width: 60px; }
.deals-table th:nth-child(3) { width: 180px; }
.deals-table th:nth-child(4) { width: 100px; }
.deals-table th:nth-child(5) { width: 150px; }
.deals-table th:nth-child(6) { width: 150px; }
.deals-table th:nth-child(7) { width: 90px; }
.deals-table th:nth-child(8) { width: 100px; }
.deals-table th:nth-child(9) { width: 100px; }
.deals-table th:nth-child(10) { width: 130px; }
.deals-table th:nth-child(11) { width: 110px; }
.deals-table th:nth-child(12) { width: 110px; }

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

.cell-order-id {
  text-align: center;
}

.order-link {
  display: inline-block;
  background-color: #ebf8ff;
  color: #2b6cb0;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 12px;
}

.text-gray {
  color: #718096;
}

.cell-phone, .cell-email {
  font-size: 12px;
}

.cell-amount {
  font-weight: 600;
}

.status-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-active {
  background-color: #ebf8ff;
  color: #2b6cb0;
}

.status-closed {
  background-color: #f0fff4;
  color: #276749;
}

.stage-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.stage-new {
  background-color: #fefce8;
  color: #92400e;
}

.stage-work {
  background-color: #fef3c7;
  color: #92400e;
}

.stage-closed {
  background-color: #f0fff4;
  color: #276749;
}

.cell-date {
  color: #718096;
  font-size: 12px;
}

.no-results {
  text-align: center;
  color: #718096;
  padding: 32px;
}
</style>