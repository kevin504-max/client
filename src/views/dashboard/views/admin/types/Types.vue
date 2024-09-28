<template>
    <n-space vertical size="large" class="types-container">
        <!-- Cabeçalho -->
        <n-card size="large" :title="t('pages.admin.types.title')">
            <n-space justify="space-between" align="center">
                <!-- Pesquisa -->
                <n-input v-model:value="searchQuery" :placeholder="t('pages.admin.types.search')" size="medium" clearable>   
                    <template #prefix>
                        <i class="fa fa-search" style="margin-right: 8px;"></i>
                    </template>
                </n-input>
                
                <!-- Botão Criar tipo -->
                <n-button type="primary" size="medium" @click="showRegisterTypeModal = true">
                    <i class="fa fa-plus" style="margin-right: 8px;"></i> {{ t('pages.admin.types.add') }}
                </n-button>
            </n-space>
        </n-card>
        
        <!-- Lista de tipos -->
        <n-spin :show="loadingOn">
            <n-card size="large">
                <n-table :bordered="false" :single-line="false" v-if="paginatedTypes.length">
                    <thead>
                        <tr>
                            <th>{{ t('pages.admin.types.fields.type') }}</th>
                            <th>{{ t('pages.admin.types.fields.factor') }}</th>
                            <th>{{ t('pages.admin.types.fields.actions') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="type in paginatedTypes" :key="type.id">
                            <td>{{ type.tipo }}</td>
                            <td>{{ type.fator }}</td>
                            <td>
                                <n-space justify="space-around">
                                    <n-button text @click="openUpdateTypeModal(type)">
                                        <i class="fa fa-pen"></i>
                                    </n-button>
                                    <n-button text @click="openRemoveTypeModal(type)">
                                        <i class="fa fa-trash"></i>
                                    </n-button>
                                </n-space>
                            </td>
                        </tr>
                    </tbody>
                </n-table>
                
                <n-empty v-else :description="t('pages.admin.types.empty')" />
            </n-card>
        </n-spin>
        
        <n-space justify="flex-end">
            <n-pagination
            v-model:page="currentPage"
            :page-size="pageSize"
            :item-count="fetchedTypes.length"
            @update:page="handlePageChange"  
            />
        </n-space>
        
        <!-- Modal para criação de tipos -->
        <n-modal
        v-model:show="showRegisterTypeModal"
        :title="t('pages.admin.types.modals.register.title')"
        preset="dialog"
        style="width: 50%"
        :positive-text="t('pages.admin.types.modals.register.confirm')"
        :negative-text="t('pages.admin.types.modals.register.cancel')"
        @positive-click="handleRegisterType"
        @negative-click="showRegisterTypeModal = false"
        >
        <n-space vertical>
            <n-input v-model:value="typeToRegister.tipo" :placeholder="t('pages.admin.types.fields.type')" size="medium" />
            <n-input v-model:value="typeToRegister.fator" :placeholder="t('pages.admin.types.fields.factor')" size="medium" />
        </n-space>
    </n-modal>
    
    <!-- Modal para atualização de tipos -->
    <n-modal
    v-if="typeToUpdate"
    v-model:show="showUpdateTypeModal"
    :title="t('pages.admin.types.modals.update.title')"
    preset="dialog"
    style="width: 50%"
    :positive-text="t('pages.admin.types.modals.update.confirm')"
    :negative-text="t('pages.admin.types.modals.update.cancel')"
    @positive-click="handleUpdateType"
    @negative-click="showUpdateTypeModal = false"
    >
    <n-space vertical>
        <n-input v-model:value="typeToUpdate.tipo" :placeholder="t('pages.admin.types.fields.type')" size="medium" />
        <n-input v-model:value="typeToUpdate.fator" :placeholder="t('pages.admin.types.fields.factor')" size="medium" />
    </n-space>
</n-modal>

<!-- Modal para remoção de tipos -->
<n-modal
v-model:show="showRemoveTypeModal"
:title="t('pages.admin.types.modals.remove.title')"
:content="t('pages.admin.types.modals.remove.content', { name: typeToRemove?.tipo })"
preset="dialog"
style="width: 50%;"
:positive-text="t('pages.admin.types.modals.remove.confirm')"
:negative-text="t('pages.admin.types.modals.remove.cancel')"
@positive-click="handleRemoveType"
@negative-click="showRemoveTypeModal = false"
/>
</n-space>
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const { fetchedTypes, registerType, updateType, removeType } = inject('dashboard');

const typeToRegister = ref({
    tipo: '',
    fator: '',
});
const typeToUpdate = ref(null);
const typeToRemove = ref(null);


const statusOptions = [
{ label: 'Onboarding', value: 'ONBOARDING' },
{ label: 'Admin', value: 'ADMIN' },
{ label: 'Ativo', value: 'ATIVO' },
{ label: 'Inativo', value: 'INATIVO' },
];

const showRegisterTypeModal = ref(false);
const showUpdateTypeModal = ref(false);
const showRemoveTypeModal = ref(false);

const loadingOn = ref(false);

const currentPage = ref(1);
const pageSize = ref(9);

const paginatedTypes = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    
    return filteredTypes.value.slice(start, end);
});

const searchQuery = ref('');

const filteredTypes = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    
    if (!query) return fetchedTypes.value;
    
    return fetchedTypes.value.filter(type => {
        const typeMatch = type.tipo?.toLowerCase().includes(query);
        const factorMatch = type.fator?.toLowerCase().includes(query);
        
        return typeMatch || factorMatch;
    });
});

const handlePageChange = (page) => currentPage.value = page;

const handleRegisterType = async () => {
    showRegisterTypeModal.value = false;
    loadingOn.value = true;
    
    try {
        const response = await registerType(typeToRegister.value);
        
        if (response) {
            typeToRegister.value = {
                tipo: '',
                fator: '',
            };
            
            fetchedTypes.value.push(response);
            
            toast('Tipo sanguíneo registrado com sucesso!', {
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
        
        toast('Erro ao registrar tipo! Tente novamente.', {
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
        console.error('>>> Error registering type: ', error);
        toast('Erro ao registrar tipo! Tente novamente.', {
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

const openUpdateTypeModal = (type) => {
    typeToUpdate.value = JSON.parse(JSON.stringify(type));
    showUpdateTypeModal.value = true;
}

const openRemoveTypeModal = (type) => {
    typeToRemove.value = type;
    showRemoveTypeModal.value = true;
}

const handleUpdateType = async () => {
    showUpdateTypeModal.value = false;
    loadingOn.value = true;
    
    try {
        const response = await updateType(typeToUpdate.value);
        
        if (response) {
            toast('Tipo sanguíneo atualizado com sucesso!', {
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
            
            fetchedTypes.value = fetchedTypes.value.map(type => {
                if (type.id === typeToUpdate.value.id) {
                    return typeToUpdate.value;
                }
                
                return type;
            });
            
            typeToUpdate.value = null;
            currentPage.value = 1;

            return;
        }

        toast('Erro ao atualizar tipo! Tente novamente.', {
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
        console.error('>>> Error updating type: ', error);
        toast('Erro ao atualizar tipo! Tente novamente.', {
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

const handleRemoveType = async () => {
    showRemoveTypeModal.value = false;
    loadingOn.value = true;
    
    try {
        await removeType(typeToRemove.value.id);
        fetchedTypes.value = fetchedTypes.value.filter(type => type.id !== typeToRemove.value.id);
        
        toast('Tipo sanguíneo removido com sucesso!', {
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
        
        typeToRemove.value = null;
        currentPage.value = 1;
    } catch (error) {
        console.error('>>> Error removing type: ', error);
        toast('Erro ao remover tipo! Tente novamente.', {
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
.types-container {
    padding: 16px;
    height: 100%;
    overflow-y: auto;
}
</style>