<template>
  <n-space vertical size="large" class="users-container">
    <!-- Cabeçalho -->
    <n-card size="large" :title="t('pages.admin.users.title')">
      <n-space justify="space-between" align="center">
        <!-- Pesquisa -->
        <n-input v-model:value="searchQuery" :placeholder="t('pages.admin.users.search')" size="medium" clearable>   
          <template #prefix>
            <i class="fa fa-search" style="margin-right: 8px;"></i>
          </template>
        </n-input>

        <!-- Botão Criar Usuário -->
        <n-button type="primary" size="medium" @click="showRegisterUserModal = true">
          <i class="fa fa-plus" style="margin-right: 8px;"></i> {{ t('pages.admin.users.add') }}
        </n-button>
      </n-space>
    </n-card>

    <!-- Lista de Usuários -->
    <n-spin :show="loadingOn">
      <n-card size="large">
        <n-table :bordered="false" :single-line="false" v-if="paginatedUsers.length">
          <thead>
            <tr>
              <th>{{ t('pages.admin.users.fields.name') }}</th>
              <th>{{ t('pages.admin.users.fields.city') }}</th>
              <th>{{ t('pages.admin.users.fields.street') }}</th>
              <th>{{ t('pages.admin.users.fields.number') }}</th>
              <th>{{ t('pages.admin.users.fields.complement') }}</th>
              <th>{{ t('pages.admin.users.fields.type') }}</th>
              <th>{{ t('pages.admin.users.fields.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in paginatedUsers" :key="user.id">
              <td>{{ user.nome }}</td>
              <td>{{ user.cidades?.nome || ' - ' }}</td>
              <td>{{ user.rua }}</td>
              <td>{{ user.numero }}</td>
              <td>{{ user.complemento }}</td>
              <td>{{ user.tipoSanguineo ? (user.tipoSanguineo?.tipo + ': ' + user.tipoSanguineo?.fator) : ' - ' }}</td>
              <td>
                <n-space justify="space-around">
                  <n-button text @click="openUpdateUserModal(user)">
                    <i class="fa fa-pen"></i>
                  </n-button>
                  <n-button text @click="openRemoveUserModal(user)">
                    <i class="fa fa-trash"></i>
                  </n-button>
                </n-space>
              </td>
            </tr>
          </tbody>
        </n-table>

        <n-empty v-else :description="t('pages.admin.users.empty')" />
      </n-card>
    </n-spin>

    <n-space justify="flex-end">
      <n-pagination
      v-model:page="currentPage"
      :page-size="pageSize"
      :item-count="fetchedUsers.length"
      @update:page="handlePageChange"  
      />
    </n-space>

    <!-- Modal para criação de usuários -->
    <n-modal
      v-model:show="showRegisterUserModal"
      :title="t('pages.admin.users.modals.register.title')"
      preset="dialog"
      style="width: 50%"
      :positive-text="t('pages.admin.users.modals.register.confirm')"
      :negative-text="t('pages.admin.users.modals.register.cancel')"
      @positive-click="handleRegisterUser"
      @negative-click="showRegisterUserModal = false"
    >
      <n-space vertical>
        <n-label>{{ t('pages.admin.users.fields.name') }}</n-label>
        <n-input v-model:value="userToRegister.nome" placeholder="Nome" />
        
        <n-label>{{ t('pages.admin.users.fields.rg') }}</n-label>
        <n-input v-model:value="userToRegister.rg" placeholder="RG" />
        
        <n-label>{{ t('pages.admin.users.fields.city') }}</n-label>
        <n-select 
          :placeholder="t('pages.admin.users.fields.city')" 
          allow-clear
          v-model:value="userToRegister.cidade_id" 
          :options="fetchedCities.map(city => ({ label: city.nome, value: city.id }))"
        />        

        <n-label>{{ t('pages.admin.users.fields.street') }}</n-label>
        <n-input v-model:value="userToRegister.rua" placeholder="Rua" />
      
        <n-label>{{ t('pages.admin.users.fields.number') }}</n-label>
        <n-input v-model:value="userToRegister.numero" placeholder="Número" />
        
        <n-label>{{ t('pages.admin.users.fields.complement') }}</n-label>
        <n-input v-model:value="userToRegister.complemento" placeholder="Complemento" />

        <n-label>{{ t('pages.admin.users.fields.type') }}</n-label>
        <n-select 
          :placeholder="t('pages.admin.users.fields.type')" 
          allow-clear
          v-model:value="userToRegister.tipo_id" 
          :options="fetchedTypes.map(type => ({ label: (type.tipo + ': ' + type.fator), value: type.id }))"
        />

      </n-space>
    </n-modal>

    <!-- Modal para atualização de usuários -->
    <n-modal
      v-if="userToUpdate"
      v-model:show="showUpdateUserModal"
      :title="t('pages.admin.users.modals.update.title')"
      preset="dialog"
      style="width: 50%"
      :positive-text="t('pages.admin.users.modals.update.confirm')"
      :negative-text="t('pages.admin.users.modals.update.cancel')"
      @positive-click="handleUpdateUser"
      @negative-click="showUpdateUserModal = false"
    >
      <n-space vertical>
        <n-label>{{ t('pages.admin.users.fields.name') }}</n-label>
        <n-input v-model:value="userToUpdate.nome" placeholder="Nome" />

        <n-label>{{ t('pages.admin.users.fields.rg') }}</n-label>
        <n-input v-model:value="userToUpdate.rg" placeholder="RG" />        
        
        <n-label>{{ t('pages.admin.users.fields.city') }}</n-label>
        <n-select 
          :placeholder="t('pages.admin.users.fields.city')" 
          allow-clear
          v-model:value="userToUpdate.cidade_id" 
          :options="fetchedCities.map(city => ({ label: city.nome, value: city.id }))"
        />

        <n-label>{{ t('pages.admin.users.fields.street') }}</n-label>
        <n-input v-model:value="userToUpdate.rua" placeholder="Rua" />

        <n-label>{{ t('pages.admin.users.fields.number') }}</n-label>
        <n-input v-model:value="userToUpdate.numero" placeholder="Número" />

        <n-label>{{ t('pages.admin.users.fields.complement') }}</n-label>
        <n-input v-model:value="userToUpdate.complemento" placeholder="Complemento" />

        <n-label>{{ t('pages.admin.users.fields.type') }}</n-label>
        <n-select 
          :placeholder="t('pages.admin.users.fields.type')" 
          allow-clear
          v-model:value="userToUpdate.tipo_id" 
          :options="fetchedTypes.map(type => ({ label: (type.tipo + ': ' + type.fator), value: type.id }))"

        />
      </n-space>
    </n-modal>

    <!-- Modal para remoção de usuários -->
    <n-modal
      v-model:show="showRemoveUserModal"
      :title="t('pages.admin.users.modals.remove.title')"
      :content="t('pages.admin.users.modals.remove.content', { name: userToRemove?.name })"
      preset="dialog"
      style="width: 50%;"
      :positive-text="t('pages.admin.users.modals.remove.confirm')"
      :negative-text="t('pages.admin.users.modals.remove.cancel')"
      @positive-click="handleRemoveUser"
      @negative-click="showRemoveUserModal = false"
    />
  </n-space>
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const { fetchedUsers, registerUser, updateUser, removeUser, fetchedTypes, fetchedCities } = inject('dashboard');

const userToRegister = ref({
  name: '',
  rg: '',
  rua: '',
  numero: '',
  complemento: '',
  cidade_id: null,
  tipo_id: null,
});
const userToUpdate = ref(null);
const userToRemove = ref(null);

const showRegisterUserModal = ref(false);
const showUpdateUserModal = ref(false);
const showRemoveUserModal = ref(false);

const loadingOn = ref(false);

const currentPage = ref(1);
const pageSize = ref(9);

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  
  return filteredUsers.value.slice(start, end);
});

const searchQuery = ref('');

const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  
  if (!query) return fetchedUsers.value;

  return fetchedUsers.value.filter(user => {
    const nameMatch = user.name?.toLowerCase().includes(query);
    const emailMatch = user.email?.toLowerCase().includes(query);
    const businessClientMatch = user.business_client?.name?.toLowerCase().includes(query);
    const statusMatch = user.status?.toLowerCase().includes(query);

    return nameMatch || emailMatch || businessClientMatch || statusMatch;
  });
});

const handlePageChange = (page) => currentPage.value = page;

const handleRegisterUser = async () => {
  showRegisterUserModal.value = false;
  loadingOn.value = true;

  try {
    const response = await registerUser(userToRegister.value);
    
    if (response) {
      userToRegister.value = {
        name: '',
        rg: '',
        rua: '',
        numero: '',
        complemento: '',
        cidade_id: null,
        tipo_id: null,
      };
  
      fetchedUsers.value.push(response);
  
      toast('Usuário registrado com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        type: 'success',
        toastStyle: {
          "--toastify-icon-color-success": "#0f5132",
          "--toastify-color-success": "#0f5132",
        },
        progressStyle: {
          "--toastify-progress-bar-color-success": "#0f5132",
        },
      });
      
      return;
    }

    toast('Erro ao registrar usuário! Tente novamente.', {
      position: "top-right",
      autoClose: 5000,
      type: 'error',
      toastStyle: {
        "--toastify-icon-color-error": "#c60d31",
        "--toastify-color-error": "#c60d31",
      },
      progressStyle: {
        "--toastify-progress-bar-color-error": "#c60d31",
      },
    });
  } catch (error) {
    console.error('>>> Error registering user: ', error);
    toast('Erro ao registrar usuário! Tente novamente.', {
      position: "top-right",
      autoClose: 5000,
      type: 'error',
      toastStyle: {
        "--toastify-icon-color-error": "#c60d31",
        "--toastify-color-error": "#c60d31",
      },
      progressStyle: {
        "--toastify-progress-bar-color-error": "#c60d31",
      },
    });
  } finally {
    loadingOn.value = false;
  }
}

const openUpdateUserModal = (user) => {
  userToUpdate.value = JSON.parse(JSON.stringify(user));
  showUpdateUserModal.value = true;
}

const openRemoveUserModal = (user) => {
  userToRemove.value = user;
  showRemoveUserModal.value = true;
}

const handleUpdateUser = async () => {
  showUpdateUserModal.value = false;
  loadingOn.value = true;

  try {
    await updateUser(userToUpdate.value);

    toast('Usuário atualizado com sucesso!', {
      position: "top-right",
      autoClose: 5000,
      type: 'success',
      toastStyle: {
        "--toastify-icon-color-success": "#0f5132",
        "--toastify-color-success": "#0f5132",
      },
      progressStyle: {
        "--toastify-progress-bar-color-success": "#0f5132",
      },
    });

    fetchedUsers.value = fetchedUsers.value.map(user => {
      if (user.id === userToUpdate.value.id) {
        return userToUpdate.value;
      }

      return user;
    });

    userToUpdate.value = null;
    currentPage.value = 1;
  } catch (error) {
    console.error('>>> Error updating user: ', error);
    toast('Erro ao atualizar usuário! Tente novamente.', {
      position: "top-right",
      autoClose: 5000,
      type: 'error',
      toastStyle: {
        "--toastify-icon-color-error": "#c60d31",
        "--toastify-color-error": "#c60d31",
      },
      progressStyle: {
        "--toastify-progress-bar-color-error": "#c60d31",
      },
    });
  } finally {
    loadingOn.value = false;
  }
} 

const handleRemoveUser = async () => {
  showRemoveUserModal.value = false;
  loadingOn.value = true;

  try {
    await removeUser(userToRemove.value.id);
    fetchedUsers.value = fetchedUsers.value.filter(user => user.id !== userToRemove.value.id);

    toast('Usuário removido com sucesso!', {
      position: "top-right",
      autoClose: 5000,
      type: 'success',
      toastStyle: {
        "--toastify-icon-color-success": "#0f5132",
        "--toastify-color-success": "#0f5132",
      },
      progressStyle: {
        "--toastify-progress-bar-color-success": "#0f5132",
      },
    });

    userToRemove.value = null;
    currentPage.value = 1;
  } catch (error) {
    console.error('>>> Error removing user: ', error);
    toast('Erro ao remover usuário! Tente novamente.', {
      position: "top-right",
      autoClose: 5000,
      type: 'error',
      toastStyle: {
        "--toastify-icon-color-error": "#c60d31",
        "--toastify-color-error": "#c60d31",
      },
      progressStyle: {
        "--toastify-progress-bar-color-error": "#c60d31",
      },
    });
  } finally {
    loadingOn.value = false;
  }
}
</script>

<style scoped>
.users-container {
  padding: 16px;
  height: 100%;
  overflow-y: auto;
}
</style>