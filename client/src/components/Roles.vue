<template>
  <div class="roles-page">
    <div class="page-header">
      <h1 class="page-title">Роли и права</h1>
      <button class="add-role-btn" @click="isModalOpen = true" title="Добавить роль">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>Добавить роль</span>
      </button>
    </div>

    <div class="permissions-card">
      <div class="table-container">
        <table class="matrix-table">
          <thead>
            <tr>
              <th class="col-role">Роль</th>
              <th v-for="right in rightsList" :key="right">{{ right }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="role in rolesData" :key="role.name">
              <td class="role-name-cell">{{ role.name }}</td>
              <td v-for="right in rightsList" :key="right">
                <span :class="['status-badge', role.permissions[right] ? 'has-access' : 'no-access']">
                  {{ role.permissions[right] ? 'Есть доступ' : 'Нет доступа' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-window">
        <div class="modal-header">
          <h2 class="modal-title">Создание новой роли</h2>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>

        <form @submit.prevent="handleCreateRole">
          <div class="modal-body">
            <div class="form-group">
              <label for="role-name" class="form-label">Название роли</label>
              <input 
                id="role-name"
                v-model.trim="newRoleName"
                type="text" 
                class="form-input" 
                placeholder="Введите название"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">Выбор доступов</label>
              <div class="checkbox-grid">
                <label v-for="right in rightsList" :key="right" class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="newRolePermissions[right]"
                    class="checkbox-input"
                  />
                  <span class="checkbox-text">{{ right }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Отмена</button>
            <button type="submit" class="btn btn-primary" :disabled="!newRoleName">Создать</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const rightsList = ref([
  'Чтение',
  'Добавление',
  'Изменение',
  'Удаление',
  'Экспорт',
  'Импорт'
])


const rolesData = ref([
  {
    name: 'Администратор',
    permissions: { 'Чтение': true, 'Добавление': true, 'Изменение': true, 'Удаление': true, 'Экспорт': true, 'Импорт': true }
  },
  {
    name: 'Менеджер',
    permissions: { 'Чтение': true, 'Добавление': false, 'Изменение': false, 'Удаление': false, 'Экспорт': false, 'Импорт': false }
  }
])

const isModalOpen = ref(false)
const newRoleName = ref('')
const newRolePermissions = ref(
  rightsList.value.reduce((acc, right) => ({ ...acc, [right]: false }), {})
)

const closeModal = () => {
  isModalOpen.value = false
  newRoleName.value = ''
  rightsList.value.forEach(right => {
    newRolePermissions.value[right] = false
  })
}

const handleCreateRole = () => {
  if (!newRoleName.value) return

  rolesData.value.push({
    name: newRoleName.value,
    permissions: { ...newRolePermissions.value }
  })

  closeModal()
}
</script>

<style scoped>
.roles-page {
  width: 100%;
  font-family: system-ui, -apple-system, sans-serif;
  box-sizing: border-box;
}

/* Шапка страницы */
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

/* Кнопка добавления роли */
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