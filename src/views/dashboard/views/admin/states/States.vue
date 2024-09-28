<template>
    <n-space vertical size="large" class="states-container">
        <!-- Cabeçalho -->
        <n-card size="large" :title="t('pages.admin.states.title')">
            <n-space justify="space-between" align="center">
                <!-- Pesquisa -->
                <n-input v-model:value="searchQuery" :placeholder="t('pages.admin.states.search')" size="medium" clearable>   
                    <template #prefix>
                        <i class="fa fa-search" style="margin-right: 8px;"></i>
                    </template>
                </n-input>
                
                <!-- Botão Criar estado -->
                <n-button type="primary" size="medium" @click="showRegisterStatesModal = true">
                    <i class="fa fa-plus" style="margin-right: 8px;"></i> {{ t('pages.admin.states.add') }}
                </n-button>
            </n-space>
        </n-card>
        
        <!-- Lista de estados -->
        <n-spin :show="loadingOn">
            <n-card size="large">
                <n-table :bordered="false" :single-line="false" v-if="paginatedStates.length">
                    <thead>
                        <tr>
                            <th>{{ t('pages.admin.states.fields.name') }}</th>
                            <th>{{ t('pages.admin.states.fields.initials') }}</th>
                            <th>{{ t('pages.admin.states.fields.actions') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="state in paginatedStates" :key="state.id">
                            <td>{{ state.nome }}</td>
                            <td>{{ state.sigla }}</td>
                            <td>
                                <n-space justify="space-around">
                                    <n-button text @click="openUpdateStatesModal(state)">
                                        <i class="fa fa-pen"></i>
                                    </n-button>
                                    <n-button text @click="openRemoveStatesModal(state)">
                                        <i class="fa fa-trash"></i>
                                    </n-button>
                                </n-space>
                            </td>
                        </tr>
                    </tbody>
                </n-table>
                
                <n-empty v-else :description="t('pages.admin.states.empty')" />
            </n-card>
        </n-spin>
        
        <n-space justify="flex-end">
            <n-pagination
            v-model:page="currentPage"
            :page-size="pageSize"
            :item-count="fetchedStates.length"
            @update:page="handlePageChange"  
            />
        </n-space>
        
        <!-- Modal para criação de estados -->
        <n-modal
        v-model:show="showRegisterStatesModal"
        :title="t('pages.admin.states.modals.register.title')"
        preset="dialog"
        style="width: 50%"
        :positive-text="t('pages.admin.states.modals.register.confirm')"
        :negative-text="t('pages.admin.states.modals.register.cancel')"
        @positive-click="handleRegisterState"
        @negative-click="showRegisterStatesModal = false"
        >
        <n-space vertical>
            <n-input v-model:value="stateToRegister.nome" :placeholder="t('pages.admin.states.fields.name')" size="medium" />
            <n-input v-model:value="stateToRegister.sigla" :placeholder="t('pages.admin.states.fields.initials')" size="medium" />
        </n-space>
    </n-modal>
    
    <!-- Modal para atualização de estados -->
    <n-modal
    v-if="stateToUpdate"
    v-model:show="showUpdateStateModal"
    :title="t('pages.admin.states.modals.update.title')"
    preset="dialog"
    style="width: 50%"
    :positive-text="t('pages.admin.states.modals.update.confirm')"
    :negative-text="t('pages.admin.states.modals.update.cancel')"
    @positive-click="handleUpdateState"
    @negative-click="showUpdateStateModal = false"
    >
    <n-space vertical>
        <n-input v-model:value="stateToUpdate.nome" :placeholder="t('pages.admin.states.fields.name')" size="medium" />
        <n-input v-model:value="stateToUpdate.sigla" :placeholder="t('pages.admin.states.fields.initials')" size="medium" />
    </n-space>
</n-modal>

<!-- Modal para remoção de estados -->
<n-modal
v-model:show="showRemoveStateModal"
:title="t('pages.admin.states.modals.remove.title')"
:content="t('pages.admin.states.modals.remove.content', { name: stateToRemove?.nome })"
preset="dialog"
style="width: 50%;"
:positive-text="t('pages.admin.states.modals.remove.confirm')"
:negative-text="t('pages.admin.states.modals.remove.cancel')"
@positive-click="handleRemoveState"
@negative-click="showRemoveStateModal = false"
/>
</n-space>
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const { fetchedStates, registerState, updateState, removeState } = inject('dashboard');

const stateToRegister = ref({
    cidade: '',
    sigla: '',
});
const stateToUpdate = ref(null);
const stateToRemove = ref(null);

const showRegisterStatesModal = ref(false);
const showUpdateStateModal = ref(false);
const showRemoveStateModal = ref(false);

const loadingOn = ref(false);

const currentPage = ref(1);
const pageSize = ref(9);

const paginatedStates = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    
    return filteredCities.value.slice(start, end);
});

const searchQuery = ref('');

const filteredCities = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    
    if (!query) return fetchedStates.value;
    
    return fetchedStates.value.filter(state => {
        const nameMatch = state.nome?.toLowerCase().includes(query);
        const initialsMatch = state.sigla?.toLowerCase().includes(query);
        
        return nameMatch || initialsMatch;
    });
});

const handlePageChange = (page) => currentPage.value = page;

const handleRegisterState = async () => {
    showRegisterStatesModal.value = false;
    loadingOn.value = true;
    
    try {
        const response = await registerState(stateToRegister.value);
        
        if (response) {
            stateToRegister.value = {
                cidade: '',
                sigla: '',
            };
            
            fetchedStates.value.push(response);
            
            toast('Estado registrado com sucesso!', {
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
        
        toast('Erro ao registrar estado! Tente novamente.', {
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
        console.error('>>> Error registering state: ', error);
        toast('Erro ao registrar estado! Tente novamente.', {
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

const openUpdateStatesModal = (state) => {
    stateToUpdate.value = JSON.parse(JSON.stringify(state));
    showUpdateStateModal.value = true;
}

const openRemoveStatesModal = (state) => {
    stateToRemove.value = state;
    showRemoveStateModal.value = true;
}

const handleUpdateState = async () => {
    showUpdateStateModal.value = false;
    loadingOn.value = true;
    
    try {
        const response = await updateState(stateToUpdate.value);
        
        if (response) {
            toast('Estado atualizado com sucesso!', {
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
            
            fetchedStates.value = fetchedStates.value.map(state => {
                if (state.id === stateToUpdate.value.id) {
                    return stateToUpdate.value;
                }
                
                return state;
            });
            
            stateToUpdate.value = null;
            currentPage.value = 1;

            return;
        }

        toast('Erro ao atualizar estado! Tente novamente.', {
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
        console.error('>>> Error updating state: ', error);
        toast('Erro ao atualizar estado! Tente novamente.', {
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

const handleRemoveState = async () => {
    showRemoveStateModal.value = false;
    loadingOn.value = true;
    
    try {
        await removeState(stateToRemove.value.id);
        fetchedStates.value = fetchedStates.value.filter(state => state.id !== stateToRemove.value.id);
        
        toast('Estado removido com sucesso!', {
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
        
        stateToRemove.value = null;
        currentPage.value = 1;
    } catch (error) {
        console.error('>>> Error removing state: ', error);
        toast('Erro ao remover estado! Tente novamente.', {
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
.states-container {
    padding: 16px;
    height: 100%;
    overflow-y: auto;
}
</style>