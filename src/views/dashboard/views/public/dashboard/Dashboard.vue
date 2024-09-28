<template>
  <n-card class="dashboard-card">
    <div class="dashboard-header">
      <n-space vertical>
        <n-h1>{{ t('pages.dashboard.title') }}</n-h1>
        <n-h3>{{ 
          new Date().toLocaleDateString(`${locale}-BR`, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).toUpperCase()
        }}</n-h3>
      </n-space>
    </div>
    
    <n-space wrap justify="space-between">
      <n-card :title="t('pages.dashboard.schedule')" class="statistics-card">
        <n-space>
          <n-statistic :label="t('pages.dashboard.statistics.this_week')" :value="oportunitiesByPeriod?.thisWeek || 0" suffix="Agendamentos" />
          <img 
            :src="
              'https://api.iconify.design/bxs/bar-chart-alt-2.svg?color=%23' + (oportunitiesByPeriod?.thisWeek > oportunitiesByPeriod?.lastWeek ? '00a89c' : 'df1036')
            " 
            :alt="t('pages.dashboard.statistics.this_week')" 
          />
          
          <n-statistic :label="t('pages.dashboard.statistics.last_week')" :value="oportunitiesByPeriod?.lastWeek || 0" suffix="Agendamentos" />
          <img 
            :src="
              'https://api.iconify.design/bxs/bar-chart-alt-2.svg?color=%23' + (oportunitiesByPeriod?.lastWeek > oportunitiesByPeriod?.thisWeek ? '00a89c' : 'df1036')
            " 
            :alt="t('pages.dashboard.statistics.last_week')" 
          />
          
          <n-statistic :label="t('pages.dashboard.statistics.this_month')" :value="oportunitiesByPeriod?.thisMonth || 0" suffix="Agendamentos" />
          <img 
            :src="
              'https://api.iconify.design/bxs/bar-chart-alt-2.svg?color=%23' + (oportunitiesByPeriod?.thisMonth > oportunitiesByPeriod?.lastMonth ? '00a89c' : 'df1036')
            " 
            :alt="t('pages.dashboard.statistics.this_month')" 
          />
          
          <n-statistic :label="t('pages.dashboard.statistics.last_month')" :value="oportunitiesByPeriod?.lastMonth || 0" suffix="Agendamentos" />
          <img 
            :src="
              'https://api.iconify.design/bxs/bar-chart-alt-2.svg?color=%23' + (oportunitiesByPeriod?.lastMonth > oportunitiesByPeriod?.this_month ? '00a89c' : 'df1036')
            " 
            :alt="t('pages.dashboard.statistics.last_month')" 
          />
        </n-space>
      </n-card>
      
      <n-card :title="t('pages.dashboard.meetings')">
        <n-space vertical>          
          <n-statistic :value="t('pages.dashboard.meetings_proportion', {total: (paginatedOportunities?.total || 0), avg: currentCompany?.business_client_plan?.credits || 0 })" :label="t('pages.dashboard.meetings_count')" />
          <div class="progress-bar-background">
            <n-progress :percentage="Math.round(((paginatedOportunities?.total || 0) / currentCompany?.business_client_plan?.credits) * 100)" />
          </div>
          <div class="status-section">
            <img
            alt="status"
            src="https://res.cloudinary.com/dd9puomgu/image/upload/v1695141867/d1caokjvqllbn3uweqim.svg"
            class="status-image"
            />
            <n-text>
              {{ t('pages.dashboard.meetings_description') }}
            </n-text>
          </div>
        </n-space>
      </n-card>
    </n-space>
    
    <n-card v-if="paginatedOportunities.length" :title="t('pages.dashboard.last_contacts')" class="last-meetings-card">
      <n-space vertical>
        <n-card v-for="oportunity in paginatedOportunities" :key="oportunity" class="contact-card">
          <n-space>
            <n-avatar
            round
            size="large"
            src="https://api.iconify.design/mdi/account-circle-outline.svg?color=%23df1036&width=30"
            />
            <n-space vertical>
              <n-text strong>{{ oportunity.name }}</n-text>
              <n-text strong>{{ oportunity.email }}</n-text>
              <n-text secondary>
                {{ 
                  new Date(oportunity.createdAt).toLocaleDateString(`${locale}-BR`, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }) 
                }}
              </n-text>
            </n-space>
          </n-space>
        </n-card>
      </n-space>
      
      <n-space justify="flex-end" style="margin-top: 8px;">
        <n-pagination
        v-model:page="currentPage"
        :page-size="pageSize"
        :item-count="paginatedOportunities.total"
        @update:page="handlePageChange"  
        />
      </n-space>
    </n-card>
  </n-card>
</template>

<script setup>
import { inject, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const { locale, currentCompany, fetchOportunitiesByCompany, fetchOportunitiesByPeriod } = inject('dashboard');

const currentPage = ref(1);
const pageSize = ref(5);

const paginatedOportunities = ref([]);
const oportunitiesByPeriod = ref([]);

const handlePageChange = async (page) => {
  currentPage.value = page;
  
  // paginatedOportunities.value = await fetchOportunitiesByCompany(currentCompany.value.id, pageSize.value, currentPage.value);
}

// watch(() => currentCompany.value, async (newVal) => {
//     if (newVal && newVal.id) {
//       paginatedOportunities.value = await fetchOportunitiesByCompany(newVal.id, pageSize.value, currentPage.value);
//       oportunitiesByPeriod.value = await fetchOportunitiesByPeriod(newVal.id);
//       console.log("paginatedOportunities", paginatedOportunities.value);
//       console.log("oportunitiesByPeriod", oportunitiesByPeriod.value);
//     }
//   },
//   { immediate: true }
// );
</script>

<style scoped>
.dashboard-card {
  padding: 16px;
  height: 100%;
  overflow-y: auto;
}

.last-meetings-card {
  height: 100%;
  overflow-y: auto;
}

.status-section {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>