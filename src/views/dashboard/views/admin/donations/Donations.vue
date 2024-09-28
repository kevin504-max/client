<template>
    <n-space vertical size="large" class="donations-container">
        <!-- Cabeçalho -->
        <n-card size="large" :title="t('pages.admin.donations.title')">
            <n-space justify="space-between" align="center">
                <!-- Pesquisa -->
                <n-input v-model:value="searchQuery" :placeholder="t('pages.admin.donations.search')" size="medium" clearable>   
                    <template #prefix>
                        <i class="fa fa-search" style="margin-right: 8px;"></i>
                    </template>
                </n-input>
                
                <!-- Botão Criar Doação -->
                <n-button type="primary" size="medium" @click="showRegisterDonationModal = true">
                    <i class="fa fa-plus" style="margin-right: 8px;"></i> {{ t('pages.admin.donations.add') }}
                </n-button>
            </n-space>
        </n-card>
        
        <!-- Lista de doações -->
        <n-spin :show="loadingOn">
            <n-card size="large">
                <n-table :bordered="false" :single-line="false" v-if="paginatedDonations.length">
                    <thead>
                        <tr>
                            <th>{{ t('pages.admin.donations.fields.user') }}</th>
                            <th>{{ t('pages.admin.donations.fields.collection_location') }}</th>
                            <th>{{ t('pages.admin.donations.fields.date') }}</th>
                            <th>{{ t('pages.admin.donations.fields.actions') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="donation in paginatedDonations" :key="donation.id">
                            <td>{{ donation.pessoa?.nome }}</td>
                            <td>{{ donation.localColeta?.nome }}</td>
                            <td>{{ new Date(donation.data).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' }) }}</td>
                            <td>
                                <n-space justify="space-around">
                                    <n-button text @click="openUpdateDonationModal(donation)">
                                        <i class="fa fa-pen"></i>
                                    </n-button>
                                    <n-button text @click="openRemoveDonationModal(donation)">
                                        <i class="fa fa-trash"></i>
                                    </n-button>
                                </n-space>
                            </td>
                        </tr>
                    </tbody>
                </n-table>
                
                <n-empty v-else :description="t('pages.admin.donations.empty')" />
            </n-card>
        </n-spin>
        
        <n-space justify="flex-end">
            <n-pagination
            v-model:page="currentPage"
            :page-size="pageSize"
            :item-count="fetchedDonations.length"
            @update:page="handlePageChange"  
            />
        </n-space>
        
        <!-- Modal para criação de doações -->
        <n-modal
        v-model:show="showRegisterDonationModal"
        :title="t('pages.admin.donations.modals.register.title')"
        preset="dialog"
        style="width: 50%"
        :positive-text="t('pages.admin.donations.modals.register.confirm')"
        :negative-text="t('pages.admin.donations.modals.register.cancel')"
        @positive-click="handleRegisterDonation"
        @negative-click="showRegisterDonationModal = false"
        >
        <n-space vertical>
            <n-select 
                v-model:value="donationToRegister.pessoa_id" 
                :options="fetchedUsers.map(user => ({ label: user.nome, value: user.id }))" 
                :placeholder="t('pages.admin.donations.fields.user')" 
                size="medium"
            />
            <n-select 
                v-model:value="donationToRegister.local_id" 
                :options="fetchedCollectionLocations.map(cl => ({ label: cl.nome, value: cl.id }))" 
                :placeholder="t('pages.admin.donations.fields.collection_location')" 
                size="medium"
            />
            <n-input type="date" v-model:value="donationToRegister.data" :placeholder="t('pages.admin.donations.fields.date')" size="medium" />
        </n-space>
    </n-modal>
    
    <!-- Modal para atualização de doações -->
    <n-modal
    v-if="donationToUpdate"
    v-model:show="showUpdateDonationModal"
    :title="t('pages.admin.donations.modals.update.title')"
    preset="dialog"
    style="width: 50%"
    :positive-text="t('pages.admin.donations.modals.update.confirm')"
    :negative-text="t('pages.admin.donations.modals.update.cancel')"
    @positive-click="handleUpdateDonation"
    @negative-click="showUpdateDonationModal = false"
    >
    <n-space vertical>
        <n-select 
            v-model:value="donationToUpdate.pessoa_id" 
            :options="fetchedUsers.map(user => ({ label: user.nome, value: user.id }))" 
            :placeholder="t('pages.admin.donations.fields.user')" 
            size="medium"
        />
        <n-select 
            v-model:value="donationToUpdate.local_id" 
            :options="fetchedCollectionLocations.map(cl => ({ label: cl.nome, value: cl.id }))" 
            :placeholder="t('pages.admin.donations.fields.collection_location')" 
            size="medium"
        />
        <n-input type="date" v-model:value="donationToUpdate.data" :placeholder="t('pages.admin.donations.fields.date')" size="medium"  format="dd/MM/yyyy" />        
    </n-space>
</n-modal>

<!-- Modal para remoção de doações -->
<n-modal
v-model:show="showRemoveDonationModal"
:title="t('pages.admin.donations.modals.remove.title')"
:content="t('pages.admin.donations.modals.remove.content', { name: donationToRemove?.name })"
preset="dialog"
style="width: 50%;"
:positive-text="t('pages.admin.donations.modals.remove.confirm')"
:negative-text="t('pages.admin.donations.modals.remove.cancel')"
@positive-click="handleRemoveDonation"
@negative-click="showRemoveDonationModal = false"
/>
</n-space>
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const { fetchedDonations, registerDonation, updateDonation, removeDonation, fetchedUsers, fetchedCollectionLocations } = inject('dashboard');

const donationToRegister = ref({
    pessoa_id: null,
    local_id: null,
    data: new Date().toISOString().split('T')[0],
});
const donationToUpdate = ref(null);
const donationToRemove = ref(null);


const statusOptions = [
{ label: 'Onboarding', value: 'ONBOARDING' },
{ label: 'Admin', value: 'ADMIN' },
{ label: 'Ativo', value: 'ATIVO' },
{ label: 'Inativo', value: 'INATIVO' },
];

const showRegisterDonationModal = ref(false);
const showUpdateDonationModal = ref(false);
const showRemoveDonationModal = ref(false);

const loadingOn = ref(false);

const currentPage = ref(1);
const pageSize = ref(9);

const paginatedDonations = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    
    return filteredDonations.value.slice(start, end);
});

const searchQuery = ref('');

const filteredDonations = computed(() => {
const query = searchQuery.value.toLowerCase().trim();
    
    if (!query) return fetchedDonations.value;
    
    return fetchedDonations.value.filter(donation => {
        const nameMatch = donation.nome?.toLowerCase().includes(query);
        const stateMatch = donation.estado?.nome?.toLowerCase().includes(query);
        
        return nameMatch || stateMatch;
    });
});

const handlePageChange = (page) => currentPage.value = page;

const handleRegisterDonation = async () => {
    showRegisterDonationModal.value = false;
    loadingOn.value = true;
    
    try {
        const response = await registerDonation(donationToRegister.value);
        
        if (response) {
            donationToRegister.value = {
                pessoa_id: null,
                local_id: null,
                data: new Date().toISOString().split('T')[0],
            };
            
            fetchedDonations.value.push(response);
            
            toast('Doação registrada com sucesso!', {
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
        
        toast('Erro ao registrar doação! Tente novamente.', {
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
        console.error('>>> Error registering donation: ', error);
        toast('Erro ao registrar doação! Tente novamente.', {
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

const openUpdateDonationModal = (donation) => {
    donationToUpdate.value = JSON.parse(JSON.stringify(donation));
    showUpdateDonationModal.value = true;
}

const openRemoveDonationModal = (donation) => {
    donationToRemove.value = donation;
    showRemoveDonationModal.value = true;
}

const handleUpdateDonation = async () => {
    showUpdateDonationModal.value = false;
    loadingOn.value = true;
    
    try {
        const response = await updateDonation(donationToUpdate.value);
        
        if (response) {
            toast('Doação atualizada com sucesso!', {
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
            
            fetchedDonations.value = fetchedDonations.value.map(donation => {
                if (donation.id === donationToUpdate.value.id) {
                    return donationToUpdate.value;
                }
                
                return donation;
            });
            
            donationToUpdate.value = null;
            currentPage.value = 1;

            return;
        }

        toast('Erro ao atualizar doação! Tente novamente.', {
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
        console.error('>>> Error updating donation: ', error);
        toast('Erro ao atualizar doação! Tente novamente.', {
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

const handleRemoveDonation = async () => {
    showRemoveDonationModal.value = false;
    loadingOn.value = true;
    
    try {
        await removeDonation(donationToRemove.value.id);
        fetchedDonations.value = fetchedDonations.value.filter(donation => donation.id !== donationToRemove.value.id);
        
        toast('Doação removida com sucesso!', {
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
        
        donationToRemove.value = null;
        currentPage.value = 1;
    } catch (error) {
        console.error('>>> Error removing donation: ', error);
        toast('Erro ao remover doação! Tente novamente.', {
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
.donations-container {
    padding: 16px;
    height: 100%;
    overflow-y: auto;
}
</style>