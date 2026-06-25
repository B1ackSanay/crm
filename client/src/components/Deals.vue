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
            <th @click="sortBy('created_at')">
              Дата создания <span class="sort-icon" :class="{ active: sortKey === 'created_at' }">{{ sortKey === 'created_at' ? (sortOrder === 'asc' ? '↑' : '↓') : '↓' }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="deals.length === 0">
            <td colspan="8" class="no-results">Нет сделок</td>
          </tr>
          <tr v-for="deal in sortedDeals" :key="deal.id">
            <td class="cell-id">{{ deal.id }}</td>
            <td class="cell-title">{{ deal.title }}</td>
            <td>{{ deal.client }}</td>
            <td class="cell-phone">{{ deal.phone }}</td>
            <td class="cell-email">{{ deal.email }}</td>
            <td class="cell-amount">
              <input 
                v-model="deal.amount" 
                @change="updateAmount(deal)"
                type="number"
                min="0"
                step="1000"
                class="amount-input"
              />
              <span class="currency">₽</span>
            </td>
            <td>
              <span :class="['status-badge', deal.status === 'Завершена' ? 'status-closed' : 'status-active']">
                {{ deal.status }}
              </span>
            </td>
            <td class="cell-date">{{ deal.created_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const deals = ref([])

async function loadDeals() {
  const res = await fetch('/api/deals')
  deals.value = await res.json()
}

onMounted(loadDeals)

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

    if (sortKey.value === 'created_at') {
      return parseDate(aVal) - parseDate(bVal)
    }

    return String(aVal).localeCompare(String(bVal), 'ru', { sensitivity: 'base' })
  })

  return sortOrder.value === 'asc' ? sorted : sorted.reverse()
})

async function updateAmount(deal) {
  try {
    const res = await fetch(`/api/deals/${deal.id}/amount`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: deal.amount })
    })
    if (!res.ok) throw new Error()
  } catch (e) {
    alert('Не удалось обновить сумму')
    await loadDeals()
  }
}
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
.deals-table th:nth-child(2) { width: 180px; }
.deals-table th:nth-child(3) { width: 120px; }
.deals-table th:nth-child(4) { width: 150px; }
.deals-table th:nth-child(5) { width: 170px; }
.deals-table th:nth-child(6) { width: 130px; }
.deals-table th:nth-child(7) { width: 100px; }
.deals-table th:nth-child(8) { width: 120px; }

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

.cell-phone, .cell-email {
  font-size: 12px;
}

.cell-amount {
  display: flex;
  align-items: center;
  gap: 4px;
}

.amount-input {
  width: 100px;
  padding: 4px 8px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  background-color: white;
  transition: border-color 0.15s;
}

.amount-input:focus {
  border-color: #3182ce;
}

.currency {
  color: #718096;
  font-weight: 500;
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