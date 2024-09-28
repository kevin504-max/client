<template>
    <n-space vertical size="large" class="cl-container">
        <!-- Cabeçalho -->
        <n-card size="large" :title="t('pages.admin.collection_locations.title')">
            <n-space justify="space-between" align="center">
                <!-- Pesquisa -->
                <n-input v-model:value="searchQuery" :placeholder="t('pages.admin.collection_locations.search')" size="medium" clearable>   
                    <template #prefix>
                        <i class="fa fa-search" style="margin-right: 8px;"></i>
                    </template>
                </n-input>
                
                <!-- Botão Criar ponto de coleta -->
                <n-button type="primary" size="medium" @click="showRegisterCollectionlocationsModal = true">
                    <i class="fa fa-plus" style="margin-right: 8px;"></i> {{ t('pages.admin.collection_locations.add') }}
                </n-button>
            </n-space>
        </n-card>
        
        <!-- Lista de pontos de coleta -->
        <n-spin :show="loadingOn">
            <n-card size="large">
                <n-table :bordered="false" :single-line="false" v-if="paginatedCollectionLocations.length">
                    <thead>
                        <tr>
                            <th>{{ t('pages.admin.collection_locations.fields.name') }}</th>
                            <th>{{ t('pages.admin.collection_locations.fields.city') }}</th>
                            <th>{{ t('pages.admin.collection_locations.fields.street') }}</th>
                            <th>{{ t('pages.admin.collection_locations.fields.number') }}</th>
                            <th>{{ t('pages.admin.collection_locations.fields.complement') }}</th>
                            <th>{{ t('pages.admin.collection_locations.fields.actions') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cl in paginatedCollectionLocations" :key="cl.id">
                            <td>{{ cl.nome }}</td>
                            <td>{{ cl.cidade?.nome }}</td>
                            <td>{{ cl.rua }}</td>
                            <td>{{ cl.numero }}</td>
                            <td>{{ cl.complemento }}</td>
                            <td>
                                <n-space justify="space-around">
                                    <n-button text @click="openUpdateCollectionLocationsModal(cl)">
                                        <i class="fa fa-pen"></i>
                                    </n-button>
                                    <n-button text @click="openRemoveCollectionLocationsModal(cl)">
                                        <i class="fa fa-trash"></i>
                                    </n-button>
                                </n-space>
                            </td>
                        </tr>
                    </tbody>
                </n-table>
                
                <n-empty v-else :description="t('pages.admin.collection_locations.empty')" />
            </n-card>
        </n-spin>
        
        <n-space justify="flex-end">
            <n-pagination
            v-model:page="currentPage"
            :page-size="pageSize"
            :item-count="fetchedCollectionLocations.length"
            @update:page="handlePageChange"  
            />
        </n-space>
        
        <!-- Modal para criação de pontos de coleta -->
        <n-modal
        v-model:show="showRegisterCollectionlocationsModal"
        :title="t('pages.admin.collection_locations.modals.register.title')"
        preset="dialog"
        style="width: 50%"
        :positive-text="t('pages.admin.collection_locations.modals.register.confirm')"
        :negative-text="t('pages.admin.collection_locations.modals.register.cancel')"
        @positive-click="handleRegisterCollectionLocations"
        @negative-click="showRegisterCollectionlocationsModal = false"
        >
        <n-space vertical>
            <n-input v-model:value="collectionLocationsToRegister.nome" :placeholder="t('pages.admin.collection_locations.fields.name')" size="medium" />
            <n-input v-model:value="collectionLocationsToRegister.rua" :placeholder="t('pages.admin.collection_locations.fields.street')" size="medium" />
            <n-input v-model:value="collectionLocationsToRegister.numero" :placeholder="t('pages.admin.collection_locations.fields.number')" size="medium" />
            <n-input v-model:value="collectionLocationsToRegister.complemento" :placeholder="t('pages.admin.collection_locations.fields.complement')" size="medium" />
            <n-select 
                v-model:value="collectionLocationsToRegister.cidade_id" 
                :placeholder="t('pages.admin.collection_locations.fields.city')" 
                :options="fetchedCities.map(city => ({ label: city.nome, value: city.id }))"
                size="medium" 
            />
        </n-space>
    </n-modal>
    
    <!-- Modal para atualização de pontos de coleta -->
    <n-modal
    v-if="clToUpdate"
    v-model:show="showUpdateCollectionLocationsModal"
    :title="t('pages.admin.collection_locations.modals.update.title')"
    preset="dialog"
    style="width: 50%"
    :positive-text="t('pages.admin.collection_locations.modals.update.confirm')"
    :negative-text="t('pages.admin.collection_locations.modals.update.cancel')"
    @positive-click="handleUpdateCollectionLocations"
    @negative-click="showUpdateCollectionLocationsModal = false"
    >
    <n-space vertical>
        <n-input v-model:value="clToUpdate.nome" :placeholder="t('pages.admin.collection_locations.fields.name')" size="medium" />
        <n-input v-model:value="clToUpdate.rua" :placeholder="t('pages.admin.collection_locations.fields.street')" size="medium" />
        <n-input v-model:value="clToUpdate.numero" :placeholder="t('pages.admin.collection_locations.fields.number')" size="medium" />
        <n-input v-model:value="clToUpdate.complemento" :placeholder="t('pages.admin.collection_locations.fields.complement')" size="medium" />
        <n-select 
            v-model:value="clToUpdate.cidade_id" 
            :placeholder="t('pages.admin.collection_locations.fields.city')" 
            :options="fetchedCities.map(city => ({ label: city.nome, value: city.id }))"
            size="medium" 
        />
    </n-space>
</n-modal>

<!-- Modal para remoção de pontos de coleta -->
<n-modal
v-model:show="showRemoveCLModal"
:title="t('pages.admin.collection_locations.modals.remove.title')"
:content="t('pages.admin.collection_locations.modals.remove.content', { name: clToRemove?.nome })"
preset="dialog"
style="width: 50%;"
:positive-text="t('pages.admin.collection_locations.modals.remove.confirm')"
:negative-text="t('pages.admin.collection_locations.modals.remove.cancel')"
@positive-click="handleRemoveCL"
@negative-click="showRemoveCLModal = false"
/>
</n-space>
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const { fetchedCities, fetchedCollectionLocations, registerCollectionLocation, updateCollectionLocation, removeCollectionLocation } = inject('dashboard');

const collectionLocationsToRegister = ref({
    nome: '',
    rua: '',
    numero: '',
    complemento: '',
    cidade_id: '',
});
const clToUpdate = ref(null);
const clToRemove = ref(null);

const showRegisterCollectionlocationsModal = ref(false);
const showUpdateCollectionLocationsModal = ref(false);
const showRemoveCLModal = ref(false);

const loadingOn = ref(false);

const currentPage = ref(1);
const pageSize = ref(9);

const paginatedCollectionLocations = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    
    return filteredCL.value.slice(start, end);
});

const searchQuery = ref('');

const filteredCL = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    
    if (!query) return fetchedCollectionLocations.value;
    
    return fetchedCollectionLocations.value.filter(cl => {
        const nameMatch = cl.nome?.toLowerCase().includes(query);
        const streetMatch = cl.rua?.toLowerCase().includes(query);
        const complementMatch = cl.complemento?.toLowerCase().includes(query);
        const cityMatch = cl.cidade?.nome?.toLowerCase().includes(query);

        return nameMatch || streetMatch || complementMatch || cityMatch;
    });
});

const handlePageChange = (page) => currentPage.value = page;

const handleRegisterCollectionLocations = async () => {
    showRegisterCollectionlocationsModal.value = false;
    loadingOn.value = true;
    
    try {
        const response = await registerCollectionLocation(collectionLocationsToRegister.value);
        
        if (response) {
            collectionLocationsToRegister.value = {
                cidade: '',
                sigla: '',
            };
            
            fetchedCollectionLocations.value.push(response);
            
            toast('Ponto de Coleta registrado com sucesso!', {
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
        
        toast('Erro ao registrar ponto de coleta! Tente novamente.', {
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
        console.error('>>> Error registering cl: ', error);
        toast('Erro ao registrar ponto de coleta! Tente novamente.', {
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

const openUpdateCollectionLocationsModal = (cl) => {
    clToUpdate.value = JSON.parse(JSON.stringify(cl));
    showUpdateCollectionLocationsModal.value = true;
}

const openRemoveCollectionLocationsModal = (cl) => {
    clToRemove.value = cl;
    showRemoveCLModal.value = true;
}

const handleUpdateCollectionLocations = async () => {
    showUpdateCollectionLocationsModal.value = false;
    loadingOn.value = true;
    
    try {
        const response = await updateCollectionLocation(clToUpdate.value);
        
        if (response) {
            toast('Ponto de Coleta atualizado com sucesso!', {
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
            
            fetchedCollectionLocations.value = fetchedCollectionLocations.value.map(cl => {
                if (cl.id === clToUpdate.value.id) {
                    return clToUpdate.value;
                }
                
                return cl;
            });
            
            clToUpdate.value = null;
            currentPage.value = 1;

            return;
        }

        toast('Erro ao atualizar ponto de coleta! Tente novamente.', {
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
        console.error('>>> Error updating cl: ', error);
        toast('Erro ao atualizar ponto de coleta! Tente novamente.', {
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

const handleRemoveCL = async () => {
    showRemoveCLModal.value = false;
    loadingOn.value = true;
    
    try {
        await removeCollectionLocation(clToRemove.value.id);
        fetchedCollectionLocations.value = fetchedCollectionLocations.value.filter(cl => cl.id !== clToRemove.value.id);
        
        toast('Ponto de coleta removido com sucesso!', {
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
        
        clToRemove.value = null;
        currentPage.value = 1;
    } catch (error) {
        console.error('>>> Error removing cl: ', error);
        toast('Erro ao remover ponto de coleta! Tente novamente.', {
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
.cl-container {
    padding: 16px;
    height: 100%;
    overflow-y: auto;
}
</style>