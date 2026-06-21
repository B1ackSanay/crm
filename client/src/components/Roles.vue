<template>
  <div class="roles-page">
    <div class="page-header">
      <h1 class="page-title">Роли и права</h1>
      <button class="add-role-btn" @click="openCreateModal" title="Добавить роль">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>Добавить роль</span>
      </button>
    </div>

    <div class="permissions-card">
      <p v-if="isLoading">Загрузка...</p>
      <p v-else-if="loadError">{{ loadError }}</p>
      <div v-else class="table-container">
        <table class="matrix-table">
          <thead>
            <tr>
              <th class="col-role">Роль</th>
              <th v-for="page in pagesList" :key="page">{{ page }}</th>
              <th class="col-actions"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="role in rolesData" :key="role.key">
              <td class="role-name-cell">{{ role.name }}</td>
              <td v-for="page in pagesList" :key="page">
                <span :class="['status-badge', role.permissions[page] ? 'has-access' : 'no-access']">
                  {{ role.permissions[page] ? 'Есть доступ' : 'Нет доступа' }}
                </span>
              </td>
              <td class="col-actions">
                <div class="role-actions">
                  <button class="menu-trigger" @click.stop="toggleMenu(role.key)">⋮</button>
                  <div v-if="openMenuKey === role.key" class="dropdown-menu" @click.stop>
                    <button class="dropdown-item" @click="openEditModal(role)">Изменить</button>
                    <button class="dropdown-item dropdown-item-danger" @click="handleDeleteRole(role.key)">Удалить</button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-window">
        <div class="modal-header">
          <h2 class="modal-title">{{ editingKey ? 'Редактирование роли' : 'Создание новой роли' }}</h2>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>

        <form @submit.prevent="handleSubmitRole">
          <div class="modal-body">
            <div class="form-group">
              <label for="role-label" class="form-label">Название роли</label>
              <input
                id="role-label"
                v-model.trim="formLabel"
                type="text"
                class="form-input"
                placeholder="Например: Менеджер по продажам"
                required
              />
            </div>

            <div class="form-group">
              <label for="role-key" class="form-label">Название в коде</label>
              <input
                id="role-key"
                v-model="formKey"
                type="text"
                class="form-input"
                placeholder="sales_manager"
                :disabled="!!editingKey"
                @input="formKey = formKey.toLowerCase().replace(/[^a-z0-9_]/g, '')"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">Доступные страницы</label>
              <div class="checkbox-grid">
                <label v-for="page in pagesList" :key="page" class="checkbox-label">
                  <input type="checkbox" v-model="formPages[page]" class="checkbox-input" />
                  <span class="checkbox-text">{{ page }}</span>
                </label>
              </div>
            </div>

            <p v-if="formError" class="form-error">{{ formError }}</p>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Отмена</button>
            <button type="submit" class="btn btn-primary" :disabled="!formLabel || !formKey">
              {{ editingKey ? 'Сохранить' : 'Создать' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const pagesList = ref([])
const rolesData = ref([])
const isLoading = ref(true)
const loadError = ref('')

const isModalOpen = ref(false)
const editingKey = ref(null)
const formLabel = ref('')
const formKey = ref('')
const formPages = ref({})
const formError = ref('')

const openMenuKey = ref(null)

function buildRolesData(rolesObj) {
  return Object.entries(rolesObj).map(([key, role]) => ({
    key,
    name: role.label,
    permissions: pagesList.value.reduce((acc, page) => {
      acc[page] = (role.pages || []).includes(page)
      return acc
    }, {})
  }))
}

async function loadRoles() {
  isLoading.value = true
  loadError.value = ''
  try {
    const res = await fetch('/api/roles')
    if (!res.ok) throw new Error()
    const data = await res.json()

    pagesList.value = data.pages
    rolesData.value = buildRolesData(data.roles)
  } catch (e) {
    loadError.value = 'Не удалось загрузить роли.'
  } finally {
    isLoading.value = false
  }
}

function resetForm() {
  formLabel.value = ''
  formKey.value = ''
  formPages.value = pagesList.value.reduce((acc, page) => ({ ...acc, [page]: false }), {})
  formError.value = ''
}

function openCreateModal() {
  editingKey.value = null
  resetForm()
  isModalOpen.value = true
}

function openEditModal(role) {
  editingKey.value = role.key
  formLabel.value = role.name
  formKey.value = role.key
  formPages.value = pagesList.value.reduce((acc, page) => ({ ...acc, [page]: role.permissions[page] }), {})
  formError.value = ''
  isModalOpen.value = true
  openMenuKey.value = null
}

function closeModal() {
  isModalOpen.value = false
  editingKey.value = null
  resetForm()
}

async function handleSubmitRole() {
  formError.value = ''

  const selectedPages = pagesList.value.filter(page => formPages.value[page])
  const payload = { label: formLabel.value, key: formKey.value, pages: selectedPages }

  try {
    const url = editingKey.value ? `/api/roles/${editingKey.value}` : '/api/roles'
    const method = editingKey.value ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    if (!res.ok) {
      formError.value = data.error || 'Не удалось сохранить роль'
      return
    }

    pagesList.value = data.pages
    rolesData.value = buildRolesData(data.roles)
    closeModal()
  } catch (e) {
    formError.value = 'Не удалось подключиться к серверу'
  }
}

function toggleMenu(key) {
  openMenuKey.value = openMenuKey.value === key ? null : key
}

async function handleDeleteRole(key) {
  openMenuKey.value = null
  if (!confirm('Удалить роль?')) return

  try {
    const res = await fetch(`/api/roles/${key}`, { method: 'DELETE' })
    const data = await res.json()

    if (!res.ok) {
      alert(data.error || 'Не удалось удалить роль')
      return
    }

    pagesList.value = data.pages
    rolesData.value = buildRolesData(data.roles)
  } catch (e) {
    alert('Не удалось подключиться к серверу')
  }
}

function handleOutsideClick() {
  openMenuKey.value = null
}

onMounted(() => {
  loadRoles()
  window.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  window.removeEventListener('click', handleOutsideClick)
})
</script>

<style scoped>
.roles-page {
  width: 100%;
  font-family: system-ui, -apple-system, sans-serif;
  box-sizing: border-box;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 26px;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}

.add-role-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #007ecc;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-role-btn:hover {
  background-color: #0066a3;
}

.add-role-btn svg {
  width: 16px;
  height: 16px;
}

.permissions-card {
  overflow-y: hidden;
  background-color: #ebf8ff;
  border-radius: 12px;
  padding: 32px;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

.matrix-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;
}

.matrix-table th {
  font-weight: 600;
  color: #1a202c;
  padding: 16px 12px;
  border-bottom: 1px solid rgba(0, 126, 204, 0.15);
}

.matrix-table th.col-role {
  width: 200px;
}

.col-actions {
  width: 40px;
  text-align: right;
}

.matrix-table td {
  padding: 20px 12px;
  vertical-align: middle;
}

.matrix-table tbody tr:not(:last-child) td {
  border-bottom: 1px solid rgba(0, 126, 204, 0.08);
}

.role-name-cell {
  font-weight: 600;
  color: #1a202c;
}

.status-badge {
  display: inline-block;
  font-weight: 500;
}

.has-access {
  color: #1a202c;
}

.no-access {
  color: #718096;
}

.role-actions {
  position: relative;
  display: inline-block;
}

.menu-trigger {
  background: none;
  border: none;
  font-size: 18px;
  line-height: 1;
  color: #718096;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
}

.menu-trigger:hover {
  background-color: #edf2f7;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 140px;
  z-index: 10;
  overflow: hidden;
}

.dropdown-item {
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 10px 14px;
  font-size: 13px;
  color: #1a202c;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f7fafc;
}

.dropdown-item-danger {
  color: #e53e3e;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(26, 32, 44, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-window {
  background-color: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  animation: modalFadeIn 0.2s ease-out;
}

@keyframes modalFadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #edf2f7;
}

.modal-title {
  font-size: 18px;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #a0aec0;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.close-btn:hover {
  color: #4a5568;
}

.modal-body {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  color: #1a202c;
  outline: none;
}

.form-input:focus {
  border-color: #007ecc;
  box-shadow: 0 0 0 3px rgba(0, 126, 204, 0.15);
}

.form-input:disabled {
  background-color: #f7fafc;
  color: #a0aec0;
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  background-color: #f7fafc;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #edf2f7;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.checkbox-input {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #007ecc;
}

.checkbox-text {
  font-size: 13px;
  color: #2d3748;
}

.form-error {
  color: #e53e3e;
  font-size: 13px;
  margin-top: 8px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  background-color: #f7fafc;
  border-top: 1px solid #edf2f7;
}

.btn {
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  transition: background-color 0.15s ease;
}

.btn-secondary {
  background-color: #e2e8f0;
  color: #4a5568;
}

.btn-secondary:hover {
  background-color: #cbd5e0;
}

.btn-primary {
  background-color: #007ecc;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #0066a3;
}

.btn-primary:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}
</style>