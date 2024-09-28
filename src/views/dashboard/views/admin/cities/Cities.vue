<template>
    <n-space vertical size="large" class="cities-container">
        <!-- Cabeçalho -->
        <n-card size="large" :title="t('pages.admin.cities.title')">
            <n-space justify="space-between" align="center">
                <!-- Pesquisa -->
                <n-input v-model:value="searchQuery" :placeholder="t('pages.admin.cities.search')" size="medium" clearable>   
                    <template #prefix>
                        <i class="fa fa-search" style="margin-right: 8px;"></i>
                    </template>
                </n-input>
                
                <!-- Botão Criar cidade -->
                <n-button type="primary" size="medium" @click="showRegisterCityModal = true">
                    <i class="fa fa-plus" style="margin-right: 8px;"></i> {{ t('pages.admin.cities.add') }}
                </n-button>
            </n-space>
        </n-card>
        
        <!-- Lista de cidades -->
        <n-spin :show="loadingOn">
            <n-card size="large">
                <n-table :bordered="false" :single-line="false" v-if="paginatedCities.length">
                    <thead>
                        <tr>
                            <th>{{ t('pages.admin.cities.fields.name') }}</th>
                            <th>{{ t('pages.admin.cities.fields.state') }}</th>
                            <th>{{ t('pages.admin.cities.fields.actions') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="city in paginatedCities" :key="city.id">
                            <td>{{ city.nome }}</td>
                            <td>{{ city.estado?.nome }}</td>
                            <td>
                                <n-space justify="space-around">
                                    <n-button text @click="openUpdateCityModal(city)">
                                        <i class="fa fa-pen"></i>
                                    </n-button>
                                    <n-button text @click="openRemoveCityModal(city)">
                                        <i class="fa fa-trash"></i>
                                    </n-button>
                                </n-space>
                            </td>
                        </tr>
                    </tbody>
                </n-table>
                
                <n-empty v-else :description="t('pages.admin.cities.empty')" />
            </n-card>
        </n-spin>
        
        <n-space justify="flex-end">
            <n-pagination
            v-model:page="currentPage"
            :page-size="pageSize"
            :item-count="fetchedCities.length"
            @update:page="handlePageChange"  
            />
        </n-space>
        
        <!-- Modal para criação de cidades -->
        <n-modal
        v-model:show="showRegisterCityModal"
        :title="t('pages.admin.cities.modals.register.title')"
        preset="dialog"
        style="width: 50%"
        :positive-text="t('pages.admin.cities.modals.register.confirm')"
        :negative-text="t('pages.admin.cities.modals.register.cancel')"
        @positive-click="handleRegisterCity"
        @negative-click="showRegisterCityModal = false"
        >
        <n-space vertical>
            <n-input v-model:value="cityToRegister.nome" :placeholder="t('pages.admin.cities.fields.name')" size="medium" />
            <n-select 
                v-model:value="cityToRegister.estado_id" 
                :options="fetchedStates.map(state => ({ label: (state.nome + ' - ' + state.sigla), value: state.id }))" 
                :placeholder="t('pages.admin.cities.fields.state')" 
                size="medium" 
            />
        </n-space>
    </n-modal>
    
    <!-- Modal para atualização de cidades -->
    <n-modal
    v-if="cityToUpdate"
    v-model:show="showUpdateCityModal"
    :title="t('pages.admin.cities.modals.update.title')"
    preset="dialog"
    style="width: 50%"
    :positive-text="t('pages.admin.cities.modals.update.confirm')"
    :negative-text="t('pages.admin.cities.modals.update.cancel')"
    @positive-click="handleUpdateCity"
    @negative-click="showUpdateCityModal = false"
    >
    <n-space vertical>
        <n-input v-model:value="cityToUpdate.nome" :placeholder="t('pages.admin.cities.fields.name')" size="medium" />
        <n-select 
            v-model:value="cityToUpdate.estado_id" 
            :options="fetchedStates.map(state => ({ label: (state.nome + ' - ' + state.sigla), value: state.id }))" 
            :placeholder="t('pages.admin.cities.fields.state')" 
            size="medium"
        />
    </n-space>
</n-modal>

<!-- Modal para remoção de cidades -->
<n-modal
v-model:show="showRemoveCityModal"
:title="t('pages.admin.cities.modals.remove.title')"
:content="t('pages.admin.cities.modals.remove.content', { name: cityToRemove?.name })"
preset="dialog"
style="width: 50%;"
:positive-text="t('pages.admin.cities.modals.remove.confirm')"
:negative-text="t('pages.admin.cities.modals.remove.cancel')"
@positive-click="handleRemoveCity"
@negative-click="showRemoveCityModal = false"
/>
</n-space>
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const { fetchedCities, registerCity, updateCity, removeCity, fetchedStates } = inject('dashboard');

const cityToRegister = ref({
    nome: '',
    estado_id: null,
});
const cityToUpdate = ref(null);
const cityToRemove = ref(null);


const statusOptions = [
{ label: 'Onboarding', value: 'ONBOARDING' },
{ label: 'Admin', value: 'ADMIN' },
{ label: 'Ativo', value: 'ATIVO' },
{ label: 'Inativo', value: 'INATIVO' },
];

const showRegisterCityModal = ref(false);
const showUpdateCityModal = ref(false);
const showRemoveCityModal = ref(false);

const loadingOn = ref(false);

const currentPage = ref(1);
const pageSize = ref(9);

const paginatedCities = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    
    return filteredCities.value.slice(start, end);
});

const searchQuery = ref('');

const filteredCities = computed(() => {
const query = searchQuery.value.toLowerCase().trim();
    
    if (!query) return fetchedCities.value;
    
    return fetchedCities.value.filter(city => {
        const nameMatch = city.nome?.toLowerCase().includes(query);
        const stateMatch = city.estado?.nome?.toLowerCase().includes(query);
        
        return nameMatch || stateMatch;
    });
});

const handlePageChange = (page) => currentPage.value = page;

const handleRegisterCity = async () => {
    showRegisterCityModal.value = false;
    loadingOn.value = true;
    
    try {
        const response = await registerCity(cityToRegister.value);
        
        if (response) {
            cityToRegister.value = {
                cidade: '',
                fator: '',
            };
            
            fetchedCities.value.push(response);
            
            toast('Cidade registrada com sucesso!', {
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
        
        toast('Erro ao registrar cidade! Tente novamente.', {
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
        console.error('>>> Error registering city: ', error);
        toast('Erro ao registrar cidade! Tente novamente.', {
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

const openUpdateCityModal = (city) => {
    cityToUpdate.value = JSON.parse(JSON.stringify(city));
    showUpdateCityModal.value = true;
}

const openRemoveCityModal = (city) => {
    cityToRemove.value = city;
    showRemoveCityModal.value = true;
}

const handleUpdateCity = async () => {
    showUpdateCityModal.value = false;
    loadingOn.value = true;
    
    try {
        const response = await updateCity(cityToUpdate.value);
        
        if (response) {
            toast('Cidade atualizada com sucesso!', {
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
            
            fetchedCities.value = fetchedCities.value.map(city => {
                if (city.id === cityToUpdate.value.id) {
                    return cityToUpdate.value;
                }
                
                return city;
            });
            
            cityToUpdate.value = null;
            currentPage.value = 1;

            return;
        }

        toast('Erro ao atualizar cidade! Tente novamente.', {
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
        console.error('>>> Error updating city: ', error);
        toast('Erro ao atualizar cidade! Tente novamente.', {
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

const handleRemoveCity = async () => {
    showRemoveCityModal.value = false;
    loadingOn.value = true;
    
    try {
        await removeCity(cityToRemove.value.id);
        fetchedCities.value = fetchedCities.value.filter(city => city.id !== cityToRemove.value.id);
        
        toast('Cidade removida com sucesso!', {
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
        
        cityToRemove.value = null;
        currentPage.value = 1;
    } catch (error) {
        console.error('>>> Error removing city: ', error);
        toast('Erro ao remover cidade! Tente novamente.', {
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
.cities-container {
    padding: 16px;
    height: 100%;
    overflow-y: auto;
}
</style>